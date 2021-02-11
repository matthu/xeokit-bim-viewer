import { TreeViewPlugin } from "@xeokit/xeokit-sdk/src/plugins/TreeViewPlugin/TreeViewPlugin.js";
import { math } from "@xeokit/xeokit-sdk/src/viewer/scene/math/math.js";
import { TreeViewContextMenu } from "../contextMenus/TreeViewContextMenu";
import { Controller } from "../Controller";

const tempVec3 = math.vec3();

/** @private */
class ClassesExplorer extends Controller {

    _classesTabElement: Element;
    _showAllClassesButtonElement: Element;
    _hideAllClassesButtonElement: Element;
    _classesTabButtonElement: Element;

    _treeView: TreeViewPlugin;
    _treeViewContextMenu: TreeViewContextMenu;
    _onModelLoaded: any;
    _onModelUnloaded: any;

    constructor(parent: Controller, cfg: any = {}) {

        super(parent);

        if (!cfg.classesTabElement) {
            throw "Missing config: classesTabElement";
        }

        if (!cfg.showAllClassesButtonElement) {
            throw "Missing config: showAllClassesButtonElement";
        }

        if (!cfg.hideAllClassesButtonElement) {
            throw "Missing config: hideAllClassesButtonElement";
        }

        if (!cfg.classesElement) {
            throw "Missing config: classesElement";
        }

        this._classesTabElement = cfg.classesTabElement;
        this._showAllClassesButtonElement = cfg.showAllClassesButtonElement;
        this._hideAllClassesButtonElement = cfg.hideAllClassesButtonElement;
        this._classesTabButtonElement = this._classesTabElement.querySelector(".xeokit-tab-btn");

        if (!this._classesTabButtonElement) {
            throw "Missing DOM element: xeokit-tab-btn";
        }

        const classesElement = cfg.classesElement;

        this._treeView = new TreeViewPlugin(this.viewer, {
            containerElement: classesElement,
            hierarchy: "types",
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

        this._onModelLoaded = this.viewer.scene.on("modelLoaded", (modelId: string) =>{
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

        this.bimViewer.on("reset", () => {
            this._treeView.collapse();
        });
    }

    setEnabled(enabled: boolean) {
        if (!enabled) {
            this._classesTabButtonElement.classList.add("disabled");
            this._showAllClassesButtonElement.classList.add("disabled");
            this._hideAllClassesButtonElement.classList.add("disabled");
        } else {
            this._classesTabButtonElement.classList.remove("disabled");
            this._showAllClassesButtonElement.classList.remove("disabled");
            this._hideAllClassesButtonElement.classList.remove("disabled");
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

export { ClassesExplorer };
