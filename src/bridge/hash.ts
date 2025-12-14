// src/bridge/hash.ts

/**
 * Computes the SHA256 hash of a given string using Web Crypto API.
 * @param text The raw text to hash.
 * @returns A Promise that resolves with the SHA256 hash as a hexadecimal string.
 */
export async function computeSha256(text: string): Promise<string> {
  const textEncoder = new TextEncoder();
  const data = textEncoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hexHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hexHash;
}
