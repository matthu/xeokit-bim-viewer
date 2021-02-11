/**
 * @desc Information about an ````IfcBuildingStorey````.
 *
 * These are provided by a {@link StoreyViewsPlugin}.
 */
export class Storey {
    /**
     * @private
     */
    private constructor();
    /**
     * The {@link StoreyViewsPlugin} this Storey belongs to.
     *
     * @property plugin
     * @type {StoreyViewsPlugin}
     */
    plugin: any;
    /**
     * ID of the IfcBuildingStorey.
     *
     * This matches IDs of the IfcBuildingStorey's {@link MetaObject} and {@link Entity}.
     *
     * @property storeyId
     * @type {String}
     */
    storeyId: string;
    /**
     * ID of the model.
     *
     * This matches the ID of the {@link MetaModel} that contains the IfcBuildingStorey's {@link MetaObject}.
     *
     * @property modelId
     * @type {String|Number}
     */
    modelId: string | number;
    /**
     * Axis-aligned World-space boundary of the {@link Entity}s that represent the IfcBuildingStorey.
     *
     * The boundary is a six-element Float32Array containing the min/max extents of the
     * axis-aligned boundary, ie. ````[xmin, ymin, zmin, xmax, ymax, zmax]````
     *
     * @property aabb
     * @type {Number[]}
     */
    aabb: number[];
    /** Number of {@link Entity}s within the IfcBuildingStorey.
     *
     * @property numObjects
     * @type {Number}
     */
    numObjects: number;
}
