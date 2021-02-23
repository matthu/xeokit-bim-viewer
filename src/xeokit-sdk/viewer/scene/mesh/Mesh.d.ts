import { RenderState } from "../webgl/RenderState";
/**
 * @desc An {@link Entity} that is a drawable element, with a {@link Geometry} and a {@link Material}, that can be
 * connected into a scene graph using {@link Node}s.
 *
 * ## Usage
 *
 * The example below is the same as the one given for {@link Node}, since the two classes work together.  In this example,
 * we'll create a scene graph in which a root {@link Node} represents a group and the Meshes are leaves.
 *
 * Since {@link Node} implements {@link Entity}, we can designate the root {@link Node} as a model, causing it to be registered by its
 * ID in {@link Scene#models}.
 *
 * Since Mesh also implements {@link Entity}, we can designate the leaf Meshes as objects, causing them to
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
 * import {buildBoxGeometry} from "../src/viewer/scene/geometry/builders/buildBoxGeometry.js";
 * import {ReadableGeometry} from "../src/viewer/scene/geometry/ReadableGeometry.js";
 *
 * const viewer = new Viewer({
 *     canvasId: "myCanvas"
 * });
 *
 * viewer.scene.camera.eye = [-21.80, 4.01, 6.56];
 * viewer.scene.camera.look = [0, -5.75, 0];
 * viewer.scene.camera.up = [0.37, 0.91, -0.11];
 *
 * const boxGeometry = new ReadableGeometry(viewer.scene, buildBoxGeometry({
 *      xSize: 1,
 *      ySize: 1,
 *      zSize: 1
 * }));
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
 *              }),
 *              geometry: boxGeometry
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
 *              }),
 *              geometry: boxGeometry
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
 *              }),
 *              geometry: boxGeometry
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
 *              }),
 *              geometry: boxGeometry
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
 *              }),
 *              geometry: boxGeometry
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
 * As mentioned, we can also associate {@link MetaModel}s and {@link MetaObject}s with our {@link Node}s and Meshes,
 * within a {@link MetaScene}. See {@link MetaScene} for an example.
 *
 * @implements {Entity}
 * @implements {Drawable}
 */
