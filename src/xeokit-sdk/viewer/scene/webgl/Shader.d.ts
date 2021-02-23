/**
 * @desc Represents a vertex or fragment stage within a {@link Program}.
 * @private
 */
export class Shader {
    constructor(gl: any, type: any, source: any);
    allocated: boolean;
    compiled: any;
    handle: any;
    errors: any[];
    destroy(): void;
}
