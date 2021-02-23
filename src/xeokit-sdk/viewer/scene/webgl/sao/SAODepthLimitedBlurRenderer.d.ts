/**
 * SAO implementation inspired from previous SAO work in THREE.js by ludobaka / ludobaka.github.io and bhouston
 * @private
 */
export class SAODepthLimitedBlurRenderer {
    constructor(scene: any);
    _scene: any;
    _uvIncrement: Float32Array;
    _program: any;
    _programError: boolean;
    _aPosition: any;
    _aUV: any;
    _uColorTexture: string;
    _uDepthTexture: string;
    _uCameraNear: any;
    _uCameraFar: any;
    _uCameraProjectionMatrix: any;
    _uCameraInverseProjectionMatrix: any;
    _uScale: any;
    _uIntensity: any;
    _uBias: any;
    _uKernelRadius: any;
    _uMinResolution: any;
    _uvBuf: any;
    _positionsBuf: any;
    _indicesBuf: any;
    init(): void;
    _uDepthCutoff: any;
    _uSampleOffsets: any;
    _uSampleWeights: any;
    render(depthTexture: any, colorTexture: any, direction: any): void;
    _getInverseProjectMat: () => any;
    destroy(): void;
}
