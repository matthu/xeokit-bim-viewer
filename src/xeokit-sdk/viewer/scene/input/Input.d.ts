/**
 * @desc Meditates mouse, touch and keyboard events for various interaction controls.
 *
 * Ordinarily, you would only use this component as a utility to help manage input events and state for your
 * own custom input handlers.
 *
 * * Located at {@link Scene#input}
 * * Used by (at least) {@link CameraControl}
 *
 * ## Usage
 *
 * Subscribing to mouse events on the canvas:
 *
 * ````javascript
 * import {Viewer} from "../src/viewer/Viewer.js";
 *
 * const viewer = new Viewer({
 *      canvasId: "myCanvas"
 * });
 *
 * const input = viewer.scene.input;
 *
 * const onMouseDown = input.on("mousedown", (canvasCoords) => {
 *       console.log("Mouse down at: x=" + canvasCoords[0] + ", y=" + coords[1]);
 * });
 *
 * const onMouseUp = input.on("mouseup", (canvasCoords) => {
 *       console.log("Mouse up at: x=" + canvasCoords[0] + ", y=" + canvasCoords[1]);
 * });
 *
 * const onMouseClicked = input.on("mouseclicked", (canvasCoords) => {
 *      console.log("Mouse clicked at: x=" + canvasCoords[0] + ", y=" + canvasCoords[1]);
 * });
 *
 * const onDblClick = input.on("dblclick", (canvasCoords) => {
 *       console.log("Double-click at: x=" + canvasCoords[0] + ", y=" + canvasCoords[1]);
 * });
 * ````
 *
 * Subscribing to keyboard events on the canvas:
 *
 * ````javascript
 * const onKeyDown = input.on("keydown", (keyCode) => {
 *      switch (keyCode) {
 *          case this.KEY_A:
 *              console.log("The 'A' key is down");
 *              break;
 *
 *          case this.KEY_B:
 *              console.log("The 'B' key is down");
 *              break;
 *
 *          case this.KEY_C:
 *              console.log("The 'C' key is down");
 *              break;
 *
 *          default:
 *              console.log("Some other key is down");
 *      }
 * });
 *
 * const onKeyUp = input.on("keyup", (keyCode) => {
 *      switch (keyCode) {
 *          case this.KEY_A:
 *              console.log("The 'A' key is up");
 *              break;
 *
 *          case this.KEY_B:
 *              console.log("The 'B' key is up");
 *              break;
 *
 *          case this.KEY_C:
 *              console.log("The 'C' key is up");
 *              break;
 *
 *          default:
 *              console.log("Some other key is up");
 *      }
 *  });
 * ````
 *
 * Checking if keys are down:
 *
 * ````javascript
 * const isCtrlDown = input.ctrlDown;
 * const isAltDown = input.altDown;
 * const shiftDown = input.shiftDown;
 * //...
 *
 * const isAKeyDown = input.keyDown[input.KEY_A];
 * const isBKeyDown = input.keyDown[input.KEY_B];
 * const isShiftKeyDown = input.keyDown[input.KEY_SHIFT];
 * //...
 *
 * ````
 * Unsubscribing from events:
 *
 * ````javascript
 * input.off(onMouseDown);
 * input.off(onMouseUp);
 * //...
 * ````
 *
 * ## Disabling all events
 *
 * Event handling is enabled by default.
 *
 * To disable all events:
 *
 * ````javascript
 * myViewer.scene.input.setEnabled(false);
 * ````
 * To enable all events again:
 *
 * ````javascript
 * myViewer.scene.input.setEnabled(true);
 * ````
 *
 * ## Disabling keyboard input
 *
 * When the mouse is over the canvas, the canvas will consume keyboard events. Therefore, sometimes we need
 * to disable keyboard control, so that other UI elements can get those events.
 *
 * To disable keyboard events:
 *
 * ````javascript
 * myViewer.scene.input.setKeyboardEnabled(false);
 * ````
 *
 * To enable keyboard events again:
 *
 * ````javascript
 * myViewer.scene.input.setKeyboardEnabled(true)
 * ````
 */
