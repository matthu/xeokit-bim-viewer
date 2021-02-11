/**
 * @private
 */
export class InstancingLayer {
    /**
     * @param model
     * @param cfg
     * @param cfg.layerIndex
     * @param cfg.primitive
     * @param cfg.positions Flat float Local-space positions array.
     * @param cfg.normals Flat float normals array.
     * @param cfg.indices Flat int indices array.
     * @param cfg.edgeIndices Flat int edges indices array.
     * @param cfg.edgeThreshold
     * @param cfg.rtcCenter
     */
    constructor(model: any, cfg: any);
    /**
     * Index of this InstancingLayer in PerformanceModel#_layerList
     * @type {Number}
     */
    layerIndex: number;
    _instancingRenderers: any;
    model: any;
    _aabb: any;
    _state: any;
    _numPortions: number;
    _numVisibleLayerPortions: number;
    _numTransparentLayerPortions: number;
    _numXRayedLayerPortions: number;
    _numHighlightedLayerPortions: number;
    _numSelectedLayerPortions: number;
    _numClippableLayerPortions: number;
    _numEdgesLayerPortions: number;
    _numPickableLayerPortions: number;
    _numCulledLayerPortions: number;
    /** @private */
    private numIndices;
    _colors: any[];
    _pickColors: any[];
    _offsets: any[];
    _modelMatrixCol0: any[];
    _modelMatrixCol1: any[];
    _modelMatrixCol2: any[];
    _modelNormalMatrixCol0: any[];
    _modelNormalMatrixCol1: any[];
    _modelNormalMatrixCol2: any[];
    _portions: any[];
    _finalized: boolean;
    /**
     * The axis-aligned World-space boundary of this InstancingLayer's positions.
     * @type {*|Float64Array}
     */
    aabb: any | Float64Array;
    /**
     * Creates a new portion within this InstancingLayer, returns the new portion ID.
     *
     * The portion will instance this InstancingLayer's geometry.
     *
     * Gives the portion the specified color and matrix.
     *
     * @param rgbaInt Quantized RGBA color
     * @param opacity Opacity [0..255]
     * @param meshMatrix Flat float 4x4 matrix
     * @param [worldMatrix] Flat float 4x4 matrix
     * @param worldAABB Flat float AABB
     * @param pickColor Quantized pick color
     * @returns {number} Portion ID
     */
    createPortion(rgbaInt: any, opacity: any, meshMatrix: any, worldMatrix?: any, worldAABB: any, pickColor: any): number;
    finalize(): void;
    initFlags(portionId: any, flags: any, meshTransparent: any): void;
    setVisible(portionId: any, flags: any, meshTransparent: any): void;
    setHighlighted(portionId: any, flags: any, meshTransparent: any): void;
    setXRayed(portionId: any, flags: any, meshTransparent: any): void;
    setSelected(portionId: any, flags: any, meshTransparent: any): void;
    setEdges(portionId: any, flags: any, meshTransparent: any): void;
    setClippable(portionId: any, flags: any): void;
    setCollidable(portionId: any, flags: any): void;
    setPickable(portionId: any, flags: any, meshTransparent: any): void;
    setCulled(portionId: any, flags: any, meshTransparent: any): void;
    setColor(portionId: any, color: any): void;
    setTransparent(portionId: any, flags: any, transparent: any): void;
    _setFlags(portionId: any, flags: any, meshTransparent: any): void;
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
    drawXRayedEdges(frameCtx: any): void;
    drawHighlightedEdges(frameCtx: any): void;
    drawSelectedEdges(frameCtx: any): void;
    drawOcclusion(frameCtx: any): void;
    drawShadow(frameCtx: any): void;
    drawPickMesh(frameCtx: any): void;
    drawPickDepths(frameCtx: any): void;
    drawPickNormals(frameCtx: any): void;
    destroy(): void;
}
