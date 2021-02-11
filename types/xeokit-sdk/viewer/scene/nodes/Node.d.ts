/**
 * @desc An {@link Entity} that is a scene graph node that can have child Nodes and {@link Mesh}es.
 *
 * ## Usage
 *
 * The example below is the same as the one given for {@link Mesh}, since the two classes work together. In this example,
 * we'll create a scene graph in which a root Node represents a group and the {@link Mesh}s are leaves. Since Node
 * implements {@link Entity}, we can designate the root Node as a model, causing it to be registered by its ID in {@link Scene#models}.
 *
 * Since {@link Mesh} also implements {@link Entity}, we can designate the leaf {@link Mesh}es as objects, causing them to
 * be registered by their IDs in {@link Scene#objects}.
 *
 * We can then find those {@link Entity} types in {@link Scene#models} and {@link Scene#objects}.
 *
 * We can also update properties of our object-Meshes via calls to {@link Scene#setObjectsHighlighted} etc.
 *
 * [[Run this example](http://xeokit.github.io/xeokit-sdk/examples/#sceneRepresentation_SceneGraph)]
 *
 * ````javascript
 * import {Viewer} from "../src/viewer/Viewer.js";
 * import {Mesh} from "../src/scene/mesh/Mesh.js";
 * import {Node} from "../src/scene/nodes/Node.js";
 * import {PhongMaterial} from "../src/scene/materials/PhongMaterial.js";
 *
 * const viewer = new Viewer({
 *     canvasId: "myCanvas"
 * });
 *
 * viewer.scene.camera.eye = [-21.80, 4.01, 6.56];
 * viewer.scene.camera.look = [0, -5.75, 0];
 * viewer.scene.camera.up = [0.37, 0.91, -0.11];
 *
 * new Node(viewer.scene, {
 *      id: "table",
 *      isModel: true, // <---------- Node represents a model, so is registered by ID in viewer.scene.models
 *      rotation: [0, 50, 0],
 *      position: [0, 0, 0],
 *      scale: [1, 1, 1],
 *
 *      children: [
 *
 *          new Mesh(viewer.scene, { // Red table leg
 *              id: "redLeg",
 *              isObject: true, // <------ Node represents an object, so is registered by ID in viewer.scene.objects
 *              position: [-4, -6, -4],
 *              scale: [1, 3, 1],
 *              rotation: [0, 0, 0],
 *              material: new PhongMaterial(viewer.scene, {
 *                  diffuse: [1, 0.3, 0.3]
 *              })
 *          }),
 *
 *          new Mesh(viewer.scene, { // Green table leg
 *              id: "greenLeg",
 *              isObject: true, // <------ Node represents an object, so is registered by ID in viewer.scene.objects
 *              position: [4, -6, -4],
 *              scale: [1, 3, 1],
 *              rotation: [0, 0, 0],
 *              material: new PhongMaterial(viewer.scene, {
 *                  diffuse: [0.3, 1.0, 0.3]
 *              })
 *          }),
 *
 *          new Mesh(viewer.scene, {// Blue table leg
 *              id: "blueLeg",
 *              isObject: true, // <------ Node represents an object, so is registered by ID in viewer.scene.objects
 *              position: [4, -6, 4],
 *              scale: [1, 3, 1],
 *              rotation: [0, 0, 0],
 *              material: new PhongMaterial(viewer.scene, {
 *                  diffuse: [0.3, 0.3, 1.0]
 *              })
 *          }),
 *
 *          new Mesh(viewer.scene, {  // Yellow table leg
 *              id: "yellowLeg",
 *              isObject: true, // <------ Node represents an object, so is registered by ID in viewer.scene.objects
 *              position: [-4, -6, 4],
 *              scale: [1, 3, 1],
 *              rotation: [0, 0, 0],
 *              material: new PhongMaterial(viewer.scene, {
 *                   diffuse: [1.0, 1.0, 0.0]
 *              })
 *          }),
 *
 *          new Mesh(viewer.scene, { // Purple table top
 *              id: "tableTop",
 *              isObject: true, // <------ Node represents an object, so is registered by ID in viewer.scene.objects
 *              position: [0, -3, 0],
 *              scale: [6, 0.5, 6],
 *              rotation: [0, 0, 0],
 *              material: new PhongMaterial(viewer.scene, {
 *                  diffuse: [1.0, 0.3, 1.0]
 *              })
 *          })
 *      ]
 *  });
 *
 * // Find Nodes and Meshes by their IDs
 *
 * var table = viewer.scene.models["table"];                // Since table Node has isModel == true
 *
 * var redLeg = viewer.scene.objects["redLeg"];             // Since the Meshes have isObject == true
 * var greenLeg = viewer.scene.objects["greenLeg"];
 * var blueLeg = viewer.scene.objects["blueLeg"];
 *
 * // Highlight one of the table leg Meshes
 *
 * viewer.scene.setObjectsHighlighted(["redLeg"], true);    // Since the Meshes have isObject == true
 *
 * // Periodically update transforms on our Nodes and Meshes
 *
 * viewer.scene.on("tick", function () {
 *
 *       // Rotate legs
 *       redLeg.rotateY(0.5);
 *       greenLeg.rotateY(0.5);
 *       blueLeg.rotateY(0.5);
 *
 *       // Rotate table
 *       table.rotateY(0.5);
 *       table.rotateX(0.3);
 *   });
 * ````
 *
 * ## Metadata
 *
 * As mentioned, we can also associate {@link MetaModel}s and {@link MetaObject}s with our Nodes and {@link Mesh}es,
 * within a {@link MetaScene}. See {@link MetaScene} for an example.
 *
 * @implements {Entity}
 */
