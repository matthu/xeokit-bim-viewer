/**
 * @private
 */
export class TouchPanRotateAndDollyHandler {
    constructor(scene: any, controllers: any, configs: any, states: any, updates: any);
    _scene: any;
    _onTick: any;
    _canvasTouchStartHandler: (event: any) => void;
    _canvasTouchMoveHandler: (event: any) => void;
    reset(): void;
    destroy(): void;
}
