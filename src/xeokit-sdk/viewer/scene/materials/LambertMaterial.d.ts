import { Material } from "./Material";
import { RenderState } from "../webgl/RenderState";
/**
 * @desc Configures the normal rendered appearance of {@link Mesh}es using the non-realistic but GPU-efficient <a href="https://en.wikipedia.org/wiki/Lambertian_reflectance">Lambertian</a> flat shading model for calculating reflectance.
 *
 * * Useful for efficiently rendering non-realistic objects for high-detail CAD.
 * * Use  {@link PhongMaterial} when you need specular highlights.
 * * Use the physically-based {@link MetallicMaterial} or {@link SpecularMaterial} when you need more realism.
 * * For LambertMaterial, the illumination calculation is performed at each triangle vertex, and the resulting color is interpolated across the face of the triangle. For {@link PhongMaterial}, {@link MetallicMaterial} and
 * {@link SpecularMaterial}, vertex normals are interpolated across the surface of the triangle, and the illumination calculation is performed at each texel.
 *
 * ## Usage
 *
 * [[Run this example](http://xeokit.github.io/xeokit-sdk/examples/#materials_LambertMaterial)]
 *
 * In the example below we'll create a {@link Mesh} with a shape defined by a {@link buildTorusGeometry} and normal rendering appearance configured with a LambertMaterial.
 *
 * ```` javascript
 * import {Viewer} from "../src/viewer/Viewer.js";
 * import {Mesh} from "../src/scene/mesh/Mesh.js";
 * import {buildTorusGeometry} from "../src/scene/geometry/builders/buildTorusGeometry.js";
 * import {ReadableGeometry} from "../src/scene/geometry/ReadableGeometry.js";
 * import {LambertMaterial} from "../src/scene/materials/LambertMaterial.js";
 *
 * const viewer = new Viewer({
 *     canvasId: "myCanvas"
 * });
 *
 * viewer.scene.camera.eye = [0, 0, 5];
 * viewer.scene.camera.look = [0, 0, 0];
 * viewer.scene.camera.up = [0, 1, 0];
 *
 * new Mesh(viewer.scene, {
 *      geometry: new ReadableGeometry(viewer.scene, buildTorusGeometry({
 *          center: [0, 0, 0],
 *          radius: 1.5,
 *          tube: 0.5,
 *          radialSegments: 12,
 *          tubeSegments: 8,
 *          arc: Math.PI * 2.0
 *      }),
 *      material: new LambertMaterial(viewer.scene, {
 *          ambient: [0.3, 0.3, 0.3],
 *          color: [0.5, 0.5, 0.0],
 *          alpha: 1.0, // Default
 *          lineWidth: 1,
 *          pointSize: 1,
 *          backfaces: false,
 *          frontFace: "ccw"
 *      })
 *  });
 * ````
 *
 * ## LambertMaterial Properties
 *
 * The following table summarizes LambertMaterial properties:
 *
 *  | Property | Type | Range | Default Value | Space | Description |
 *  |:--------:|:----:|:-----:|:-------------:|:-----:|:-----------:|
 *  | {@link LambertMaterial#ambient} | Array | [0, 1] for all components | [1,1,1,1] | linear | The RGB components of the ambient light reflected by the material. |
 *  | {@link LambertMaterial#color} | Array | [0, 1] for all components | [1,1,1,1] | linear | The RGB components of the diffuse light reflected by the material. |
 *  | {@link LambertMaterial#emissive} | Array | [0, 1] for all components | [0,0,0] | linear | The RGB components of the light emitted by the material. |
 *  | {@link LambertMaterial#alpha} | Number | [0, 1] | 1 | linear | The transparency of the material surface (0 fully transparent, 1 fully opaque). |
 *  | {@link LambertMaterial#lineWidth} | Number | [0..100] | 1 |  | Line width in pixels. |
 *  | {@link LambertMaterial#pointSize} | Number | [0..100] | 1 |  | Point size in pixels. |
 *  | {@link LambertMaterial#backfaces} | Boolean |  | false |  | Whether to render {@link Geometry} backfaces. |
 *  | {@link LambertMaterial#frontface} | String | "ccw", "cw" | "ccw" |  | The winding order for {@link Geometry} frontfaces - "cw" for clockwise, or "ccw" for counter-clockwise. |
 *
 */
