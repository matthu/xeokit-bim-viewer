/**
 * @desc A high-performance model representation for efficient rendering and low memory usage.
 *
 * # Examples
 *
 * * [PerformanceModel using geometry batching](http://xeokit.github.io/xeokit-sdk/examples/#sceneRepresentation_PerformanceModel_batching)
 * * [PerformanceModel using geometry batching and RTC coordinates](http://xeokit.github.io/xeokit-sdk/examples/#sceneRepresentation_PerformanceModel_batching_rtcCenter)
 * * [PerformanceModel using geometry instancing](http://xeokit.github.io/xeokit-sdk/examples/#sceneRepresentation_PerformanceModel_instancing)
 * * [PerformanceModel using geometry instancing and RTC coordinates](http://xeokit.github.io/xeokit-sdk/examples/#sceneRepresentation_PerformanceModel_instancing_rtcCenter)
 *
 * # Overview
 *
 * While xeokit's standard [scene graph](https://github.com/xeokit/xeokit-sdk/wiki/Scene-Graphs) is great for gizmos and medium-sized models, it doesn't scale up to millions of objects in terms of memory and rendering efficiency.
 *
 * For huge models, we have the ````PerformanceModel```` representation, which is optimized to pack large amounts of geometry into memory and render it efficiently using WebGL.
 *
 * ````PerformanceModel```` is the default model representation loaded by {@link GLTFLoaderPlugin}, {@link XKTLoaderPlugin} and {@link BIMServerLoaderPlugin}.
 *
 * In this tutorial you'll learn how to use ````PerformanceModel```` to create high-detail content programmatically. Ordinarily you'd be learning about ````PerformanceModel```` if you were writing your own model loader plugins.
 *
 * # Contents
 *
 * - [PerformanceModel](#performancemodel)
 * - [GPU-Resident Geometry](#gpu-resident-geometry)
 * - [Picking](#picking)
 * - [Example 1: Geometry Instancing](#example-1--geometry-instancing)
 * - [Finalizing a PerformanceModel](#finalizing-a-performancemodel)
 * - [Finding Entities](#finding-entities)
 * - [Example 2: Geometry Batching](#example-2--geometry-batching)
 * - [Classifying with Metadata](#classifying-with-metadata)
 * - [Querying Metadata](#querying-metadata)
 * - [Metadata Structure](#metadata-structure)
 * - [RTC Coordinates](#rtc-coordinates)
 *   - [Example 3: RTC Coordinates with Geometry Instancing](#example-2--rtc-coordinates-with-geometry-instancing)
 *   - [Example 4: RTC Coordinates with Geometry Batching](#example-2--rtc-coordinates-with-geometry-batching)
 *
 * ## PerformanceModel
 *
 * ````PerformanceModel```` uses two rendering techniques internally:
 *
 * 1. ***Geometry batching*** for unique geometries, combining those into a single WebGL geometry buffer, to render in one draw call, and
 * 2. ***geometry instancing*** for geometries that are shared by multiple meshes, rendering all instances of each shared geometry in one draw call.
 *
 * <br>
 * These techniques come with certain limitations:
 *
 * * Non-realistic rendering - while scene graphs can use xeokit's full set of material workflows, ````PerformanceModel```` uses simple Lambertian shading without textures.
 * * Static transforms - transforms within a ````PerformanceModel```` are static and cannot be dynamically translated, rotated and scaled the way {@link Node}s and {@link Mesh}es in scene graphs can.
 * * Immutable model representation - while scene graph {@link Node}s and
 * {@link Mesh}es can be dynamically plugged together, ````PerformanceModel```` is immutable,
 * since it packs its geometries into buffers and instanced arrays.
 *
 * ````PerformanceModel````'s API allows us to exploit batching and instancing, while exposing its elements as
 * abstract {@link Entity} types.
 *
 * {@link Entity} is the abstract base class for
 * the various xeokit components that represent models, objects, or anonymous visible elements. An Entity has a unique ID and can be
 * individually shown, hidden, selected, highlighted, ghosted, culled, picked and clipped, and has its own World-space boundary.
 *
 * * A ````PerformanceModel```` is an {@link Entity} that represents a model.
 * * A ````PerformanceModel```` represents each of its objects with an {@link Entity}.
 * * Each {@link Entity} has one or more meshes that define its shape.
 * * Each mesh has either its own unique geometry, or shares a geometry with other meshes.
 *
 * ## GPU-Resident Geometry
 *
 * For a low memory footprint, ````PerformanceModel```` stores its geometries in GPU memory only, compressed (quantized) as integers. Unfortunately, GPU-resident geometry is
 * not readable by JavaScript.
 *
 *
 * ## Example 1: Geometry Instancing
 *
 * In the example below, we'll use a ````PerformanceModel````
 * to build a simple table model using geometry instancing.
 *
 * We'll start by adding a reusable box-shaped geometry to our ````PerformanceModel````.
 *
 * Then, for each object in our model we'll add an {@link Entity}
 * that has a mesh that instances our box geometry, transforming and coloring the instance.
 *
 * [![](http://xeokit.io/img/docs/sceneGraph.png)](https://xeokit.github.io/xeokit-sdk/examples/#sceneRepresentation_PerformanceModel_instancing)
 *
 * [[Run this example](https://xeokit.github.io/xeokit-sdk/examples/#sceneRepresentation_PerformanceModel_instancing)]
 *
 * ````javascript
 * import {Viewer} from "../src/viewer/Viewer.js";
 * import {PerformanceModel} from "../src/viewer/scene/PerformanceModels/PerformanceModel.js";
 *
 * const viewer = new Viewer({
 *     canvasId: "myCanvas",
 *     transparent: true
 * });
 *
 * viewer.scene.camera.eye = [-21.80, 4.01, 6.56];
 * viewer.scene.camera.look = [0, -5.75, 0];
 * viewer.scene.camera.up = [0.37, 0.91, -0.11];
 *
 * // Build a PerformanceModel representing a table
 * // with four legs, using geometry instancing
 *
 * const performanceModel = new PerformanceModel(viewer.scene, {
 *     id: "table",
 *     isModel: true, // <--- Registers PerformanceModel in viewer.scene.models
 *     position: [0, 0, 0],
 *     scale: [1, 1, 1],
 *     rotation: [0, 0, 0]
 * });
 *
 * // Create a reusable geometry within the PerformanceModel
 * // We'll instance this geometry by five meshes
 *
 * performanceModel.createGeometry({
 *
 *     id: "myBoxGeometry",
 *
 *     // The primitive type - allowed values are "points", "lines",
 *     // "line-loop", "line-strip", "triangles", "triangle-strip"
 *     // and "triangle-fan".  See the OpenGL/WebGL specification docs
 *     // for how the coordinate arrays are supposed to be laid out.
 *     primitive: "triangles",
 *
 *     // The vertices - eight for our cube, each
 *     // one spanning three array elements for X,Y and Z
 *     positions: [
 *          1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, // v0-v1-v2-v3 front
 *          1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, // v0-v3-v4-v1 right
 *          1, 1, 1, 1, 1, -1, -1, 1, -1, -1, 1, 1, // v0-v1-v6-v1 top
 *          -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, // v1-v6-v7-v2 left
 *          -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, // v7-v4-v3-v2 bottom
 *          1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1 // v4-v7-v6-v1 back
 *     ],
 *
 *     // Normal vectors, one for each vertex
 *     normals: [
 *         0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, // v0-v1-v2-v3 front
 *         1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, // v0-v3-v4-v5 right
 *         0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, // v0-v5-v6-v1 top
 *         -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, // v1-v6-v7-v2 left
 *         0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, // v7-v4-v3-v2 bottom
 *         0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1 // v4-v7-v6-v5 back
 *     ],
 *
 *     // Indices - these organise the positions and and normals
 *     // into geometric primitives in accordance with the "primitive" parameter,
 *     // in this case a set of three indices for each triangle.
 *     //
 *     // Note that each triangle is specified in counter-clockwise winding order.
 *     //
 *     indices: [
 *         0, 1, 2, 0, 2, 3, // front
 *         4, 5, 6, 4, 6, 7, // right
 *         8, 9, 10, 8, 10, 11, // top
 *         12, 13, 14, 12, 14, 15, // left
 *         16, 17, 18, 16, 18, 19, // bottom
 *         20, 21, 22, 20, 22, 23
 *     ]
 * });
 *
 * // Red table leg
 *
 * performanceModel.createMesh({
 *     id: "redLegMesh",
 *     geometryId: "myBoxGeometry",
 *     position: [-4, -6, -4],
 *     scale: [1, 3, 1],
 *     rotation: [0, 0, 0],
 *     color: [1, 0.3, 0.3]
 * });
 *
 * performanceModel.createEntity({
 *     id: "redLeg",
 *     meshIds: ["redLegMesh"],
 *     isObject: true // <---- Registers Entity by ID on viewer.scene.objects
 * });
 *
 * // Green table leg
 *
 * performanceModel.createMesh({
 *     id: "greenLegMesh",
 *     geometryId: "myBoxGeometry",
 *     position: [4, -6, -4],
 *     scale: [1, 3, 1],
 *     rotation: [0, 0, 0],
 *     color: [0.3, 1.0, 0.3]
 * });
 *
 * performanceModel.createEntity({
 *     id: "greenLeg",
 *     meshIds: ["greenLegMesh"],
 *     isObject: true // <---- Registers Entity by ID on viewer.scene.objects
 * });
 *
 * // Blue table leg
 *
 * performanceModel.createMesh({
 *     id: "blueLegMesh",
 *     geometryId: "myBoxGeometry",
 *     position: [4, -6, 4],
 *     scale: [1, 3, 1],
 *     rotation: [0, 0, 0],
 *     color: [0.3, 0.3, 1.0]
 * });
 *
 * performanceModel.createEntity({
 *     id: "blueLeg",
 *     meshIds: ["blueLegMesh"],
 *     isObject: true // <---- Registers Entity by ID on viewer.scene.objects
 * });
 *
 * // Yellow table leg
 *
 * performanceModel.createMesh({
 *      id: "yellowLegMesh",
 *      geometryId: "myBoxGeometry",
 *      position: [-4, -6, 4],
 *      scale: [1, 3, 1],
 *      rotation: [0, 0, 0],
 *      color: [1.0, 1.0, 0.0]
 * });
 *
 * performanceModel.createEntity({
 *     id: "yellowLeg",
 *     meshIds: ["yellowLegMesh"],
 *     isObject: true // <---- Registers Entity by ID on viewer.scene.objects
 * });
 *
 * // Purple table top
 *
 * performanceModel.createMesh({
 *     id: "purpleTableTopMesh",
 *     geometryId: "myBoxGeometry",
 *     position: [0, -3, 0],
 *     scale: [6, 0.5, 6],
 *     rotation: [0, 0, 0],
 *     color: [1.0, 0.3, 1.0]
 * });
 *
 * performanceModel.createEntity({
 *     id: "purpleTableTop",
 *     meshIds: ["purpleTableTopMesh"],
 *     isObject: true // <---- Registers Entity by ID on viewer.scene.objects
 * });
 *  ````
 *
 * ## Finalizing a PerformanceModel
 *
 * Before we can view and interact with our ````PerformanceModel````, we need to **finalize** it. Internally, this causes the ````PerformanceModel```` to build the
 * vertex buffer objects (VBOs) that support our geometry instances. When using geometry batching (see next example),
 * this causes ````PerformanceModel```` to build the VBOs that combine the batched geometries. Note that you can do both instancing and
 * batching within the same ````PerformanceModel````.
 *
 * Once finalized, we can't add anything more to our ````PerformanceModel````.
 *
 * ```` javascript
 * performanceModel.finalize();
 * ````
 *
 * ## Finding Entities
 *
 * As mentioned earlier, {@link Entity} is
 * the abstract base class for components that represent models, objects, or just
 * anonymous visible elements.
 *
 * Since we created configured our ````PerformanceModel```` with ````isModel: true````,
 * we're able to find it as an Entity by ID in ````viewer.scene.models````. Likewise, since
 * we configured each of its Entities with ````isObject: true````, we're able to
 * find them in  ````viewer.scene.objects````.
 *
 *
 * ````javascript
 * // Get the whole table model Entity
 * const table = viewer.scene.models["table"];
 *
 *  // Get some leg object Entities
 * const redLeg = viewer.scene.objects["redLeg"];
 * const greenLeg = viewer.scene.objects["greenLeg"];
 * const blueLeg = viewer.scene.objects["blueLeg"];
 * ````
 *
 * ## Example 2: Geometry Batching
 *
 * Let's once more use a ````PerformanceModel````
 * to build the simple table model, this time exploiting geometry batching.
 *
 *  [![](http://xeokit.io/img/docs/sceneGraph.png)](https://xeokit.github.io/xeokit-sdk/examples/#sceneRepresentation_PerformanceModel_batching)
 *
 * * [[Run this example](https://xeokit.github.io/xeokit-sdk/examples/#sceneRepresentation_PerformanceModel_batching)]
 *
 * ````javascript
 * import {Viewer} from "../src/viewer/Viewer.js";
 * import {PerformanceModel} from "../src/viewer/scene/PerformanceModel/PerformanceModel.js";
 *
 * const viewer = new Viewer({
 *     canvasId: "myCanvas",
 *     transparent: true
 * });
 *
 * viewer.scene.camera.eye = [-21.80, 4.01, 6.56];
 * viewer.scene.camera.look = [0, -5.75, 0];
 * viewer.scene.camera.up = [0.37, 0.91, -0.11];
 *
 * // Create a PerformanceModel representing a table with four legs, using geometry batching
 * const performanceModel = new PerformanceModel(viewer.scene, {
 *     id: "table",
 *     isModel: true,  // <--- Registers PerformanceModel in viewer.scene.models
 *     position: [0, 0, 0],
 *     scale: [1, 1, 1],
 *     rotation: [0, 0, 0]
 * });
 *
 * // Red table leg
 *
 * performanceModel.createMesh({
 *     id: "redLegMesh",
 *
 *     // Geometry arrays are same as for the earlier batching example
 *     primitive: "triangles",
 *     positions: [ 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1 ... ],
 *     normals: [ 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, ... ],
 *     indices: [ 0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, ... ],
 *     position: [-4, -6, -4],
 *     scale: [1, 3, 1],
 *     rotation: [0, 0, 0],
 *     color: [1, 0.3, 0.3]
 * });
 *
 * performanceModel.createEntity({
 *     id: "redLeg",
 *     meshIds: ["redLegMesh"],
 *     isObject: true // <---- Registers Entity by ID on viewer.scene.objects
 * });
 *
 * // Green table leg
 *
 * performanceModel.createMesh({
 *     id: "greenLegMesh",
 *     primitive: "triangles",
 *     primitive: "triangles",
 *     positions: [ 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1 ... ],
 *     normals: [ 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, ... ],
 *     indices: [ 0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, ... ],
 *     position: [4, -6, -4],
 *     scale: [1, 3, 1],
 *     rotation: [0, 0, 0],
 *     color: [0.3, 1.0, 0.3]
 * });
 *
 * performanceModel.createEntity({
 *     id: "greenLeg",
 *     meshIds: ["greenLegMesh"],
 *     isObject: true // <---- Registers Entity by ID on viewer.scene.objects
 * });
 *
 * // Blue table leg
 *
 * performanceModel.createMesh({
 *     id: "blueLegMesh",
 *     primitive: "triangles",
 *     positions: [ 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1 ... ],
 *     normals: [ 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, ... ],
 *     indices: [ 0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, ... ],
 *     position: [4, -6, 4],
 *     scale: [1, 3, 1],
 *     rotation: [0, 0, 0],
 *     color: [0.3, 0.3, 1.0]
 * });
 *
 * performanceModel.createEntity({
 *     id: "blueLeg",
 *     meshIds: ["blueLegMesh"],
 *     isObject: true // <---- Registers Entity by ID on viewer.scene.objects
 * });
 *
 * // Yellow table leg object
 *
 * performanceModel.createMesh({
 *     id: "yellowLegMesh",
 *     positions: [ 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1 ... ],
 *     normals: [ 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, ... ],
 *     indices: [ 0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, ... ],
 *     position: [-4, -6, 4],
 *     scale: [1, 3, 1],
 *     rotation: [0, 0, 0],
 *     color: [1.0, 1.0, 0.0]
 * });
 *
 * performanceModel.createEntity({
 *     id: "yellowLeg",
 *     meshIds: ["yellowLegMesh"],
 *     isObject: true // <---- Registers Entity by ID on viewer.scene.objects
 * });
 *
 * // Purple table top
 *
 * performanceModel.createMesh({
 *     id: "purpleTableTopMesh",
 *     positions: [ 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1 ... ],
 *     normals: [ 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, ... ],
 *     indices: [ 0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, ... ],
 *     position: [0, -3, 0],
 *     scale: [6, 0.5, 6],
 *     rotation: [0, 0, 0],
 *     color: [1.0, 0.3, 1.0]
 * });
 *
 * performanceModel.createEntity({
 *     id: "purpleTableTop",
 *     meshIds: ["purpleTableTopMesh"],
 *     isObject: true // <---- Registers Entity by ID on viewer.scene.objects
 * });
 *
 * // Finalize the PerformanceModel.
 *
 * performanceModel.finalize();
 *
 * // Find BigModelNodes by their model and object IDs
 *
 * // Get the whole table model
 * const table = viewer.scene.models["table"];
 *
 * // Get some leg objects
 * const redLeg = viewer.scene.objects["redLeg"];
 * const greenLeg = viewer.scene.objects["greenLeg"];
 * const blueLeg = viewer.scene.objects["blueLeg"];
 * ````
 *
 * ## Classifying with Metadata
 *
 * In the previous examples, we used ````PerformanceModel```` to build
 * two versions of the same table model, to demonstrate geometry batching and geometry instancing.
 *
 * We'll now classify our {@link Entity}s with metadata. This metadata
 * will work the same for both our examples, since they create the exact same structure of {@link Entity}s
 * to represent their models and objects. The abstract Entity type is, after all, intended to provide an abstract interface through which differently-implemented scene content can be accessed uniformly.
 *
 * To create the metadata, we'll create a {@link MetaModel} for our model,
 * with a {@link MetaObject} for each of it's objects. The MetaModel and MetaObjects
 * get the same IDs as the {@link Entity}s that represent their model and objects within our scene.
 *
 * ```` javascript
 * const furnitureMetaModel = viewer.metaScene.createMetaModel("furniture", {         // Creates a MetaModel in the MetaScene
 *
 *      "projectId": "myTableProject",
 *      "revisionId": "V1.0",
 *
 *      "metaObjects": [
 *          {                               // Creates a MetaObject in the MetaModel
 *              "id": "table",
 *              "name": "Table",            // Same ID as an object Entity
 *              "type": "furniture",        // Arbitrary type, could be IFC type
 *              "properties": {             // Arbitrary properties, could be IfcPropertySet
 *                  "cost": "200"
 *              }
 *          },
 *          {
 *              "id": "redLeg",
 *              "name": "Red table Leg",
 *              "type": "leg",
 *              "parent": "table",           // References first MetaObject as parent
 *              "properties": {
 *                  "material": "wood"
 *              }
 *          },
 *          {
 *              "id": "greenLeg",           // Node with corresponding id does not need to exist
 *              "name": "Green table leg",  // and MetaObject does not need to exist for Node with an id
 *              "type": "leg",
 *              "parent": "table",
 *              "properties": {
 *                  "material": "wood"
 *              }
 *          },
 *          {
 *              "id": "blueLeg",
 *              "name": "Blue table leg",
 *              "type": "leg",
 *              "parent": "table",
 *              "properties": {
 *                  "material": "wood"
 *              }
 *          },
 *          {
 *              "id": "yellowLeg",
 *              "name": "Yellow table leg",
 *              "type": "leg",
 *              "parent": "table",
 *              "properties": {
 *                  "material": "wood"
 *              }
 *          },
 *          {
 *              "id": "tableTop",
 *              "name": "Purple table top",
 *              "type": "surface",
 *              "parent": "table",
 *              "properties": {
 *                  "material": "formica",
 *                  "width": "60",
 *                  "depth": "60",
 *                  "thickness": "5"
 *              }
 *          }
 *      ]
 *  });
 * ````
 *
 * ## Querying Metadata
 *
 * Having created and classified our model (either the instancing or batching example), we can now find the {@link MetaModel}
 * and {@link MetaObject}s using the IDs of their
 * corresponding {@link Entity}s.
 *
 * ````JavaScript
 * const furnitureMetaModel = scene.metaScene.metaModels["furniture"];
 *
 * const redLegMetaObject = scene.metaScene.metaObjects["redLeg"];
 * ````
 *
 * In the snippet below, we'll log metadata on each {@link Entity} we click on:
 *
 * ````JavaScript
 * viewer.scene.input.on("mouseclicked", function (coords) {
 *
 *      const hit = viewer.scene.pick({
 *          canvasPos: coords
 *      });
 *
 *      if (hit) {
 *          const entity = hit.entity;
 *          const metaObject = viewer.metaScene.metaObjects[entity.id];
 *          if (metaObject) {
 *              console.log(JSON.stringify(metaObject.getJSON(), null, "\t"));
 *          }
 *      }
 *  });
 * ````
 *
 * ## Metadata Structure
 *
 * The {@link MetaModel}
 * organizes its {@link MetaObject}s in
 * a tree that describes their structural composition:
 *
 * ````JavaScript
 * // Get metadata on the root object
 * const tableMetaObject = furnitureMetaModel.rootMetaObject;
 *
 * // Get metadata on the leg objects
 * const redLegMetaObject = tableMetaObject.children[0];
 * const greenLegMetaObject = tableMetaObject.children[1];
 * const blueLegMetaObject = tableMetaObject.children[2];
 * const yellowLegMetaObject = tableMetaObject.children[3];
 * ````
 *
 * Given an {@link Entity}, we can find the object or model of which it is a part, or the objects that comprise it. We can also generate UI
 * components from the metadata, such as the tree view demonstrated in [this demo](https://xeokit.github.io/xeokit-sdk/examples/#BIMOffline_glTF_OTCConferenceCenter).
 *
 * This hierarchy allows us to express the hierarchical structure of a model while representing it in
 * various ways in the 3D scene (such as with ````PerformanceModel````, which
 * has a non-hierarchical scene representation).
 *
 * Note also that a {@link MetaObject} does not need to have a corresponding
 * {@link Entity} and vice-versa.
 *
 * # RTC Coordinates for 64-Bit Precision
 *
 * ````PerformanceModel```` can emulate 64-bit precision on GPUs using relative-to-center (RTC) coordinates.
 *
 * Consider a model that contains many small objects, but with such large spatial extents that 32 bits of GPU precision (accurate to ~7 digits) will not be sufficient to render all of the the objects without jittering.
 *
 * To prevent jittering, we could spatially subdivide the objects into "tiles". Each tile would have a center position, and the positions of the objects within the tile would be relative to that center ("RTC coordinates").
 *
 * While the center positions of the tiles would be 64-bit values, the object positions only need to be 32-bit.
 *
 * Internally, when rendering an object with RTC coordinates, xeokit first temporarily translates the camera viewing matrix by the object's tile's RTC center, on the CPU, using 64-bit math.
 *
 * Then xeokit loads the viewing matrix into its WebGL shaders, where math happens at 32-bit precision. Within the shaders, the matrix is effectively down-cast to 32-bit precision, and the object's 32-bit vertex positions are transformed by the matrix.
 *
 * We see no jittering, because with RTC a detectable loss of GPU accuracy only starts happening to objects as they become very distant from the camera viewpoint, at which point they are too small to be discernible anyway.
 *
 * ## RTC Coordinates with Geometry Instancing
 *
 * To use RTC with ````PerformanceModel```` geometry instancing, we specify an RTC center for the geometry. Then ````PerformanceModel```` assumes that all meshes that instance that geometry are within the same RTC coordinate system, ie. the meshes ````position```` and ````rotation```` properties are assumed to be relative to the geometry's ````rtcCenter````.
 *
 * For simplicity, our example's meshes all instance the same geometry. Therefore, our example model has only one RTC center.
 *
 * Note that the axis-aligned World-space boundary (AABB) of our model is ````[ -6, -9, -6, 1000000006, -2.5, 1000000006]````.
 *
 * [![](http://xeokit.io/img/docs/sceneGraph.png)](https://xeokit.github.io/xeokit-sdk/examples/#sceneRepresentation_PerformanceModel_batching)
 *
 * * [[Run this example](https://xeokit.github.io/xeokit-sdk/examples/#sceneRepresentation_PerformanceModel_instancing_rtcCenter)]
 *
 * ````javascript
 * const rtcCenter = [100000000, 0, 100000000];
 *
 * performanceModel.createGeometry({
 *     id: "box",
 *     rtcCenter: rtcCenter, // This geometry's positions, and the transforms of all meshes that instance the geometry, are relative to the RTC center
 *     primitive: "triangles",
 *     positions: [ 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1 ... ],
 *     normals: [ 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, ... ],
 *     indices: [ 0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, ... ],
 * });
 *
 * performanceModel.createMesh({
 *     id: "leg1",
 *     geometryId: "box",
 *     position: [-4, -6, -4],
 *     scale: [1, 3, 1],
 *     rotation: [0, 0, 0],
 *     color: [1, 0.3, 0.3]
 * });
 *
 * performanceModel.createEntity({
 *     meshIds: ["leg1"],
 *     isObject: true
 * });
 *
 * performanceModel.createMesh({
 *     id: "leg2",
 *     geometryId: "box",
 *     position: [4, -6, -4],
 *     scale: [1, 3, 1],
 *     rotation: [0, 0, 0],
 *     color: [0.3, 1.0, 0.3]
 * });
 *
 * performanceModel.createEntity({
 *     meshIds: ["leg2"],
 *     isObject: true
 * });
 *
 * performanceModel.createMesh({
 *     id: "leg3",
 *     geometryId: "box",
 *     position: [4, -6, 4],
 *     scale: [1, 3, 1],
 *     rotation: [0, 0, 0],
 *     color: [0.3, 0.3, 1.0]
 * });
 *
 * performanceModel.createEntity({
 *     meshIds: ["leg3"],
 *     isObject: true
 * });
 *
 * performanceModel.createMesh({
 *     id: "leg4",
 *     geometryId: "box",
 *     position: [-4, -6, 4],
 *     scale: [1, 3, 1],
 *     rotation: [0, 0, 0],
 *     color: [1.0, 1.0, 0.0]
 * });
 *
 * performanceModel.createEntity({
 *     meshIds: ["leg4"],
 *     isObject: true
 * });
 *
 * performanceModel.createMesh({
 *     id: "top",
 *     geometryId: "box",
 *     position: [0, -3, 0],
 *     scale: [6, 0.5, 6],
 *     rotation: [0, 0, 0],
 *     color: [1.0, 0.3, 1.0]
 * });
 *
 * performanceModel.createEntity({
 *     meshIds: ["top"],
 *     isObject: true
 * });
 * ````
 *
 * ## RTC Coordinates with Geometry Batching
 *
 * To use RTC with ````PerformanceModel```` geometry batching, we specify an RTC center (````rtcCenter````) for each mesh. For performance, we try to have as many meshes share the same value for ````rtcCenter```` as possible. Each mesh's ````positions````, ````position```` and ````rotation```` properties are assumed to be relative to ````rtcCenter````.
 *
 * For simplicity, the meshes in our example all share the same RTC center.
 *
 * The axis-aligned World-space boundary (AABB) of our model is ````[ -6, -9, -6, 1000000006, -2.5, 1000000006]````.
 *
 * [![](http://xeokit.io/img/docs/sceneGraph.png)](https://xeokit.github.io/xeokit-sdk/examples/#sceneRepresentation_PerformanceModel_batching)
 *
 * * [[Run this example](https://xeokit.github.io/xeokit-sdk/examples/#sceneRepresentation_PerformanceModel_batching_rtcCenter)]
 *
 * ````javascript
 * const rtcCenter = [100000000, 0, 100000000];
 *
 * performanceModel.createMesh({
 *     id: "leg1",
 *     rtcCenter: rtcCenter, // This mesh's positions and transforms are relative to the RTC center
 *     primitive: "triangles",
 *     positions: [ 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1 ... ],
 *     normals: [ 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, ... ],
 *     indices: [ 0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, ... ],
 *     position: [-4, -6, -4],
 *     scale: [1, 3, 1],
 *     rotation: [0, 0, 0],
 *     color: [1, 0.3, 0.3]
 * });
 *
 * performanceModel.createEntity({
 *     meshIds: ["leg1"],
 *     isObject: true
 * });
 *
 * performanceModel.createMesh({
 *     id: "leg2",
 *     rtcCenter: rtcCenter, // This mesh's positions and transforms are relative to the RTC center
 *     primitive: "triangles",
 *     positions: [ 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1 ... ],
 *     normals: [ 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, ... ],
 *     indices: [ 0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, ... ],
 *     position: [4, -6, -4],
 *     scale: [1, 3, 1],
 *     rotation: [0, 0, 0],
 *     color: [0.3, 1.0, 0.3]
 * });
 *
 * performanceModel.createEntity({
 *     meshIds: ["leg2"],
 *     isObject: true
 * });
 *
 * performanceModel.createMesh({
 *     id: "leg3",
 *     rtcCenter: rtcCenter, // This mesh's positions and transforms are relative to the RTC center
 *     primitive: "triangles",
 *     positions: [ 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1 ... ],
 *     normals: [ 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, ... ],
 *     indices: [ 0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, ... ],
 *     position: [4, -6, 4],
 *     scale: [1, 3, 1],
 *     rotation: [0, 0, 0],
 *     color: [0.3, 0.3, 1.0]
 * });
 *
 * performanceModel.createEntity({
 *     meshIds: ["leg3"],
 *     isObject: true
 * });
 *
 * performanceModel.createMesh({
 *     id: "leg4",
 *     rtcCenter: rtcCenter, // This mesh's positions and transforms are relative to the RTC center
 *     primitive: "triangles",
 *     positions: [ 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1 ... ],
 *     normals: [ 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, ... ],
 *     indices: [ 0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, ... ],
 *     position: [-4, -6, 4],
 *     scale: [1, 3, 1],
 *     rotation: [0, 0, 0],
 *     color: [1.0, 1.0, 0.0]
 * });
 *
 * performanceModel.createEntity({
 *     meshIds: ["leg4"],
 *     isObject: true
 * });
 *
 * performanceModel.createMesh({
 *     id: "top",
 *     rtcCenter: rtcCenter, // This mesh's positions and transforms are relative to the RTC center
 *     primitive: "triangles",
 *     positions: [ 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1 ... ],
 *     normals: [ 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, ... ],
 *     indices: [ 0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, ... ],
 *     position: [0, -3, 0],
 *     scale: [6, 0.5, 6],
 *     rotation: [0, 0, 0],
 *     color: [1.0, 0.3, 1.0]
 * });
 *
 * performanceModel.createEntity({
 *     meshIds: ["top"],
 *     isObject: true
 * });
 ````
 *
 * @implements {Drawable}
 * @implements {Entity}
 */
