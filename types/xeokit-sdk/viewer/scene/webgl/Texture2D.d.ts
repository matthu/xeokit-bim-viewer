/**
 * @desc A low-level component that represents a 2D WebGL texture.
 *
 * @private
 */
export class Texture2D {
    constructor(gl: any, target: any);
    gl: any;
    target: any;
    texture: any;
    allocated: boolean;
    setPreloadColor(value: any): void;
    setTarget(target: any): void;
    setImage(image: any, props: any): void;
    setProps(props: any): void;
    bind(unit: any): boolean;
    unbind(unit: any): void;
    destroy(): void;
}
