/**
 * A positional light source that originates from a single point and spreads outward in all directions, with optional attenuation over distance.
 *
 * * Has a position in {@link PointLight#pos}, but no direction.
 * * Defined in either *World* or *View* coordinate space. When in World-space, {@link PointLight#pos} is relative to
 * the World coordinate system, and will appear to move as the {@link Camera} moves. When in View-space,
 * {@link PointLight#pos} is relative to the View coordinate system, and will behave as if fixed to the viewer's head.
 * * Has {@link PointLight#constantAttenuation}, {@link PointLight#linearAttenuation} and {@link PointLight#quadraticAttenuation}
 * factors, which indicate how intensity attenuates over distance.
 * * {@link AmbientLight}s, {@link PointLight}s and {@link PointLight}s are registered by their {@link Component#id} on {@link Scene#lights}.
 *
 * ## Usage
 *
 * In the example below we'll replace the {@link Scene}'s default light sources with three World-space PointLights.
 *
 * [[Run this example](http://xeokit.github.io/xeokit-sdk/examples/#lights_PointLight_world)]
 *
 * ````javascript
 * import {Viewer} from "../src/viewer/Viewer.js";
 * import {Mesh} from "../src/scene/mesh/Mesh.js";
 * import {buildSphereGeometry} from "../src/scene/geometry/builders/buildSphereGeometry.js";
 * import {buildPlaneGeometry} from "../src/scene/geometry/builders/buildPlaneGeometry.js";
 * import {ReadableGeometry} from "../src/scene/geometry/ReadableGeometry.js";
 * import {PhongMaterial} from "../src/scene/materials/PhongMaterial.js";
 * import {Texture} from "../src/scene/materials/Texture.js";
 * import {PointLight} from "../src/scene/lights/PointLight.js";
 *
 * // Create a Viewer and arrange the camera
 *
 * const viewer = new Viewer({
 *      canvasId: "myCanvas"
 * });
 *
 * viewer.scene.camera.eye = [0, 0, 5];
 * viewer.scene.camera.look = [0, 0, 0];
 * viewer.scene.camera.up = [0, 1, 0];
 *
 * // Replace the Scene's default lights with three custom world-space PointLights
 *
 * viewer.scene.clearLights();
 *
 * new PointLight(viewer.scene,{
 *      id: "keyLight",
 *      pos: [-80, 60, 80],
 *      color: [1.0, 0.3, 0.3],
 *      intensity: 1.0,
 *      space: "world"
 * });
 *
 * new PointLight(viewer.scene,{
 *      id: "fillLight",
 *      pos: [80, 40, 40],
 *      color: [0.3, 1.0, 0.3],
 *      intensity: 1.0,
 *      space: "world"
 * });
 *
 * new PointLight(viewer.scene,{
 *      id: "rimLight",
 *      pos: [-20, 80, -80],
 *      color: [0.6, 0.6, 0.6],
 *      intensity: 1.0,
 *      space: "world"
 * });
 *
 * // Create a sphere and ground plane
 *
 * new Mesh(viewer.scene, {
 *      geometry: new ReadableGeometry(viewer.scene, buildSphereGeometry({
 *          radius: 1.3
 *      }),
 *      material: new PhongMaterial(viewer.scene, {
 *          diffuse: [0.7, 0.7, 0.7],
 *          specular: [1.0, 1.0, 1.0],
 *          emissive: [0, 0, 0],
 *          alpha: 1.0,
 *          ambient: [1, 1, 0],
 *          diffuseMap: new Texture(viewer.scene, {
 *              src: "textures/diffuse/uvGrid2.jpg"
 *          })
 *      })
 * });
 *
 * new Mesh(viewer.scene, {
 *      geometry: buildPlaneGeometry(ReadableGeometry, viewer.scene, {
 *          xSize: 30,
 *          zSize: 30
 *      }),
 *      material: new PhongMaterial(viewer.scene, {
 *          diffuseMap: new Texture(viewer.scene, {
 *               src: "textures/diffuse/uvGrid2.jpg"
 *          }),
 *          backfaces: true
 *      }),
 *      position: [0, -2.1, 0]
 * });
 * ````
 */
