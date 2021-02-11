/**
 * @desc Represents a WebGL render buffer.
 * @private
 */
export class RenderBuffer {
    constructor(canvas: any, gl: any, options: any);
    gl: any;
    allocated: boolean;
    canvas: any;
    buffer: {
        framebuf: any;
        renderbuf: any;
        texture: any;
        width: any;
        height: any;
    };
    bound: boolean;
    size: any;
    setSize(size: any): void;
    webglContextRestored(gl: any): void;
    bind(): void;
    _touch(): void;
    clear(): void;
    read(pickX: any, pickY: any): Uint8Array;
    readImage(params: any): any;
    _getImageDataCache(): any;
    _imageDataCache: any;
    unbind(): void;
    getTexture(): {
        renderBuffer: RenderBuffer;
        bind: (unit: any) => boolean;
        unbind: (unit: any) => void;
    };
    _texture: {
        renderBuffer: RenderBuffer;
        bind: (unit: any) => boolean;
        unbind: (unit: any) => void;
    };
    destroy(): void;
}