export class PerformanceModel {
    /**
     * @constructor
     * @param {Component} owner Owner component. When destroyed, the owner will destroy this component as well.
     * @param {*} [cfg] Configs
     * @param {String} [cfg.id] Optional ID, unique among all components in the parent scene, generated automatically when omitted.
     * @param {Boolean} [cfg.isModel] Specify ````true```` if this PerformanceModel represents a model, in which case the PerformanceModel will be registered by {@link PerformanceModel#id} in {@link Scene#models} and may also have a corresponding {@link MetaModel} with matching {@link MetaModel#id}, registered by that ID in {@link MetaScene#metaModels}.
     * @param {Number[]} [cfg.position=[0,0,0]] Local 3D position.
     * @param {Number[]} [cfg.scale=[1,1,1]] Local scale.
     * @param {Number[]} [cfg.rotation=[0,0,0]] Local rotation, as Euler angles given in degrees, for each of the X, Y and Z axis.
     * @param {Number[]} [cfg.matrix=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1] Local modelling transform matrix. Overrides the position, scale and rotation parameters.
     * @param {Boolean} [cfg.visible=true] Indicates if the PerformanceModel is initially visible.
     * @param {Boolean} [cfg.culled=false] Indicates if the PerformanceModel is initially culled from view.
     * @param {Boolean} [cfg.pickable=true] Indicates if the PerformanceModel is initially pickable.
     * @param {Boolean} [cfg.clippable=true] Indicates if the PerformanceModel is initially clippable.
     * @param {Boolean} [cfg.collidable=true] Indicates if the PerformanceModel is initially included in boundary calculations.
     * @param {Boolean} [cfg.xrayed=false] Indicates if the PerformanceModel is initially xrayed.
     * @param {Boolean} [cfg.highlighted=false] Indicates if the PerformanceModel is initially highlighted.
     * @param {Boolean} [cfg.selected=false] Indicates if the PerformanceModel is initially selected.
     * @param {Boolean} [cfg.edges=false] Indicates if the PerformanceModel's edges are initially emphasized.
     * @param {Number[]} [cfg.colorize=[1.0,1.0,1.0]] PerformanceModel's initial RGB colorize color, multiplies by the rendered fragment colors.
     * @param {Number} [cfg.opacity=1.0] PerformanceModel's initial opacity factor, multiplies by the rendered fragment alpha.
     * @param {Boolean} [cfg.saoEnabled=true] Indicates if Scalable Ambient Obscurance (SAO) will apply to this PerformanceModel. SAO is configured by the Scene's {@link SAO} component.
     * @param {Boolean} [cfg.backfaces=false] Indicates if backfaces are visible.
     * @param {Number} [cfg.edgeThreshold=10] When xraying, highlighting, selecting or edging, this is the threshold angle between normals of adjacent triangles, below which their shared wireframe edge is not drawn.
     */
    constructor(owner: any, cfg?: any);
    _aabb: any;
    _aabbDirty: boolean;
    _layerList: any[];
    _nodeList: any[];
    _lastDecodeMatrix: any;
    _instancingLayers: {};
    _currentBatchingLayer: any;
    _batchingScratchMemory: any;
    _meshes: {};
    _nodes: {};
    /** @private **/
    private renderFlags;
    /**
     * @private
     */
    private numGeometries;
    /**
     * @private
     */
    private numPortions;
    /**
     * @private
     */
    private numVisibleLayerPortions;
    /**
     * @private
     */
    private numTransparentLayerPortions;
    /**
     * @private
     */
    private numXRayedLayerPortions;
    /**
     * @private
     */
    private numHighlightedLayerPortions;
    /**
     * @private
     */
    private numSelectedLayerPortions;
    /**
     * @private
     */
    private numEdgesLayerPortions;
    /**
     * @private
     */
    private numPickableLayerPortions;
    /**
     * @private
     */
    private numClippableLayerPortions;
    /**
     * @private
     */
    private numCulledLayerPortions;
    /** @private */
    private numEntities;
    /** @private */
    private _numTriangles;
    _edgeThreshold: any;
    /**
     * Sets if this PerformanceModel is visible.
     *
     * The PerformanceModel is only rendered when {@link PerformanceModel#visible} is ````true```` and {@link PerformanceModel#culled} is ````false````.
     **
     * @type {Boolean}
     */
    set visible(arg: boolean);
    /**
     * Gets if any {@link Entity}s in this PerformanceModel are visible.
     *
     * The PerformanceModel is only rendered when {@link PerformanceModel#visible} is ````true```` and {@link PerformanceModel#culled} is ````false````.
     *
     * @type {Boolean}
     */
    get visible(): boolean;
    /**
     * Sets if this PerformanceModel is culled from view.
     *
     * The PerformanceModel is only rendered when {@link PerformanceModel#visible} is true and {@link PerformanceModel#culled} is false.
     *
     * @type {Boolean}
     */
    set culled(arg: boolean);
    /**
     * Gets if this PerformanceModel is culled from view.
     *
     * The PerformanceModel is only rendered when {@link PerformanceModel#visible} is true and {@link PerformanceModel#culled} is false.
     *
     * @type {Boolean}
     */
    get culled(): boolean;
    /**
     * Sets if {@link Entity}s in this PerformanceModel are pickable.
     *
     * Picking is done via calls to {@link Scene#pick}.
     *
     * @type {Boolean}
     */
    set pickable(arg: boolean);
    /**
     * Gets if this PerformanceModel is pickable.
     *
     * Picking is done via calls to {@link Scene#pick}.
     *
     * @type {Boolean}
     */
    get pickable(): boolean;
    /**
     * Sets if {@link Entity}s in this PerformanceModel are clippable.
     *
     * Clipping is done by the {@link SectionPlane}s in {@link Scene#sectionPlanes}.
     *
     * @type {Boolean}
     */
    set clippable(arg: boolean);
    /**
     * Gets if {@link Entity}s in this PerformanceModel are clippable.
     *
     * Clipping is done by the {@link SectionPlane}s in {@link Scene#sectionPlanes}.
     *
     * @type {Boolean}
     */
    get clippable(): boolean;
    /**
     * Sets if {@link Entity}s in this PerformanceModel are collidable.
     *
     * @type {Boolean}
     */
    set collidable(arg: boolean);
    /**
     * Gets if this PerformanceModel is collidable.
     *
     * @type {Boolean}
     */
    get collidable(): boolean;
    /**
     * Sets if this PerformanceModel casts a shadow.
     *
     * @type {Boolean}
     */
    set castsShadow(arg: boolean);
    /**
     * Gets if this PerformanceModel casts a shadow.
     *
     * @type {Boolean}
     */
    get castsShadow(): boolean;
    /**
     * Sets if this PerformanceModel can have shadow cast upon it.
     *
     * @type {Boolean}
     */
    set receivesShadow(arg: boolean);
    /**
     * Sets if this PerformanceModel can have shadow cast upon it.
     *
     * @type {Boolean}
     */
    get receivesShadow(): boolean;
    /**
     * Sets if all {@link Entity}s in this PerformanceModel are xrayed.
     *
     * @type {Boolean}
     */
    set xrayed(arg: boolean);
    /**
     * Gets if any {@link Entity}s in this PerformanceModel are xrayed.
     *
     * @type {Boolean}
     */
    get xrayed(): boolean;
    /**
     * Sets if all {@link Entity}s in this PerformanceModel are highlighted.
     *
     * @type {Boolean}
     */
    set highlighted(arg: boolean);
    /**
     * Gets if any {@link Entity}s in this PerformanceModel are highlighted.
     *
     * @type {Boolean}
     */
    get highlighted(): boolean;
    /**
     * Sets if all {@link Entity}s in this PerformanceModel are selected.
     *
     * @type {Boolean}
     */
    set selected(arg: boolean);
    /**
     * Gets if any {@link Entity}s in this PerformanceModel are selected.
     *
     * @type {Boolean}
     */
    get selected(): boolean;
    /**
     * Sets if all {@link Entity}s in this PerformanceModel have edges emphasised.
     *
     * @type {Boolean}
     */
    set edges(arg: boolean);
    /**
     * Gets if any {@link Entity}s in this PerformanceModel have edges emphasised.
     *
     * @type {Boolean}
     */
    get edges(): boolean;
    /**
     * Sets the RGB colorize color for this PerformanceModel.
     *
     * Multiplies by rendered fragment colors.
     *
     * Each element of the color is in range ````[0..1]````.
     *
     * @type {Number[]}
     */
    set colorize(arg: number[]);
    /**
     * Gets the RGB colorize color for this PerformanceModel.
     *
     * Each element of the color is in range ````[0..1]````.
     *
     * @type {Number[]}
     */
    get colorize(): number[];
    /**
     * Sets the opacity factor for this PerformanceModel.
     *
     * This is a factor in range ````[0..1]```` which multiplies by the rendered fragment alphas.
     *
     * @type {Number}
     */
    set opacity(arg: number);
    /**
     * Gets this PerformanceModel's opacity factor.
     *
     * This is a factor in range ````[0..1]```` which multiplies by the rendered fragment alphas.
     *
     * @type {Number}
     */
    get opacity(): number;
    /**
     * Sets if backfaces are rendered for this PerformanceModel.
     *
     * Default is ````false````.
     *
     * @type {Boolean}
     */
    set backfaces(arg: boolean);
    /**
     * Sets if backfaces are rendered for this PerformanceModel.
     *
     * Default is ````false````.
     *
     * @type {Boolean}
     */
    get backfaces(): boolean;
    _position: Float32Array;
    _rotation: Float32Array;
    _quaternion: Float32Array;
    _scale: Float32Array;
    _worldMatrix: any;
    _worldNormalMatrix: any;
    _viewMatrix: any;
    _viewNormalMatrix: any;
    _viewMatrixDirty: boolean;
    _worldMatrixNonIdentity: boolean;
    _opacity: number;
    _colorize: number[];
    _saoEnabled: boolean;
    _isModel: any;
    _onCameraViewMatrix: any;
    /**
     * Returns true to indicate that this Component is a PerformanceModel.
     * @type {Boolean}
     */
    get isPerformanceModel(): boolean;
    /**
     * Gets the PerformanceModel's local translation.
     *
     * Default value is ````[0,0,0]````.
     *
     * @type {Number[]}
     */
    get position(): number[];
    /**
     * Gets the PerformanceModel's local rotation, as Euler angles given in degrees, for each of the X, Y and Z axis.
     *
     * Default value is ````[0,0,0]````.
     *
     * @type {Number[]}
     */
    get rotation(): number[];
    /**
     * Gets the PerformanceModels's local rotation quaternion.
     *
     * Default value is ````[0,0,0,1]````.
     *
     * @type {Number[]}
     */
    get quaternion(): number[];
    /**
     * Gets the PerformanceModel's local scale.
     *
     * Default value is ````[1,1,1]````.
     *
     * @type {Number[]}
     */
    get scale(): number[];
    /**
     * Gets the PerformanceModel's local modeling transform matrix.
     *
     * Default value is ````[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]````.
     *
     * @type {Number[]}
     */
    get matrix(): number[];
    /**
     * Gets the PerformanceModel's World matrix.
     *
     * @property worldMatrix
     * @type {Number[]}
     */
    get worldMatrix(): number[];
    /**
     * Gets the PerformanceModel's World normal matrix.
     *
     * @type {Number[]}
     */
    get worldNormalMatrix(): number[];
    /**
     * Called by private renderers in ./lib, returns the view matrix with which to
     * render this PerformanceModel. The view matrix is the concatenation of the
     * Camera view matrix with the Performance model's world (modeling) matrix.
     *
     * @private
     */
    private get viewMatrix();
    /**
     * Called by private renderers in ./lib, returns the picking view matrix with which to
     * ray-pick on this PerformanceModel.
     *
     * @private
     */
    private getPickViewMatrix;
    /**
     * Called by private renderers in ./lib, returns the view normal matrix with which to render this PerformanceModel.
     *
     * @private
     */
    private get viewNormalMatrix();
    /**
     * Creates a reusable geometry within this PerformanceModel.
     *
     * We can then supply the geometry ID to {@link PerformanceModel#createMesh} when we want to create meshes that instance the geometry.
     *
     * If provide a  ````positionsDecodeMatrix```` , then ````createGeometry()```` will assume
     * that the ````positions```` and ````normals```` arrays are compressed. When compressed, ````positions```` will be
     * quantized and in World-space, and ````normals```` will be oct-encoded and in World-space.
     *
     * Note that ````positions````, ````normals```` and ````indices```` are all required together.
     *
     * @param {*} cfg Geometry properties.
     * @param {String|Number} cfg.id Mandatory ID for the geometry, to refer to with {@link PerformanceModel#createMesh}.
     * @param {String} [cfg.primitive="triangles"] The primitive type. Accepted values are 'points', 'lines', 'line-loop', 'line-strip', 'triangles', 'triangle-strip' and 'triangle-fan'.
     * @param {Number[]} cfg.positions Flat array of positions.
     * @param {Number[]} cfg.normals Flat array of normal vectors.
     * @param {Number[]} cfg.indices Array of triangle indices.
     * @param {Number[]} [cfg.edgeIndices] Array of edge line indices. These are automatically generated internally if not supplied, using the ````edgeThreshold```` given to the ````PerformanceModel```` constructor.
     * @param {Number[]} [cfg.positionsDecodeMatrix] A 4x4 matrix for decompressing ````positions````.
     * @param {Number[]} [cfg.rtcCenter] Relative-to-center (RTC) coordinate system center. When this is given, then ````positions```` are assumed to be relative to this center.
     */
    createGeometry(cfg: any): void;
    /**
     * Creates a mesh within this PerformanceModel.
     *
     * A mesh can either share geometry with other meshes, or have its own unique geometry.
     *
     * To share a geometry with other meshes, provide the ID of a geometry created earlier
     * with {@link PerformanceModel#createGeometry}.
     *
     * To create unique geometry for the mesh, provide geometry data arrays.
     *
     * Internally, PerformanceModel will batch all unique mesh geometries into the same arrays, which improves
     * rendering performance.
     *
     * If you accompany the arrays with a  ````positionsDecodeMatrix```` , then ````createMesh()```` will assume
     * that the ````positions```` and ````normals```` arrays are compressed. When compressed, ````positions```` will be
     * quantized and in World-space, and ````normals```` will be oct-encoded and in World-space.
     *
     * If you accompany the arrays with an  ````rtcCenter````, then ````createMesh()```` will assume
     * that the ````positions```` are in relative-to-center (RTC) coordinates, with ````rtcCenter```` being the origin of their
     * RTC coordinate system.
     *
     * When providing either ````positionsDecodeMatrix```` or ````rtcCenter````, ````createMesh()```` will start a new
     * batch each time either of those two parameters change since the last call. Therefore, to combine arrays into the
     * minimum number of batches, it's best for performance to create your shared meshes in runs that have the same value
     * for ````positionsDecodeMatrix```` and ````rtcCenter````.
     *
     * Note that ````positions````, ````normals```` and ````indices```` are all required together.
     *
     * @param {object} cfg Object properties.
     * @param {String} cfg.id Mandatory ID for the new mesh. Must not clash with any existing components within the {@link Scene}.
     * @param {String|Number} [cfg.geometryId] ID of a geometry to instance, previously created with {@link PerformanceModel#createGeometry:method"}}createMesh(){{/crossLink}}. Overrides all other geometry parameters given to this method.
     * @param {String} [cfg.primitive="triangles"]  Geometry primitive type. Ignored when ````geometryId```` is given. Accepted values are 'points', 'lines', 'line-loop', 'line-strip', 'triangles', 'triangle-strip' and 'triangle-fan'.
     * @param {Number[]} [cfg.positions] Flat array of geometry positions. Ignored when ````geometryId```` is given.
     * @param {Number[]} [cfg.normals] Flat array of normal vectors. Ignored when ````geometryId```` is given.
     * @param {Number[]} [cfg.positionsDecodeMatrix] A 4x4 matrix for decompressing ````positions````.
     * @param {Number[]} [cfg.rtcCenter] Relative-to-center (RTC) coordinate system center. When this is given, then ````positions```` are assumed to be relative to this center.
     * @param {Number[]} [cfg.indices] Array of triangle indices. Ignored when ````geometryId```` is given.
     * @param {Number[]} [cfg.edgeIndices] Array of edge line indices. If ````geometryId```` is not given, edge line indices are
     * automatically generated internally if not given, using the ````edgeThreshold```` given to the ````PerformanceModel````
     * constructor. This parameter is ignored when ````geometryId```` is given.
     * @param {Number[]} [cfg.position=[0,0,0]] Local 3D position. of the mesh
     * @param {Number[]} [cfg.scale=[1,1,1]] Scale of the mesh.
     * @param {Number[]} [cfg.rotation=[0,0,0]] Rotation of the mesh as Euler angles given in degrees, for each of the X, Y and Z axis.
     * @param {Number[]} [cfg.matrix=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]] Mesh modelling transform matrix. Overrides the ````position````, ````scale```` and ````rotation```` parameters.
     * @param {Number[]} [cfg.color=[1,1,1]] RGB color in range ````[0..1, 0..`, 0..1]````.
     * @param {Number} [cfg.opacity=1] Opacity in range ````[0..1]````.
     */
    createMesh(cfg: {
        id: string;
        geometryId: string | number;
        primitive: string;
        positions: number[];
        normals: number[];
        positionsDecodeMatrix: number[];
        rtcCenter: number[];
        indices: number[];
        edgeIndices: number[];
        position: number[];
        scale: number[];
        rotation: number[];
        matrix: number[];
        color: number[];
        opacity: number;
    }): any;
    _lastRTCCenter: any;
    /**
     * Creates an {@link Entity} within this PerformanceModel, giving it one or more meshes previously created with {@link PerformanceModel#createMesh}.
     *
     * A mesh can only belong to one {@link Entity}, so you'll get an error if you try to reuse a mesh among multiple {@link Entity}s.
     *
     * @param {Object} cfg Entity configuration.
     * @param {String} cfg.id Optional ID for the new Entity. Must not clash with any existing components within the {@link Scene}.
     * @param {String[]} cfg.meshIds IDs of one or more meshes created previously with {@link PerformanceModel@createMesh}.

     * @param {Boolean} [cfg.isObject] Set ````true```` if the {@link Entity} represents an object, in which case it will be registered by {@link Entity#id} in {@link Scene#objects} and can also have a corresponding {@link MetaObject} with matching {@link MetaObject#id}, registered by that ID in {@link MetaScene#metaObjects}.
     * @param {Boolean} [cfg.visible=true] Indicates if the Entity is initially visible.
     * @param {Boolean} [cfg.culled=false] Indicates if the Entity is initially culled from view.
     * @param {Boolean} [cfg.pickable=true] Indicates if the Entity is initially pickable.
     * @param {Boolean} [cfg.clippable=true] Indicates if the Entity is initially clippable.
     * @param {Boolean} [cfg.collidable=true] Indicates if the Entity is initially included in boundary calculations.
     * @param {Boolean} [cfg.castsShadow=true] Indicates if the Entity initially casts shadows.
     * @param {Boolean} [cfg.receivesShadow=true]  Indicates if the Entity initially receives shadows.
     * @param {Boolean} [cfg.xrayed=false] Indicates if the Entity is initially xrayed. XRayed appearance is configured by {@link PerformanceModel#xrayMaterial}.
     * @param {Boolean} [cfg.highlighted=false] Indicates if the Entity is initially highlighted. Highlighted appearance is configured by {@link PerformanceModel#highlightMaterial}.
     * @param {Boolean} [cfg.selected=false] Indicates if the Entity is initially selected. Selected appearance is configured by {@link PerformanceModel#selectedMaterial}.
     * @param {Boolean} [cfg.edges=false] Indicates if the Entity's edges are initially emphasized. Edges appearance is configured by {@link PerformanceModel#edgeMaterial}.
     * @returns {Entity}
     */
    createEntity(cfg: {
        id: string;
        meshIds: string[];
    }): any;
    /**
     * Finalizes this PerformanceModel.
     *
     * Immediately creates the PerformanceModel's {@link Entity}s within the {@link Scene}.
     *
     * Once finalized, you can't add anything more to this PerformanceModel.
     */
    finalize(): void;
    _backfaces: boolean;
    /**
     * Gets the list of {@link Entity}s within this PerformanceModel.
     *
     * @returns {Entity[]}
     */
    get entityList(): any[];
    /**
     * Returns true to indicate that PerformanceModel is an {@link Entity}.
     * @type {Boolean}
     */
    get isEntity(): boolean;
    /**
     * Returns ````true```` if this PerformanceModel represents a model.
     *
     * When ````true```` the PerformanceModel will be registered by {@link PerformanceModel#id} in
     * {@link Scene#models} and may also have a {@link MetaObject} with matching {@link MetaObject#id}.
     *
     * @type {Boolean}
     */
    get isModel(): boolean;
    /**
     * Returns ````false```` to indicate that PerformanceModel never represents an object.
     *
     * @type {Boolean}
     */
    get isObject(): boolean;
    /**
     * Gets the PerformanceModel's World-space 3D axis-aligned bounding box.
     *
     * Represented by a six-element Float64Array containing the min/max extents of the
     * axis-aligned volume, ie. ````[xmin, ymin,zmin,xmax,ymax, zmax]````.
     *
     * @type {Number[]}
     */
    get aabb(): number[];
    _rebuildAABB(): void;
    /**
     * The approximate number of triangles in this PerformanceModel.
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
    _castsShadow: any;
    _receivesShadow: any;
    /**
     * Gets if Scalable Ambient Obscurance (SAO) will apply to this PerformanceModel.
     *
     * SAO is configured by the Scene's {@link SAO} component.
     *
     * @type {Boolean}
     * @abstract
     */
    get saoEnabled(): boolean;
    /**
     * Returns true to indicate that PerformanceModel is implements {@link Drawable}.
     *
     * @type {Boolean}
     */
    get isDrawable(): boolean;
    /** @private */
    private get isStateSortable();
    /** @private */
    private stateSortCompare;
    /** @private */
    private rebuildRenderFlags;
    /**
     * @private
     */
    private _updateRenderFlagsVisibleLayers;
    /** @private */
    private _getActiveSectionPlanesForLayer;
    /** @private */
    private _updateRenderFlags;
    /**
     * Configures the appearance of xrayed {@link Entity}s within this PerformanceModel.
     *
     * This is the {@link Scene#xrayMaterial}.
     *
     * @type {EmphasisMaterial}
     */
    get xrayMaterial(): any;
    /**
     * Configures the appearance of highlighted {@link Entity}s within this PerformanceModel.
     *
     * This is the {@link Scene#highlightMaterial}.
     *
     * @type {EmphasisMaterial}
     */
    get highlightMaterial(): any;
    /**
     * Configures the appearance of selected {@link Entity}s within this PerformanceModel.
     *
     * This is the {@link Scene#selectedMaterial}.
     *
     * @type {EmphasisMaterial}
     */
    get selectedMaterial(): any;
    /**
     * Configures the appearance of edges of {@link Entity}s within this PerformanceModel.
     *
     * This is the {@link Scene#edgeMaterial}.
     *
     * @type {EdgeMaterial}
     */
    get edgeMaterial(): any;
    /** @private */
    private drawNormalOpaqueFill;
    /** @private */
    private drawNormalTransparentFill;
    /** @private */
    private drawDepth;
    /** @private */
    private drawNormals;
    /** @private */
    private drawXRayedFill;
    /** @private */
    private drawHighlightedFill;
    /** @private */
    private drawSelectedFill;
    /** @private */
    private drawNormalOpaqueEdges;
    /** @private */
    private drawNormalTransparentEdges;
    /** @private */
    private drawXRayedEdges;
    /** @private */
    private drawHighlightedEdges;
    /** @private */
    private drawSelectedEdges;
    /**
     * @private
     */
    private drawOcclusion;
    /**
     * @private
     */
    private drawShadow;
    /** @private */
    private drawPickMesh;
    /**
     * Called by PerformanceMesh.drawPickDepths()
     * @private
     */
    private drawPickDepths;
    /**
     * Called by PerformanceMesh.drawPickNormals()
     * @private
     */
    private drawPickNormals;
    /**
     * Destroys this PerformanceModel.
     */
    destroy(): void;
}
