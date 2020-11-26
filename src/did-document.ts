export interface DIDDocument {
  "@context": "https://w3id.org/did/v1";
  id: string;
  publicKey: PublicKey[];
  authentication?: (string | PublicKey | Authentication)[];
  uportProfile?: any;
  service?: ServiceEndpoint[];
  created?: string;
  updated?: string;
  proof?: LinkedDataProof;
  keyAgreement?: (string | PublicKey)[];
  assertionMethod?: (string | PublicKey)[];
  capabilityDelegation?: (string | PublicKey)[];
  capabilityInvocation?: (string | PublicKey)[];
}

export interface Authentication {
  type: string;
  publicKey: string;
}

export interface PublicKey {
  id: string;
  type: string;
  controller: string;
  ethereumAddress?: string;
  publicKeyBase64?: string;
  publicKeyBase58?: string;
  publicKeyHex?: string;
  publicKeyPem?: string;
}

export interface ServiceEndpoint {
  id: string;
  type: string;
  serviceEndpoint: string;
  description?: string;
}

export interface LinkedDataProof {
  type: string;
  created: string;
  creator: string;
  nonce: string;
  signatureValue: string;
}
