/**
 * @private
 */
export class BatchingPickMeshRenderer {
    constructor(scene: any);
    _scene: any;
    _hash: any;
    _shaderSource: BatchingPickMeshShaderSource;
    getValid(): boolean;
    _getHash(): any;
    drawLayer(frameCtx: any, batchingLayer: any, renderPass: any): void;
    _allocate(): void;
    _program: any;
    errors: any;
    _uRenderPass: any;
    _uPickInvisible: any;
    _uPositionsDecodeMatrix: any;
    _uWorldMatrix: any;
    _uViewMatrix: any;
    _uProjMatrix: any;
    _uSectionPlanes: any[];
    _aPosition: any;
    _aOffset: any;
    _aPickColor: any;
    _aFlags: any;
    _aFlags2: any;
    _uLogDepthBufFC: any;
    _bindProgram(frameCtx: any): void;
    webglContextRestored(): void;
    destroy(): void;
}
import { BatchingPickMeshShaderSource } from "@xeokit/xeokit-sdk/src/viewer/scene/PerformanceModel/lib/batching/pick/BatchingPickMeshShaderSource";
