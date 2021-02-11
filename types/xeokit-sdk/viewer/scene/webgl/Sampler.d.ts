/**
 * @desc A low-level component that represents a WebGL Sampler.
 * @private
 */
export class Sampler {
    constructor(gl: any, location: any);
    bindTexture: (texture: any, unit: any) => boolean;
}
