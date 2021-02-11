import { TreeViewPlugin } from "@xeokit/xeokit-sdk/src/plugins/TreeViewPlugin/TreeViewPlugin.js";
import { math } from "@xeokit/xeokit-sdk/src/viewer/scene/math/math.js";
import { TreeViewContextMenu } from "../contextMenus/TreeViewContextMenu";
import { Controller } from "../Controller";

const tempVec3 = math.vec3();

/** @private */
class ObjectsExplorer extends Controller {

    _objectsTabElement: Element;
    _showAllObjectsButtonElement: Element;
    _hideAllObjectsButtonElement: Element;
    _objectsTabButtonElement: Element;

    _treeView: TreeViewPlugin;
    _treeViewContextMenu: TreeViewContextMenu;

    _onModelLoaded: any;
    _onModelUnloaded: any;

    constructor(parent: Controller, cfg: any = {}) {

        super(parent);

        if (!cfg.objectsTabElement) {
            throw "Missing config: objectsTabElement";
        }

        if (!cfg.showAllObjectsButtonElement) {
            throw "Missing config: showAllObjectsButtonElement";
        }

        if (!cfg.hideAllObjectsButtonElement) {
            throw "Missing config: hideAllObjectsButtonElement";
        }

        if (!cfg.objectsElement) {
            throw "Missing config: objectsElement";
        }

        this._objectsTabElement = cfg.objectsTabElement;
        this._showAllObjectsButtonElement = cfg.showAllObjectsButtonElement;
        this._hideAllObjectsButtonElement = cfg.hideAllObjectsButtonElement;
        this._objectsTabButtonElement = this._objectsTabElement.querySelector(".xeokit-tab-btn");

        if (!this._objectsTabButtonElement) {
            throw "Missing DOM element: ,xeokit-tab-btn";
        }

        const objectsElement = cfg.objectsElement;

        this._treeView = new TreeViewPlugin(this.viewer, {
            containerElement: objectsElement,
            hierarchy: "containment",
            autoAddModels: false,
            pruneEmptyNodes: true
        });

        this._treeViewContextMenu = new TreeViewContextMenu();

        this._treeView.on("contextmenu", (e: any) => {
            this._treeViewContextMenu.context = {
                bimViewer: this.bimViewer,
                viewer: e.viewer,
                treeViewPlugin: e.treeViewPlugin,
                treeViewNode: e.treeViewNode
            };
            this._treeViewContextMenu.show(e.event.pageX, e.event.pageY);
        });

        this._treeView.on("nodeTitleClicked", (e: any) => {
            const scene = this.viewer.scene;
            const objectIds: string[] = [];
            e.treeViewPlugin.withNodeTree(e.treeViewNode, (treeViewNode: any) => {
                if (treeViewNode.objectId) {
                    objectIds.push(treeViewNode.objectId);
                }
            });
            const checked = e.treeViewNode.checked;
            if (checked) {
                scene.setObjectsXRayed(objectIds, false);
                scene.setObjectsVisible(objectIds, false);
                scene.setObjectsPickable(objectIds, true);
            } else {
                scene.setObjectsXRayed(objectIds, false);
                scene.setObjectsVisible(objectIds, true);
                scene.setObjectsPickable(objectIds, true);
            }
        });

        this._onModelLoaded = this.viewer.scene.on("modelLoaded", (modelId: string) => {
            if (this.viewer.metaScene.metaModels[modelId]) {
                const modelInfo = this.bimViewer._modelsExplorer.getModelInfo(modelId);
                if (!modelInfo) {
                    return;
                }
                this._treeView.addModel(modelId, {
                    rootName: modelInfo.name
                });
            }
        });

        this._onModelUnloaded = this.viewer.scene.on("modelUnloaded", (modelId: string) => {
            if (this.viewer.metaScene.metaModels[modelId]) {
                this._treeView.removeModel(modelId);
            }
        });

        this.bimViewer.on("reset", ()=>{
            this._treeView.collapse();
        });
    }

    setEnabled(enabled: boolean) {
        if (!enabled) {
            this._objectsTabButtonElement.classList.add("disabled");
            this._showAllObjectsButtonElement.classList.add("disabled");
            this._hideAllObjectsButtonElement.classList.add("disabled");
        } else {
            this._objectsTabButtonElement.classList.remove("disabled");
            this._showAllObjectsButtonElement.classList.remove("disabled");
            this._hideAllObjectsButtonElement.classList.remove("disabled");
        }
    }

    expandTreeViewToDepth(depth: number) {
        this._treeView.expandToDepth(depth);
    }

    showNodeInTreeView(objectId: string) {
        this._treeView.collapse();
        this._treeView.showNode(objectId);
    }

    unShowNodeInTreeView() {
        this._treeView.unShowNode();
    }

    destroy() {
        super.destroy();
        this._treeView.destroy();
        this._treeViewContextMenu.destroy();
        this.viewer.scene.off(this._onModelLoaded);
        this.viewer.scene.off(this._onModelUnloaded);
    }
}

export { ObjectsExplorer };
