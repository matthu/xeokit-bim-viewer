/**
 * @desc Provides rendering context to {@link Drawable"}s as xeokit renders them for a frame.
 *
 * Also creates RTC viewing and picking matrices, caching and reusing matrices within each frame.
 *
 * @private
 */
export class FrameContext {
    constructor(scene: any);
    _scene: any;
    _matPool: any[];
    _matPoolNextFreeIndex: number;
    _rtcViewMats: {};
    _rtcPickViewMats: {};
    /**
     * Called by the renderer before each frame.
     * @private
     */
    private reset;
    /**
     * ID of the last {@link webgl.Program} that was bound during the current frame.
     * @property lastProgramId
     * @type {Number}
     */
    lastProgramId: number;
    /**
     * Whether SAO is currently enabled during the current frame.
     * @property withSAO
     * @default false
     * @type {Boolean}
     */
    withSAO: boolean;
    /**
     * Whether backfaces are currently enabled during the current frame.
     * @property backfaces
     * @default false
     * @type {Boolean}
     */
    backfaces: boolean;
    /**
     * The vertex winding order for what we currently consider to be a backface during current
     * frame: true == "cw", false == "ccw".
     * @property frontFace
     * @default true
     * @type {Boolean}
     */
    frontface: boolean;
    /**
     * The next available texture unit to bind a {@link webgl.Texture} to.
     * @defauilt 0
     * @property textureUnit
     * @type {number}
     */
    textureUnit: number;
    /**
     * Performance statistic that counts how many times the renderer has called ````gl.drawElements()```` has been
     * called so far within the current frame.
     * @default 0
     * @property drawElements
     * @type {number}
     */
    drawElements: number;
    /**
     * Performance statistic that counts how many times ````gl.drawArrays()```` has been called so far within
     * the current frame.
     * @default 0
     * @property drawArrays
     * @type {number}
     */
    drawArrays: number;
    /**
     * Performance statistic that counts how many times ````gl.useProgram()```` has been called so far within
     * the current frame.
     * @default 0
     * @property useProgram
     * @type {number}
     */
    useProgram: number;
    /**
     * Statistic that counts how many times ````gl.bindTexture()```` has been called so far within the current frame.
     * @default 0
     * @property bindTexture
     * @type {number}
     */
    bindTexture: number;
    /**
     * Counts how many times the renderer has called ````gl.bindArray()```` so far within the current frame.
     * @defaulr 0
     * @property bindArray
     * @type {number}
     */
    bindArray: number;
    /**
     * Indicates which pass the renderer is currently rendering.
     *
     * See {@link Scene/passes:property"}}Scene#passes{{/crossLink}}, which configures how many passes we render
     * per frame, which typically set to ````2```` when rendering a stereo view.
     *
     * @property pass
     * @type {number}
     */
    pass: number;
    /**
     * The 4x4 viewing transform matrix the renderer is currently using when rendering castsShadows.
     *
     * This sets the viewpoint to look from the point of view of each {@link DirLight}
     * or {@link PointLight} that casts a shadow.
     *
     * @property shadowViewMatrix
     * @type {Number[]}
     */
    shadowViewMatrix: number[];
    /**
     * The 4x4 viewing projection matrix the renderer is currently using when rendering shadows.
     *
     * @property shadowProjMatrix
     * @type {Number[]}
     */
    shadowProjMatrix: number[];
    /**
     * The 4x4 viewing transform matrix the renderer is currently using when rendering a ray-pick.
     *
     * This sets the viewpoint to look along the ray given to {@link Scene/pick:method"}}Scene#pick(){{/crossLink}}
     * when picking with a ray.
     *
     * @property pickViewMatrix
     * @type {Number[]}
     */
    pickViewMatrix: number[];
    /**
     * The 4x4 orthographic projection transform matrix the renderer is currently using when rendering a ray-pick.
     *
     * @property pickProjMatrix
     * @type {Number[]}
     */
    pickProjMatrix: number[];
    /**
     * Distance to the near clipping plane when rendering depth fragments for GPU-accelerated 3D picking.
     *
     * @property pickZNear
     * @type {Number|*}
     */
    pickZNear: number | any;
    /**
     * Distance to the far clipping plane when rendering depth fragments for GPU-accelerated 3D picking.
     *
     * @property pickZFar
     * @type {Number|*}
     */
    pickZFar: number | any;
    /**
     * Whether or not the renderer is currently picking invisible objects.
     *
     * @property pickInvisible
     * @type {Number}
     */
    pickInvisible: number;
    /** The current line width.
     *
     * @property lineWidth
     * @type Number
     */
    lineWidth: number;
    /**
     * Get View matrix for the given RTC center.
     */
    getRTCViewMatrix(rtcCenterHash: any, rtcCenter: any): any;
    /**
     * Get picking View RTC matrix for the given RTC center.
     */
    getRTCPickViewMatrix(rtcCenterHash: any, rtcCenter: any): any;
    _getNewMat(): any;
}
