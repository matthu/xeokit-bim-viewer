declare module '@xeokit/xeokit-sdk/src/viewer/scene/Component.js' {
    /**
     * @desc Base class for all xeokit components.
     *
     * ## Component IDs
     *
     * Every Component has an ID that's unique within the parent {@link Scene}. xeokit generates
     * the IDs automatically by default, however you can also specify them yourself. In the example below, we're creating a
     * scene comprised of {@link Scene}, {@link Material}, {@link ReadableGeometry} and
     * {@link Mesh} components, while letting xeokit generate its own ID for
     * the {@link ReadableGeometry}:
     *
     *````JavaScript
    * import {Viewer} from "../src/viewer/Viewer.js";
    * import {Mesh} from "../src/scene/mesh/Mesh.js";
    * import {buildTorusGeometry} from "../src/scene/geometry/builders/buildTorusGeometry.js";
    * import {ReadableGeometry} from "../src/scene/geometry/ReadableGeometry.js";
    * import {PhongMaterial} from "../src/scene/materials/PhongMaterial.js";
    * import {Texture} from "../src/scene/materials/Texture.js";
    * import {Fresnel} from "../src/scene/materials/Fresnel.js";
    *
    * const viewer = new Viewer({
    *        canvasId: "myCanvas"
    *    });
    *
    * viewer.scene.camera.eye = [0, 0, 5];
    * viewer.scene.camera.look = [0, 0, 0];
    * viewer.scene.camera.up = [0, 1, 0];
    *
    * new Mesh(viewer.scene, {
    *      geometry: new ReadableGeometry(viewer.scene, buildTorusGeometry({
    *          center: [0, 0, 0],
    *          radius: 1.5,
    *          tube: 0.5,
    *          radialSegments: 32,
    *          tubeSegments: 24,
    *          arc: Math.PI * 2.0
    *      }),
    *      material: new PhongMaterial(viewer.scene, {
    *          id: "myMaterial",
    *          ambient: [0.9, 0.3, 0.9],
    *          shininess: 30,
    *          diffuseMap: new Texture(viewer.scene, {
    *              src: "textures/diffuse/uvGrid2.jpg"
    *          }),
    *          specularFresnel: new Fresnel(viewer.scene, {
    *              leftColor: [1.0, 1.0, 1.0],
    *              rightColor: [0.0, 0.0, 0.0],
    *              power: 4
    *          })
    *     })
    * });
    *````
    *
    * We can then find those components like this:
    *
    * ````javascript
    * // Find the Material
    * var material = viewer.scene.components["myMaterial"];
    *
    * // Find all PhongMaterials in the Scene
    * var phongMaterials = viewer.scene.types["PhongMaterial"];
    *
    * // Find our Material within the PhongMaterials
    * var materialAgain = phongMaterials["myMaterial"];
    * ````
    *
    * ## Restriction on IDs
    *
    * Auto-generated IDs are of the form ````"__0"````, ````"__1"````, ````"__2"```` ... and so on.
    *
    * Scene maintains a map of these IDs, along with a counter that it increments each time it generates a new ID.
    *
    * If Scene has created the IDs listed above, and we then destroy the ````Component```` with ID ````"__1"````,
    * Scene will mark that ID as available, and will reuse it for the next default ID.
    *
    * Therefore, two restrictions your on IDs:
    *
    * * don't use IDs that begin with two underscores, and
    * * don't reuse auto-generated IDs of destroyed Components.
    *
    * ## Logging
    *
    * Components have methods to log ID-prefixed messages to the JavaScript console:
    *
    * ````javascript
    * material.log("Everything is fine, situation normal.");
    * material.warn("Wait, whats that red light?");
    * material.error("Aw, snap!");
    * ````
    *
    * The logged messages will look like this in the console:
    *
    * ````text
    * [LOG]   myMaterial: Everything is fine, situation normal.
    * [WARN]  myMaterial: Wait, whats that red light..
    * [ERROR] myMaterial: Aw, snap!
    * ````
    *
    * ## Destruction
    *
    * Get notification of destruction of Components:
    *
    * ````javascript
    * material.once("destroyed", function() {
    *     this.log("Component was destroyed: " + this.id);
    * });
    * ````
    *
    * Or get notification of destruction of any Component within its {@link Scene}:
    *
    * ````javascript
    * scene.on("componentDestroyed", function(component) {
    *     this.log("Component was destroyed: " + component.id);
    * });
    * ````
    *
    * Then destroy a component like this:
    *
    * ````javascript
    * material.destroy();
    * ````
    */
    export class Component {
        constructor(owner?: any, cfg?: {});
        /**
         @private
        */
        private get type();
        /**
         * @private
         */
        private get isComponent();
        /**
         * The parent {@link Scene} that contains this Component.
         *
         * @property scene
         * @type {Scene}
         * @final
         */
        scene: any;
        /**
         * The viewer that contains this Scene.
         * @property viewer
         * @type {Viewer}
         */
        viewer: any;
        _owner: any;
        _renderer: any;
        _dontClear: boolean;
        /**
         Arbitrary, user-defined metadata on this component.

        @property metadata
        @type Object
        */
        meta: any;
        /**
         * ID of this Component, unique within the {@link Scene}.
         *
         * Components are mapped by this ID in {@link Scene#components}.
         *
         * @property id
         * @type {String|Number}
         */
        id: string | number;
        /**
         True as soon as this Component has been destroyed

        @property destroyed
        @type {Boolean}
        */
        destroyed: boolean;
        _attached: {};
        _attachments: {};
        _subIdMap: any;
        _subIdEvents: {};
        _eventSubs: {};
        _eventSubsNum: {};
        _events: {};
        _eventCallDepth: number;
        _ownedComponents: {};
        _updateScheduled: boolean;
        /**
         Indicates that we need to redraw the scene.

        This is called by certain subclasses after they have made some sort of state update that requires the
        renderer to perform a redraw.

        For example: a {@link Mesh} calls this on itself whenever you update its
        {@link Mesh#layer} property, which manually controls its render order in
        relation to other Meshes.

        If this component has a ````castsShadow```` property that's set ````true````, then this will also indicate
        that the renderer needs to redraw shadow map associated with this component. Components like
        {@link DirLight} have that property set when they produce light that creates shadows, while
        components like {@link Mesh"}}layer{{/crossLink}} have that property set when they cast shadows.

        @protected
        */
        protected glRedraw(): void;
        /**
         Indicates that we need to re-sort the renderer's state-ordered drawables list.

        For efficiency, the renderer keeps its list of drawables ordered so that runs of the same state updates can be
        combined.  This method is called by certain subclasses after they have made some sort of state update that would
        require re-ordering of the drawables list.

        For example: a {@link DirLight} calls this on itself whenever you update {@link DirLight#dir}.

        @protected
        */
        protected glResort(): void;
        /**
         * The {@link Component} that owns the lifecycle of this Component, if any.
         *
         * When that component is destroyed, this component will be automatically destroyed also.
         *
         * Will be null if this Component has no owner.
         *
         * @property owner
         * @type {Component}
         */
        get owner(): Component;
        /**
         * Tests if this component is of the given type, or is a subclass of the given type.
         * @type {Boolean}
         */
        isType(type: any): boolean;
        /**
         * Fires an event on this component.
         *
         * Notifies existing subscribers to the event, optionally retains the event to give to
         * any subsequent notifications on the event as they are made.
         *
         * @param {String} event The event type name
         * @param {Object} value The event parameters
         * @param {Boolean} [forget=false] When true, does not retain for subsequent subscribers
         */
        fire(event: string, value: any, forget?: boolean): void;
        /**
         * Subscribes to an event on this component.
         *
         * The callback is be called with this component as scope.
         *
         * @param {String} event The event
         * @param {Function} callback Called fired on the event
         * @param {Object} [scope=this] Scope for the callback
         * @return {String} Handle to the subscription, which may be used to unsubscribe with {@link #off}.
         */
        on(event: string, callback: Function, scope?: any): string;
        /**
         * Cancels an event subscription that was previously made with {@link Component#on} or {@link Component#once}.
         *
         * @param {String} subId Subscription ID
         */
        off(subId: string): void;
        /**
         * Subscribes to the next occurrence of the given event, then un-subscribes as soon as the event is subIdd.
         *
         * This is equivalent to calling {@link Component#on}, and then calling {@link Component#off} inside the callback function.
         *
         * @param {String} event Data event to listen to
         * @param {Function} callback Called when fresh data is available at the event
         * @param {Object} [scope=this] Scope for the callback
         */
        once(event: string, callback: Function, scope?: any): void;
        /**
         * Returns true if there are any subscribers to the given event on this component.
         *
         * @param {String} event The event
         * @return {Boolean} True if there are any subscribers to the given event on this component.
         */
        hasSubs(event: string): boolean;
        /**
         * Logs a console debugging message for this component.
         *
         * The console message will have this format: *````[LOG] [<component type> <component id>: <message>````*
         *
         * Also fires the message as a "log" event on the parent {@link Scene}.
         *
         * @param {String} message The message to log
         */
        log(message: string): void;
        _message(message: any): string;
        /**
         * Logs a warning for this component to the JavaScript console.
         *
         * The console message will have this format: *````[WARN] [<component type> =<component id>: <message>````*
         *
         * Also fires the message as a "warn" event on the parent {@link Scene}.
         *
         * @param {String} message The message to log
         */
        warn(message: string): void;
        /**
         * Logs an error for this component to the JavaScript console.
         *
         * The console message will have this format: *````[ERROR] [<component type> =<component id>: <message>````*
         *
         * Also fires the message as an "error" event on the parent {@link Scene}.
         *
         * @param {String} message The message to log
         */
        error(message: string): void;
        /**
         * Adds a child component to this.
         *
         * When component not given, attaches the scene's default instance for the given name (if any).
         * Publishes the new child component on this component, keyed to the given name.
         *
         * @param {*} params
         * @param {String} params.name component name
         * @param {Component} [params.component] The component
         * @param {String} [params.type] Optional expected type of base type of the child; when supplied, will
         * cause an exception if the given child is not the same type or a subtype of this.
         * @param {Boolean} [params.sceneDefault=false]
         * @param {Boolean} [params.sceneSingleton=false]
         * @param {Function} [params.onAttached] Optional callback called when component attached
         * @param {Function} [params.onAttached.callback] Callback function
         * @param {Function} [params.onAttached.scope] Optional scope for callback
         * @param {Function} [params.onDetached] Optional callback called when component is detached
         * @param {Function} [params.onDetached.callback] Callback function
         * @param {Function} [params.onDetached.scope] Optional scope for callback
         * @param {{String:Function}} [params.on] Callbacks to subscribe to properties on component
         * @param {Boolean} [params.recompiles=true] When true, fires "dirty" events on this component
         * @private
         */
        private _attach;
        _checkComponent(expectedType: any, component: any): any;
        _checkComponent2(expectedTypes: any, component: any): any;
        _own(component: any): void;
        /**
         * Protected method, called by sub-classes to queue a call to _update().
         * @protected
         * @param {Number} [priority=1]
         */
        protected _needUpdate(priority?: number): void;
        /**
         * @private
         */
        private _doUpdate;
        /**
         * Protected virtual template method, optionally implemented
         * by sub-classes to perform a scheduled task.
         *
         * @protected
         */
        protected _update(): void;
        /**
         * Destroys all {@link Component}s that are owned by this. These are Components that were instantiated with
         * this Component as their first constructor argument.
         */
        clear(): void;
        /**
         * Destroys this component.
         */
        destroy(): void;
    }
}
