declare module '@xeokit/xeokit-sdk/src/viewer/scene/sectionPlane/SectionPlane.js' {
    import { RenderState } from "@xeokit/xeokit-sdk/src/viewer/scene/webgl/RenderState.js";
    /**
     *  @desc An arbitrarily-aligned World-space clipping plane.
     *
     * * Slices portions off objects to create cross-section views or reveal interiors.
     * * Registered by {@link SectionPlane#id} in {@link Scene#sectionPlanes}.
     * * Indicates World-space position in {@link SectionPlane#pos} and orientation in {@link SectionPlane#dir}.
     * * Discards elements from the half-space in the direction of {@link SectionPlane#dir}.
     * * Can be be enabled or disabled via {@link SectionPlane#active}.
     *
     * ## Usage
     *
     * In the example below, we'll create two SectionPlanes to slice a model loaded from glTF. Note that we could also create them
     * using a {@link SectionPlanesPlugin}.
     *
     * ````javascript
     * import {Viewer} from "../src/viewer/Viewer.js";
     * import {GLTFLoaderPlugin} from "../src/plugins/GLTFLoaderPlugin/GLTFLoaderPlugin.js";
     * import {SectionPlane} from "../src/sectionPlane/SectionPlane.js";
     *
     * const viewer = new Viewer({
     *      canvasId: "myCanvas"
     * });
     *
     * const gltfLoaderPlugin = new GLTFModelsPlugin(viewer, {
     *      id: "GLTFModels"
     * });
     *
     * const model = gltfLoaderPlugin.load({
     *      id: "myModel",
     *      src: "./models/gltf/mygltfmodel.gltf"
     * });
     *
     * // Create a SectionPlane on negative diagonal
     * const sectionPlane1 = new SectionPlane(viewer.scene, {
     *     pos: [1.0, 1.0, 1.0],
     *     dir: [-1.0, -1.0, -1.0],
     *     active: true
     * }),
     *
     * // Create a SectionPlane on positive diagonal
     * const sectionPlane2 = new SectionPlane(viewer.scene, {
     *     pos: [-1.0, -1.0, -1.0],
     *     dir: [1.0, 1.0, 1.0],
     *     active: true
     * });
     * ````
     */
    export class SectionPlane {
        id?: string;
        /**
         * @constructor
         * @param {Component} [owner]  Owner component. When destroyed, the owner will destroy this SectionPlane as well.
         * @param {*} [cfg]  SectionPlane configuration
         * @param {String} [cfg.id] Optional ID, unique among all components in the parent {@link Scene}, generated automatically when omitted.
         * @param {Boolean} [cfg.active=true] Indicates whether or not this SectionPlane is active.
         * @param {Number[]} [cfg.pos=[0,0,0]] World-space position of the SectionPlane.
         * @param {Number[]} [cfg.dir=[0,0,-1]] Vector perpendicular to the plane surface, indicating the SectionPlane plane orientation.
         */
        constructor(owner?: any, cfg?: any);
        /**
         @private
        */
        private get type();
        _state: RenderState;
        /**
         * Sets if this SectionPlane is active or not.
         *
         * Default value is ````true````.
         *
         * @param {Boolean} value Set ````true```` to activate else ````false```` to deactivate.
         */
        set active(arg: boolean);
        /**
         * Gets if this SectionPlane is active or not.
         *
         * Default value is ````true````.
         *
         * @returns {Boolean} Returns ````true```` if active.
         */
        get active(): boolean;
        /**
         * Sets the World-space position of this SectionPlane's plane.
         *
         * Default value is ````[0, 0, 0]````.
         *
         * @param {Number[]} value New position.
         */
        set pos(arg: number[]);
        /**
         * Gets the World-space position of this SectionPlane's plane.
         *
         * Default value is ````[0, 0, 0]````.
         *
         * @returns {Number[]} Current position.
         */
        get pos(): number[];
        /**
         * Sets the direction of this SectionPlane's plane.
         *
         * Default value is ````[0, 0, -1]````.
         *
         * @param {Number[]} value New direction.
         */
        set dir(arg: number[]);
        /**
         * Gets the direction of this SectionPlane's plane.
         *
         * Default value is ````[0, 0, -1]````.
         *
         * @returns {Number[]} value Current direction.
         */
        get dir(): number[];
        /**
         * Gets this SectionPlane's distance to the origin of the World-space coordinate system.
         *
         * This is the dot product of {@link SectionPlane#pos} and {@link SectionPlane#dir} and is automatically re-calculated
         * each time either of two properties are updated.
         *
         * @returns {Number}
         */
        get dist(): number;
        /**
         * Inverts the direction of {@link SectionPlane#dir}.
         */
        flipDir(): void;
        /**
         * @destroy
         */
        destroy(): void;
    }
}
