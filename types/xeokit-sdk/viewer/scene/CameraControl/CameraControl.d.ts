declare module '@xeokit/xeokit-sdk/src/viewer/scene/CameraControl/CameraControl.js' {
    import { Component } from "@xeokit/xeokit-sdk/src/viewer/scene/Component.js";
    /**
     * @desc Controls the {@link Camera} with user input, and fires events when the user interacts with pickable {@link Entity}s.
     *
     * # Contents
     *
     * * [Overview](#overview)
     * * [Examples](#examples)
     * * [Orbit Mode](#orbit-mode)
     *      + [Following the Pointer in Orbit Mode](#--following-the-pointer-in-orbit-mode--)
     *      + [Showing the Pivot Position](#--showing-the-pivot-position--)
     *      + [Axis-Aligned Views in Orbit Mode](#--axis-aligned-views-in-orbit-mode--)
     *      + [View-Fitting Entitys in Orbit Mode](#--view-fitting-entitys-in-orbit-mode--)
     * * [First-Person Mode](#first-person-mode)
     *      + [Following the Pointer in First-Person Mode](#--following-the-pointer-in-first-person-mode--)
     *      + [Constraining Vertical Position in First-Person Mode](#--constraining-vertical-position-in-first-person-mode--)
     *      + [Axis-Aligned Views in First-Person Mode](#--axis-aligned-views-in-first-person-mode--)
     *      + [View-Fitting Entitys in First-Person Mode](#--view-fitting-entitys-in-first-person-mode--)
     * * [Plan-View Mode](#plan-view-mode)
     *      + [Following the Pointer in Plan-View Mode](#--following-the-pointer-in-plan-view-mode--)
     *      + [Axis-Aligned Views in Plan-View Mode](#--axis-aligned-views-in-plan-view-mode--)
     * * [CameraControl Events](#cameracontrol-events)
     *      + ["hover"](#---hover---)
     *      + ["hoverOff"](#---hoveroff---)
     *      + ["hoverEnter"](#---hoverenter---)
     *      + ["hoverOut"](#---hoverout---)
     *      + ["picked"](#---picked---)
     *      + ["pickedSurface"](#---pickedsurface---)
     *      + ["pickedNothing"](#---pickednothing---)
     *      + ["doublePicked"](#---doublepicked---)
     *      + ["doublePickedSurface"](#---doublepickedsurface---)
     *      + ["doublePickedNothing"](#---doublepickednothing---)
     *      + ["rightClick"](#---rightclick---)
     * * [Custom Keyboard Mappings](#custom-keyboard-mappings)
     *
     * <br><br>
     *
     * # Overview
     *
     * * Each {@link Viewer} has a ````CameraControl````, located at {@link Viewer#cameraControl}.
     * * {@link CameraControl#navMode} selects the navigation mode:
     *      * ````"orbit"```` rotates the {@link Camera} position about the target.
     *      * ````"firstPerson"```` rotates the World about the Camera position.
     *      * ````"planView"```` never rotates, but still allows to pan and dolly, typically for an axis-aligned view.
     * * {@link CameraControl#followPointer} makes the Camera follow the mouse or touch pointer.
     * * {@link CameraControl#constrainVertical} locks the Camera to its current height when in first-person mode.
     * * ````CameraControl```` fires pick events when we hover, click or tap on an {@link Entity}.
     * <br><br>
     *
     * # Examples
     *
     * * [Orbit Navigation - Duplex Model](https://xeokit.github.io/xeokit-sdk/examples/#CameraControl_orbit_Duplex)
     * * [Orbit Navigation - Holter Tower Model](https://xeokit.github.io/xeokit-sdk/examples/#CameraControl_orbit_HolterTower)
     * * [First-Person Navigation - Duplex Model](https://xeokit.github.io/xeokit-sdk/examples/#CameraControl_firstPerson_Duplex)
     * * [First-Person Navigation - Holter Tower Model](https://xeokit.github.io/xeokit-sdk/examples/#CameraControl_firstPerson_HolterTower)
     * * [Plan-view Navigation - Schependomlaan Model](https://xeokit.github.io/xeokit-sdk/examples/#CameraControl_planView_Schependomlaan)
     * * [Custom Keyboard Mapping](https://xeokit.github.io/xeokit-sdk/examples/#CameraControl_keyMap)
     * <br><br>
     *
     * # Orbit Mode
     *
     * In orbit mode, ````CameraControl```` orbits the {@link Camera} about the target.
     *
     * To enable orbit mode:
     *
     * ````javascript
     * const cameraControl = myViewer.cameraControl;
     * cameraControl.navMode = "orbit";
     * ````
     *
     * Then orbit by:
     *
     * * left-dragging the mouse,
     * * tap-dragging the touch pad, and
     * * pressing arrow keys, or ````Q```` and ````E```` on a QWERTY keyboard, or ````A```` and ````E```` on an AZERTY keyboard.
     * <br><br>
     *
     * Dolly forwards and backwards by:
     *
     * * spinning the mouse wheel,
     * * pinching on the touch pad, and
     * * pressing the ````+```` and ````-```` keys, or ````W```` and ````S```` on a QWERTY keyboard, or ````Z```` and ````S```` for AZERTY.
     * <br><br>
     *
     * Pan horizontally and vertically by:
     *
     * * right-dragging the mouse,
     * * left-dragging the mouse with the SHIFT key down,
     * * tap-dragging the touch pad with SHIFT down,
     * * pressing the ````A````, ````D````, ````Z```` and ````X```` keys on a QWERTY keyboard, and
     * * pressing the ````Q````, ````D````, ````W```` and ````X```` keys on an AZERTY keyboard,
     * <br><br>
     *
     * ## Following the Pointer in Orbit Mode
     *
     * When {@link CameraControl#followPointer} is ````true````in orbiting mode, the mouse or touch pointer will dynamically
     * indicate the target that the {@link Camera} will orbit, as well as dolly to and from.
     *
     * Lets ensure that we're in orbit mode, then enable the {@link Camera} to follow the pointer:
     *
     * ````javascript
     * cameraControl.navMode = "orbit";
     * cameraControl.followPointer = true;
     * ````
     *
     * ## Smart Pivoting
     *
     * TODO
     *
     * ## Showing the Pivot Position
     *
     * We can configure {@link CameraControl#pivotElement} with an HTML element to indicate the current
     * pivot position. The indicator will appear momentarily each time we move the {@link Camera} while in orbit mode with
     * {@link CameraControl#followPointer} set ````true````.
     *
     * First we'll define some CSS to style our pivot indicator as a black dot with a white border:
     *
     * ````css
     * .camera-pivot-marker {
     *      color: #ffffff;
     *      position: absolute;
     *      width: 25px;
     *      height: 25px;
     *      border-radius: 15px;
     *      border: 2px solid #ebebeb;
     *      background: black;
     *      visibility: hidden;
     *      box-shadow: 5px 5px 15px 1px #000000;
     *      z-index: 10000;
     *      pointer-events: none;
     * }
     * ````
     *
     * Then we'll attach our pivot indicator's HTML element to the ````CameraControl````:
     *
     * ````javascript
     * const pivotElement = document.createRange().createContextualFragment("<div class='camera-pivot-marker'></div>").firstChild;
     *
     * document.body.appendChild(pivotElement);
     *
     * cameraControl.pivotElement = pivotElement;
     * ````
     *
     * ## Axis-Aligned Views in Orbit Mode
     *
     * In orbit mode, we can use keys 1-6 to position the {@link Camera} to look at the center of the {@link Scene} from along each of the
     * six World-space axis. Pressing one of these keys will fly the {@link Camera} to the corresponding axis-aligned view.
     *
     * ## View-Fitting Entitys in Orbit Mode
     *
     * When {@link CameraControl#doublePickFlyTo} is ````true````, we can left-double-click or
     * double-tap (ie. "double-pick") an {@link Entity} to fit it to view. This will cause the {@link Camera}
     * to fly to that Entity. Our target then becomes the center of that Entity. If we are currently pivoting,
     * then our pivot position is then also set to the Entity center.
     *
     * Disable that behaviour by setting {@link CameraControl#doublePickFlyTo} ````false````.
     *
     * # First-Person Mode
     *
     * In first-person mode, ````CameraControl```` rotates the World about the {@link Camera} position.
     *
     * To enable first-person mode:
     *
     * ````javascript
     * cameraControl.navMode = "firstPerson";
     * ````
     *
     * Then rotate by:
     *
     * * left-dragging the mouse,
     * * tap-dragging the touch pad,
     * * pressing arrow keys, or ````Q```` and ````E```` on a QWERTY keyboard, or ````A```` and ````E```` on an AZERTY keyboard.
     * <br><br>
     *
     * Dolly forwards and backwards by:
     *
     * * spinning the mouse wheel,
     * * pinching on the touch pad, and
     * * pressing the ````+```` and ````-```` keys, or ````W```` and ````S```` on a QWERTY keyboard, or ````Z```` and ````S```` for AZERTY.
     * <br><br>
     *
     * Pan left, right, up and down by:
     *
     * * left-dragging or right-dragging the mouse, and
     * * tap-dragging the touch pad with SHIFT down.
     *
     * Pan forwards, backwards, left, right, up and down by pressing the ````WSADZX```` keys on a QWERTY keyboard,
     * or ````WSQDWX```` keys on an AZERTY keyboard.
     * <br><br>
     *
     * ## Following the Pointer in First-Person Mode
     *
     * When {@link CameraControl#followPointer} is ````true```` in first-person mode, the mouse or touch pointer will dynamically
     * indicate the target to which the {@link Camera} will dolly to and from. In first-person mode, however, the World will always rotate
     * about the {@link Camera} position.
     *
     * Lets ensure that we're in first-person mode, then enable the {@link Camera} to follow the pointer:
     *
     * ````javascript
     * cameraControl.navMode = "firstPerson";
     * cameraControl.followPointer = true;
     * ````
     *
     * When the pointer is over empty space, the target will remain the last object that the pointer was over.
     *
     * ## Constraining Vertical Position in First-Person Mode
     *
     * In first-person mode, we can lock the {@link Camera} to its current position on the vertical World axis, which is useful for walk-through navigation:
     *
     * ````javascript
     * cameraControl.constrainVertical = true;
     * ````
     *
     * ## Axis-Aligned Views in First-Person Mode
     *
     * In first-person mode we can use keys 1-6 to position the {@link Camera} to look at the center of
     * the {@link Scene} from along each of the six World-space axis. Pressing one of these keys will fly the {@link Camera} to the
     * corresponding axis-aligned view.
     *
     * ## View-Fitting Entitys in First-Person Mode
     *
     * As in orbit mode, when in first-person mode and {@link CameraControl#doublePickFlyTo} is ````true````, we can double-click
     * or double-tap an {@link Entity} (ie. "double-picking") to fit it in view. This will cause the {@link Camera} to fly to
     * that Entity. Our target then becomes the center of that Entity.
     *
     * Disable that behaviour by setting {@link CameraControl#doublePickFlyTo} ````false````.
     *
     * # Plan-View Mode
     *
     * In plan-view mode, ````CameraControl```` pans and rotates the {@link Camera}, without rotating it.
     *
     * To enable plan-view mode:
     *
     * ````javascript
     * cameraControl.navMode = "planView";
     * ````
     *
     * Dolly forwards and backwards by:
     *
     * * spinning the mouse wheel,
     * * pinching on the touch pad, and
     * * pressing the ````+```` and ````-```` keys.
     *
     * <br>
     * Pan left, right, up and down by:
     *
     * * left-dragging or right-dragging the mouse, and
     * * tap-dragging the touch pad with SHIFT down.
     *
     * Pan forwards, backwards, left, right, up and down by pressing the ````WSADZX```` keys on a QWERTY keyboard,
     * or ````WSQDWX```` keys on an AZERTY keyboard.
     * <br><br>
     *
     * ## Following the Pointer in Plan-View Mode
     *
     * When {@link CameraControl#followPointer} is ````true```` in plan-view mode, the mouse or touch pointer will dynamically
     * indicate the target to which the {@link Camera} will dolly to and from.  In plan-view mode, however, the {@link Camera} cannot rotate.
     *
     * Lets ensure that we're in plan-view mode, then enable the {@link Camera} to follow the pointer:
     *
     * ````javascript
     * cameraControl.navMode = "planView";
     * cameraControl.followPointer = true;
     * ````
     *
     * When the pointer is over empty space, the target will remain the last object that the pointer was over.
     *
     * ## Axis-Aligned Views in Plan-View Mode
     *
     * As in orbit and first-person modes, in plan-view mode we can use keys 1-6 to position the {@link Camera} to look at the center of
     * the {@link Scene} from along each of the six World-space axis. Pressing one of these keys will fly the {@link Camera} to the
     * corresponding axis-aligned view.
     *
     * # CameraControl Events
     *
     * ````CameraControl```` fires events as we interact with {@link Entity}s using mouse or touch input.
     *
     * The following examples demonstrate how to subscribe to those events.
     *
     * The first example shows how to save a handle to a subscription, which we can later use to unsubscribe.
     *
     * ## "hover"
     *
     * Event fired when the pointer moves while hovering over an Entity.
     *
     * ````javascript
     * const onHover = cameraControl.on("hover", (e) => {
     *      const entity = e.entity; // Entity
     *      const canvasPos = e.canvasPos; // 2D canvas position
     * });
     * ````
     *
     * To unsubscribe from the event:
     *
     * ````javascript
     * cameraControl.off(onHover);
     * ````
     *
     * ## "hoverOff"
     *
     * Event fired when the pointer moves while hovering over empty space.
     *
     * ````javascript
     * cameraControl.on("hoverOff", (e) => {
     *      const canvasPos = e.canvasPos;
     * });
     * ````
     *
     * ## "hoverEnter"
     *
     * Event fired when the pointer moves onto an Entity.
     *
     * ````javascript
     * cameraControl.on("hoverEnter", (e) => {
     *      const entity = e.entity;
     *      const canvasPos = e.canvasPos;
     * });
     * ````
     *
     * ## "hoverOut"
     *
     * Event fired when the pointer moves off an Entity.
     *
     * ````javascript
     * cameraControl.on("hoverOut", (e) => {
     *      const entity = e.entity;
     *      const canvasPos = e.canvasPos;
     * });
     * ````
     *
     * ## "picked"
     *
     * Event fired when we left-click or tap on an Entity.
     *
     * ````javascript
     * cameraControl.on("picked", (e) => {
     *      const entity = e.entity;
     *      const canvasPos = e.canvasPos;
     * });
     * ````
     *
     * ## "pickedSurface"
     *
     * Event fired when we left-click or tap on the surface of an Entity.
     *
     * ````javascript
     * cameraControl.on("picked", (e) => {
     *      const entity = e.entity;
     *      const canvasPos = e.canvasPos;
     *      const worldPos = e.worldPos; // 3D World-space position
     *      const viewPos = e.viewPos; // 3D View-space position
     *      const worldNormal = e.worldNormal; // 3D World-space normal vector
     * });
     * ````
     *
     * ## "pickedNothing"
     *
     * Event fired when we left-click or tap on empty space.
     *
     * ````javascript
     * cameraControl.on("pickedNothing", (e) => {
     *      const canvasPos = e.canvasPos;
     * });
     * ````
     *
     * ## "doublePicked"
     *
     * Event fired wwhen we left-double-click or double-tap on an Entity.
     *
     * ````javascript
     * cameraControl.on("doublePicked", (e) => {
     *      const entity = e.entity;
     *      const canvasPos = e.canvasPos;
     * });
     * ````
     *
     * ## "doublePickedSurface"
     *
     * Event fired when we left-double-click or double-tap on the surface of an Entity.
     *
     * ````javascript
     * cameraControl.on("doublePickedSurface", (e) => {
     *      const entity = e.entity;
     *      const canvasPos = e.canvasPos;
     *      const worldPos = e.worldPos;
     *      const viewPos = e.viewPos;
     *      const worldNormal = e.worldNormal;
     * });
     * ````
     *
     * ## "doublePickedNothing"
     *
     * Event fired when we left-double-click or double-tap on empty space.
     *
     * ````javascript
     * cameraControl.on("doublePickedNothing", (e) => {
     *      const canvasPos = e.canvasPos;
     * });
     * ````
     *
     * ## "rightClick"
     *
     * Event fired when we right-click on the canvas.
     *
     * ````javascript
     * cameraControl.on("rightClick", (e) => {
     *      const event = e.event; // Mouse event
     *      const canvasPos = e.canvasPos;
     * });
     * ````
     *
     * ## Custom Keyboard Mappings
     *
     * We can customize````CameraControl```` key bindings as shown below.
     *
     * In this example, we'll just set the default bindings for a QWERTY keyboard.
     *
     * ````javascript
     * const input = myViewer.scene.input;
     *
     * cameraControl.navMode = "orbit";
     * cameraControl.followPointer = true;
     *
     * const keyMap = {};
     *
     * keyMap[cameraControl.PAN_LEFT] = [input.KEY_A];
     * keyMap[cameraControl.PAN_RIGHT] = [input.KEY_D];
     * keyMap[cameraControl.PAN_UP] = [input.KEY_Z];
     * keyMap[cameraControl.PAN_DOWN] = [input.KEY_X];
     * keyMap[cameraControl.DOLLY_FORWARDS] = [input.KEY_W, input.KEY_ADD];
     * keyMap[cameraControl.DOLLY_BACKWARDS] = [input.KEY_S, input.KEY_SUBTRACT];
     * keyMap[cameraControl.ROTATE_X_POS] = [input.KEY_DOWN_ARROW];
     * keyMap[cameraControl.ROTATE_X_NEG] = [input.KEY_UP_ARROW];
     * keyMap[cameraControl.ROTATE_Y_POS] = [input.KEY_LEFT_ARROW];
     * keyMap[cameraControl.ROTATE_Y_NEG] = [input.KEY_RIGHT_ARROW];
     * keyMap[cameraControl.AXIS_VIEW_RIGHT] = [input.KEY_NUM_1];
     * keyMap[cameraControl.AXIS_VIEW_BACK] = [input.KEY_NUM_2];
     * keyMap[cameraControl.AXIS_VIEW_LEFT] = [input.KEY_NUM_3];
     * keyMap[cameraControl.AXIS_VIEW_FRONT] = [input.KEY_NUM_4];
     * keyMap[cameraControl.AXIS_VIEW_TOP] = [input.KEY_NUM_5];
     * keyMap[cameraControl.AXIS_VIEW_BOTTOM] = [input.KEY_NUM_6];
     *
     * cameraControl.keyMap = keyMap;
     * ````
     *
     * We can also just configure default bindings for a specified keyboard layout, like this:
     *
     * ````javascript
     * cameraControl.keyMap = "qwerty";
     * ````
     *
     * Then, ````CameraControl```` will internally set {@link CameraControl#keyMap} to the default key map for the QWERTY
     * layout (which is the same set of mappings we set in the previous example). In other words, if we subsequently
     * read {@link CameraControl#keyMap}, it will now be a key map, instead of the "qwerty" string value we set it to.
     *
     * Supported layouts are, so far:
     *
     * * ````"qwerty"````
     * * ````"azerty"````
     */
    export class CameraControl extends Component {
        /**
         * @private
         * @constructor
         */
        private constructor();
        /**
         * Identifies the XX action.
         * @final
         * @type {Number}
         */
        PAN_LEFT: number;
        /**
         * Identifies the XX action.
         * @final
         * @type {Number}
         */
        PAN_RIGHT: number;
        /**
         * Identifies the XX action.
         * @final
         * @type {Number}
         */
        PAN_UP: number;
        /**
         * Identifies the XX action.
         * @final
         * @type {Number}
         */
        PAN_DOWN: number;
        /**
         * Identifies the XX action.
         * @final
         * @type {Number}
         */
        PAN_FORWARDS: number;
        /**
         * Identifies the XX action.
         * @final
         * @type {Number}
         */
        PAN_BACKWARDS: number;
        /**
         * Identifies the XX action.
         * @final
         * @type {Number}
         */
        ROTATE_X_POS: number;
        /**
         * Identifies the XX action.
         * @final
         * @type {Number}
         */
        ROTATE_X_NEG: number;
        /**
         * Identifies the XX action.
         * @final
         * @type {Number}
         */
        ROTATE_Y_POS: number;
        /**
         * Identifies the XX action.
         * @final
         * @type {Number}
         */
        ROTATE_Y_NEG: number;
        /**
         * Identifies the XX action.
         * @final
         * @type {Number}
         */
        DOLLY_FORWARDS: number;
        /**
         * Identifies the XX action.
         * @final
         * @type {Number}
         */
        DOLLY_BACKWARDS: number;
        /**
         * Identifies the XX action.
         * @final
         * @type {Number}
         */
        AXIS_VIEW_RIGHT: number;
        /**
         * Identifies the XX action.
         * @final
         * @type {Number}
         */
        AXIS_VIEW_BACK: number;
        /**
         * Identifies the XX action.
         * @final
         * @type {Number}
         */
        AXIS_VIEW_LEFT: number;
        /**
         * Identifies the XX action.
         * @final
         * @type {Number}
         */
        AXIS_VIEW_FRONT: number;
        /**
         * Identifies the XX action.
         * @final
         * @type {Number}
         */
        AXIS_VIEW_TOP: number;
        /**
         * Identifies the XX action.
         * @final
         * @type {Number}
         */
        AXIS_VIEW_BOTTOM: number;
        _keyMap: {};
        _configs: {
            tapInterval: number;
            doubleTapInterval: number;
            tapDistanceThreshold: number;
            active: boolean;
            keyboardLayout: string;
            navMode: string;
            planView: boolean;
            firstPerson: boolean;
            followPointer: boolean;
            doublePickFlyTo: boolean;
            panRightClick: boolean;
            showPivot: boolean;
            pointerEnabled: boolean;
            constrainVertical: boolean;
            smartPivot: boolean;
            dragRotationRate: number;
            keyboardRotationRate: number;
            rotationInertia: number;
            keyboardPanRate: number;
            touchPanRate: number;
            panInertia: number;
            keyboardDollyRate: number;
            mouseWheelDollyRate: number;
            touchDollyRate: number;
            dollyInertia: number;
            dollyProximityThreshold: number;
            dollyMinSpeed: number;
        };
        _states: {
            pointerCanvasPos: any;
            mouseover: boolean;
            inputFromMouse: boolean;
            followPointerDirty: boolean;
            mouseDownClientX: number;
            mouseDownClientY: number;
            mouseDownCursorX: number;
            mouseDownCursorY: number;
            touchStartTime: any;
            activeTouches: any[];
            tapStartPos: any;
            tapStartTime: number;
            lastTapTime: number;
        };
        _updates: {
            rotateDeltaX: number;
            rotateDeltaY: number;
            panDeltaX: number;
            panDeltaY: number;
            panDeltaZ: number;
            dollyDelta: number;
        };
        _controllers: {
            cameraControl: CameraControl;
            pickController: any;
            pivotController: any;
            panController: any;
            cameraFlight: any;
        };
        _handlers: any[];
        _cameraUpdater: any;
        /**
         * Sets the current navigation mode.
         *
         * Accepted values are:
         *
         * * "orbit" - rotation orbits about the current target or pivot point,
         * * "firstPerson" - rotation is about the current eye position,
         * * "planView" - rotation is disabled.
         *
         * See class comments for more info.
         *
         * @param {String} navMode The navigation mode: "orbit", "firstPerson" or "planView".
         */
        set navMode(arg: string);
        /**
         * Gets the current navigation mode.
         *
         * @returns {String} The navigation mode: "orbit", "firstPerson" or "planView".
         */
        get navMode(): string;
        /**
         * Sets whether this ````CameraControl```` is in plan-view mode.
         *
         * When in plan-view mode, rotation is disabled.
         *
         * Default is ````false````.
         *
         * Deprecated - use {@link CameraControl#navMode} instead.
         *
         * @param {Boolean} value Set ````true```` to enable plan-view mode.
         * @deprecated
         */
        set planView(arg: boolean);
        /**
         * Gets whether this ````CameraControl```` is in plan-view mode.
         *
         * When in plan-view mode, rotation is disabled.
         *
         * Default is ````false````.
         *
         * Deprecated - use {@link CameraControl#navMode} instead.
         *
         * @returns {Boolean} Returns ````true```` if plan-view mode is enabled.
         * @deprecated
         */
        get planView(): boolean;
        /**
         * Sets whether to vertically constrain the {@link Camera} position for first-person navigation.
         *
         * When set ````true````, this constrains {@link Camera#eye} to its current vertical position.
         *
         * Only applies when {@link CameraControl#navMode} is ````"firstPerson"````.
         *
         * Default is ````false````.
         *
         * @param {Boolean} value Set ````true```` to vertically constrain the Camera.
         */
        set constrainVertical(arg: boolean);
        /**
         * Gets whether to vertically constrain the {@link Camera} position for first-person navigation.
         *
         * When set ````true````, this constrains {@link Camera#eye} to its current vertical position.
         *
         * Only applies when {@link CameraControl#navMode} is ````"firstPerson"````.
         *
         * Default is ````false````.
         *
         * @returns {Boolean} ````true```` when Camera is vertically constrained.
         */
        get constrainVertical(): boolean;
        /**
         * Sets the keyboard layout.
         *
         * Supported layouts are:
         *
         * * ````"qwerty"```` (default)
         * * ````"azerty"````
         *
         * @deprecated
         * @param {String} value Selects the keyboard layout.
         */
        set keyboardLayout(arg: string);
        /**
         * Gets the keyboard layout.
         *
         * Supported layouts are:
         *
         * * ````"qwerty"```` (default)
         * * ````"azerty"````
         *
         * @deprecated
         * @returns {String} The current keyboard layout.
         */
        get keyboardLayout(): string;
        /**
         * Sets custom mappings of keys to ````CameraControl```` actions.
         *
         * See class docs for usage.
         *
         * @param {{Number:Number}|String} value Either a set of new key mappings, or a string to select a keyboard layout,
         * which causes ````CameraControl```` to use the default key mappings for that layout.
         */
        set keyMap(arg: {
            Number: number;
        });
        /**
         * Gets custom mappings of keys to {@link CameraControl} actions.
         *
         * @returns {{Number:Number}} Current key mappings.
         */
        get keyMap(): {
            Number: number;
        };
        /**
         * Sets whether double-picking an {@link Entity} causes the {@link Camera} to fly to its boundary.
         *
         * Default is ````false````.
         *
         * @param {Boolean} value Set ````true```` to enable double-pick-fly-to mode.
         */
        set doublePickFlyTo(arg: boolean);
        /**
         * Gets whether double-picking an {@link Entity} causes the {@link Camera} to fly to its boundary.
         *
         * Default is ````false````.
         *
         * @returns {Boolean} Returns ````true```` when double-pick-fly-to mode is enabled.
         */
        get doublePickFlyTo(): boolean;
        /**
         * Sets whether either right-clicking (true) or middle-clicking (false) pans the {@link Camera}.
         *
         * Default is ````true````.
         *
         * @param {Boolean} value Set ````false```` to disable pan on right-click.
         */
        set panRightClick(arg: boolean);
        /**
         * Gets whether right-clicking pans the {@link Camera}.
         *
         * Default is ````true````.
         *
         * @returns {Boolean} Returns ````false```` when pan on right-click is disabled.
         */
        get panRightClick(): boolean;
        /**
         *  Sets if this ````CameraControl```` is active or not.
         *
         * When inactive, the ````CameraControl```` will not react to input.
         *
         * Default is ````true````.
         *
         * @param {Boolean} value Set ````true```` to activate this ````CameraControl````.
         */
        set active(arg: boolean);
        /**
         * Gets if this ````CameraControl```` is active or not.
         *
         * When inactive, the ````CameraControl```` will not react to input.
         *
         * Default is ````true````.
         *
         * @returns {Boolean} Returns ````true```` if this ````CameraControl```` is active.
         */
        get active(): boolean;
        /**
         * Sets whether the {@link Camera} follows the mouse or touch pointer.
         *
         * In orbiting mode, the Camera will orbit about the pointer, and will dolly to and from the pointer.
         *
         * In fly-to mode, the Camera will dolly to and from the pointer, however the World will always rotate about the Camera position.
         *
         * In plan-view mode, the Camera will dolly to and from the pointer, however the Camera will not rotate.
         *
         * Default is ````false````.
         *
         * See class comments for more info.
         *
         * @param {Boolean} value Set ````true```` to enable the Camera to follow the pointer.
         */
        set followPointer(arg: boolean);
        /**
         * Sets whether the {@link Camera} follows the mouse or touch pointer.
         *
         * In orbiting mode, the Camera will orbit about the pointer, and will dolly to and from the pointer.
         *
         * In fly-to mode, the Camera will dolly to and from the pointer, however the World will always rotate about the Camera position.
         *
         * In plan-view mode, the Camera will dolly to and from the pointer, however the Camera will not rotate.
         *
         * Default is ````false````.
         *
         * See class comments for more info.
         *
         * @returns {Boolean} Returns ````true```` if the Camera follows the pointer.
         */
        get followPointer(): boolean;
        /**
         * Sets a factor in range ````[0..1]```` indicating how much the {@link Camera} keeps moving after you finish rotating it.
         *
         * A value of ````0.0```` causes it to immediately stop, ````0.5```` causes its movement to decay 50% on each tick,
         * while ````1.0```` causes no decay, allowing it continue moving, by the current rate of rotation.
         *
         * You may choose an inertia of zero when you want be able to precisely rotate the Camera,
         * without interference from inertia. Zero inertia can also mean that less frames are rendered while
         * you are rotating the Camera.
         *
         * Default is ````0.0````.
         *
         * Does not apply when {@link CameraControl#navMode} is ````"planView"````, which disallows rotation.
         *
         * @param {Number} rotationInertia New inertial factor.
         */
        set rotationInertia(arg: number);
        /**
         * Gets the rotation inertia factor.
         *
         * Default is ````0.0````.
         *
         * Does not apply when {@link CameraControl#navMode} is ````"planView"````, which disallows rotation.
         *
         * @returns {Number} The inertia factor.
         */
        get rotationInertia(): number;
        /**
         * Sets how much the {@link Camera} pans each second with keyboard input.
         *
         * Default is ````5.0````, to pan the Camera ````5.0```` World-space units every second that
         * a panning key is depressed. See the ````CameraControl```` class documentation for which keys control
         * panning.
         *
         * Panning direction is aligned to our Camera's orientation. When we pan horizontally, we pan
         * to our left and right, when we pan vertically, we pan upwards and downwards, and when we pan forwards
         * and backwards, we pan along the direction the Camera is pointing.
         *
         * Unlike dollying when {@link followPointer} is ````true````, panning does not follow the pointer.
         *
         * @param {Number} keyboardPanRate The new keyboard pan rate.
         */
        set keyboardPanRate(arg: number);
        /**
         * Gets how much the {@link Camera} pans each second with keyboard input.
         *
         * Default is ````5.0````.
         *
         * @returns {Number} The current keyboard pan rate.
         */
        get keyboardPanRate(): number;
        /**
         * Sets how fast the camera pans on touch panning
         *
         * @param {Number} touchPanRate The new touch pan rate.
         */
        set touchPanRate(arg: number);
        /**
         * Gets how fast the {@link Camera} pans on touch panning
         *
         * Default is ````1.0````.
         *
         * @returns {Number} The current touch pan rate.
         */
        get touchPanRate(): number;
        /**
         * Sets how many degrees per second the {@link Camera} rotates/orbits with keyboard input.
         *
         * Default is ````90.0````, to rotate/orbit the Camera ````90.0```` degrees every second that
         * a rotation key is depressed. See the ````CameraControl```` class documentation for which keys control
         * rotation/orbit.
         *
         * @param {Number} keyboardRotationRate The new keyboard rotation rate.
         */
        set keyboardRotationRate(arg: number);
        /**
         * Sets how many degrees per second the {@link Camera} rotates/orbits with keyboard input.
         *
         * Default is ````90.0````.
         *
         * @returns {Number} The current keyboard rotation rate.
         */
        get keyboardRotationRate(): number;
        /**
         * Sets the current drag rotation rate.
         *
         * This configures how many degrees the {@link Camera} rotates/orbits for a full sweep of the canvas by mouse or touch dragging.
         *
         * For example, a value of ````360.0```` indicates that the ````Camera```` rotates/orbits ````360.0```` degrees horizontally
         * when we sweep the entire width of the canvas.
         *
         * ````CameraControl```` makes vertical rotation half as sensitive as horizontal rotation, so that we don't tend to
         * flip upside-down. Therefore, a value of ````360.0```` rotates/orbits the ````Camera```` through ````180.0```` degrees
         * vertically when we sweep the entire height of the canvas.
         *
         * Default is ````360.0````.
         *
         * @param {Number} dragRotationRate The new drag rotation rate.
         */
        set dragRotationRate(arg: number);
        /**
         * Gets the current drag rotation rate.
         *
         * Default is ````360.0````.
         *
         * @returns {Number} The current drag rotation rate.
         */
        get dragRotationRate(): number;
        /**
         * Sets how much the {@link Camera} dollys with touch input.
         *
         * Default is ````0.05````
         *
         * @param {Number} touchDollyRate The new touch dolly rate.
         */
        set touchDollyRate(arg: number);
        /**
         * Gets how much the {@link Camera} dollys each second with touch input.
         *
         * Default is ````0.05````.
         *
         * @returns {Number} The current touch dolly rate.
         */
        get touchDollyRate(): number;
        /**
         * Sets the dolly inertia factor.
         *
         * This factor configures how much the {@link Camera} keeps moving after you finish dollying it.
         *
         * This factor is a value in range ````[0..1]````. A value of ````0.0```` causes dollying to immediately stop,
         * ````0.5```` causes dollying to decay 50% on each animation frame, while ````1.0```` causes no decay, which allows dollying
         * to continue until further input stops it.
         *
         * You might set ````dollyInertia```` to zero when you want be able to precisely position or rotate the Camera,
         * without interference from inertia. This also means that xeokit renders less frames while dollying the Camera,
         * which can improve rendering performance.
         *
         * Default is ````0````.
         *
         * @param {Number} dollyInertia New dolly inertia factor.
         */
        set dollyInertia(arg: number);
        /**
         * Gets the dolly inertia factor.
         *
         * Default is ````0````.
         *
         * @returns {Number} The current dolly inertia factor.
         */
        get dollyInertia(): number;
        /**
         * Sets the proximity to the closest object below which dolly speed decreases, and above which dolly speed increases.
         *
         * Default is ````35.0````.
         *
         * @param {Number} dollyProximityThreshold New dolly proximity threshold.
         */
        set dollyProximityThreshold(arg: number);
        /**
         * Gets the proximity to the closest object below which dolly speed decreases, and above which dolly speed increases.
         *
         * Default is ````35.0````.
         *
         * @returns {Number} The current dolly proximity threshold.
         */
        get dollyProximityThreshold(): number;
        /**
         * Sets the minimum dolly speed.
         *
         * Default is ````0.04````.
         *
         * @param {Number} dollyMinSpeed New dolly minimum speed.
         */
        set dollyMinSpeed(arg: number);
        /**
         * Gets the minimum dolly speed.
         *
         * Default is ````0.04````.
         *
         * @returns {Number} The current minimum dolly speed.
         */
        get dollyMinSpeed(): number;
        /**
         * Sets the pan inertia factor.
         *
         * This factor configures how much the {@link Camera} keeps moving after you finish panning it.
         *
         * This factor is a value in range ````[0..1]````. A value of ````0.0```` causes panning to immediately stop,
         * ````0.5```` causes panning to decay 50% on each animation frame, while ````1.0```` causes no decay, which allows panning
         * to continue until further input stops it.
         *
         * You might set ````panInertia```` to zero when you want be able to precisely position or rotate the Camera,
         * without interference from inertia. This also means that xeokit renders less frames while panning the Camera,
         * wich can improve rendering performance.
         *
         * Default is ````0.5````.
         *
         * @param {Number} panInertia New pan inertia factor.
         */
        set panInertia(arg: number);
        /**
         * Gets the pan inertia factor.
         *
         * Default is ````0.5````.
         *
         * @returns {Number} The current pan inertia factor.
         */
        get panInertia(): number;
        /**
         * Sets whether mouse and touch input is enabled.
         *
         * Default is ````true````.
         *
         * Disabling mouse and touch input on ````CameraControl```` is useful when we want to temporarily use mouse or
         * touch input to interact with some other 3D control, without disturbing the {@link Camera}.
         *
         * @param {Boolean} value Set ````true```` to enable mouse and touch input.
         */
        set pointerEnabled(arg: boolean);
        /**
         * Gets whether mouse and touch input is enabled.
         *
         * Default is ````true````.
         *
         * Disabling mouse and touch input on ````CameraControl```` is desirable when we want to temporarily use mouse or
         * touch input to interact with some other 3D control, without interfering with the {@link Camera}.
         *
         * @returns {Boolean} Returns ````true```` if mouse and touch input is enabled.
         */
        get pointerEnabled(): boolean;
        /**
         * Sets how much the {@link Camera} dollys each second with keyboard input.
         *
         * Default is ````15.0````, to dolly the {@link Camera} ````15.0```` World-space units per second while we hold down
         * the ````+```` and ````-```` keys.
         *
         * @param {Number} keyboardDollyRate The new keyboard dolly rate.
         */
        set keyboardDollyRate(arg: number);
        /**
         * Gets how much the {@link Camera} dollys each second with keyboard input.
         *
         * Default is ````15.0````.
         *
         * @returns {Number} The current keyboard dolly rate.
         */
        get keyboardDollyRate(): number;
        /**
         * Sets how much the {@link Camera} dollys each second while the mouse wheel is spinning.
         *
         * Default is ````100.0````, to dolly the {@link Camera} ````10.0```` World-space units per second as we spin
         * the mouse wheel.
         *
         * @param {Number} mouseWheelDollyRate The new mouse wheel dolly rate.
         */
        set mouseWheelDollyRate(arg: number);
        /**
         * Gets how much the {@link Camera} dollys each second while the mouse wheel is spinning.
         *
         * Default is ````100.0````.
         *
         * @returns {Number} The current mouseWheel dolly rate.
         */
        get mouseWheelDollyRate(): number;
        /**
         * Returns true if any keys configured for the given action are down.
         * @param action
         * @param keyDownMap
         * @private
         */
        private _isKeyDownForAction;
        /**
         * Sets the HTMl element to represent the pivot point when {@link CameraControl#followPointer} is true.
         *
         * See class comments for an example.
         *
         * @param {HTMLElement} element HTML element representing the pivot point.
         */
        set pivotElement(arg: HTMLElement);
        _reset(): void;
        /**
         * Sets the current World-space 3D target position.
         *
         * Only applies when {@link CameraControl#followPointer} is ````true````.
         *
         * @param {Number[]} worldPos The new World-space 3D target position.
         */
        set pivotPos(arg: number[]);
        /**
         * Gets the current World-space 3D pivot position.
         *
         * Only applies when {@link CameraControl#followPointer} is ````true````.
         *
         * @return {Number[]} worldPos The current World-space 3D pivot position.
         */
        get pivotPos(): number[];
        /**
         * @deprecated
         * @param {Boolean} value Set ````true```` to enable dolly-to-pointer behaviour.
         */
        set dollyToPointer(arg: boolean);
        /**
         * @deprecated
         * @returns {Boolean} Returns ````true```` if dolly-to-pointer behaviour is enabled.
         */
        get dollyToPointer(): boolean;
        /**
         * @deprecated
         * @param {Boolean} value Set ````true```` to enable dolly-to-pointer behaviour.
         */
        set panToPointer(arg: boolean);
        /**
         * @deprecated
         * @returns {Boolean} Returns ````true```` if dolly-to-pointer behaviour is enabled.
         */
        get panToPointer(): boolean;
        /**
         * Sets whether this ````CameraControl```` is in first-person mode.
         *
         * In "first person" mode (disabled by default) the look position rotates about the eye position. Otherwise,  {@link Camera#eye} rotates about {@link Camera#look}.
         *
         * Default is ````false````.
         *
         * Deprecated - use {@link CameraControl#navMode} instead.
         *
         * @param {Boolean} value Set ````true```` to enable first-person mode.
         * @deprecated
         */
        set firstPerson(arg: boolean);
        /**
         * Gets whether this ````CameraControl```` is in first-person mode.
         *
         * In "first person" mode (disabled by default) the look position rotates about the eye position. Otherwise,  {@link Camera#eye} rotates about {@link Camera#look}.
         *
         * Default is ````false````.
         *
         * Deprecated - use {@link CameraControl#navMode} instead.
         *
         * @returns {Boolean} Returns ````true```` if first-person mode is enabled.
         * @deprecated
         */
        get firstPerson(): boolean;
        /**
         * Sets whether smart default pivoting is enabled.
         *
         * When ````true````, we'll pivot by default about the 3D position of the mouse/touch pointer on an
         * imaginary sphere that's centered at {@link Camera#eye} and sized to the {@link Scene} boundary.
         *
         * When ````false````, we'll pivot by default about {@link Camera#look}.
         *
         * Default is ````false````.
         *
         * @param {Boolean} enabled Set ````true```` to pivot by default about the selected point on the virtual sphere, or ````false```` to pivot by default about {@link Camera#look}.
         */
        set smartPivot(arg: boolean);
        /**
         * Gets whether smart default pivoting is enabled.
         *
         * When ````true````, we'll pivot by default about the 3D position of the mouse/touch pointer on an
         * imaginary sphere that's centered at {@link Camera#eye} and sized to the {@link Scene} boundary.
         *
         * When ````false````, we'll pivot by default about {@link Camera#look}.
         *
         * Default is ````false````.
         *
         * @returns {Boolean} Returns ````true```` when pivoting by default about the selected point on the virtual sphere, or ````false```` when pivoting by default about {@link Camera#look}.
         */
        get smartPivot(): boolean;
        _destroyHandlers(): void;
        _destroyControllers(): void;
    }
}
