/**
 * @desc A {@link Curve} along which a 3D position can be animated.
 *
 * * As shown in the diagram below, a SplineCurve is defined by three or more control points.
 * * You can sample a {@link SplineCurve#point} and a {@link Curve#tangent} vector on a SplineCurve for any given value of {@link SplineCurve#t} in the range ````[0..1]````.
 * * When you set {@link SplineCurve#t} on a SplineCurve, its {@link SplineCurve#point} and {@link Curve#tangent} will update accordingly.
 * * To build a complex path, you can combine an unlimited combination of SplineCurves, {@link CubicBezierCurve} and {@link QuadraticBezierCurve} into a {@link Path}.
 * <br>
 * <img style="border:1px solid; background: white;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Quadratic_spline_six_segments.svg/200px-Quadratic_spline_six_segments.svg.png"/><br>
 *
 * * <a href="https://en.wikipedia.org/wiki/Spline_(mathematics)">Spline Curve from Wikipedia</a>*
 */
export class SplineCurve extends Curve {
    /**
     * @constructor
     * @param {Component} [owner]  Owner component. When destroyed, the owner will destroy this SplineCurve as well.
     * @param {*} [cfg] Configs
     * @param {String} [cfg.id] Optional ID, unique among all components in the parent {@link Scene}, generated automatically when omitted.
     * @param {Array} [cfg.points=[]] Control points on this SplineCurve.
     * @param {Number} [cfg.t=0] Current position on this SplineCurve, in range between 0..1.
     * @param {Number} [cfg.t=0] Current position on this CubicBezierCurve, in range between 0..1.
     */
    constructor(owner?: any, cfg?: any);
    /**
     * Sets the control points on this SplineCurve.
     *
     * Default value is ````[]````.
     *
     * @param {Number[]} value New control points.
     */
    set points(arg: number[]);
    /**
     * Gets the control points on this SplineCurve.
     *
     * Default value is ````[]````.
     *
     * @returns {Number[]} The control points.
     */
    get points(): number[];
    _points: number[];
    /**
     * Gets the point on this SplineCurve at position {@link SplineCurve#t}.
     *
     * @returns {Number[]} The point at {@link SplineCurve#t}.
     */
    get point(): number[];
    /**
     * Returns point on this SplineCurve at the given position.
     *
     * @param {Number} t Position to get point at.
     * @returns {Number[]} Point at the given position.
     */
    getPoint(t: number): number[];
    getJSON(): {
        points: any;
        t: number;
    };
}
import { Curve } from "@xeokit/xeokit-sdk/src/viewer/scene/paths/Curve";
