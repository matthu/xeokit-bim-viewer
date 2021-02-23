/**
 * {@link Viewer} plugin that saves and loads BCF viewpoints as JSON objects.
 *
 * BCF is a format for managing issues on a BIM project. This plugin's viewpoints conform to
 * the <a href="https://github.com/buildingSMART/BCF-API">BCF Version 2.1</a> specification.
 *
 * ## Saving a BCF Viewpoint
 *
 * In the example below we'll create a {@link Viewer}, load an ````.XKT```` model into it using an {@link XKTLoaderPlugin},
 * slice the model in half using a {@link SectionPlanesPlugin}, then use a {@link BCFViewpointsPlugin#getViewpoint}
 * to save a viewpoint to JSON, which we'll log to the JavaScript developer console.
 *
 * * [[Run this example](http://xeokit.github.io/xeokit-sdk/examples/#BCF_SaveViewpoint)]
 *
 * ````javascript
 * import {Viewer} from "../src/viewer/Viewer.js";
 * import {XKTLoaderPlugin} from "../src/plugins/XKTLoaderPlugin/XKTLoaderPlugin.js";
 * import {SectionPlanesPlugin} from "../src/plugins/SectionPlanesPlugin/SectionPlanesPlugin.js";
 * import {BCFViewpointsPlugin} from "../src/plugins/BCFViewpointsPlugin/BCFViewpointsPlugin.js";
 *
 * // Create a Viewer
 * const viewer = new Viewer({
 *      canvasId: "myCanvas",
 *      transparent: true
 * });
 *
 * // Add a XKTLoaderPlugin
 * const xktLoader = new XKTLoaderPlugin(viewer);
 *
 * // Add a SectionPlanesPlugin
 * const sectionPlanes = new SectionPlanesPlugin(viewer);
 *
 * // Add a BCFViewpointsPlugin
 * const bcfViewpoints = new BCFViewpointsPlugin(viewer);
 *
 * // Load an .XKT model
 * const modelNode = xktLoader.load({
 *      id: "myModel",
 *      src: "./models/xkt/schependomlaan/schependomlaan.xkt",
 *      metaModelSrc: "./metaModels/schependomlaan/metaModel.json", // Creates a MetaObject instances in scene.metaScene.metaObjects
 *      edges: true // Emphasise edges
 * });
 *
 * // Slice it in half
 * sectionPlanes.createSectionPlane({
 *      id: "myClip",
 *      pos: [0, 0, 0],
 *      dir: [0.5, 0.0, 0.5]
 * });
 *
 * // When model is loaded, set camera, select some objects and capture a BCF viewpoint to the console
 * modelNode.on("loaded", () => {
 *
 *      const scene = viewer.scene;
 *      const camera = scene.camera;
 *
 *      camera.eye = [-2.37, 18.97, -26.12];
 *      camera.look = [10.97, 5.82, -11.22];
 *      camera.up = [0.36, 0.83, 0.40];
 *
 *      scene.setObjectsSelected([
 *          "3b2U496P5Ebhz5FROhTwFH",
 *          "2MGtJUm9nD$Re1_MDIv0g2",
 *          "3IbuwYOm5EV9Q6cXmwVWqd",
 *          "3lhisrBxL8xgLCRdxNG$2v",
 *          "1uDn0xT8LBkP15zQc9MVDW"
 *      ], true);
 *
 *      const viewpoint = bcfViewpoints.getViewpoint();
 *      const viewpointStr = JSON.stringify(viewpoint, null, 4);
 *
 *      console.log(viewpointStr);
 * });
 * ````
 *
 * ## Saving View Setup Hints
 *
 * BCFViewpointsPlugin can optionally save hints in the viewpoint, which indicate how to set up the view when
 * loading it again.
 *
 * Here's the {@link BCFViewpointsPlugin#getViewpoint} call again, this time saving some hints:
 *
 * ````javascript
 * const viewpoint = bcfViewpoints.getViewpoint({ // Options
 *     spacesVisible: true, // Force IfcSpace types visible in the viewpoint (default is false)
 *     spaceBoundariesVisible: false, // Show IfcSpace boundaries in the viewpoint (default is false)
 *     openingsVisible: true // Force IfcOpening types visible in the viewpoint (default is false)
 * });
 * ````
 *
 * ## Loading a BCF Viewpoint
 *
 * Assuming that we have our BCF viewpoint in a JSON object, let's now restore it with {@link BCFViewpointsPlugin#setViewpoint}:
 *
 * ````javascript
 * bcfViewpoints.setViewpoint(viewpoint);
 * ````
 *
 * ## Handling BCF Incompatibility with xeokit's Camera
 *
 * xeokit's {@link Camera#look} is the current 3D *point-of-interest* (POI).
 *
 * A BCF viewpoint, however, has a direction vector instead of a POI, and so {@link BCFViewpointsPlugin#getViewpoint} saves
 * xeokit's POI as a normalized vector from {@link Camera#eye} to {@link Camera#look}, which unfortunately loses
 * that positional information. Loading the viewpoint with {@link BCFViewpointsPlugin#setViewpoint} will restore {@link Camera#look} to
 * the viewpoint's camera position, offset by the normalized vector.
 *
 * As shown below, providing a ````rayCast```` option to ````setViewpoint```` will set {@link Camera#look} to the closest
 * surface intersection on the direction vector. Internally, ````setViewpoint```` supports this option by firing a ray
 * along the vector, and if that hits an {@link Entity}, sets {@link Camera#look} to ray's intersection point with the
 * Entity's surface.
 *
 * ````javascript
 * bcfViewpoints.setViewpoint(viewpoint, {
 *      rayCast: true // <<--------------- Attempt to set Camera#look to surface intersection point (default)
 * });
 * ````
 *
 * ## Dealing With Loaded Models That Are Not in the Viewpoint
 *
 * If, for example, we load model "duplex", hide some objects, then save a BCF viewpoint with
 * ````BCFViewpointsPlugin#getViewpoint````, then load another model, "schependomlaan", then load the viewpoint again
 * with ````BCFViewpointsPlugin#setViewpoint````, then sometimes all of the objects in model "schependomlaan" become
 * visible, along with the visible objects in the viewpoint, which belong to model "duplex".
 *
 * The reason is that, when saving a BCF viewpoint, BCF logic works like the following pseudo code:
 *
 * ````
 * If numVisibleObjects < numInvisibleObjects
 *      save IDs of visible objects in BCF
 *      exceptions = "visible objects"
 * else
 *      save IDS of invisible objects in BCF
 *      exceptions = "invisible objects"
 * ````
 *
 * When loading the viewpoint again:
 *
 * ````
 * If exceptions = "visible objects"
 *      hide all objects
 *      show visible objects in BCF
 * else
 *      show all objects
 *      hide invisible objects in BCF
 * ````
 *
 * When the exception is "visible objects", loading the viewpoint shows all the objects in the first, which includes
 * objects in "schependomlaan", which can be confusing, because those were not even loaded when we first
 * saved the viewpoint..
 *
 * To solve this, we can supply a ````defaultInvisible```` option to {@link BCFViewpointsPlugin#getViewpoint}, which
 * will force the plugin to save the IDs of all visible objects while making invisible objects the exception.
 *
 * That way, when we load the viewpoint again, after loading model "schependomlaan", the plugin will hide all objects
 * in the scene first (which will include objects belonging to model "schependomlaan"), then make the objects in the
 * viewpoint visible (which will only be those of object "duplex").
 *
 * ````javascript
 * const viewpoint = bcfViewpoints.getViewpoint({ // Options
 *     //..
 *     defaultInvisible: true
 * });
 * ````
 *
 * [[Run an example](http://xeokit.github.io/xeokit-sdk/examples/#BCF_LoadViewpoint_defaultInvisible)]
 *
 * ## Behaviour with XKTLoaderPlugin globalizeObjectIds
 *
 * Whenever we use {@link XKTLoaderPlugin} to load duplicate copies of the same model, after configuring
 * {@link XKTLoaderPlugin#globalizeObjectIds} ````true```` to avoid ````Entity```` ID clashes, this has consequences
 * for BCF viewpoints created by {@link BCFViewpointsPlugin#getViewpoint}.
 *
 * When no duplicate copies of a model are loaded like this, viewpoints created by {@link BCFViewpointsPlugin#getViewpoint} will
 * continue to load as usual in other BIM viewers. Conversely, a viewpoint created for a single model in other BIM viewers
 * will continue to load as usual with ````BCFViewpointsPlugin````.
 *
 * When duplicate copies of a model are loaded, however, viewpoints created by {@link BCFViewpointsPlugin#getViewpoint}
 * will contain certain changes that will affect the viewpoint's portability, however. Such viewpoints will
 * use ````authoring_tool_id```` fields to save the globalized ````Entity#id```` values, which enables the viewpoints to
 * capture the states of the individual ````Entitys```` that represent the duplicate IFC elements. Take a look at the
 * following two examples to learn more.
 *
 * * [Example: Saving a BCF viewpoint containing duplicate models](https://xeokit.github.io/xeokit-sdk/examples/#BCF_SaveViewpoint_MultipleModels)
 * * [Example: Loading a BCF viewpoint containing duplicate models](https://xeokit.github.io/xeokit-sdk/examples/#BCF_LoadViewpoint_MultipleModels)
 *
 * **Caveat:** when loading a BCF viewpoint, we always assume that we have loaded in our target BIM viewer the same models that were
 * loaded in the viewpoint's original authoring application when the viewpoint was created.  In the case of multi-model
 * viewpoints, the target BIM viewer, whether it be xeokit or another BIM viewer, will need to first have those exact
 * models loaded, with their objects having globalized IDs, following the same prefixing scheme we're using in
 * xeokit. Then, the viewpoint's ````authoring_tool_id```` fields will be able to resolve to their objects within the
 * target viewer.
*
* @class BCFViewpointsPlugin
*/
export class BCFViewpointsPlugin {
    /**
     * @constructor
     * @param {Viewer} viewer The Viewer.
     * @param {Object} cfg  Plugin configuration.
     * @param {String} [cfg.id="BCFViewpoints"] Optional ID for this plugin, so that we can find it within {@link Viewer#plugins}.
     * @param {String} [cfg.originatingSystem] Identifies the originating system for BCF records.
     * @param {String} [cfg.authoringTool] Identifies the authoring tool for BCF records.
     */
    constructor(viewer: any, cfg?: {
        id?: string;
        originatingSystem?: string;
        authoringTool?: string;
    });
    /**
     * Identifies the originating system to include in BCF viewpoints saved by this plugin.
     * @property originatingSystem
     * @type {string}
     */
    originatingSystem: string;
    /**
     * Identifies the authoring tool to include in BCF viewpoints saved by this plugin.
     * @property authoringTool
     * @type {string}
     */
    authoringTool: string;
    /**
     * Saves viewer state to a BCF viewpoint.
     *
     * Note that xeokit's {@link Camera#look} is the **point-of-interest**, whereas the BCF ````camera_direction```` is a
     * direction vector. Therefore, we save ````camera_direction```` as the vector from {@link Camera#eye} to {@link Camera#look}.
     *
     * @param {*} [options] Options for getting the viewpoint.
     * @param {Boolean} [options.spacesVisible=false] Indicates whether ````IfcSpace```` types should be forced visible in the viewpoint.
     * @param {Boolean} [options.openingsVisible=false] Indicates whether ````IfcOpening```` types should be forced visible in the viewpoint.
     * @param {Boolean} [options.spaceBoundariesVisible=false] Indicates whether the boundaries of ````IfcSpace```` types should be visible in the viewpoint.
     * @param {Boolean} [options.snapshot=true] Indicates whether the snapshot should be included in the viewpoint.
     * @param {Boolean} [options.defaultInvisible=false] When ````true````, will save the default visibility of all objects
     * as ````false````. This means that when we load the viewpoint again, and there are additional models loaded that
     * were not saved in the viewpoint, those models will be hidden when we load the viewpoint, and that only the
     * objects in the viewpoint will be visible.
     * @param {Boolean} [options.reverseClippingPlanes=false] When ````true````, clipping planes are reversed (https://github.com/buildingSMART/BCF-XML/issues/193)
     * @returns {*} BCF JSON viewpoint object
     * @example
     *
     * const viewer = new Viewer();
     *
     * const bcfPlugin = new BCFPlugin(viewer, {
     *     //...
     * });
     *
     * const viewpoint = bcfPlugin.getViewpoint({ // Options - see constructor
     *     spacesVisible: false,          // Default
     *     spaceBoundariesVisible: false, // Default
     *     openingsVisible: false         // Default
     * });
     *
     * // viewpoint will resemble the following:
     *
     * {
     *     perspective_camera: {
     *         camera_view_point: {
     *             x: 0.0,
     *             y: 0.0,
     *             z: 0.0
     *         },
     *         camera_direction: {
     *             x: 1.0,
     *             y: 1.0,
     *             z: 2.0
     *         },
     *         camera_up_vector: {
     *             x: 0.0,
     *             y: 0.0,
     *             z: 1.0
     *         },
     *         field_of_view: 90.0
     *     },
     *     lines: [],
     *     clipping_planes: [{
     *         location: {
     *             x: 0.5,
     *             y: 0.5,
     *             z: 0.5
     *         },
     *         direction: {
     *             x: 1.0,
     *             y: 0.0,
     *             z: 0.0
     *         }
     *     }],
     *     bitmaps: [],
     *     snapshot: {
     *         snapshot_type: png,
     *         snapshot_data: "data:image/png;base64,......"
     *     },
     *     components: {
     *         visibility: {
     *             default_visibility: false,
     *             exceptions: [{
     *                 ifc_guid: 4$cshxZO9AJBebsni$z9Yk,
     *                 originating_system: xeokit.io,
     *                 authoring_tool_id: xeokit/v1.0
     *             }]
     *        },
     *         selection: [{
     *            ifc_guid: "4$cshxZO9AJBebsni$z9Yk",
     *         }]
     *     }
     * }
     */
    getViewpoint(options?: any): any;
    _createBCFComponents(objectIds: any): {
        ifc_guid: any;
        originating_system: string;
    }[];
    /**
     * Sets viewer state to the given BCF viewpoint.
     *
     * Note that xeokit's {@link Camera#look} is the **point-of-interest**, whereas the BCF ````camera_direction```` is a
     * direction vector. Therefore, when loading a BCF viewpoint, we set {@link Camera#look} to the absolute position
     * obtained by offsetting the BCF ````camera_view_point````  along ````camera_direction````.
     *
     * When loading a viewpoint, we also have the option to find {@link Camera#look} as the closest point of intersection
     * (on the surface of any visible and pickable {@link Entity}) with a 3D ray fired from ````camera_view_point```` in
     * the direction of ````camera_direction````.
     *
     * @param {*} bcfViewpoint  BCF JSON viewpoint object,
     * shows default visible entities and restores camera to initial default position.
     * @param {*} [options] Options for setting the viewpoint.
     * @param {Boolean} [options.rayCast=true] When ````true```` (default), will attempt to set {@link Camera#look} to the closest
     * point of surface intersection with a ray fired from the BCF ````camera_view_point```` in the direction of ````camera_direction````.
     * @param {Boolean} [options.immediate=true] When ````true```` (default), immediately set camera position.
     * @param {Boolean} [options.duration] Flight duration in seconds.  Overrides {@link CameraFlightAnimation#duration}. Only applies when ````immediate```` is ````false````.
     * @param {Boolean} [options.reset=true] When ````true```` (default), set {@link Entity#xrayed} and {@link Entity#highlighted} ````false```` on all scene objects.
     * @param {Boolean} [options.reverseClippingPlanes=false] When ````true````, clipping planes are reversed (https://github.com/buildingSMART/BCF-XML/issues/193)
     * @param {Boolean} [options.updateCompositeObjects=false] When ````true````, then when visibility and selection updates refer to composite objects (eg. an IfcBuildingStorey),
     * then this method will apply the updates to objects within those composites.
     */
    setViewpoint(bcfViewpoint: any, options?: any): void;
    _withBCFComponent(options: any, component: any, callback: any): void;
    /**
     * Destroys this BCFViewpointsPlugin.
     */
    destroy(): void;
}
