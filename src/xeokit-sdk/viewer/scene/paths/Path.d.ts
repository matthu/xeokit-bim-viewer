import { Curve } from "./Curve";
/**
 * @desc A complex curved path constructed from various {@link Curve} subtypes.
 *
 * * A Path can be constructed from these {@link Curve} subtypes: {@link SplineCurve}, {@link CubicBezierCurve} and {@link QuadraticBezierCurve}.
 * * You can sample a {@link Path#point} and a {@link Curve#tangent} vector on a Path for any given value of {@link Path#t} in the range ````[0..1]````.
 * * When you set {@link Path#t} on a Path, its {@link Path#point} and {@link Curve#tangent} properties will update accordingly.
 */
export class Path extends Curve {
    /**
     * @constructor
     * @param {Component} [owner]  Owner component. When destroyed, the owner will destroy this SectionPlane as well.
     * @param {*} [cfg]  Path configuration
     * @param {String} [cfg.id]  Optional ID, unique among all components in the parent {@link Scene}, generated automatically when omitted.
     * @param {String []} [cfg.paths=[]] IDs or instances of {{#crossLink "path"}}{{/crossLink}} subtypes to add to this Path.
     * @param {Number} [cfg.t=0] Current position on this Path, in range between 0..1.
     */
    constructor(owner?: any, cfg?: any);
    _cachedLengths: any[];
    _dirty: boolean;
    _curves: any[];
    _dirtySubs: any[];
    _destroyedSubs: any[];
    /**
     * Sets the {@link Curve}s in this Path.
     *
     * Default value is ````[]````.
     *
     * @param {{Array of Spline, Path, QuadraticBezierCurve or CubicBezierCurve}} value.
     */
    set curves(arg: {});
    /**
     * Gets the {@link Curve}s in this Path.
     *
     * @returns {{Array of Spline, Path, QuadraticBezierCurve or CubicBezierCurve}} the {@link Curve}s in this path.
     */
    get curves(): {};
    /**
     * Adds a {@link Curve} to this Path.
     *
     * @param {Curve} curve The {@link Curve} to add.
     */
    addCurve(curve: Curve): void;
    /**
     * Gets point on this Path corresponding to the current value of {@link Path#t}.
     *
     * @returns {{Number[]}} The point.
     */
    get point(): {};
    /**
     * Gets a point on this Path corresponding to the given progress position.
     *
     * @param {Number} t Indicates point of progress along this curve, in the range [0..1].
     * @returns {{Number[]}}
     */
    getPoint(t: number): {};
    _getCurveLengths(): any[];
    _getJSON(): {
        curves: any[];
        t: number;
    };
    /**
     * Destroys this Path.
     */
    destroy(): void;
}
