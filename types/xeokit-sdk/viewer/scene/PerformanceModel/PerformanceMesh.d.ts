/**
 * @private
 * @implements Pickable
 */
export class PerformanceMesh {
    constructor(model: any, id: any, color: any, opacity: any, layer?: any, portionId?: number);
    /**
     * The PerformanceModel that contains this PerformanceModelMesh.
     *
     * A PerformanceModelMesh always belongs to exactly one PerformanceModel.
     *
     * @property model
     * @type {PerformanceModel}
     * @final
     */
    model: any;
    /**
     * The PerformanceNode that contains this PerformanceModelMesh.
     *
     * A PerformanceModelMesh always belongs to exactly one PerformanceNode.
     *
     * @property object
     * @type {PerformanceNode}
     * @final
     */
    object: any;
    /**
     * The PerformanceNode that contains this PerformanceModelMesh.
     *
     * A PerformanceModelMesh always belongs to exactly one PerformanceNode.
     *
     * @property object
     * @type {PerformanceNode}
     * @final
     */
    parent: any;
    /**
     * ID of this PerformanceModelMesh, unique within the xeokit.Scene.
     *
     * @property id
     * @type {String}
     * @final
     */
    id: string;
    /**
     *
     * @type {Number}
     * @private
     */
    private pickId;
    /**
     * World-space 3D axis-aligned bounding box (AABB).
     *
     * Represented by a six-element Float64Array containing the min/max extents of the
     * axis-aligned volume, ie. ````[xmin, ymin,zmin,xmax,ymax, zmax]````.
     *
     * @property aabb
     * @final
     * @type {Float64Array}
     */
    aabb: Float64Array;
    _layer: any;
    _portionId: number;
    _color: any[];
    _colorize: any[];
    _colorizing: boolean;
    _transparent: boolean;
    numTriangles: number;
    /**
     * 3D origin of the PerformanceMesh's vertex positions, if they are in relative-to-center (RTC) coordinates.
     *
     * When this is defined, then the positions are RTC, which means that they are relative to this position.
     *
     * @property rtcCenter
     * @type {Float64Array}
     */
    rtcCenter: Float64Array;
    /**
     * @private
     */
    private _finalize;
    /**
     * @private
     */
    private _setVisible;
    /**
     * @private
     */
    private _setColor;
    /** @private */
    private _setColorize;
    /** @private */
    private _setOpacity;
    /**
     * @private
     */
    private _setOffset;
    /**
     * @private
     */
    private _setHighlighted;
    /**
     * @private
     */
    private _setXRayed;
    /**
     * @private
     */
    private _setSelected;
    /**
     * @private
     */
    private _setEdges;
    /**
     * @private
     */
    private _setClippable;
    /**
     * @private
     */
    private _setCollidable;
    /**
     * @private
     */
    private _setPickable;
    /**
     * @private
     */
    private _setCulled;
    /** @private */
    private canPickTriangle;
    /** @private */
    private drawPickTriangles;
    /** @private */
    private pickTriangleSurface;
    /** @private */
    private canPickWorldPos;
    /** @private */
    private drawPickDepths;
    /** @private */
    private drawPickNormals;
    /**
     * @private
     * @returns {PerformanceNode}
     */
    private delegatePickedEntity;
    /**
     * @private
     */
    private _destroy;
}
