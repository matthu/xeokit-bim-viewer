import { ContextMenu } from "../xeokit-sdk/extras/ContextMenu/ContextMenu";
import { math } from "../xeokit-sdk/viewer/scene/math/math";

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
                        getEnabled: function (context: any) {
                            return (context.viewer.scene.numVisibleObjects > 0);
                        },
                        doAction: function (context: any) {
                            context.viewer.scene.setObjectsVisible(context.viewer.scene.visibleObjectIds, false);
                        }
                    },
                    {
                        title: "Show all",
                        getEnabled: function (context: any) {
                            const scene = context.viewer.scene;
                            return ((scene.numVisibleObjects < scene.numObjects) || (context.viewer.scene.numXRayedObjects > 0));
                        },
                        doAction: function (context: any) {
                            const scene = context.viewer.scene;
                            scene.setObjectsVisible(scene.objectIds, true);
                            scene.setObjectsXRayed(scene.xrayedObjectIds, false);
                        }
                    }
                ],
                [
                    {
                        title: "View Fit All",
                        doAction: function (context: any) {
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
                        getEnabled: function (context: any) {
                            const scene = context.viewer.scene;
                            return (scene.numXRayedObjects < scene.numObjects);
                        },
                        doAction: function (context: any) {
                            const scene = context.viewer.scene;
                            scene.setObjectsVisible(scene.objectIds, true);
                            scene.setObjectsXRayed(scene.objectIds, true);
                            scene.setObjectsPickable(scene.objectIds, false);
                        }
                    },
                    {
                        title: "X-Ray None",
                        getEnabled: function (context: any) {
                            return (context.viewer.scene.numXRayedObjects > 0);
                        },
                        doAction: function (context: any) {
                            const xrayedObjectIds = context.viewer.scene.xrayedObjectIds;
                            context.viewer.scene.setObjectsPickable(xrayedObjectIds, true);
                            context.viewer.scene.setObjectsXRayed(xrayedObjectIds, false);
                        }
                    }
                ],
                [
                    {
                        title: "Select None",
                        getEnabled: function (context: any) {
                            return (context.viewer.scene.numSelectedObjects > 0);
                        },
                        doAction: function (context: any) {
                            context.viewer.scene.setObjectsSelected(context.viewer.scene.selectedObjectIds, false);
                        }
                    }
                ],
                [
                    {
                        title: "Reset View",
                        doAction: function (context: any) {
                            context.bimViewer.resetView();
                        }
                    }
                ],
                [
                    {
                        title: "Clear Slices",
                        getEnabled: function (context: any) {
                            return (context.bimViewer.getNumSections() > 0);
                        },
                        doAction: function (context: any) {
                            context.bimViewer.clearSections();
                        }
                    }
                ]
            ]
        });
    }
}

export { CanvasContextMenu };