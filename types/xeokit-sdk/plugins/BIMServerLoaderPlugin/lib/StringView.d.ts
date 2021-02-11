/**
 * @private
 */
export function StringView(vInput: any, sEncoding: any, nOffset: any, nLength: any): void;
export class StringView {
    /**
     * @private
     */
    private constructor();
    encoding: any;
    buffer: any;
    bufferView: any;
    rawData: any;
    makeIndex(nChrLength: any, nStartFrom: any): any;
    toBase64(bWholeBuffer: any): string;
    subview(nCharOffset: any, nCharLength: any): StringView;
    forEachChar(fCallback: any, oThat: any, nChrOffset: any, nChrLen: any): void;
    valueOf: () => any;
    toString(): any;
}
export namespace StringView {
    function loadUTF8CharCode(aChars: any, nIdx: any): any;
    function putUTF8CharCode(aTarget: any, nChar: any, nPutAt: any): any;
    function getUTF8CharLength(nChar: any): 1 | 2 | 3 | 4 | 5 | 6;
    function loadUTF16CharCode(aChars: any, nIdx: any): any;
    function putUTF16CharCode(aTarget: any, nChar: any, nPutAt: any): any;
    function getUTF16CharLength(nChar: any): 1 | 2;
    function b64ToUint6(nChr: any): any;
    function uint6ToB64(nUint6: any): any;
    function bytesToBase64(aBytes: any): string;
    function base64ToBytes(sBase64: any, nBlockBytes: any): Uint8Array;
    function makeFromBase64(sB64Inpt: any, sEncoding: any, nByteOffset: any, nLength: any): StringView;
}
