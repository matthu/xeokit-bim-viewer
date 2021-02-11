/**
 * @desc A {@link Geometry} that keeps its geometry data in both browser and GPU memory.
 *
 * ReadableGeometry uses more memory than {@link VBOGeometry}, which only stores its geometry data in GPU memory.
 *
 * ## Usage
 *
 * Creating a {@link Mesh} with a ReadableGeometry that defines a single triangle, plus a {@link PhongMaterial} with diffuse {@link Texture}:
 *
 * [[Run this example](http://xeokit.github.io/xeokit-sdk/examples/#geometry_ReadableGeometry)]
 *
 * ````javascript
 * import {Viewer} from "../src/viewer/Viewer.js";
 * import {Mesh} from "../src/scene/mesh/Mesh.js";
 * import {ReadableGeometry} from "../src/scene/geometry/ReadableGeometry.js"
 * import {PhongMaterial} from "../src/scene/materials/PhongMaterial.js";
 * import {Texture} from "../src/scene/materials/Texture.js";
 *
 * const viewer = new Viewer({
 *         canvasId: "myCanvas"
 *     });
 *
 * const myMesh = new Mesh(viewer.scene, {
 *         geometry: new ReadableGeometry(viewer.scene, {
 *             primitive: "triangles",
 *             positions: [0.0, 3, 0.0, -3, -3, 0.0, 3, -3, 0.0],
 *             normals: [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0],
 *             uv: [0.0, 0.0, 0.5, 1.0, 1.0, 0.0],
 *             indices: [0, 1, 2]
 *         }),
 *         material: new PhongMaterial(viewer.scene, {
 *             diffuseMap: new Texture(viewer.scene, {
 *                 src: "textures/diffuse/uvGrid2.jpg"
 *             }),
 *             backfaces: true
 *         })
 *     });
 *
 * // Get geometry data from browser memory:
 *
 * const positions = myMesh.geometry.positions; // Flat arrays
 * const normals = myMesh.geometry.normals;
 * const uv = myMesh.geometry.uv;
 * const indices = myMesh.geometry.indices;
 *
 * ````
 */
