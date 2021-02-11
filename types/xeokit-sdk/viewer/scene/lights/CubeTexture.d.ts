/**
 * @desc A cube texture map.
 */
export class CubeTexture {
    /**
     * @constructor
     * @param {Component} owner Owner component. When destroyed, the owner will destroy this component as well.
     * @param {*} [cfg] Configs
     * @param {String} [cfg.id] Optional ID for this CubeTexture, unique among all components in the parent scene, generated automatically when omitted.
     * @param {String[]} [cfg.src=null]  Paths to six image files to load into this CubeTexture.
     * @param {Boolean} [cfg.flipY=false] Flips this CubeTexture's source data along its vertical axis when true.
     * @param {String} [cfg.encoding="linear"] Encoding format.  See the {@link CubeTexture/encoding} property for more info.
     */
    constructor(owner: any, cfg?: any);
    /**
     @private
     */
    private get type();
    _state: RenderState;
    _src: any;
    _images: any[];
    _checkFlipY(value: any): boolean;
    _checkEncoding(value: any): any;
    _webglContextRestored(): void;
    _loadSrc(src: any): void;
    /**
     * Destroys this CubeTexture
     *
     */
    destroy(): void;
}
import { RenderState } from "@xeokit/xeokit-sdk/src/viewer/scene/webgl/RenderState";
