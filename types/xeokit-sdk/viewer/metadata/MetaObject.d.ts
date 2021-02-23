declare module '@xeokit/xeokit-sdk/src/viewer/metadata/MetaObject.js' {
    import { MetaModel } from "@xeokit/xeokit-sdk/src/viewer/metadata/MetaModel.js";
    /**
     * @desc Metadata corresponding to an {@link Entity} that represents an object.
     *
     * An {@link Entity} represents an object when {@link Entity#isObject} is ````true````
     *
     * A MetaObject corresponds to an {@link Entity} by having the same {@link MetaObject#id} as the {@link Entity#id}.
     *
     * A MetaObject is created within {@link MetaScene#createMetaModel} and belongs to a {@link MetaModel}.
     *
     * Each MetaObject is registered by {@link MetaObject#id} in {@link MetaScene#metaObjects}.
     *
     * A {@link MetaModel} represents its object structure with a tree of MetaObjects, with {@link MetaModel#rootMetaObject} referencing
     * the root MetaObject.
     *
     * @class MetaObject
     */
    export class MetaObject {
        constructor(metaModel: any, id: any, originalSystemId: any, name: any, type: any, properties: any, parent: any, children: any, external: any);
        /**
         * Model metadata.
         *
         * @property metaModel
         * @type {MetaModel}
         */
        metaModel: MetaModel;
        /**
         * Globally-unique ID.
         *
         * MetaObject instances are registered by this ID in {@link MetaScene#metaObjects}.
         *
         * @property id
         * @type {String|Number}
         */
        id: string | number;
        /**
         * ID of the corresponding object within the originating system, if any.
         *
         * @type {String}
         * @abstract
         */
        originalSystemId: string;
        /**
         * Human-readable name.
         *
         * @property name
         * @type {String}
         */
        name: string;
        /**
         * Type - often an IFC product type.
         *
         * @property type
         * @type {String}
         */
        type: string;
        /**
         * Arbitrary metadata properties.
         *
         * Undefined when no metadata properties are represented.
         *
         * @property properties
         * @type {*}
         */
        properties: any;
        /**
         * The parent MetaObject within the structure hierarchy.
         *
         * Undefined when this is the root of its structure.
         *
         * @property parent
         * @type {MetaObject}
         */
        parent: MetaObject;
        /**
         * Child ObjectMeta instances within the structure hierarchy.
         *
         * Undefined when there are no children.
         *
         * @property children
         * @type {Array}
         */
        children: any[];
        /**
         * External application-specific metadata
         *
         * Undefined when there are is no external application-specific metadata.
         *
         * @property external
         * @type {*}
         */
        external: any;
        /**
         * Gets the {@link MetaObject#id}s of the {@link MetaObject}s within the subtree.
         *
         * @returns {String[]} Array of {@link MetaObject#id}s.
         */
        getObjectIDsInSubtree(): string[];
        /**
         * Iterates over the {@link MetaObject}s within the subtree.
         *
         * @param {Function} callback Callback fired at each {@link MetaObject}.
         */
        withMetaObjectsInSubtree(callback: Function): void;
        /**
         * Gets the {@link MetaObject#id}s of the {@link MetaObject}s within the subtree that have the given {@link MetaObject#type}s.
         *
         * @param {String[]} types {@link MetaObject#type} values.
         * @returns {String[]} Array of {@link MetaObject#id}s.
         */
        getObjectIDsInSubtreeByType(types: string[]): string[];
        /**
         * Returns properties of this MeteObject as JSON.
         *
         * @returns {{id: (String|Number), type: String, name: String, parent: (String|Number|Undefined)}}
         */
        getJSON(): {
            id: (string | number);
            type: string;
            name: string;
            parent: (string | number | undefined);
        };
    }
}
