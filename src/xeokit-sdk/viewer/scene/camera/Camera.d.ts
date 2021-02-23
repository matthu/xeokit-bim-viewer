import { RenderState } from "../webgl/RenderState.js";
import { Perspective } from "./Perspective.js";
import { Ortho } from "./Ortho.js";
import { Frustum } from "./Frustum.js";
import { CustomProjection } from "./CustomProjection.js";
import { Component } from "../Component.js";
/**
 * @desc Manages viewing and projection transforms for its {@link Scene}.
 *
 * * One Camera per {@link Scene}
 * * Scene is located at {@link Viewer#scene} and Camera is located at {@link Scene#camera}
 * * Controls viewing and projection transforms
 * * Has methods to pan, zoom and orbit (or first-person rotation)
 * * Dynamically configurable World-space axis
 * * Has {@link Perspective}, {@link Ortho} and {@link Frustum} and {@link CustomProjection}, which you can dynamically switch it between
 * * Switchable gimbal lock
 * * Can be "flown" to look at targets using a {@link CameraFlightAnimation}
 * * Can be animated along a path using a {@link CameraPathAnimation}
 *
 * ## Getting the Camera
 *
 * There is exactly one Camera per {@link Scene}:
 *
 * ````javascript
 * import {Viewer} from "viewer/Viewer.js";
 *
 * var camera = viewer.scene.camera;
 *
 * ````
 *
 * ## Setting the Camera Position
 *
 * Get and set the Camera's absolute position via {@link Camera#eye}, {@link Camera#look} and {@link Camera#up}:
 *
 * ````javascript
 * camera.eye = [-10,0,0];
 * camera.look = [-10,0,0];
 * camera.up = [0,1,0];
 * ````
 *
 * ## Camera View and Projection Matrices
 *
 * The Camera's view matrix transforms coordinates from World-space to View-space.
 *
 * Getting the view matrix:
 *
 * ````javascript
 * var viewMatrix = camera.viewMatrix;
 * var viewNormalMatrix = camera.normalMatrix;
 * ````
 *
 * The Camera's view normal matrix transforms normal vectors from World-space to View-space.
 *
 * Getting the view normal matrix:
 *
 * ````javascript
 * var viewNormalMatrix = camera.normalMatrix;
 * ````
 *
 * The Camera fires a ````"viewMatrix"```` event whenever the {@link Camera#viewMatrix} and {@link Camera#viewNormalMatrix} updates.
 *
 * Listen for view matrix updates:
 *
 * ````javascript
 * camera.on("viewMatrix", function(matrix) { ... });
 * ````
 *
 * ## Rotating the Camera
 *
 * Orbiting the {@link Camera#look} position:
 *
 * ````javascript
 * camera.orbitYaw(20.0);
 * camera.orbitPitch(10.0);
 * ````
 *
 * First-person rotation, rotates {@link Camera#look} and {@link Camera#up} about {@link Camera#eye}:
 *
 * ````javascript
 * camera.yaw(5.0);
 * camera.pitch(-10.0);
 * ````
 *
 * ## Panning the Camera
 *
 * Panning along the Camera's local axis (ie. left/right, up/down, forward/backward):
 *
 * ````javascript
 * camera.pan([-20, 0, 10]);
 * ````
 *
 * ## Zooming the Camera
 *
 * Zoom to vary distance between {@link Camera#eye} and {@link Camera#look}:
 *
 * ````javascript
 * camera.zoom(-5); // Move five units closer
 * ````
 *
 * Get the current distance between {@link Camera#eye} and {@link Camera#look}:
 *
 * ````javascript
 * var distance = camera.eyeLookDist;
 * ````
 *
 * ## Projection
 *
 * The Camera has a Component to manage each projection type, which are: {@link Perspective}, {@link Ortho}
 * and {@link Frustum} and {@link CustomProjection}.
 *
 * You can configure those components at any time, regardless of which is currently active:
 *
 * The Camera has a {@link Perspective} to manage perspective
 * ````javascript
 *
 * // Set some properties on Perspective
 * camera.perspective.near = 0.4;
 * camera.perspective.fov = 45;
 *
 * // Set some properties on Ortho
 * camera.ortho.near = 0.8;
 * camera.ortho.far = 1000;
 *
 * // Set some properties on Frustum
 * camera.frustum.left = -1.0;
 * camera.frustum.right = 1.0;
 * camera.frustum.far = 1000.0;
 *
 * // Set the matrix property on CustomProjection
 * camera.customProjection.matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
 *
 * // Switch between the projection types
 * camera.projection = "perspective"; // Switch to perspective
 * camera.projection = "frustum"; // Switch to frustum
 * camera.projection = "ortho"; // Switch to ortho
 * camera.projection = "customProjection"; // Switch to custom
 * ````
 *
 * Camera provides the projection matrix for the currently active projection in {@link Camera#projMatrix}.
 *
 * Get the projection matrix:
 *
 * ````javascript
 * var projMatrix = camera.projMatrix;
 * ````
 *
 * Listen for projection matrix updates:
 *
 * ````javascript
 * camera.on("projMatrix", function(matrix) { ... });
 * ````
 *
 * ## Configuring World up direction
 *
 * We can dynamically configure the directions of the World-space coordinate system.
 *
 * Setting the +Y axis as World "up", +X as right and -Z as forwards (convention in some modeling software):
 *
 * ````javascript
 * camera.worldAxis = [
 *     1, 0, 0,    // Right
 *     0, 1, 0,    // Up
 *     0, 0,-1     // Forward
 * ];
 * ````
 *
 * Setting the +Z axis as World "up", +X as right and -Y as "up" (convention in most CAD and BIM viewers):
 *
 * ````javascript
 * camera.worldAxis = [
 *     1, 0, 0, // Right
 *     0, 0, 1, // Up
 *     0,-1, 0  // Forward
 * ];
 * ````
 *
 * The Camera has read-only convenience properties that provide each axis individually:
 *
 * ````javascript
 * var worldRight = camera.worldRight;
 * var worldForward = camera.worldForward;
 * var worldUp = camera.worldUp;
 * ````
 *
 * ### Gimbal locking
 *
 * By default, the Camera locks yaw rotation to pivot about the World-space "up" axis. We can dynamically lock and unlock that at any time:
 *
 * ````javascript
 * camera.gimbalLock = false; // Yaw rotation now happens about Camera's local Y-axis
 * camera.gimbalLock = true; // Yaw rotation now happens about World's "up" axis
 * ````
 *
 * See: <a href="https://en.wikipedia.org/wiki/Gimbal_lock">https://en.wikipedia.org/wiki/Gimbal_lock</a>
 */
