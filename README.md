# Remote DID Resolver

Resolve DID by fetching DID Document from Uniresolver-like HTTP endpoint.

## Install

```shell script
npm add @silentcastle/remote-did-resolver
```

## Use

Configure endpoint and resolve the document, like you would do with [DIF did-resolver package](https://github.com/decentralized-identity/did-resolver)

```typescript
import { RemoteDidResolver } from "@silentcastle/remote-did-resolver";
const resolver = new RemoteDidResolver("https://dev.uniresolver.io");
const didDocument = await resolver.resolve(
  "did:key:z6Mkfriq1MqLBoPWecGoDLjguo1sB9brj6wT3qZ5BxkKpuP6"
);
// Alternatively, to get full resolution, instead of just DID document.
const didResolution = await resolver.resolution("did:key:z6Mkfriq1MqLBoPWecGoDLjguo1sB9brj6wT3qZ5BxkKpuP6")
didDocument == didResolution.didDocument //=> true
```

## License

Apache-2.0
