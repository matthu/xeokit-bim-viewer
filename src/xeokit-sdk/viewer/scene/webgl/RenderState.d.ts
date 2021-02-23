/**
 * @desc Represents a chunk of state changes applied by the {@link Scene}'s renderer while it renders a frame.
 *
 * * Contains properties that represent the state changes.
 * * Has a unique automatically-generated numeric ID, which the renderer can use to sort these, in order to avoid applying redundant state changes for each frame.
 * * Initialize your own properties on a RenderState via its constructor.
 *
 * @private
 */
export class RenderState {
    constructor(cfg: any);
    /**
     The RenderState's ID, unique within the renderer.
    @property id
    @type {Number}
    @final
    */
    id: number;
    /**
     Destroys this RenderState.
    */
    destroy(): void;
}