export class PointLight extends Light {
    /**
     * @param {Component} owner Owner component. When destroyed, the owner will destroy this PointLight as well.
     * @param {*} [cfg] The PointLight configuration
     * @param {String} [cfg.id] Optional ID, unique among all components in the parent {@link Scene}, generated automatically when omitted.
     * @param {Number[]} [cfg.pos=[ 1.0, 1.0, 1.0 ]] Position, in either World or View space, depending on the value of the **space** parameter.
     * @param {Number[]} [cfg.color=[0.7, 0.7, 0.8 ]] Color of this PointLight.
     * @param {Number} [cfg.intensity=1.0] Intensity of this PointLight, as a factor in range ````[0..1]````.
     * @param {Number} [cfg.constantAttenuation=0] Constant attenuation factor.
     * @param {Number} [cfg.linearAttenuation=0] Linear attenuation factor.
     * @param {Number} [cfg.quadraticAttenuation=0]Quadratic attenuation factor.
     * @param {String} [cfg.space="view"]The coordinate system this PointLight is defined in - "view" or "world".
     * @param {Boolean} [cfg.castsShadow=false] Flag which indicates if this PointLight casts a castsShadow.
     */
    constructor(owner: any, cfg?: any);
    _shadowRenderBuf: any;
    _shadowViewMatrix: any;
    _shadowProjMatrix: any;
    _shadowViewMatrixDirty: boolean;
    _shadowProjMatrixDirty: boolean;
    _onCameraViewMatrix: any;
    _onCameraProjMatrix: any;
    _onCanvasBoundary: any;
    _state: RenderState;
    /**
     * Sets the position of this PointLight.
     *
     * This will be either World- or View-space, depending on the value of {@link PointLight#space}.
     *
     * Default value is ````[1.0, 1.0, 1.0]````.
     *
     * @param {Number[]} pos The position.
     */
    set pos(arg: number[]);
    /**
     * Gets the position of this PointLight.
     *
     * This will be either World- or View-space, depending on the value of {@link PointLight#space}.
     *
     * Default value is ````[1.0, 1.0, 1.0]````.
     *
     * @returns {Number[]} The position.
     */
    get pos(): number[];
    /**
     * Sets the RGB color of this PointLight.
     *
     * Default value is ````[0.7, 0.7, 0.8]````.
     *
     * @param {Number[]} color The PointLight's RGB color.
     */
    set color(arg: number[]);
    /**
     * Gets the RGB color of this PointLight.
     *
     * Default value is ````[0.7, 0.7, 0.8]````.
     *
     * @returns {Number[]} The PointLight's RGB color.
     */
    get color(): number[];
    /**
     * Sets the intensity of this PointLight.
     *
     * Default intensity is ````1.0```` for maximum intensity.
     *
     * @param {Number} intensity The PointLight's intensity
     */
    set intensity(arg: number);
    /**
     * Gets the intensity of this PointLight.
     *
     * Default value is ````1.0```` for maximum intensity.
     *
     * @returns {Number} The PointLight's intensity.
     */
    get intensity(): number;
    /**
     * Sets the constant attenuation factor for this PointLight.
     *
     * Default value is ````0````.
     *
     * @param {Number} value The constant attenuation factor.
     */
    set constantAttenuation(arg: number);
    /**
     * Gets the constant attenuation factor for this PointLight.
     *
     * Default value is ````0````.
     *
     * @returns {Number} The constant attenuation factor.
     */
    get constantAttenuation(): number;
    /**
     * Sets the linear attenuation factor for this PointLight.
     *
     * Default value is ````0````.
     *
     * @param {Number} value The linear attenuation factor.
     */
    set linearAttenuation(arg: number);
    /**
     * Gets the linear attenuation factor for this PointLight.
     *
     * Default value is ````0````.
     *
     * @returns {Number} The linear attenuation factor.
     */
    get linearAttenuation(): number;
    /**
     * Sets the quadratic attenuation factor for this PointLight.
     *
     * Default value is ````0````.
     *
     * @param {Number} value The quadratic attenuation factor.
     */
    set quadraticAttenuation(arg: number);
    /**
     * Gets the quadratic attenuation factor for this PointLight.
     *
     * Default value is ````0````.
     *
     * @returns {Number} The quadratic attenuation factor.
     */
    get quadraticAttenuation(): number;
    /**
     * Sets if this PointLight casts a shadow.
     *
     * Default value is ````false````.
     *
     * @param {Boolean} castsShadow Set ````true```` to cast shadows.
     */
    set castsShadow(arg: boolean);
    /**
     * Gets if this PointLight casts a shadow.
     *
     * Default value is ````false````.
     *
     * @returns {Boolean} ````true```` if this PointLight casts shadows.
     */
    get castsShadow(): boolean;
    /**
     * Destroys this PointLight.
     */
    destroy(): void;
}
import { Light } from "@xeokit/xeokit-sdk/src/viewer/scene/lights/Light";
import { RenderState } from "@xeokit/xeokit-sdk/src/viewer/scene/webgl/RenderState";
