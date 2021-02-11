/**
 * {@link Viewer} plugin that loads models from a [BIMServer](http://bimserver.org).
 *
 * Tested with BIMServer v1.5.182 and IFC schema ifc2x3tc1.
 *
 * * For each model loaded, creates a tree of {@link Entity}s within its {@link Viewer}'s {@link Scene}, with the root {@link Entity} representing the model and sub-{@link Entity}s representing objects within the model.
 * * The root {@link Entity} will have {@link Entity#isModel} set ````true```` and will be registered by {@link Entity#id} in {@link Scene#models}.
 * * Each sub-{@link Entity} that represents an object will have {@link Entity#isObject} set ````true```` and will be registered by {@link Entity#id} in {@link Scene#objects}.
 * * When loading a model, we can specify a World-space transformation to position and orient it, along with initial rendering states to recursively apply to the Entity tree.
 *
 * ## Usage
 *
 * In the example below, we'll load the latest revision of a project's model from BIMSserver. We'll assume that we have a BIMServer
 * instance running and serving requests on port 8082, with a model loaded for project ID ````131073````.
 *
 * Since xeokit's default World "up" direction is +Y, while the model's "up" is +Z, we'll rotate the
 * model 90 degrees about the X-axis as we load it. Note that we could also instead configure xeokit to use +Z as "up".
 *
 * A BIMServerLoaderPlugin is configured with a BIMServerClient, which provides a client-side facade through which
 * we can issue RPC calls to the BIMServer Service Interface. The BIMServerLoaderPlugin makes RPC calls through that
 * to download the model and it's IFC metadata.
 *
 * Note that BIMServerLoaderPlugin works with BIMServer V1.5.182 or later.
 *
 * Read more about this example in the user guide on [Viewing Models from BIMServer](https://github.com/xeokit/xeokit-sdk/wiki/Viewing-Models-from-BIMServer).
 *
 *  [[Run this example](http://xeokit.github.io/xeokit-sdk/examples/#BIMServer_Schependomlaan)]
 *
 * ````javascript
 * import {Viewer} from "./../src/viewer/Viewer.js";
 * import BimServerClient from "./../src/viewer/utils/BIMServerClient/bimserverclient.js"
 * import {BIMServerLoaderPlugin} from "./../src/plugins/BIMServerLoaderPlugin/BIMServerLoaderPlugin.js";
 *
 * const bimServerAddress = "https://xeokit.cleverapps.io/";
 * const username = "kevin.flynn@en.com";
 * const password = "secretPassword";
 * const poid = 196609;
 *
 * // Create a xeokit Viewer
 * const viewer = new Viewer({
 *     canvasId: "myCanvas"
 * });
 *
 * // Create a BimServerClient
 * const bimServerClient = new BimServerClient(bimServerAddress);
 *
 * // Add a BIMServerLoaderPlugin to the Viewer, configured with the BIMServerClient
 * const bimServerLoader = new BIMServerLoaderPlugin(viewer, {
 *     bimServerClient: bimServerClient
 * });
 *
 * // Initialize the BIMServer client
 * bimServerClient.init(() => {
 *
 *     // Login to BIMServer
 *     bimServerClient.login(username, password, () => {
 *
 *         // Query a project by ID
 *         bimServerClient.call("ServiceInterface", "getProjectByPoid", {
 *             poid: poid
 *         }, (project) => {
 *
 *             // From the project info returned by BIMServerClient, we'll get the ID of the latest
 *             // model revision and the version of the IFC schema to which the model conforms.
 *
 *             // Load the latest revision of the project
 *
 *             const roid = project.lastRevisionId;
 *             const schema = project.schema;
 *
 *             var model = bimServerLoader.load({ // Returns an Entity
 *                 id: "myModel",
 *                 poid: poid,                      // Project ID
 *                 roid: roid,                      // Revision ID
 *                 schema: schema,                  // Schema version
 *                 edges: true,                     // Render with emphasized edges (default is false)
 *                 lambertMaterial: true,          // Lambertian flat-shading instead of default Blinn/Phong
 *                 scale: [0.001, 0.001, 0.001],    // Shrink the model a bit
 *                 rotation: [-90, 0, 0]            // Rotate model for World +Y "up"
 *             });
 *
 *             const scene = viewer.scene;  // xeokit.Scene
 *             const camera = scene.camera; // xeokit.Camera
 *
 *             model.on("loaded", () => { // When loaded, fit camera and start orbiting
 *                 camera.orbitPitch(20);
 *                 viewer.cameraFlight.flyTo(model);
 *                 scene.on("tick", () => {
 *                     camera.orbitYaw(0.3);
 *                 })
 *
 *                 // We can find the model Entity by ID
 *                 model = viewer.scene.models["myModel"];
 *
 *                 // To destroy the model, call destroy() on the model Entity
 *                 model.destroy();
 *             });
 *
 *             model.on("error", function(errMsg}
 *                  console.error("Error while loading: " + errMsg);
 *             });
 *         });
 *     });
 * });
 * ````
 * @class BIMServerLoaderPlugin
 */
