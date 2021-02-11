/**
 * @desc Represents a WebGL ArrayBuffer.
 *
 * @private
 */
export class ArrayBuf {
    constructor(gl: any, type: any, data: any, numItems: any, itemSize: any, usage: any, normalized: any, stride: any, offset: any);
    _gl: any;
    type: any;
    allocated: boolean;
    itemType: any;
    itemByteSize: number;
    usage: any;
    length: number;
    dataLength: any;
    numItems: number;
    itemSize: any;
    normalized: boolean;
    stride: any;
    offset: any;
    _allocate(data: any): void;
    _handle: any;
    setData(data: any, offset: any): void;
    bind(): void;
    unbind(): void;
    destroy(): void;
}
