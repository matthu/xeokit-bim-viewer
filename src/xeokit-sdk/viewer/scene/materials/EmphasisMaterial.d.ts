import { Material } from "./Material";
import { RenderState } from "../webgl/RenderState";
/**
 * Configures the appearance of {@link Entity}s when they are xrayed, highlighted or selected.
 *
 * * XRay an {@link Entity} by setting {@link Entity#xrayed} ````true````.
 * * Highlight an {@link Entity} by setting {@link Entity#highlighted} ````true````.
 * * Select an {@link Entity} by setting {@link Entity#selected} ````true````.
 * * When {@link Entity}s are within the subtree of a root {@link Entity}, then setting {@link Entity#xrayed}, {@link Entity#highlighted} or {@link Entity#selected}
 * on the root will collectively set those properties on all sub-{@link Entity}s.
 * * EmphasisMaterial provides several presets. Select a preset by setting {@link EmphasisMaterial#preset} to the ID of a preset in {@link EmphasisMaterial#presets}.
 * * By default, a {@link Mesh} uses the default EmphasisMaterials in {@link Scene#xrayMaterial}, {@link Scene#highlightMaterial} and {@link Scene#selectedMaterial}
 * but you can assign each {@link Mesh#xrayMaterial}, {@link Mesh#highlightMaterial} or {@link Mesh#selectedMaterial} to a custom EmphasisMaterial, if required.
 *
 * ## Usage
 *
 * In the example below, we'll create a {@link Mesh} with its own XRayMaterial and set {@link Mesh#xrayed} ````true```` to xray it.
 *
 * Recall that {@link Mesh} is a concrete subtype of the abstract {@link Entity} base class.
 *
 * ````javascript
 * new Mesh(viewer.scene, {
 *     geometry: new BoxGeometry(viewer.scene, {
 *         edgeThreshold: 1
 *     }),
 *     material: new PhongMaterial(viewer.scene, {
 *         diffuse: [0.2, 0.2, 1.0]
 *     }),
 *     xrayMaterial: new EmphasisMaterial(viewer.scene, {
 *         fill: true,
 *         fillColor: [0, 0, 0],
 *         fillAlpha: 0.7,
 *         edges: true,
 *         edgeColor: [0.2, 1.0, 0.2],
 *         edgeAlpha: 1.0,
 *         edgeWidth: 2
 *     }),
 *     xrayed: true
 * });
 * ````
 *
 * Note the ````edgeThreshold```` configuration for the {@link ReadableGeometry} on our {@link Mesh}.  EmphasisMaterial configures
 * a wireframe representation of the {@link ReadableGeometry} for the selected emphasis mode, which will have inner edges (those edges between
 * adjacent co-planar triangles) removed for visual clarity. The ````edgeThreshold```` indicates that, for
 * this particular {@link ReadableGeometry}, an inner edge is one where the angle between the surface normals of adjacent triangles
 * is not greater than ````5```` degrees. That's set to ````2```` by default, but we can override it to tweak the effect
 * as needed for particular Geometries.
 *
 * Here's the example again, this time implicitly defaulting to the {@link Scene#edgeMaterial}. We'll also modify that EdgeMaterial
 * to customize the effect.
 *
 * ````javascript
 * new Mesh({
 *     geometry: new TeapotGeometry(viewer.scene, {
 *         edgeThreshold: 5
 *     }),
 *     material: new PhongMaterial(viewer.scene, {
 *         diffuse: [0.2, 0.2, 1.0]
 *     }),
 *     xrayed: true
 * });
 *
 * var xrayMaterial = viewer.scene.xrayMaterial;
 *
 * xrayMaterial.fillColor = [0.2, 1.0, 0.2];
 * xrayMaterial.fillAlpha = 1.0;
 * ````
 *
 * ## Presets
 *
 * Let's switch the {@link Scene#xrayMaterial} to one of the presets in {@link EmphasisMaterial#presets}:
 *
 * ````javascript
 * viewer.xrayMaterial.preset = EmphasisMaterial.presets["sepia"];
 * ````
 *
 * We can also create an EmphasisMaterial from a preset, while overriding properties of the preset as required:
 *
 * ````javascript
 * var myEmphasisMaterial = new EMphasisMaterial(viewer.scene, {
 *      preset: "sepia",
 *      fillColor = [1.0, 0.5, 0.5]
 * });
 * ````
 */
