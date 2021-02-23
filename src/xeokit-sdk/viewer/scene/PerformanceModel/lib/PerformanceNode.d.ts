/**
 * @private
 */
export class PerformanceNode {
    /**
     * @private
     */
    private constructor();
    _isObject: any;
    /**
     * The {@link Scene} that contains this PerformanceNode.
     *
     * @property scene
     * @type {Scene}
     * @final
     */
    scene: any;
    /**
     * The PerformanceModel that contains this PerformanceNode.
     * @property model
     * @type {PerformanceModel}
     * @final
     */
    model: any;
    /**
     * The PerformanceModelMesh instances contained by this PerformanceNode
     * @property meshes
     * @type {{Array of PerformanceModelMesh}}
     * @final
     */
    meshes: {};
    _numTriangles: number;
    /**
     * ID of this PerformanceNode, unique within the {@link Scene}.
     * @property id
     * @type {String|Number}
     * @final
     */
    id: string | number;
    /**
     * ID of the corresponding object within the originating system.
     *
     * @type {String}
     * @abstract
     */
    originalSystemId: string;
    _flags: any;
    _aabb: any;
    _offsetAABB: any;
    _offset: any;
    /**
     * Returns true to indicate that PerformanceNode is an {@link Entity}.
     * @type {Boolean}
     */
    get isEntity(): boolean;
    /**
     * Always returns ````false```` because a PerformanceNode can never represent a model.
     *
     * @type {Boolean}
     */
    get isModel(): boolean;
    /**
     * Returns ````true```` if this PerformanceNode represents an object.
     *
     * When ````true```` the PerformanceNode will be registered by {@link PerformanceNode#id} in
     * {@link Scene#objects} and may also have a {@link MetaObject} with matching {@link MetaObject#id}.
     *
     * @type {Boolean}
     */
    get isObject(): boolean;
    /**
     * World-space 3D axis-aligned bounding box (AABB) of this PerformanceNode.
     *
     * Represented by a six-element Float64Array containing the min/max extents of the
     * axis-aligned volume, ie. ````[xmin, ymin,zmin,xmax,ymax, zmax]````.
     *
     * @type {Float64Array}
     */
    get aabb(): Float64Array;
    /**
     * The approximate number of triangles in this PerformanceNode.
     *
     * @type {Number}
     */
    get numTriangles(): number;
    /**
     * Sets if this PerformanceNode is visible.
     *
     * Only rendered when {@link PerformanceNode#visible} is ````true```` and {@link PerformanceNode#culled} is ````false````.
     *
     * When both {@link PerformanceNode#isObject} and {@link PerformanceNode#visible} are ````true```` the PerformanceNode will be
     * registered by {@link PerformanceNode#id} in {@link Scene#visibleObjects}.
     *
     * @type {Boolean}
     */
    set visible(arg: boolean);
    /**
     * Gets if this PerformanceNode is visible.
     *
     * Only rendered when {@link PerformanceNode#visible} is ````true```` and {@link PerformanceNode#culled} is ````false````.
     *
     * When both {@link PerformanceNode#isObject} and {@link PerformanceNode#visible} are ````true```` the PerformanceNode will be
     * registered by {@link PerformanceNode#id} in {@link Scene#visibleObjects}.
     *
     * @type {Boolean}
     */
    get visible(): boolean;
    _getFlag(flag: any): boolean;
    /**
     * Sets if this PerformanceNode is highlighted.
     *
     * When both {@link PerformanceNode#isObject} and {@link PerformanceNode#highlighted} are ````true```` the PerformanceNode will be
     * registered by {@link PerformanceNode#id} in {@link Scene#highlightedObjects}.
     *
     * @type {Boolean}
     */
    set highlighted(arg: boolean);
    /**
     * Gets if this PerformanceNode is highlighted.
     *
     * When both {@link PerformanceNode#isObject} and {@link PerformanceNode#highlighted} are ````true```` the PerformanceNode will be
     * registered by {@link PerformanceNode#id} in {@link Scene#highlightedObjects}.
     *
     * @type {Boolean}
     */
    get highlighted(): boolean;
    /**
     * Sets if this PerformanceNode is xrayed.
     *
     * When both {@link PerformanceNode#isObject} and {@link PerformanceNode#xrayed} are ````true```` the PerformanceNode will be
     * registered by {@link PerformanceNode#id} in {@link Scene#xrayedObjects}.
     *
     * @type {Boolean}
     */
    set xrayed(arg: boolean);
    /**
     * Gets if this PerformanceNode is xrayed.
     *
     * When both {@link PerformanceNode#isObject} and {@link PerformanceNode#xrayed} are ````true```` the PerformanceNode will be
     * registered by {@link PerformanceNode#id} in {@link Scene#xrayedObjects}.
     *
     * @type {Boolean}
     */
    get xrayed(): boolean;
    /**
     * Gets if this PerformanceNode is selected.
     *
     * When both {@link PerformanceNode#isObject} and {@link PerformanceNode#selected} are ````true```` the PerformanceNode will be
     * registered by {@link PerformanceNode#id} in {@link Scene#selectedObjects}.
     *
     * @type {Boolean}
     */
    set selected(arg: boolean);
    /**
     * Sets if this PerformanceNode is selected.
     *
     * When both {@link PerformanceNode#isObject} and {@link PerformanceNode#selected} are ````true```` the PerformanceNode will be
     * registered by {@link PerformanceNode#id} in {@link Scene#selectedObjects}.
     *
     * @type {Boolean}
     */
    get selected(): boolean;
    /**
     * Sets if this PerformanceNode's edges are enhanced.
     *
     * @type {Boolean}
     */
    set edges(arg: boolean);
    /**
     * Gets if this PerformanceNode's edges are enhanced.
     *
     * @type {Boolean}
     */
    get edges(): boolean;
    /**
     * Sets if this PerformanceNode is culled.
     *
     * Only rendered when {@link PerformanceNode#visible} is ````true```` and {@link PerformanceNode#culled} is ````false````.
     *
     * @type {Boolean}
     */
    set culled(arg: boolean);
    /**
     * Gets if this PerformanceNode is culled.
     *
     * Only rendered when {@link PerformanceNode#visible} is ````true```` and {@link PerformanceNode#culled} is ````false````.
     *
     * @type {Boolean}
     */
    get culled(): boolean;
    /**
     * Sets if this PerformanceNode is clippable.
     *
     * Clipping is done by the {@link SectionPlane}s in {@link Scene#sectionPlanes}.
     *
     * @type {Boolean}
     */
    set clippable(arg: boolean);
    /**
     * Gets if this PerformanceNode is clippable.
     *
     * Clipping is done by the {@link SectionPlane}s in {@link Scene#sectionPlanes}.
     *
     * @type {Boolean}
     */
    get clippable(): boolean;
    /**
     * Sets if this PerformanceNode is included in boundary calculations.
     *
     * @type {Boolean}
     */
    set collidable(arg: boolean);
    /**
     * Gets if this PerformanceNode is included in boundary calculations.
     *
     * @type {Boolean}
     */
    get collidable(): boolean;
    /**
     * Sets if this PerformanceNode is pickable.
     *
     * Picking is done via calls to {@link Scene#pick}.
     *
     * @type {Boolean}
     */
    set pickable(arg: boolean);
    /**
     * Gets if this PerformanceNode is pickable.
     *
     * Picking is done via calls to {@link Scene#pick}.
     *
     * @type {Boolean}
     */
    get pickable(): boolean;
    /**
     * Sets the PerformanceNode's RGB colorize color.
     *
     * Each element of the color is in range ````[0..1]````.
     *
     * @type {Number[]}
     */
    set colorize(arg: number[]);
    /**
     * Gets the PerformanceNode's RGB colorize color.
     *
     * Each element of the color is in range ````[0..1]````.
     *
     * @type {Number[]}
     */
    get colorize(): number[];
    /**
     * Sets the PerformanceNode's opacity factor, multiplies by the PerformanceNode's rendered fragment alphas.
     *
     * This is a factor in range ````[0..1]````.
     *
     * @type {Number}
     */
    set opacity(arg: number);
    /**
     * Gets the PerformanceNode's opacity factor.
     *
     * This is a factor in range ````[0..1]```` which multiplies by the rendered fragment alphas.
     *
     * @type {Number}
     */
    get opacity(): number;
    /**
     * Sets the PerformanceNode's 3D World-space offset.
     *
     * The offset dynamically translates the PerformanceNode in World-space.
     *
     * Default value is ````[0, 0, 0]````.
     *
     * Provide a null or undefined value to reset to the default value.
     *
     * @type {Number[]}
     */
    set offset(arg: number[]);
    /**
     * Gets the PerformanceNode's 3D World-space offset.
     *
     * Default value is ````[0,0,0]````.
     *
     * @type {Number[]}
     */
    get offset(): number[];
    /**
     * Sets if to this PerformanceNode casts shadows.
     *
     * @type {Boolean}
     */
    set castsShadow(arg: boolean);
    /**
     * Gets if this PerformanceNode casts shadows.
     *
     * @type {Boolean}
     */
    get castsShadow(): boolean;
    /**
     * Whether or not this PerformanceNode can have shadows cast upon it
     *
     * @type {Boolean}
     */
    set receivesShadow(arg: boolean);
    /**
     * Whether or not this PerformanceNode can have shadows cast upon it
     *
     * @type {Boolean}
     */
    get receivesShadow(): boolean;
    /**
     * Gets if Scalable Ambient Obscurance (SAO) will apply to this PerformanceNode.
     *
     * SAO is configured by the Scene's {@link SAO} component.
     *
     * @type {Boolean}
     * @abstract
     */
    get saoEnabled(): boolean;
    _finalize(): void;
    _destroy(): void;
}
