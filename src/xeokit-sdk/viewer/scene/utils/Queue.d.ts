/** @private */
export class Queue {
    _head: any[];
    _headLength: number;
    _tail: any[];
    _index: number;
    _length: number;
    get length(): number;
    shift(): any;
    push(item: any): Queue;
    unshift(item: any): Queue;
}
