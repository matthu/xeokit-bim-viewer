/**
 * @desc Saves and restores a snapshot of the visual state of the {@link Entity}'s that represent objects within a {@link Scene}.
 *
 * * An Entity represents an object when {@link Entity#isObject} is ````true````.
 * * Each object-Entity is registered by {@link Entity#id} in {@link Scene#objects}.
 *
 * ## See Also
 *
 * * {@link CameraMemento} - Saves and restores the state of a {@link Scene}'s {@link Camera}.
 * * {@link ModelMemento} - Saves and restores a snapshot of the visual state of the {@link Entity}'s of a model within a {@link Scene}.
 *
 * ## Usage
 *
 * In the example below, we'll create a {@link Viewer} and use an {@link XKTLoaderPlugin} to load an ````.xkt```` model. When the model has loaded, we'll hide a couple of {@link Entity}s and save a snapshot of the visual states of all the Entitys in an ObjectsMemento. Then we'll show all the Entitys
 * again, and then we'll restore the visual states of all the Entitys again from the ObjectsMemento, which will hide those two Entitys again.
 *
 * ````javascript
 * import {Viewer} from "../src/viewer/Viewer.js";
 * import {ObjectsMemento} from "../src/scene/mementos/ObjectsMemento.js";
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
 * model.on("loaded", () => {
 *
 *      // Model has loaded
 *
 *      // Hide a couple of objects
 *      viewer.scene.objects["0u4wgLe6n0ABVaiXyikbkA"].visible = false;
 *      viewer.scene.objects["3u4wgLe3n0AXVaiXyikbYO"].visible = false;
 *
 *      // Save memento of all object states, which includes those two hidden objects
 *      const objectsMemento = new ObjectsMemento();
 *
 *      objectsMemento.saveObjects(viewer.scene);
 *
 *      // Show all objects
 *      viewer.scene.setObjectsVisible(viewer.scene.objectIds, true);
 *
 *      // Restore the objects states again, which involves hiding those two objects again
 *      objectsMemento.restoreObjects(viewer.scene);
 * });
 * `````
 *
 * ## Masking Saved State
 *
 * We can optionally supply a mask to focus what state we save and restore.
 *
 * For example, to save and restore only the {@link Entity#visible} and {@link Entity#clippable} states:
 *
 * ````javascript
 * objectsMemento.saveObjects(viewer.scene, {
 *     visible: true,
 *     clippable: true
 * });
 *
 * //...
 *
 * // Restore the objects states again
 * objectsMemento.restoreObjects(viewer.scene);
 * ````
 */
export class ObjectsMemento {
    /** @private */
    private objectsVisible;
    /** @private */
    private objectsEdges;
    /** @private */
    private objectsXrayed;
    /** @private */
    private objectsHighlighted;
    /** @private */
    private objectsSelected;
    /** @private */
    private objectsClippable;
    /** @private */
    private objectsPickable;
    /** @private */
    private objectsColorize;
    /** @private */
    private objectsHasColorize;
    /** @private */
    private objectsOpacity;
    /** @private */
    private numObjects;
    /**
     * Saves a snapshot of the visual state of the {@link Entity}'s that represent objects within a {@link Scene}.
     *
     * @param {Scene} scene The scene.
     * @param {Object} [mask] Masks what state gets saved. Saves all state when not supplied.
     * @param {boolean} [mask.visible] Saves {@link Entity#visible} values when ````true````.
     * @param {boolean} [mask.visible] Saves {@link Entity#visible} values when ````true````.
     * @param {boolean} [mask.edges] Saves {@link Entity#edges} values when ````true````.
     * @param {boolean} [mask.xrayed] Saves {@link Entity#xrayed} values when ````true````.
     * @param {boolean} [mask.highlighted] Saves {@link Entity#highlighted} values when ````true````.
     * @param {boolean} [mask.selected] Saves {@link Entity#selected} values when ````true````.
     * @param {boolean} [mask.clippable] Saves {@link Entity#clippable} values when ````true````.
     * @param {boolean} [mask.pickable] Saves {@link Entity#pickable} values when ````true````.
     * @param {boolean} [mask.colorize] Saves {@link Entity#colorize} values when ````true````.
     * @param {boolean} [mask.opacity] Saves {@link Entity#opacity} values when ````true````.
     */
    saveObjects(scene: any, mask?: {
        visible: boolean;
        edges: boolean;
        xrayed: boolean;
        highlighted: boolean;
        selected: boolean;
        clippable: boolean;
        pickable: boolean;
        colorize: boolean;
        opacity: boolean;
    }): void;
    _mask: any;
    /**
     * Restores a {@link Scene}'s {@link Entity}'s to their state previously captured with {@link ObjectsMemento#saveObjects}.
     * @param {Scene} scene The scene.
     */
    restoreObjects(scene: any): void;
}
