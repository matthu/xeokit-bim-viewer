import * as React from 'react';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { TreeViewContextMenu } from "../contextMenus/TreeViewContextMenu";
import { Controller } from "../Controller";
import { BIMViewer } from '../BIMViewer';
import { Viewer } from '../xeokit-sdk/viewer/Viewer';
import { TreeViewPlugin } from '../xeokit-sdk/plugins/TreeViewPlugin/TreeViewPlugin';
import { Button, ButtonGroup } from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {
  ref: any;
  activeTab: boolean;
  bimViewer: BIMViewer;
  viewer: Viewer;
  error(errorMessage: string): void;
  destroy(): void;
  showAll(event: React.MouseEvent): void;
  hideAll(event: React.MouseEvent): void;
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

        // this._treeView.on("nodeTitleClicked", (e: any) => {
        //     const scene = this.props.viewer.scene;
        //     const objectIds: string[] = [];
        //     e.treeViewPlugin.withNodeTree(e.treeViewNode, (treeViewNode: any) => {
        //         if (treeViewNode.objectId) {
        //             objectIds.push(treeViewNode.objectId);
        //         }
        //     });
        //     const checked = e.treeViewNode.checked;
        //     if (checked) {
        //         scene.setObjectsXRayed(objectIds, false);
        //         scene.setObjectsVisible(objectIds, false);
        //         scene.setObjectsPickable(objectIds, true);
        //     } else {
        //         scene.setObjectsXRayed(objectIds, false);
        //         scene.setObjectsVisible(objectIds, true);
        //         scene.setObjectsPickable(objectIds, true);
        //     }
        // });

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

    public render() {
      const { classes } = this.props;
      return (
        <div
          className={classes.root + (!this.props.activeTab ? ' ' + classes.rootHidden : '')}
          hidden={!this.props.activeTab}
        >
          <div className={classes.buttonRow}>
            <ButtonGroup
              color="default"
              className={classes.buttonGroup}
            >
              <Button
                variant="contained"
                onClick={this.props.showAll}
                className={classes.button}
                disabled={!this.state.showClassesEnabled}
              >
                Show All
              </Button>
              <Button
                variant="contained"
                onClick={this.props.hideAll}
                className={classes.button}
                disabled={!this.state.hideClassesEnabled}
              >
                Hide All
              </Button>
            </ButtonGroup>
          </div>
          <div className={classes.content} ref={this.modelsRef}></div>
        </div>
      );
    }
}

const styles = (theme: Theme) => ({
  root: {
    flex: '1 1 100%',
    display: 'flex',
    flexDirection: 'column' as 'column',
    overflow: 'auto',
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
    'ul li span:hover': {
      color: 'white',
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
    },
  },
  rootHidden: {
    display: 'none',
  },
  content: {
    padding: '0px 20px 20px 20px',
    overflow: 'auto',
  },
  buttonRow: {
    textAlign: 'center' as 'center',
    marginTop: '20px',
    marginBottom: '10px',
  },
  buttonGroup: {
    margin: '0px 10px 10px 10px',
  },
  button: {
    color: theme.palette.primary.main,
    backgroundColor: 'white',
    '&:hover': {
      color: theme.palette.secondary.main,
      backgroundColor: 'white',
    }
  },
  selectedButton: {
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.secondary.main,
    }
  },
});

export default withStyles(styles)(ClassesExplorer);
