// src/bridge/client.ts
import { BridgeStatus, PackageSummary, PackageManifest } from "./types";
import { Capacitor, CapacitorHttp, HttpResponse } from "@capacitor/core";

// Helper to normalize base URL (remove trailing slash)
const normalizeBaseUrl = (url: string): string =>
  url.endsWith("/") ? url.slice(0, -1) : url;

// Native vs Web detection (Capacitor)
const isNative = Capacitor.isNativePlatform();

// Generic HTTP GET function that uses CapacitorHttp on device and fetch on web
const httpGetJson = async <T>(url: string): Promise<T> => {
  if (isNative) {
    const response: HttpResponse = await CapacitorHttp.get({ url });
    // CapacitorHttp throws for network errors; we still validate HTTP status.
    if (response.status < 200 || response.status >= 300) {
      throw new Error(
        `HTTP error! Status: ${response.status}, Data: ${JSON.stringify(
          response.data
        )}`
      );
    }
    return response.data as T;
  } else {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  }
};

export const getBridgeStatus = async (
  baseUrl: string
): Promise<BridgeStatus> => {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
  try {
    const data = await httpGetJson<BridgeStatus>(
      `${normalizedBaseUrl}/api/distro-bridge/status`
    );
    return data;
  } catch (error: any) {
    return { status: "ERROR", message: error?.message ?? String(error) };
  }
};

export const listPackages = async (
  baseUrl: string,
  latestOnly: boolean = true
): Promise<PackageSummary[]> => {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
  try {
    const url = `${normalizedBaseUrl}/api/distro-bridge/packages${
      latestOnly ? "?latestOnly=true" : ""
    }`;
    const data = await httpGetJson<{ packages: PackageSummary[] }>(url);
    return data.packages;
  } catch (error) {
    console.error("Error listing packages:", error);
    return [];
  }
};

interface GetPackageManifestResult {
  rawText: string;
  parsedManifest: PackageManifest | null;
}

export const getPackageManifest = async (
  baseUrl: string,
  manifestUrl: string
): Promise<GetPackageManifestResult> => {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);

  try {
    const fullManifestUrl = manifestUrl.startsWith("http")
      ? manifestUrl
      : `${normalizedBaseUrl}${manifestUrl}`;

    let rawText: string;
    let parsedManifest: PackageManifest | null = null;

    if (isNative) {
      const response: HttpResponse = await CapacitorHttp.get({
        url: fullManifestUrl,
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(
          `HTTP error! Status: ${response.status}, Data: ${JSON.stringify(
            response.data
          )}`
        );
      }

      // CapacitorHttp may return object or string depending on content-type/parsing.
      rawText =
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data);
    } else {
      const response = await fetch(fullManifestUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      rawText = await response.text();
    }

    try {
      parsedManifest = JSON.parse(rawText) as PackageManifest;
    } catch (parseError) {
      console.error("Error parsing manifest JSON:", parseError);
      // parsedManifest remains null, rawText is still available
    }

    return { rawText, parsedManifest };
  } catch (error: any) {
    console.error("Error fetching package manifest:", error);
    return { rawText: "", parsedManifest: null };
  }
};