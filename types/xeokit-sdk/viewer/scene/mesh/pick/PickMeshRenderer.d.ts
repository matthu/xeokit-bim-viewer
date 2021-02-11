export class PickMeshRenderer {
    private constructor();
    put(): void;
    webglContextRestored(): void;
    _program: any;
    drawMesh(frameCtx: any, mesh: any): void;
    _lastMaterialId: any;
    _lastGeometryId: any;
    _allocate(mesh: any): void;
    errors: any;
    _uPositionsDecodeMatrix: any;
    _uModelMatrix: any;
    _uViewMatrix: any;
    _uProjMatrix: any;
    _uSectionPlanes: any[];
    _aPosition: any;
    _uClippable: any;
    _uPickColor: any;
    _uOffset: any;
    _uLogDepthBufFC: any;
    _bindProgram(frameCtx: any): void;
}
