/**
 * @desc Configures the normal rendered appearance of {@link Mesh}es using the non-physically-correct Blinn-Phong shading model.
 *
 * * Useful for non-realistic objects like gizmos.
 * * {@link SpecularMaterial} is best for insulators, such as wood, ceramics and plastic.
 * * {@link MetallicMaterial} is best for conductive materials, such as metal.
 * * {@link LambertMaterial} is appropriate for high-detail models that need to render as efficiently as possible.
 *
 * ## Usage
 *
 * In the example below, we'll create a {@link Mesh} with a PhongMaterial with a diffuse {@link Texture} and a specular {@link Fresnel}, using a {@link buildTorusGeometry} to create the {@link Geometry}.
 *
 * [[Run this example](http://xeokit.github.io/xeokit-sdk/examples/#materials_PhongMaterial)]
 *
 *  ```` javascript
 * import {Viewer} from "../src/viewer/Viewer.js";
 * import {Mesh} from "../src/scene/mesh/Mesh.js";
 * import {buildTorusGeometry} from "../src/scene/geometry/builders/buildTorusGeometry.js";
 * import {ReadableGeometry} from "../src/scene/geometry/ReadableGeometry.js";
 * import {PhongMaterial} from "../src/scene/materials/PhongMaterial.js";
 * import {Texture} from "../src/scene/materials/Texture.js";
 * import {Fresnel} from "../src/scene/materials/Fresnel.js";
 *
 * const viewer = new Viewer({
 *        canvasId: "myCanvas"
 *    });
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
 *          radialSegments: 32,
 *          tubeSegments: 24,
 *          arc: Math.PI * 2.0
 *      }),
 *      material: new PhongMaterial(viewer.scene, {
 *          ambient: [0.9, 0.3, 0.9],
 *          shininess: 30,
 *          diffuseMap: new Texture(viewer.scene, {
 *              src: "textures/diffuse/uvGrid2.jpg"
 *          }),
 *          specularFresnel: new Fresnel(viewer.scene, {
 *              leftColor: [1.0, 1.0, 1.0],
 *              rightColor: [0.0, 0.0, 0.0],
 *              power: 4
 *          })
 *     })
 * });
 * ````
 *
 * ## PhongMaterial Properties
 *
 *  The following table summarizes PhongMaterial properties:
 *
 * | Property | Type | Range | Default Value | Space | Description |
 * |:--------:|:----:|:-----:|:-------------:|:-----:|:-----------:|
 * | {@link PhongMaterial#ambient} | Array | [0, 1] for all components | [1,1,1,1] | linear | The RGB components of the ambient light reflected by the material. |
 * | {@link PhongMaterial#diffuse} | Array | [0, 1] for all components | [1,1,1,1] | linear | The RGB components of the diffuse light reflected by the material. |
 * | {@link PhongMaterial#specular} | Array | [0, 1] for all components | [1,1,1,1] | linear | The RGB components of the specular light reflected by the material. |
 * | {@link PhongMaterial#emissive} | Array | [0, 1] for all components | [0,0,0] | linear | The RGB components of the light emitted by the material. |
 * | {@link PhongMaterial#alpha} | Number | [0, 1] | 1 | linear | The transparency of the material surface (0 fully transparent, 1 fully opaque). |
 * | {@link PhongMaterial#shininess} | Number | [0, 128] | 80 | linear | Determines the size and sharpness of specular highlights. |
 * | {@link PhongMaterial#reflectivity} | Number | [0, 1] | 1 | linear | Determines the amount of reflectivity. |
 * | {@link PhongMaterial#diffuseMap} | {@link Texture} |  | null | sRGB | Texture RGB components multiplying by {@link PhongMaterial#diffuse}. If the fourth component (A) is present, it multiplies by {@link PhongMaterial#alpha}. |
 * | {@link PhongMaterial#specularMap} | {@link Texture} |  | null | sRGB | Texture RGB components multiplying by {@link PhongMaterial#specular}. If the fourth component (A) is present, it multiplies by {@link PhongMaterial#alpha}. |
 * | {@link PhongMaterial#emissiveMap} | {@link Texture} |  | null | linear | Texture with RGB components multiplying by {@link PhongMaterial#emissive}. |
 * | {@link PhongMaterial#alphaMap} | {@link Texture} |  | null | linear | Texture with first component multiplying by {@link PhongMaterial#alpha}. |
 * | {@link PhongMaterial#occlusionMap} | {@link Texture} |  | null | linear | Ambient occlusion texture multiplying by {@link PhongMaterial#ambient}, {@link PhongMaterial#diffuse} and {@link PhongMaterial#specular}. |
 * | {@link PhongMaterial#normalMap} | {@link Texture} |  | null | linear | Tangent-space normal map. |
 * | {@link PhongMaterial#diffuseFresnel} | {@link Fresnel} |  | null |  | Fresnel term applied to {@link PhongMaterial#diffuse}. |
 * | {@link PhongMaterial#specularFresnel} | {@link Fresnel} |  | null |  | Fresnel term applied to {@link PhongMaterial#specular}. |
 * | {@link PhongMaterial#emissiveFresnel} | {@link Fresnel} |  | null |  | Fresnel term applied to {@link PhongMaterial#emissive}. |
 * | {@link PhongMaterial#reflectivityFresnel} | {@link Fresnel} |  | null |  | Fresnel term applied to {@link PhongMaterial#reflectivity}. |
 * | {@link PhongMaterial#alphaFresnel} | {@link Fresnel} |  | null |  | Fresnel term applied to {@link PhongMaterial#alpha}. |
 * | {@link PhongMaterial#lineWidth} | Number | [0..100] | 1 |  | Line width in pixels. |
 * | {@link PhongMaterial#pointSize} | Number | [0..100] | 1 |  | Point size in pixels. |
 * | {@link PhongMaterial#alphaMode} | String | "opaque", "blend", "mask" | "blend" |  | Alpha blend mode. |
 * | {@link PhongMaterial#alphaCutoff} | Number | [0..1] | 0.5 |  | Alpha cutoff value. |
 * | {@link PhongMaterial#backfaces} | Boolean |  | false |  | Whether to render geometry backfaces. |
 * | {@link PhongMaterial#frontface} | String | "ccw", "cw" | "ccw" |  | The winding order for geometry frontfaces - "cw" for clockwise, or "ccw" for counter-clockwise. |
 */
