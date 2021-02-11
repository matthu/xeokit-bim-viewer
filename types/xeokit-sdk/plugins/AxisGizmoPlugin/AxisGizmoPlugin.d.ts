/**
 * {@link Viewer} plugin that shows the axii of the World-space coordinate system.
 *
 * ## Usage
 *
 * [[Run this example](https://xeokit.github.io/xeokit-sdk/examples/#gizmos_AxisGizmoPlugin)]
 *
 * ````JavaScript````
 * import {Viewer} from "../src/viewer/Viewer.js";
 * import {GLTFLoaderPlugin} from "../src/plugins/GLTFLoaderPlugin/GLTFLoaderPlugin.js";
 * import {AxisGizmoPlugin} from "../src/plugins/AxisGizmoPlugin/AxisGizmoPlugin.js";
 *
 * const viewer = new Viewer({
 *     canvasId: "myCanvas"
 * });
 *
 * const gltfLoader = new GLTFLoaderPlugin(viewer);
 *
 * new AxisGizmoPlugin(viewer, {size: [250, 250]});
 *
 * const model = gltfLoader.load({
 *     id: "myModel",
 *     src: "./models/gltf/schependomlaan/scene.gltf",
 *     metaModelSrc: "./metaModels/schependomlaan/metaModel.json",
 *     edges: true
 * });
 *
 * const scene = viewer.scene;
 * const camera = scene.camera;
 *
 * camera.orbitPitch(20);
 *
 * model.on("loaded", () => {
 *     viewer.cameraFlight.jumpTo(modelNode);
 *     scene.on("tick", () => {
 *        camera.orbitYaw(0.4);
 *     })
 * });
 * ````
 */
export class AxisGizmoPlugin {
    /**
     * @constructor
     * @param {Viewer} viewer The Viewer.
     * @param {Object} cfg  Plugin configuration.
     * @param {String} [cfg.id="AxisGizmo"] Optional ID for this plugin, so that we can find it within {@link Viewer#plugins}.
     * @param {Number[]} [cfg.size=[250,250]] Initial size in pixels.
     */
    constructor(viewer: any, cfg: {
        id: string;
        size: number[];
    });
    _meshes: any[];
    /** Shows or hides this helper
     *
     * @param visible
     */
    setVisible(visible: any): void;
    /**
     * Destroys this AxisGizmoPlugin.
     */
    destroy(): void;
}