export class EmphasisMaterial extends Material {
    /**
     * @constructor
     * @param {Component} owner Owner component. When destroyed, the owner will destroy this component as well.
     * @param {*} [cfg] The EmphasisMaterial configuration
     * @param {String} [cfg.id] Optional ID, unique among all components in the parent {@link Scene}, generated automatically when omitted.
     * @param {Boolean} [cfg.fill=true] Indicates if xray surfaces are filled with color.
     * @param {Number[]} [cfg.fillColor=[0.4,0.4,0.4]] EmphasisMaterial fill color.
     * @param  {Number} [cfg.fillAlpha=0.2] Transparency of filled xray faces. A value of ````0.0```` indicates fully transparent, ````1.0```` is fully opaque.
     * @param {Boolean} [cfg.edges=true] Indicates if xray edges are visible.
     * @param {Number[]} [cfg.edgeColor=[0.2,0.2,0.2]]  RGB color of xray edges.
     * @param {Number} [cfg.edgeAlpha=0.5] Transparency of xray edges. A value of ````0.0```` indicates fully transparent, ````1.0```` is fully opaque.
     * @param {Number} [cfg.edgeWidth=1] Width of xray edges, in pixels.
     * @param {String} [cfg.preset] Selects a preset EmphasisMaterial configuration - see {@link EmphasisMaterial#presets}.
     * @param {Boolean} [cfg.backfaces=false] Whether to render geometry backfaces when emphasising.
     */
    constructor(owner: any, cfg?: any);
    /**
     * Gets available EmphasisMaterial presets.
     *
     * @type {Object}
     */
    get presets(): any;
    _state: RenderState;
    _preset: string;
    /**
     * Selects a preset EmphasisMaterial configuration.
     *
     * Default value is "default".
     *
     * @type {String}
     */
    set preset(arg: string);
    /**
     * Gets the current preset EmphasisMaterial configuration.
     *
     * Default value is "default".
     *
     * @type {String}
     */
    get preset(): string;
    /**
     * Sets if surfaces are filled with color.
     *
     * Default is ````true````.
     *
     * @type {Boolean}
     */
    set fill(arg: boolean);
    /**
     * Gets if surfaces are filled with color.
     *
     * Default is ````true````.
     *
     * @type {Boolean}
     */
    get fill(): boolean;
    /**
     * Sets the RGB color of filled faces.
     *
     * Default is ````[0.4, 0.4, 0.4]````.
     *
     * @type {Number[]}
     */
    set fillColor(arg: number[]);
    /**
     * Gets the RGB color of filled faces.
     *
     * Default is ````[0.4, 0.4, 0.4]````.
     *
     * @type {Number[]}
     */
    get fillColor(): number[];
    /**
     * Sets the transparency of filled faces.
     *
     * A value of ````0.0```` indicates fully transparent, ````1.0```` is fully opaque.
     *
     * Default is ````0.2````.
     *
     * @type {Number}
     */
    set fillAlpha(arg: number);
    /**
     * Gets the transparency of filled faces.
     *
     * A value of ````0.0```` indicates fully transparent, ````1.0```` is fully opaque.
     *
     * Default is ````0.2````.
     *
     * @type {Number}
     */
    get fillAlpha(): number;
    /**
     * Sets if edges are visible.
     *
     * Default is ````true````.
     *
     * @type {Boolean}
     */
    set edges(arg: boolean);
    /**
     * Gets if edges are visible.
     *
     * Default is ````true````.
     *
     * @type {Boolean}
     */
    get edges(): boolean;
    /**
     * Sets the RGB color of edges.
     *
     * Default is ```` [0.2, 0.2, 0.2]````.
     *
     * @type {Number[]}
     */
    set edgeColor(arg: number[]);
    /**
     * Gets the RGB color of edges.
     *
     * Default is ```` [0.2, 0.2, 0.2]````.
     *
     * @type {Number[]}
     */
    get edgeColor(): number[];
    /**
     * Sets the transparency of edges.
     *
     * A value of ````0.0```` indicates fully transparent, ````1.0```` is fully opaque.
     *
     * Default is ````0.2````.
     *
     * @type {Number}
     */
    set edgeAlpha(arg: number);
    /**
     * Gets the transparency of edges.
     *
     * A value of ````0.0```` indicates fully transparent, ````1.0```` is fully opaque.
     *
     * Default is ````0.2````.
     *
     * @type {Number}
     */
    get edgeAlpha(): number;
    /**
     * Sets edge width.
     *
     * This is not supported by WebGL implementations based on DirectX [2019].
     *
     * Default value is ````1.0```` pixels.
     *
     * @type {Number}
     */
    set edgeWidth(arg: number);
    /**
     * Gets edge width.
     *
     * This is not supported by WebGL implementations based on DirectX [2019].
     *
     * Default value is ````1.0```` pixels.
     *
     * @type {Number}
     */
    get edgeWidth(): number;
    /**
     * Sets whether to render backfaces when {@link EmphasisMaterial#fill} is ````true````..
     *
     * Default is ````false````.
     *
     * @type {Boolean}
     */
    set backfaces(arg: boolean);
    /**
     * Gets whether to render backfaces when {@link EmphasisMaterial#fill} is ````true````..
     *
     * Default is ````false````.
     *
     * @type {Boolean}
     */
    get backfaces(): boolean;
}
