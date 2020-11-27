export interface ParsedDID {
    did: string;
    didUrl: string;
    method: string;
    id: string;
    path?: string;
    fragment?: string;
    query?: string;
    params?: Record<string, string>;
}

const InvalidIdentifierErrorTag = Symbol.for("InvalidIdentifierError");
export class InvalidIdentifierError extends Error {
    protected readonly _tag = InvalidIdentifierErrorTag;

    static [Symbol.hasInstance](instance: any) {
        return instance && instance._tag === InvalidIdentifierErrorTag;
    }

    constructor(readonly identifier: string) {
        super(`Invalid DID ${identifier}`);
    }
}

const ID_CHAR = "[a-zA-Z0-9_.-]";
const METHOD = "([a-zA-Z0-9_-]+)";
const METHOD_ID = `(${ID_CHAR}+(:${ID_CHAR}+)*)`;
const PARAM_CHAR = "[a-zA-Z0-9_.:%-]";
const PARAM = `;${PARAM_CHAR}+=${PARAM_CHAR}*`;
const PARAMS = `((${PARAM})*)`;
const PATH = `(\/[^#?]*)?`;
const QUERY = `([?][^#]*)?`;
const FRAGMENT = `(\#.*)?`;
const DID_MATCHER = new RegExp(
    `^did:${METHOD}:${METHOD_ID}${PARAMS}${PATH}${QUERY}${FRAGMENT}$`
);
export function parse(didUrl: string): ParsedDID {
    if (didUrl === "" || !didUrl) throw new Error("Missing DID");
    const sections = didUrl.match(DID_MATCHER);
    if (sections) {
        const parts: ParsedDID = {
            did: `did:${sections[1]}:${sections[2]}`,
            method: sections[1],
            id: sections[2],
            didUrl,
        };
        if (sections[4]) {
            const params = sections[4].slice(1).split(";");
            parts.params = {};
            for (const p of params) {
                const kv = p.split("=");
                parts.params[kv[0]] = kv[1];
            }
        }
        if (sections[6]) parts.path = sections[6];
        if (sections[7]) parts.query = sections[7].slice(1);
        if (sections[8]) parts.fragment = sections[8].slice(1);
        return parts;
    } else {
        throw new InvalidIdentifierError(didUrl);
    }
}
