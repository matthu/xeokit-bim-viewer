/**
 * Manages occlusion testing. Private member of a Renderer.
 */
export class OcclusionTester {
    constructor(scene: any);
    _scene: any;
    _occlusionLayers: {};
    _occlusionLayersList: any[];
    _occlusionLayersListDirty: boolean;
    _shaderSource: {
        vertex: string[];
        fragment: string[];
    };
    _program: any;
    _shaderSourceHash: any;
    _shaderSourceDirty: boolean;
    _programDirty: boolean;
    _markersToOcclusionLayersMap: {};
    _onCameraViewMatrix: any;
    _occlusionTestListDirty: boolean;
    _onCameraProjMatrix: any;
    _onCanvasBoundary: any;
    /**
     * Adds a Marker for occlusion testing.
     * @param marker
     */
    addMarker(marker: any): void;
    /**
     * Notifies OcclusionTester that a Marker has updated its World-space position.
     * @param marker
     */
    markerWorldPosUpdated(marker: any): void;
    /**
     * Removes a Marker from occlusion testing.
     * @param marker
     */
    removeMarker(marker: any): void;
    /**
     * Returns true if an occlusion test is needed.
     *
     * @returns {boolean}
     */
    get needOcclusionTest(): boolean;
    /**
     * Binds the render buffer. After calling this, the caller then renders object silhouettes to the render buffer,
     * then calls drawMarkers() and doOcclusionTest().
     */
    bindRenderBuf(): void;
    _readPixelBuf: any;
    _buildOcclusionLayersList(): void;
    _buildShaderSource(): void;
    _buildVertexShaderSource(): string[];
    _buildFragmentShaderSource(): string[];
    _buildProgram(): void;
    errors: any;
    _uViewMatrix: any;
    _uProjMatrix: any;
    _uSectionPlanes: any[];
    _aPosition: any;
    _uLogDepthBufFC: any;
    /**
     * Draws {@link Marker}s to the render buffer.
     */
    drawMarkers(): void;
    /**
     * Sets visibilities of {@link Marker}s according to whether or not they are obscured by anything in the render buffer.
     */
    doOcclusionTest(): void;
    /**
     * Unbinds render buffer.
     */
    unbindRenderBuf(): void;
    /**
     * Destroys this OcclusionTester.
     */
    destroy(): void;
    destroyed: boolean;
}
