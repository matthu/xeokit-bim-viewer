/**
 * Default data access strategy for {@link GLTFLoaderPlugin}.
 *
 * This just loads assets using XMLHttpRequest.
 */
export class GLTFDefaultDataSource {
    /**
     * Gets metamodel JSON.
     *
     * @param {String|Number} metaModelSrc Identifies the metamodel JSON asset.
     * @param {{Function(*)}} ok Fired on successful loading of the metamodel JSON asset.
     * @param {{Function(*)}} error Fired on error while loading the metamodel JSON asset.
     */
    getMetaModel(metaModelSrc: string | number, ok: {
        Function();
    }, error: {
        Function();
    }): void;
    /**
     * Gets glTF JSON.
     *
     * @param {String|Number} glTFSrc Identifies the glTF JSON asset.
     * @param {Function} ok Fired on successful loading of the glTF JSON asset.
     * @param {Function} error Fired on error while loading the glTF JSON asset.
     */
    getGLTF(glTFSrc: string | number, ok: Function, error: Function): void;
    /**
     * Gets glTF binary attachment.
     *
     * Note that this method requires the source of the glTF JSON asset. This is because the binary attachment
     * source could be relative to the glTF source, IE. it may not be a global ID.
     *
     * @param {String|Number} glTFSrc Identifies the glTF JSON asset.
     * @param {String|Number} binarySrc Identifies the glTF binary asset.
     * @param {Function} ok Fired on successful loading of the glTF binary asset.
     * @param {Function} error Fired on error while loading the glTF binary asset.
     */
    getArrayBuffer(glTFSrc: string | number, binarySrc: string | number, ok: Function, error: Function): void;
}
