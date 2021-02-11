/**
 * @private
 */
export class OBJLoader {
    /**
     * Loads OBJ and MTL from file(s) into a {@link Node}.
     *
     * @static
     * @param {Node} modelNode Node to load into.
     * @param {String} src Path to OBJ file.
     * @param {Object} params Loading options.
     */
    load(modelNode: Node, src: string, params?: any): void;
    /**
     * Parses OBJ and MTL text strings into a {@link Node}.
     *
     * @static
     * @param {Node} modelNode Node to load into.
     * @param {String} objText OBJ text string.
     * @param {String} [mtlText] MTL text string.
     * @param {String} [basePath] Base path for external resources.
     */
    parse(modelNode: Node, objText: string, mtlText?: string, basePath?: string): void;
}
