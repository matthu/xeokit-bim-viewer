/**
 * Default data access strategy for {@link XKTLoaderPlugin}.
 */
export class XKTDefaultDataSource {
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
     * Gets the contents of the given ````.xkt```` file in an arraybuffer.
     *
     * @param {String|Number} src Path to ````.xkt```` file.
     * @param {Function} ok Callback fired on success, argument is the ````.xkt```` file in an arraybuffer.
     * @param {Function} error Callback fired on error.
     */
    getXKT(src: string | number, ok: Function, error: Function): void;
}
