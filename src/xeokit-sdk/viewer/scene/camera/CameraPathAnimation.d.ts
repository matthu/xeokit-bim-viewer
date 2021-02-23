/**
 * @desc Animates the {@link Scene}'s's {@link Camera} along a {@link CameraPath}.
 *
 * ## Usage
 *
 * In the example below, we'll load a model using a {@link GLTFLoaderPlugin}, then animate a {@link Camera}
 * through the frames in a {@link CameraPath}.
 *
 *  * [[Run this example](http://xeokit.github.io/xeokit-sdk/examples/#camera_CameraPathAnimation)]
 *
 * ````Javascript
 * import {Viewer} from "viewer/Viewer.js";
 * import {GLTFLoaderPlugin} from "../src/plugins/GLTFLoaderPlugin/GLTFLoaderPlugin.js";
 * import {CameraPath} from "../src/scene/camera/CameraPath.js";
 * import {CameraPathAnimation} from "../src/scene/camera/CameraPathAnimation.js";
 *
 * // Create a Viewer and arrange camera
 *
 * const viewer = new Viewer({
 *     canvasId: "myCanvas",
 *     transparent: true
 * });
 *
 * viewer.camera.eye = [124.86756896972656, -93.50288391113281, 173.2632598876953];
 * viewer.camera.look = [102.14186096191406, -90.24193572998047, 173.4224395751953];
 * viewer.camera.up = [0.23516440391540527, 0.9719591736793518, -0.0016466031083837152];
 *
 * // Load model
 *
 * const gltfLoader = new GLTFLoaderPlugin(viewer);
 *
 * const model = gltfLoader.load({
 *     id: "myModel",
 *     src: "./models/gltf/modern_office/scene.gltf",
 *     edges: true,
 *     edgeThreshold: 20,
 *     xrayed: false
 * });
 *
 * // Create a CameraPath
 *
 * var cameraPath = new CameraPath(viewer.scene, {
 *     frames: [
 *         {
 *             t:    0,
 *             eye:  [124.86, -93.50, 173.26],
 *             look: [102.14, -90.24, 173.42],
 *             up:   [0.23, 0.97, -0.00]
 *         },
 *         {
 *             t:    1,
 *             eye:  [79.75, -85.98, 226.57],
 *             look: [99.24, -84.11, 238.56],
 *             up:   [-0.14, 0.98, -0.09]
 *         },
 *         // Rest of the frames omitted for brevity
 *     ]
 * });
 *
 * // Create a CameraPathAnimation to play our CameraPath
 *
 * var cameraPathAnimation = new CameraPathAnimation(viewer.scene, {
 *     cameraPath: cameraPath,
 *     playingRate: 0.2 // Playing 0.2 time units per second
 * });
 *
 * // Once model loaded, start playing after a couple of seconds delay
 *
 * model.on("loaded", function () {
 *     setTimeout(function () {
 *         cameraPathAnimation.play(0); // Play from the beginning of the CameraPath
 *     }, 2000);
 * });
 * ````
 */
export class CameraPathAnimation {
    /**
     * @constructor
     * @param {Component} [owner]  Owner component. When destroyed, the owner will destroy this CameraPathAnimation as well.
     * @param {*} [cfg] Configuration
     * @param {String} [cfg.id]  Optional ID, unique among all components in the parent {@link Scene}, generated automatically when omitted.
     * @param {CameraPath} [cfg.eyeCurve] A {@link CameraPath} that defines the path of a {@link Camera}.
     */
    constructor(owner?: any, cfg?: any);
    /**
     * Returns "CameraPathAnimation".
     *
     * @private
     * @returns {string} "CameraPathAnimation"
     */
    private get type();
    _cameraFlightAnimation: any;
    _t: number;
    state: number;
    _playingFromT: number;
    _playingToT: number;
    _playingRate: any;
    _playingDir: number;
    _lastTime: number;
    /**
     * Sets the {@link CameraPath} animated by this CameraPathAnimation.
     *
     @param {CameraPath} value The new CameraPath.
     */
    set cameraPath(arg: any);
    /**
     * Gets the {@link CameraPath} animated by this CameraPathAnimation.
     *
     @returns {CameraPath} The CameraPath.
     */
    get cameraPath(): any;
    _tick: any;
    _updateT(): void;
    _ease(t: any, b: any, c: any, d: any): any;
    _cameraPath: any;
    /**
     * Sets the rate at which the CameraPathAnimation animates the {@link Camera} along the {@link CameraPath}.
     *
     *  @param {Number} value The amount of progress per second.
     */
    set rate(arg: any);
    /**
     * Gets the rate at which the CameraPathAnimation animates the {@link Camera} along the {@link CameraPath}.
     *
     * @returns {*|number} The current playing rate.
     */
    get rate(): any;
    /**
     * Begins animating the {@link Camera} along CameraPathAnimation's {@link CameraPath} from the beginning.
     */
    play(): void;
    /**
     * Begins animating the {@link Camera} along CameraPathAnimation's {@link CameraPath} from the given time.
     *
     * @param {Number} t Time instant.
     */
    playToT(t: number): void;
    /**
     * Animates the {@link Camera} along CameraPathAnimation's {@link CameraPath} to the given frame.
     *
     * @param {Number} frameIdx Index of the frame to play to.
     */
    playToFrame(frameIdx: number): void;
    /**
     * Flies the {@link Camera} directly to the given frame on the CameraPathAnimation's {@link CameraPath}.
     *
     * @param {Number} frameIdx Index of the frame to play to.
     * @param {Function} [ok] Callback to fire when playing is complete.
     */
    flyToFrame(frameIdx: number, ok?: Function): void;
    /**
     * Scrubs the {@link Camera} to the given time on the CameraPathAnimation's {@link CameraPath}.
     *
     * @param {Number} t Time instant.
     */
    scrubToT(t: number): void;
    /**
     * Scrubs the {@link Camera} to the given frame on the CameraPathAnimation's {@link CameraPath}.
     *
     * @param {Number} frameIdx Index of the frame to scrub to.
     */
    scrubToFrame(frameIdx: number): void;
    /**
     * Stops playing this CameraPathAnimation.
     */
    stop(): void;
    destroy(): void;
}
export namespace CameraPathAnimation {
    const STOPPED: number;
    const SCRUBBING: number;
    const PLAYING: number;
    const PLAYING_TO: number;
}
