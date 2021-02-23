/**
 * @desc An interactive 3D overview for navigating the {@link SectionPlane}s created by its {@link SectionPlanesPlugin}.
 *
 * * Located at {@link SectionPlanesPlugin#overview}.
 * * Renders the overview on a separate canvas at a corner of the {@link Viewer}'s {@link Scene} {@link Canvas}.
 * * The overview shows a 3D plane object for each {@link SectionPlane} in the {@link Scene}.
 * * Click a plane object in the overview to toggle the visibility of a 3D gizmo to edit the position and orientation of its {@link SectionPlane}.
 *
 * @private
 */
export class Overview {
    /**
     * @private
     */
    private constructor();
    /**
     * The {@link SectionPlanesPlugin} that owns this SectionPlanesOverview.
     *
     * @type {SectionPlanesPlugin}
     */
    plugin: any;
    _viewer: any;
    _onHoverEnterPlane: any;
    _onHoverLeavePlane: any;
    _onClickedNothing: any;
    _onClickedPlane: any;
    _visible: boolean;
    _planes: {};
    _canvas: any;
    _scene: any;
    _zUp: boolean;
    _synchCamera: () => void;
    _onViewerCameraMatrix: any;
    _onViewerCameraWorldAxis: any;
    _onViewerCameraFOV: any;
    _onInputMouseMove: any;
    _onCanvasMouseUp: () => void;
    _onCanvasMouseOut: () => void;
    /** Called by SectionPlanesPlugin#createSectionPlane()
     * @private
     */
    private addSectionPlane;
    /**  @private
     */
    private setPlaneHighlighted;
    /**  @private
     */
    private setPlaneSelected;
    /** @private
     */
    private removeSectionPlane;
    /**
     * Sets if this SectionPlanesOverview is visible.
     *
     * @param {Boolean} visible Whether or not this SectionPlanesOverview is visible.
     */
    setVisible(visible?: boolean): void;
    /**
     * Gets if this SectionPlanesOverview is visible.
     *
     * @return {Boolean} True when this SectionPlanesOverview is visible.
     */
    getVisible(): boolean;
    /**  @private
     */
    private destroy;
}