export class BIMServerLoaderPlugin {
    /**
     * @constructor
     * @param {Viewer} viewer The Viewer.
     * @param {Object} cfg  Plugin configuration.
     * @param {String} [cfg.id="BIMServerModels"] Optional ID for this plugin, so that we can find it within {@link Viewer#plugins}.
     * @param {Object} cfg.bimServerClient A BIMServer client API instance.
     * @param {{String:Object}} [cfg.objectDefaults] Map of initial default states for each loaded {@link Entity} that represents an object. Default value for this parameter is {@link IFCObjectDefaults}.
     */
    constructor(viewer: any, cfg: {
        id: string;
        bimServerClient: any;
        objectDefaults: {
            String: any;
        };
    });
    /**
     * Version of BIMServer supported by this plugin.
     * @type {string}
     */
    BIMSERVER_VERSION: string;
    /**
     * The BIMServer API.
     * @type {BIMServerClient}
     */
    bimServerClient: any;
    /**
     * IFC types that are hidden by default.
     * @type {{IfcOpeningElement: boolean, IfcSpace: boolean}}
     */
    hiddenTypes: {
        IfcOpeningElement: boolean;
        IfcSpace: boolean;
    };
    /**
     * Sets map of initial default states for each loaded {@link Entity} that represents an object.
     *
     * Default value is {@link IFCObjectDefaults}.
     *
     * @type {{String: Object}}
     */
    set objectDefaults(arg: {
        String: any;
    });
    /**
     * Gets map of initial default states for each loaded {@link Entity} that represents an object.
     *
     * Default value is {@link IFCObjectDefaults}.
     *
     * @type {{String: Object}}
     */
    get objectDefaults(): {
        String: any;
    };
    _objectDefaults: any;
    /**
     * Loads a model from a BIMServer into this BIMServerLoaderPlugin's {@link Viewer}.
     *
     * Creates a tree of {@link Entity}s that represents the model.
     *
     * The root {@link Entity} will have {@link Entity#isModel} set true to indicate that it represents a model, and will therefore be registered in {@link Scene#models}.
     *
     * @param {Object} params Loading parameters.
     * @param {String} [params.id] ID to assign to the root {@link Entity#id}, unique among all components in the Viewer's {@link Scene}, generated automatically by default.
     * @param {Number} params.poid ID of the model's project within BIMServer.
     * @param {Number} params.roid ID of the model's revision within BIMServer. See the class example for how to query the latest project revision ID via the BIMServer client API.
     * @param {Number} params.schema The model's IFC schema. See the class example for how to query the project's schema via the BIMServer client API.
     * @param {{String:Object}} [params.objectDefaults] Map of initial default states for each loaded {@link Entity} that represents an object. Default value for this parameter is {@link IFCObjectDefaults}.
     * @param {Boolean} [params.edges=false] Whether or not xeokit renders the model with edges emphasized.
     * @param {Number[]} [params.position=[0,0,0]] The model World-space 3D position.
     * @param {Number[]} [params.scale=[1,1,1]] The model's World-space scale.
     * @param {Number[]} [params.rotation=[0,0,0]] The model's World-space rotation, as Euler angles given in degrees, for each of the X, Y and Z axis.
     * @param {Number[]} [params.matrix=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]] The model's world transform matrix. Overrides the position, scale and rotation parameters.
     * @param {Boolean} [params.backfaces=false] When true, allows visible backfaces, wherever specified. When false, ignores backfaces.
     * @param {Number} [params.edgeThreshold=20] When xraying, highlighting, selecting or edging, this is the threshold angle between normals of adjacent triangles, below which their shared wireframe edge is not drawn.
     * @returns {Entity} Root Entity representing the loaded model. The Entity will have {@link Entity#isModel} set ````true```` and will be registered by {@link Entity#id} in {@link Scene#models}
     */
    load(params: {
        id: string;
        poid: number;
        roid: number;
        schema: number;
        objectDefaults: {
            String: any;
        };
        edges: boolean;
        position: number[];
        scale: number[];
        rotation: number[];
        matrix: number[];
        backfaces: boolean;
        edgeThreshold: number;
    }): any;
    /**
     * Destroys this BIMServerLoaderPlugin.
     */
    destroy(): void;
}
