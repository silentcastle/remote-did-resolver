import { DIDDocument } from "./did-document";

export interface DIDResolution {
  "@context": "https://www.w3.org/ns/did-resolution/v1";
  didDocument: DIDDocument;
  methodMetadata: Record<string, any>;
  resolverMetadata: Record<string, string>;
}
