declare module '@xeokit/xeokit-sdk/src/viewer/scene/lights/Light.js' {
    /**
     * @desc A dynamic light source within a {@link Scene}.
     *
     * These are registered by {@link Light#id} in {@link Scene#lights}.
     */
    export class Light {
        constructor(owner: any, cfg?: {});
        /**
         @private
        */
        private get type();
        /**
         * @private
         */
        private get isLight();
    }
}
