import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { TreeViewContextMenu } from "../contextMenus/TreeViewContextMenu";
import { Controller } from "../Controller";
import { BIMViewer } from '../BIMViewer';
import { Viewer } from '../xeokit-sdk/viewer/Viewer';
import { TreeViewPlugin } from '../xeokit-sdk/plugins/TreeViewPlugin/TreeViewPlugin';

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
export class ObjectsExplorer extends React.Component<Props> {

    state: {
      tabEnabled: boolean;
      showObjectsEnabled: boolean;
      hideObjectsEnabled: boolean;
    };

    // _objectsTabElement: Element;
    // _showAllObjectsButtonElement: Element;
    // _hideAllObjectsButtonElement: Element;
    // _objectsTabButtonElement: Element;

    _treeView: TreeViewPlugin;
    _treeViewContextMenu: TreeViewContextMenu;

    _onModelLoaded: any;
    _onModelUnloaded: any;

    modelsRef: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {

        super(props);

        this.modelsRef = React.createRef();

        // if (!cfg.objectsTabElement) {
        //     throw "Missing config: objectsTabElement";
        // }

        // if (!cfg.showAllObjectsButtonElement) {
        //     throw "Missing config: showAllObjectsButtonElement";
        // }

        // if (!cfg.hideAllObjectsButtonElement) {
        //     throw "Missing config: hideAllObjectsButtonElement";
        // }

        // if (!cfg.objectsElement) {
        //     throw "Missing config: objectsElement";
        // }

        // this._objectsTabElement = cfg.objectsTabElement;
        // this._showAllObjectsButtonElement = cfg.showAllObjectsButtonElement;
        // this._hideAllObjectsButtonElement = cfg.hideAllObjectsButtonElement;
        // this._objectsTabButtonElement = this._objectsTabElement.querySelector(".xeokit-tab-btn");

        // if (!this._objectsTabButtonElement) {
        //     throw "Missing DOM element: ,xeokit-tab-btn";
        // }

        // const objectsElement = cfg.objectsElement;

        this.state = {
          tabEnabled: true,
          showObjectsEnabled: true,
          hideObjectsEnabled: true,
        };
    }

    public componentDidMount() {
        this._treeView = new TreeViewPlugin(this.props.viewer, {
            containerElement: this.modelsRef.current,
            hierarchy: "containment",
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

        this._onModelLoaded = this.props.viewer.scene.on("modelLoaded", (modelId: string) => {
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

        this.props.bimViewer.on("reset", ()=>{
            this._treeView.collapse();
        });
    }

    setEnabled(enabled: boolean) {
        this.setState({
          tabEnabled: enabled,
          showObjectsEnabled: enabled,
          hideObjectsEnabled: enabled,
        })
        // if (!enabled) {
        //     this._objectsTabButtonElement.classList.add("disabled");
        //     this._showAllObjectsButtonElement.classList.add("disabled");
        //     this._hideAllObjectsButtonElement.classList.add("disabled");
        // } else {
        //     this._objectsTabButtonElement.classList.remove("disabled");
        //     this._showAllObjectsButtonElement.classList.remove("disabled");
        //     this._hideAllObjectsButtonElement.classList.remove("disabled");
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
        <div className={classes.objectsTab + " xeokit-tab" + (this.props.activeTab ? " active" : "") + (this.state.tabEnabled ? "" : " disabled")}>
          <a className="xeokit-tab-btn" href="#" onClick={this.handleSetActiveTab}>Objects</a>
          <div className="xeokit-tab-content">
            <div className="xeokit-btn-group">
              <button type="button" className={"xeokit-showAllObjects xeokit-btn" + (this.state.showObjectsEnabled ? "" : " disabled")} data-tippy-content="Show all objects" onClick={this.props.showAll}>Show all</button>
              <button type="button" className={"xeokit-hideAllObjects xeokit-btn" + (this.state.hideObjectsEnabled ? "" : " disabled")} data-tippy-content="Hide all objects" onClick={this.props.hideAll}>Hide all</button>
            </div>
            <div className="xeokit-objects xeokit-tree-panel" ref={this.modelsRef}></div>
          </div>
        </div>
      );
    }
}

const styles = () => ({
  root: {
  },
  objectsTab: {
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
    '& ul li a.plus': {
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
      color: '#ffffff',
      cursor: 'pointer',
      background: 'rgba(255, 255, 255, 0.2)',
      paddingLeft: '2px',
      verticalAlign: 'middle',
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

export default withStyles(styles)(ObjectsExplorer);
