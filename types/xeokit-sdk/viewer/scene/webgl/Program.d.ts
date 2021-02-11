/**
 * @desc Represents a WebGL program.
 * @private
 */
export class Program {
    constructor(gl: any, shaderSource: any);
    id: any;
    source: any;
    init(gl: any): void;
    gl: any;
    allocated: boolean;
    compiled: boolean;
    linked: any;
    validated: boolean;
    errors: any;
    uniforms: {};
    samplers: {};
    attributes: {};
    _vertexShader: Shader;
    _fragmentShader: Shader;
    handle: any;
    bind(): void;
    getLocation(name: any): any;
    getAttribute(name: any): any;
    bindTexture(name: any, texture: any, unit: any): any;
    destroy(): void;
}
import { Shader } from "@xeokit/xeokit-sdk/src/viewer/scene/webgl/Shader";
