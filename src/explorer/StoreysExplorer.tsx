import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { TreeViewPlugin } from "@xeokit/xeokit-sdk/src/plugins/TreeViewPlugin/TreeViewPlugin.js";
import { math } from "@xeokit/xeokit-sdk/src/viewer/scene/math/math.js";
import { TreeViewContextMenu } from "../contextMenus/TreeViewContextMenu";
import { Controller } from "../Controller";
import { BIMViewer } from '../BIMViewer';
import { Viewer } from '@xeokit/xeokit-sdk/src/viewer/Viewer.js';

const tempVec3 = math.vec3();

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

/** @private */
export class StoreysExplorer extends React.Component<Props> {

    state: {
      tabEnabled: boolean;
      showStoreysEnabled: boolean;
      hideStoreysEnabled: boolean;
    };

    // _storeysTabElement: Element;
    // _showAllStoreysButtonElement: Element;
    // _hideAllStoreysButtonElement: Element;
    // _storeysTabButtonElement: Element;

    _treeView: TreeViewPlugin;
    _treeViewContextMenu: TreeViewContextMenu;

    _onModelLoaded: any;
    _onModelUnloaded: any;

    modelsRef: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {

        super(props);

        this.modelsRef = React.createRef();

        // if (!cfg.storeysTabElement) {
        //     throw "Missing config: storeysTabElement";
        // }

        // if (!cfg.showAllStoreysButtonElement) {
        //     throw "Missing config: showAllStoreysButtonElement";
        // }

        // if (!cfg.hideAllStoreysButtonElement) {
        //     throw "Missing config: hideAllStoreysButtonElement";
        // }

        // if (!cfg.storeysElement) {
        //     throw "Missing config: storeysElement";
        // }

        // this._storeysTabElement = cfg.storeysTabElement;
        // this._showAllStoreysButtonElement = cfg.showAllStoreysButtonElement;
        // this._hideAllStoreysButtonElement = cfg.hideAllStoreysButtonElement;
        // this._storeysTabButtonElement = this._storeysTabElement.querySelector(".xeokit-tab-btn");

        // if (!this._storeysTabButtonElement) {
        //     throw "Missing DOM element: .xeokit-tab-btn";
        // }

        // const storeysElement = cfg.storeysElement;

        this.state = {
          tabEnabled: true,
          showStoreysEnabled: true,
          hideStoreysEnabled: true,
        };
    }

