/** @private */
export class Wire {
    constructor(parentElement: any, cfg?: {});
    _wire: HTMLDivElement;
    _visible: boolean;
    _thickness: any;
    _x1: number;
    _y1: number;
    _x2: number;
    _y2: number;
    _update(): void;
    setStartAndEnd(x1: any, y1: any, x2: any, y2: any): void;
    setColor(color: any): void;
    setOpacity(opacity: any): void;
    setVisible(visible: any): void;
    destroy(visible: any): void;
}
