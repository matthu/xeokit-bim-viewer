import { Viewer } from "../../viewer/Viewer";

/**
 * @private
 */
export class CubeTextureCanvas {

    constructor(viewer: Viewer, cfg: any);
    _textureCanvas: any;

    axisLabels: boolean;

    cubeColor: string;
    cubeHighlightColor: string;

    height: number;
    width: number;
    scale: number;

    facesZUp: any[];
    areasZUp: any[];
    facesYUp: any[];
    areasYUp: any[];

    paint(): void;

    translateLabel(): void;

    setZUp(): void;

    setYUp(): void;

    clear(): void;

    getArea(uv: any): any;

    setAreaHighlighted(areaId: string, highlighted: boolean): void;

    getAreaDir(areaId: string): any;

    getAreaUp(areaId: string): any;

    getImage(): any;

    destroy(): void;

    clear(): void;
}
