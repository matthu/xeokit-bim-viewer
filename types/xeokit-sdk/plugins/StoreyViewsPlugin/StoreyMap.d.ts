/**
 * @desc A 2D plan view image of an ````IfcBuildingStorey````.
 *
 * These are created by a {@link StoreyViewsPlugin}.
 */
export class StoreyMap {
    /**
     * @private
     */
    private constructor();
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
     * Base64-encoded plan view image.
     *
     * @property imageData
     * @type {String}
     */
    imageData: string;
    /**
     * The image format - "png" or "jpeg".
     *
     * @property format
     * @type {String}
     */
    format: string;
    /**
     * Width of the image, in pixels.
     *
     * @property width
     * @type {Number}
     */
    width: number;
    /**
     * Height of the image, in pixels.
     *
     * @property height
     * @type {Number}
     */
    height: number;
}
