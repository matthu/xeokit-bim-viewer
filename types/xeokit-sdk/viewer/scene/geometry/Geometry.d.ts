/**
 * @desc Defines a shape for one or more {@link Mesh}es.
 *
 * * {@link ReadableGeometry} is a subclass that stores its data in both browser and GPU memory. Use ReadableGeometry when you need to keep the geometry arrays in browser memory.
 * * {@link VBOGeometry} is a subclass that stores its data solely in GPU memory. Use VBOGeometry when you need a lower memory footprint and don't need to keep the geometry data in browser memory.
 */
export class Geometry {
    constructor(owner: any, cfg?: {});
    /** @private */
    private get type();
    /** @private */
    private get isGeometry();
    destroy(): void;
}