export class ReadableGeometry extends Geometry {
    /**
     *
     @class ReadableGeometry
     @module xeokit
     @submodule geometry
     @constructor
     @param {Component} owner Owner component. When destroyed, the owner will destroy this component as well.
     @param {*} [cfg] Configs
     @param {String} [cfg.id] Optional ID, unique among all components in the parent {@link Scene},
     generated automatically when omitted.
     @param {String:Object} [cfg.meta] Optional map of user-defined metadata to attach to this Geometry.
     @param [cfg.primitive="triangles"] {String} The primitive type. Accepted values are 'points', 'lines', 'line-loop', 'line-strip', 'triangles', 'triangle-strip' and 'triangle-fan'.
     @param [cfg.positions] {Number[]} Positions array.
     @param [cfg.normals] {Number[]} Vertex normal vectors array.
     @param [cfg.uv] {Number[]} UVs array.
     @param [cfg.colors] {Number[]} Vertex colors.
     @param [cfg.indices] {Number[]} Indices array.
     @param [cfg.autoVertexNormals=false] {Boolean} Set true to automatically generate normal vectors from the positions and
     indices, if those are supplied.
     @param [cfg.compressGeometry=false] {Boolean} Stores positions, colors, normals and UVs in compressGeometry and oct-encoded formats
     for reduced memory footprint and GPU bus usage.
     @param [cfg.edgeThreshold=10] {Number} When a {@link Mesh} renders this Geometry as wireframe,
     this indicates the threshold angle (in degrees) between the face normals of adjacent triangles below which the edge is discarded.
     @extends Component
     * @param owner
     * @param cfg
     */
    constructor(owner: any, cfg?: any);
    /**
     * @private
     * @returns {boolean}
     */
    private get isReadableGeometry();
    _state: RenderState;
    _numTriangles: number;
    _edgeThreshold: any;
    _edgeIndicesBuf: ArrayBuf;
    _pickTrianglePositionsBuf: ArrayBuf;
    _pickTriangleColorsBuf: ArrayBuf;
    _aabbDirty: boolean;
    _boundingSphere: boolean;
    _aabb: any;
    _obb: any;
    _obbDirty: boolean;
    _buildVBOs(): void;
    _buildHash(): void;
    _getEdgeIndices(): ArrayBuf;
    _getPickTrianglePositions(): ArrayBuf;
    _getPickTriangleColors(): ArrayBuf;
    _buildEdgeIndices(): void;
    _buildPickTriangleVBOs(): void;
    _buildPickVertexVBOs(): void;
    _webglContextLost(): void;
    _webglContextRestored(): void;
    _pickVertexPositionsBuf: any;
    _pickVertexColorsBuf: any;
    /**
     * Gets the Geometry's primitive type.

     Valid types are: 'points', 'lines', 'line-loop', 'line-strip', 'triangles', 'triangle-strip' and 'triangle-fan'.

     @property primitive
     @default "triangles"
     @type {String}
     */
    get primitive(): string;
    /**
     Indicates if this Geometry is quantized.

     Compression is an internally-performed optimization which stores positions, colors, normals and UVs
     in quantized and oct-encoded formats for reduced memory footprint and GPU bus usage.

     Quantized geometry may not be updated.

     @property compressGeometry
     @default false
     @type {Boolean}
     @final
     */
    get compressGeometry(): boolean;
    set positions(arg: number[]);
    /**
     The Geometry's vertex positions.

     @property positions
     @default null
     @type {Number[]}
     */
    get positions(): number[];
    _decompressedPositions: Float32Array;
    set normals(arg: number[]);
    /**
     The Geometry's vertex normals.

     @property normals
     @default null
     @type {Number[]}
     */
    get normals(): number[];
    _decompressedNormals: Float32Array;
    set uv(arg: number[]);
    /**
     The Geometry's UV coordinates.

     @property uv
     @default null
     @type {Number[]}
     */
    get uv(): number[];
    _decompressedUV: Float32Array;
    set colors(arg: number[]);
    /**
     The Geometry's vertex colors.

     @property colors
     @default null
     @type {Number[]}
     */
    get colors(): number[];
    /**
     The Geometry's indices.

     If ````xeokit.WEBGL_INFO.SUPPORTED_EXTENSIONS["OES_element_index_uint"]```` is true, then this can be
     a ````Uint32Array````, otherwise it needs to be a ````Uint16Array````.

     @property indices
     @default null
     @type Uint16Array | Uint32Array
     @final
     */
    get indices(): Uint16Array | Uint32Array;
    /**
     * Local-space axis-aligned 3D boundary (AABB) of this geometry.
     *
     * The AABB is represented by a six-element Float64Array containing the min/max extents of the
     * axis-aligned volume, ie. ````[xmin, ymin,zmin,xmax,ymax, zmax]````.
     *
     * @property aabb
     * @final
     * @type {Number[]}
     */
    get aabb(): number[];
    /**
     * Local-space oriented 3D boundary (OBB) of this geometry.
     *
     * The OBB is represented by a 32-element Float64Array containing the eight vertices of the box,
     * where each vertex is a homogeneous coordinate having [x,y,z,w] elements.
     *
     * @property obb
     * @final
     * @type {Number[]}
     */
    get obb(): number[];
    /**
     * Approximate number of triangles in this ReadableGeometry.
     *
     * Will be zero if {@link ReadableGeometry#primitive} is not 'triangles', 'triangle-strip' or 'triangle-fan'.
     *
     * @type {Number}
     */
    get numTriangles(): number;
    _setAABBDirty(): void;
    _getState(): RenderState;
}
import { Geometry } from "@xeokit/xeokit-sdk/src/viewer/scene/geometry/Geometry";
import { RenderState } from "@xeokit/xeokit-sdk/src/viewer/scene/webgl/RenderState";
import { ArrayBuf } from "@xeokit/xeokit-sdk/src/viewer/scene/webgl/ArrayBuf";
