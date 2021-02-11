/**
 * @desc Measures the angle indicated by three 3D points.
 *
 * See {@link AngleMeasurementsPlugin} for more info.
 */
export class AngleMeasurement {
    /**
     * @private
     */
    private constructor();
    /**
     * The {@link AngleMeasurementsPlugin} that owns this AngleMeasurement.
     * @type {AngleMeasurementsPlugin}
     */
    plugin: any;
    _container: any;
    _originMarker: any;
    _cornerMarker: any;
    _targetMarker: any;
    _originWorld: any;
    _cornerWorld: any;
    _targetWorld: any;
    _wp: Float64Array;
    _vp: Float64Array;
    _pp: Float64Array;
    _cp: Int16Array;
    _originDot: any;
    _cornerDot: any;
    _targetDot: any;
    _originWire: any;
    _targetWire: any;
    _angleLabel: any;
    _wpDirty: boolean;
    _vpDirty: boolean;
    _cpDirty: boolean;
    _visible: boolean;
    _originVisible: boolean;
    _cornerVisible: boolean;
    _targetVisible: boolean;
    _originWireVisible: boolean;
    _targetWireVisible: boolean;
    _angleVisible: boolean;
    _onViewMatrix: any;
    _onProjMatrix: any;
    _onCanvasBoundary: any;
    /**
     * Sets whether this AngleMeasurement is visible or not.
     *
     * @type Boolean
     */
    set visible(arg: boolean);
    /**
     * Gets whether this AngleMeasurement is visible or not.
     *
     * @type Boolean
     */
    get visible(): boolean;
    /**
     * Sets if the origin {@link Marker} is visible.
     *
     * @type {Boolean}
     */
    set originVisible(arg: boolean);
    /**
     * Gets if the origin {@link Marker} is visible.
     *
     * @type {Boolean}
     */
    get originVisible(): boolean;
    /**
     * Sets if the corner {@link Marker} is visible.
     *
     * @type {Boolean}
     */
    set cornerVisible(arg: boolean);
    /**
     * Gets if the corner {@link Marker} is visible.
     *
     * @type {Boolean}
     */
    get cornerVisible(): boolean;
    /**
     * Sets if the target {@link Marker} is visible.
     *
     * @type {Boolean}
     */
    set targetVisible(arg: boolean);
    /**
     * Gets if the target {@link Marker} is visible.
     *
     * @type {Boolean}
     */
    get targetVisible(): boolean;
    /**
     * Sets if the wire between the origin and the corner is visible.
     *
     * @type {Boolean}
     */
    set originWireVisible(arg: boolean);
    /**
     * Gets if the wire between the origin and the corner is visible.
     *
     * @type {Boolean}
     */
    get originWireVisible(): boolean;
    /**
     * Sets if the wire between the target and the corner is visible.
     *
     * @type {Boolean}
     */
    set targetWireVisible(arg: boolean);
    /**
     * Gets if the wire between the target and the corner is visible.
     *
     * @type {Boolean}
     */
    get targetWireVisible(): boolean;
    /**
     * Sets if the angle label is visible.
     *
     * @type {Boolean}
     */
    set angleVisible(arg: boolean);
    /**
     * Gets if the angle label is visible.
     *
     * @type {Boolean}
     */
    get angleVisible(): boolean;
    _update(): void;
    _angle: number;
    /**
     * Gets the origin {@link Marker}.
     *
     * @type {Marker}
     */
    get origin(): any;
    /**
     * Gets the corner {@link Marker}.
     *
     * @type {Marker}
     */
    get corner(): any;
    /**
     * Gets the target {@link Marker}.
     *
     * @type {Marker}
     */
    get target(): any;
    /**
     * Gets the angle between two connected 3D line segments, given
     * as three positions on the surface(s) of one or more {@link Entity}s.
     *
     * @type {Number}
     */
    get angle(): number;
    /**
     * @private
     */
    private destroy;
}
