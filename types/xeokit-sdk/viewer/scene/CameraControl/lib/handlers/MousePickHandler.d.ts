/**
 * @private
 */
export class MousePickHandler {
    constructor(scene: any, controllers: any, configs: any, states: any, updates: any);
    _scene: any;
    _clicks: number;
    _timeout: NodeJS.Timeout;
    _lastPickedEntityId: any;
    _canvasMouseMoveHandler: (e: any) => void;
    _canvasMouseDownHandler: (e: any) => void;
    _documentMouseUpHandler: (e: any) => void;
    _canvasMouseUpHandler: (e: any) => void;
    reset(): void;
    destroy(): void;
}
