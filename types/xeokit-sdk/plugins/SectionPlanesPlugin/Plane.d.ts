/**
 * Renders a 3D plane within an {@link Overview} to indicate its {@link SectionPlane}'s current position and orientation.
 *
 * @private
 */
export class Plane {
    /** @private */
    private constructor();
    /**
     * The ID of this SectionPlanesOverviewPlane.
     *
     * @type {String}
     */
    id: string;
    /**
     * The {@link SectionPlane} represented by this SectionPlanesOverviewPlane.
     *
     * @type {SectionPlane}
     */
    _sectionPlane: any;
    _mesh: any;
    _onSectionPlanePos: any;
    _onSectionPlaneDir: any;
    _highlighted: boolean;
    _selected: boolean;
    /**
     * Sets if this SectionPlanesOverviewPlane is highlighted.
     *
     * @type {Boolean}
     * @private
     */
    private setHighlighted;
    /**
     * Gets if this SectionPlanesOverviewPlane is highlighted.
     *
     * @type {Boolean}
     * @private
     */
    private getHighlighted;
    /**
     * Sets if this SectionPlanesOverviewPlane is selected.
     *
     * @type {Boolean}
     * @private
     */
    private setSelected;
    /**
     * Gets if this SectionPlanesOverviewPlane is selected.
     *
     * @type {Boolean}
     * @private
     */
    private getSelected;
    /** @private */
    private destroy;
}
