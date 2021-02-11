/**
 * @private
 */
export class BatchingLayer {
    /**
     * @param model
     * @param cfg
     * @param cfg.layerIndex
     * @param cfg.positionsDecodeMatrix
     * @param cfg.rtcCenter
     * @param cfg.buffer
     * @param cfg.scratchMemory
     * @param cfg.primitive
     */
    constructor(model: any, cfg: any);
    /**
     * Index of this BatchingLayer in {@link PerformanceModel#_layerList}.
     * @type {Number}
     */
    layerIndex: number;
    _batchingRenderers: any;
    model: any;
    _buffer: BatchingBuffer;
    _scratchMemory: any;
    _state: any;
    _numPortions: number;
    _numVisibleLayerPortions: number;
    _numTransparentLayerPortions: number;
    _numXRayedLayerPortions: number;
    _numSelectedLayerPortions: number;
    _numHighlightedLayerPortions: number;
    _numClippableLayerPortions: number;
    _numEdgesLayerPortions: number;
    _numPickableLayerPortions: number;
    _numCulledLayerPortions: number;
    _modelAABB: any;
    _portions: any[];
    _finalized: boolean;
    _positionsDecodeMatrix: any;
    _preCompressed: boolean;
    /**
     * The axis-aligned World-space boundary of this BatchingLayer's positions.
     * @type {*|Float64Array}
     */
    aabb: any | Float64Array;
    /**
     * Tests if there is room for another portion in this BatchingLayer.
     *
     * @param lenPositions Number of positions we'd like to create in the portion.
     * @param lenIndices Number of indices we'd like to create in this portion.
     * @returns {boolean} True if OK to create another portion.
     */
    canCreatePortion(lenPositions: any, lenIndices: any): boolean;
    /**
     * Creates a new portion within this BatchingLayer, returns the new portion ID.
     *
     * Gives the portion the specified geometry, color and matrix.
     *
     * @param positions Flat float Local-space positions array.
     * @param normals Flat float normals array.
     * @param indices  Flat int indices array.
     * @param edgeIndices Flat int edges indices array.
     * @param color Quantized RGB color [0..255,0..255,0..255,0..255]
     * @param opacity Opacity [0..255]
     * @param [meshMatrix] Flat float 4x4 matrix
     * @param [worldMatrix] Flat float 4x4 matrix
     * @param worldAABB Flat float AABB World-space AABB
     * @param pickColor Quantized pick color
     * @returns {number} Portion ID
     */
    createPortion(positions: any, normals: any, indices: any, edgeIndices: any, color: any, opacity: any, meshMatrix?: any, worldMatrix?: any, worldAABB: any, pickColor: any): number;
    /**
     * Builds batch VBOs from appended geometries.
     * No more portions can then be created.
     */
    finalize(): void;
    initFlags(portionId: any, flags: any, meshTransparent: any): void;
    setVisible(portionId: any, flags: any, transparent: any): void;
    setHighlighted(portionId: any, flags: any, transparent: any): void;
    setXRayed(portionId: any, flags: any, transparent: any): void;
    setSelected(portionId: any, flags: any, transparent: any): void;
    setEdges(portionId: any, flags: any, transparent: any): void;
    setClippable(portionId: any, flags: any): void;
    setCulled(portionId: any, flags: any, transparent: any): void;
    setCollidable(portionId: any, flags: any): void;
    setPickable(portionId: any, flags: any, transparent: any): void;
    setColor(portionId: any, color: any): void;
    setTransparent(portionId: any, flags: any, transparent: any): void;
    _setFlags(portionId: any, flags: any, transparent: any): void;
    _setFlags2(portionId: any, flags: any): void;
    setOffset(portionId: any, offset: any): void;
    drawNormalOpaqueFill(frameCtx: any): void;
    drawNormalTransparentFill(frameCtx: any): void;
    drawDepth(frameCtx: any): void;
    drawNormals(frameCtx: any): void;
    drawXRayedFill(frameCtx: any): void;
    drawHighlightedFill(frameCtx: any): void;
    drawSelectedFill(frameCtx: any): void;
    drawNormalOpaqueEdges(frameCtx: any): void;
    drawNormalTransparentEdges(frameCtx: any): void;
    drawHighlightedEdges(frameCtx: any): void;
    drawSelectedEdges(frameCtx: any): void;
    drawXRayedEdges(frameCtx: any): void;
    drawPickMesh(frameCtx: any): void;
    drawPickDepths(frameCtx: any): void;
    drawPickNormals(frameCtx: any): void;
    drawOcclusion(frameCtx: any): void;
    drawShadow(frameCtx: any): void;
    destroy(): void;
}
import { BatchingBuffer } from "@xeokit/xeokit-sdk/src/viewer/scene/PerformanceModel/lib/batching/BatchingBuffer";
