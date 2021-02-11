/**
 * @private
 */
export default class BimServerApiWebSocket {
    constructor(baseUrl: any, bimServerApi: any);
    connected: boolean;
    openCallbacks: any[];
    endPointId: any;
    listener: any;
    tosend: any[];
    tosendAfterConnect: any[];
    messagesReceived: number;
    intervalId: NodeJS.Timeout;
    baseUrl: any;
    bimServerApi: any;
    connect(callback?: any): Promise<any>;
    _ws: WebSocket;
    _onerror(err: any): void;
    _onopen(): void;
    _sendWithoutEndPoint(message: any): void;
    _send(message: any): void;
    send(object: any): void;
    _onmessage(message: any): void;
    _onclose(m: any): void;
    endpointid: any;
}
