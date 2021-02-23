/**
 * @desc Represents a WebGL vertex attribute buffer (VBO).
 * @private
 * @param gl {WebGLRenderingContext} The WebGL rendering context.
 */
export class Attribute {
    constructor(gl: any, location: any);
    _gl: any;
    location: any;
    bindArrayBuffer(arrayBuf: any): void;
}
