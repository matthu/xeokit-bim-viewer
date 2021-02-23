/**
 * @private
 */
export class DataInputStreamReader {
    constructor(arrayBuffer: any);
    arrayBuffer: any;
    dataView: DataView;
    pos: number;
    readUTF8(): any;
    remaining(): number;
    align4(): void;
    align8(): void;
    readDoubleArray(length: any): Float64Array;
    readFloat(): number;
    readInt(): number;
    readByte(): number;
    readLong(): number;
    readFloatArray2(length: any): number[];
    readFloatArray(length: any): Float32Array;
    readIntArray2(length: any): number[];
    readIntArray(length: any): Int32Array;
    readShortArray(length: any): Int16Array;
}
