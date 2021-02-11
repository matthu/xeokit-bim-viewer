/** @private */
export class Label {
    constructor(parentElement: any, cfg?: {});
    _prefix: any;
    _x: number;
    _y: number;
    _visible: boolean;
    _label: HTMLDivElement;
    setPos(x: any, y: any): void;
    setPosOnWire(x1: any, y1: any, x2: any, y2: any): void;
    setPosBetweenWires(x1: any, y1: any, x2: any, y2: any, x3: any, y3: any): void;
    setText(text: any): void;
    setFillColor(color: any): void;
    setBorderColor(color: any): void;
    setOpacity(opacity: any): void;
    setVisible(visible: any): void;
    destroy(): void;
}
