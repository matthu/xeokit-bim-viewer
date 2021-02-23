import { Material } from "./Material";
import { RenderState } from "../webgl/RenderState";
/**
 * @desc Configures the normal rendered appearance of {@link Mesh}es using the physically-accurate *metallic-roughness* shading model.
 *
 * * Useful for conductive materials, such as metal, but also appropriate for insulators.
 * * {@link SpecularMaterial} is best for insulators, such as wood, ceramics and plastic.
 * * {@link PhongMaterial} is appropriate for non-realistic objects.
 * * {@link LambertMaterial} is appropriate for high-detail models that need to render as efficiently as possible.
 *
 * ## Usage
 *
 * In the example below we'll create a {@link Mesh} with {@link MetallicMaterial} and {@link ReadableGeometry} loaded from OBJ.
 *
 * Note that in this example we're providing separate {@link Texture} for the {@link MetallicMaterial#metallic} and {@link MetallicMaterial#roughness}
 * channels, which allows us a little creative flexibility. Then, in the next example further down, we'll combine those channels
 * within the same {@link Texture} for efficiency.
 *
 * [[Run this example](http://xeokit.github.io/xeokit-sdk/examples/#materials_MetallicMaterial)]
 *
 * ````javascript
 * import {Viewer} from "../src/viewer/Viewer.js";
 * import {Mesh} from "../src/scene/mesh/Mesh.js";
 * import {loadOBJGeometry} from "../src/scene/geometry/loaders/loadOBJGeometry.js";
 * import {ReadableGeometry} from "../src/scene/geometry/ReadableGeometry.js";
 * import {MetallicMaterial} from "../src/scene/materials/MetallicMaterial.js";
 * import {Texture} from "../src/scene/materials/Texture.js";
 *
 * const viewer = new Viewer({
 *      canvasId: "myCanvas"
 * });
 *
 * viewer.scene.camera.eye = [0.57, 1.37, 1.14];
 * viewer.scene.camera.look = [0.04, 0.58, 0.00];
 * viewer.scene.camera.up = [-0.22, 0.84, -0.48];
 *
 * loadOBJGeometry(viewer.scene, {
 *      src: "models/obj/fireHydrant/FireHydrantMesh.obj"
 * })
 * .then(function (geometry) {
 *
 *      // Success
 *
 *      new Mesh(viewer.scene, {
 *
 *          geometry: new ReadableGeometry(viewer.scene, geometry),
 *
 *          material: new MetallicMaterial(viewer.scene, {
 *
 *              baseColor: [1, 1, 1],
 *              metallic: 1.0,
 *              roughness: 1.0,
 *
 *              baseColorMap: new Texture(viewer.scene, {
 *                  src: "models/obj/fireHydrant/fire_hydrant_Base_Color.png",
 *                  encoding: "sRGB"
 *              }),
 *              normalMap: new Texture(viewer.scene, {
 *                  src: "models/obj/fireHydrant/fire_hydrant_Normal_OpenGL.png"
 *              }),
 *              roughnessMap: new Texture(viewer.scene, {
 *                  src: "models/obj/fireHydrant/fire_hydrant_Roughness.png"
 *              }),
 *              metallicMap: new Texture(viewer.scene, {
 *                  src: "models/obj/fireHydrant/fire_hydrant_Metallic.png"
 *              }),
 *              occlusionMap: new Texture(viewer.scene, {
 *                  src: "models/obj/fireHydrant/fire_hydrant_Mixed_AO.png"
 *              }),
 *
 *              specularF0: 0.7
 *          })
 *      });
 * }, function () {
 *          // Error
 *      });
 * ````
 *
 * ## Background Theory
 *
 * For an introduction to physically-based rendering (PBR) concepts, try these articles:
 *
 * * Joe Wilson's [Basic Theory of Physically-Based Rendering](https://www.marmoset.co/posts/basic-theory-of-physically-based-rendering/)
 * * Jeff Russel's [Physically-based Rendering, and you can too!](https://www.marmoset.co/posts/physically-based-rendering-and-you-can-too/)
 * * Sebastien Legarde's [Adapting a physically-based shading model](http://seblagarde.wordpress.com/tag/physically-based-rendering/)
 *
 * ## MetallicMaterial Properties
 *
 * The following table summarizes MetallicMaterial properties:
 *
 * | Property | Type | Range | Default Value | Space | Description |
 * |:--------:|:----:|:-----:|:-------------:|:-----:|:-----------:|
 * | {@link MetallicMaterial#baseColor} | Array | [0, 1] for all components | [1,1,1,1] | linear | The RGB components of the base color of the material. |
 * | {@link MetallicMaterial#metallic} | Number | [0, 1] | 1 | linear | The metallic-ness the material (1 for metals, 0 for non-metals). |
 * | {@link MetallicMaterial#roughness} | Number | [0, 1] | 1 | linear | The roughness of the material surface. |
 * | {@link MetallicMaterial#specularF0} | Number | [0, 1] | 1 | linear | The specular Fresnel of the material surface. |
 * | {@link MetallicMaterial#emissive} | Array | [0, 1] for all components | [0,0,0] | linear | The RGB components of the emissive color of the material. |
 * | {@link MetallicMaterial#alpha} | Number | [0, 1] | 1 | linear | The transparency of the material surface (0 fully transparent, 1 fully opaque). |
 * | {@link MetallicMaterial#baseColorMap} | {@link Texture} |  | null | sRGB | Texture RGB components multiplying by {@link MetallicMaterial#baseColor}. If the fourth component (A) is present, it multiplies by {@link MetallicMaterial#alpha}. |
 * | {@link MetallicMaterial#metallicMap} | {@link Texture} |  | null | linear | Texture with first component multiplying by {@link MetallicMaterial#metallic}. |
 * | {@link MetallicMaterial#roughnessMap} | {@link Texture} |  | null | linear | Texture with first component multiplying by {@link MetallicMaterial#roughness}. |
 * | {@link MetallicMaterial#metallicRoughnessMap} | {@link Texture} |  | null | linear | Texture with first component multiplying by {@link MetallicMaterial#metallic} and second component multiplying by {@link MetallicMaterial#roughness}. |
 * | {@link MetallicMaterial#emissiveMap} | {@link Texture} |  | null | linear | Texture with RGB components multiplying by {@link MetallicMaterial#emissive}. |
 * | {@link MetallicMaterial#alphaMap} | {@link Texture} |  | null | linear | Texture with first component multiplying by {@link MetallicMaterial#alpha}. |
 * | {@link MetallicMaterial#occlusionMap} | {@link Texture} |  | null | linear | Ambient occlusion texture multiplying by surface's reflected diffuse and specular light. |
 * | {@link MetallicMaterial#normalMap} | {@link Texture} |  | null | linear | Tangent-space normal map. |
 * | {@link MetallicMaterial#alphaMode} | String | "opaque", "blend", "mask" | "blend" |  | Alpha blend mode. |
 * | {@link MetallicMaterial#alphaCutoff} | Number | [0..1] | 0.5 |  | Alpha cutoff value. |
 * | {@link MetallicMaterial#backfaces} | Boolean |  | false |  | Whether to render {@link ReadableGeometry} backfaces. |
 * | {@link MetallicMaterial#frontface} | String | "ccw", "cw" | "ccw" |  | The winding order for {@link ReadableGeometry} frontfaces - "cw" for clockwise, or "ccw" for counter-clockwise. |
 *
 *
 * ## Combining Channels Within the Same Textures
 *
 * In the previous example we provided separate {@link Texture} for the {@link MetallicMaterial#metallic} and
 * {@link MetallicMaterial#roughness} channels, but we can combine those channels into the same {@link Texture} to
 * reduce download time, memory footprint and rendering time (and also for glTF compatibility).
 *
 * Here's the {@link Mesh} again, with our MetallicMaterial with those channels combined in the {@link MetallicMaterial#metallicRoughnessMap}
 * {@link Texture}, where the *R* component multiplies by {@link MetallicMaterial#metallic} and *G* multiplies
 * by {@link MetallicMaterial#roughness}.
 *
 * ````javascript
 * new Mesh(viewer.scene, {
 *
 *     geometry: geometry,
 *
 *     material: new MetallicMaterial(viewer.scene, {
 *
 *         baseColor: [1, 1, 1],
 *         metallic: 1.0,
 *         roughness: 1.0,
 *
 *         baseColorMap: new Texture(viewer.scene, {
 *             src: "models/obj/fireHydrant/fire_hydrant_Base_Color.png",
 *             encoding: "sRGB"
 *         }),
 *         normalMap: new Texture(viewer.scene, {
 *             src: "models/obj/fireHydrant/fire_hydrant_Normal_OpenGL.png"
 *         }),
 *         metallicRoughnessMap: new Texture(viewer.scene, {
 *             src: "models/obj/fireHydrant/fire_hydrant_MetallicRoughness.png"
 *         }),
 *         metallicRoughnessMap : new Texture(viewer.scene, {                  // <<----------- Added
 *             src: "models/obj/fireHydrant/fire_hydrant_MetallicRoughness.png"  // R component multiplies by metallic
 *         }),                                                                   // G component multiplies by roughness
 *         occlusionMap: new Texture(viewer.scene, {
 *             src: "models/obj/fireHydrant/fire_hydrant_Mixed_AO.png"
 *         }),
 *
 *         specularF0: 0.7
 *  })
 * ````
 *
 * Although not shown in this example, we can also texture {@link MetallicMaterial#alpha} with the *A* component of
 * {@link MetallicMaterial#baseColorMap}'s {@link Texture}, if required.
 *
 * ## Alpha Blending
 *
 * Let's make our {@link Mesh} transparent.
 *
 * We'll update the {@link MetallicMaterial#alpha} and {@link MetallicMaterial#alphaMode}, causing it to blend 50%
 * with the background:
 *
 * ````javascript
 * hydrant.material.alpha = 0.5;
 * hydrant.material.alphaMode = "blend";
 * ````
 *
 * ## Alpha Masking
 *
 * Let's apply an alpha mask to our {@link Mesh}.
 *
 * We'll configure an {@link MetallicMaterial#alphaMap} to multiply by {@link MetallicMaterial#alpha},
 * with {@link MetallicMaterial#alphaMode} and {@link MetallicMaterial#alphaCutoff} to treat it as an alpha mask:
 *
 * ````javascript
 * new Mesh(viewer.scene, {
 *
 *     geometry: geometry,
 *
 *     material: new MetallicMaterial(viewer.scene, {
 *
 *         baseColor: [1, 1, 1],
 *         metallic: 1.0,
 *         roughness: 1.0,
 *         alpha: 1.0,
 *         alphaMode : "mask",  // <<---------------- Added
 *         alphaCutoff : 0.2,   // <<---------------- Added
 *
 *         alphaMap : new Texture(viewer.scene{ // <<---------------- Added
 *              src: "textures/alphaMap.jpg"
 *         }),
 *         baseColorMap: new Texture(viewer.scene, {
 *             src: "models/obj/fireHydrant/fire_hydrant_Base_Color.png",
 *             encoding: "sRGB"
 *         }),
 *         normalMap: new Texture(viewer.scene, {
 *             src: "models/obj/fireHydrant/fire_hydrant_Normal_OpenGL.png"
 *         }),
 *         metallicRoughnessMap: new Texture(viewer.scene, {
 *             src: "models/obj/fireHydrant/fire_hydrant_MetallicRoughness.png"
 *         }),
 *         metallicRoughnessMap : new Texture(viewer.scene, {                  // <<----------- Added
 *             src: "models/obj/fireHydrant/fire_hydrant_MetallicRoughness.png"  // R component multiplies by metallic
 *         }),                                                                   // G component multiplies by roughness
 *         occlusionMap: new Texture(viewer.scene, {
 *             src: "models/obj/fireHydrant/fire_hydrant_Mixed_AO.png"
 *         }),
 *
 *         specularF0: 0.7
 *  })
 * ````
 */
