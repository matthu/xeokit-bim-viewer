/**
 * @desc Measures the distance between two 3D points.
 *
 * See {@link DistanceMeasurementsPlugin} for more info.
 */
export class DistanceMeasurement {
    /**
     * @private
     */
    private constructor();
    /**
     * The {@link DistanceMeasurementsPlugin} that owns this DistanceMeasurement.
     * @type {DistanceMeasurementsPlugin}
     */
    plugin: any;
    _container: any;
    _eventSubs: {};
    _originMarker: any;
    _targetMarker: any;
    _originWorld: any;
    _targetWorld: any;
    _wp: Float64Array;
    _vp: Float64Array;
    _pp: Float64Array;
    _cp: Int16Array;
    _xAxisLabelCulled: boolean;
    _yAxisLabelCulled: boolean;
    _zAxisLabelCulled: boolean;
    _originDot: any;
    _targetDot: any;
    _lengthWire: any;
    _xAxisWire: any;
    _yAxisWire: any;
    _zAxisWire: any;
    _lengthLabel: any;
    _xAxisLabel: any;
    _yAxisLabel: any;
    _zAxisLabel: any;
    _wpDirty: boolean;
    _vpDirty: boolean;
    _cpDirty: boolean;
    _visible: boolean;
    _originVisible: boolean;
    _targetVisible: boolean;
    _wireVisible: boolean;
    _axisVisible: boolean;
    _onViewMatrix: any;
    _onProjMatrix: any;
    _onCanvasBoundary: any;
    _onMetricsUnits: any;
    _onMetricsScale: any;
    _onMetricsOrigin: any;
    /**
     * Sets whether this DistanceMeasurement is visible or not.
     *
     * @type Boolean
     */
    set visible(arg: boolean);
    /**
     * Gets whether this DistanceMeasurement is visible or not.
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
     * Sets if the direct point-to-point wire between {@link DistanceMeasurement#origin} and {@link DistanceMeasurement#target} is visible.
     *
     * @type {Boolean}
     */
    set wireVisible(arg: boolean);
    /**
     * Gets if the direct point-to-point wire between {@link DistanceMeasurement#origin} and {@link DistanceMeasurement#target} is visible.
     *
     * @type {Boolean}
     */
    get wireVisible(): boolean;
    /**
     * Sets if the axis-aligned wires between {@link DistanceMeasurement#origin} and {@link DistanceMeasurement#target} are visible.
     *
     * @type {Boolean}
     */
    set axisVisible(arg: boolean);
    /**
     * Gets if the axis-aligned wires between {@link DistanceMeasurement#origin} and {@link DistanceMeasurement#target} are visible.
     *
     * @type {Boolean}
     */
    get axisVisible(): boolean;
    _update(): void;
    _length: number;
    /**
     * Gets the origin {@link Marker}.
     *
     * @type {Marker}
     */
    get origin(): any;
    /**
     * Gets the target {@link Marker}.
     *
     * @type {Marker}
     */
    get target(): any;
    /**
     * Gets the World-space direct point-to-point distance between {@link DistanceMeasurement#origin} and {@link DistanceMeasurement#target}.
     *
     * @type {Number}
     */
    get length(): number;
    /**
     * @private
     */
    private destroy;
}
