/**
 * @desc Defines a sequence of frames along which a {@link CameraPathAnimation} can animate a {@link Camera}.
 *
 * See {@link CameraPathAnimation} for usage.
 */
export class CameraPath {
    /**
     * @constructor
     * @param {Component} [owner]  Owner component. When destroyed, the owner will destroy this CameraPath as well.
     * @param [cfg] {*} Configuration
     * @param {String} [cfg.id]  Optional ID, unique among all components in the parent {@link Scene}, generated automatically when omitted.
     * @param {{t:Number, eye:Object, look:Object, up: Object}[]} [cfg.frames] Initial sequence of frames.
     */
    constructor(owner?: any, cfg?: any);
    /**
     * Returns "CameraPath".
     *
     * @private
     *
     * @returns {string} "CameraPath"
     */
    private get type();
    _frames: any[];
    _eyeCurve: SplineCurve;
    _lookCurve: SplineCurve;
    _upCurve: SplineCurve;
    /**
     * Gets the camera frames in this CameraPath.
     *
     * @returns {{t:Number, eye:Object, look:Object, up: Object}[]} The frames on this CameraPath.
     */
    get frames(): {
        t: number;
        eye: any;
        look: any;
        up: any;
    }[];
    /**
     * Gets the {@link SplineCurve} along which {@link Camera#eye} travels.
     * @returns {SplineCurve} The SplineCurve for {@link Camera#eye}.
     */
    get eyeCurve(): SplineCurve;
    /**
     * Gets the {@link SplineCurve} along which {@link Camera#look} travels.
     * @returns {SplineCurve} The SplineCurve for {@link Camera#look}.
     */
    get lookCurve(): SplineCurve;
    /**
     * Gets the {@link SplineCurve} along which {@link Camera#up} travels.
     * @returns {SplineCurve} The SplineCurve for {@link Camera#up}.
     */
    get upCurve(): SplineCurve;
    /**
     * Adds a frame to this CameraPath, given as the current position of the {@link Camera}.
     *
     * @param {Number} t Time instant for the new frame.
     */
    saveFrame(t: number): void;
    /**
     * Adds a frame to this CameraPath, specified as values for eye, look and up vectors at a given time instant.
     *
     * @param {Number} t Time instant for the new frame.
     * @param {Number[]} eye A three-element vector specifying the eye position for the new frame.
     * @param {Number[]} look A three-element vector specifying the look position for the new frame.
     * @param {Number[]} up A three-element vector specifying the up vector for the new frame.
     */
    addFrame(t: number, eye: number[], look: number[], up: number[]): void;
    /**
     * Adds multiple frames to this CameraPath, each frame specified as a set of values for eye, look and up vectors at a given time instant.
     *
     * @param {{t:Number, eye:Object, look:Object, up: Object}[]} frames Frames to add to this CameraPath.
     */
    addFrames(frames: {
        t: number;
        eye: any;
        look: any;
        up: any;
    }[]): void;
    /**
     * Sets the position of the {@link Camera} to a position interpolated within this CameraPath at the given time instant.
     *
     * @param {Number} t Time instant.
     */
    loadFrame(t: number): void;
    /**
     * Gets eye, look and up vectors on this CameraPath at a given instant.
     *
     * @param {Number} t Time instant.
     * @param {Number[]} eye The eye position to update.
     * @param {Number[]} look The look position to update.
     * @param {Number[]} up The up vector to update.
     */
    sampleFrame(t: number, eye: number[], look: number[], up: number[]): void;
    /**
     * Given a total duration (in seconds) for this CameraPath, recomputes the time instant at each frame so that,
     * when animated by {@link CameraPathAnimation}, the {@link Camera} will move along the path at a constant rate.
     *
     * @param {Number} duration The total duration for this CameraPath.
     */
    smoothFrameTimes(duration: number): void;
    /**
     * Removes all frames from this CameraPath.
     */
    clearFrames(): void;
}
import { SplineCurve } from "@xeokit/xeokit-sdk/src/viewer/scene/paths/SplineCurve";
