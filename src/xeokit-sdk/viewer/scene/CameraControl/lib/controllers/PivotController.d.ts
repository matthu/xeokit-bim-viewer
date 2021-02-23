/** @private */
export class PivotController {
    /**
     * @private
     */
    private constructor();
    _scene: any;
    _configs: any;
    _pivotWorldPos: any;
    _cameraOffset: any;
    _azimuth: number;
    _polar: number;
    _radius: number;
    _pivotPosSet: boolean;
    _pivoting: boolean;
    _shown: boolean;
    _pivotViewPos: any;
    _pivotProjPos: any;
    _pivotCanvasPos: any;
    _cameraDirty: boolean;
    _onViewMatrix: any;
    _onProjMatrix: any;
    _onTick: any;
    updatePivotElement(): void;
    /**
     * Sets the HTML DOM element that will represent the pivot position.
     *
     * @param pivotElement
     */
    setPivotElement(pivotElement: any): void;
    _pivotElement: any;
    /**
     * Begins pivoting.
     */
    startPivot(): boolean;
    _cameraLookingDownwards(): boolean;
    /**
     * Returns true if we are currently pivoting.
     *
     * @returns {boolean}
     */
    getPivoting(): boolean;
    /**
     * Sets a 3D World-space position to pivot about.
     *
     * @param {Number[]} worldPos The new World-space pivot position.
     */
    setPivotPos(worldPos: number[]): void;
    /**
     * Sets the pivot position to the 3D projection of the given 2D canvas coordinates on a sphere centered
     * at the viewpoint. The radius of the sphere is configured via {@link CameraControl#smartPivot}.
     *
     * @param canvasPos
     */
    setCanvasPivotPos(canvasPos: any): void;
    /**
     * Gets the current position we're pivoting about.
     * @returns {Number[]} The current World-space pivot position.
     */
    getPivotPos(): number[];
    /**
     * Continues to pivot.
     *
     * @param {Number} yawInc Yaw rotation increment.
     * @param {Number} pitchInc Pitch rotation increment.
     */
    continuePivot(yawInc: number, pitchInc: number): void;
    /**
     * Shows the pivot position.
     *
     * Only works if we set an  HTML DOM element to represent the pivot position.
     */
    showPivot(): void;
    _hideTimeout: number;
    /**
     * Hides the pivot position.
     *
     * Only works if we set an  HTML DOM element to represent the pivot position.
     */
    hidePivot(): void;
    /**
     * Finishes pivoting.
     */
    endPivot(): void;
    destroy(): void;
}
