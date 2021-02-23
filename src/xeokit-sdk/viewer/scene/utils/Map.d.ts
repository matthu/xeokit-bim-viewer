/** @private */
export class Map {
    constructor(items?: any, baseId?: any);
    items: any;
    _lastUniqueId: any;
    /**
     * Usage:
     *
     * id = myMap.addItem("foo") // ID internally generated
     * id = myMap.addItem("foo", "bar") // ID is "foo"
     */
    addItem(...args: any[]): any;
    removeItem(id: any): any;
}
