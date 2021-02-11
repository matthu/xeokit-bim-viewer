declare module '@xeokit/xeokit-sdk/src/viewer/scene/viewport/Viewport.js' {
    import {RenderState} from "@xeokit/xeokit-sdk/src/viewer/scene/webgl/RenderState.js";
    export class Viewport {
        /**
         @private
        */
        private constructor();
        /**
         @private
        */
        private get type();
        _state: RenderState;
        /**
         * Sets the canvas-space boundary of this Viewport, indicated as ````[min, max, width, height]````.
         *
         * When {@link Viewport#autoBoundary} is ````true````, ignores calls to this method and automatically synchronizes with {@link Canvas#boundary}.
         *
         * Fires a "boundary"" event on change.
         *
         * Defaults to the {@link Canvas} extents.
         *
         * @param {Number[]} value New Viewport extents.
         */
        set boundary(arg: number[]);
        /**
         * Gets the canvas-space boundary of this Viewport, indicated as ````[min, max, width, height]````.
         *
         * @returns {Number[]} The Viewport extents.
         */
        get boundary(): number[];
        /**
         * Sets if {@link Viewport#boundary} automatically synchronizes with {@link Canvas#boundary}.
         *
         * Default is ````false````.
         *
         * @param {Boolean} value Set true to automatically sycnhronize.
         */
        set autoBoundary(arg: boolean);
        /**
         * Gets if {@link Viewport#boundary} automatically synchronizes with {@link Canvas#boundary}.
         *
         * Default is ````false````.
         *
         * @returns {Boolean} Returns ````true```` when automatically sycnhronizing.
         */
        get autoBoundary(): boolean;
        _autoBoundary: any;
        _onCanvasSize: any;
        _getState(): RenderState;
        /**
         * @private
         */
        private destroy;
    }
}
