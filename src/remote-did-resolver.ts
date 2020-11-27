import fetch from "cross-fetch";
import {
  DIDDocument,
  DIDResolution,
  NoResolutionError,
  IResolver,
} from "@silentcastle/did-util";

/**
 * Resolve by asking Uniresolver for DID Document.
 * Example endpoint: `https://didyoufindme.xyz/` or `https://dev.uniresolver.io`.
 */
export class RemoteDidResolver implements IResolver {
  readonly endpoint: string;

  constructor(endpoint: string) {
    const noTrailingSlash = endpoint.replace(/\/$/, "");
    this.endpoint = `${noTrailingSlash}/1.0/identifiers`;
  }

  /**
   * Resolve DID document by DID URL.
   * @param didUrl DID URL
   */
  async resolve(didUrl: string): Promise<DIDDocument> {
    const resolution = await this.resolution(didUrl);
    return resolution.didDocument;
  }

  /**
   * Resolve DID document by DID URL. Returns DID Resolution, instead of DID Document.
   * @param didUrl DID URL
   */
  async resolution(didUrl: string): Promise<DIDResolution> {
    const response = await fetch(`${this.endpoint}/${didUrl}`);
    if (response.status >= 200 && response.status < 300) {
      return await response.json();
    } else {
      throw new NoResolutionError(didUrl);
    }
  }
}
