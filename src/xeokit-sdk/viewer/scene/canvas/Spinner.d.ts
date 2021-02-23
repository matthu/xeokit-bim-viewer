/**
 * @desc Displays a progress animation at the center of its {@link Canvas} while things are loading or otherwise busy.
 *
 *
 * * Located at {@link Canvas#spinner}.
 * * Automatically shown while things are loading, however may also be shown by application code wanting to indicate busyness.
 * * {@link Spinner#processes} holds the count of active processes. As a process starts, it increments {@link Spinner#processes}, then decrements it on completion or failure.
 * * A Spinner is only visible while {@link Spinner#processes} is greater than zero.
 *
 * ````javascript
 * var spinner = viewer.scene.canvas.spinner;
 *
 * // Increment count of busy processes represented by the spinner;
 * // assuming the count was zero, this now shows the spinner
 * spinner.processes++;
 *
 * // Increment the count again, by some other process; spinner already visible, now requires two decrements
 * // before it becomes invisible again
 * spinner.processes++;
 *
 * // Decrement the count; count still greater than zero, so spinner remains visible
 * spinner.process--;
 *
 * // Decrement the count; count now zero, so spinner becomes invisible
 * spinner.process--;
 * ````
 */
export class Spinner {
    /**
     @private
     */
    private constructor();
    /**
     @private
     */
    private get type();
    _canvas: any;
    _element: HTMLElement;
    _isCustom: boolean;
    /**
     * Sets the number of processes this Spinner represents.
     *
     * The Spinner is visible while this property is greater than zero.
     *
     * Increment this property whenever you commence some process during which you want the Spinner to be visible, then decrement it again when the process is complete.
     *
     * Clamps to zero if you attempt to set to to a negative value.
     *
     * Fires a {@link Spinner#processes:event} event on change.

     * Default value is ````0````.
     *
     * @param {Number} value New processes count.
     */
    set processes(arg: number);
    /**
     * Gets the number of processes this Spinner represents.
     *
     * The Spinner is visible while this property is greater than zero.
     *
     * @returns {Number} Current processes count.
     */
    get processes(): number;
    /** @private */
    private _createDefaultSpinner;
    /**
     * @private
     */
    private _injectDefaultCSS;
    /**
     * @private
     */
    private _adjustPosition;
    _processes: any;
    _destroy(): void;
}
