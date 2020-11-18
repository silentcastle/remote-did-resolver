import {NoResolutionError} from "./no-resolution.error";
import fetch from "cross-fetch";
import {DIDResolution} from "./did-resolution";

/**
 * Resolve by asking Uniresolver for DID Document.
 * Example endpoint: `https://didyoufindme.xyz/` or `https://dev.uniresolver.io`.
 */
export class RemoteDidResolver {
    readonly endpoint: string

    constructor(endpoint: string) {
        const noTrailingSlash = endpoint.replace(/\/$/, "")
        this.endpoint = `${noTrailingSlash}/1.0/identifiers`
    }

    async resolve(didUrl: string): Promise<DIDResolution> {
        const response = await fetch(`${this.endpoint}/${didUrl}`);
        if (response.status >= 200 && response.status < 300) {
            return await response.json();
        } else {
            throw new NoResolutionError(didUrl);
        }
    }
}
