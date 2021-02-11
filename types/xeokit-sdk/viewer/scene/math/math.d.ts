declare module '@xeokit/xeokit-sdk/src/viewer/scene/math/math.js' {
    /**
     * @private
     */
    export class math {
        static MIN_DOUBLE: number;
        static MAX_DOUBLE: number;

        /**
         * The number of radiians in a degree (0.0174532925).
         * @property DEGTORAD
         * @type {Number}
         */
        static DEGTORAD: number;

        /**
         * The number of degrees in a radian.
         * @property RADTODEG
         * @type {Number}
         */
        static RADTODEG: number;

        unglobalizeObjectId(modelId: string, globalId: string): string;

        globalizeObjectId(modelId: string, objectId: string): string;

        /**
         * Returns a new, uninitialized two-element vector.
         * @method vec2
         * @param [values] Initial values.
         * @static
         * @returns {Number[]}
         */
        static vec2(values?: number[]): number[];

        /**
         * Returns a new, uninitialized three-element vector.
         * @method vec3
         * @param [values] Initial values.
         * @static
         * @returns {Number[]}
         */
        static vec3(values?: number[]): number[];

        /**
         * Gets the center of an AABB.
         *
         * @private
         */
        static getAABB3Center(aabb: {[id: string]: any}, dest?: number[]): number[];

        /**
         * Gets the diagonal size of an AABB3 given as minima and maxima.
         *
         * @private
         */
        static getAABB3Diag(aabb: {[id: string]: any}): number;

        /**
         * Collapses a 3D axis-aligned boundary, ready to expand to fit 3D points.
         * Creates new AABB if none supplied.
         *
         * @private
         */
        static collapseAABB3(aabb: {[id: string]: any}): {[id: string]: any};

        /**
         * Expands the first axis-aligned 3D boundary to enclose the second, if required.
         *
         * @private
         */
        static expandAABB3(aabb1: {[id: string]: any}, aabb2: {[id: string]: any}): {[id: string]: any};

        /**
         * Returns a new, uninitialized 3D axis-aligned bounding box.
         *
         * @private
         */
        static AABB3(values?: number[]): {[id: string]: any};

        /**
         * Multiplies each element of a three-element vector by a scalar.
         * @method mulVec3Scalar
         * @static
         * @param {Array(Number)} v The vector
         * @param {Number} s The scalar
         * @param  {Array(Number)} [dest] Destination vector
         * @return {Array(Number)} dest if specified, v otherwise
         */
        static mulVec3Scalar(v: number[], s: number, dest?: number[]): number[];
    }
}
