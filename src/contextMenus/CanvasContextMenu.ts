import { BIMViewer } from "../BIMViewer";
import { ContextMenu } from "../xeokit-sdk/extras/ContextMenu/ContextMenu";
import { math } from "../xeokit-sdk/viewer/scene/math/math";
import { Viewer } from "../xeokit-sdk/viewer/Viewer";

interface Context {
  viewer: Viewer;
  bimViewer: BIMViewer;
}

/**
 * @private
 */
class CanvasContextMenu extends ContextMenu {
    constructor(cfg: any = {}) {
        super({
            context: cfg.context,
            items: [
                [
                    {
                        title: "Hide All",
                        getEnabled: function (context: Context) {
                            return (context.viewer.scene.numVisibleObjects > 0);
                        },
                        doAction: function (context: Context) {
                            context.viewer.scene.setObjectsVisible(context.viewer.scene.visibleObjectIds, false);
                        }
                    },
                    {
                        title: "Show all",
                        getEnabled: function (context: Context) {
                            const scene = context.viewer.scene;
                            return ((scene.numVisibleObjects < scene.numObjects) || (context.viewer.scene.numXRayedObjects > 0));
                        },
                        doAction: function (context: Context) {
                            const scene = context.viewer.scene;
                            scene.setObjectsVisible(scene.objectIds, true);
                            scene.setObjectsXRayed(scene.xrayedObjectIds, false);
                        }
                    }
                ],
                [
                    {
                        title: "View Fit All",
                        doAction: function (context: Context) {
                            const viewer = context.viewer;
                            const scene = viewer.scene;
                            const sceneAABB = scene.getAABB(scene.visibleObjectIds);
                            viewer.cameraFlight.flyTo({
                                aabb: sceneAABB,
                                duration: 0.5
                            });
                            viewer.cameraControl.pivotPos = math.getAABB3Center(sceneAABB);
                        }
                    }
                ],
                [
                    {
                        title: "X-Ray All",
                        getEnabled: function (context: Context) {
                            const scene = context.viewer.scene;
                            return (scene.numXRayedObjects < scene.numObjects);
                        },
                        doAction: function (context: Context) {
                            const scene = context.viewer.scene;
                            scene.setObjectsVisible(scene.objectIds, true);
                            scene.setObjectsXRayed(scene.objectIds, true);
                            scene.setObjectsPickable(scene.objectIds, false);
                        }
                    },
                    {
                        title: "X-Ray None",
                        getEnabled: function (context: Context) {
                            return (context.viewer.scene.numXRayedObjects > 0);
                        },
                        doAction: function (context: Context) {
                            const xrayedObjectIds = context.viewer.scene.xrayedObjectIds;
                            context.viewer.scene.setObjectsPickable(xrayedObjectIds, true);
                            context.viewer.scene.setObjectsXRayed(xrayedObjectIds, false);
                        }
                    }
                ],
                [
                    {
                        title: "Select None",
                        getEnabled: function (context: Context) {
                            return (context.viewer.scene.numSelectedObjects > 0);
                        },
                        doAction: function (context: Context) {
                            context.viewer.scene.setObjectsSelected(context.viewer.scene.selectedObjectIds, false);
                            context.bimViewer.clearObjectProperties();
                        }
                    }
                ],
                [
                    {
                        title: "Reset View",
                        doAction: function (context: Context) {
                            context.bimViewer.resetView();
                        }
                    }
                ],
                // [
                //     {
                //         title: "Clear Slices",
                //         getEnabled: function (context: Context) {
                //             return (context.bimViewer.getNumSections() > 0);
                //         },
                //         doAction: function (context: Context) {
                //             context.bimViewer.clearSections();
                //         }
                //     }
                // ]
            ]
        });
    }
}

export { CanvasContextMenu };