    public componentDidMount() {
        this._treeView = new TreeViewPlugin(this.props.viewer, {
            containerElement: this.modelsRef.current,
            autoAddModels: false,
            hierarchy: "storeys",
            autoExpandDepth: 1
        });

        this._treeViewContextMenu = new TreeViewContextMenu();

        this._treeView.on("contextmenu", (e: any) => {
            this._treeViewContextMenu.context = {
                bimViewer: this.props.bimViewer,
                viewer: e.viewer,
                treeViewPlugin: e.treeViewPlugin,
                treeViewNode: e.treeViewNode,
                pruneEmptyNodes: true
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
            const modelInfo = this.props.bimViewer.getModelInfo(modelId);
            if (!modelInfo) {
                return;
            }
            this._treeView.addModel(modelId, {
                rootName: modelInfo.name
            });
        });

        this._onModelUnloaded = this.props.viewer.scene.on("modelUnloaded", (modelId: string) => {
            if (this.props.viewer.metaScene.metaModels[modelId]) {
                this._treeView.removeModel(modelId);
            }
        });

        this.props.bimViewer.on("reset", () => {
            this._treeView.collapse();
            this._treeView.expandToDepth(1);
        });
    }

    setEnabled(enabled: boolean) {
      this.setState({
        tabEnabled: enabled,
        showStoreysEnabled: enabled,
        hideStoreysEnabled: enabled,
      })
        // if (!enabled) {
        //     this._storeysTabButtonElement.classList.add("disabled");
        //     this._showAllStoreysButtonElement.classList.add("disabled");
        //     this._hideAllStoreysButtonElement.classList.add("disabled");
        // } else {
        //     this._storeysTabButtonElement.classList.remove("disabled");
        //     this._showAllStoreysButtonElement.classList.remove("disabled");
        //     this._hideAllStoreysButtonElement.classList.remove("disabled");
        // }
    }

    public expandTreeViewToDepth(depth: number) {
        this._treeView.expandToDepth(depth);
    }

    showNodeInTreeView(objectId: string) {
        this._treeView.collapse();
        this._treeView.showNode(objectId);
    }

    unShowNodeInTreeView() {
        this._treeView.unShowNode();
    }

    selectStorey(storeyObjectId: string, done: any) {
        const metaScene = this.props.viewer.metaScene;
        const storeyMetaObject = metaScene.metaObjects[storeyObjectId];
        if (!storeyMetaObject) {
            this.props.error("selectStorey() - object is not found: '" + storeyObjectId + "'");
            return;
        }
        if (storeyMetaObject.type !== "IfcBuildingStorey") {
            this.props.error("selectStorey() - object is not found: '" + storeyObjectId + "'");
            return;
        }
        const objectIds = storeyMetaObject.getObjectIDsInSubtree();
        this._selectObjects(objectIds, done);
    }

    _selectObjects(objectIds: string[], done: any) {
        const scene = this.props.viewer.scene;
        const aabb = scene.getAABB(objectIds);

        this.props.viewer.cameraControl.pivotPos = math.getAABB3Center(aabb, tempVec3);

        if (done) {

            scene.setObjectsXRayed(scene.objectIds, true);
            scene.setObjectsVisible(scene.objectIds, true);
            scene.setObjectsPickable(scene.objectIds, false);
            scene.setObjectsSelected(scene.selectedObjectIds, false);

            scene.setObjectsXRayed(objectIds, false);
            scene.setObjectsVisible(objectIds, true);
            scene.setObjectsPickable(objectIds, true);

            this.props.viewer.cameraFlight.flyTo({
                aabb: aabb
            }, () => {
                setTimeout(function () {
                    scene.setObjectsVisible(scene.xrayedObjectIds, false);
                    scene.setObjectsXRayed(scene.xrayedObjectIds, false);
                }, 500);
                done();
            });
        } else {

            scene.setObjectsVisible(scene.objectIds, false);
            scene.setObjectsPickable(scene.xrayedObjectIds, true);
            scene.setObjectsXRayed(scene.xrayedObjectIds, false);
            scene.setObjectsSelected(scene.selectedObjectIds, false);

            scene.setObjectsVisible(objectIds, true);

            this.props.viewer.cameraFlight.jumpTo({
                aabb: aabb
            });
        }
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
      const { classes } = this.props;
      return (
        <div className={classes.storeysTab + " xeokit-tab" + (this.props.activeTab ? " active" : "") + (this.state.tabEnabled ? "" : " disabled")}>
          <a className="xeokit-tab-btn" href="#" onClick={this.handleSetActiveTab}>Storeys</a>
          <div className="xeokit-tab-content">
            <div className="xeokit-btn-group">
              <button type="button" className={"xeokit-showAllStoreys xeokit-btn" + (this.state.showStoreysEnabled ? "" : " disabled")} data-tippy-content="Show all storeys" onClick={this.props.showAll}>Show all</button>
              <button type="button" className={"xeokit-hideAllStoreys xeokit-btn" + (this.state.hideStoreysEnabled ? "" : " disabled")} data-tippy-content="Hide all storeys" onClick={this.props.hideAll}>Hide all</button>
            </div>
            <div className="xeokit-storeys xeokit-tree-panel" ref={this.modelsRef}></div>
          </div>
        </div>
      );
    }
}

const styles = () => ({
  root: {
  },
  storeysTab: {
    '& ul': {
      listStyle: 'none',
      paddingLeft: '1.75em',
    },
    '& ul li': {
      margin: '2px 0',
      position: 'relative',
      lineHeight: '3ex',
    },
    '& ul li a': {
      backgroundColor: '#eee',
      borderRadius: '50%',
      color: '#000',
      display: 'inline-block',
      height: '1.5em',
      left: '-1.5em',
      position: 'absolute',
      textAlign: 'center',
      textDecoration: 'none',
      width: '1.5em',
    },
    'ul li a.plus': {
      backgroundColor: '#ded',
    },
    '& ul li a.minus': {
      backgroundColor: '#eee',
    },
    '& ul li a:active': {
      top: '1px',
    },
    '& ul li input': {
      verticalAlign: 'middle',
    },
    '& ul li span': {
      display: 'inline-block',
      paddingLeft: '2px',
      verticalAlign: 'middle',
    },
    '& ul li span:hover': {
      color: 'white',
      cursor: 'pointer',
      background: 'rgba(255, 255, 255, 0.2)',
      paddingLeft: '2px',
    },
    '& .top-right': {
      fontSize: 'small',
      position: 'fixed',
      right: '1em',
      top: '1em',
    },
    '& .highlighted-node': { /* Appearance of node highlighted with BIMViewer#showObjectInExplorers() */
      border: 'black solid 1px',
      background: 'yellow',
      color: 'black',
      paddingLeft: '1px',
      paddingRight: '5px',
    }
  }
});

export default withStyles(styles)(StoreysExplorer);
