/**
 *
 * @private
 */
export class PickController {
    constructor(cameraControl: any, configs: any);
    _scene: any;
    _cameraControl: any;
    _configs: any;
    /**
     * Set true to schedule picking of an Entity.
     * @type {boolean}
     */
    schedulePickEntity: boolean;
    /**
     * Set true to schedule picking of a position on teh surface of an Entity.
     * @type {boolean}
     */
    schedulePickSurface: boolean;
    /**
     * The canvas position at which to do the next scheduled pick.
     * @type {Number[]}
     */
    pickCursorPos: number[];
    /**
     * Will be true after picking to indicate that something was picked.
     * @type {boolean}
     */
    picked: boolean;
    /**
     * Will be true after picking to indicate that a position on the surface of an Entity was picked.
     * @type {boolean}
     */
    pickedSurface: boolean;
    /**
     * Will hold the PickResult after after picking.
     * @type {PickResult}
     */
    pickResult: any;
    _lastPickedEntityId: any;
    _needFireEvents: boolean;
    /**
     * Immediately attempts a pick, if scheduled.
     */
    update(): void;
    fireEvents(): void;
    destroy(): void;
}
