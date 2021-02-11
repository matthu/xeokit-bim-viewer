export namespace geometryCompressionUtils {
    export { getPositionsBounds };
    export { createPositionsDecodeMatrix };
    export { compressPositions };
    export { decompressPositions };
    export { decompressPosition };
    export { decompressAABB };
    export { getUVBounds };
    export { compressUVs };
    export { decompressUVs };
    export { decompressUV };
    export { compressNormals };
    export { decompressNormals };
    export { decompressNormal };
}
/**
 * @private
 * @param array
 * @returns {{min: Float32Array, max: Float32Array}}
 */
declare function getPositionsBounds(array: any): {
    min: Float32Array;
    max: Float32Array;
};
declare function createPositionsDecodeMatrix(aabb: any, positionsDecodeMatrix: any): any;
declare function compressPositions(array: any, min: any, max: any): {
    quantized: Uint16Array;
    decodeMatrix: any;
};
/**
 * @private
 */
declare function decompressPositions(positions: any, decodeMatrix: any, dest?: Float32Array): Float32Array;
declare function decompressPosition(position: any, decodeMatrix: any, dest: any): any;
declare function decompressAABB(aabb: any, decodeMatrix: any, dest?: any): any;
/**
 * @private
 * @param array
 * @returns {{min: Float32Array, max: Float32Array}}
 */
declare function getUVBounds(array: any): {
    min: Float32Array;
    max: Float32Array;
};
declare function compressUVs(array: any, min: any, max: any): {
    quantized: Uint16Array;
    decodeMatrix: any;
};
/**
 * @private
 */
declare function decompressUVs(uvs: any, decodeMatrix: any, dest?: Float32Array): Float32Array;
/**
 * @private
 */
declare function decompressUV(uv: any, decodeMatrix: any, dest: any): void;
/**
 * @private
 */
declare function compressNormals(array: any): Int8Array;
/**
 * @private
 */
declare function decompressNormals(octs: any, result: any): any;
/**
 * @private
 */
declare function decompressNormal(oct: any, result: any): any;
export {};
