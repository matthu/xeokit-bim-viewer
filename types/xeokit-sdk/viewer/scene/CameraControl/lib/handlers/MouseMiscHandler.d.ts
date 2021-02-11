/**
 * @private
 */
export class MouseMiscHandler {
    constructor(scene: any, controllers: any, configs: any, states: any, updates: any);
    _scene: any;
    _mouseEnterHandler: () => void;
    _mouseLeaveHandler: () => void;
    _mouseMoveHandler: (e: any) => void;
    _mouseDownHandler: (e: any) => void;
    _mouseUpHandler: (e: any) => void;
    reset(): void;
    destroy(): void;
}
