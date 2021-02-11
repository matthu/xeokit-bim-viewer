/**
 * @private
 */
export class BatchingDepthRenderer {
    constructor(scene: any);
    _scene: any;
    _shaderSource: BatchingDepthShaderSource;
    _hash: any;
    getValid(): boolean;
    _getHash(): any;
    drawLayer(frameCtx: any, batchingLayer: any, renderPass: any): void;
    _allocate(): void;
    _program: any;
    errors: any;
    _uRenderPass: any;
    _uPositionsDecodeMatrix: any;
    _uWorldMatrix: any;
    _uViewMatrix: any;
    _uProjMatrix: any;
    _uSectionPlanes: any[];
    _aPosition: any;
    _aOffset: any;
    _aFlags: any;
    _aFlags2: any;
    _uLogDepthBufFC: any;
    _bindProgram(): void;
    webglContextRestored(): void;
    destroy(): void;
}
import { BatchingDepthShaderSource } from "@xeokit/xeokit-sdk/src/viewer/scene/PerformanceModel/lib/batching/depth/BatchingDepthShaderSource";
