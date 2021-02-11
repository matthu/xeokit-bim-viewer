export class ShadowRenderer {
    private constructor();
    put(): void;
    webglContextRestored(): void;
    _program: any;
    drawMesh(frame: any, mesh: any): void;
    _lastMaterialId: any;
    _lastVertexBufsId: any;
    _lastGeometryId: any;
    _allocate(mesh: any): void;
    _scene: any;
    _useCount: number;
    errors: any;
    _uPositionsDecodeMatrix: any;
    _uModelMatrix: any;
    _uShadowViewMatrix: any;
    _uShadowProjMatrix: any;
    _uSectionPlanes: {};
    _aPosition: any;
    _uClippable: any;
    _uOffset: any;
    _bindProgram(frame: any): void;
}
