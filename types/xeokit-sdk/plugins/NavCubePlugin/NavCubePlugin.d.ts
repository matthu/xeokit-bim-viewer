declare module '@xeokit/xeokit-sdk/src/plugins/NavCubePlugin/NavCubePlugin.js' {
    import { CubeTextureCanvas } from "@xeokit/xeokit-sdk/src/plugins/NavCubePlugin/CubeTextureCanvas.js";
    /**
     * {@link Viewer} plugin that lets us look at the entire {@link Scene} from along a chosen axis or diagonal.
     *
     *  [<img src="https://user-images.githubusercontent.com/83100/55674490-c93c2e00-58b5-11e9-8a28-eb08876947c0.gif">](https://xeokit.github.io/xeokit-sdk/examples/#gizmos_NavCubePlugin)
     *
     * [[Run this example](https://xeokit.github.io/xeokit-sdk/examples/#gizmos_NavCubePlugin)]
     *
     * ## Overview
     *
     * * Rotating the NavCube causes the Viewer's {@link Camera} to orbit its current
     * point-of-interest. Conversely, orbiting the Camera causes the NavCube to rotate accordingly.
     * * The faces of the NavCube are aligned with the Viewer's {@link Scene}'s World-space coordinate axis. Clicking on a face moves
     * the Camera to look at the entire Scene along the corresponding axis. Clicking on an edge or a corner looks at
     * the entire Scene along a diagonal.
     * * The NavCube can be configured to either jump or fly the Camera to each new position. We can configure how tightly the
     * NavCube fits the Scene to view, and when flying, we can configure how fast it flies. We can also configure whether the
     * NavCube fits all objects to view, or just the currently visible objects. See below for a usage example.
     * * Clicking the NavCube also sets {@link CameraControl#pivotPos} to the center of the fitted objects.
     *
     * ## Usage
     *
     * In the example below, we'll create a Viewer and add a NavCubePlugin, which will create a NavCube gizmo in the canvas
     * with the given ID. Then we'll use the {@link XKTLoaderPlugin} to load a model into the Viewer's Scene. We can then
     * use the NavCube to look at the model along each axis or diagonal.
     *
     * ````JavaScript
     * import {Viewer} from "../src/viewer/Viewer.js";
     * import {XKTLoaderPlugin} from "../src/plugins/XKTLoaderPlugin/XKTLoaderPlugin.js";
     * import {NavCubePlugin} from "../src/plugins/NavCubePlugin/NavCubePlugin.js";
     *
     * const viewer = new Viewer({
     *     canvasId: "myCanvas"
     * });
     *
     * viewer.camera.eye = [-3.93, 2.85, 27.01];
     * viewer.camera.look = [4.40, 3.72, 8.89];
     * viewer.camera.up = [-0.01, 0.99, 0.03];
     *
     * const navCube = new NavCubePlugin(viewer, {
     *
     *     canvasID: "myNavCubeCanvas",
     *
     *     visible: true,         // Initially visible (default)
     *
     *     cameraFly: true,       // Fly camera to each selected axis/diagonal
     *     cameraFitFOV: 45,      // How much field-of-view the scene takes once camera has fitted it to view
     *     cameraFlyDuration: 0.5,// How long (in seconds) camera takes to fly to each new axis/diagonal
     *
     *     fitVisible: false,     // Fit whole scene, including invisible objects (default)
     *
     *     synchProjection: false // Keep NavCube in perspective projection, even when camera switches to ortho (default)
     * });
     *
     * const xktLoader = new XKTLoaderPlugin(viewer);
     *
     * const model = xktLoader.load({
     *     id: "myModel",
     *     src: "./models/xkt/duplex/duplex.xkt",
     *     metaModelSrc: "./metaModels/duplex/metaModel.json", // Sets visual states of object in model
     *     edges: true
     * });
     * ````
     */
    export class NavCubePlugin {
        /**
         * @constructor
         * @param {Viewer} viewer The Viewer.
         * @param {Object} cfg NavCubePlugin configuration.
         * @param {String} [cfg.id="NavCube"] Optional ID for this plugin, so that we can find it within {@link Viewer#plugins}.
         * @param {String} [cfg.canvasId] ID of an existing HTML canvas to display the NavCube - either this or canvasElement is mandatory. When both values are given, the element reference is always preferred to the ID.
         * @param {HTMLCanvasElement} [cfg.canvasElement] Reference of an existing HTML canvas to display the NavCube - either this or canvasId is mandatory. When both values are given, the element reference is always preferred to the ID.
         * @param {Boolean} [cfg.visible=true] Initial visibility.
         * @param {String} [cfg.cameraFly=true] Whether the {@link Camera} flies or jumps to each selected axis or diagonal.
         * @param {String} [cfg.cameraFitFOV=45] How much of the field-of-view, in degrees, that the 3D scene should fill the {@link Canvas} when the {@link Camera} moves to an axis or diagonal.
         * @param {String} [cfg.cameraFlyDuration=0.5] When flying the {@link Camera} to each new axis or diagonal, how long, in seconds, that the Camera takes to get there.
         * @param {String} [cfg.color="lightgrey] Custom uniform color for the faces of the NavCube.
         * @param {String} [cfg.frontColor="#55FF55"] Custom color for the front face of the NavCube. Overrides ````color````.
         * @param {String} [cfg.backColor="#55FF55"] Custom color for the back face of the NavCube. Overrides ````color````.
         * @param {String} [cfg.leftColor="#FF5555"] Custom color for the left face of the NavCube. Overrides ````color````.
         * @param {String} [cfg.rightColor="#FF5555"] Custom color for the right face of the NavCube. Overrides ````color````.
         * @param {String} [cfg.topColor="#5555FF"] Custom color for the top face of the NavCube. Overrides ````color````.
         * @param {String} [cfg.bottomColor="#5555FF"] Custom color for the bottom face of the NavCube. Overrides ````color````.
         * @param {String} [cfg.hoverColor="rgba(0,0,0,0.4)"] Custom color for highlighting regions on the NavCube as we hover the pointer over them.
         * @param {Boolean} [cfg.fitVisible=false] Sets whether the axis, corner and edge-aligned views will fit the
         * view to the entire {@link Scene} or just to visible object-{@link Entity}s. Entitys are visible objects when {@link Entity#isObject} and {@link Entity#visible} are both ````true````.
         * @param {Boolean} [cfg.synchProjection=false] Sets whether the NavCube switches between perspective and orthographic projections in synchrony with the {@link Camera}. When ````false````, the NavCube will always be rendered with perspective projection.
         */
        constructor(viewer: any, cfg?: {
            id?: string;
            canvasId?: string;
            canvasElement?: HTMLCanvasElement;
            visible?: boolean;
            cameraFly?: string;
            cameraFitFOV?: string;
            cameraFlyDuration?: string;
            color?: string;
            frontColor?: string;
            backColor?: string;
            leftColor?: string;
            rightColor?: string;
            topColor?: string;
            bottomColor?: string;
            hoverColor?: string;
            fitVisible?: boolean;
            synchProjection?: boolean;
        });
        _navCubeScene: any;
        _navCubeCanvas: any;
        _navCubeCamera: any;
        _zUp: boolean;
        _synchCamera: () => void;
        _cubeTextureCanvas: CubeTextureCanvas;
        _cubeSampler: any;
        _cubeMesh: any;
        _shadow: any;
        _onCameraMatrix: any;
        _onCameraWorldAxis: any;
        _onCameraFOV: any;
        _onCameraProjection: any;
        send(name: any, value: any): void;
        _repaint(): void;
        /**
         * Sets if the NavCube is visible.
         *
         * @param {Boolean} visible Whether or not the NavCube is visible.
         */
        setVisible(visible?: boolean): void;
        /**
         * Gets if the NavCube is visible.
         *
         * @return {Boolean} True when the NavCube is visible.
         */
        getVisible(): boolean;
        /**
         * Sets whether the axis, corner and edge-aligned views will fit the
         * view to the entire {@link Scene} or just to visible object-{@link Entity}s.
         *
         * Entitys are visible objects when {@link Entity#isObject} and {@link Entity#visible} are both ````true````.
         *
         * @param {Boolean} fitVisible Set ````true```` to fit only visible object-Entitys.
         */
        setFitVisible(fitVisible?: boolean): void;
        _fitVisible: boolean;
        /**
         * Gets whether the axis, corner and edge-aligned views will fit the
         * view to the entire {@link Scene} or just to visible object-{@link Entity}s.
         *
         * Entitys are visible objects when {@link Entity#isObject} and {@link Entity#visible} are both ````true````.
         *
         * @return {Boolean} True when fitting only visible object-Entitys.
         */
        getFitVisible(): boolean;
        /**
         * Sets whether the {@link Camera} flies or jumps to each selected axis or diagonal.
         *
         * Default is ````true````, to fly.
         *
         * @param {Boolean} cameraFly Set ````true```` to fly, else ````false```` to jump.
         */
        setCameraFly(cameraFly?: boolean): void;
        _cameraFly: boolean;
        /**
         * Gets whether the {@link Camera} flies or jumps to each selected axis or diagonal.
         *
         * Default is ````true````, to fly.
         *
         * @returns {Boolean} Returns ````true```` to fly, else ````false```` to jump.
         */
        getCameraFly(): boolean;
        /**
         * Sets how much of the field-of-view, in degrees, that the {@link Scene} should
         * fill the canvas when flying or jumping the {@link Camera} to each selected axis or diagonal.
         *
         * Default value is ````45````.
         *
         * @param {Number} cameraFitFOV New FOV value.
         */
        setCameraFitFOV(cameraFitFOV?: number): void;
        _cameraFitFOV: number;
        /**
         * Gets how much of the field-of-view, in degrees, that the {@link Scene} should
         * fill the canvas when flying or jumping the {@link Camera} to each selected axis or diagonal.
         *
         * Default value is ````45````.
         *
         * @returns {Number} Current FOV value.
         */
        getCameraFitFOV(): number;
        /**
         * When flying the {@link Camera} to each new axis or diagonal, sets how long, in seconds, that the Camera takes to get there.
         *
         * Default is ````0.5````.
         *
         * @param {Boolean} cameraFlyDuration Camera flight duration in seconds.
         */
        setCameraFlyDuration(cameraFlyDuration?: boolean): void;
        _cameraFlyDuration: boolean;
        /**
         * When flying the {@link Camera} to each new axis or diagonal, gets how long, in seconds, that the Camera takes to get there.
         *
         * Default is ````0.5````.
         *
         * @returns {Boolean} Camera flight duration in seconds.
         */
        getCameraFlyDuration(): boolean;
        /**
         * Sets whether the NavCube switches between perspective and orthographic projections in synchrony with
         * the {@link Camera}. When ````false````, the NavCube will always be rendered with perspective projection.
         *
         * @param {Boolean} synchProjection Set ````true```` to keep NavCube projection synchronized with {@link Camera#projection}.
         */
        setSynchProjection(synchProjection?: boolean): void;
        _synchProjection: boolean;
        /**
         * Gets whether the NavCube switches between perspective and orthographic projections in synchrony with
         * the {@link Camera}. When ````false````, the NavCube will always be rendered with perspective projection.
         *
         * @return {Boolean} True when NavCube projection is synchronized with {@link Camera#projection}.
         */
        getSynchProjection(): boolean;
        /**
         * Destroys this NavCubePlugin.
         *
         * Does not destroy the canvas the NavCubePlugin was configured with.
         */
        destroy(): void;
        _onMouseEnter: any;
        _onMouseLeave: any;
        _onMouseDown: any;
        _onMouseMove: any;
        _onMouseUp: any;
    }
}
