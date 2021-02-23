/**
 * @desc Pick result returned by {@link Scene#pick}.
 *
 */
export class PickResult {
    /**
     * Picked entity.
     * Null when no entity was picked.
     * @property entity
     * @type {Entity|*}
     */
    entity: any | any;
    /**
     * Type of primitive that was picked - usually "triangle".
     * Null when no primitive was picked.
     * @property primitive
     * @type {String}
     */
    primitive: string;
    /**
     * Index of primitive that was picked.
     * -1 when no entity was picked.
     * @property primIndex
     * @type {number}
     */
    primIndex: number;
    _canvasPos: Int16Array;
    _origin: Float64Array;
    _direction: Float64Array;
    _indices: Int32Array;
    _localPos: Float64Array;
    _worldPos: Float64Array;
    _viewPos: Float64Array;
    _bary: Float64Array;
    _worldNormal: Float64Array;
    _uv: Float64Array;
    /**
     * @private
     * @param value
     */
    set canvasPos(arg: number[]);
    /**
     * Canvas coordinates when picking with a 2D pointer.
     * @property canvasPos
     * @type {Number[]}
     */
    get canvasPos(): number[];
    _gotCanvasPos: boolean;
    /**
     * @private
     * @param value
     */
    set origin(arg: number[]);
    /**
     * World-space 3D ray origin when raypicked.
     * @property origin
     * @type {Number[]}
     */
    get origin(): number[];
    _gotOrigin: boolean;
    /**
     * @private
     * @param value
     */
    set direction(arg: number[]);
    /**
     * World-space 3D ray direction when raypicked.
     * @property direction
     * @type {Number[]}
     */
    get direction(): number[];
    _gotDirection: boolean;
    /**
     * @private
     * @param value
     */
    set indices(arg: Int32Array);
    /**
     * Picked triangle's vertex indices.
     * Only defined when an entity and triangle was picked.
     * @property indices
     * @type {Int32Array}
     */
    get indices(): Int32Array;
    _gotIndices: boolean;
    /**
     * @private
     * @param value
     */
    set localPos(arg: number[]);
    /**
     * Picked Local-space point on surface.
     * Only defined when an entity and a point on its surface was picked.
     * @property localPos
     * @type {Number[]}
     */
    get localPos(): number[];
    _gotLocalPos: boolean;
    /**
     * @private
     * @param value
     */
    set worldPos(arg: number[]);
    /**
     * Picked World-space point on surface.
     * Only defined when an entity and a point on its surface was picked.
     * @property worldPos
     * @type {Number[]}
     */
    get worldPos(): number[];
    _gotWorldPos: boolean;
    /**
     * @private
     * @param value
     */
    set viewPos(arg: number[]);
    /**
     * Picked View-space point on surface.
     * Only defined when an entity and a point on its surface was picked.
     * @property viewPos
     * @type {Number[]}
     */
    get viewPos(): number[];
    _gotViewPos: boolean;
    /**
     * @private
     * @param value
     */
    set bary(arg: number[]);
    /**
     * Barycentric coordinate within picked triangle.
     * Only defined when an entity and a point on its surface was picked.
     * @property bary
     * @type {Number[]}
     */
    get bary(): number[];
    _gotBary: boolean;
    /**
     * @private
     * @param value
     */
    set worldNormal(arg: number[]);
    /**
     * Normal vector at picked position on surface.
     * Only defined when an entity and a point on its surface was picked.
     * @property worldNormal
     * @type {Number[]}
     */
    get worldNormal(): number[];
    _gotWorldNormal: boolean;
    /**
     * @private
     * @param value
     */
    set uv(arg: number[]);
    /**
     * UV coordinates at picked position on surface.
     * Only defined when an entity and a point on its surface was picked.
     * @property uv
     * @type {Number[]}
     */
    get uv(): number[];
    _gotUV: boolean;
    /**
     * @private
     * @param value
     */
    private reset;
}