export class Mesh {
    /**
     * @constructor
     * @param {Component} owner Owner component. When destroyed, the owner will destroy this component as well.
     * @param {*} [cfg] Configs
     * @param {String} [cfg.id] Optional ID, unique among all components in the parent scene, generated automatically when omitted.
     * @param {String} [cfg.originalSystemId] ID of the corresponding object within the originating system, if any.
     * @param {Boolean} [cfg.isModel] Specify ````true```` if this Mesh represents a model, in which case the Mesh will be registered by {@link Mesh#id} in {@link Scene#models} and may also have a corresponding {@link MetaModel} with matching {@link MetaModel#id}, registered by that ID in {@link MetaScene#metaModels}.
     * @param {Boolean} [cfg.isObject] Specify ````true```` if this Mesh represents an object, in which case the Mesh will be registered by {@link Mesh#id} in {@link Scene#objects} and may also have a corresponding {@link MetaObject} with matching {@link MetaObject#id}, registered by that ID in {@link MetaScene#metaObjects}.
     * @param {Node} [cfg.parent] The parent Node.
     * @param {Number[]} [cfg.rtcCenter] Relative-to-center (RTC) coordinate system center for this Mesh. When this is given, then ````matrix````, ````position```` and ````geometry```` are all assumed to be relative to this center.
     * @param {Number[]} [cfg.position=[0,0,0]] Local 3D position.
     * @param {Number[]} [cfg.scale=[1,1,1]] Local scale.
     * @param {Number[]} [cfg.rotation=[0,0,0]] Local rotation, as Euler angles given in degrees, for each of the X, Y and Z axis.
     * @param {Number[]} [cfg.matrix=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]] Local modelling transform matrix. Overrides the position, scale and rotation parameters.
     * @param {Number[]} [cfg.offset=[0,0,0]] World-space 3D translation offset. Translates the Mesh in World space, after modelling transforms.
     * @param {Boolean} [cfg.visible=true] Indicates if the Mesh is initially visible.
     * @param {Boolean} [cfg.culled=false] Indicates if the Mesh is initially culled from view.
     * @param {Boolean} [cfg.pickable=true] Indicates if the Mesh is initially pickable.
     * @param {Boolean} [cfg.clippable=true] Indicates if the Mesh is initially clippable.
     * @param {Boolean} [cfg.collidable=true] Indicates if the Mesh is initially included in boundary calculations.
     * @param {Boolean} [cfg.castsShadow=true] Indicates if the Mesh initially casts shadows.
     * @param {Boolean} [cfg.receivesShadow=true]  Indicates if the Mesh initially receives shadows.
     * @param {Boolean} [cfg.xrayed=false] Indicates if the Mesh is initially xrayed.
     * @param {Boolean} [cfg.highlighted=false] Indicates if the Mesh is initially highlighted.
     * @param {Boolean} [cfg.selected=false] Indicates if the Mesh is initially selected.
     * @param {Boolean} [cfg.edges=false] Indicates if the Mesh's edges are initially emphasized.
     * @param {Number[]} [cfg.colorize=[1.0,1.0,1.0]] Mesh's initial RGB colorize color, multiplies by the rendered fragment colors.
     * @param {Number} [cfg.opacity=1.0] Mesh's initial opacity factor, multiplies by the rendered fragment alpha.
     * @param {String} [cfg.billboard="none"] Mesh's billboarding behaviour. Options are "none" for no billboarding, "spherical" to always directly face {@link Camera.eye}, rotating both vertically and horizontally, or "cylindrical" to face the {@link Camera#eye} while rotating only about its vertically axis (use that mode for things like trees on a landscape).
     * @param {Geometry} [cfg.geometry] {@link Geometry} to define the shape of this Mesh. Inherits {@link Scene#geometry} by default.
     * @param {Material} [cfg.material] {@link Material} to define the normal rendered appearance for this Mesh. Inherits {@link Scene#material} by default.
     * @param {EmphasisMaterial} [cfg.xrayMaterial] {@link EmphasisMaterial} to define the xrayed appearance for this Mesh. Inherits {@link Scene#xrayMaterial} by default.
     * @param {EmphasisMaterial} [cfg.highlightMaterial] {@link EmphasisMaterial} to define the xrayed appearance for this Mesh. Inherits {@link Scene#highlightMaterial} by default.
     * @param {EmphasisMaterial} [cfg.selectedMaterial] {@link EmphasisMaterial} to define the selected appearance for this Mesh. Inherits {@link Scene#selectedMaterial} by default.
     * @param {EmphasisMaterial} [cfg.edgeMaterial] {@link EdgeMaterial} to define the appearance of enhanced edges for this Mesh. Inherits {@link Scene#edgeMaterial} by default.
     */
    constructor(owner: any, cfg?: any);
    /**
     @private
     */
    private get type();
    /**
     * ID of the corresponding object within the originating system, if any.
     *
     * @type {String}
     * @abstract
     */
    originalSystemId: string;
    /** @private **/
    private renderFlags;
    _state: RenderState;
    _drawRenderer: any;
    _shadowRenderer: any;
    _emphasisFillRenderer: any;
    _emphasisEdgesRenderer: any;
    _pickMeshRenderer: any;
    _pickTriangleRenderer: any;
    _occlusionRenderer: any;
    _geometry: any;
    _material: any;
    _xrayMaterial: any;
    _highlightMaterial: any;
    _selectedMaterial: any;
    _edgeMaterial: any;
    _parentNode: any;
    _aabb: any;
    _aabbDirty: boolean;
    _numTriangles: any;
    _scale: any;
    _quaternion: any;
    _rotation: any;
    _position: any;
    _worldMatrix: any;
    _worldNormalMatrix: any;
    _localMatrixDirty: boolean;
    _worldMatrixDirty: boolean;
    _worldNormalMatrixDirty: boolean;
    /**
     * Sets the Mesh's local modeling transform matrix.
     *
     * Default value is ````[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]````.
     *
     * @type {Number[]}
     */
    set matrix(arg: number[]);
    /**
     * Gets the Mesh's local modeling transform matrix.
     *
     * Default value is ````[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]````.
     *
     * @type {Number[]}
     */
    get matrix(): number[];
    /**
     * Sets the Mesh's local scale.
     *
     * Default value is ````[1,1,1]````.
     *
     * @type {Number[]}
     */
    set scale(arg: number[]);
    /**
     * Gets the Mesh's local scale.
     *
     * Default value is ````[1,1,1]````.
     *
     * @type {Number[]}
     */
    get scale(): number[];
    /**
     * Sets the Mesh's local translation.
     *
     * Default value is ````[0,0,0]````.
     *
     * @type {Number[]}
     */
    set position(arg: number[]);
    /**
     * Gets the Mesh's local translation.
     *
     * Default value is ````[0,0,0]````.
     *
     * @type {Number[]}
     */
    get position(): number[];
    /**
     * Sets the Mesh's local rotation, as Euler angles given in degrees, for each of the X, Y and Z axis.
     *
     * Default value is ````[0,0,0]````.
     *
     * @type {Number[]}
     */
    set rotation(arg: number[]);
    /**
     * Gets the Mesh's local rotation, as Euler angles given in degrees, for each of the X, Y and Z axis.
     *
     * Default value is ````[0,0,0]````.
     *
     * @type {Number[]}
     */
    get rotation(): number[];
    _isObject: any;
    _isModel: any;
    /**
     * Sets if this Mesh is visible.
     *
     * Only rendered when {@link Mesh#visible} is ````true```` and {@link Mesh#culled} is ````false````.
     *
     * When {@link Mesh#isObject} and {@link Mesh#visible} are both ````true```` the Mesh will be
     * registered by {@link Mesh#id} in {@link Scene#visibleObjects}.
     *
     * @type {Boolean}
     */
    set visible(arg: boolean);
    /**
     * Gets if this Mesh is visible.
     *
     * Only rendered when {@link Mesh#visible} is ````true```` and {@link Mesh#culled} is ````false````.
     *
     * When {@link Mesh#isObject} and {@link Mesh#visible} are both ````true```` the Mesh will be
     * registered by {@link Mesh#id} in {@link Scene#visibleObjects}.
     *
     * @type {Boolean}
     */
    get visible(): boolean;
    /**
     * Sets if this Mesh is culled.
     *
     * Only rendered when {@link Mesh#visible} is ````true```` and {@link Mesh#culled} is ````false````.
     *
     * @type {Boolean}
     */
    set culled(arg: boolean);
    /**
     * Gets if this Mesh is culled.
     *
     * Only rendered when {@link Mesh#visible} is ````true```` and {@link Mesh#culled} is ````false````.
     *
     * @type {Boolean}
     */
    get culled(): boolean;
    /**
     * Sets if this Mesh is pickable.
     *
     * Picking is done via calls to {@link Scene#pick}.
     *
     * @type {Boolean}
     */
    set pickable(arg: boolean);
    /**
     * Gets if this Mesh is pickable.
     *
     * Picking is done via calls to {@link Scene#pick}.
     *
     * @type {Boolean}
     */
    get pickable(): boolean;
    /**
     * Sets if this Mesh is clippable.
     *
     * Clipping is done by the {@link SectionPlane}s in {@link Scene#sectionPlanes}.
     *
     * @type {Boolean}
     */
    set clippable(arg: boolean);
    /**
     * Gets if this Mesh is clippable.
     *
     * Clipping is done by the {@link SectionPlane}s in {@link Scene#sectionPlanes}.
     *
     * @type {Boolean}
     */
    get clippable(): boolean;
    /**
     * Sets if this Mesh included in boundary calculations.
     *
     * @type {Boolean}
     */
    set collidable(arg: boolean);
    /**
     * Gets if this Mesh included in boundary calculations.
     *
     * @type {Boolean}
     */
    get collidable(): boolean;
    /**
     * Sets if this Mesh casts shadows.
     *
     * @type {Boolean}
     */
    set castsShadow(arg: boolean);
    /**
     * Gets if this Mesh casts shadows.
     *
     * @type {Boolean}
     */
    get castsShadow(): boolean;
    /**
     * Sets if this Mesh can have shadows cast upon it.
     *
     * @type {Boolean}
     */
    set receivesShadow(arg: boolean);
    /**
     * Gets if this Mesh can have shadows cast upon it.
     *
     * @type {Boolean}
     */
    get receivesShadow(): boolean;
    /**
     * Sets if this Mesh is xrayed.
     *
     * XRayed appearance is configured by the {@link EmphasisMaterial} referenced by {@link Mesh#xrayMaterial}.
     *
     * When {@link Mesh#isObject} and {@link Mesh#xrayed} are both ````true``` the Mesh will be
     * registered by {@link Mesh#id} in {@link Scene#xrayedObjects}.
     *
     * @type {Boolean}
     */
    set xrayed(arg: boolean);
    /**
     * Gets if this Mesh is xrayed.
     *
     * XRayed appearance is configured by the {@link EmphasisMaterial} referenced by {@link Mesh#xrayMaterial}.
     *
     * When {@link Mesh#isObject} and {@link Mesh#xrayed} are both ````true``` the Mesh will be
     * registered by {@link Mesh#id} in {@link Scene#xrayedObjects}.
     *
     * @type {Boolean}
     */
    get xrayed(): boolean;
    /**
     * Sets if this Mesh is highlighted.
     *
     * Highlighted appearance is configured by the {@link EmphasisMaterial} referenced by {@link Mesh#highlightMaterial}.
     *
     * When {@link Mesh#isObject} and {@link Mesh#highlighted} are both ````true```` the Mesh will be
     * registered by {@link Mesh#id} in {@link Scene#highlightedObjects}.
     *
     * @type {Boolean}
     */
    set highlighted(arg: boolean);
    /**
     * Gets if this Mesh is highlighted.
     *
     * Highlighted appearance is configured by the {@link EmphasisMaterial} referenced by {@link Mesh#highlightMaterial}.
     *
     * When {@link Mesh#isObject} and {@link Mesh#highlighted} are both ````true```` the Mesh will be
     * registered by {@link Mesh#id} in {@link Scene#highlightedObjects}.
     *
     * @type {Boolean}
     */
    get highlighted(): boolean;
    /**
     * Sets if this Mesh is selected.
     *
     * Selected appearance is configured by the {@link EmphasisMaterial} referenced by {@link Mesh#selectedMaterial}.
     *
     * When {@link Mesh#isObject} and {@link Mesh#selected} are both ````true``` the Mesh will be
     * registered by {@link Mesh#id} in {@link Scene#selectedObjects}.
     *
     * @type {Boolean}
     */
    set selected(arg: boolean);
    /**
     * Gets if this Mesh is selected.
     *
     * Selected appearance is configured by the {@link EmphasisMaterial} referenced by {@link Mesh#selectedMaterial}.
     *
     * When {@link Mesh#isObject} and {@link Mesh#selected} are both ````true``` the Mesh will be
     * registered by {@link Mesh#id} in {@link Scene#selectedObjects}.
     *
     * @type {Boolean}
     */
    get selected(): boolean;
    /**
     * Sets if this Mesh is edge-enhanced.
     *
     * Edge appearance is configured by the {@link EdgeMaterial} referenced by {@link Mesh#edgeMaterial}.
     *
     * @type {Boolean}
     */
    set edges(arg: boolean);
    /**
     * Gets if this Mesh is edge-enhanced.
     *
     * Edge appearance is configured by the {@link EdgeMaterial} referenced by {@link Mesh#edgeMaterial}.
     *
     * @type {Boolean}
     */
    get edges(): boolean;
    /**
     * Sets the Mesh's rendering order relative to other Meshes.
     *
     * Default value is ````0````.
     *
     * This can be set on multiple transparent Meshes, to make them render in a specific order for correct alpha blending.
     *
     * @type {Number}
     */
    set layer(arg: number);
    /**
     * Gets the Mesh's rendering order relative to other Meshes.
     *
     * Default value is ````0````.
     *
     * This can be set on multiple transparent Meshes, to make them render in a specific order for correct alpha blending.
     *
     * @type {Number}
     */
    get layer(): number;
    /**
     * Sets the RGB colorize color for this Mesh.
     *
     * Multiplies by rendered fragment colors.
     *
     * Each element of the color is in range ````[0..1]````.
     *
     * @type {Number[]}
     */
    set colorize(arg: number[]);
    /**
     * Gets the RGB colorize color for this Mesh.
     *
     * Multiplies by rendered fragment colors.
     *
     * Each element of the color is in range ````[0..1]````.
     *
     * @type {Number[]}
     */
    get colorize(): number[];
    /**
     * Sets the opacity factor for this Mesh.
     *
     * This is a factor in range ````[0..1]```` which multiplies by the rendered fragment alphas.
     *
     * @type {Number}
     */
    set opacity(arg: number);
    /**
     * Gets the opacity factor for this Mesh.
     *
     * This is a factor in range ````[0..1]```` which multiplies by the rendered fragment alphas.
     *
     * @type {Number}
     */
    get opacity(): number;
    /**
     * Sets the Mesh's 3D World-space offset.
     *
     * The offset dynamically translates the Mesh in World-space.
     *
     * Default value is ````[0, 0, 0]````.
     *
     * Provide a null or undefined value to reset to the default value.
     *
     * @type {Number[]}
     */
    set offset(arg: number[]);
    /**
     * Gets the Mesh's 3D World-space offset.
     *
     * Default value is ````[0,0,0]````.
     *
     * @type {Number[]}
     */
    get offset(): number[];
    /**
     * Returns true to indicate that this Component is a Mesh.
     * @final
     * @type {Boolean}
     */
    get isMesh(): boolean;
    /**
     * The parent Node.
     *
     * The parent Node may also be set by passing the Mesh to the parent's {@link Node#addChild} method.
     *
     * @type {Node}
     */
    get parent(): Node;
    _checkBillboard(value: any): any;
    /**
     * Called by xeokit to compile shaders for this Mesh.
     * @private
     */
    private compile;
    _setLocalMatrixDirty(): void;
    _setWorldMatrixDirty(): void;
    _buildWorldMatrix(): void;
    _buildWorldNormalMatrix(): void;
    _setAABBDirty(): void;
    _updateAABB(): void;
    _webglContextRestored(): void;
    _makeDrawHash(): string;
    _makePickHash(): string;
    _makeOcclusionHash(): string;
    _buildAABB(worldMatrix: any, aabb: any): void;
    /**
     * Defines the shape of this Mesh.
     *
     * Set to {@link Scene#geometry} by default.
     *
     * @type {Geometry}
     */
    get geometry(): any;
    /**
     * Defines the appearance of this Mesh when rendering normally, ie. when not xrayed, highlighted or selected.
     *
     * Set to {@link Scene#material} by default.
     *
     * @type {Material}
     */
    get material(): any;
    /**
     * Sets the Mesh's local rotation quaternion.
     *
     * Default value is ````[0,0,0,1]````.
     *
     * @type {Number[]}
     */
    set quaternion(arg: number[]);
    /**
     * Gets the Mesh's local rotation quaternion.
     *
     * Default value is ````[0,0,0,1]````.
     *
     * @type {Number[]}
     */
    get quaternion(): number[];
    __localMatrix: any;
    /**
     * Gets the Mesh's World matrix.
     *
     * @property worldMatrix
     * @type {Number[]}
     */
    get worldMatrix(): number[];
    /**
     * Gets the Mesh's World normal matrix.
     *
     * @type {Number[]}
     */
    get worldNormalMatrix(): number[];
    /**
     * Rotates the Mesh about the given local axis by the given increment.
     *
     * @param {Number[]} axis Local axis about which to rotate.
     * @param {Number} angle Angle increment in degrees.
     */
    rotate(axis: number[], angle: number): Mesh;
    /**
     * Rotates the Mesh about the given World-space axis by the given increment.
     *
     * @param {Number[]} axis Local axis about which to rotate.
     * @param {Number} angle Angle increment in degrees.
     */
    rotateOnWorldAxis(axis: number[], angle: number): Mesh;
    /**
     * Rotates the Mesh about the local X-axis by the given increment.
     *
     * @param {Number} angle Angle increment in degrees.
     */
    rotateX(angle: number): Mesh;
    /**
     * Rotates the Mesh about the local Y-axis by the given increment.
     *
     * @param {Number} angle Angle increment in degrees.
     */
    rotateY(angle: number): Mesh;
    /**
     * Rotates the Mesh about the local Z-axis by the given increment.
     *
     * @param {Number} angle Angle increment in degrees.
     */
    rotateZ(angle: number): Mesh;
    /**
     * Translates the Mesh along local space vector by the given increment.
     *
     * @param {Number[]} axis Normalized local space 3D vector along which to translate.
     * @param {Number} distance Distance to translate along  the vector.
     */
    translate(axis: number[], distance: number): Mesh;
    /**
     * Translates the Mesh along the local X-axis by the given increment.
     *
     * @param {Number} distance Distance to translate along  the X-axis.
     */
    translateX(distance: number): Mesh;
    /**
     * Translates the Mesh along the local Y-axis by the given increment.
     *
     * @param {Number} distance Distance to translate along  the Y-axis.
     */
    translateY(distance: number): Mesh;
    /**
     * Translates the Mesh along the local Z-axis by the given increment.
     *
     * @param {Number} distance Distance to translate along  the Z-axis.
     */
    translateZ(distance: number): Mesh;
    _putDrawRenderers(): void;
    _putPickRenderers(): void;
    _putOcclusionRenderer(): void;
    /**
     * Returns true to indicate that Mesh implements {@link Entity}.
     *
     * @returns {Boolean}
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
     * Returns ````true```` if this Mesh represents an object.
     *
     * When this returns ````true````, the Mesh will be registered by {@link Mesh#id} in {@link Scene#objects} and
     * may also have a corresponding {@link MetaObject}.
     *
     * @type {Boolean}
     */
    get isObject(): boolean;
    /**
     * Gets the Mesh's World-space 3D axis-aligned bounding box.
     *
     * Represented by a six-element Float64Array containing the min/max extents of the
     * axis-aligned volume, ie. ````[xmin, ymin,zmin,xmax,ymax, zmax]````.
     *
     * @type {Number[]}
     */
    get aabb(): number[];
    /**
     * Center of the relative-to-center (RTC) coordinate system for this Mesh.
     *
     * When this is given, then {@link Mesh#matrix}, {@link Mesh#position} and {@link Mesh#geometry} are all assumed to be relative to this center position.
     *
     * @type {Float64Array}
     */
    set rtcCenter(arg: Float64Array);
    /**
     * 3D origin of the Mesh's {@link Geometry}'s vertex positions.
     *
     * When this is defined, then the positions are RTC, which means that they are relative to this position.
     *
     * @type {Float64Array}
     */
    get rtcCenter(): Float64Array;
    /**
     * The approximate number of triangles in this Mesh.
     *
     * @type {Number}
     */
    get numTriangles(): number;
    /**
     * Gets if this Mesh can have Scalable Ambient Obscurance (SAO) applied to it.
     *
     * SAO is configured by {@link SAO}.
     *
     * @type {Boolean}
     * @abstract
     */
    get saoEnabled(): boolean;
    /**
     * Gets if this Mesh is transparent.
     * @returns {Boolean}
     */
    get transparent(): boolean;
    /**
     * Gets if the Node's position is stationary.
     *
     * When true, will disable the effect of {@link Camera} translations for this Mesh, while still allowing it to rotate. This is useful for skyboxes.
     *
     * @type {Boolean}
     */
    get stationary(): boolean;
    /**
     * Gets the Node's billboarding behaviour.
     *
     * Options are:
     * * ````"none"```` -  (default) - No billboarding.
     * * ````"spherical"```` - Mesh is billboarded to face the viewpoint, rotating both vertically and horizontally.
     * * ````"cylindrical"```` - Mesh is billboarded to face the viewpoint, rotating only about its vertically axis. Use this mode for things like trees on a landscape.
     * @type {String}
     */
    get billboard(): string;
    /**
     * Returns true to indicate that Mesh implements {@link Drawable}.
     * @final
     * @type {Boolean}
     */
    get isDrawable(): boolean;
    /**
     * Property with final value ````true```` to indicate that xeokit should render this Mesh in sorted order, relative to other Meshes.
     *
     * The sort order is determined by {@link Mesh#stateSortCompare}.
     *
     * Sorting is essential for rendering performance, so that xeokit is able to avoid applying runs of the same state changes to the GPU, ie. can collapse them.
     *
     * @type {Boolean}
     */
    get isStateSortable(): boolean;
    /**
     * Comparison function used by the renderer to determine the order in which xeokit should render the Mesh, relative to to other Meshes.
     *
     * xeokit requires this method because Mesh implements {@link Drawable}.
     *
     * Sorting is essential for rendering performance, so that xeokit is able to avoid needlessly applying runs of the same rendering state changes to the GPU, ie. can collapse them.
     *
     * @param {Mesh} mesh1
     * @param {Mesh} mesh2
     * @returns {number}
     */
    stateSortCompare(mesh1: Mesh, mesh2: Mesh): number;
    /** @private */
    private rebuildRenderFlags;
    /**
     * @private
     */
    private _updateRenderFlags;
    _getActiveSectionPlanes(): boolean;
    /**
     * Defines the appearance of this Mesh when xrayed.
     *
     * Mesh is xrayed when {@link Mesh#xrayed} is ````true````.
     *
     * Set to {@link Scene#xrayMaterial} by default.
     *
     * @type {EmphasisMaterial}
     */
    get xrayMaterial(): any;
    /**
     * Defines the appearance of this Mesh when highlighted.
     *
     * Mesh is xrayed when {@link Mesh#highlighted} is ````true````.
     *
     * Set to {@link Scene#highlightMaterial} by default.
     *
     * @type {EmphasisMaterial}
     */
    get highlightMaterial(): any;
    /**
     * Defines the appearance of this Mesh when selected.
     *
     * Mesh is xrayed when {@link Mesh#selected} is ````true````.
     *
     * Set to {@link Scene#selectedMaterial} by default.
     *
     * @type {EmphasisMaterial}
     */
    get selectedMaterial(): any;
    /**
     * Defines the appearance of this Mesh when edges are enhanced.
     *
     * Mesh is xrayed when {@link Mesh#edges} is ````true````.
     *
     * Set to {@link Scene#edgeMaterial} by default.
     *
     * @type {EdgeMaterial}
     */
    get edgeMaterial(): any;
    /** @private  */
    private drawNormalOpaqueFill;
    /** @private  */
    private drawNormalTransparentFill;
    /** @private  */
    private drawXRayedFill;
    /** @private  */
    private drawHighlightedFill;
    /** @private  */
    private drawSelectedFill;
    /** @private  */
    private drawNormalOpaqueEdges;
    /** @private  */
    private drawNormalTransparentEdges;
    /** @private  */
    private drawXRayedEdges;
    /** @private  */
    private drawHighlightedEdges;
    /** @private  */
    private drawSelectedEdges;
    /** @private  */
    private drawOcclusion;
    /** @private  */
    private drawShadow;
    /** @private  */
    private drawPickMesh;
    /** @private
     */
    private canPickTriangle;
    /** @private  */
    private drawPickTriangles;
    /** @private */
    private pickTriangleSurface;
    /** @private  */
    private drawPickVertices;
    /**
     * @private
     * @returns {PerformanceNode}
     */
    private delegatePickedEntity;
    /**
     * Destroys this Mesh.
     */
    destroy(): void;
}
