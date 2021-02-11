/**
 * @private
 */
export default class Model {
    constructor(bimServerApi: any, poid: any, roid: any, schema: any);
    schema: any;
    bimServerApi: any;
    poid: any;
    roid: any;
    waiters: any[];
    objects: {};
    objectsByGuid: {};
    objectsByName: {};
    oidsFetching: {};
    guidsFetching: {};
    namesFetching: {};
    loadedTypes: any[];
    loadedDeep: boolean;
    changedObjectOids: {};
    loading: boolean;
    logging: boolean;
    changes: number;
    changeListeners: any[];
    init(callback: any): void;
    load(deep: any, modelLoadCallback: any): void;
    startTransaction(callback: any): void;
    tid: any;
    checkTransaction(): any;
    create(className: any, object: any, callback: any): any;
    reset(): void;
    commit(comment: any, callback: any): void;
    abort(callback: any): void;
    addChangeListener(changeListener: any): void;
    incrementChanges(): void;
    extendClass(wrapperClass: any, typeName: any): void;
    dumpByType(): void;
    getClass(typeName: any): any;
    createWrapper(object: any, typeName: any): any;
    size(callback: any): void;
    count(type: any, includeAllSubTypes: any, callback: any): void;
    getByX(methodName: any, keyname: any, fetchingMap: any, targetMap: any, query: any, getValueMethod: any, list: any, callback: any): BimServerApiPromise;
    getByGuids(guids: any, callback: any): BimServerApiPromise;
    get(oids: any, callback: any): BimServerApiPromise;
    getByName(names: any, callback: any): BimServerApiPromise;
    query(query: any, callback: any, errorCallback: any): BimServerApiPromise;
    getAllOfType(type: any, includeAllSubTypes: any, callback: any): BimServerApiPromise;
}
import BimServerApiPromise from "@xeokit/xeokit-sdk/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverapipromise";
