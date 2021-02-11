/**
 * SAO implementation inspired from previous SAO work in THREE.js by ludobaka / ludobaka.github.io and bhouston
 * @private
 */
export class SAOOcclusionRenderer {
    constructor(scene: any);
    _scene: any;
    _program: any;
    _programError: boolean;
    _aPosition: any;
    _aUV: any;
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
    _uRandomSeed: any;
    _uvBuf: any;
    _positionsBuf: any;
    _indicesBuf: any;
    init(): void;
    _uPerspective: any;
    _uViewport: any;
    render(depthTexture: any): void;
    _getInverseProjectMat: () => any;
    destroy(): void;
}