export class MetallicMaterial extends Material {
    /**
     * @constructor
     * @param {Component} owner Owner component. When destroyed, the owner will destroy this MetallicMaterial as well.
     * @param {*} [cfg] The MetallicMaterial configuration.
     * @param {String} [cfg.id] Optional ID, unique among all components in the parent {@link Scene}, generated automatically when omitted.
     * @param {Number[]} [cfg.baseColor=[1,1,1]] RGB diffuse color of this MetallicMaterial. Multiplies by the RGB components of {@link MetallicMaterial#baseColorMap}.
     * @param {Number} [cfg.metallic=1.0] Factor in the range ````[0..1]```` indicating how metallic this MetallicMaterial is.  ````1```` is metal, ````0```` is non-metal. Multiplies by the *R* component of {@link MetallicMaterial#metallicMap} and the *A* component of {@link MetallicMaterial#metallicRoughnessMap}.
     * @param {Number} [cfg.roughness=1.0] Factor in the range ````[0..1]```` indicating the roughness of this MetallicMaterial.  ````0```` is fully smooth, ````1```` is fully rough. Multiplies by the *R* component of {@link MetallicMaterial#roughnessMap}.
     * @param {Number} [cfg.specularF0=0.0] Factor in the range ````[0..1]```` indicating specular Fresnel.
     * @param {Number[]} [cfg.emissive=[0,0,0]]  RGB emissive color of this MetallicMaterial. Multiplies by the RGB components of {@link MetallicMaterial#emissiveMap}.
     * @param {Number} [cfg.alpha=1.0] Factor in the range ````[0..1]```` indicating the alpha of this MetallicMaterial.  Multiplies by the *R* component of {@link MetallicMaterial#alphaMap} and the *A* component,  if present, of {@link MetallicMaterial#baseColorMap}. The value of  {@link MetallicMaterial#alphaMode} indicates how alpha is interpreted when rendering.
     * @param {Texture} [cfg.baseColorMap=undefined] RGBA {@link Texture} containing the diffuse color of this MetallicMaterial, with optional *A* component for alpha. The RGB components multiply by the {@link MetallicMaterial#baseColor} property, while the *A* component, if present, multiplies by the {@link MetallicMaterial#alpha} property.
     * @param {Texture} [cfg.alphaMap=undefined] RGB {@link Texture} containing this MetallicMaterial's alpha in its *R* component. The *R* component multiplies by the {@link MetallicMaterial#alpha} property. Must be within the same {@link Scene} as this MetallicMaterial.
     * @param {Texture} [cfg.metallicMap=undefined] RGB {@link Texture} containing this MetallicMaterial's metallic factor in its *R* component. The *R* component multiplies by the {@link MetallicMaterial#metallic} property. Must be within the same {@link Scene} as this MetallicMaterial.
     * @param {Texture} [cfg.roughnessMap=undefined] RGB {@link Texture} containing this MetallicMaterial's roughness factor in its *R* component. The *R* component multiplies by the  {@link MetallicMaterial#roughness} property. Must be within the same {@link Scene} as this MetallicMaterial.
     * @param {Texture} [cfg.metallicRoughnessMap=undefined] RGB {@link Texture} containing this MetallicMaterial's metalness in its *R* component and roughness in its *G* component. Its *R* component multiplies by the {@link MetallicMaterial#metallic} property, while its *G* component multiplies by the {@link MetallicMaterial#roughness} property. Must be within the same {@link Scene} as this MetallicMaterial.
     * @param {Texture} [cfg.emissiveMap=undefined] RGB {@link Texture} containing the emissive color of this MetallicMaterial. Multiplies by the {@link MetallicMaterial#emissive} property. Must be within the same {@link Scene} as this MetallicMaterial.
     * @param {Texture} [cfg.occlusionMap=undefined] RGB ambient occlusion {@link Texture}. Within shaders, multiplies by the specular and diffuse light reflected by surfaces. Must be within the same {@link Scene} as this MetallicMaterial.
     * @param {Texture} [cfg.normalMap=undefined] RGB tangent-space normal {@link Texture}. Must be within the same {@link Scene} as this MetallicMaterial.
     * @param {String} [cfg.alphaMode="opaque"] The alpha blend mode, which specifies how alpha is to be interpreted. Accepted values are "opaque", "blend" and "mask". See the {@link MetallicMaterial#alphaMode} property for more info.
     * @param {Number} [cfg.alphaCutoff=0.5] The alpha cutoff value. See the {@link MetallicMaterial#alphaCutoff} property for more info.
     * @param {Boolean} [cfg.backfaces=false] Whether to render {@link ReadableGeometry} backfaces.
     * @param {Boolean} [cfg.frontface="ccw"] The winding order for {@link ReadableGeometry} front faces - ````"cw"```` for clockwise, or ````"ccw"```` for counter-clockwise.
     * @param {Number} [cfg.lineWidth=1] Scalar that controls the width of lines for {@link ReadableGeometry} with {@link ReadableGeometry#primitive} set to "lines".
     * @param {Number} [cfg.pointSize=1] Scalar that controls the size of points for {@link ReadableGeometry} with {@link ReadableGeometry#primitive} set to "points".
     */
    constructor(owner: any, cfg?: any);
    _state: RenderState;
    /**
     * Sets the RGB diffuse color.
     *
     * Multiplies by the RGB components of {@link MetallicMaterial#baseColorMap}.
     *
     * Default value is ````[1.0, 1.0, 1.0]````.
     * @type {Number[]}
     */
    set baseColor(arg: number[]);
    /**
     * Gets the RGB diffuse color.
     *
     * Multiplies by the RGB components of {@link MetallicMaterial#baseColorMap}.
     *
     * Default value is ````[1.0, 1.0, 1.0]````.
     * @type {Number[]}
     */
    get baseColor(): number[];
    /**
     * Sets the metallic factor.
     *
     * This is in the range ````[0..1]```` and indicates how metallic this MetallicMaterial is.
     *
     * ````1```` is metal, ````0```` is non-metal.
     *
     * Multiplies by the *R* component of {@link MetallicMaterial#metallicMap} and the *A* component of {@link MetallicMaterial#metallicRoughnessMap}.
     *
     * Default value is ````1.0````.
     *
     * @type {Number}
     */
    set metallic(arg: number);
    /**
     * Gets the metallic factor.
     *
     * @type {Number}
     */
    get metallic(): number;
    /**
     *  Sets the roughness factor.
     *
     *  This factor is in the range ````[0..1]````, where ````0```` is fully smooth,````1```` is fully rough.
     *
     * Multiplies by the *R* component of {@link MetallicMaterial#roughnessMap}.
     *
     * Default value is ````1.0````.
     *
     * @type {Number}
     */
    set roughness(arg: number);
    /**
     * Gets the roughness factor.
     *
     * @type {Number}
     */
    get roughness(): number;
    /**
     * Sets the factor in the range [0..1] indicating specular Fresnel value.
     *
     * Default value is ````0.0````.
     *
     * @type {Number}
     */
    set specularF0(arg: number);
    /**
     * Gets the factor in the range [0..1] indicating specular Fresnel value.
     *
     * @type {Number}
     */
    get specularF0(): number;
    /**
     * Sets the RGB emissive color.
     *
     * Multiplies by {@link MetallicMaterial#emissiveMap}.
     *
     * Default value is ````[0.0, 0.0, 0.0]````.
     *
     * @type {Number[]}
     */
    set emissive(arg: number[]);
    /**
     * Gets the RGB emissive color.
     *
     * @type {Number[]}
     */
    get emissive(): number[];
    /**
     * Sets factor in the range ````[0..1]```` that indicates the alpha value.
     *
     * Multiplies by the *R* component of {@link MetallicMaterial#alphaMap} and the *A* component, if present, of {@link MetallicMaterial#baseColorMap}.
     *
     * The value of {@link MetallicMaterial#alphaMode} indicates how alpha is interpreted when rendering.
     *
     * Default value is ````1.0````.
     *
     * @type {Number}
     */
    set alpha(arg: number);
    /**
     * Gets factor in the range ````[0..1]```` that indicates the alpha value.
     *
     * @type {Number}
     */
    get alpha(): number;
    _baseColorMap: any;
    _metallicMap: any;
    _roughnessMap: any;
    _metallicRoughnessMap: any;
    _emissiveMap: any;
    _occlusionMap: any;
    _alphaMap: any;
    _normalMap: any;
    /**
     * Sets the alpha rendering mode.
     *
     * This specifies how alpha is interpreted. Alpha is the combined result of the {@link MetallicMaterial#alpha} and {@link MetallicMaterial#alphaMap} properties.
     *
     * Accepted values are:
     *
     * * "opaque" - The alpha value is ignored and the rendered output is fully opaque (default).
     * * "mask" - The rendered output is either fully opaque or fully transparent depending on the alpha and {@link MetallicMaterial#alphaCutoff}.
     * * "blend" - The alpha value is used to composite the source and destination areas. The rendered output is combined with the background using the normal painting operation (i.e. the Porter and Duff over operator).
     *
     * @type {String}
     */
    set alphaMode(arg: string);
    /**
     * Gets the alpha rendering mode.
     *
     * @type {String}
     */
    get alphaMode(): string;
    /**
     * Sets the alpha cutoff value.
     *
     * Specifies the cutoff threshold when {@link MetallicMaterial#alphaMode} equals "mask". If the alpha is greater than or equal to this value then it is rendered as fully opaque, otherwise, it is rendered as fully transparent. A value greater than 1.0 will render the entire
     * material as fully transparent. This value is ignored for other modes.
     *
     * Alpha is the combined result of the {@link MetallicMaterial#alpha} and {@link MetallicMaterial#alphaMap} properties.
     *
     * Default value is ````0.5````.
     *
     * @type {Number}
     */
    set alphaCutoff(arg: number);
    /**
     * Gets the alpha cutoff value.
     *
     * @type {Number}
     */
    get alphaCutoff(): number;
    /**
     * Sets whether backfaces are visible on attached {@link Mesh}es.
     *
     * The backfaces will belong to {@link ReadableGeometry} compoents that are also attached to the {@link Mesh}es.
     *
     * Default is ````false````.
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
     * @type {String}
     */
    get frontface(): string;
    /**
     * Sets the MetallicMaterial's line width.
     *
     * This is not supported by WebGL implementations based on DirectX [2019].
     *
     * Default value is ````1.0````.
     *
     * @type {Number}
     */
    set lineWidth(arg: number);
    /**
     * Gets the MetallicMaterial's line width.
     *
     * @type {Number}
     */
    get lineWidth(): number;
    /**
     * Sets the MetallicMaterial's point size.
     *
     * Default value is ````1.0````.
     *
     * @type {Number}
     */
    set pointSize(arg: number);
    /**
     * Gets the MetallicMaterial's point size.
     *
     * @type {Number}
     */
    get pointSize(): number;
    _makeHash(): void;
    /**
     * Gets the RGB {@link Texture} containing the diffuse color of this MetallicMaterial, with optional *A* component for alpha.
     *
     * The RGB components multiply by {@link MetallicMaterial#baseColor}, while the *A* component, if present, multiplies by {@link MetallicMaterial#alpha}.
     *
     * @type {Texture}
     */
    get baseColorMap(): any;
    /**
     * Gets the RGB {@link Texture} containing this MetallicMaterial's metallic factor in its *R* component.
     *
     * The *R* component multiplies by {@link MetallicMaterial#metallic}.
     *
     * @type {Texture}
     */
    get metallicMap(): any;
    /**
     * Gets the RGB {@link Texture} containing this MetallicMaterial's roughness factor in its *R* component.
     *
     * The *R* component multiplies by {@link MetallicMaterial#roughness}.
     *
     * @type {Texture}
     */
    get roughnessMap(): any;
    /**
     * Gets the RGB {@link Texture} containing this MetallicMaterial's metalness in its *R* component and roughness in its *G* component.
     *
     * Its *B* component multiplies by the {@link MetallicMaterial#metallic} property, while its *G* component multiplies by the {@link MetallicMaterial#roughness} property.
     *
     * @type {Texture}
     */
    get metallicRoughnessMap(): any;
    /**
     * Gets the RGB emissive map.
     *
     * Multiplies by {@link MetallicMaterial#emissive}.
     *
     * @type {Texture}
     */
    get emissiveMap(): any;
    /**
     * Gets the RGB ambient occlusion map.
     *
     * Multiplies by the specular and diffuse light reflected by surfaces.
     *
     * @type {Texture}
     */
    get occlusionMap(): any;
    /**
     * Gets the RGB {@link Texture} containing this MetallicMaterial's alpha in its *R* component.
     *
     * The *R* component multiplies by the {@link MetallicMaterial#alpha} property.
     *
     * @type {Texture}
     */
    get alphaMap(): any;
    /**
     * Gets the RGB tangent-space normal map {@link Texture}.
     *
     * @type {Texture}
     */
    get normalMap(): any;
}