export class Node {
    /**
     * @constructor
     * @param {Component} owner Owner component. When destroyed, the owner will destroy this component as well.
     * @param {*} [cfg] Configs
     * @param {String} [cfg.id] Optional ID, unique among all components in the parent scene, generated automatically when omitted.
     * @param {Boolean} [cfg.isModel] Specify ````true```` if this Mesh represents a model, in which case the Mesh will be registered by {@link Mesh#id} in {@link Scene#models} and may also have a corresponding {@link MetaModel} with matching {@link MetaModel#id}, registered by that ID in {@link MetaScene#metaModels}.
     * @param {Boolean} [cfg.isObject] Specify ````true```` if this Mesh represents an object, in which case the Mesh will be registered by {@link Mesh#id} in {@link Scene#objects} and may also have a corresponding {@link MetaObject} with matching {@link MetaObject#id}, registered by that ID in {@link MetaScene#metaObjects}.
     * @param {Node} [cfg.parent] The parent Node.
     * @param {Number[]} [cfg.rtcCenter] Relative-to-center (RTC) coordinate system center for this Node.
     * @param {Number[]} [cfg.position=[0,0,0]] Local 3D position.
     * @param {Number[]} [cfg.scale=[1,1,1]] Local scale.
     * @param {Number[]} [cfg.rotation=[0,0,0]] Local rotation, as Euler angles given in degrees, for each of the X, Y and Z axis.
     * @param {Number[]} [cfg.matrix=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1] Local modelling transform matrix. Overrides the position, scale and rotation parameters.
     * @param {Number[]} [cfg.offset=[0,0,0]] World-space 3D translation offset. Translates the Node in World space, after modelling transforms.
     * @param {Boolean} [cfg.visible=true] Indicates if the Node is initially visible.
     * @param {Boolean} [cfg.culled=false] Indicates if the Node is initially culled from view.
     * @param {Boolean} [cfg.pickable=true] Indicates if the Node is initially pickable.
     * @param {Boolean} [cfg.clippable=true] Indicates if the Node is initially clippable.
     * @param {Boolean} [cfg.collidable=true] Indicates if the Node is initially included in boundary calculations.
     * @param {Boolean} [cfg.castsShadow=true] Indicates if the Node initially casts shadows.
     * @param {Boolean} [cfg.receivesShadow=true]  Indicates if the Node initially receives shadows.
     * @param {Boolean} [cfg.xrayed=false] Indicates if the Node is initially xrayed.
     * @param {Boolean} [cfg.highlighted=false] Indicates if the Node is initially highlighted.
     * @param {Boolean} [cfg.selected=false] Indicates if the Mesh is initially selected.
     * @param {Boolean} [cfg.edges=false] Indicates if the Node's edges are initially emphasized.
     * @param {Number[]} [cfg.colorize=[1.0,1.0,1.0]] Node's initial RGB colorize color, multiplies by the rendered fragment colors.
     * @param {Number} [cfg.opacity=1.0] Node's initial opacity factor, multiplies by the rendered fragment alpha.
     * @param {Array} [cfg.children] Child Nodes or {@link Mesh}es to add initially. Children must be in the same {@link Scene} and will be removed first from whatever parents they may already have.
     * @param {Boolean} [cfg.inheritStates=true] Indicates if children given to this constructor should inherit rendering state from this parent as they are added. Rendering state includes {@link Node#visible}, {@link Node#culled}, {@link Node#pickable}, {@link Node#clippable}, {@link Node#castsShadow}, {@link Node#receivesShadow}, {@link Node#selected}, {@link Node#highlighted}, {@link Node#colorize} and {@link Node#opacity}.
     */
    constructor(owner: any, cfg?: any);
    _parentNode: any;
    _children: any[];
    _aabb: any;
    _aabbDirty: boolean;
    _numTriangles: number;
    _scale: any;
    _quaternion: any;
    _rotation: any;
    _position: any;
    _offset: any;
    _localMatrix: any;
    _worldMatrix: any;
    _localMatrixDirty: boolean;
    _worldMatrixDirty: boolean;
    /**
     * Sets the Node's local modeling transform matrix.
     *
     * Default value is ````[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]````.
     *
     * @type {Number[]}
     */
    set matrix(arg: number[]);
    /**
     * Gets the Node's local modeling transform matrix.
     *
     * Default value is ````[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]````.
     *
     * @type {Number[]}
     */
    get matrix(): number[];
    /**
     * Sets the Node's local scale.
     *
     * Default value is ````[1,1,1]````.
     *
     * @type {Number[]}
     */
    set scale(arg: number[]);
    /**
     * Gets the Node's local scale.
     *
     * Default value is ````[1,1,1]````.
     *
     * @type {Number[]}
     */
    get scale(): number[];
    /**
     * Sets the Node's local translation.
     *
     * Default value is ````[0,0,0]````.
     *
     * @type {Number[]}
     */
    set position(arg: number[]);
    /**
     * Gets the Node's local translation.
     *
     * Default value is ````[0,0,0]````.
     *
     * @type {Number[]}
     */
    get position(): number[];
    /**
     * Sets the Node's local rotation, as Euler angles given in degrees, for each of the X, Y and Z axis.
     *
     * Default value is ````[0,0,0]````.
     *
     * @type {Number[]}
     */
    set rotation(arg: number[]);
    /**
     * Gets the Node's local rotation, as Euler angles given in degrees, for each of the X, Y and Z axis.
     *
     * Default value is ````[0,0,0]````.
     *
     * @type {Number[]}
     */
    get rotation(): number[];
    _isModel: any;
    _isObject: any;
    /**
     * Sets the center of the relative-to-center (RTC) coordinate system for this Node and all child Nodes and {@link Mesh}s.
     *
     * @type {Float64Array}
     */
    set rtcCenter(arg: Float64Array);
    /**
     *  Gets the center of the relative-to-center (RTC) coordinate system for this Node and all child Nodes and {@link Mesh}s.
     *
     * @type {Float64Array}
     */
    get rtcCenter(): Float64Array;
    /**
     * Sets if this Node and all child Nodes and {@link Mesh}es are visible.
     *
     * Only rendered both {@link Node#visible} is ````true```` and {@link Node#culled} is ````false````.
     *
     * When {@link Node#isObject} and {@link Node#visible} are both ````true```` the Node will be
     * registered by {@link Node#id} in {@link Scene#visibleObjects}.
     *
     * @type {Boolean}
     */
    set visible(arg: boolean);
    /**
     * Gets if this Node is visible.
     *
     * Child Nodes and {@link Mesh}es may have different values for this property.
     *
     * When {@link Node#isObject} and {@link Node#visible} are both ````true```` the Node will be
     * registered by {@link Node#id} in {@link Scene#visibleObjects}.
     *
     * @type {Boolean}
     */
    get visible(): boolean;
    /**
     * Sets if this Node and all child Nodes and {@link Mesh}es are culled.
     *
     * @type {Boolean}
     */
    set culled(arg: boolean);
    /**
     * Gets if this Node is culled.
     *
     * @type {Boolean}
     */
    get culled(): boolean;
    /**
     * Sets if this Node and all child Nodes and {@link Mesh}es are pickable.
     *
     * Picking is done via calls to {@link Scene#pick}.
     *
     * @type {Boolean}
     */
    set pickable(arg: boolean);
    /**
     * Gets if to this Node is pickable.
     *
     * Picking is done via calls to {@link Scene#pick}.
     *
     * Child Nodes and {@link Mesh}es may have different values for this property.
     *
     * @type {Boolean}
     */
    get pickable(): boolean;
    /**
     * Sets if this Node and all child Nodes and {@link Mesh}es are clippable.
     *
     * Clipping is done by the {@link SectionPlane}s in {@link Scene#clips}.
     *
     * @type {Boolean}
     */
    set clippable(arg: boolean);
    /**
     * Gets if this Node is clippable.
     *
     * Clipping is done by the {@link SectionPlane}s in {@link Scene#clips}.
     *
     * Child Nodes and {@link Mesh}es may have different values for this property.
     *
     * @type {Boolean}
     */
    get clippable(): boolean;
    /**
     * Sets if this Node and all child Nodes and {@link Mesh}es are included in boundary calculations.
     *
     * @type {Boolean}
     */
    set collidable(arg: boolean);
    /**
     * Gets if this Node is included in boundary calculations.
     *
     * Child Nodes and {@link Mesh}es may have different values for this property.
     *
     * @type {Boolean}
     */
    get collidable(): boolean;
    /**
     * Sets if this Node and all child Nodes and {@link Mesh}es cast shadows.
     *
     * @type {Boolean}
     */
    set castsShadow(arg: boolean);
    /**
     * Gets if this Node casts shadows.
     *
     * Child Nodes and {@link Mesh}es may have different values for this property.
     *
     * @type {Boolean}
     */
    get castsShadow(): boolean;
    /**
     * Sets if this Node and all child Nodes and {@link Mesh}es can have shadows cast upon them.
     *
     * @type {Boolean}
     */
    set receivesShadow(arg: boolean);
    /**
     * Whether or not to this Node can have shadows cast upon it.
     *
     * Child Nodes and {@link Mesh}es may have different values for this property.
     *
     * @type {Boolean}
     */
    get receivesShadow(): boolean;
    /**
     * Sets if this Node and all child Nodes and {@link Mesh}es are xrayed.
     *
     * When {@link Node#isObject} and {@link Node#xrayed} are both ````true```` the Node will be
     * registered by {@link Node#id} in {@link Scene#xrayedObjects}.
     *
     * @type {Boolean}
     */
    set xrayed(arg: boolean);
    /**
     * Gets if this Node is xrayed.
     *
     * When {@link Node#isObject} and {@link Node#xrayed} are both ````true```` the Node will be
     * registered by {@link Node#id} in {@link Scene#xrayedObjects}.
     *
     * Child Nodes and {@link Mesh}es may have different values for this property.
     *
     * @type {Boolean}
     */
    get xrayed(): boolean;
    /**
     * Sets if this Node and all child Nodes and {@link Mesh}es are highlighted.
     *
     * When {@link Node#isObject} and {@link Node#highlighted} are both ````true```` the Node will be
     * registered by {@link Node#id} in {@link Scene#highlightedObjects}.
     *
     * @type {Boolean}
     */
    set highlighted(arg: boolean);
    /**
     * Gets if this Node is highlighted.
     *
     * When {@link Node#isObject} and {@link Node#highlighted} are both ````true```` the Node will be
     * registered by {@link Node#id} in {@link Scene#highlightedObjects}.
     *
     * Child Nodes and {@link Mesh}es may have different values for this property.
     *
     * @type {Boolean}
     */
    get highlighted(): boolean;
    /**
     * Sets if this Node and all child Nodes and {@link Mesh}es are selected.
     *
     * When {@link Node#isObject} and {@link Node#selected} are both ````true```` the Node will be
     * registered by {@link Node#id} in {@link Scene#selectedObjects}.
     *
     * @type {Boolean}
     */
    set selected(arg: boolean);
    /**
     * Gets if this Node is selected.
     *
     * When {@link Node#isObject} and {@link Node#selected} are both ````true```` the Node will be
     * registered by {@link Node#id} in {@link Scene#selectedObjects}.
     *
     * Child Nodes and {@link Mesh}es may have different values for this property.
     *
     * @type {Boolean}
     */
    get selected(): boolean;
    /**
     * Sets if this Node and all child Nodes and {@link Mesh}es are edge-enhanced.
     *
     * @type {Boolean}
     */
    set edges(arg: boolean);
    /**
     * Gets if this Node's edges are enhanced.
     *
     * Child Nodes and {@link Mesh}es may have different values for this property.
     *
     * @type {Boolean}
     */
    get edges(): boolean;
    /**
     * Sets the RGB colorize color for this Node and all child Nodes and {@link Mesh}es}.
     *
     * Multiplies by rendered fragment colors.
     *
     * Each element of the color is in range ````[0..1]````.
     *
     * @type {Number[]}
     */
    set colorize(arg: number[]);
    /**
     * Gets the RGB colorize color for this Node.
     *
     * Each element of the color is in range ````[0..1]````.
     *
     * Child Nodes and {@link Mesh}es may have different values for this property.
     *
     * @type {Number[]}
     */
    get colorize(): number[];
    /**
     * Sets the opacity factor for this Node and all child Nodes and {@link Mesh}es.
     *
     * This is a factor in range ````[0..1]```` which multiplies by the rendered fragment alphas.
     *
     * @type {Number}
     */
    set opacity(arg: number);
    /**
     * Gets this Node's opacity factor.
     *
     * This is a factor in range ````[0..1]```` which multiplies by the rendered fragment alphas.
     *
     * Child Nodes and {@link Mesh}es may have different values for this property.
     *
     * @type {Number}
     */
    get opacity(): number;
    /**
     * Sets the 3D World-space offset for this Node and all child Nodes and {@link Mesh}es}.
     *
     * The offset dynamically translates those components in World-space.
     *
     * Default value is ````[0, 0, 0]````.
     *
     * Note that child Nodes and {@link Mesh}es may subsequently be given different values for this property.
     *
     * @type {Number[]}
     */
    set offset(arg: number[]);
    /**
     * Gets the Node's 3D World-space offset.
     *
     * Default value is ````[0, 0, 0]````.
     *
     * Child Nodes and {@link Mesh}es may have different values for this property.
     *
     * @type {Number[]}
     */
    get offset(): number[];
    /**
     * Returns true to indicate that this Component is an Entity.
     * @type {Boolean}
     */
    get isEntity(): boolean;
    /**
     * Returns ````true```` if this Mesh represents a model.
     *
     * When this returns ````true````, the Mesh will be registered by {@link Mesh#id} in {@link Scene#models} and
     * may also have a corresponding {@link MetaModel}.
     *
     * @type {Boolean}
     */
    get isModel(): boolean;
    /**
     * Returns ````true```` if this Node represents an object.
     *
     * When ````true```` the Node will be registered by {@link Node#id} in
     * {@link Scene#objects} and may also have a {@link MetaObject} with matching {@link MetaObject#id}.
     *
     * @type {Boolean}
     * @abstract
     */
    get isObject(): boolean;
    /**
     * Gets the Node's World-space 3D axis-aligned bounding box.
     *
     * Represented by a six-element Float64Array containing the min/max extents of the
     * axis-aligned volume, ie. ````[xmin, ymin,zmin,xmax,ymax, zmax]````.
     *
     * @type {Number[]}
     */
    get aabb(): number[];
    _rtcCenter: any;
    /**
     * The number of triangles in this Node.
     *
     * @type {Number}
     */
    get numTriangles(): number;
    _visible: boolean;
    _xrayed: boolean;
    _highlighted: boolean;
    _selected: boolean;
    _edges: boolean;
    _culled: boolean;
    _clippable: boolean;
    _collidable: boolean;
    _pickable: boolean;
    _colorize: Float32Array;
    _castsShadow: boolean;
    _receivesShadow: boolean;
    /**
     * Gets if this Node can have Scalable Ambient Obscurance (SAO) applied to it.
     *
     * SAO is configured by {@link SAO}.
     *
     * @type {Boolean}
     * @abstract
     */
    get saoEnabled(): boolean;
    /**
     * Returns true to indicate that this Component is a Node.
     * @type {Boolean}
     */
    get isNode(): boolean;
    _setLocalMatrixDirty(): void;
    _setWorldMatrixDirty(): void;
    _buildWorldMatrix(): void;
    _setSubtreeAABBsDirty(node: any): void;
    _setAABBDirty(): void;
    _updateAABB(): void;
    /**
     * Adds a child Node or {@link Mesh}.
     *
     * The child must be a Node or {@link Mesh} in the same {@link Scene}.
     *
     * If the child already has a parent, will be removed from that parent first.
     *
     * Does nothing if already a child.
     *
     * @param {Node|Mesh|String} child Instance or ID of the child to add.
     * @param [inheritStates=false] Indicates if the child should inherit rendering states from this parent as it is added. Rendering state includes {@link Node#visible}, {@link Node#culled}, {@link Node#pickable}, {@link Node#clippable}, {@link Node#castsShadow}, {@link Node#receivesShadow}, {@link Node#selected}, {@link Node#highlighted}, {@link Node#colorize} and {@link Node#opacity}.
     * @returns {Node|Mesh} The child.
     */
    addChild(child: Node | any | string, inheritStates?: any): Node | any;
    /**
     * Removes the given child Node or {@link Mesh}.
     *
     * @param {Node|Mesh} child Child to remove.
     */
    removeChild(child: Node | any): void;
    /**
     * Removes all child Nodes and {@link Mesh}es.
     */
    removeChildren(): void;
    /**
     * Number of child Nodes or {@link Mesh}es.
     *
     * @type {Number}
     */
    get numChildren(): number;
    /**
     * Array of child Nodes or {@link Mesh}es.
     *
     * @type {Array}
     */
    get children(): any[];
    /**
     * The parent Node.
     *
     * The parent Node may also be set by passing the Node to the parent's {@link Node#addChild} method.
     *
     * @type {Node}
     */
    set parent(arg: Node);
    /**
     * The parent Node.
     *
     * @type {Node}
     */
    get parent(): Node;
    /**
     * Sets the Node's local rotation quaternion.
     *
     * Default value is ````[0,0,0,1]````.
     *
     * @type {Number[]}
     */
    set quaternion(arg: number[]);
    /**
     * Gets the Node's local rotation quaternion.
     *
     * Default value is ````[0,0,0,1]````.
     *
     * @type {Number[]}
     */
    get quaternion(): number[];
    /**
     * Gets the Node's World matrix.
     *
     * @property worldMatrix
     * @type {Number[]}
     */
    get worldMatrix(): number[];
    /**
     * Rotates the Node about the given local axis by the given increment.
     *
     * @param {Number[]} axis Local axis about which to rotate.
     * @param {Number} angle Angle increment in degrees.
     */
    rotate(axis: number[], angle: number): Node;
    /**
     * Rotates the Node about the given World-space axis by the given increment.
     *
     * @param {Number[]} axis Local axis about which to rotate.
     * @param {Number} angle Angle increment in degrees.
     */
    rotateOnWorldAxis(axis: number[], angle: number): Node;
    /**
     * Rotates the Node about the local X-axis by the given increment.
     *
     * @param {Number} angle Angle increment in degrees.
     */
    rotateX(angle: number): Node;
    /**
     * Rotates the Node about the local Y-axis by the given increment.
     *
     * @param {Number} angle Angle increment in degrees.
     */
    rotateY(angle: number): Node;
    /**
     * Rotates the Node about the local Z-axis by the given increment.
     *
     * @param {Number} angle Angle increment in degrees.
     */
    rotateZ(angle: number): Node;
    /**
     * Translates the Node along local space vector by the given increment.
     *
     * @param {Number[]} axis Normalized local space 3D vector along which to translate.
     * @param {Number} distance Distance to translate along  the vector.
     */
    translate(axis: number[], distance: number): Node;
    /**
     * Translates the Node along the local X-axis by the given increment.
     *
     * @param {Number} distance Distance to translate along  the X-axis.
     */
    translateX(distance: number): Node;
    /**
     * Translates the Node along the local Y-axis by the given increment.
     *
     * @param {Number} distance Distance to translate along  the Y-axis.
     */
    translateY(distance: number): Node;
    /**
     * Translates the Node along the local Z-axis by the given increment.
     *
     * @param {Number} distance Distance to translate along  the Z-axis.
     */
    translateZ(distance: number): Node;
    /**
     @private
     */
    private get type();
    /**
     * Destroys this Node.
     */
    destroy(): void;
}
