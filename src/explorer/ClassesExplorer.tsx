import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { TreeViewPlugin } from "@xeokit/xeokit-sdk/src/plugins/TreeViewPlugin/TreeViewPlugin.js";
import { math } from "@xeokit/xeokit-sdk/src/viewer/scene/math/math.js";
import { TreeViewContextMenu } from "../contextMenus/TreeViewContextMenu";
import { Controller } from "../Controller";
import { BIMViewer } from '../BIMViewer';
import { Viewer } from '@xeokit/xeokit-sdk/src/viewer/Viewer.js';

const tempVec3 = math.vec3();

const styles = () => ({
  root: {
  }
});

interface Props extends WithStyles<typeof styles> {
  ref: any;
  activeTab: boolean;
  bimViewer: BIMViewer;
  viewer: Viewer;
  error(errorMessage: string): void;
  destroy(): void;
  showAll(event: React.MouseEvent): void;
  hideAll(event: React.MouseEvent): void;
  setActiveTab(): void;
}

export class ClassesExplorer extends React.Component<Props> {

    state: {
      tabEnabled: boolean;
      showClassesEnabled: boolean;
      hideClassesEnabled: boolean;
    };

    // _classesTabElement: Element;
    // _showAllClassesButtonElement: Element;
    // _hideAllClassesButtonElement: Element;
    // _classesTabButtonElement: Element;

    _treeView: TreeViewPlugin;
    _treeViewContextMenu: TreeViewContextMenu;
    _onModelLoaded: any;
    _onModelUnloaded: any;

    modelsRef: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {

        super(props);

        this.modelsRef = React.createRef();

        // if (!cfg.classesTabElement) {
        //     throw "Missing config: classesTabElement";
        // }

        // if (!cfg.showAllClassesButtonElement) {
        //     throw "Missing config: showAllClassesButtonElement";
        // }

        // if (!cfg.hideAllClassesButtonElement) {
        //     throw "Missing config: hideAllClassesButtonElement";
        // }

        // if (!cfg.classesElement) {
        //     throw "Missing config: classesElement";
        // }

        // this._classesTabElement = cfg.classesTabElement;
        // this._showAllClassesButtonElement = cfg.showAllClassesButtonElement;
        // this._hideAllClassesButtonElement = cfg.hideAllClassesButtonElement;
        // this._classesTabButtonElement = this._classesTabElement.querySelector(".xeokit-tab-btn");

        // if (!this._classesTabButtonElement) {
        //     throw "Missing DOM element: xeokit-tab-btn";
        // }

        this.state = {
          tabEnabled: true,
          showClassesEnabled: true,
          hideClassesEnabled: true,
        };
    }

    public componentDidMount() {
        this._treeView = new TreeViewPlugin(this.props.viewer, {
            containerElement: this.modelsRef.current,
            hierarchy: "types",
            autoAddModels: false,
            pruneEmptyNodes: true
        });

        this._treeViewContextMenu = new TreeViewContextMenu();

        this._treeView.on("contextmenu", (e: any) => {
            this._treeViewContextMenu.context = {
                bimViewer: this.props.bimViewer,
                viewer: e.viewer,
                treeViewPlugin: e.treeViewPlugin,
                treeViewNode: e.treeViewNode
            };
            this._treeViewContextMenu.show(e.event.pageX, e.event.pageY);
        });

        this._treeView.on("nodeTitleClicked", (e: any) => {
            const scene = this.props.viewer.scene;
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

        this._onModelLoaded = this.props.viewer.scene.on("modelLoaded", (modelId: string) =>{
            if (this.props.viewer.metaScene.metaModels[modelId]) {
                const modelInfo = this.props.bimViewer.getModelInfo(modelId);
                if (!modelInfo) {
                    return;
                }
                this._treeView.addModel(modelId, {
                    rootName: modelInfo.name
                });
            }
        });

        this._onModelUnloaded = this.props.viewer.scene.on("modelUnloaded", (modelId: string) => {
            if (this.props.viewer.metaScene.metaModels[modelId]) {
                this._treeView.removeModel(modelId);
            }
        });

        this.props.bimViewer.on("reset", () => {
            this._treeView.collapse();
        });
    }

    setEnabled(enabled: boolean) {
        this.setState({
          tabEnabled: enabled,
          showClassesEnabled: enabled,
          hideClassesEnabled: enabled,
        })
        // if (!enabled) {
        //     this._classesTabButtonElement.classList.add("disabled");
        //     this._showAllClassesButtonElement.classList.add("disabled");
        //     this._hideAllClassesButtonElement.classList.add("disabled");
        // } else {
        //     this._classesTabButtonElement.classList.remove("disabled");
        //     this._showAllClassesButtonElement.classList.remove("disabled");
        //     this._hideAllClassesButtonElement.classList.remove("disabled");
        // }
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
        this.props.destroy();
        this._treeView.destroy();
        this._treeViewContextMenu.destroy();
        this.props.viewer.scene.off(this._onModelLoaded);
        this.props.viewer.scene.off(this._onModelUnloaded);
    }

    handleSetActiveTab = (event: React.MouseEvent) => {
      event.preventDefault();
      this.props.setActiveTab();
    }

    public render() {
      return (
        <div className={"xeokit-tab xeokit-classesTab" + (this.props.activeTab ? " active" : "") + (this.state.tabEnabled ? "" : " disabled")}>
          <a className="xeokit-tab-btn" href="#" onClick={this.handleSetActiveTab}>Classes</a>
          <div className="xeokit-tab-content">
            <div className="xeokit-btn-group">
              <button type="button" className={"xeokit-showAllClasses xeokit-btn" + (this.state.showClassesEnabled ? "" : " disabled")} data-tippy-content="Show all classes" onClick={this.props.showAll}>Show all</button>
              <button type="button" className={"xeokit-hideAllClasses xeokit-btn" + (this.state.hideClassesEnabled ? "" : " disabled")} data-tippy-content="Hide all classes" onClick={this.props.hideAll}>Hide all</button>
            </div>
            <div className="xeokit-classes xeokit-tree-panel" ref={this.modelsRef}></div>
          </div>
        </div>
      );
    }
}

export default withStyles(styles)(ClassesExplorer);
