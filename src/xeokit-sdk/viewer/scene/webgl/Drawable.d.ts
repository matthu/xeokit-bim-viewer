/**
 * @desc A drawable {@link Scene} element.
 *
 * @interface
 * @abstract
 * @private
 */
export class Drawable {
    /**
     * Returns true to indicate that this is a Drawable.
     * @type {Boolean}
     * @abstract
     */
    get isDrawable(): boolean;
    /**
     * Configures the appearance of this Drawable when x-rayed.
     *
     * Set to {@link Scene#xrayMaterial} by default.
     *
     * @type {EmphasisMaterial}
     * @abstract
     */
    get xrayMaterial(): any;
    /**
     * Configures the appearance of this Drawable when highlighted.
     *
     * Set to {@link Scene#highlightMaterial} by default.
     *
     * @type {EmphasisMaterial}
     * @abstract
     */
    get highlightMaterial(): any;
    /**
     * Configures the appearance of this Drawable when selected.
     *
     * Set to {@link Scene#selectedMaterial} by default.
     *
     * @type {EmphasisMaterial}
     * @abstract
     */
    get selectedMaterial(): any;
    /**
     * Configures the appearance of this Drawable when edges are enhanced.
     *
     * @type {EdgeMaterial}
     * @abstract
     */
    get edgeMaterial(): any;
    /**
     * Property with final value ````true```` to indicate that xeokit should render this Drawable in sorted order, relative to other Drawable of the same class.
     *
     * The sort order is determined by {@link Drawable#stateSortCompare}.
     *
     * Sorting is essential for rendering performance, so that xeokit is able to avoid applying runs of the same state changes to the GPU, ie. can collapse them.
     *
     * @type {boolean}
     * @abstract
     */
    get isStateSortable(): boolean;
    /**
     * Comparison function used by the renderer to determine the order in which xeokit should render the Drawable, relative to to other Drawablees.
     *
     * Sorting is essential for rendering performance, so that xeokit is able to avoid needlessly applying runs of the same rendering state changes to the GPU, ie. can collapse them.
     *
     * @param {Drawable} drawable1
     * @param {Drawable} drawable2
     * @returns {number}
     * @abstract
     */
    stateSortCompare(drawable1: Drawable, drawable2: Drawable): number;
    /**
     * Called by xeokit when about to render this Drawable, to generate {@link Drawable#renderFlags}.
     *
     * @abstract
     */
    rebuildRenderFlags(renderFlags: any): void;
    /**
     * Called by xeokit when about to render this Drawable, to get flags indicating what rendering effects to apply for it.
     * @type {RenderFlags}
     * @abstract
     */
    get renderFlags(): any;
    /**
     * Renders opaque edges using {@link Drawable#edgeMaterial}.
     *
     * See {@link RenderFlags#normalFillOpaque}.
     *
     * @param {FrameContext} frameCtx Renderer frame context.
     * @abstract
     */
    drawNormalOpaqueFill(frameCtx: any): void;
    /**
     * Renders transparent filled surfaces using normal appearance attributes.
     *
     * See {@link RenderFlags#normalFillTransparent}.
     *
     * @param {FrameContext} frameCtx Renderer frame context.
     * @abstract
     */
    drawNormalTransparentFill(frameCtx: any): void;
    /**
     * Renders pixel depths to an internally-managed depth target, for use in post-effects (eg. SAO).
     *
     * @param {FrameContext} frameCtx Renderer frame context.
     * @abstract
     */
    drawDepth(frameCtx: any): void;
    /**
     * Renders pixel normals to an internally-managed target, for use in post-effects (eg. SAO).
     *
     * @param {FrameContext} frameCtx Renderer frame context.
     * @abstract
     */
    drawNormals(frameCtx: any): void;
    /**
     * Renders x-ray fill using {@link Drawable#xrayMaterial}.
     *
     * See {@link RenderFlags#xrayedFillOpaque} and {@link RenderFlags#xrayedFillTransparent}.
     *
     * @param {FrameContext} frameCtx Renderer frame context.
     * @abstract
     */
    drawXRayedFill(frameCtx: any): void;
    /**
     * Renders highlighted transparent fill using {@link Drawable#highlightMaterial}.
     *
     * See {@link RenderFlags#highlightedFillOpaque} and {@link RenderFlags#highlightedFillTransparent}.
     *
     * @param {FrameContext} frameCtx Renderer frame context.
     * @abstract
     */
    drawHighlightedFill(frameCtx: any): void;
    /**
     * Renders selected fill using {@link Drawable#selectedMaterial}.
     *
     * See {@link RenderFlags#selectedFillOpaque} and {@link RenderFlags#selectedFillTransparent}.
     *
     * @param {FrameContext} frameCtx Renderer frame context.
     * @abstract
     */
    drawSelectedFill(frameCtx: any): void;
    /**
     * Renders opaque normal edges using {@link Drawable#edgeMaterial}.
     *
     * See {@link RenderFlags#normalEdgesOpaque}.
     *
     * @param {FrameContext} frameCtx Renderer frame context.
     * @abstract
     */
    drawNormalOpaqueEdges(frameCtx: any): void;
    /**
     * Renders transparent normal edges using {@link Drawable#edgeMaterial}.
     *
     * See {@link RenderFlags#normalEdgesTransparent}.
     *
     * @param {FrameContext} frameCtx Renderer frame context.
     * @abstract
     */
    drawNormalTransparentEdges(frameCtx: any): void;
    /**
     * Renders x-rayed edges using {@link Drawable#xrayMaterial}.
     *
     * See {@link RenderFlags#xrayedEdgesOpaque}.
     *
     * @param {FrameContext} frameCtx Renderer frame context.
     * @abstract
     */
    drawXRayedEdges(frameCtx: any): void;
    /**
     * Renders highlighted edges using {@link Drawable#highlightMaterial}.
     *
     * See {@link RenderFlags#highlightedEdgesOpaque}.
     *
     * @param {FrameContext} frameCtx Renderer frame context.
     * @abstract
     */
    drawHighlightedEdges(frameCtx: any): void;
    /**
     * Renders selected edges using {@link Drawable#selectedMaterial}.
     *
     * See {@link RenderFlags#selectedEdgesOpaque}.
     *
     * @param {FrameContext} frameCtx Renderer frame context.
     * @abstract
     */
    drawSelectedEdges(frameCtx: any): void;
    /**
     * Renders occludable elements to a frame buffer where they will be tested to see if they occlude any occlusion probe markers.
     *
     * @param {FrameContext} frameCtx Renderer frame context.
     * @abstract
     */
    drawOcclusion(frameCtx: any): void;
    /**
     * Renders depths to a shadow map buffer..
     *
     * @param {FrameContext} frameCtx Renderer frame context.
     * @abstract
     */
    drawShadow(frameCtx: any): void;
}
