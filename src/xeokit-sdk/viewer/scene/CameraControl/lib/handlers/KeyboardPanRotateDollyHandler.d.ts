/**
 * @private
 */
export class KeyboardPanRotateDollyHandler {
    constructor(scene: any, controllers: any, configs: any, states: any, updates: any);
    _scene: any;
    _documentMouseMoveHandler: () => void;
    _documentKeyDownHandler: (e: any) => void;
    _documentKeyUpHandler: (e: any) => void;
    _onTick: any;
    reset(): void;
    destroy(): void;
}
