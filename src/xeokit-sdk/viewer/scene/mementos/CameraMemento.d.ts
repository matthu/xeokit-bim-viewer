/**
 * @desc Saves and restores the state of a {@link Scene}'s {@link Camera}.
 *
 * ## See Also
 *
 * * {@link ModelMemento} - Saves and restores a snapshot of the visual state of the {@link Entity}'s of a model within a {@link Scene}.
 * * {@link ObjectsMemento} - Saves and restores a snapshot of the visual state of the {@link Entity}'s that represent objects within a {@link Scene}.
 *
 * ## Usage
 *
 * In the example below, we'll create a {@link Viewer} and use an {@link XKTLoaderPlugin} to load an ````.xkt```` model. When the model has loaded, we'll save a snapshot of the {@link Camera} state in an CameraMemento. Then we'll move the Camera, and then we'll restore its original state again from the CameraMemento.
 *
 * ````javascript
 * import {Viewer} from "../src/viewer/Viewer.js";
 * import {CameraMemento} from "../src/scene/mementos/CameraMemento.js";
 *
 * const viewer = new Viewer({
 *     canvasId: "myCanvas"
 * });
 *
 * // Load a model
 * const xktLoader = new XKTLoaderPlugin(viewer);
 *
 * const model = xktLoader.load({
 *     id: "myModel",
 *     src: "./models/xkt/schependomlaan/schependomlaan.xkt"
 * });
 *
 * // Set camera
 * viewer.camera.eye = [-2.56, 8.38, 8.27];
 * viewer.camera.look = [13.44, 3.31, -14.83];
 * viewer.camera.up = [0.10, 0.98, -0.14];
 *
 * model.on("loaded", () => {
 *
 *      // Model has loaded
 *
 *      // Save memento of camera state
 *      const cameraMemento = new CameraMemento();
 *
 *      cameraMemento.saveCamera(viewer.scene);
 *
 *      // Move the camera
 *      viewer.camera.eye = [45.3, 2.00, 5.13];
 *      viewer.camera.look = [0.0, 5.5, 10.0];
 *      viewer.camera.up = [0.10, 0.98, -0.14];
 *
 *      // Restore the camera state again
 *      objectsMemento.restoreCamera(viewer.scene);
 * });
 * ````
 */
export class CameraMemento {
    /**
     * Creates a CameraState.
     *
     * @param {Scene} [scene] When given, immediately saves the state of the given {@link Scene}'s {@link Camera}.
     */
    constructor(scene?: any);
    /** @private */
    private _eye;
    /** @private */
    private _look;
    /** @private */
    private _up;
    /** @private */
    private _projection;
    /**
     * Saves the state of the given {@link Scene}'s {@link Camera}.
     *
     * @param {Scene} scene The scene that contains the {@link Camera}.
     */
    saveCamera(scene: any): void;
    /**
     * Restores a {@link Scene}'s {@link Camera} to the state previously captured with {@link CameraMemento#saveCamera}.
     *
     * @param {Scene} scene The scene.
     * @param {Function} [done] When this callback is given, will fly the {@link Camera} to the saved state then fire the callback. Otherwise will just jump the Camera to the saved state.
     */
    restoreCamera(scene: any, done?: Function): void;
}
