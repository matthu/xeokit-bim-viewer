declare module '@xeokit/xeokit-sdk/src/plugins/SectionPlanesPlugin/SectionPlanesPlugin.js' {
    import { Viewer } from "@xeokit/xeokit-sdk/src/viewer/Viewer.js";
    /**
     * SectionPlanesPlugin is a {@link Viewer} plugin that manages {@link SectionPlane}s.
     *
     * [<img src="https://user-images.githubusercontent.com/83100/57724962-406e9a00-768c-11e9-9f1f-3d178a3ec11f.gif">](https://xeokit.github.io/xeokit-sdk/examples/#gizmos_SectionPlanesPlugin)
     *
     * [[Run this example](https://xeokit.github.io/xeokit-sdk/examples/#gizmos_SectionPlanesPlugin)]
     *
     * ## Overview
     *
     * * Use the SectionPlanesPlugin to
     * create and edit {@link SectionPlane}s to slice portions off your models and reveal internal structures.
     * * As shown in the screen capture above, SectionPlanesPlugin shows an overview of all your SectionPlanes (on the right, in
     * this example).
     * * Click a plane in the overview to activate a 3D control with which you can interactively
     * reposition its SectionPlane in the main canvas.
     *
     * ## Usage
     *
     * In the example below, we'll use a {@link GLTFLoaderPlugin} to load a model, and a SectionPlanesPlugin
     * to slice it open with two {@link SectionPlane}s. We'll show the overview in the bottom right of the Viewer
     * canvas. Finally, we'll programmatically activate the 3D editing control, so that we can use it to interactively
     * reposition our second SectionPlane.
     *
     * ````JavaScript
     * import {Viewer} from "../src/viewer/Viewer.js";
     * import {GLTFLoaderPlugin} from "../src/plugins/GLTFLoaderPlugin/GLTFLoaderPlugin.js";
     * import {SectionPlanesPlugin} from "../src/plugins/SectionPlanesPlugin/SectionPlanesPlugin.js";
     *
     * // Create a Viewer and arrange its Camera
     *
     * const viewer = new Viewer({
     *     canvasId: "myCanvas"
     * });
     *
     * viewer.camera.eye = [-5.02, 2.22, 15.09];
     * viewer.camera.look = [4.97, 2.79, 9.89];
     * viewer.camera.up = [-0.05, 0.99, 0.02];
     *
     *
     * // Add a GLTFLoaderPlugin
     *
     * const gltfLoader = new GLTFLoaderPlugin(viewer);
     *
     * // Add a SectionPlanesPlugin, with overview visible
     *
     * const sectionPlanes = new SectionPlanesPlugin(viewer, {
     *     overviewCanvasID: "myOverviewCanvas",
     *     overviewVisible: true
     * });
     *
     * // Load a model
     *
     * const model = gltfLoader.load({
     *     id: "myModel",
     *     src: "./models/gltf/schependomlaan/scene.gltf"
     * });
     *
     * // Create a couple of section planes
     * // These will be shown in the overview
     *
     * sectionPlanes.createSectionPlane({
     *     id: "mySectionPlane",
     *     pos: [1.04, 1.95, 9.74],
     *     dir: [1.0, 0.0, 0.0]
     * });
     *
     * sectionPlanes.createSectionPlane({
     *     id: "mySectionPlane2",
     *     pos: [2.30, 4.46, 14.93],
     *     dir: [0.0, -0.09, -0.79]
     * });
     *
     * // Show the SectionPlanePlugin's 3D editing gizmo,
     * // to interactively reposition one of our SectionPlanes
     *
     * sectionPlanes.showControl("mySectionPlane2");
     *
     * const mySectionPlane2 = sectionPlanes.sectionPlanes["mySectionPlane2"];
     *
     * // Programmatically reposition one of our SectionPlanes
     * // This also updates its position as shown in the overview gizmo
     *
     * mySectionPlane2.pos = [11.0, 6.-, -12];
     * mySectionPlane2.dir = [0.4, 0.0, 0.5];
     * ````
     */
    export class SectionPlanesPlugin {
        viewer?: Viewer;
        /**
         * @constructor
         * @param {Viewer} viewer The Viewer.
         * @param {Object} cfg Plugin configuration.
         * @param {String} [cfg.id="SectionPlanes"] Optional ID for this plugin, so that we can find it within {@link Viewer#plugins}.
         * @param {String} [cfg.overviewCanvasId] ID of a canvas element to display the overview.
         * @param {String} [cfg.overviewVisible=true] Initial visibility of the overview canvas.
         */
        constructor(viewer: any, cfg?: {
            id?: string;
            overviewCanvasId?: string;
            overviewVisible?: string;
        });
        _freeControls: any[];
        _sectionPlanes: any;
        _controls: {};
        _shownControlId: string;
        _overview: any;
        _onSceneSectionPlaneCreated: any;
        /**
         * Sets if the overview canvas is visible.
         *
         * @param {Boolean} visible Whether or not the overview canvas is visible.
         */
        setOverviewVisible(visible: boolean): void;
        /**
         * Gets if the overview canvas is visible.
         *
         * @return {Boolean} True when the overview canvas is visible.
         */
        getOverviewVisible(): boolean;
        /**
         * Returns a map of the {@link SectionPlane}s created by this SectionPlanesPlugin.
         *
         * @returns {{String:SectionPlane}} A map containing the {@link SectionPlane}s, each mapped to its {@link SectionPlane#id}.
         */
        get sectionPlanes(): {
            String: any;
        };
        /**
         * Creates a {@link SectionPlane}.
         *
         * The {@link SectionPlane} will be registered by {@link SectionPlane#id} in {@link SectionPlanesPlugin#sectionPlanes}.
         *
         * @param {Object} params {@link SectionPlane} configuration.
         * @param {String} [params.id] Unique ID to assign to the {@link SectionPlane}. Must be unique among all components in the {@link Viewer}'s {@link Scene}. Auto-generated when omitted.
         * @param {Number[]} [params.pos=[0,0,0]] World-space position of the {@link SectionPlane}.
         * @param {Number[]} [params.dir=[0,0,-1]] World-space vector indicating the orientation of the {@link SectionPlane}.
         * @param {Boolean} [params.active=true] Whether the {@link SectionPlane} is initially active. Only clips while this is true.
         * @returns {SectionPlane} The new {@link SectionPlane}.
         */
        createSectionPlane(params?: {
            id?: string;
            pos?: number[];
            dir?: number[];
            active?: boolean;
        }): any;
        _sectionPlaneCreated(sectionPlane: any): void;
        /**
         * Inverts the direction of {@link SectionPlane#dir} on every existing SectionPlane.
         *
         * Inverts all SectionPlanes, including those that were not created with SectionPlanesPlugin.
         */
        flipSectionPlanes(): void;
        /**
         * Shows the 3D editing gizmo for a {@link SectionPlane}.
         *
         * @param {String} id ID of the {@link SectionPlane}.
         */
        showControl(id: string): void;
        /**
         * Gets the ID of the {@link SectionPlane} that the 3D editing gizmo is shown for.
         *
         * Returns ````null```` when the editing gizmo is not shown.
         *
         * @returns {String} ID of the the {@link SectionPlane} that the 3D editing gizmo is shown for, if shown, else ````null````.
         */
        getShownControl(): string;
        /**
         * Hides the 3D {@link SectionPlane} editing gizmo if shown.
         */
        hideControl(): void;
        /**
         * Destroys a {@link SectionPlane} created by this SectionPlanesPlugin.
         *
         * @param {String} id ID of the {@link SectionPlane}.
         */
        destroySectionPlane(id: string): void;
        _sectionPlaneDestroyed(sectionPlane: any): void;
        /**
         * Destroys all {@link SectionPlane}s created by this SectionPlanesPlugin.
         */
        clear(): void;
        /**
         * @private
         */
        private send;
        /**
         * Destroys this SectionPlanesPlugin.
         *
         * Also destroys each {@link SectionPlane} created by this SectionPlanesPlugin.
         *
         * Does not destroy the canvas the SectionPlanesPlugin was configured with.
         */
        destroy(): void;
        _destroyFreeControls(): void;
    }
}
