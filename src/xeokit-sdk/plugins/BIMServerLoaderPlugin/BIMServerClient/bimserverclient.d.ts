export default class BimServerClient {
    constructor(baseUrl: any, notifier?: any, translate?: any);
    interfaceMapping: {
        ServiceInterface: string;
        NewServicesInterface: string;
        AuthInterface: string;
        OAuthInterface: string;
        SettingsInterface: string;
        AdminInterface: string;
        PluginInterface: string;
        MetaInterface: string;
        LowLevelInterface: string;
        NotificationRegistryInterface: string;
    };
    translateOverride: any;
    token: any;
    baseUrl: any;
    address: string;
    notifier: any;
    websocketCalls: Map<any, any>;
    webSocket: BimServerApiWebSocket;
    user: any;
    idCounter: number;
    listeners: {};
    serializersByPluginClassName: any[];
    debug: boolean;
    binaryDataListener: {};
    classes: {};
    schemas: {};
    init(callback: any): Promise<any>;
    version: any;
    addSubtypesToSchema(classes: any): void;
    getAllSubTypes(schema: any, typeName: any, callback: any): void;
    log(message: any, message2: any): void;
    translate(key: any): any;
    login(username: any, password: any, callback: any, errorCallback: any, options: any): void;
    downloadViaWebsocket(msg: any): void;
    setBinaryDataListener(topicId: any, listener: any): void;
    clearBinaryDataListener(topicId: any): void;
    processNotification(message: any): void;
    resolveUser(callback: any): void;
    logout(callback: any): void;
    generateRevisionDownloadUrl(settings: any): string;
    generateExtendedDataDownloadUrl(edid: any): string;
    getJsonSerializer(callback: any): void;
    getJsonStreamingSerializer(callback: any): void;
    getSerializerByPluginClassName(pluginClassName: any): any;
    getMessagingSerializerByPluginClassName(pluginClassName: any, callback: any): void;
    register(interfaceName: any, methodName: any, callback: any, registerCallback: any): void;
    registerNewRevisionOnSpecificProjectHandler(poid: any, handler: any, callback: any): void;
    registerNewExtendedDataOnRevisionHandler(roid: any, handler: any, callback: any): void;
    registerNewUserHandler(handler: any, callback: any): void;
    unregisterNewUserHandler(handler: any, callback: any): void;
    unregisterChangeProgressProjectHandler(poid: any, newHandler: any, closedHandler: any, callback: any): void;
    registerChangeProgressProjectHandler(poid: any, newHandler: any, closedHandler: any, callback: any): void;
    unregisterChangeProgressServerHandler(newHandler: any, closedHandler: any, callback: any): void;
    registerChangeProgressServerHandler(newHandler: any, closedHandler: any, callback: any): void;
    unregisterChangeProgressRevisionHandler(roid: any, newHandler: any, closedHandler: any, callback: any): void;
    registerChangeProgressRevisionHandler(poid: any, roid: any, newHandler: any, closedHandler: any, callback: any): void;
    registerNewProjectHandler(handler: any, callback: any): void;
    unregisterNewProjectHandler(handler: any, callback: any): void;
    unregisterNewRevisionOnSpecificProjectHandler(poid: any, handler: any, callback: any): void;
    unregisterNewExtendedDataOnRevisionHandler(roid: any, handler: any, callback: any): void;
    registerProgressHandler(topicId: any, handler: any, callback: any): void;
    unregisterProgressHandler(topicId: any, handler: any, callback: any): void;
    unregister(listener: any): void;
    createRequest(interfaceName: any, method: any, data: any): {
        interface: any;
        method: any;
        parameters: any;
    };
    getJson(address: any, data: any, success: any, error: any): void;
    multiCall(requests: any, callback: any, errorCallback: any, showBusy: any, showDone: any, showError: any, connectWebSocket: any): BimServerApiPromise;
    lastBusyTimeOut: number;
    getModel(poid: any, roid: any, schema: any, deep: any, callback: any, name: any): Model;
    createModel(poid: any, callback: any): Model;
    callWithNoIndication(interfaceName: any, methodName: any, data: any, callback: any, errorCallback: any): BimServerApiPromise;
    callWithFullIndication(interfaceName: any, methodName: any, data: any, callback: any): BimServerApiPromise;
    callWithUserErrorIndication(action: any, data: any, callback: any): BimServerApiPromise;
    callWithUserErrorAndDoneIndication(action: any, data: any, callback: any): BimServerApiPromise;
    isA(schema: any, typeSubject: any, typeName: any): boolean;
    initiateCheckin(project: any, deserializerOid: any, callback: any, errorCallback: any): void;
    checkin(topicId: any, project: any, comment: any, file: any, deserializerOid: any, progressListener: any, success: any, error: any): void;
    addExtendedData(roid: any, title: any, schema: any, data: any, success: any, error: any): void;
    setToken(token: any, callback: any, errorCallback: any): void;
    callWithWebsocket(interfaceName: any, methodName: any, data: any): Promise<any>;
    /**
     * Call a single method, this method delegates to the multiCall method
     * @param {string} interfaceName - Interface name, e.g. "ServiceInterface"
     * @param {string} methodName - Methodname, e.g. "addProject"
     * @param {Object} data - Object with a field per arument
     * @param {Function} callback - Function to callback, first argument in callback will be the returned object
     * @param {Function} errorCallback - Function to callback on error
     * @param {boolean} showBusy - Whether to show busy indication
     * @param {boolean} showDone - Whether to show done indication
     * @param {boolean} showError - Whether to show errors
     *
     */
    call(interfaceName: string, methodName: string, data: any, callback: Function, errorCallback: Function, showBusy?: boolean, showDone?: boolean, showError?: boolean, connectWebSocket?: boolean): BimServerApiPromise;
}
import BimServerApiWebSocket from "@xeokit/xeokit-sdk/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverapiwebsocket";
import BimServerApiPromise from "@xeokit/xeokit-sdk/src/plugins/BIMServerLoaderPlugin/BIMServerClient/bimserverapipromise";
import Model from "@xeokit/xeokit-sdk/src/plugins/BIMServerLoaderPlugin/BIMServerClient/model";
