/**
 * Creates {@link DistanceMeasurement}s from mouse and touch input.
 *
 * Belongs to a {@link DistanceMeasurementsPlugin}. Located at {@link DistanceMeasurementsPlugin#control}.
 *
 * Once the DistanceMeasurementControl is activated, the first click on any {@link Entity} begins constructing a {@link DistanceMeasurement}, fixing its origin to that Entity. The next click on any Entity will complete the DistanceMeasurement, fixing its target to that second Entity. The DistanceMeasurementControl will then wait for the next click on any Entity, to begin constructing another DistanceMeasurement, and so on, until deactivated.
 *
 * See {@link DistanceMeasurementsPlugin} for more info.
 */
export class DistanceMeasurementsControl {
    /**
     * @private
     */
    private constructor();
    /**
     * The {@link DistanceMeasurementsPlugin} that owns this DistanceMeasurementsControl.
     * @type {DistanceMeasurementsPlugin}
     */
    plugin: any;
    _active: boolean;
    _state: number;
    _currentDistMeasurement: any;
    _prevDistMeasurement: any;
    _onhoverSurface: any;
    _onPickedSurface: any;
    _onHoverNothing: any;
    _onPickedNothing: any;
    /** Gets if this DistanceMeasurementsControl is currently active, where it is responding to input.
     *
     * @returns {boolean}
     */
    get active(): boolean;
    /**
     * Activates this DistanceMeasurementsControl, ready to respond to input.
     */
    activate(): void;
    _onInputMouseDown: any;
    _onInputMouseUp: any;
    /**
     * Deactivates this DistanceMeasurementsControl, making it unresponsive to input.
     *
     * Destroys any {@link DistanceMeasurement} under construction.
     */
    deactivate(): void;
    /**
     * Resets this DistanceMeasurementsControl.
     *
     * Destroys any {@link DistanceMeasurement} under construction.
     *
     * Does nothing if the DistanceMeasurementsControl is not active.
     */
    reset(): void;
    /**
     * @private
     */
    private destroy;
}
