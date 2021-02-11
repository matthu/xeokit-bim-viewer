/**
 * @desc Abstract base class for curve classes.
 */
export class Curve {
    /**
     * @constructor
     * @param {Component} [owner]  Owner component. When destroyed, the owner will destroy this Curve as well.
     * @param {*} [cfg] Configs
     * @param {String} [cfg.id] Optional ID, unique among all components in the parent {@link Curve}, generated automatically when omitted.
     * @param {Object} [cfg] Configs for this Curve.
     * @param {Number} [cfg.t=0] Current position on this Curve, in range between ````0..1````.
     */
    constructor(owner?: any, cfg?: any);
    /**
     * Sets the progress along this Curve.
     *
     * Automatically clamps to range ````[0..1]````.
     *
     * Default value is ````0````.
     *
     * @param {Number} value The progress value.
     */
    set t(arg: number);
    /**
     * Gets the progress along this Curve.
     *
     * @returns {Number} The progress value.
     */
    get t(): number;
    _t: number;
    /**
     * Gets the tangent on this Curve at position {@link Curve#t}.
     *
     * @returns {{Number[]}} The tangent.
     */
    get tangent(): {};
    /**
     * Gets the length of this Curve.
     *
     * @returns {Number} The Curve length.
     */
    get length(): number;
    /**
     * Returns a normalized tangent vector on this Curve at the given position.
     *
     * @param {Number} t Position to get tangent at.
     * @returns {{Number[]}} Normalized tangent vector
     */
    getTangent(t: number): {};
    getPointAt(u: any): any;
    /**
     * Samples points on this Curve, at the given number of equally-spaced divisions.
     *
     * @param {Number} divisions The number of divisions.
     * @returns {{Array of Array}} Array of sampled 3D points.
     */
    getPoints(divisions: number): {};
    _getLengths(divisions: any): number[];
    needsUpdate: boolean;
    cacheArcLengths: number[];
    _updateArcLengths(): void;
    getUToTMapping(u: any, distance: any): number;
}
