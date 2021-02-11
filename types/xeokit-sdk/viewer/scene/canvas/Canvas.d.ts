/**
 * @desc Manages its {@link Scene}'s HTML canvas.
 *
 * * Provides the HTML canvas element in {@link Canvas#canvas}.
 * * Has a {@link Spinner}, provided at {@link Canvas#spinner}, which manages the loading progress indicator.
 */
export class Canvas {
    /**
     * @constructor
     * @private
     */
    private constructor();
    /**
     @private
     */
    private get type();
    /**
     * The HTML canvas.
     *
     * @property canvas
     * @type {HTMLCanvasElement}
     * @final
     */
    canvas: HTMLCanvasElement;
    /**
     * The WebGL rendering context.
     *
     * @property gl
     * @type {WebGLRenderingContext}
     * @final
     */
    gl: WebGLRenderingContext;
    /**
     * True when WebGL 2 support is enabled.
     *
     * @property webgl2
     * @type {Boolean}
     * @final
     */
    webgl2: boolean;
    /**
     * Indicates if this Canvas is transparent.
     *
     * @property transparent
     * @type {Boolean}
     * @default {false}
     * @final
     */
    transparent: boolean;
    /**
     * Attributes for the WebGL context
     *
     * @type {{}|*}
     */
    contextAttr: {} | any;
    /**
     * Boundary of the Canvas in absolute browser window coordinates.
     *
     * ### Usage:
     *
     * ````javascript
     * var boundary = myScene.canvas.boundary;
     *
     * var xmin = boundary[0];
     * var ymin = boundary[1];
     * var width = boundary[2];
     * var height = boundary[3];
     * ````
     *
     * @property boundary
     * @type {{Number[]}}
     * @final
     */
    boundary: {};
    _webglcontextlostListener: (event: any) => void;
    _webglcontextrestoredListener: (event: any) => void;
    _tick: any;
    _spinner: any;
    /**
     * Sets if the canvas background color is derived from an {@link AmbientLight}.
     *
     * This only has effect when the canvas is not transparent. When not enabled, the background color
     * will be the canvas element's HTML/CSS background color.
     *
     * Default value is ````false````.
     *
     * @type {Boolean}
     */
    set clearColorAmbient(arg: boolean);
    /**
     * Gets if the canvas background color is derived from an {@link AmbientLight}.
     *
     * This only has effect when the canvas is not transparent. When not enabled, the background color
     * will be the canvas element's HTML/CSS background color.
     *
     * Default value is ````false````.
     *
     * @type {Boolean}
     */
    get clearColorAmbient(): boolean;
    /**
     * Creates a default canvas in the DOM.
     * @private
     */
    private _createCanvas;
    _getElementXY(e: any): {
        x: number;
        y: number;
    };
    /**
     * Initialises the WebGL context
     * @private
     */
    private _initWebGL;
    _clearColorAmbient: boolean;
    /**
     * @private
     * @deprecated
     */
    private getSnapshot;
    /**
     * Reads colors of pixels from the last rendered frame.
     *
     * Call this method like this:
     *
     * ````JavaScript
     *
     * // Ignore transparent pixels (default is false)
     * var opaqueOnly = true;
     *
     * var colors = new Float32Array(8);
     *
     * viewer.scene.canvas.readPixels([ 100, 22, 12, 33 ], colors, 2, opaqueOnly);
     * ````
     *
     * Then the r,g,b components of the colors will be set to the colors at those pixels.
     *
     * @param {Number[]} pixels
     * @param {Number[]} colors
     * @param {Number} size
     * @param {Boolean} opaqueOnly
     */
    readPixels(pixels: number[], colors: number[], size: number, opaqueOnly: boolean): any;
    /**
     * Simulates lost WebGL context.
     */
    loseWebGLContext(): void;
    /**
     The busy {@link Spinner} for this Canvas.

     @property spinner
     @type Spinner
     @final
     */
    get spinner(): Spinner;
    destroy(): void;
}
import { Spinner } from "@xeokit/xeokit-sdk/src/viewer/scene/canvas/Spinner";
