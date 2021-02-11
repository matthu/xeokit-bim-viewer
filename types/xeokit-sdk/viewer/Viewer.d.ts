declare module '@xeokit/xeokit-sdk/src/viewer/Viewer.js' {
    import { Scene } from "@xeokit/xeokit-sdk/src/viewer/scene/scene/Scene.js";
    import { MetaScene } from "@xeokit/xeokit-sdk/src/viewer/metadata/MetaScene.js";
    import { Camera } from "@xeokit/xeokit-sdk/src/viewer/scene/camera/Camera.js";
    import { CameraFlightAnimation } from "@xeokit/xeokit-sdk/src/viewer/scene/camera/CameraFlightAnimation.js";
    import { CameraControl } from "@xeokit/xeokit-sdk/src/viewer/scene/CameraControl/CameraControl.js";
    /**
     * The 3D Viewer at the heart of the xeokit SDK.
     *
     * * A Viewer wraps a single {@link Scene}
     * * Add {@link Plugin}s to a Viewer to extend its functionality.
     * * {@link Viewer#metaScene} holds metadata about {@link Model}s in the
     * Viewer's {@link MetaScene}.
     * * Use {@link Viewer#cameraFlight} to fly or jump the {@link Scene}'s
     * {@link Camera} to target positions, boundaries or {@link Entity}s.
     *
     * @public
     */
    export class Viewer {
        /**
         * @constructor
         * @param {Object} cfg Viewer configuration.
         * @param {String} [cfg.id] Optional ID for this Viewer, defaults to the ID of {@link Viewer#scene}, which xeokit automatically generates.
         * @param {String} [cfg.canvasId]  ID of an existing HTML canvas for the {@link Viewer#scene} - either this or canvasElement is mandatory. When both values are given, the element reference is always preferred to the ID.
         * @param {HTMLCanvasElement} [cfg.canvasElement] Reference of an existing HTML canvas for the {@link Viewer#scene} - either this or canvasId is mandatory. When both values are given, the element reference is always preferred to the ID.
         * @param {String} [cfg.spinnerElementId]  ID of existing HTML element to show the {@link Spinner} - internally creates a default element automatically if this is omitted.
         * @param {Number} [cfg.passes=1] The number of times the {@link Viewer#scene} renders per frame.
         * @param {Boolean} [cfg.clearEachPass=false] When doing multiple passes per frame, specifies if to clear the canvas before each pass (true) or just before the first pass (false).
         * @param {Boolean} [cfg.preserveDrawingBuffer=true]  Whether or not to preserve the WebGL drawing buffer. This needs to be ````true```` for {@link Viewer#getSnapshot} to work.
         * @param {Boolean} [cfg.transparent=true]  Whether or not the canvas is transparent.
         * @param {Boolean} [cfg.premultipliedAlpha=false]  Whether or not you want alpha composition with premultiplied alpha. Highlighting and selection works best when this is ````false````.
         * @param {Boolean} [cfg.gammaInput=true]  When true, expects that all textures and colors are premultiplied gamma.
         * @param {Boolean} [cfg.gammaOutput=true]  Whether or not to render with pre-multiplied gama.
         * @param {Number} [cfg.gammaFactor=2.2] The gamma factor to use when rendering with pre-multiplied gamma.
         * @param {Boolean} [cfg.clearColorAmbient=false] Sets if the canvas background color is derived from an {@link AmbientLight}. This only has effect when the canvas is not transparent. When not enabled, the background color will be the canvas element's HTML/CSS background color.
         * @param {String} [cfg.units="meters"] The measurement unit type. Accepted values are ````"meters"````, ````"metres"````, , ````"centimeters"````, ````"centimetres"````, ````"millimeters"````,  ````"millimetres"````, ````"yards"````, ````"feet"```` and ````"inches"````.
         * @param {Number} [cfg.scale=1] The number of Real-space units in each World-space coordinate system unit.
         * @param {Number[]} [cfg.origin=[0,0,0]] The Real-space 3D origin, in current measurement units, at which the World-space coordinate origin ````[0,0,0]```` sits.
         * @param {Boolean} [cfg.saoEnabled=false] Whether to enable Scalable Ambient Obscurance (SAO) effect. See {@link SAO} for more info.
         * @param {Boolean} [cfg.antialias=true] Whether to enable anti-aliasing.
         * @throws {String} Throws an exception when both canvasId or canvasElement are missing or they aren't pointing to a valid HTMLCanvasElement.
         * @param {Boolean} [cfg.alphaDepthMask=true] Whether writing into the depth buffer is enabled or disabled when rendering transparent objects.
         * @param {Boolean} [cfg.entityOffsetsEnabled=false] Whether to enable {@link Entity#offset}. For best performance, only set this ````true```` when you need to use {@link Entity#offset}.
         * @param {Boolean} [cfg.logarithmicDepthBufferEnabled=false] Whether to enable logarithmic depth buffer. When this is true,
         * you can set huge values for {@link Perspective#far} and {@link Ortho#far}, to push the far clipping plane back so
         * that it does not clip huge models.
         */
        constructor(cfg: {
            id?: string;
            canvasId?: string;
            canvasElement?: HTMLCanvasElement;
            spinnerElementId?: string;
            passes?: number;
            clearEachPass?: boolean;
            preserveDrawingBuffer?: boolean;
            transparent?: boolean;
            premultipliedAlpha?: boolean;
            gammaInput?: boolean;
            gammaOutput?: boolean;
            gammaFactor?: number;
            clearColorAmbient?: boolean;
            units?: string;
            scale?: number;
            origin?: number[];
            saoEnabled?: boolean;
            antialias?: boolean;
        });
        /**
         * The Viewer's current language setting.
         * @property language
         * @type {String}
         */
        language: string;
        /**
         * The Viewer's {@link Scene}.
         * @property scene
         * @type {Scene}
         */
        scene: Scene;
        /**
         * Metadata about the {@link Scene} and the models and objects within it.
         * @property metaScene
         * @type {MetaScene}
         * @readonly
         */
        readonly metaScene: MetaScene;
        /**
         * The Viewer's ID.
         * @property id
         *
         * @type {String|Number}
         */
        id: string | number;
        /**
         * The Viewer's {@link Camera}. This is also found on {@link Scene#camera}.
         * @property camera
         * @type {Camera}
         */
        camera: Camera;
        /**
         * The Viewer's {@link CameraFlightAnimation}, which
         * is used to fly the {@link Scene}'s {@link Camera} to given targets.
         * @property cameraFlight
         * @type {CameraFlightAnimation}
         */
        cameraFlight: CameraFlightAnimation;
        /**
         * The Viewer's {@link CameraControl}, which
         * controls the {@link Scene}'s {@link Camera} with mouse,  touch and keyboard input.
         * @property cameraControl
         * @type {CameraControl}
         */
        cameraControl: CameraControl;
        _plugins: any[];
        /**
         * Subscriptions to events sent with {@link fire}.
         * @private
         */
        private _eventSubs;
        /**
         * Subscribes to an event fired at this Viewer.
         *
         * @param {String} event The event
         * @param {Function} callback Callback fired on the event
         */
        on(event: string, callback: Function): void;
        /**
         * Fires an event at this Viewer.
         *
         * @param {String} event Event name
         * @param {Object} value Event parameters
         */
        fire(event: string, value: any): void;
        /**
         * Unsubscribes from an event fired at this Viewer.
         * @param event
         */
        off(event: any): void;
        /**
         * Logs a message to the JavaScript developer console, prefixed with the ID of this Viewer.
         *
         * @param {String} msg The message
         */
        log(msg: string): void;
        /**
         * Logs an error message to the JavaScript developer console, prefixed with the ID of this Viewer.
         *
         * @param {String} msg The error message
         */
        error(msg: string): void;
        /**
         * Installs a Plugin.
         *
         * @private
         */
        private addPlugin;
        /**
         * Uninstalls a Plugin, clearing content from it first.
         *
         * @private
         */
        private removePlugin;
        /**
         * Sends a message to installed Plugins.
         *
         * The message can optionally be accompanied by a value.
         * @private
         */
        private sendToPlugins;
        /**
         * @private
         * @deprecated
         */
        private clear;
        /**
         * @private
         * @deprecated
         */
        private resetView;
        /**
         * Enter snapshot mode.
         *
         * Switches rendering to a hidden snapshot canvas.
         *
         * Exit snapshot mode using {@link Viewer#endSnapshot}.
         */
        beginSnapshot(): void;
        _snapshotBegun: boolean;
        /**
         * Gets a snapshot of this Viewer's {@link Scene} as a Base64-encoded image.
         *
         * #### Usage:
         *
         * ````javascript
         * const imageData = viewer.getSnapshot({
         *    width: 500,
         *    height: 500,
         *    format: "png"
         * });
         * ````
         * @param {*} [params] Capture options.
         * @param {Number} [params.width] Desired width of result in pixels - defaults to width of canvas.
         * @param {Number} [params.height] Desired height of result in pixels - defaults to height of canvas.
         * @param {String} [params.format="jpeg"] Desired format; "jpeg", "png" or "bmp".
         * @returns {String} String-encoded image data URI.
         */
        getSnapshot(params?: any): string;
        /**
         * Exists snapshot mode.
         *
         * Switches rendering back to the main canvas.
         *
         */
        endSnapshot(): void;
        /** Destroys this Viewer.
         */
        destroy(): void;
    }
}
