import { Curve } from "./Curve";
/**
 * @desc A {@link Curve} along which a 3D position can be animated.
 *
 * * As shown in the diagram below, a CubicBezierCurve is defined by four control points.
 * * You can sample a {@link CubicBezierCurve#point} and a {@link CubicBezierCurve#tangent} vector on a CubicBezierCurve for any given value of {@link CubicBezierCurve#t} in the range [0..1].
 * * When you set {@link CubicBezierCurve#t} on a CubicBezierCurve, its {@link CubicBezierCurve#point} and {@link CubicBezierCurve#tangent} properties will update accordingly.
 * * To build a complex path, you can combine an unlimited combination of CubicBezierCurves, {@link QuadraticBezierCurve}s and {@link SplineCurve}s into a {@link Path}.
 *
 * <br>
 * <img style="border:1px solid;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/B%C3%A9zier_3_big.gif/240px-B%C3%A9zier_3_big.gif"/>
 * <br>
 * [Cubic Bezier Curve from WikiPedia](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)
 */
export class CubicBezierCurve extends Curve {
    /**
     * @constructor
     * @param {Component} [owner]  Owner component. When destroyed, the owner will destroy this CubicBezierCurve as well.
     * @param {*} [cfg] Configs
     * @param {String} [cfg.id] Optional ID, unique among all components in the parent {@link Scene}, generated automatically when omitted.
     * @param {Number[]} [cfg.v0=[0,0,0]] The starting point.
     * @param {Number[]} [cfg.v1=[0,0,0]] The first control point.
     * @param {Number[]} [cfg.v2=[0,0,0]] The middle control point.
     * @param {Number[]} [cfg.v3=[0,0,0]] The ending point.
     * @param {Number} [cfg.t=0] Current position on this CubicBezierCurve, in range between 0..1.
     */
    constructor(owner?: any, cfg?: any);
    /**
     * Sets the starting point on this CubicBezierCurve.
     *
     * Default value is ````[0.0, 0.0, 0.0]````
     *
     * @param {Number[]} value The starting point.
     */
    set v0(arg: number[]);
    /**
     * Gets the starting point on this CubicBezierCurve.
     *
     * Default value is ````[0.0, 0.0, 0.0]````
     *
     * @returns {Number[]} The starting point.
     */
    get v0(): number[];
    /**
     * Sets the first control point on this CubicBezierCurve.
     *
     * Default value is ````[0.0, 0.0, 0.0]````
     *
     * @param {Number[]} value The first control point.
     */
    set v1(arg: number[]);
    /**
     * Gets the first control point on this CubicBezierCurve.
     *
     * Fires a {@link CubicBezierCurve#v1:event} event on change.
     *
     * Default value is ````[0.0, 0.0, 0.0]````
     *
     * @returns {Number[]} The first control point.
     */
    get v1(): number[];
    /**
     * Sets the second control point on this CubicBezierCurve.
     *
     * Default value is ````[0.0, 0.0, 0.0]````
     *
     * @param {Number[]} value The second control point.
     */
    set v2(arg: number[]);
    /**
     * Gets the second control point on this CubicBezierCurve.
     *
     * Default value is ````[0.0, 0.0, 0.0]````
     *
     * @returns {Number[]} The second control point.
     */
    get v2(): number[];
    /**
     * Sets the end point on this CubicBezierCurve.
     *
     * Fires a {@link CubicBezierCurve#v3:event} event on change.
     *
     * Default value is ````[0.0, 0.0, 0.0]````
     *
     * @param {Number[]} value The end point.
     */
    set v3(arg: number[]);
    /**
     * Gets the end point on this CubicBezierCurve.
     *
     * Fires a {@link CubicBezierCurve#v3:event} event on change.
     *
     * Default value is ````[0.0, 0.0, 0.0]````
     *
     * @returns {Number[]} The end point.
     */
    get v3(): number[];
    _v0: any;
    _v1: any;
    _v2: any;
    _v3: any;
    /**
     * Returns point on this CubicBezierCurve at the given position.
     *
     * @param {Number} t Position to get point at.
     *
     * @returns {{Number[]}} The point at the given position.
     */
    get point(): {};
    /**
     * Returns point on this CubicBezierCurve at the given position.
     *
     * @param {Number} t Position to get point at.
     *
     * @returns {{Number[]}} The point at the given position.
     */
    getPoint(t: number): {};
    getJSON(): {
        v0: any;
        v1: any;
        v2: any;
        v3: any;
        t: number;
    };
}
