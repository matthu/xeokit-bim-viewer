/**
 * Controls a {@link SectionPlane} with mouse and touch input.
 *
 * @private
 */
export class Control {
    /** @private */
    private constructor();
    /**
     * ID of this Control.
     *
     * SectionPlaneControls are mapped by this ID in {@link SectionPlanesPlugin#sectionPlaneControls}.
     *
     * @property id
     * @type {String|Number}
     */
    id: string | number;
    _viewer: any;
    _visible: boolean;
    _pos: any;
    _rtcCenter: any;
    _rtcPos: any;
    _baseDir: any;
    _rootNode: any;
    _displayMeshes: {
        plane: any;
        planeFrame: any;
        xCurve: any;
        xCurveHandle: any;
        xCurveArrow1: any;
        xCurveArrow2: any;
        yCurve: any;
        yCurveHandle: any;
        yCurveArrow1: any;
        yCurveArrow2: any;
        zCurve: any;
        zCurveHandle: any;
        zCurveCurveArrow1: any;
        zCurveArrow2: any;
        center: any;
        xAxisArrow: any;
        xAxisArrowHandle: any;
        xAxis: any;
        xAxisHandle: any;
        yAxisArrow: any;
        yAxisArrowHandle: any;
        yShaft: any;
        yShaftHandle: any;
        zAxisArrow: any;
        zAxisArrowHandle: any;
        zShaft: any;
        zAxisHandle: any;
    } | {
        plane?: undefined;
        planeFrame?: undefined;
        xCurve?: undefined;
        xCurveHandle?: undefined;
        xCurveArrow1?: undefined;
        xCurveArrow2?: undefined;
        yCurve?: undefined;
        yCurveHandle?: undefined;
        yCurveArrow1?: undefined;
        yCurveArrow2?: undefined;
        zCurve?: undefined;
        zCurveHandle?: undefined;
        zCurveCurveArrow1?: undefined;
        zCurveArrow2?: undefined;
        center?: undefined;
        xAxisArrow?: undefined;
        xAxisArrowHandle?: undefined;
        xAxis?: undefined;
        xAxisHandle?: undefined;
        yAxisArrow?: undefined;
        yAxisArrowHandle?: undefined;
        yShaft?: undefined;
        yShaftHandle?: undefined;
        zAxisArrow?: undefined;
        zAxisArrowHandle?: undefined;
        zShaft?: undefined;
        zAxisHandle?: undefined;
    };
    _affordanceMeshes: {
        planeFrame: any;
        xHoop: any;
        yHoop: any;
        zHoop: any;
        xAxisArrow: any;
        yAxisArrow: any;
        zAxisArrow: any;
    } | {
        planeFrame?: undefined;
        xHoop?: undefined;
        yHoop?: undefined;
        zHoop?: undefined;
        xAxisArrow?: undefined;
        yAxisArrow?: undefined;
        zAxisArrow?: undefined;
    };
    _ignoreNextSectionPlaneDirUpdate: boolean;
    /**
     * Called by SectionPlanesPlugin to assign this Control to a SectionPlane.
     * SectionPlanesPlugin keeps SectionPlaneControls in a reuse pool.
     * Call with a null or undefined value to disconnect the Control ffrom whatever SectionPlane it was assigned to.
     * @private
     */
    private _setSectionPlane;
    _onSectionPlanePos: any;
    _onSectionPlaneDir: any;
    _sectionPlane: any;
    /**
     * Gets the {@link SectionPlane} controlled by this Control.
     * @returns {SectionPlane} The SectionPlane.
     */
    get sectionPlane(): any;
    /** @private */
    private _setPos;
    /** @private */
    private _setDir;
    _setSectionPlaneDir(dir: any): void;
    /**
     * Sets if this Control is visible.
     *
     * @type {Boolean}
     */
    setVisible(visible?: boolean): void;
    /**
     * Gets if this Control is visible.
     *
     * @type {Boolean}
     */
    getVisible(): boolean;
    /**
     * Sets if this Control is culled. This is called by SectionPlanesPlugin to
     * temporarily hide the Control while a snapshot is being taken by Viewer#getSnapshot().
     * @param culled
     */
    setCulled(culled: any): void;
    /**
     * Builds the Entities that represent this Control.
     * @private
     */
    private _createNodes;
    _bindEvents(): void;
    _onCameraViewMatrix: any;
    _onCameraProjMatrix: any;
    _onSceneTick: any;
    _onCameraControlHover: any;
    _onCameraControlHoverLeave: any;
    _canvasMouseDownListener: (e: any) => void;
    _canvasMouseMoveListener: (e: any) => void;
    _canvasMouseUpListener: (e: any) => void;
    _canvasWheelListener: (e: any) => void;
    _destroy(): void;
    _unbindEvents(): void;
    _destroyNodes(): void;
}
