import { ContextMenu } from "../xeokit-sdk/extras/ContextMenu/ContextMenu";
import { math } from "../xeokit-sdk/viewer/scene/math/math";

const tempVec3 = math.vec3();

interface TreeViewNode {
  objectId: string;
}

/**
 * @private
 */
class TreeViewContextMenu extends ContextMenu {
    constructor(cfg: any = {}) {
        super({
            context: cfg.context,
            items: [
                [
                    {
                        title: "Isolate",
                        doAction: function (context: any) {
                            const viewer = context.viewer;
                            const scene = viewer.scene;
                            const objectIds: string[] = [];
                            context.treeViewPlugin.withNodeTree(context.treeViewNode, (treeViewNode: TreeViewNode) => {
                                if (treeViewNode.objectId) {
                                    objectIds.push(treeViewNode.objectId);
                                }
                            });
                            const aabb = scene.getAABB(objectIds);

                            viewer.cameraControl.pivotPos = math.getAABB3Center(aabb, tempVec3);

                            scene.setObjectsXRayed(scene.xrayedObjectIds, false);
                            scene.setObjectsVisible(scene.objectIds, false);
                            scene.setObjectsPickable(scene.objectIds, false);
                            scene.setObjectsSelected(scene.selectedObjectIds, false);

                            scene.setObjectsVisible(objectIds, true);
                            scene.setObjectsPickable(objectIds, true);

                            viewer.cameraFlight.flyTo({
                                aabb: aabb
                            }, () => {
                            });
                        }
                    }
                ],
                [
                    {
                        title: "View Fit",
                        doAction: function (context: any) {
                            const viewer = context.viewer;
                            const scene = viewer.scene;
                            const objectIds: string[] = [];
                            context.treeViewPlugin.withNodeTree(context.treeViewNode, (treeViewNode: TreeViewNode) => {
                                if (treeViewNode.objectId) {
                                    objectIds.push(treeViewNode.objectId);
                                }
                            });
                            scene.setObjectsVisible(objectIds, true);
                            scene.setObjectsHighlighted(objectIds, true);
                            const aabb = scene.getAABB(objectIds);
                            viewer.cameraFlight.flyTo({
                                aabb: aabb,
                                duration: 0.5
                            }, () => {
                                setTimeout(function () {
                                    scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
                                }, 500);
                            });
                            viewer.cameraControl.pivotPos = math.getAABB3Center(aabb);
                        }
                    },
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
                        title: "Hide",
                        doAction: function (context: any) {
                            context.treeViewPlugin.withNodeTree(context.treeViewNode, (treeViewNode: TreeViewNode) => {
                                if (treeViewNode.objectId) {
                                    const entity = context.viewer.scene.objects[treeViewNode.objectId];
                                    if (entity) {
                                        entity.visible = false;
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: "Hide Others",
                        doAction: function (context: any) {
                            const scene = context.viewer.scene;
                            scene.setObjectsVisible(scene.visibleObjectIds, false);
                            scene.setObjectsPickable(scene.xrayedObjectIds, true);
                            scene.setObjectsXRayed(scene.xrayedObjectIds, false);
                            scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
                            context.treeViewPlugin.withNodeTree(context.treeViewNode, (treeViewNode: TreeViewNode) => {
                                if (treeViewNode.objectId) {
                                    const entity = scene.objects[treeViewNode.objectId];
                                    if (entity) {
                                        entity.visible = true;
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: "Hide All",
                        getEnabled: function (context: any) {
                            return (context.viewer.scene.visibleObjectIds.length > 0);
                        },
                        doAction: function (context: any) {
                            context.viewer.scene.setObjectsVisible(context.viewer.scene.visibleObjectIds, false);
                        }
                    }
                ],
                [
                    {
                        title: "Show",
                        doAction: function (context: any) {
                            context.treeViewPlugin.withNodeTree(context.treeViewNode, (treeViewNode: TreeViewNode) => {
                                if (treeViewNode.objectId) {
                                    const entity = context.viewer.scene.objects[treeViewNode.objectId];
                                    if (entity) {
                                        entity.visible = true;
                                        if (entity.xrayed) {
                                            entity.pickable = true;
                                        }
                                        entity.xrayed = false;
                                        entity.selected = false;
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: "Show Others",
                        doAction: function (context: any) {
                            const scene = context.viewer.scene;
                            scene.setObjectsVisible(scene.objectIds, true);
                            scene.setObjectsPickable(scene.xrayedObjectIds, true);
                            scene.setObjectsXRayed(scene.xrayedObjectIds, false);
                            context.treeViewPlugin.withNodeTree(context.treeViewNode, (treeViewNode: TreeViewNode) => {
                                if (treeViewNode.objectId) {
                                    const entity = scene.objects[treeViewNode.objectId];
                                    if (entity) {
                                        entity.visible = false;
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: "Show All",
                        getEnabled: function (context: any) {
                            const scene = context.viewer.scene;
                            return ((scene.numVisibleObjects < scene.numObjects) || (context.viewer.scene.numXRayedObjects > 0));
                        },
                        doAction: function (context: any) {
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
                        doAction: function (context: any) {
                            context.treeViewPlugin.withNodeTree(context.treeViewNode, (treeViewNode: TreeViewNode) => {
                                if (treeViewNode.objectId) {
                                    const entity = context.viewer.scene.objects[treeViewNode.objectId];
                                    if (entity) {
                                        entity.xrayed = true;
                                        entity.visible = true;
                                        entity.pickable = false;
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: "Undo X-Ray",
                        doAction: function (context: any) {
                            context.treeViewPlugin.withNodeTree(context.treeViewNode, (treeViewNode: TreeViewNode) => {
                                if (treeViewNode.objectId) {
                                    const entity = context.viewer.scene.objects[treeViewNode.objectId];
                                    if (entity) {
                                        entity.xrayed = false;
                                        entity.pickable = true;
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: "X-Ray Others",
                        doAction: function (context: any) {
                            const scene = context.viewer.scene;
                            scene.setObjectsVisible(scene.objectIds, true);
                            scene.setObjectsPickable(scene.objectIds, false);
                            scene.setObjectsXRayed(scene.objectIds, true);
                            scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
                            context.treeViewPlugin.withNodeTree(context.treeViewNode, (treeViewNode: TreeViewNode) => {
                                if (treeViewNode.objectId) {
                                    const entity = scene.objects[treeViewNode.objectId];
                                    if (entity) {
                                        entity.xrayed = false;
                                        entity.pickable = true;
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: "X-Ray All",
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
                        doAction: function (context: any) {
                            context.treeViewPlugin.withNodeTree(context.treeViewNode, (treeViewNode: TreeViewNode) => {
                                if (treeViewNode.objectId) {
                                    const entity = context.viewer.scene.objects[treeViewNode.objectId];
                                    if (entity) {
                                        entity.selected = true;
                                        entity.visible = true;
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: "Undo Select",
                        doAction: function (context: any) {
                            context.treeViewPlugin.withNodeTree(context.treeViewNode, (treeViewNode: TreeViewNode) => {
                                if (treeViewNode.objectId) {
                                    const entity = context.viewer.scene.objects[treeViewNode.objectId];
                                    if (entity) {
                                        entity.selected = false;
                                    }
                                }
                            });
                        }
                    },
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
        })
    }
}

export { TreeViewContextMenu };
