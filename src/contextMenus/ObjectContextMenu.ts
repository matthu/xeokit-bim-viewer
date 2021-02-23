import { ContextMenu } from "../xeokit-sdk/extras/ContextMenu/ContextMenu.js";
import { math } from "../xeokit-sdk/viewer/scene/math/math.js";
import { Viewer } from "../xeokit-sdk/viewer/Viewer.js";

/**
 * @private
 */
class ObjectContextMenu extends ContextMenu {
    constructor(cfg: any = {}) {
        super({
            context: cfg.context,
            items: [
                [
                    {
                        title: "View Fit",
                        doAction: function (context: any) {
                            const viewer: Viewer = context.viewer;
                            const scene = viewer.scene;
                            const entity = context.entity;
                            viewer.cameraFlight.flyTo({
                                aabb: entity.aabb,
                                duration: 0.5
                            }, () => {
                                setTimeout(function () {
                                    scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
                                }, 500);
                            });
                            viewer.cameraControl.pivotPos = math.getAABB3Center(entity.aabb);
                        }
                    },
                    {
                        title: "View Fit All",
                        doAction: function (context: any) {
                            const viewer: Viewer = context.viewer;
                            const scene = viewer.scene;
                            const sceneAABB = scene.getAABB(scene.visibleObjectIds);
                            viewer.cameraFlight.flyTo({
                                aabb: sceneAABB,
                                duration: 0.5
                            });
                            viewer.cameraControl.pivotPos = math.getAABB3Center(sceneAABB);
                        }
                    },
                    {
                        title: "Show in Tree",
                        doAction: function (context: any) {
                            const objectId: string = context.entity.id;
                            context.showObjectInExplorers(objectId);
                        }
                    },
                    {
                      title: "Show properties",
                      doAction: function (context: any) {
                          const objectId: string = context.entity.id;
                          context.showObjectProperties(objectId);
                      }
                  }
                ],
                [
                    {
                        title: "Hide",
                        getEnabled: function (context: any): boolean {
                            return context.entity.visible;
                        },
                        doAction: function (context: any): void {
                            context.entity.visible = false;
                        }
                    },
                    {
                        title: "Hide Others",
                        doAction: function (context: any): void {
                            const viewer = context.viewer;
                            const scene = viewer.scene;
                            const entity = context.entity;
                            const metaObject = viewer.metaScene.metaObjects[entity.id];
                            if (!metaObject) {
                                return;
                            }
                            scene.setObjectsVisible(scene.visibleObjectIds, false);
                            scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
                            metaObject.withMetaObjectsInSubtree((metaObject: any) => {
                                const entity = scene.objects[metaObject.id];
                                if (entity) {
                                    entity.visible = true;
                                }
                            });
                        }
                    },
                    {
                        title: "Hide All",
                        getEnabled: function (context: any): boolean {
                            return (context.viewer.scene.numVisibleObjects > 0);
                        },
                        doAction: function (context: any): void {
                            context.viewer.scene.setObjectsVisible(context.viewer.scene.visibleObjectIds, false);
                        }
                    },
                    {
                        title: "Show All",
                        getEnabled: function (context: any): boolean {
                            const scene = context.viewer.scene;
                            return ((scene.numVisibleObjects < scene.numObjects) || (context.viewer.scene.numXRayedObjects > 0));
                        },
                        doAction: function (context: any): void {
                            const scene = context.viewer.scene;
                            scene.setObjectsVisible(scene.objectIds, true);
                            scene.setObjectsPickable(scene.xrayedObjectIds, true);
                            scene.setObjectsXRayed(scene.xrayedObjectIds, false);
                        }
                    }
                ],
                [
                    {
                        title: "X-Ray",
                        getEnabled: function (context: any): boolean {
                            return (!context.entity.xrayed);
                        },
                        doAction: function (context: any): void {
                            const entity = context.entity;
                            entity.xrayed = true;
                            entity.pickable = false;
                        }
                    },
                    {
                        title: "X-Ray Others",
                        doAction: function (context: any): void {
                            const viewer = context.viewer;
                            const scene = viewer.scene;
                            const entity = context.entity;
                            const metaObject = viewer.metaScene.metaObjects[entity.id];
                            if (!metaObject) {
                                return;
                            }
                            scene.setObjectsVisible(scene.objectIds, true);
                            scene.setObjectsXRayed(scene.objectIds, true);
                            scene.setObjectsPickable(scene.objectIds, false);
                            scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
                            metaObject.withMetaObjectsInSubtree((metaObject: any) => {
                                const entity = scene.objects[metaObject.id];
                                if (entity) {
                                    entity.xrayed = false;
                                    entity.pickable = true;
                                }
                            });
                        }
                    },
                    {
                        title: "X-Ray All",
                        getEnabled: function (context: any): boolean {
                            const scene = context.viewer.scene;
                            return (scene.numXRayedObjects < scene.numObjects);
                        },
                        doAction: function (context: any): void {
                            const scene = context.viewer.scene;
                            scene.setObjectsVisible(scene.objectIds, true);
                            scene.setObjectsPickable(scene.objectIds, false);
                            scene.setObjectsXRayed(scene.objectIds, true);
                        }
                    },
                    {
                        title: "X-Ray None",
                        getEnabled: function (context: any): boolean {
                            return (context.viewer.scene.numXRayedObjects > 0);
                        },
                        doAction: function (context: any): void {
                            const scene = context.viewer.scene;
                            const xrayedObjectIds = scene.xrayedObjectIds;
                            scene.setObjectsPickable(xrayedObjectIds, true);
                            scene.setObjectsXRayed(xrayedObjectIds, false);
                        }
                    }
                ],
                [
                    {
                        title: "Select",
                        getEnabled: function (context: any): boolean {
                            return (!context.entity.selected);
                        },
                        doAction: function (context: any): void {
                            context.entity.selected = true;

                        }
                    },
                    {
                        title: "Undo Select",
                        getEnabled: function (context: any): boolean {
                            return context.entity.selected;
                        },
                        doAction: function (context: any): void {
                            context.entity.selected = false;
                        }
                    },
                    {
                        title: "Select None",
                        getEnabled: function (context: any): boolean {
                            return (context.viewer.scene.numSelectedObjects > 0);
                        },
                        doAction: function (context: any): void {
                            context.viewer.scene.setObjectsSelected(context.viewer.scene.selectedObjectIds, false);
                        }
                    }
                ],
                [
                    {
                        title: "Clear Slices",
                        getEnabled: function (context: any): boolean {
                            return (context.bimViewer.getNumSections() > 0);
                        },
                        doAction: function (context: any): void {
                            context.bimViewer.clearSections();
                        }
                    }
                ]
            ]
        });
    }
};

export { ObjectContextMenu };
