/**
 * @private
 */
export default class BimServerApiPromise {
    constructor(counter?: any);
    isDone: boolean;
    chains: any[];
    callback: any;
    counter: any;
    done(callback: any): BimServerApiPromise;
    inc(): void;
    dec(): void;
    fire(): void;
    chain(otherPromise: any): void;
}
