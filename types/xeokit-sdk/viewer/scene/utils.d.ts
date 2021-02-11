declare module '@xeokit/xeokit-sdk/src/viewer/scene/utils.js' {
    export namespace utils {
        export { xmlToJson };
        export { clone };
        export { compressGuid };
        export { findNodeOfType };
        export { timeout };
        export { httpRequest };
        export { loadJSON };
        export { loadArraybuffer };
        export { queryString };
        export { isArray };
        export { isString };
        export { isNumeric };
        export { isID };
        export { isSameComponent };
        export { isFunction };
        export { isObject };
        export { copy };
        export { apply };
        export { apply2 };
        export { applyIf };
        export { isEmptyObject };
        export { inQuotes };
        export { concat };
        export { flattenParentChildHierarchy };
    }
    /**
     * @private
     */
    function xmlToJson(node: any, attributeRenamer: any): any;
    /**
     * @private
     */
    function clone(ob: any): any;
    /**
     * @private
     */
    function compressGuid(g: any): string;
    /**
     * @private
     */
    function findNodeOfType(m: any, t: any): any[];
    /**
     * @private
     */
    function timeout(dt: any): Promise<any>;
    /**
     * @private
     */
    function httpRequest(args: any): Promise<any>;
    /**
     * @private
     */
    function loadJSON(url: any, ok: any, err: any): void;
    /**
     * @private
     */
    function loadArraybuffer(url: any, ok: any, err: any): void;
    /**
     * @private
     */
    const queryString: {};
    /**
     Tests if the given object is an array
    @private
    */
    function isArray(value: any): boolean;
    /**
     Tests if the given value is a string
    @param value
    @returns {boolean}
    @private
    */
    function isString(value: any): boolean;
    /**
     Tests if the given value is a number
    @param value
    @returns {boolean}
    @private
    */
    function isNumeric(value: any): boolean;
    /**
     Tests if the given value is an ID
    @param value
    @returns {boolean}
    @private
    */
    function isID(value: any): boolean;
    /**
     Tests if the given components are the same, where the components can be either IDs or instances.
    @param c1
    @param c2
    @returns {boolean}
    @private
    */
    function isSameComponent(c1: any, c2: any): boolean;
    /**
     Tests if the given value is a function
    @param value
    @returns {boolean}
    @private
    */
    function isFunction(value: any): boolean;
    /**
     Tests if the given value is a JavaScript JSON object, eg, ````{ foo: "bar" }````.
    @param value
    @returns {boolean}
    @private
    */
    function isObject(value: any): boolean;
    /** Returns a shallow copy
     */
    function copy(o: any): any;
    /** Add properties of o to o2, overwriting them on o2 if already there
     */
    function apply(o: any, o2: any): any;
    /**
     Add non-null/defined properties of o to o2
    @private
    */
    function apply2(o: any, o2: any): any;
    /**
     Add properties of o to o2 where undefined or null on o2
    @private
    */
    function applyIf(o: any, o2: any): any;
    /**
     Returns true if the given map is empty.
    @param obj
    @returns {boolean}
    @private
    */
    function isEmptyObject(obj: any): boolean;
    /**
     Returns the given ID as a string, in quotes if the ID was a string to begin with.
    
    This is useful for logging IDs.
    
    @param {Number| String} id The ID
    @returns {String}
    @private
    */
    function inQuotes(id: number | string): string;
    /**
     Returns the concatenation of two typed arrays.
    @param a
    @param b
    @returns {*|a}
    @private
    */
    function concat(a: any, b: any): any | any;
    function flattenParentChildHierarchy(root: any): any[];
}

