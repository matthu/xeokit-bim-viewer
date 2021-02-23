/**
 * @private
 */
export class MousePanRotateDollyHandler {
    constructor(scene: any, controllers: any, configs: any, states: any, updates: any);
    _scene: any;
    _down: boolean;
    _documentKeyDownHandler: (e: any) => void;
    _documentKeyUpHandler: (e: any) => void;
    _mouseDownHandler: (e: any) => void;
    _documentMouseMoveHandler: () => void;
    _canvasMouseMoveHandler: (e: any) => void;
    _documentMouseUpHandler: (e: any) => void;
    _mouseUpHandler: (e: any) => void;
    _mouseEnterHandler: () => void;
    _mouseWheelHandler: (e: any) => void;
    reset(): void;
    destroy(): void;
}
