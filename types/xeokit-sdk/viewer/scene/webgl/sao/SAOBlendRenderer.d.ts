/**
 * SAO implementation inspired from previous SAO work in THREE.js by ludobaka / ludobaka.github.io and bhouston
 * @private
 */
export class SAOBlendRenderer {
    constructor(scene: any);
    _scene: any;
    _program: any;
    _programError: boolean;
    _uColorTexture: string;
    _uOcclusionTexture: string;
    _aPosition: any;
    _aUV: any;
    _uvBuf: any;
    _positionsBuf: any;
    _indicesBuf: any;
    init(): void;
    _uOcclusionScale: any;
    _uOcclusionCutoff: any;
    render(colorTexture: any, occlusionTexture: any): void;
    destroy(): void;
}
