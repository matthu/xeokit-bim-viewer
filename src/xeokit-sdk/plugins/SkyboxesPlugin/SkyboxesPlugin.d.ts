/**
 * {@link Viewer} plugin that manages skyboxes
 *
 * @example
 *
 * // Create a Viewer
 * const viewer = new Viewer({
 *     canvasId: "myCanvas"
 * });
 *
 * // Add a GLTFModelsPlugin
 * var gltfLoaderPlugin = new GLTFModelsPlugin(viewer, {
 *     id: "GLTFModels"  // Default value
 * });
 *
 * // Add a SkyboxesPlugin
 * var skyboxesPlugin = new SkyboxesPlugin(viewer, {
 *     id: "Skyboxes" // Default value
 * });
 *
 * // Load a glTF model
 * const model = gltfLoaderPlugin.load({
 *     id: "myModel",
 *     src: "./models/gltf/mygltfmodel.gltf"
 * });
 *
 * // Create three directional World-space lights. "World" means that they will appear as if part
 * // of the world, instead of "View", where they move with the user's head.
 *
 * skyboxesPlugin.createLight({
 *     id: "keyLight",
 *     dir: [0.8, -0.6, -0.8],
 *     color: [1.0, 0.3, 0.3],
 *     intensity: 1.0,
 *     space: "world"
 * });
 *
 * skyboxesPlugin.createLight({
 *     id: "fillLight",
 *     dir: [-0.8, -0.4, -0.4],
 *     color: [0.3, 1.0, 0.3],
 *     intensity: 1.0,
 *     space: "world"
 * });
 *
 * skyboxesPlugin.createDirLight({
 *     id: "rimLight",
 *     dir: [0.2, -0.8, 0.8],
 *     color: [0.6, 0.6, 0.6],
 *     intensity: 1.0,
 *     space: "world"
 * });
 *
 * @class SkyboxesPlugin
 */
export class SkyboxesPlugin {
    constructor(viewer: any);
    skyboxes: {};
    /**
     * @private
     */
    private send;
    /**
     Creates a skybox.

     @param {String} id Unique ID to assign to the skybox.
     @param {Object} params Skybox configuration.
     @param {Boolean} [params.active=true] Whether the skybox plane is initially active. Only skyboxes while this is true.
     @returns {Skybox} The new skybox.
     */
    createSkybox(id: string, params: {
        active: boolean;
    }): any;
    /**
     Destroys a skybox.
     @param id
     */
    destroySkybox(id: any): void;
    /**
     Destroys all skyboxes.
     */
    clear(): void;
    /**
     * Destroys this plugin.
     *
     * Clears skyboxes from the Viewer first.
     */
    destroy(): void;
}
