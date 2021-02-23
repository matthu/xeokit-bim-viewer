/**
 * @private
 */
export function getBatchingLayerScratchMemory(performanceModel: any): BatchingLayerScratchMemory;
/**
 * Provides scratch memory for methods like BatchingLayer setFlags() and setColors(),
 * so they don't need to allocate temporary arrays that need garbage collection.
 *
 * @private
 */
declare class BatchingLayerScratchMemory {
    _uint8Arrays: {};
    _float32Arrays: {};
    _clear(): void;
    getUInt8Array(len: any): any;
    getFloat32Array(len: any): any;
}
export {};
