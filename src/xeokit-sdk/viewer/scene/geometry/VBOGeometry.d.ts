import { Geometry } from "../geometry/Geometry";
import { RenderState } from "../webgl/RenderState";
import { ArrayBuf } from "../webgl/ArrayBuf";
/**
 * @desc A {@link Geometry} that keeps its geometry data solely in GPU memory, without retaining it in browser memory.
 *
 * VBOGeometry uses less memory than {@link ReadableGeometry}, which keeps its geometry data in both browser and GPU memory.
 *
 * ## Usage
 *
 * Creating a {@link Mesh} with a VBOGeometry that defines a single triangle, plus a {@link PhongMaterial} with diffuse {@link Texture}:
 *
 * [[Run this example](http://xeokit.github.io/xeokit-sdk/examples/#geometry_VBOGeometry)]
 *
 * ````javascript
 * import {Viewer} from "../src/viewer/Viewer.js";
 * import {Mesh} from "../src/scene/mesh/Mesh.js";
 * import {VBOGeometry} from "../src/scene/geometry/VBOGeometry.js"
 * import {PhongMaterial} from "../src/scene/materials/PhongMaterial.js";
 * import {Texture} from "../src/scene/materials/Texture.js";
 *
 * const viewer = new Viewer({
 *         canvasId: "myCanvas"
 *     });
 *
 * new Mesh(viewer.scene, {
 *         geometry: new VBOGeometry(viewer.scene, {
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
 * ````
 */
export class VBOGeometry extends Geometry {
    /**
     * @constructor
     * @param {Component} owner Owner component. When destroyed, the owner will destroy this component as well.
     * @param {*} [cfg] Configs
     * @param {String} [cfg.id] Optional ID, unique among all components in the parent {@link Scene}, generated automatically when omitted.
     * @param {String} [cfg.primitive="triangles"]  The primitive type. Accepted values are 'points', 'lines', 'line-loop', 'line-strip', 'triangles', 'triangle-strip' and 'triangle-fan'.
     * @param {Number[]} [cfg.positions]  Positions array.
     * @param {Number[]} [cfg.normals]  Vertex normal vectors array.
     * @param {Number[]} [cfg.uv]  UVs array.
     * @param {Number[]} [cfg.colors]  Vertex colors.
     * @param {Number[]} [cfg.indices]  Indices array.
     * @param {Number} [cfg.edgeThreshold=10]  When autogenerating edges for supporting {@link Drawable#edges}, this indicates the threshold angle (in degrees) between the face normals of adjacent triangles below which the edge is discarded.
     */
    constructor(owner: any, cfg?: any);
    /**
     * @private
     * @returns {boolean}
     */
    private get isVBOGeometry();
    _state: RenderState;
    _numTriangles: number;
    _edgeThreshold: any;
    _aabb: any;
    _obb: any;
    _edgeIndicesBuf: ArrayBuf;
    _buildHash(): void;
    _getEdgeIndices(): ArrayBuf;
    /**
     * Gets the primitive type.
     *
     * Possible types are: 'points', 'lines', 'line-loop', 'line-strip', 'triangles', 'triangle-strip' and 'triangle-fan'.
     *
     * @type {String}
     */
    get primitive(): string;
    /**
     * Gets the local-space axis-aligned 3D boundary (AABB).
     *
     * The AABB is represented by a six-element Float64Array containing the min/max extents of the axis-aligned volume, ie. ````[xmin, ymin,zmin,xmax,ymax, zmax]````.
     *
     * @type {Number[]}
     */
    get aabb(): number[];
    /**
     * Gets the local-space oriented 3D boundary (OBB).
     *
     * The OBB is represented by a 32-element Float64Array containing the eight vertices of the box, where each vertex is a homogeneous coordinate having [x,y,z,w] elements.
     *
     * @type {Number[]}
     */
    get obb(): number[];
    /**
     * Approximate number of triangles in this VBOGeometry.
     *
     * Will be zero if {@link VBOGeometry#primitive} is not 'triangles', 'triangle-strip' or 'triangle-fan'.
     *
     * @type {Number}
     */
    get numTriangles(): number;
    /** @private */
    private _getState;
}