export class PhongMaterial extends Material {
    /**
     * @param {Component} owner Owner component. When destroyed, the owner will destroy this component as well.
     * @param {*} [cfg] The PhongMaterial configuration
     * @param {String} [cfg.id] Optional ID, unique among all components in the parent {@link Scene}, generated automatically when omitted.
     * @param {Number[]} [cfg.ambient=[1.0, 1.0, 1.0 ]]  PhongMaterial ambient color.
     * @param {Number[]} [cfg.diffuse=[ 1.0, 1.0, 1.0 ]] PhongMaterial diffuse color.
     * @param {Number[]} [cfg.specular=[ 1.0, 1.0, 1.0 ]]  PhongMaterial specular color.
     * @param {Number[]} [cfg.emissive=[ 0.0, 0.0, 0.0 ]] PhongMaterial emissive color.
     * @param {Number} [cfg.alpha=1] Scalar in range 0-1 that controls alpha, where 0 is completely transparent and 1 is completely opaque.
     * @param {Number} [cfg.shininess=80] Scalar in range 0-128 that determines the size and sharpness of specular highlights.
     * @param {Number} [cfg.reflectivity=1] Scalar in range 0-1 that controls how much {@link ReflectionMap} is reflected.
     * @param {Number} [cfg.lineWidth=1] Scalar that controls the width of lines.
     * @param {Number} [cfg.pointSize=1] Scalar that controls the size of points.
     * @param {Texture} [cfg.ambientMap=null] A ambient map {@link Texture}, which will multiply by the diffuse property. Must be within the same {@link Scene} as this PhongMaterial.
     * @param {Texture} [cfg.diffuseMap=null] A diffuse map {@link Texture}, which will override the effect of the diffuse property. Must be within the same {@link Scene} as this PhongMaterial.
     * @param {Texture} [cfg.specularMap=null] A specular map {@link Texture}, which will override the effect of the specular property. Must be within the same {@link Scene} as this PhongMaterial.
     * @param {Texture} [cfg.emissiveMap=undefined] An emissive map {@link Texture}, which will override the effect of the emissive property. Must be within the same {@link Scene} as this PhongMaterial.
     * @param {Texture} [cfg.normalMap=undefined] A normal map {@link Texture}. Must be within the same {@link Scene} as this PhongMaterial.
     * @param {Texture} [cfg.alphaMap=undefined] An alpha map {@link Texture}, which will override the effect of the alpha property. Must be within the same {@link Scene} as this PhongMaterial.
     * @param {Texture} [cfg.reflectivityMap=undefined] A reflectivity control map {@link Texture}, which will override the effect of the reflectivity property. Must be within the same {@link Scene} as this PhongMaterial.
     * @param {Texture} [cfg.occlusionMap=null] An occlusion map {@link Texture}. Must be within the same {@link Scene} as this PhongMaterial.
     * @param {Fresnel} [cfg.diffuseFresnel=undefined] A diffuse {@link Fresnel"}}Fresnel{{/crossLink}}. Must be within the same {@link Scene} as this PhongMaterial.
     * @param {Fresnel} [cfg.specularFresnel=undefined] A specular {@link Fresnel"}}Fresnel{{/crossLink}}. Must be within the same {@link Scene} as this PhongMaterial.
     * @param {Fresnel} [cfg.emissiveFresnel=undefined] An emissive {@link Fresnel"}}Fresnel{{/crossLink}}. Must be within the same {@link Scene} as this PhongMaterial.
     * @param {Fresnel} [cfg.alphaFresnel=undefined] An alpha {@link Fresnel"}}Fresnel{{/crossLink}}. Must be within the same {@link Scene} as this PhongMaterial.
     * @param {Fresnel} [cfg.reflectivityFresnel=undefined] A reflectivity {@link Fresnel"}}Fresnel{{/crossLink}}. Must be within the same {@link Scene} as this PhongMaterial.
     * @param {String} [cfg.alphaMode="opaque"] The alpha blend mode - accepted values are "opaque", "blend" and "mask". See the {@link PhongMaterial#alphaMode} property for more info.
     * @param {Number} [cfg.alphaCutoff=0.5] The alpha cutoff value. See the {@link PhongMaterial#alphaCutoff} property for more info.
     * @param {Boolean} [cfg.backfaces=false] Whether to render geometry backfaces.
     * @param {Boolean} [cfg.frontface="ccw"] The winding order for geometry front faces - "cw" for clockwise, or "ccw" for counter-clockwise.
     */
    constructor(owner: any, cfg?: any);
    _state: RenderState;
    /**
     * Sets the PhongMaterial's ambient color.
     *
     * Default value is ````[0.3, 0.3, 0.3]````.
     *
     * @type {Number[]}
     */
    set ambient(arg: number[]);
    /**
     * Gets the PhongMaterial's ambient color.
     *
     * Default value is ````[0.3, 0.3, 0.3]````.
     *
     * @type {Number[]}
     */
    get ambient(): number[];
    /**
     * Sets the PhongMaterial's diffuse color.
     *
     * Multiplies by {@link PhongMaterial#diffuseMap}.
     *
     * Default value is ````[1.0, 1.0, 1.0]````.
     *
     * @type {Number[]}
     */
    set diffuse(arg: number[]);
    /**
     * Sets the PhongMaterial's diffuse color.
     *
     * Multiplies by {@link PhongMaterial#diffuseMap}.
     *
     * Default value is ````[1.0, 1.0, 1.0]````.
     *
     * @type {Number[]}
     */
    get diffuse(): number[];
    /**
     * Sets the PhongMaterial's specular color.
     *
     * Multiplies by {@link PhongMaterial#specularMap}.
     * Default value is ````[1.0, 1.0, 1.0]````.
     * @type {Number[]}
     */
    set specular(arg: number[]);
    /**
     * Gets the PhongMaterial's specular color.
     *
     * Multiplies by {@link PhongMaterial#specularMap}.
     * Default value is ````[1.0, 1.0, 1.0]````.
     * @type {Number[]}
     */
    get specular(): number[];
    /**
     * Sets the PhongMaterial's emissive color.
     *
     * Multiplies by {@link PhongMaterial#emissiveMap}.
     *
     * Default value is ````[0.0, 0.0, 0.0]````.
     * @type {Number[]}
     */
    set emissive(arg: number[]);
    /**
     * Gets the PhongMaterial's emissive color.
     *
     * Multiplies by {@link PhongMaterial#emissiveMap}.
     *
     * Default value is ````[0.0, 0.0, 0.0]````.
     * @type {Number[]}
     */
    get emissive(): number[];
    /**
     * Sets the PhongMaterial alpha.
     *
     * This is a factor in the range [0..1] indicating how transparent the PhongMaterial is.
     *
     * A value of 0.0 indicates fully transparent, 1.0 is fully opaque.
     *
     * Multiplies by {@link PhongMaterial#alphaMap}.
     *
     * Default value is ````1.0````.
     *
     * @type {Number}
     */
    set alpha(arg: number);
    /**
     * Gets the PhongMaterial alpha.
     *
     * This is a factor in the range [0..1] indicating how transparent the PhongMaterial is.
     *
     * A value of 0.0 indicates fully transparent, 1.0 is fully opaque.
     *
     * Multiplies by {@link PhongMaterial#alphaMap}.
     *
     * Default value is ````1.0````.
     *
     * @type {Number}
     */
    get alpha(): number;
    /**
     * Sets the PhongMaterial shininess.
     *
     * This is a factor in range [0..128] that determines the size and sharpness of the specular highlights create by this PhongMaterial.
     *
     * Larger values produce smaller, sharper highlights. A value of 0.0 gives very large highlights that are almost never
     * desirable. Try values close to 10 for a larger, fuzzier highlight and values of 100 or more for a small, sharp
     * highlight.
     *
     * Default value is ```` 80.0````.
     *
     * @type {Number}
     */
    set shininess(arg: number);
    /**
     * Gets the PhongMaterial shininess.
     *
     * This is a factor in range [0..128] that determines the size and sharpness of the specular highlights create by this PhongMaterial.
     *
     * Larger values produce smaller, sharper highlights. A value of 0.0 gives very large highlights that are almost never
     * desirable. Try values close to 10 for a larger, fuzzier highlight and values of 100 or more for a small, sharp
     * highlight.
     *
     * Default value is ```` 80.0````.
     *
     * @type {Number}
     */
    get shininess(): number;
    /**
     * Sets how much {@link ReflectionMap} is reflected by this PhongMaterial.
     *
     * This is a scalar in range ````[0-1]````. Default value is ````1.0````.
     *
     * The surface will be non-reflective when this is ````0````, and completely mirror-like when it is ````1.0````.
     *
     * Multiplies by {@link PhongMaterial#reflectivityMap}.
     *
     * @type {Number}
     */
    set reflectivity(arg: number);
    /**
     * Gets how much {@link ReflectionMap} is reflected by this PhongMaterial.
     *
     * This is a scalar in range ````[0-1]````. Default value is ````1.0````.
     *
     * The surface will be non-reflective when this is ````0````, and completely mirror-like when it is ````1.0````.
     *
     * Multiplies by {@link PhongMaterial#reflectivityMap}.
     *
     * @type {Number}
     */
    get reflectivity(): number;
    /**
     * Sets the PhongMaterial's line width.
     *
     * This is not supported by WebGL implementations based on DirectX [2019].
     *
     * Default value is ````1.0````.
     *
     * @type {Number}
     */
    set lineWidth(arg: number);
    /**
     * Gets the PhongMaterial's line width.
     *
     * This is not supported by WebGL implementations based on DirectX [2019].
     *
     * Default value is ````1.0````.
     *
     * @type {Number}
     */
    get lineWidth(): number;
    /**
     * Sets the PhongMaterial's point size.
     *
     * Default value is 1.0.
     *
     * @type {Number}
     */
    set pointSize(arg: number);
    /**
     * Gets the PhongMaterial's point size.
     *
     * Default value is 1.0.
     *
     * @type {Number}
     */
    get pointSize(): number;
    _ambientMap: any;
    _diffuseMap: any;
    _specularMap: any;
    _emissiveMap: any;
    _alphaMap: any;
    _reflectivityMap: any;
    _normalMap: any;
    _occlusionMap: any;
    _diffuseFresnel: any;
    _specularFresnel: any;
    _emissiveFresnel: any;
    _alphaFresnel: any;
    _reflectivityFresnel: any;
    /**
     * Sets the PhongMaterial's alpha rendering mode.
     *
     * This governs how alpha is treated. Alpha is the combined result of {@link PhongMaterial#alpha} and {@link PhongMaterial#alphaMap}.
     *
     * Supported values are:
     *
     * * "opaque" - The alpha value is ignored and the rendered output is fully opaque (default).
     * * "mask" - The rendered output is either fully opaque or fully transparent depending on the alpha value and the specified alpha cutoff value.
     * * "blend" - The alpha value is used to composite the source and destination areas. The rendered output is combined with the background using the normal painting operation (i.e. the Porter and Duff over operator).
     *
     *@type {String}
     */
    set alphaMode(arg: string);
    /**
     * Gets the PhongMaterial's alpha rendering mode.
     *
     *@type {String}
     */
    get alphaMode(): string;
    /**
     * Sets the PhongMaterial's alpha cutoff value.
     *
     * This specifies the cutoff threshold when {@link PhongMaterial#alphaMode} equals "mask". If the alpha is greater than or equal to this value then it is rendered as fully
     * opaque, otherwise, it is rendered as fully transparent. A value greater than 1.0 will render the entire material as fully transparent. This value is ignored for other modes.
     *
     * Alpha is the combined result of {@link PhongMaterial#alpha} and {@link PhongMaterial#alphaMap}.
     *
     * Default value is ````0.5````.
     *
     * @type {Number}
     */
    set alphaCutoff(arg: number);
    /**
     * Gets the PhongMaterial's alpha cutoff value.
     *
     * @type {Number}
     */
    get alphaCutoff(): number;
    /**
     * Sets whether backfaces are visible on attached {@link Mesh}es.
     *
     * The backfaces will belong to {@link Geometry} compoents that are also attached to the {@link Mesh}es.
     *
     * Default is ````false````.
     *
     * @type {Boolean}
     */
    set backfaces(arg: boolean);
    /**
     * Gets whether backfaces are visible on attached {@link Mesh}es.
     *
     * Default is ````false````.
     *
     * @type {Boolean}
     */
    get backfaces(): boolean;
    /**
     * Sets the winding direction of geometry front faces.
     *
     * Default is ````"ccw"````.
     * @type {String}
     */
    set frontface(arg: string);
    /**
     * Gets the winding direction of front faces on attached {@link Mesh}es.
     *
     * Default is ````"ccw"````.
     * @type {String}
     */
    get frontface(): string;
    _makeHash(): void;
    /**
     * Gets the PhongMaterials's normal map {@link Texture}.
     *
     * @type {Texture}
     */
    get normalMap(): any;
    /**
     * Gets the PhongMaterials's ambient {@link Texture}.
     *
     * Multiplies by {@link PhongMaterial#ambient}.
     *
     * @type {Texture}
     */
    get ambientMap(): any;
    /**
     * Gets the PhongMaterials's diffuse {@link Texture}.
     *
     * Multiplies by {@link PhongMaterial#diffuse}.
     *
     * @type {Texture}
     */
    get diffuseMap(): any;
    /**
     * Gets the PhongMaterials's specular {@link Texture}.
     *
     * Multiplies by {@link PhongMaterial#specular}.
     *
     * @type {Texture}
     */
    get specularMap(): any;
    /**
     * Gets the PhongMaterials's emissive {@link Texture}.
     *
     * Multiplies by {@link PhongMaterial#emissive}.
     *
     * @type {Texture}
     */
    get emissiveMap(): any;
    /**
     * Gets the PhongMaterials's alpha {@link Texture}.
     *
     * Multiplies by {@link PhongMaterial#alpha}.
     *
     * @type {Texture}
     */
    get alphaMap(): any;
    /**
     * Gets the PhongMaterials's reflectivity {@link Texture}.
     *
     * Multiplies by {@link PhongMaterial#reflectivity}.
     *
     * @type {Texture}
     */
    get reflectivityMap(): any;
    /**
     * Gets the PhongMaterials's ambient occlusion {@link Texture}.
     *
     * @type {Texture}
     */
    get occlusionMap(): any;
    /**
     * Gets the PhongMaterials's diffuse {@link Fresnel}.
     *
     * Applies to {@link PhongMaterial#diffuse}.
     *
     * @type {Fresnel}
     */
    get diffuseFresnel(): any;
    /**
     * Gets the PhongMaterials's specular {@link Fresnel}.
     *
     * Applies to {@link PhongMaterial#specular}.
     *
     * @type {Fresnel}
     */
    get specularFresnel(): any;
    /**
     * Gets the PhongMaterials's emissive {@link Fresnel}.
     *
     * Applies to {@link PhongMaterial#emissive}.
     *
     * @type {Fresnel}
     */
    get emissiveFresnel(): any;
    /**
     * Gets the PhongMaterials's alpha {@link Fresnel}.
     *
     * Applies to {@link PhongMaterial#alpha}.
     *
     * @type {Fresnel}
     */
    get alphaFresnel(): any;
    /**
     * Gets the PhongMaterials's reflectivity {@link Fresnel}.
     *
     * Applies to {@link PhongMaterial#reflectivity}.
     *
     * @type {Fresnel}
     */
    get reflectivityFresnel(): any;
}
import { Material } from "@xeokit/xeokit-sdk/src/viewer/scene/materials/Material";
import { RenderState } from "@xeokit/xeokit-sdk/src/viewer/scene/webgl/RenderState";
