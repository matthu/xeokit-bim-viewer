/**
 * @private
 */
export class InstancingRenderers {
    constructor(scene: any);
    _scene: any;
    _compile(): void;
    drawRenderer: any;
    drawRendererWithSAO: any;
    depthRenderer: any;
    normalsRenderer: any;
    fillRenderer: any;
    edgesRenderer: any;
    pickMeshRenderer: any;
    pickDepthRenderer: any;
    pickNormalsRenderer: any;
    occlusionRenderer: any;
    shadowRenderer: any;
    _createRenderers(): void;
    _destroy(): void;
}
export function getInstancingRenderers(scene: any): any;
