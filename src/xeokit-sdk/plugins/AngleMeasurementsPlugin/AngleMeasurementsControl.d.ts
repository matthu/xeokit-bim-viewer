/**
 * Creates {@link AngleMeasurement}s from mouse and touch input.
 *
 * Belongs to a {@link AngleMeasurementsPlugin}. Located at {@link AngleMeasurementsPlugin#control}.
 *
 * Once the AngleMeasurementControl is activated, the first click on any {@link Entity} begins constructing a {@link AngleMeasurement}, fixing its origin to that Entity. The next click on any Entity will complete the AngleMeasurement, fixing its target to that second Entity. The AngleMeasurementControl will then wait for the next click on any Entity, to begin constructing another AngleMeasurement, and so on, until deactivated.
 *
 * See {@link AngleMeasurementsPlugin} for more info.
 */
export class AngleMeasurementsControl {
    /**
     * @private
     */
    private constructor();
    /**
     * The {@link AngleMeasurementsPlugin} that owns this AngleMeasurementsControl.
     * @type {AngleMeasurementsPlugin}
     */
    plugin: any;
    _active: boolean;
    _state: number;
    _currentAngleMeasurement: any;
    _previousAngleMeasurement: any;
    _onhoverSurface: any;
    _onPickedSurface: any;
    _onHoverNothing: any;
    _onPickedNothing: any;
    /** Gets if this AngleMeasurementsControl is currently active, where it is responding to input.
     *
     * @returns {boolean}
     */
    get active(): boolean;
    /**
     * Activates this AngleMeasurementsControl, ready to respond to input.
     */
    activate(): void;
    _onInputMouseDown: any;
    _onInputMouseUp: any;
    /**
     * Deactivates this AngleMeasurementsControl, making it unresponsive to input.
     *
     * Destroys any {@link AngleMeasurement} under construction.
     */
    deactivate(): void;
    /**
     * Resets this AngleMeasurementsControl.
     *
     * Destroys any {@link AngleMeasurement} under construction.
     *
     * Does nothing if the AngleMeasurementsControl is not active.
     */
    reset(): void;
    /**
     * @private
     */
    private destroy;
}
