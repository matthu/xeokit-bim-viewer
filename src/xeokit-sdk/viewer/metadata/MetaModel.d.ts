/**
 * @desc Metadata corresponding to an {@link Entity} that represents a model.
 *
 * An {@link Entity} represents a model when {@link Entity#isModel} is ````true````
 *
 * A MetaModel corresponds to an {@link Entity} by having the same {@link MetaModel#id} as the {@link Entity#id}.
 *
 * A MetaModel is created by {@link MetaScene#createMetaModel} and belongs to a {@link MetaScene}.
 *
 * Each MetaModel is registered by {@link MetaModel#id} in {@link MetaScene#metaModels}.
 *
 * A {@link MetaModel} represents its object structure with a tree of {@link MetaObject}s, with {@link MetaModel#rootMetaObject} referencing the root {@link MetaObject}.
 *
 * @class MetaModel
 */
export class MetaModel {
    /**
     * @private
     */
    private constructor();
    /**
     * Globally-unique ID.
     *
     * MetaModels are registered by ID in {@link MetaScene#metaModels}.
     *
     * When this MetaModel corresponds to an {@link Entity} then this ID will match the {@link Entity#id}.
     *
     * @property id
     * @type {String|Number}
     */
    id: string | number;
    /**
     * The project ID
     * @property projectId
     * @type {String|Number}
     */
    projectId: string | number;
    /**
     * The revision ID, if available.
     *
     * Will be undefined if not available.
     *
     * @property revisionId
     * @type {String|Number}
     */
    revisionId: string | number;
    /**
     * The model author, if available.
     *
     * Will be undefined if not available.
     *
     * @property author
     * @type {String}
     */
    author: string;
    /**
     * The date the model was created, if available.
     *
     * Will be undefined if not available.
     *
     * @property createdAt
     * @type {String}
     */
    createdAt: string;
    /**
     * The application that created the model, if available.
     *
     * Will be undefined if not available.
     *
     * @property creatingApplication
     * @type {String}
     */
    creatingApplication: string;
    /**
     * The model schema version, if available.
     *
     * Will be undefined if not available.
     *
     * @property schema
     * @type {String}
     */
    schema: string;
    /**
     * Metadata on the {@link Scene}.
     *
     * @property metaScene
     * @type {MetaScene}
     */
    metaScene: any;
    /**
     * The root {@link MetaObject} in this MetaModel's composition structure hierarchy.
     *
     * @property rootMetaObject
     * @type {MetaObject}
     */
    rootMetaObject: any;
    getJSON(): {
        id: string | number;
        projectId: string | number;
        revisionId: string | number;
        metaObjects: any[];
    };
}
