declare module '@xeokit/xeokit-sdk/src/viewer/metadata/MetaScene.js' {
    import { MetaModel } from "@xeokit/xeokit-sdk/src/viewer/metadata/MetaModel.js";
    import { MetaObject } from "@xeokit/xeokit-sdk/src/viewer/metadata/MetaObject.js";
    import { Viewer } from "@xeokit/xeokit-sdk/src/viewer/Viewer.js";
    import { Scene } from "@xeokit/xeokit-sdk/src/viewer/scene/scene/Scene.js";
    /**
     * @desc Metadata corresponding to a {@link Scene}.
     *
     * * Located in {@link Viewer#metaScene}.
     * * Contains {@link MetaModel}s and {@link MetaObject}s.
     * * [Scene Graphs user guide](https://github.com/xeokit/xeokit-sdk/wiki/Scene-Graphs)
     * * [Scene graph example with metadata](http://xeokit.github.io/xeokit-sdk/examples/#sceneRepresentation_SceneGraph_metadata)
     */
    export class MetaScene {
        /**
         * @private
         */
        private constructor();
        /**
         * The {@link Viewer}.
         * @property viewer
         * @type {Viewer}
         */
        viewer: Viewer;
        /**
         * The {@link Scene}.
         * @property scene
         * @type {Scene}
         */
        scene: Scene;
        /**
         * The {@link MetaModel}s belonging to this MetaScene, each mapped to its {@link MetaModel#modelId}.
         *
         * @type {{String:MetaModel}}
         */
        metaModels: {[id: string]: MetaModel};
        /**
         * The {@link MetaObject}s belonging to this MetaScene, each mapped to its {@link MetaObject#id}.
         *
         * @type {{String:MetaObject}}
         */
        metaObjects: {[id: string]: MetaObject};
        /**
         * The {@link MetaObject}s belonging to this MetaScene, each mapped to its {@link MetaObject#type}.
         *
         * @type {{String:MetaObject}}
         */
        metaObjectsByType: {[id: string]: MetaObject};
        /**
         * Tracks number of MetaObjects of each type.
         * @private
         */
        private _typeCounts;
        /**
         * Subscriptions to events sent with {@link fire}.
         * @private
         */
        private _eventSubs;
        /**
         * Subscribes to an event fired at this Viewer.
         *
         * @param {String} event The event
         * @param {Function} callback Callback fired on the event
         */
        on(event: string, callback: Function): void;
        /**
         * Fires an event at this Viewer.
         *
         * @param {String} event Event name
         * @param {Object} value Event parameters
         */
        fire(event: string, value: any): void;
        /**
         * Unsubscribes from an event fired at this Viewer.
         * @param event
         */
        off(event: any): void;
        /**
         * Creates a {@link MetaModel} in this MetaScene.
         *
         * @param {String} modelId ID for the new {@link MetaModel}, which will have {@link MetaModel#id} set to this value.
         * @param {Object} metaModelData Data for the {@link MetaModel} - (see [Model Metadata](https://github.com/xeolabs/xeokit.io/wiki/Model-Metadata)).
         * @param {Object} [options] Options for creating the {@link MetaModel}.
         * @param {Object} [options.includeTypes] When provided, only create {@link MetaObject}s with types in this list.
         * @param {Object} [options.excludeTypes] When provided, never create {@link MetaObject}s with types in this list.
         * @param {Boolean} [options.globalizeObjectIds=false] Whether to globalize each {@link MetaObject#id}. Set
         * this ````true```` when you need to load multiple instances of the same meta model, to avoid ID clashes between
         * the meta objects in the different instances.
         * @returns {MetaModel} The new MetaModel.
         */
        createMetaModel(modelId: string, metaModelData: any, options?: {
            includeTypes: any;
            excludeTypes: any;
            globalizeObjectIds: boolean;
        }): MetaModel;
        /**
         * Removes a {@link MetaModel} from this MetaScene.
         *
         * Fires a "metaModelDestroyed" event with the value of the {@link MetaModel#id}.
         *
         * @param {String} id ID of the target {@link MetaModel}.
         */
        destroyMetaModel(id: string): void;
        /**
         * Gets the {@link MetaObject#id}s of the {@link MetaObject}s that have the given {@link MetaObject#type}.
         *
         * @param {String} type The type.
         * @returns {String[]} Array of {@link MetaObject#id}s.
         */
        getObjectIDsByType(type: string): string[];
        /**
         * Gets the {@link MetaObject#id}s of the {@link MetaObject}s within the given subtree.
         *
         * @param {String} id  ID of the root {@link MetaObject} of the given subtree.
         * @param {String[]} [includeTypes] Optional list of types to include.
         * @param {String[]} [excludeTypes] Optional list of types to exclude.
         * @returns {String[]} Array of {@link MetaObject#id}s.
         */
        getObjectIDsInSubtree(id: string, includeTypes?: string[], excludeTypes?: string[]): string[];
        /**
         * Iterates over the {@link MetaObject}s within the subtree.
         *
         * @param {String} id ID of root {@link MetaObject}.
         * @param {Function} callback Callback fired at each {@link MetaObject}.
         */
        withMetaObjectsInSubtree(id: string, callback: Function): void;
    }
}
