declare module '@xeokit/xeokit-sdk/src/viewer/scene/camera/CameraFlightAnimation.js' {
    /**
     * @desc Jumps or flies the {@link Scene}'s {@link Camera} to a given target.
     *
     * * Located at {@link Viewer#cameraFlight}
     * * Can fly or jump to its target.
     * * While flying, can be stopped, or redirected to a different target.
     * * Can also smoothly transition between ortho and perspective projections.
     *
     *
     * A CameraFlightAnimation's target can be:
     *
     * * specific ````eye````, ````look```` and ````up```` positions,
     * * an axis-aligned World-space bounding box (AABB), or
     * * an instance or ID of any {@link Component} subtype that provides a World-space AABB.
     *
     * A target can also contain a ````projection```` type to transition into. For example, if your {@link Camera#projection} is
     * currently ````"perspective"```` and you supply {@link CameraFlightAnimation#flyTo} with a ````projection```` property
     * equal to "ortho", then CameraFlightAnimation will smoothly transition the Camera into an orthographic projection.
     *
     * Configure {@link CameraFlightAnimation#fit} and {@link CameraFlightAnimation#fitFOV} to make it stop at the point
     * where the target occupies a certain amount of the field-of-view.
     *
     * ## Flying to an Entity
     *
     * Flying to an {@link Entity}:
     *
     * ````Javascript
     * var entity = new Mesh(viewer.scene);
     *
     * // Fly to the Entity's World-space AABB
     * viewer.cameraFlight.flyTo(entity);
     * ````
     * ## Flying to a Position
     *
     * Flying the CameraFlightAnimation from the previous example to specified eye, look and up positions:
     *
     * ````Javascript
     * viewer.cameraFlight.flyTo({
     *    eye: [-5,-5,-5],
     *    look: [0,0,0]
     *    up: [0,1,0],
     *    duration: 1 // Default, seconds
     * },() => {
     *      // Done
     * });
     * ````
     *
     * ## Flying to an AABB
     *
     * Flying the CameraFlightAnimation from the previous two examples explicitly to the {@link Boundary3D"}}Boundary3D's{{/crossLink}}
     * axis-aligned bounding box:
     *
     * ````Javascript
     * viewer.cameraFlight.flyTo(entity.aabb);
     * ````
     *
     * ## Transitioning Between Projections
     *
     * CameraFlightAnimation also allows us to smoothly transition between Camera projections. We can do that by itself, or
     * in addition to flying the Camera to a target.
     *
     * Let's transition the Camera to orthographic projection:
     *
     * [[Run example](http://xeokit.github.io/xeokit-sdk/examples/#camera_CameraFlightAnimation_projection)]
     *
     * ````Javascript
     * viewer.cameraFlight.flyTo({ projection: "ortho", () => {
     *      // Done
     * });
     * ````
     *
     * Now let's transition the Camera back to perspective projection:
     *
     * ````Javascript
     * viewer.cameraFlight.flyTo({ projection: "perspective"}, () => {
     *      // Done
     * });
     * ````
     *
     * Fly Camera to a position, while transitioning to orthographic projection:
     *
     * ````Javascript
     * viewer.cameraFlight.flyTo({
     *     eye: [-100,20,2],
     *     look: [0,0,-40],
     *     up: [0,1,0],
     *     projection: "ortho", () => {
     *        // Done
     * });
     * ````
     */
    export class CameraFlightAnimation {
        static _ease(t: any, b: any, c: any, d: any): any;
        static _easeInCubic(t: any, b: any, c: any, d: any): any;
        static _easeOutExpo(t: any, b: any, c: any, d: any): any;
        /**
         @constructor
        @private
        */
        private constructor();
        /**
         * @private
         */
        private get type();
        _look1: any;
        _eye1: any;
        _up1: any;
        _look2: any;
        _eye2: any;
        _up2: any;
        _orthoScale1: number;
        _orthoScale2: number;
        _flying: boolean;
        _flyEyeLookUp: boolean;
        _flyingEye: boolean;
        _flyingLook: boolean;
        _callback: Function;
        _callbackScope: any;
        _time1: number;
        _time2: number;
        easing: boolean;
        /**
         * Sets the flight duration, in seconds, when calling {@link CameraFlightAnimation#flyTo}.
         *
         * Stops any flight currently in progress.
         *
         * default value is ````0.5````.
         *
         * @param {Number} value New duration value.
         */
        set duration(arg: number);
        /**
         * Gets the flight duration, in seconds, when calling {@link CameraFlightAnimation#flyTo}.
         *
         * default value is ````0.5````.
         *
         * @returns {Number} New duration value.
         */
        get duration(): number;
        /**
         * Sets if, when CameraFlightAnimation is flying to a boundary, it will always adjust the distance between the
         * {@link Camera#eye} and {@link Camera#look} so as to ensure that the target boundary is always filling the view volume.
         *
         * When false, the eye will remain at its current distance from the look position.
         *
         * Default value is ````true````.
         *
         * @param {Boolean} value Set ````true```` to activate this behaviour.
         */
        set fit(arg: boolean);
        /**
         * Gets if, when CameraFlightAnimation is flying to a boundary, it will always adjust the distance between the
         * {@link Camera#eye} and {@link Camera#look} so as to ensure that the target boundary is always filling the view volume.
         *
         * When false, the eye will remain at its current distance from the look position.
         *
         * Default value is ````true````.
         *
         * @returns {Boolean} value Set ````true```` to activate this behaviour.
         */
        get fit(): boolean;
        /**
         * Sets how much of the perspective field-of-view, in degrees, that a target {@link Entity#aabb} should
         * fill the canvas when calling {@link CameraFlightAnimation#flyTo} or {@link CameraFlightAnimation#jumpTo}.
         *
         * Default value is ````45````.
         *
         * @param {Number} value New FOV value.
         */
        set fitFOV(arg: number);
        /**
         * Gets how much of the perspective field-of-view, in degrees, that a target {@link Entity#aabb} should
         * fill the canvas when calling {@link CameraFlightAnimation#flyTo} or {@link CameraFlightAnimation#jumpTo}.
         *
         * Default value is ````45````.
         *
         * @returns {Number} Current FOV value.
         */
        get fitFOV(): number;
        /**
         * Sets if this CameraFlightAnimation to point the {@link Camera}
         * in the direction that it is travelling when flying to a target after calling {@link CameraFlightAnimation#flyTo}.
         *
         * Default value is ````true````.
         *
         * @param {Boolean} value Set ````true```` to activate trailing behaviour.
         */
        set trail(arg: boolean);
        /**
         * Gets if this CameraFlightAnimation points the {@link Camera}
         * in the direction that it is travelling when flying to a target after calling {@link CameraFlightAnimation#flyTo}.
         *
         * Default value is ````true````.
         *
         * @returns {Boolean} True if trailing behaviour is active.
         */
        get trail(): boolean;
        /**
         * Flies the {@link Camera} to a target.
         *
         *  * When the target is a boundary, the {@link Camera} will fly towards the target and stop when the target fills most of the canvas.
         *  * When the target is an explicit {@link Camera} position, given as ````eye````, ````look```` and ````up````, then CameraFlightAnimation will interpolate the {@link Camera} to that target and stop there.
         *
         * @param {Object|Component} [params=Scene] Either a parameters object or a {@link Component} subtype that has
         * an AABB. Defaults to the {@link Scene}, which causes the {@link Camera} to fit the Scene in view.
         * @param {Number} [params.arc=0] Factor in range ````[0..1]```` indicating how much the {@link Camera#eye} position
         * will swing away from its {@link Camera#look} position as it flies to the target.
         * @param {Number|String|Component} [params.component] ID or instance of a component to fly to. Defaults to the entire {@link Scene}.
         * @param {Number[]} [params.aabb] World-space axis-aligned bounding box (AABB) target to fly to.
         * @param {Number[]} [params.eye] Position to fly the eye position to.
         * @param {Number[]} [params.look] Position to fly the look position to.
         * @param {Number[]} [params.up] Position to fly the up vector to.
         * @param {String} [params.projection] Projection type to transition into as we fly. Can be any of the values of {@link Camera.projection}.
         * @param {Boolean} [params.fit=true] Whether to fit the target to the view volume. Overrides {@link CameraFlightAnimation#fit}.
         * @param {Number} [params.fitFOV] How much of field-of-view, in degrees, that a target {@link Entity} or its AABB should
         * fill the canvas on arrival. Overrides {@link CameraFlightAnimation#fitFOV}.
         * @param {Number} [params.duration] Flight duration in seconds.  Overrides {@link CameraFlightAnimation#duration}.
         * @param {Number} [params.orthoScale] Animate the Camera's orthographic scale to this target value. See {@link Ortho#scale}.
         * @param {Function} [callback] Callback fired on arrival.
         * @param {Object} [scope] Optional scope for callback.
         */
        flyTo(params?: any | any, callback?: Function, scope?: any): void;
        _flyingEyeLookUp: boolean;
        _projection2: string;
        _projMatrix1: any;
        _projMatrix2: any;
        /**
         * Jumps the {@link Scene}'s {@link Camera} to the given target.
         *
         * * When the target is a boundary, this CameraFlightAnimation will position the {@link Camera} at where the target fills most of the canvas.
         * * When the target is an explicit {@link Camera} position, given as ````eye````, ````look```` and ````up```` vectors, then this CameraFlightAnimation will jump the {@link Camera} to that target.
         *
         * @param {*|Component} params  Either a parameters object or a {@link Component} subtype that has a World-space AABB.
         * @param {Number} [params.arc=0]  Factor in range [0..1] indicating how much the {@link Camera#eye} will swing away from its {@link Camera#look} as it flies to the target.
         * @param {Number|String|Component} [params.component] ID or instance of a component to fly to.
         * @param {Number[]} [params.aabb]  World-space axis-aligned bounding box (AABB) target to fly to.
         * @param {Number[]} [params.eye] Position to fly the eye position to.
         * @param {Number[]} [params.look]  Position to fly the look position to.
         * @param {Number[]} [params.up] Position to fly the up vector to.
         * @param {String} [params.projection] Projection type to transition into. Can be any of the values of {@link Camera.projection}.
         * @param {Number} [params.fitFOV] How much of field-of-view, in degrees, that a target {@link Entity} or its AABB should fill the canvas on arrival. Overrides {@link CameraFlightAnimation#fitFOV}.
         * @param {Boolean} [params.fit] Whether to fit the target to the view volume. Overrides {@link CameraFlightAnimation#fit}.
         */
        jumpTo(params: any | any): void;
        _jumpTo(params: any): void;
        _update(): void;
        /**
         * Stops an earlier flyTo, fires arrival callback.
         */
        stop(): void;
        /**
         * Cancels an earlier flyTo without calling the arrival callback.
         */
        cancel(): void;
        _duration: number;
        _fit: boolean;
        _fitFOV: number;
        _trail: boolean;
        /**
         * @private
         */
        private destroy;
    }
}