export class LambertMaterial extends Material {
    /**
     * @constructor
     * @param {Component} owner Owner component. When destroyed, the owner will destroy this component as well.
     * @param {*} [cfg] The LambertMaterial configuration
     * @param {String} [cfg.id] Optional ID, unique among all components in the parent {@link Scene}, generated automatically when omitted.
     * @param {String:Object} [cfg.meta=null]  Metadata to attach to this LambertMaterial.
     * @param {Number[]} [cfg.ambient=[1.0, 1.0, 1.0 ]] LambertMaterial ambient color.
     * @param {Number[]} [cfg.color=[ 1.0, 1.0, 1.0 ]] LambertMaterial diffuse color.
     * @param {Number[]} [cfg.emissive=[ 0.0, 0.0, 0.0 ]] LambertMaterial emissive color.
     * @param {Number} [cfg.alpha=1]Scalar in range 0-1 that controls alpha, where 0 is completely transparent and 1 is completely opaque.
     * @param {Number} [cfg.reflectivity=1]Scalar in range 0-1 that controls how much {@link ReflectionMap} is reflected.
     * @param {Number} [cfg.lineWidth=1] Scalar that controls the width of {@link Geometry} lines.
     * @param {Number} [cfg.pointSize=1] Scalar that controls the size of points for {@link Geometry} with {@link Geometry#primitive} set to "points".
     * @param {Boolean} [cfg.backfaces=false] Whether to render {@link Geometry} backfaces.
     * @param {Boolean} [cfg.frontface="ccw"] The winding order for {@link Geometry} front faces - "cw" for clockwise, or "ccw" for counter-clockwise.
     */
    constructor(owner: any, cfg?: any);
    _state: RenderState;
    /**
     * Sets the LambertMaterial's ambient color.
     *
     * Default value is ````[0.3, 0.3, 0.3]````.
     *
     * @type {Number[]}
     */
    set ambient(arg: number[]);
    /**
     * Gets the LambertMaterial's ambient color.
     *
     * Default value is ````[0.3, 0.3, 0.3]````.
     *
     * @type {Number[]}
     */
    get ambient(): number[];
    /**
     * Sets the LambertMaterial's diffuse color.
     *
     * Default value is ````[1.0, 1.0, 1.0]````.
     *
     * @type {Number[]}
     */
    set color(arg: number[]);
    /**
     * Gets the LambertMaterial's diffuse color.
     *
     * Default value is ````[1.0, 1.0, 1.0]````.
     *
     * @type {Number[]}
     */
    get color(): number[];
    /**
     * Sets the LambertMaterial's emissive color.
     *
     * Default value is ````[0.0, 0.0, 0.0]````.
     *
     * @type {Number[]}
     */
    set emissive(arg: number[]);
    /**
     * Gets the LambertMaterial's emissive color.
     *
     * Default value is ````[0.0, 0.0, 0.0]````.
     *
     * @type {Number[]}
     */
    get emissive(): number[];
    /**
     * Sets factor in the range ````[0..1]```` indicating how transparent the LambertMaterial is.
     *
     * A value of ````0.0```` indicates fully transparent, ````1.0```` is fully opaque.
     *
     * Default value is ````1.0````
     *
     * @type {Number}
     */
    set alpha(arg: number);
    /**
     * Gets factor in the range ````[0..1]```` indicating how transparent the LambertMaterial is.
     *
     * A value of ````0.0```` indicates fully transparent, ````1.0```` is fully opaque.
     *
     * Default value is ````1.0````
     *
     * @type {Number}
     */
    get alpha(): number;
    /**
     * Sets the LambertMaterial's line width.
     *
     * This is not supported by WebGL implementations based on DirectX [2019].
     *
     * Default value is ````1.0````.
     *
     * @type {Number}
     */
    set lineWidth(arg: number);
    /**
     * Gets the LambertMaterial's line width.
     *
     * This is not supported by WebGL implementations based on DirectX [2019].
     *
     * Default value is ````1.0````.
     *
     * @type {Number}
     */
    get lineWidth(): number;
    /**
     * Sets the LambertMaterial's point size.
     *
     * Default value is ````1.0````.
     *
     * @type {Number}
     */
    set pointSize(arg: number);
    /**
     * Gets the LambertMaterial's point size.
     *
     * Default value is ````1.0````.
     *
     * @type {Number}
     */
    get pointSize(): number;
    /**
     * Sets whether backfaces are visible on attached {@link Mesh}es.
     *
     * @type {Boolean}
     */
    set backfaces(arg: boolean);
    /**
     * Gets whether backfaces are visible on attached {@link Mesh}es.
     *
     * @type {Boolean}
     */
    get backfaces(): boolean;
    /**
     * Sets the winding direction of front faces of {@link Geometry} of attached {@link Mesh}es.
     *
     * Default value is ````"ccw"````.
     *
     * @type {String}
     */
    set frontface(arg: string);
    /**
     * Gets the winding direction of front faces of {@link Geometry} of attached {@link Mesh}es.
     *
     * Default value is ````"ccw"````.
     *
     * @type {String}
     */
    get frontface(): string;
    _getState(): RenderState;
}
