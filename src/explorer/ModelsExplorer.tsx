import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import { BIMViewer, ViewerConfig, ViewerContent, ViewerInfo, ViewerInfoModel, ViewerState } from '../BIMViewer';
import { ModelsContextMenu } from "../contextMenus/ModelsContextMenu";
import { Controller } from "../Controller";

import { Server } from '../server/Server';
import { Viewer } from '../xeokit-sdk/viewer/Viewer';

interface Props extends WithStyles<typeof styles> {
  ref: any;
  activeTab: boolean;
  bimViewer: BIMViewer;
  viewer: Viewer;
  server: Server;
  numModelsLoaded: number;
  modelsInfo: ViewerInfoModel[];
  enableEditModels: boolean;
  loadModel(modelId: string): void;
  unloadModel(modelId: string): void;
  error(errorMessage: string): void;
  destroy(): void;
  loadAll(event: React.MouseEvent): void;
  unloadAll(event: React.MouseEvent): void;
  addModel(event: React.MouseEvent): void;
  setActiveTab(): void;
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
      // Clear models pane when all unloaded
      if (previousProps.numModelsLoaded !== 0 && this.props.numModelsLoaded === 0) {
        this.modelsRef.current.innerHTML = "";
      }
    }

    _buildModelsMenu(modelsInfo: ViewerInfoModel[]) {
        var html = "";
        for (let i = 0, len = modelsInfo.length; i < len; i++) {
            const modelInfo = modelsInfo[i];
            html += "<div class='xeokit-form-check'>";
            html += "<input id='" + modelInfo.id + "' type='checkbox' value=''><span id='span-" + modelInfo.id + "' class='disabled'>" + modelInfo.name + "</span>";
            html += "</div>";
        }
        this.modelsRef.current.innerHTML = html;
        for (let i = 0, len = modelsInfo.length; i < len; i++) {
            const modelInfo = modelsInfo[i];
            const modelId = modelInfo.id;
            const checkBox = document.getElementById("" + modelId);
            const span = document.getElementById("span-" + modelId);
            checkBox.addEventListener("click", () => {
                if ((checkBox as any).checked) {
                    this.props.loadModel(modelId);
                } else {
                    this.props.unloadModel(modelInfo.id);
                }
            });
            span.addEventListener("click", () => {
                const model = this.props.viewer.scene.models[modelId];
                const modelLoaded = (!!model);
                if (!modelLoaded) {
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

    handleSetActiveTab = (event: React.MouseEvent) => {
      event.preventDefault();
      this.props.setActiveTab();
    }

    public render() {
      const { classes } = this.props;
      return (
        <div className={classes.modelsTab + " xeokit-tab" + (this.props.activeTab ? " active" : "") + (this.state.tabEnabled ? "" : " disabled")} >
          <a className="xeokit-tab-btn" onClick={this.handleSetActiveTab} href="#">Models</a>
          <div className="xeokit-tab-content">
            <div className="xeokit-btn-group">
              <button type="button" className={"xeokit-loadAllModels xeokit-btn" + (this.state.loadModelsEnabled ? "" : " disabled")} data-tippy-content="Load all models" onClick={this.props.loadAll}>Load all</button>
              <button type="button" className={"xeokit-unloadAllModels xeokit-btn" + (this.state.unloadModelsEnabled ? "" : " disabled")} data-tippy-content="Unload all models" onClick={this.props.unloadAll}>Unload all</button>
              { this.props.enableEditModels ? 
                <button type="button" className={"xeokit-addModel xeokit-btn" + (this.state.addModelEnabled ? "" : " disabled")} data-tippy-content="Add model" onClick={this.props.addModel}>Add</button> : ''
              }
            </div>
            <div className="xeokit-models" ref={this.modelsRef}></div>
          </div>
        </div>
      );
    }
}

const styles = () => ({
  root: {
  },
  modelsTab: {
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
  }
});

export default withStyles(styles)(ModelsExplorer);