export class Camera extends Component {
    /**
     * @constructor
     * @private
     */
    private constructor();
    _state: RenderState;
    _perspective: any;
    _ortho: any;
    _frustum: any;
    _customProjection: any;
    _project: any;
    _eye: any;
    _look: any;
    _up: any;
    _worldUp: any;
    _worldRight: any;
    _worldForward: any;
    /**
     * Sets an optional matrix to premultiply into {@link Camera#matrix} matrix.
     *
     * This is intended to be used for stereo rendering with WebVR etc.
     *
     * @param {Number[]} matrix The matrix.
     */
    set deviceMatrix(arg: number[]);
    /**
     * Gets an optional matrix to premultiply into {@link Camera#matrix} matrix.
     *
     * @returns {Number[]} The matrix.
     */
    get deviceMatrix(): number[];
    /**
     * Sets the position of the Camera's eye.
     *
     * Default value is ````[0,0,10]````.
     *
     * @emits "eye" event on change, with the value of this property.
     * @type {Number[]} New eye position.
     */
    set eye(arg: number[]);
    /**
     * Gets the position of the Camera's eye.
     *
     * Default vale is ````[0,0,10]````.
     *
     * @type {Number[]} New eye position.
     */
    get eye(): number[];
    /**
     * Sets the position of this Camera's point-of-interest.
     *
     * Default value is ````[0,0,0]````.
     *
     * @emits "look" event on change, with the value of this property.
     *
     * @param {Number[]} look Camera look position.
     */
    set look(arg: number[]);
    /**
     * Gets the position of this Camera's point-of-interest.
     *
     * Default value is ````[0,0,0]````.
     *
     * @returns {Number[]} Camera look position.
     */
    get look(): number[];
    /**
     * Sets the direction of this Camera's {@link Camera#up} vector.
     *
     * @emits "up" event on change, with the value of this property.
     *
     * @param {Number[]} up Direction of "up".
     */
    set up(arg: number[]);
    /**
     * Gets the direction of this Camera's {@link Camera#up} vector.
     *
     * @returns {Number[]} Direction of "up".
     */
    get up(): number[];
    /**
     * Sets the up, right and forward axis of the World coordinate system.
     *
     * Has format: ````[rightX, rightY, rightZ, upX, upY, upZ, forwardX, forwardY, forwardZ]````
     *
     * Default axis is ````[1, 0, 0, 0, 1, 0, 0, 0, 1]````
     *
     * @param {Number[]} axis The new Wworld coordinate axis.
     */
    set worldAxis(arg: number[]);
    /**
     * Gets the up, right and forward axis of the World coordinate system.
     *
     * Has format: ````[rightX, rightY, rightZ, upX, upY, upZ, forwardX, forwardY, forwardZ]````
     *
     * Default axis is ````[1, 0, 0, 0, 1, 0, 0, 0, 1]````
     *
     * @returns {Number[]} The current World coordinate axis.
     */
    get worldAxis(): number[];
    /**
     * Sets whether to lock yaw rotation to pivot about the World-space "up" axis.
     *
     * Fires a {@link Camera#gimbalLock:event} event on change.
     *
     * @params {Boolean} gimbalLock Set true to lock gimbal.
     */
    set gimbalLock(arg: boolean);
    /**
     * Gets whether to lock yaw rotation to pivot about the World-space "up" axis.
     *
     * @returns {Boolean} Returns ````true```` if gimbal is locked.
     */
    get gimbalLock(): boolean;
    /**
     * Sets whether to prevent camera from being pitched upside down.
     *
     * The camera is upside down when the angle between {@link Camera#up} and {@link Camera#worldUp} is less than one degree.
     *
     * Fires a {@link Camera#constrainPitch:event} event on change.
     *
     * Default value is ````false````.
     *
     * @param {Boolean} value Set ````true```` to contrain pitch rotation.
     */
    set constrainPitch(arg: boolean);
    /**
     * Sets the active projection type.
     *
     * Accepted values are ````"perspective"````, ````"ortho"````, ````"frustum"```` and ````"customProjection"````.
     *
     * Default value is ````"perspective"````.
     *
     * @param {String} value Identifies the active projection type.
     */
    set projection(arg: string);
    /**
     * Gets the active projection type.
     *
     * Possible values are ````"perspective"````, ````"ortho"````, ````"frustum"```` and ````"customProjection"````.
     *
     * Default value is ````"perspective"````.
     *
     * @returns {String} Identifies the active projection type.
     */
    get projection(): string;
    _update(): void;
    /**
     * Rotates {@link Camera#eye} about {@link Camera#look}, around the {@link Camera#up} vector
     *
     * @param {Number} angleInc Angle of rotation in degrees
     */
    orbitYaw(angleInc: number): void;
    /**
     * Rotates {@link Camera#eye} about {@link Camera#look} around the right axis (orthogonal to {@link Camera#up} and "look").
     *
     * @param {Number} angleInc Angle of rotation in degrees
     */
    orbitPitch(angleInc: number): void;
    /**
     * Rotates {@link Camera#look} about {@link Camera#eye}, around the {@link Camera#up} vector.
     *
     * @param {Number} angleInc Angle of rotation in degrees
     */
    yaw(angleInc: number): void;
    /**
     * Rotates {@link Camera#look} about {@link Camera#eye}, around the right axis (orthogonal to {@link Camera#up} and "look").

    * @param {Number} angleInc Angle of rotation in degrees
    */
    pitch(angleInc: number): void;
    /**
     * Pans the Camera along its local X, Y and Z axis.
     *
     * @param pan The pan vector
     */
    pan(pan: any): void;
    /**
     * Increments/decrements the Camera's zoom factor, which is the distance between {@link Camera#eye} and {@link Camera#look}.
     *
     * @param {Number} delta Zoom factor increment.
     */
    zoom(delta: number): void;
    _worldAxis: any;
    /**
     * Gets the direction of World-space "up".
     *
     * This is set by {@link Camera#worldAxis}.
     *
     * Default value is ````[0,1,0]````.
     *
     * @returns {Number[]} The "up" vector.
     */
    get worldUp(): number[];
    /**
     * Gets if the World-space X-axis is "up".
     * @returns {boolean}
     */
    get xUp(): boolean;
    /**
     * Gets if the World-space Y-axis is "up".
     * @returns {boolean}
     */
    get yUp(): boolean;
    /**
     * Gets if the World-space Z-axis is "up".
     * @returns {boolean}
     */
    get zUp(): boolean;
    /**
     * Gets the direction of World-space "right".
     *
     * This is set by {@link Camera#worldAxis}.
     *
     * Default value is ````[1,0,0]````.
     *
     * @returns {Number[]} The "up" vector.
     */
    get worldRight(): number[];
    /**
     * Gets the direction of World-space "forwards".
     *
     * This is set by {@link Camera#worldAxis}.
     *
     * Default value is ````[0,0,1]````.
     *
     * @returns {Number[]} The "up" vector.
     */
    get worldForward(): number[];
    _gimbalLock: boolean;
    _constrainPitch: boolean;
    /**
     * Gets whether to prevent camera from being pitched upside down.
     *
     * The camera is upside down when the angle between {@link Camera#up} and {@link Camera#worldUp} is less than one degree.
     *
     * Default value is ````false````.
     *
     * @returns {Boolean} ````true```` if pitch rotation is currently constrained.
     get constrainPitch() {
        return this._constrainPitch;
    }

    /**
     * Gets distance from {@link Camera#look} to {@link Camera#eye}.
     *
     * @returns {Number} The distance.
     */
    get eyeLookDist(): boolean;
    /**
     * Gets the Camera's viewing transformation matrix.
     *
     * Fires a {@link Camera#matrix:event} event on change.
     *
     * @returns {Number[]} The viewing transform matrix.
     */
    get matrix(): number[];
    /**
     * Gets the Camera's viewing transformation matrix.
     *
     * Fires a {@link Camera#matrix:event} event on change.
     *
     * @returns {Number[]} The viewing transform matrix.
     */
    get viewMatrix(): number[];
    /**
     * The Camera's viewing normal transformation matrix.
     *
     * Fires a {@link Camera#matrix:event} event on change.
     *
     * @returns {Number[]} The viewing normal transform matrix.
     */
    get normalMatrix(): number[];
    /**
     * The Camera's viewing normal transformation matrix.
     *
     * Fires a {@link Camera#matrix:event} event on change.
     *
     * @returns {Number[]} The viewing normal transform matrix.
     */
    get viewNormalMatrix(): number[];
    /**
     * Gets the inverse of the Camera's viewing transform matrix.
     *
     * This has the same value as {@link Camera#normalMatrix}.
     *
     * @returns {Number[]} The inverse viewing transform matrix.
     */
    get inverseViewMatrix(): number[];
    /**
     * Gets the Camera's projection transformation projMatrix.
     *
     * Fires a {@link Camera#projMatrix:event} event on change.
     *
     * @returns {Number[]} The projection matrix.
     */
    get projMatrix(): number[];
    /**
     * Gets the Camera's perspective projection.
     *
     * The Camera uses this while {@link Camera#projection} equals ````perspective````.
     *
     * @returns {Perspective} The Perspective component.
     */
    get perspective(): Perspective;
    /**
     * Gets the Camera's orthographic projection.
     *
     * The Camera uses this while {@link Camera#projection} equals ````ortho````.
     *
     * @returns {Ortho} The Ortho component.
     */
    get ortho(): Ortho;
    /**
     * Gets the Camera's frustum projection.
     *
     * The Camera uses this while {@link Camera#projection} equals ````frustum````.
     *
     * @returns {Frustum} The Ortho component.
     */
    get frustum(): Frustum;
    /**
     * Gets the Camera's custom projection.
     *
     * This is used while {@link Camera#projection} equals "customProjection".
     *
     * @returns {CustomProjection} The custom projection.
     */
    get customProjection(): CustomProjection;
    _projectionType: any;
    /**
     * Gets the currently active projection for this Camera.
     *
     * The currently active project is selected with {@link Camera#projection}.
     *
     * @returns {Perspective|Ortho|Frustum|CustomProjection} The currently active projection is active.
     */
    get project(): Perspective | Ortho | Frustum | CustomProjection;
    /**
     * Destroys this Camera.
     */
    destroy(): void;
}