export class Input {
    /**
     * @private
     */
    private constructor();
    /**
     * Code for the BACKSPACE key.
     * @property KEY_BACKSPACE
     * @final
     * @type {Number}
     */
    KEY_BACKSPACE: number;
    /**
     * Code for the TAB key.
     * @property KEY_TAB
     * @final
     * @type {Number}
     */
    KEY_TAB: number;
    /**
     * Code for the ENTER key.
     * @property KEY_ENTER
     * @final
     * @type {Number}
     */
    KEY_ENTER: number;
    /**
     * Code for the SHIFT key.
     * @property KEY_SHIFT
     * @final
     * @type {Number}
     */
    KEY_SHIFT: number;
    /**
     * Code for the CTRL key.
     * @property KEY_CTRL
     * @final
     * @type {Number}
     */
    KEY_CTRL: number;
    /**
     * Code for the ALT key.
     * @property KEY_ALT
     * @final
     * @type {Number}
     */
    KEY_ALT: number;
    /**
     * Code for the PAUSE_BREAK key.
     * @property KEY_PAUSE_BREAK
     * @final
     * @type {Number}
     */
    KEY_PAUSE_BREAK: number;
    /**
     * Code for the CAPS_LOCK key.
     * @property KEY_CAPS_LOCK
     * @final
     * @type {Number}
     */
    KEY_CAPS_LOCK: number;
    /**
     * Code for the ESCAPE key.
     * @property KEY_ESCAPE
     * @final
     * @type {Number}
     */
    KEY_ESCAPE: number;
    /**
     * Code for the PAGE_UP key.
     * @property KEY_PAGE_UP
     * @final
     * @type {Number}
     */
    KEY_PAGE_UP: number;
    /**
     * Code for the PAGE_DOWN key.
     * @property KEY_PAGE_DOWN
     * @final
     * @type {Number}
     */
    KEY_PAGE_DOWN: number;
    /**
     * Code for the END key.
     * @property KEY_END
     * @final
     * @type {Number}
     */
    KEY_END: number;
    /**
     * Code for the HOME key.
     * @property KEY_HOME
     * @final
     * @type {Number}
     */
    KEY_HOME: number;
    /**
     * Code for the LEFT_ARROW key.
     * @property KEY_LEFT_ARROW
     * @final
     * @type {Number}
     */
    KEY_LEFT_ARROW: number;
    /**
     * Code for the UP_ARROW key.
     * @property KEY_UP_ARROW
     * @final
     * @type {Number}
     */
    KEY_UP_ARROW: number;
    /**
     * Code for the RIGHT_ARROW key.
     * @property KEY_RIGHT_ARROW
     * @final
     * @type {Number}
     */
    KEY_RIGHT_ARROW: number;
    /**
     * Code for the DOWN_ARROW key.
     * @property KEY_DOWN_ARROW
     * @final
     * @type {Number}
     */
    KEY_DOWN_ARROW: number;
    /**
     * Code for the INSERT key.
     * @property KEY_INSERT
     * @final
     * @type {Number}
     */
    KEY_INSERT: number;
    /**
     * Code for the DELETE key.
     * @property KEY_DELETE
     * @final
     * @type {Number}
     */
    KEY_DELETE: number;
    /**
     * Code for the 0 key.
     * @property KEY_NUM_0
     * @final
     * @type {Number}
     */
    KEY_NUM_0: number;
    /**
     * Code for the 1 key.
     * @property KEY_NUM_1
     * @final
     * @type {Number}
     */
    KEY_NUM_1: number;
    /**
     * Code for the 2 key.
     * @property KEY_NUM_2
     * @final
     * @type {Number}
     */
    KEY_NUM_2: number;
    /**
     * Code for the 3 key.
     * @property KEY_NUM_3
     * @final
     * @type {Number}
     */
    KEY_NUM_3: number;
    /**
     * Code for the 4 key.
     * @property KEY_NUM_4
     * @final
     * @type {Number}
     */
    KEY_NUM_4: number;
    /**
     * Code for the 5 key.
     * @property KEY_NUM_5
     * @final
     * @type {Number}
     */
    KEY_NUM_5: number;
    /**
     * Code for the 6 key.
     * @property KEY_NUM_6
     * @final
     * @type {Number}
     */
    KEY_NUM_6: number;
    /**
     * Code for the 7 key.
     * @property KEY_NUM_7
     * @final
     * @type {Number}
     */
    KEY_NUM_7: number;
    /**
     * Code for the 8 key.
     * @property KEY_NUM_8
     * @final
     * @type {Number}
     */
    KEY_NUM_8: number;
    /**
     * Code for the 9 key.
     * @property KEY_NUM_9
     * @final
     * @type {Number}
     */
    KEY_NUM_9: number;
    /**
     * Code for the A key.
     * @property KEY_A
     * @final
     * @type {Number}
     */
    KEY_A: number;
    /**
     * Code for the B key.
     * @property KEY_B
     * @final
     * @type {Number}
     */
    KEY_B: number;
    /**
     * Code for the C key.
     * @property KEY_C
     * @final
     * @type {Number}
     */
    KEY_C: number;
    /**
     * Code for the D key.
     * @property KEY_D
     * @final
     * @type {Number}
     */
    KEY_D: number;
    /**
     * Code for the E key.
     * @property KEY_E
     * @final
     * @type {Number}
     */
    KEY_E: number;
    /**
     * Code for the F key.
     * @property KEY_F
     * @final
     * @type {Number}
     */
    KEY_F: number;
    /**
     * Code for the G key.
     * @property KEY_G
     * @final
     * @type {Number}
     */
    KEY_G: number;
    /**
     * Code for the H key.
     * @property KEY_H
     * @final
     * @type {Number}
     */
    KEY_H: number;
    /**
     * Code for the I key.
     * @property KEY_I
     * @final
     * @type {Number}
     */
    KEY_I: number;
    /**
     * Code for the J key.
     * @property KEY_J
     * @final
     * @type {Number}
     */
    KEY_J: number;
    /**
     * Code for the K key.
     * @property KEY_K
     * @final
     * @type {Number}
     */
    KEY_K: number;
    /**
     * Code for the L key.
     * @property KEY_L
     * @final
     * @type {Number}
     */
    KEY_L: number;
    /**
     * Code for the M key.
     * @property KEY_M
     * @final
     * @type {Number}
     */
    KEY_M: number;
    /**
     * Code for the N key.
     * @property KEY_N
     * @final
     * @type {Number}
     */
    KEY_N: number;
    /**
     * Code for the O key.
     * @property KEY_O
     * @final
     * @type {Number}
     */
    KEY_O: number;
    /**
     * Code for the P key.
     * @property KEY_P
     * @final
     * @type {Number}
     */
    KEY_P: number;
    /**
     * Code for the Q key.
     * @property KEY_Q
     * @final
     * @type {Number}
     */
    KEY_Q: number;
    /**
     * Code for the R key.
     * @property KEY_R
     * @final
     * @type {Number}
     */
    KEY_R: number;
    /**
     * Code for the S key.
     * @property KEY_S
     * @final
     * @type {Number}
     */
    KEY_S: number;
    /**
     * Code for the T key.
     * @property KEY_T
     * @final
     * @type {Number}
     */
    KEY_T: number;
    /**
     * Code for the U key.
     * @property KEY_U
     * @final
     * @type {Number}
     */
    KEY_U: number;
    /**
     * Code for the V key.
     * @property KEY_V
     * @final
     * @type {Number}
     */
    KEY_V: number;
    /**
     * Code for the W key.
     * @property KEY_W
     * @final
     * @type {Number}
     */
    KEY_W: number;
    /**
     * Code for the X key.
     * @property KEY_X
     * @final
     * @type {Number}
     */
    KEY_X: number;
    /**
     * Code for the Y key.
     * @property KEY_Y
     * @final
     * @type {Number}
     */
    KEY_Y: number;
    /**
     * Code for the Z key.
     * @property KEY_Z
     * @final
     * @type {Number}
     */
    KEY_Z: number;
    /**
     * Code for the LEFT_WINDOW key.
     * @property KEY_LEFT_WINDOW
     * @final
     * @type {Number}
     */
    KEY_LEFT_WINDOW: number;
    /**
     * Code for the RIGHT_WINDOW key.
     * @property KEY_RIGHT_WINDOW
     * @final
     * @type {Number}
     */
    KEY_RIGHT_WINDOW: number;
    /**
     * Code for the SELECT key.
     * @property KEY_SELECT
     * @final
     * @type {Number}
     */
    KEY_SELECT_KEY: number;
    /**
     * Code for the number pad 0 key.
     * @property KEY_NUMPAD_0
     * @final
     * @type {Number}
     */
    KEY_NUMPAD_0: number;
    /**
     * Code for the number pad 1 key.
     * @property KEY_NUMPAD_1
     * @final
     * @type {Number}
     */
    KEY_NUMPAD_1: number;
    /**
     * Code for the number pad 2 key.
     * @property KEY_NUMPAD 2
     * @final
     * @type {Number}
     */
    KEY_NUMPAD_2: number;
    /**
     * Code for the number pad 3 key.
     * @property KEY_NUMPAD_3
     * @final
     * @type {Number}
     */
    KEY_NUMPAD_3: number;
    /**
     * Code for the number pad 4 key.
     * @property KEY_NUMPAD_4
     * @final
     * @type {Number}
     */
    KEY_NUMPAD_4: number;
    /**
     * Code for the number pad 5 key.
     * @property KEY_NUMPAD_5
     * @final
     * @type {Number}
     */
    KEY_NUMPAD_5: number;
    /**
     * Code for the number pad 6 key.
     * @property KEY_NUMPAD_6
     * @final
     * @type {Number}
     */
    KEY_NUMPAD_6: number;
    /**
     * Code for the number pad 7 key.
     * @property KEY_NUMPAD_7
     * @final
     * @type {Number}
     */
    KEY_NUMPAD_7: number;
    /**
     * Code for the number pad 8 key.
     * @property KEY_NUMPAD_8
     * @final
     * @type {Number}
     */
    KEY_NUMPAD_8: number;
    /**
     * Code for the number pad 9 key.
     * @property KEY_NUMPAD_9
     * @final
     * @type {Number}
     */
    KEY_NUMPAD_9: number;
    /**
     * Code for the MULTIPLY key.
     * @property KEY_MULTIPLY
     * @final
     * @type {Number}
     */
    KEY_MULTIPLY: number;
    /**
     * Code for the ADD key.
     * @property KEY_ADD
     * @final
     * @type {Number}
     */
    KEY_ADD: number;
    /**
     * Code for the SUBTRACT key.
     * @property KEY_SUBTRACT
     * @final
     * @type {Number}
     */
    KEY_SUBTRACT: number;
    /**
     * Code for the DECIMAL POINT key.
     * @property KEY_DECIMAL_POINT
     * @final
     * @type {Number}
     */
    KEY_DECIMAL_POINT: number;
    /**
     * Code for the DIVIDE key.
     * @property KEY_DIVIDE
     * @final
     * @type {Number}
     */
    KEY_DIVIDE: number;
    /**
     * Code for the F1 key.
     * @property KEY_F1
     * @final
     * @type {Number}
     */
    KEY_F1: number;
    /**
     * Code for the F2 key.
     * @property KEY_F2
     * @final
     * @type {Number}
     */
    KEY_F2: number;
    /**
     * Code for the F3 key.
     * @property KEY_F3
     * @final
     * @type {Number}
     */
    KEY_F3: number;
    /**
     * Code for the F4 key.
     * @property KEY_F4
     * @final
     * @type {Number}
     */
    KEY_F4: number;
    /**
     * Code for the F5 key.
     * @property KEY_F5
     * @final
     * @type {Number}
     */
    KEY_F5: number;
    /**
     * Code for the F6 key.
     * @property KEY_F6
     * @final
     * @type {Number}
     */
    KEY_F6: number;
    /**
     * Code for the F7 key.
     * @property KEY_F7
     * @final
     * @type {Number}
     */
    KEY_F7: number;
    /**
     * Code for the F8 key.
     * @property KEY_F8
     * @final
     * @type {Number}
     */
    KEY_F8: number;
    /**
     * Code for the F9 key.
     * @property KEY_F9
     * @final
     * @type {Number}
     */
    KEY_F9: number;
    /**
     * Code for the F10 key.
     * @property KEY_F10
     * @final
     * @type {Number}
     */
    KEY_F10: number;
    /**
     * Code for the F11 key.
     * @property KEY_F11
     * @final
     * @type {Number}
     */
    KEY_F11: number;
    /**
     * Code for the F12 key.
     * @property KEY_F12
     * @final
     * @type {Number}
     */
    KEY_F12: number;
    /**
     * Code for the NUM_LOCK key.
     * @property KEY_NUM_LOCK
     * @final
     * @type {Number}
     */
    KEY_NUM_LOCK: number;
    /**
     * Code for the SCROLL_LOCK key.
     * @property KEY_SCROLL_LOCK
     * @final
     * @type {Number}
     */
    KEY_SCROLL_LOCK: number;
    /**
     * Code for the SEMI_COLON key.
     * @property KEY_SEMI_COLON
     * @final
     * @type {Number}
     */
    KEY_SEMI_COLON: number;
    /**
     * Code for the EQUAL_SIGN key.
     * @property KEY_EQUAL_SIGN
     * @final
     * @type {Number}
     */
    KEY_EQUAL_SIGN: number;
    /**
     * Code for the COMMA key.
     * @property KEY_COMMA
     * @final
     * @type {Number}
     */
    KEY_COMMA: number;
    /**
     * Code for the DASH key.
     * @property KEY_DASH
     * @final
     * @type {Number}
     */
    KEY_DASH: number;
    /**
     * Code for the PERIOD key.
     * @property KEY_PERIOD
     * @final
     * @type {Number}
     */
    KEY_PERIOD: number;
    /**
     * Code for the FORWARD_SLASH key.
     * @property KEY_FORWARD_SLASH
     * @final
     * @type {Number}
     */
    KEY_FORWARD_SLASH: number;
    /**
     * Code for the GRAVE_ACCENT key.
     * @property KEY_GRAVE_ACCENT
     * @final
     * @type {Number}
     */
    KEY_GRAVE_ACCENT: number;
    /**
     * Code for the OPEN_BRACKET key.
     * @property KEY_OPEN_BRACKET
     * @final
     * @type {Number}
     */
    KEY_OPEN_BRACKET: number;
    /**
     * Code for the BACK_SLASH key.
     * @property KEY_BACK_SLASH
     * @final
     * @type {Number}
     */
    KEY_BACK_SLASH: number;
    /**
     * Code for the CLOSE_BRACKET key.
     * @property KEY_CLOSE_BRACKET
     * @final
     * @type {Number}
     */
    KEY_CLOSE_BRACKET: number;
    /**
     * Code for the SINGLE_QUOTE key.
     * @property KEY_SINGLE_QUOTE
     * @final
     * @type {Number}
     */
    KEY_SINGLE_QUOTE: number;
    /**
     * Code for the SPACE key.
     * @property KEY_SPACE
     * @final
     * @type {Number}
     */
    KEY_SPACE: number;
    /**
     * The canvas element that mouse and keyboards are bound to.
     *
     * @final
     * @type {HTMLCanvasElement}
     */
    element: HTMLCanvasElement;
    /** True whenever ALT key is down.
     *
     * @type {boolean}
     */
    altDown: boolean;
    /** True whenever CTRL key is down.
     *
     * @type {boolean}
     */
    ctrlDown: boolean;
    /** True whenever left mouse button is down.
     *
     * @type {boolean}
     */
    mouseDownLeft: boolean;
    /**
     * True whenever middle mouse button is down.
     *
     * @type {boolean}
     */
    mouseDownMiddle: boolean;
    /**
     * True whenever the right mouse button is down.
     *
     * @type {boolean}
     */
    mouseDownRight: boolean;
    /**
     * Flag for each key that's down.
     *
     * @type {boolean[]}
     */
    keyDown: boolean[];
    /** True while input enabled
     *
     * @type {boolean}
     */
    enabled: boolean;
    /** True while keyboard input is enabled.
     *
     * Default value is ````true````.
     *
     * {@link CameraControl} will not respond to keyboard events while this is ````false````.
     *
     * @type {boolean}
     */
    keyboardEnabled: boolean;
    /** True while the mouse is over the canvas.
     *
     * @type {boolean}
     */
    mouseover: boolean;
    /**
     * Current mouse position within the canvas.
     * @type {Number[]}
     */
    mouseCanvasPos: number[];
    _bindEvents(): void;
    _keyDownListener: (e: any) => void;
    shiftDown: boolean;
    _keyUpListener: (e: any) => void;
    _mouseEnterListener: (e: any) => void;
    _mouseLeaveListener: (e: any) => void;
    _mouseDownListener: (e: any) => void;
    _mouseUpListener: (e: any) => void;
    _clickListener: (e: any) => void;
    _dblClickListener: (e: any) => void;
    _mouseMoveListener: (e: any) => void;
    _mouseWheelListener: (e: any, d: any) => void;
    _orientationchangedListener: () => void;
    _deviceMotionListener: (e: any) => void;
    _deviceOrientListener: (e: any) => void;
    _eventsBound: boolean;
    _unbindEvents(): void;
    _getMouseCanvasPos(event: any): void;
    /**
     * Sets whether input handlers are enabled.
     *
     * Default value is ````true````.
     *
     * @param {Boolean} enable Indicates if input handlers are enabled.
     */
    setEnabled(enable: boolean): void;
    /**
     * Gets whether input handlers are enabled.
     *
     * Default value is ````true````.
     *
     * @returns {Boolean} Indicates if input handlers are enabled.
     */
    getEnabled(): boolean;
    /**
     * Sets whether or not keyboard input is enabled.
     *
     * Default value is ````true````.
     *
     * {@link CameraControl} will not respond to keyboard events while this is set ````false````.
     *
     * @param {Boolean} value Indicates whether keyboard input is enabled.
     */
    setKeyboardEnabled(value: boolean): void;
    /**
     * Gets whether keyboard input is enabled.
     *
     * Default value is ````true````.
     *
     * {@link CameraControl} will not respond to keyboard events while this is set ````false````.
     *
     * @returns {Boolean} Returns whether keyboard input is enabled.
     */
    getKeyboardEnabled(): boolean;
    /**
     * @private
     */
    private destroy;
}
