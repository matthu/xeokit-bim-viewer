/** @private */
export class Dot {
    constructor(parentElement: any, cfg?: {});
    _x: number;
    _y: number;
    _visible: boolean;
    _dot: HTMLDivElement;
    setPos(x: any, y: any): void;
    setFillColor(color: any): void;
    setBorderColor(color: any): void;
    setOpacity(opacity: any): void;
    setVisible(visible: any): void;
    setClickable(clickable: any): void;
    destroy(): void;
}
