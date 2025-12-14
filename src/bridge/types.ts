// src/bridge/types.ts

export interface BridgeStatus {
  status: string;
  message?: string;
}

export interface PackageSummary {
  packageId: string;
  profileId: string;
  createdAt: string; // ISO date string
  manifestUrl: string;
}

export interface PackageManifest {
  id: string;
  version: string;
  integrity?: { manifestHash: string };
  blueprint: Blueprint;
  profile?: {
    profileId: string;
    profileName: string;
    domain: string;
    tools: { [key: string]: any };
    layout: any;
  };
  [key: string]: any; // Allow for other properties
}

export interface Blueprint {
  profileName: string;
  domain: string;
  tools: { [key: string]: any };
  layout: any;
  [key: string]: any; // Allow for other properties
}

// Full bridge response types (example, adapt as needed)
export interface ListPackagesResponse {
  packages: PackageSummary[];
}
