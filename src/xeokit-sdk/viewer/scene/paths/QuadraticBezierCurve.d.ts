import { Curve } from "./Curve";
/**
 * A **QuadraticBezierCurve** is a {@link Curve} along which a 3D position can be animated.
 *
 * * As shown in the diagram below, a QuadraticBezierCurve is defined by three control points
 * * You can sample a {@link QuadraticBezierCurve#point} and a {@link Curve#tangent} vector on a QuadraticBezierCurve for any given value of {@link QuadraticBezierCurve#t} in the range ````[0..1]````
 * * When you set {@link QuadraticBezierCurve#t} on a QuadraticBezierCurve, its {@link QuadraticBezierCurve#point} and {@link Curve#tangent} will update accordingly.
 * * To build a complex path, you can combine an unlimited combination of QuadraticBezierCurves, {@link CubicBezierCurve}s and {@link SplineCurve}s into a {@link Path}.</li>
 * <br>
 * <img style="border:1px solid;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/B%C3%A9zier_2_big.gif/240px-B%C3%A9zier_2_big.gif"/>
 * <br>
 * *[Quadratic Bezier Curve from WikiPedia](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)*
 */
export class QuadraticBezierCurve extends Curve {
    /**
     * @constructor
     * @param {Component} owner Owner component. When destroyed, the owner will destroy this MetallicMaterial as well.
     * @param {*} [cfg] Configuration
     * @param {String} [cfg.id] Optional ID, unique among all components in the parent {{#crossLink "Scene"}}Scene{{/crossLink}}, generated automatically when omitted.
     * @param {Number[]} [cfg.v0=[0,0,0]] The starting point.
     * @param {Number[]} [cfg.v1=[0,0,0]] The middle control point.
     * @param {Number[]} [cfg.v2=[0,0,0]] The end point.
     * @param {Number[]} [cfg.t=0] Current position on this QuadraticBezierCurve, in range between ````0..1````.
     */
    constructor(owner: any, cfg?: any);
    /**
     * Sets the starting point on this QuadraticBezierCurve.
     *
     * Default value is ````[0.0, 0.0, 0.0]````.
     *
     * @param {Number[]} value New starting point.
     */
    set v0(arg: number[]);
    /**
     * Gets the starting point on this QuadraticBezierCurve.
     *
     * Default value is ````[0.0, 0.0, 0.0]````.
     *
     * @returns {Number[]} The starting point.
     */
    get v0(): number[];
    /**
     * Sets the middle control point on this QuadraticBezierCurve.
     *
     * Default value is ````[0.0, 0.0, 0.0]````.
     *
     * @param {Number[]} value New middle control point.
     */
    set v1(arg: number[]);
    /**
     * Gets the middle control point on this QuadraticBezierCurve.
     *
     * Default value is ````[0.0, 0.0, 0.0]````.
     *
     * @returns {Number[]} The middle control point.
     */
    get v1(): number[];
    /**
     * Sets the end point on this QuadraticBezierCurve.
     *
     * Default value is ````[0.0, 0.0, 0.0]````.
     *
     * @param {Number[]} value The new end point.
     */
    set v2(arg: number[]);
    /**
     * Gets the end point on this QuadraticBezierCurve.
     *
     * Default value is ````[0.0, 0.0, 0.0]````.
     *
     * @returns {Number[]} The end point.
     */
    get v2(): number[];
    _v0: any;
    _v1: any;
    _v2: any;
    /**
     Point on this QuadraticBezierCurve at position {@link QuadraticBezierCurve/t}.

     @property point
     @type {{Number[]}}
     */
    get point(): {};
    /**
     * Returns the point on this QuadraticBezierCurve at the given position.
     *
     * @param {Number} t Position to get point at.
     * @returns {Number[]} The point.
     */
    getPoint(t: number): number[];
    getJSON(): {
        v0: any;
        v1: any;
        v2: any;
        t: number;
    };
}
