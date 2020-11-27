import { DIDDocument } from "./did-document";

export interface IResolver {
  resolve(didUrl: string): Promise<DIDDocument>;
}
