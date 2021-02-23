/**
 * SAO implementation inspired from previous SAO work in THREE.js by ludobaka / ludobaka.github.io and bhouston
 * @private
 */
export class SAOBlurRenderer {
    constructor(scene: any);
    _scene: any;
    _texelOffset: Float32Array;
    _program: any;
    _programError: boolean;
    _uDepthTexture: string;
    _uOcclusionTexture: string;
    _aPosition: any;
    _aUV: any;
    _uvBuf: any;
    _positionsBuf: any;
    _indicesBuf: any;
    init(): void;
    _uOcclusionScale: any;
    _uOcclusionCutoff: any;
    _uTexelOffset: any;
    render(depthTexture: any, occlusionTexture: any, direction: any): void;
    destroy(): void;
}
