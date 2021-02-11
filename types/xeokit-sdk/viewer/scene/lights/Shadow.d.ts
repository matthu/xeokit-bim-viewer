export class Shadow {
    constructor(owner: any, cfg?: {});
    /**
     @private
     */
    private get type();
    _state: {
        resolution: any;
        intensity: number;
    };
    /**
     The resolution of the texture map for this Shadow.

     This will be either World- or View-space, depending on the value of {@link Shadow/space}.

     Fires a {@link Shadow/resolution:event} event on change.

     @property resolution
     @default [1000, 1000]
     @type Uint16Array
     */
    set resolution(arg: any);
    get resolution(): any;
    /**
     The intensity of this Shadow.

     Fires a {@link Shadow/intensity:event} event on change.

     @property intensity
     @default 1.0
     @type {Number}
     */
    set intensity(arg: number);
    get intensity(): number;
    destroy(): void;
}
