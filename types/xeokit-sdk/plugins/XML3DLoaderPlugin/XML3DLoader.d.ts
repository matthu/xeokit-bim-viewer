/**
 * @private
 */
export class XML3DLoader {
    constructor(plugin: any, cfg?: {});
    /**
     * Supported 3DXML schema versions
     * @property supportedSchemas
     * @type {string[]}
     */
    supportedSchemas: string[];
    _xrayOpacity: number;
    _src: any;
    _options: {};
    /**
     * Default viewpoint, containing eye, look and up vectors.
     * Only defined if found in the 3DXML file.
     * @property viewpoint
     * @type {Number[]}
     */
    viewpoint: number[];
    src: any;
    xrayOpacity: number;
    displayEffect: any;
    createMetaModel: any;
    load(plugin: any, modelNode: any, src: any, options: any, ok: any, error: any): void;
}
