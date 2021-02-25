/**
 * @desc Configures Scalable Ambient Obscurance (LogDepthBuf) for a {@link Scene}.
 *
 *  <a href="https://xeokit.github.io/xeokit-sdk/examples/#postEffects_LogDepthBuf_OTCConferenceCenter"><img src="http://xeokit.io/img/docs/LogDepthBuf/saoEnabledDisabled.gif"></a>
 *
 * [[Run this example](https://xeokit.github.io/xeokit-sdk/examples/#postEeffects_LogDepthBuf_OTCConferenceCenter)]
 *
 * ## Overview
 *
 * LogDepthBuf approximates [Ambient Occlusion](https://en.wikipedia.org/wiki/Ambient_occlusion) in realtime. It darkens creases, cavities and surfaces
 * that are close to each other, which tend to be occluded from ambient light and appear darker.
 *
 * The animated GIF above shows the effect as we repeatedly enable and disable LogDepthBuf. When LogDepthBuf is enabled, we can see darkening
 * in regions such as the corners, and the crevices between stairs. This increases the amount of detail we can see when ambient
 * light is high, or when objects have uniform colors across their surfaces. Run the example to experiment with the various
 * LogDepthBuf configurations.
 *
 * xeokit's implementation of LogDepthBuf is based on the paper [Scalable Ambient Obscurance](https://research.nvidia.com/sites/default/files/pubs/2012-06_Scalable-Ambient-Obscurance/McGuire12LogDepthBuf.pdf).
 *
 * ## Caveats
 *
 * Currently, LogDepthBuf only works with perspective and orthographic projections. Therefore, to use LogDepthBuf, make sure {@link Camera#projection} is
 * either "perspective" or "ortho".
 *
 * {@link LogDepthBuf#scale} and {@link LogDepthBuf#intensity} must be tuned to the distance
 * between {@link Perspective#near} and {@link Perspective#far}, or the distance
 * between {@link Ortho#near} and {@link Ortho#far}, depending on which of those two projections the {@link Camera} is currently
 * using. Use the [live example](https://xeokit.github.io/xeokit-sdk/examples/#postEeffects_LogDepthBuf_OTCConferenceCenter) to get a
 * feel for that.
 *
 * ## Usage
 *
 * In the example below, we'll start by logging a warning message to the console if LogDepthBuf is not supported by the
 * system.
 *
 *Then we'll enable and configure LogDepthBuf, position the camera, and configure the near and far perspective and orthographic
 * clipping planes. Finally, we'll use {@link XKTLoaderPlugin} to load the OTC Conference Center model.
 *
 * ````javascript
 * import {Viewer} from "../src/viewer/Viewer.js";
 * import {XKTLoaderPlugin} from "../src/plugins/XKTLoaderPlugin/XKTLoaderPlugin.js";
 *
 * const viewer = new Viewer({
 *     canvasId: "myCanvas",
 *     transparent: true
 * });
 *
 * const sao = viewer.scene.sao;
 *
 * if (!sao.supported) {
 *     sao.warn("LogDepthBuf is not supported on this system - ignoring LogDepthBuf configs")
 * }
 *
 * sao.enabled = true; // Enable LogDepthBuf - only works if supported (see above)
 * sao.intensity = 0.20;
 * sao.bias = 0.5;
 * sao.scale = 500.0;
 * sao.minResolution = 0.0;
 * sao.kernelRadius = 100;
 * sao.blendCutoff = 0.2;
 *
 * const camera = viewer.scene.camera;
 *
 * camera.eye = [3.69, 5.83, -23.98];
 * camera.look = [84.31, -29.88, -116.21];
 * camera.up = [0.18, 0.96, -0.21];
 *
 * camera.perspective.near = 0.1;
 * camera.perspective.far = 2000.0;
 *
 * camera.ortho.near = 0.1;
 * camera.ortho.far = 2000.0;
 * camera.projection = "perspective";
 *
 * const xktLoader = new XKTLoaderPlugin(viewer);
 *
 * const model = xktLoader.load({
 *     id: "myModel",
 *     src: "./models/xkt/OTCConferenceCenter/OTCConferenceCenter.xkt",
 *     metaModelSrc: "./metaModels/OTCConferenceCenter/metaModel.json",
 *     edges: true
 * });
 * ````
 *
 * [[Run this example](https://xeokit.github.io/xeokit-sdk/examples/#postEeffects_LogDepthBuf_OTCConferenceCenter)]
 *
 * ## Efficiency
 *
 * LogDepthBuf can incur some rendering overhead, especially on objects that are viewed close to the camera. For this reason,
 * it's recommended to use a low value for {@link LogDepthBuf#kernelRadius}.  A low radius will sample pixels that are close
 * to the source pixel, which will allow the GPU to efficiently cache those pixels. When {@link Camera#projection} is "perspective",
 * objects near to the viewpoint will use larger radii than farther pixels. Therefore, computing  LogDepthBuf for close objects
 * is more expensive than for objects far away, that occupy fewer pixels on the canvas.
 *
 * ## Selectively enabling LogDepthBuf for models
 *
 * When loading multiple models into a Scene, we sometimes only want LogDepthBuf on the models that are actually going to
 * show it, such as the architecture or structure, and not show LogDepthBuf on models that won't show it well, such as the
 * electrical wiring, or plumbing.
 *
 * To illustrate, lets load some of the models for the West Riverside Hospital. We'll enable LogDepthBuf on the structure model,
 * but disable it on the electrical and plumbing.
 *
 * This will only apply LogDepthBuf to those models if {@link LogDepthBuf#supported} and {@link LogDepthBuf#enabled} are both true.
 *
 * Note, by the way, how we load the models in sequence. Since XKTLoaderPlugin uses scratch memory as part of its loading
 * process, this allows the plugin to reuse that same memory across multiple loads, instead of having to create multiple
 * pools of scratch memory.
 *
 * ````javascript
 * const structure = xktLoader.load({
 *      id: "structure",
 *      src: "./models/xkt/WestRiverSideHospital/structure.xkt",
 *      metaModelSrc: "./metaModels/WestRiverSideHospital/structure.json",
 *      edges: true,
 *      saoEnabled: true
 *  });
 *
 *  structure.on("loaded", () => {
 *
 *      const electrical = xktLoader.load({
 *          id: "electrical",
 *          src: "./models/xkt/WestRiverSideHospital/electrical.xkt",
 *          metaModelSrc: "./metaModels/WestRiverSideHospital/electrical.json",
 *          edges: true
 *      });
 *
 *      electrical.on("loaded", () => {
 *
 *          const plumbing = xktLoader.load({
 *              id: "plumbing",
 *              src: "./models/xkt/WestRiverSideHospital/plumbing.xkt",
 *              metaModelSrc: "./metaModels/WestRiverSideHospital/plumbing.json",
 *                  edges: true
 *              });
 *          });
 *      });
 * });
 * ````
 *
 * ## Disabling LogDepthBuf while camera is moving
 *
 * For smoother interaction with large models on low-power hardware, we can disable LogDepthBuf while the {@link Camera} is moving:
 *
 * ````javascript
 * const timeoutDuration = 150; // Milliseconds
 * var timer = timeoutDuration;
 * var saoDisabled = false;
 *
 * const onCameraMatrix = scene.camera.on("matrix", () => {
 *     timer = timeoutDuration;
 *     if (!saoDisabled) {
 *         scene.sao.enabled = false;
 *         saoDisabled = true;
 *     }
 * });
 *
 * const onSceneTick = scene.on("tick", (tickEvent) => {
 *     if (!saoDisabled) {
 *         return;
 *     }
 *     timer -= tickEvent.deltaTime; // Milliseconds
 *     if (timer <= 0) {
 *         if (saoDisabled) {
 *             scene.sao.enabled = true;
 *             saoDisabled = false;
 *         }
 *     }
 * });
 * ````
 *
 * [[Run this example](https://xeokit.github.io/xeokit-sdk/examples/#techniques_nonInteractiveQuality)]
 */
