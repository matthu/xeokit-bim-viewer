declare module '@xeokit/xeokit-sdk/src/viewer/scene/camera/Ortho.js' {
    import { RenderState } from "@xeokit/xeokit-sdk/src/viewer/scene/webgl/RenderState.js";
    /**
     * @desc Defines its {@link Camera}'s orthographic projection as a box-shaped view volume.
     *
     * * Located at {@link Camera#ortho}.
     * * Works like Blender's orthographic projection, where the positions of the left, right, top and bottom planes are implicitly
     * indicated with a single {@link Ortho#scale} property, which causes the frustum to be symmetrical on X and Y axis, large enough to
     * contain the number of units given by {@link Ortho#scale}.
     * * {@link Ortho#near} and {@link Ortho#far} indicated the distances to the WebGL clipping planes.
     */
    export class Ortho {
        /**
         * @constructor
         * @private
         */
        private constructor();
        /**
         @private
        */
        private get type();
        /**
         * The Camera this Ortho belongs to.
         *
         * @property {Camera}
         */
        camera: any;
        _state: RenderState;
        _inverseMatrixDirty: boolean;
        _transposedMatrixDirty: boolean;
        /**
         * Sets scale factor for this Ortho's extents on X and Y axis.
         *
         * Clamps to minimum value of ````0.01```.
         *
         * Fires a "scale" event on change.
         *
         * Default value is ````1.0````
         * @param {Number} value New scale value.
         */
        set scale(arg: number);
        /**
         * Gets scale factor for this Ortho's extents on X and Y axis.
         *
         * Clamps to minimum value of ````0.01```.
         *
         * Default value is ````1.0````
         *
         * @returns {Number} New Ortho scale value.
         */
        get scale(): number;
        /**
         * Sets the position of the Ortho's near plane on the positive View-space Z-axis.
         *
         * Fires a "near" emits on change.
         *
         * Default value is ````0.1````.
         *
         * @param {Number} value New Ortho near plane position.
         */
        set near(arg: number);
        /**
         * Gets the position of the Ortho's near plane on the positive View-space Z-axis.
         *
         * Default value is ````0.1````.
         *
         * @returns {Number} New Ortho near plane position.
         */
        get near(): number;
        /**
         * Sets the position of the Ortho's far plane on the positive View-space Z-axis.
         *
         * Fires a "far" event on change.
         *
         * Default value is ````2000.0````.
         *
         * @param {Number} value New far ortho plane position.
         */
        set far(arg: number);
        /**
         * Gets the position of the Ortho's far plane on the positive View-space Z-axis.
         *
         * Default value is ````10000.0````.
         *
         * @returns {Number} New far ortho plane position.
         */
        get far(): number;
        _onCanvasBoundary: any;
        _update(): void;
        _scale: number;
        /**
         * Gets the Ortho's projection transform matrix.
         *
         * Fires a "matrix" event on change.
         *
         * Default value is ````[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]````.
         *
         * @returns {Number[]} The Ortho's projection matrix.
         */
        get matrix(): number[];
        /**
         * Gets the inverse of {@link Ortho#matrix}.
         *
         * @returns {Number[]} The inverse of {@link Ortho#matrix}.
         */
        get inverseMatrix(): number[];
        /**
         * Gets the transpose of {@link Ortho#matrix}.
         *
         * @returns {Number[]} The transpose of {@link Ortho#matrix}.
         */
        get transposedMatrix(): number[];
        /**
         * Un-projects the given Canvas-space coordinates, using this Ortho projection.
         *
         * @param {Number[]} canvasPos Inputs 2D Canvas-space coordinates.
         * @param {Number} screenZ Inputs Screen-space Z coordinate.
         * @param {Number[]} screenPos Outputs 3D Screen/Clip-space coordinates.
         * @param {Number[]} viewPos Outputs un-projected 3D View-space coordinates.
         * @param {Number[]} worldPos Outputs un-projected 3D World-space coordinates.
         */
        unproject(canvasPos: number[], screenZ: number, screenPos: number[], viewPos: number[], worldPos: number[]): number[];
        /** @private
         *
         */
        private destroy;
    }
}
