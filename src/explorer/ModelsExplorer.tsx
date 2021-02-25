import * as React from 'react';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import { BIMViewer, ViewerConfig, ViewerContent, ViewerInfo, ViewerInfoModel, ViewerState } from '../BIMViewer';
import { ModelsContextMenu } from "../contextMenus/ModelsContextMenu";
import { Controller } from "../Controller";

import { Server } from '../server/Server';
import { Viewer } from '../xeokit-sdk/viewer/Viewer';
import { Button, ButtonGroup } from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {
  ref: any;
  activeTab: boolean;
  bimViewer: BIMViewer;
  viewer: Viewer;
  server: Server;
  numModelsLoaded: number;
  modelsInfo: {[id: string]: ViewerInfoModel};
  enableEditModels: boolean;
  loadModel(modelId: string): void;
  unloadModel(modelId: string): void;
  error(errorMessage: string): void;
  destroy(): void;
  loadAll(event: React.MouseEvent): void;
  unloadAll(event: React.MouseEvent): void;
  addModel(event: React.MouseEvent): void;
}

export class ModelsExplorer extends React.Component<Props> {

    state: {
      addModelEnabled: boolean;
      unloadModelsEnabled: boolean;
      loadModelsEnabled: boolean;
      tabEnabled: boolean;
    };

    _enableAddModels: any;
    // _modelsTabElement: any;
    // _loadModelsButtonElement: Element;
    // _unloadModelsButtonElement: Element;
    // _addModelButtonElement: Element;
    // _modelsElement: Element;
    // _modelsTabButtonElement: Element;

    _modelsContextMenu: ModelsContextMenu;

    modelsRef: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {

        super(props);

        // if (!cfg.modelsTabElement) {
        //     throw "Missing config: modelsTabElement";
        // }

        // if (!cfg.unloadModelsButtonElement) {
        //     throw "Missing config: unloadModelsButtonElement";
        // }

        // if (!cfg.modelsElement) {
        //     throw "Missing config: modelsElement";
        // }

        this.modelsRef = React.createRef();

        this._enableAddModels = !!props.enableEditModels;
        // this._modelsTabElement = cfg.modelsTabElement;
        // this._loadModelsButtonElement = cfg.loadModelsButtonElement;
        // this._unloadModelsButtonElement = cfg.unloadModelsButtonElement;
        // this._addModelButtonElement = cfg.addModelButtonElement;
        // this._modelsElement = cfg.modelsElement;
        // this._modelsTabButtonElement = this._modelsTabElement.querySelector(".xeokit-tab-btn");

        // if (!this._modelsTabButtonElement) {
        //     throw "Missing DOM element: ,xeokit-tab-btn";
        // }

        this._modelsContextMenu = new ModelsContextMenu({
            enableEditModels: this.props.enableEditModels
        });

        this.state = {
          addModelEnabled: true,
          unloadModelsEnabled: true,
          loadModelsEnabled: true,
          tabEnabled: true,
        };
    }

    public componentDidMount() {
      this._buildModelsMenu(this.props.modelsInfo)
    }

    public componentDidUpdate(previousProps: Props) {
      // Update loaded models
      if (previousProps.numModelsLoaded != this.props.numModelsLoaded) {
        for (const i of Object.keys(this.props.modelsInfo)) {
          const modelInfo = this.props.modelsInfo[i];
          const modelId = modelInfo.id;
          const checkBox = document.getElementById(modelId);
          if (checkBox) {
            (checkBox as any).checked = this.props.viewer.scene.models[modelId];
          }
        }
      }
      // Clear models pane when all unloaded
      // if (previousProps.numModelsLoaded !== 0 && this.props.numModelsLoaded === 0) {
      //   this.modelsRef.current.innerHTML = "";
      // }
    }

    _buildModelsMenu(modelsInfo: {[id: string]: ViewerInfoModel}) {
        var html = "";
        for (const i of Object.keys(modelsInfo)) {
            const modelInfo = modelsInfo[i];
            html += "<div class='xeokit-form-check'>";
            html += "<input id='" + modelInfo.id + "' type='checkbox' value=''><label id='span-" + modelInfo.id + "' for='" + modelInfo.id + "' class='disabled'>" + modelInfo.name + "</span>";
            html += "</div>";
        }
        this.modelsRef.current.innerHTML = html;
        for (const i of Object.keys(modelsInfo)) {
            const modelInfo = modelsInfo[i];
            const modelId = modelInfo.id;
            const checkBox = document.getElementById(modelId);
            const span = document.getElementById("span-" + modelId);
            checkBox.addEventListener("click", () => {
                if ((checkBox as any).checked) {
                    this.props.loadModel(modelId);
                } else {
                    this.props.unloadModel(modelInfo.id);
                }
            });
            span.oncontextmenu = (e: any) => {
                this._modelsContextMenu.context = {
                    bimViewer: this.props.bimViewer,
                    viewer: this.props.viewer,
                    modelId: modelId
                };
                this._modelsContextMenu.show(e.pageX, e.pageY);
                e.preventDefault();
            };
        }
    }

    setEnabled(enabled: boolean) {
        this.setState({
          tabEnabled: enabled,
          unloadModelsEnabled: enabled,
        });
        // if (!enabled) {
        //     this._modelsTabButtonElement.classList.add("disabled");
        //     this._unloadModelsButtonElement.classList.add("disabled");
        // } else {
        //     this._modelsTabButtonElement.classList.remove("disabled");
        //     this._unloadModelsButtonElement.classList.remove("disabled");
        // }
    }

    /** @private */
    destroy() {
        this.props.destroy();
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
                onClick={this.props.loadAll}
                className={classes.button}
                disabled={!this.state.loadModelsEnabled}
              >
                Load All
              </Button>
              <Button
                variant="contained"
                onClick={this.props.unloadAll}
                className={classes.button}
                disabled={!this.state.unloadModelsEnabled}
              >
                Unload All
              </Button>
            </ButtonGroup>
            { this.props.enableEditModels &&
              <Button
                variant="contained"
                onClick={this.props.addModel}
                className={classes.button}
                disabled={!this.state.addModelEnabled}
              >
                Add
              </Button>
            }
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
    '& .xeokit-form-check': {
      padding: '2px 0 2px 15px',
      lineHeight: '3ex',
    },
    '& .xeokit-form-check input': {
      verticalAlign: 'middle',
    },
    '& .xeokit-form-check span': {
      display: 'inline-block',
      color: '#ffff',
      backgroundColor: '#03103F',
      paddingLeft: '3px',
      width: 'calc(100% - 30px)',
      verticalAlign: 'middle',
    },
    '& .xeokit-form-check span.disabled': {
      color: '#99A4AD',
      backgroundColor: '#03103F',
    },
    '& .xeokit-form-check span:hover': {
      color: '#ffffff',
      cursor: 'pointer',
      background: 'rgba(255, 255, 255, 0.2)',
      paddingLeft: '3px',
    },
    '& .xeokit-form-check span.disabled:hover': {
      color: '#99A4AD',
      backgroundColor: '#03103F',
      cursor: 'default',
    }
  },
  rootHidden: {
    display: 'none',
  },
  buttonRow: {
    textAlign: 'center' as 'center',
    marginTop: '20px',
    marginBottom: '10px',
  },
  content: {
    padding: '0px 20px 20px 20px',
    overflow: 'auto',
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

export default withStyles(styles)(ModelsExplorer);
