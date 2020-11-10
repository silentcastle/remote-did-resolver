export class NoResolutionError extends Error {
    constructor(identifier: string) {
        super(`Can not resolve ${identifier}`);
    }
}