export class LogDepthBuf {
    /** @private */
    private constructor();
    _supported: any;
    /**
     * Sets whether logarithmic depth buffer is enabled for the {@link Scene}.
     *
     * Even when enabled, logarithmic depth buffer will only work if supported.
     *
     * Default value is ````false````.
     *
     * @type {Boolean}
     */
    set enabled(arg: boolean);
    /**
     * Gets whether LogDepthBuf is enabled for the {@link Scene}.
     *
     * Even when enabled, LogDepthBuf will only apply if supported.
     *
     * Default value is ````false````.
     *
     * @type {Boolean}
     */
    get enabled(): boolean;
    /**
     * Sets the maximum area that LogDepthBuf takes into account when checking for possible occlusion.
     *
     * Default value is ````100.0````.
     *
     * @type {Number}
     */
    set kernelRadius(arg: number);
    /**
     * Gets the maximum area that LogDepthBuf takes into account when checking for possible occlusion.
     *
     * Default value is ````100.0````.
     *
     * @type {Number}
     */
    get kernelRadius(): number;
    /**
     * Sets the degree of darkening (ambient obscurance) produced by the LogDepthBuf effect.
     *
     * Default value is ````0.20````.
     *
     * @type {Number}
     */
    set intensity(arg: number);
    /**
     * Gets the degree of darkening (ambient obscurance) produced by the LogDepthBuf effect.
     *
     * Default value is ````0.25````.
     *
     * @type {Number}
     */
    get intensity(): number;
    /**
     * Sets the LogDepthBuf bias.
     *
     * Default value is ````0.5````.
     *
     * @type {Number}
     */
    set bias(arg: number);
    /**
     * Gets the LogDepthBuf bias.
     *
     * Default value is ````0.5````.
     *
     * @type {Number}
     */
    get bias(): number;
    /**
     * Sets the LogDepthBuf occlusion scale.
     *
     * Default value is ````500.0````.
     *
     * @type {Number}
     */
    set scale(arg: number);
    /**
     * Gets the LogDepthBuf occlusion scale.
     *
     * Default value is ````500.0````.
     *
     * @type {Number}
     */
    get scale(): number;
    /**
     * Sets the LogDepthBuf minimum resolution.
     *
     * Default value is ````0.0````.
     *
     * @type {Number}
     */
    set minResolution(arg: number);
    /**
     * Gets the LogDepthBuf minimum resolution.
     *
     * Default value is ````0.0````.
     *
     * @type {Number}
     */
    get minResolution(): number;
    /**
     * Sets whether Guassian blur is enabled.
     *
     * Default value is ````true````.
     *
     * @type {Boolean}
     */
    set blur(arg: boolean);
    /**
     * Gets whether Guassian blur is enabled.
     *
     * Default value is ````true````.
     *
     * @type {Boolean}
     */
    get blur(): boolean;
    /**
     * Sets the LogDepthBuf blend cutoff.
     *
     * Default value is ````0.2````.
     *
     * Normally you don't need to alter this.
     *
     * @type {Number}
     * @private
     */
    private set blendCutoff(arg);
    /**
     * Gets the LogDepthBuf blend cutoff.
     *
     * Default value is ````0.2````.
     *
     * Normally you don't need to alter this.
     *
     * @type {Number}
     * @private
     */
    private get blendCutoff();
    /**
     * Sets the LogDepthBuf blend factor.
     *
     * Default value is ````1.0````.
     *
     * Normally you don't need to alter this.
     *
     * @type {Number}
     * @private
     */
    private set blendFactor(arg);
    /**
     * Gets the LogDepthBuf blend scale.
     *
     * Default value is ````1.0````.
     *
     * Normally you don't need to alter this.
     *
     * @type {Number}
     * @private
     */
    private get blendFactor();
    /**
     * Gets whether or not logarithmic depth buffer is supported by this system.
     *
     * Even when enabled, logarithmic depth buffer will only work if supported.
     *
     * @type {Boolean}
     */
    get supported(): boolean;
    _enabled: any;
    /**
     * Returns true if LogDepthBuf is currently possible, where it is supported, enabled, and the current scene state is compatible.
     * Called internally by renderer logic.
     * @private
     * @returns {boolean}
     */
    private get possible();
    /**
     * @private
     * @returns {boolean|*}
     */
    private get active();
    _kernelRadius: any;
    _intensity: any;
    _bias: any;
    _scale: any;
    _minResolution: any;
    _blur: any;
    _blendCutoff: any;
    _blendFactor: any;
    /**
     * Destroys this component.
     */
    destroy(): void;
}