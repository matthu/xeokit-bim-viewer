import { withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import SplitPane from 'react-split-pane';
import tippy from "tippy.js";
import { BusyModal } from "./BusyModal";
import ConfirmationDialog from './ConfirmationDialog';
import { CanvasContextMenu } from "./contextMenus/CanvasContextMenu";
import { ObjectContextMenu } from "./contextMenus/ObjectContextMenu";
import { Controller } from "./Controller";
import ClassesExplorerComponent, { ClassesExplorer } from "./explorer/ClassesExplorer";
import ModelsExplorerComponent, { ModelsExplorer } from "./explorer/ModelsExplorer";
import ObjectsExplorerComponent, { ObjectsExplorer } from "./explorer/ObjectsExplorer";
import StoreysExplorerComponent, { StoreysExplorer } from "./explorer/StoreysExplorer";
import { ModelIFCObjectColors } from "./IFCObjectDefaults/ModelIFCObjectColors";
import { ViewerIFCObjectColors } from "./IFCObjectDefaults/ViewerIFCObjectColors";
import { Server } from "./server/Server";
import { FirstPersonMode } from "./toolbar/FirstPersonMode";
import { FitAction } from "./toolbar/FitAction";
import { HideTool } from "./toolbar/HideTool";
import { NavCubeMode } from "./toolbar/NavCubeMode";
import { OrthoMode } from "./toolbar/OrthoMode";
import { QueryTool } from "./toolbar/QueryTool";
import { ResetAction } from "./toolbar/ResetAction";
import { SectionTool } from "./toolbar/SectionTool";
import { SelectionTool } from "./toolbar/SelectionTool";
import { ThreeDMode } from "./toolbar/ThreeDMode";
import { BCFViewpointsPlugin } from './xeokit-sdk/plugins/BCFViewpointsPlugin/BCFViewpointsPlugin';
import { XKTLoaderPlugin } from './xeokit-sdk/plugins/XKTLoaderPlugin/XKTLoaderPlugin';
import { Entity } from './xeokit-sdk/viewer/scene/Entity';
import { AmbientLight } from './xeokit-sdk/viewer/scene/lights/AmbientLight';
import { DirLight } from './xeokit-sdk/viewer/scene/lights/DirLight';
import { math } from './xeokit-sdk/viewer/scene/math/math';
import { Map } from './xeokit-sdk/viewer/scene/utils/Map';
import { Viewer } from "./xeokit-sdk/viewer/Viewer.js";

const tempVec3 = math.vec3();

// function initTabs(containerElement: Element) {

//     const tabsClass = 'xeokit-tabs';
//     const tabClass = 'xeokit-tab';
//     const tabButtonClass = 'xeokit-tab-btn';
//     const activeClass = 'active';

//     // Activates the chosen tab and deactivates the rest
//     function activateTab(chosenTabElement: Element) {
//         let tabList = chosenTabElement.parentNode.querySelectorAll('.' + tabClass);
//         for (let i = 0; i < tabList.length; i++) {
//             let tabElement = tabList[i];
//             if (tabElement.isEqualNode(chosenTabElement)) {
//                 tabElement.classList.add(activeClass)
//             } else {
//                 tabElement.classList.remove(activeClass)
//             }
//         }
//     }

//     // Initialize each tabbed container
//     let tabbedContainers = containerElement.querySelectorAll('.' + tabsClass);
//     for (let i = 0; i < tabbedContainers.length; i++) {
//         let tabbedContainer = tabbedContainers[i];
//         let tabList = tabbedContainer.querySelectorAll('.' + tabClass);
//         activateTab(tabList[0]);
//         for (let i = 0; i < tabList.length; i++) {
//             let tabElement = tabList[i];
//             let tabButton = tabElement.querySelector('.' + tabButtonClass);
//             tabButton.addEventListener('click', function (event) {
//                 event.preventDefault();
//                 if (this.classList.contains("disabled")) {
//                     return;
//                 }
//                 activateTab((event.target as Element).parentNode as Element);
//             })
//         }
//     }
// }

export interface BIMConfig {
    canvasElement?: any;
    explorerElement?: any;
    toolbarElement?: any;
    navCubeCanvasElement?: any;
    queryInfoPanelElement?: any;
    busyModelBackdropElement?: any;
    enableEditModels?: boolean;
    buttonElement?: Element;
    counterElement?: HTMLElement;
    menuButtonElement?: Element;
    menuButtonArrowElement?: Element;
    active?: boolean;
}

export interface ViewerInfo {
  id: string;
  name: string;
  models: ViewerInfoModel[];
  viewerConfigs: ViewerConfig;
  viewerContent: ViewerContent;
  viewerState: ViewerState;
}

export interface ViewerConfig {
  cameraNear: string;
  cameraFar: string;
  saoEnabled: string;
  saoBias: string;
  saoIntensity: string;
  saoScale: string;
  saoKernelRadius: string;
}

export interface ViewerState {
  threeDActive: boolean;
  threeDEnabled: boolean;
  selectedStorey: string;
  tabOpen: string;
  expandObjectsTree: number;
  expandClassesTree: number;
  expandStoreysTree: number;
  setCamera: {
    eye: number[];
    look: number[];
    up: number[];
  }
}

export interface ViewerContent {
  modelsLoaded: string[];
}

export interface ViewerInfoModel {
  id: string;
  name: string;
}

export interface MetaData {
  id: string;
  name: string;
  type: string;
  parent: string;
  children: any[];
}

interface Props extends BIMConfig, WithStyles<typeof styles> {
  ref: any;
  server: any;
  defaultTab: "models" | "objects" | "classes" | "storeys";
}

interface ObjectProperties {
  id: string;
  name: string;
  type: string;
  hierarchy: string[];
  modelAuthor: string;
  modelRevisionId: string;
  modelCreatedAt: string;
  modelCreatedApp: string;
  modelId: string;
  projectId: string;
}

/**
 * @desc A BIM viewer based on the [xeokit SDK](http://xeokit.io).
 *
 *
 */
export class BIMViewer extends React.Component<Props> {
    state: {
      activeTab: "models" | "objects" | "classes" | "storeys";
      showObjectProperties: ObjectProperties;
    }

    cfg: BIMConfig;

    bimViewer: BIMViewer;
    server: any;
    viewer: Viewer;

    _configs: any;
    _enableAddModels: boolean;
    // _explorerElement: any;
    _busyModal: BusyModal;
    _bcfViewpointsPlugin: BCFViewpointsPlugin;
    _canvasContextMenu: CanvasContextMenu;
    _objectContextMenu: ObjectContextMenu;
    _objectColorSource: any;
    // Actions
    _resetAction: ResetAction;
    _fitAction: FitAction;
    //Modes
    _threeDMode: ThreeDMode;
    // _orthoMode: OrthoMode;
    _navCubeMode: NavCubeMode;
    _firstPersonMode: FirstPersonMode;
    //Tools
    _hideTool: HideTool;
    _selectionTool: SelectionTool;
    _queryTool: QueryTool;
    _sectionTool: SectionTool;
    // Explorers
    // _modelsExplorer: ModelsExplorer;
    // _objectsExplorer: ObjectsExplorer;
    // _classesExplorer: ClassesExplorer;
    // _storeysExplorer: StoreysExplorer;

    // Controller properties
    _children: Controller[];
    _subIdMap: Map;
    _subIdEvents: any;
    _eventSubs: any;
    _events: any;
    _eventCallDepth: number;
    _enabled: boolean;
    _active: boolean;
    _destroyed: boolean;

    // Model properties
    _modelsInfo: any;
    _numModels: number;
    _numModelsLoaded: number;
    _projectId: string;
    _xktLoader: XKTLoaderPlugin;

    canvasElementRef: React.RefObject<HTMLCanvasElement>;
    explorerElementRef: React.RefObject<HTMLDivElement>;
    modelsExplorerRef: React.RefObject<ModelsExplorer>;
    objectsExplorerRef: React.RefObject<ObjectsExplorer>;
    classesExplorerRef: React.RefObject<ClassesExplorer>;
    storeysExplorerRef: React.RefObject<StoreysExplorer>;
    toolbarElementRef: React.RefObject<HTMLDivElement>;
    navCubeCanvasElementRef: React.RefObject<HTMLCanvasElement>;
    busyModelBackdropElementRef: React.RefObject<HTMLDivElement>;

    /**
     * Constructs a BIMViewer.
     * @param {Server} server Data access strategy.
     * @param {*} cfg Configuration.
     * @param {Boolean} [cfg.enableEditModels=false] Set ````true```` to show "Add", "Edit" and "Delete" options in the Models tab's context menu.
     */
    constructor(props: Props) {

        // if (!props.cfg.canvasElement) {
        //     throw "Config expected: canvasElement";
        // }

        // if (!props.cfg.explorerElement) {
        //     throw "Config expected: explorerElement";
        // }

        // if (!props.cfg.toolbarElement) {
        //     throw "Config expected: toolbarElement";
        // }

        // if (!props.cfg.navCubeCanvasElement) {
        //     throw "Config expected: navCubeCanvasElement";
        // }

        
        // super(null, cfg, server, viewer);
        super(props);

        this.canvasElementRef = React.createRef();
        this.explorerElementRef = React.createRef();
        this.modelsExplorerRef = React.createRef();
        this.objectsExplorerRef = React.createRef();
        this.classesExplorerRef = React.createRef();
        this.storeysExplorerRef = React.createRef();
        this.toolbarElementRef = React.createRef();
        this.navCubeCanvasElementRef = React.createRef();
        this.busyModelBackdropElementRef = React.createRef();
        
        this.server = props.server;
        this._children = [];

        // if (parent) {
        //     parent._children.push(this);
        // }

        this._subIdMap = null; // Subscription subId pool
        this._subIdEvents = null; // Subscription subIds mapped to event names
        this._eventSubs = null; // Event names mapped to subscribers
        this._events = null; // Maps names to events
        this._eventCallDepth = 0; // Helps us catch stack overflows from recursive events

        this._enabled = null; // Used by #setEnabled() and #getEnabled()
        this._active = null; // Used by #setActive() and #getActive()

        this._configs = {};
        this._enableAddModels = !!props.enableEditModels;

        this._modelsInfo = {};
        this._numModels = 0;
        this._numModelsLoaded = 0;
        this._projectId = null;

        this.state = {
          activeTab: props.defaultTab,
          showObjectProperties: null,
        };
    }

    public componentDidMount() {
        const canvasElement: HTMLCanvasElement = this.canvasElementRef.current;
        const explorerElement: HTMLElement = this.explorerElementRef.current;
        const toolbarElement: HTMLElement = this.toolbarElementRef.current;
        const navCubeCanvasElement: HTMLCanvasElement = this.navCubeCanvasElementRef.current;
        // const queryInfoPanelElement: HTMLElement = props.queryInfoPanelElement;
        const busyModelBackdropElement: HTMLElement = this.busyModelBackdropElementRef.current;
      
        this.viewer = new Viewer({
            canvasElement: canvasElement,
            transparent: true
        });

        this._xktLoader = new XKTLoaderPlugin(this.viewer, {
            objectDefaults: ModelIFCObjectColors
        });

        explorerElement.oncontextmenu = (e: Event) => {
            e.preventDefault();
        };

        toolbarElement.oncontextmenu = (e: Event) => {
            e.preventDefault();
        };

        navCubeCanvasElement.oncontextmenu = (e: Event) => {
            e.preventDefault();
        };
        /**
         * The xeokit [Viewer](https://xeokit.github.io/xeokit-sdk/docs/class/src/viewer/Viewer.js~Viewer.html) at the core of this BIMViewer.
         *
         * @type {Viewer}
         */
        this._customizeViewer();
        this._initCanvasContextMenus();
        this._initConfigs();

        // Create tooltips on various HTML elements created by BIMViewer
        tippy('[data-tippy-content]', {
          appendTo: function () {
              return document.querySelector('#myViewer')
          }
        });

        // this._explorerElement = explorerElement;

        // initTabs(explorerElement);

        // this._modelsExplorer = new ModelsExplorer(this, {
        //     modelsTabElement: explorerElement.querySelector(".xeokit-modelsTab"),
        //     loadModelsButtonElement: explorerElement.querySelector(".xeokit-loadAllModels"), // Can be undefined
        //     unloadModelsButtonElement: explorerElement.querySelector(".xeokit-unloadAllModels"),
        //     addModelButtonElement: explorerElement.querySelector(".xeokit-addModel"), // Can be undefined
        //     modelsElement: explorerElement.querySelector(".xeokit-models"),
        //     enableEditModels: this._enableAddModels
        // });

        // this._objectsExplorer = new ObjectsExplorer(this, {
        //     objectsTabElement: explorerElement.querySelector(".xeokit-objectsTab"),
        //     showAllObjectsButtonElement: explorerElement.querySelector(".xeokit-showAllObjects"),
        //     hideAllObjectsButtonElement: explorerElement.querySelector(".xeokit-hideAllObjects"),
        //     objectsElement: explorerElement.querySelector(".xeokit-objects")
        // });

        // this._classesExplorer = new ClassesExplorer(this, {
        //     classesTabElement: explorerElement.querySelector(".xeokit-classesTab"),
        //     showAllClassesButtonElement: explorerElement.querySelector(".xeokit-showAllClasses"),
        //     hideAllClassesButtonElement: explorerElement.querySelector(".xeokit-hideAllClasses"),
        //     classesElement: explorerElement.querySelector(".xeokit-classes")
        // });

        // this._storeysExplorer = new StoreysExplorer(this, {
        //     storeysTabElement: explorerElement.querySelector(".xeokit-storeysTab"),
        //     showAllStoreysButtonElement: explorerElement.querySelector(".xeokit-showAllStoreys"),
        //     hideAllStoreysButtonElement: explorerElement.querySelector(".xeokit-hideAllStoreys"),
        //     storeysElement: explorerElement.querySelector(".xeokit-storeys")
        // });

        this._resetAction = new ResetAction(this, {
            buttonElement: toolbarElement.querySelector(".xeokit-reset"),
            active: false
        });

        this._fitAction = new FitAction(this, {
            buttonElement: toolbarElement.querySelector(".xeokit-fit"),
            active: false
        });

        // Allows Three-D and First Person toggle buttons to cooperatively switch
        // CameraControl#navMode between "orbit", "firstPerson" and "planView" modes

        const cameraControlNavModeMediator = new (function (bimViewer: BIMViewer) {

            let threeDActive = false;
            let firstPersonActive = false;

            this.setThreeDModeActive = (active: boolean) => {
                if (active) {
                    bimViewer._firstPersonMode.setActive(false);
                    bimViewer.viewer.cameraControl.navMode = "orbit";
                    //  bimViewer.viewer.cameraControl.followPointer = true;
                } else {
                    bimViewer._firstPersonMode.setActive(false);
                    bimViewer.viewer.cameraControl.navMode = "planView";
                    //  bimViewer.viewer.cameraControl.followPointer = false;
                }
                threeDActive = active;
            };

            this.setFirstPersonModeActive = (active: boolean) => {
                bimViewer.viewer.cameraControl.navMode = active ? "firstPerson" : (threeDActive ? "orbit" : "planView");
                //bimViewer.viewer.cameraControl.followPointer = bimViewer.viewer.cameraControl.navMode !== "planView";
                firstPersonActive = active;
            };
        } as any)(this) as any;

        this._threeDMode = new ThreeDMode(this, {
            buttonElement: toolbarElement.querySelector(".xeokit-threeD"),
            cameraControlNavModeMediator: cameraControlNavModeMediator,
            active: false
        });

        // this._orthoMode = new OrthoMode(this, {
        //     buttonElement: toolbarElement.querySelector(".xeokit-ortho"),
        //     active: false
        // });

        this._firstPersonMode = new FirstPersonMode(this, {
            buttonElement: toolbarElement.querySelector(".xeokit-firstPerson"),
            cameraControlNavModeMediator: cameraControlNavModeMediator,
            active: false
        });

        this._hideTool = new HideTool(this, {
            buttonElement: toolbarElement.querySelector(".xeokit-hide"),
            active: false
        });

        this._selectionTool = new SelectionTool(this, {
            buttonElement: toolbarElement.querySelector(".xeokit-select"),
            active: false
        });

        this._queryTool = new QueryTool(this, {
            buttonElement: toolbarElement.querySelector(".xeokit-query"),
            // queryInfoPanelElement: queryInfoPanelElement,
            active: false
        });

        this._sectionTool = new SectionTool(this, {
            buttonElement: toolbarElement.querySelector(".xeokit-section"),
            counterElement: toolbarElement.querySelector(".xeokit-section-counter"),
            menuButtonElement: toolbarElement.querySelector(".xeokit-section-menu-button"),
            menuButtonArrowElement: toolbarElement.querySelector(".xeokit-section-menu-button-arrow"),
            active: false
        });

        this._navCubeMode = new NavCubeMode(this, {
            navCubeCanvasElement: navCubeCanvasElement,
            active: true
        });

        this._busyModal = new BusyModal(this, {
            busyModalBackdropElement: busyModelBackdropElement
        });

        this._threeDMode.setActive(true);
        this._firstPersonMode.setActive(false);
        this._navCubeMode.setActive(true);

        // this._modelsExplorer.on("modelLoaded", (modelId: string) => {
        //     if (this._modelsExplorer.getNumModelsLoaded() > 0) {
        //         this.setControlsEnabled(true);
        //     }
        //     this.fire("modelLoaded", modelId);
        // });

        // this._modelsExplorer.on("modelUnloaded", (modelId: string) => {
        //     if (this._modelsExplorer.getNumModelsLoaded() === 0) {
        //         this.setControlsEnabled(false);
        //         this.openTab("models");
        //     }
        //     this.fire("modelUnloaded", modelId);
        // });

        this._queryTool.on("queryPicked", (event: any) => {
            this.fire("queryPicked", event);
        });

        this._queryTool.on("queryNotPicked", () => {
            this.fire("queryNotPicked", true);
        });

        this._queryTool.on("objectSelected", (objectId: string) => {
          this.showObjectPropertes(objectId);
        });

        this._selectionTool.on("objectSelected", (objectId: string) => {
          this.showObjectPropertes(objectId);
        });

        this._resetAction.on("reset", () => {
            this.fire("reset", true);
        });

        this._mutexActivation([this._queryTool, this._hideTool, this._selectionTool, this._sectionTool]);

        // explorerElement.querySelector(".xeokit-loadAllModels").addEventListener("click", (event: Event) => {
        //     this.setControlsEnabled(false); // For quick UI feedback
        //     this.loadAllModels();
        //     event.preventDefault();
        // });

        // explorerElement.querySelector(".xeokit-unloadAllModels").addEventListener("click", (event: Event) => {
        //     this.setControlsEnabled(false); // For quick UI feedback
        //     this._modelsExplorer.unloadAllModels();
        //     event.preventDefault();
        // });

        // if (this._enableAddModels) {
        //     explorerElement.querySelector(".xeokit-addModel").addEventListener("click", (event: Event) => {
        //         this.fire("addModel", {});
        //         event.preventDefault();
        //     });
        // }

        this._bcfViewpointsPlugin = new BCFViewpointsPlugin(this.viewer, {});
    }

    handleShowAllObjects = (event: React.MouseEvent) => {
        this.setAllObjectsVisible(true);
        this.setAllObjectsXRayed(false);
        event.preventDefault();
    }

    handleHideAllObjects = (event: React.MouseEvent) => {
        this.setAllObjectsVisible(false);
        event.preventDefault();
    }

    handleLoadAllModels = (event: React.MouseEvent) => {
        this.setControlsEnabled(false); // For quick UI feedback
        this.loadAllModels();
        event.preventDefault();
    }

    handleUnloadAllModels = (event: React.MouseEvent) => {
        this.setControlsEnabled(false); // For quick UI feedback
        this.unloadAllModels();
        event.preventDefault();
    }

    handleAddModel = (event: React.MouseEvent) => {
        if (this._enableAddModels) {
            this.fire("addModel", {});
            event.preventDefault();
        }
    }

    handleSetTab = (tab: "models" | "objects" | "classes" | "storeys") => {
        this.setState({activeTab: tab});
    }

    modelsExplorerLoaded = (modelId: string) => {
        if (this.getNumModelsLoaded() > 0) {
            this.setControlsEnabled(true);
        }
        this.fire("modelLoaded", modelId);
    }

    modelsExplorerUnloaded = (modelId: string) => {
        if (this.getNumModelsLoaded() === 0) {
            this.setControlsEnabled(false);
            this.setState({activeTab: "models"});
        }
        this.fire("modelUnloaded", modelId);
    }

    _customizeViewer() {

        const scene = this.viewer.scene;

        // Emphasis effects

        scene.xrayMaterial.fill = false;
        scene.xrayMaterial.fillAlpha = 0.1;
        scene.xrayMaterial.fillColor = [0, 0, 0];
        scene.xrayMaterial.edges = true;
        scene.xrayMaterial.edgeAlpha = 0.3;
        scene.xrayMaterial.edgeColor = [0, 0, 0];

        scene.highlightMaterial.edges = true;
        scene.highlightMaterial.edgeColor = [.5, .5, 0];
        scene.highlightMaterial.edgeAlpha = 0.9;
        scene.highlightMaterial.fill = true;
        scene.highlightMaterial.fillAlpha = 0.1;
        scene.highlightMaterial.fillColor = [1, 0, 0];

        // Lighting

        scene.clearLights();

        new AmbientLight(scene, {
            color: [0.3, 0.3, 0.3],
            intensity: 1.0
        });

        new DirLight(scene, {
            dir: [0.8, -0.6, -0.8],
            color: [1.0, 1.0, 1.0],
            intensity: 1.0,
            space: "world"
        });

        new DirLight(scene, {
            dir: [-0.8, -0.4, 0.4],
            color: [1.0, 1.0, 1.0],
            intensity: 1.0,
            space: "world"
        });

        new DirLight(scene, {
            dir: [0.2, -0.8, 0.8],
            color: [0.6, 0.6, 0.6],
            intensity: 1.0,
            space: "world"
        });

        // Camera control

        this.viewer.cameraControl.panRightClick = true;
        this.viewer.cameraControl.followPointer = true;
        this.viewer.cameraControl.doublePickFlyTo = true;
        this.viewer.cameraControl.smartPivot = true;

        // Dolly tweaks for best precision when aligning camera for BCF snapshots

        this.viewer.cameraControl.keyboardDollyRate = 100.0;
        this.viewer.cameraControl.mouseWheelDollyRate = 100.0;
        this.viewer.cameraControl.dollyInertia = 0;
        this.viewer.cameraControl.dollyMinSpeed = 0.04;
        this.viewer.cameraControl.dollyProximityThreshold = 30.0;

        const cameraPivotElement = document.createRange().createContextualFragment("<div class='xeokit-camera-pivot-marker'></div>").firstChild as HTMLElement;
        document.body.appendChild(cameraPivotElement);
        this.viewer.cameraControl.pivotElement = cameraPivotElement;

        // Scalable Ambient Obscurance (SAO) defaults

        scene.camera.perspective.near = 0.01;
        scene.camera.perspective.far = 3000.0;
        scene.camera.ortho.near = 0.01;
        scene.camera.ortho.far = 3000.0;

        const sao = scene.sao;
        sao.enabled = false;
        sao.bias = 0.5;
        sao.intensity = 0.2;
        sao.scale = 1200.0;
        sao.kernelRadius = 100;

        // Only enable SAO and normal edge emphasis while camera is not moving

        const timeoutDuration = 200;
        var timer = timeoutDuration;
        var saoEnabled = false;

        const onCameraMatrix = scene.camera.on("matrix", () => {
            if (this._configs.saoInteractive) {
                return;
            }
            const saoInteractiveDelay = this._configs.saoInteractiveDelay;
            timer = ((saoInteractiveDelay !== null && saoInteractiveDelay !== undefined) ? this._configs.saoInteractiveDelay : 200);
            if (saoEnabled) {
                scene.sao.enabled = false;
                saoEnabled = false;
            }
        });

        const onSceneTick = scene.on("tick", (e: any) => {
            if (this._configs.saoInteractive) {
                if (!saoEnabled) {
                    scene.sao.enabled = (!!this._configs.saoEnabled);
                    saoEnabled = true;
                }
                return;
            }
            if (saoEnabled) {
                return;
            }
            timer -= e.deltaTime;
            if (timer <= 0) {
                if (!saoEnabled) {
                    scene.sao.enabled = (!!this._configs.saoEnabled);
                    saoEnabled = true;
                }
            }
        });
    }

    _initCanvasContextMenus() {

        this._canvasContextMenu = new CanvasContextMenu();
        this._objectContextMenu = new ObjectContextMenu();

        this.viewer.cameraControl.on("rightClick", (e: any) => {

            const event = e.event;

            const hit = this.viewer.scene.pick({
                canvasPos: [event.offsetX, event.offsetY]
            });

            if (hit && hit.entity.isObject) {
                this._canvasContextMenu.hide();
                this._objectContextMenu.context = {
                    viewer: this.viewer,
                    bimViewer: this,
                    showObjectInExplorers: (objectId: any) => {
                        const openTabId = this.state.activeTab;
                        if (openTabId !== "objects" && openTabId !== "classes" && openTabId !== "storeys") {
                            // Scroll won't work if tab not open
                            this.setState({activeTab: "objects"});
                        }
                        this.showObjectInExplorers(objectId);
                    },
                    showObjectProperties: (objectId: any) => {
                      this.showObjectPropertes(objectId);
                    },
                    entity: hit.entity
                };
                this._objectContextMenu.show(event.pageX, event.pageY);
            } else {
                this._objectContextMenu.hide();
                this._canvasContextMenu.context = {
                    viewer: this.viewer,
                    bimViewer: this
                };
                this._canvasContextMenu.show(event.pageX, event.pageY);
            }
        });
    }

    _initConfigs() {
        this.setConfigs({
            "cameraNear": "0.05",
            "cameraFar": "3000.0",
            "smartPivot": "true",
            "saoEnabled": "false",
            "saoBias": "0.5",
            "saoIntensity": "0.5",
            "saoScale": "1200.0",
            "saoKernelRadius": "100",
            "xrayContext": true,
            "backgroundColor": [1.0, 1.0, 1.0],
            "saoInteractive": true,
            "saoInteractiveDelay": 200,
            "objectColorSource": "model"
        });
    }

    /**
     * Sets a batch of viewer configurations.
     *
     * Note that this method is not to be confused with {@link BIMViewer#setViewerState}, which batch-updates various states of the viewer's UI and 3D view.
     *
     * See [Viewer Configurations](https://xeokit.github.io/xeokit-bim-viewer/docs/#viewer-configurations) for the list of available configurations.
     *
     * @param {*} viewerConfigs Map of key-value configuration pairs.
     */
    setConfigs(viewerConfigs: {[id: string]: any}) {
        for (let name in viewerConfigs) {
            if (viewerConfigs.hasOwnProperty(name)) {
                const value = viewerConfigs[name];
                this.setConfig(name, value);
            }
        }
    }

    /**
     * Sets a viewer configuration.
     *
     * See [Viewer Configurations](https://xeokit.github.io/xeokit-bim-viewer/docs/#viewer-configurations) for the list of available configurations.
     *
     * @param {String} name Configuration name.
     * @param {*} value Configuration value.
     */
    setConfig(name: string, value: any) {

        function parseBool(value: any) {
            return ((value === true) || (value === "true"));
        }

        try {
            switch (name) {

                case "backgroundColor":
                    const rgbColor = value;
                    this.setBackgroundColor(rgbColor);
                    this._configs[name] = rgbColor;
                    break;

                case "cameraNear":
                    const near = parseFloat(value);
                    this.viewer.scene.camera.perspective.near = near;
                    this.viewer.scene.camera.ortho.near = near;
                    this._configs[name] = near;
                    break;

                case "cameraFar":
                    const far = parseFloat(value);
                    this.viewer.scene.camera.perspective.far = far;
                    this.viewer.scene.camera.ortho.far = far;
                    this._configs[name] = far;
                    break;

                case "smartPivot":
                    this.viewer.cameraControl.smartPivot = this._configs[name] = parseBool(value);
                    break;

                case "saoEnabled":
                    this.viewer.scene.sao.enabled = this._configs[name] = parseBool(value);
                    break;

                case "saoBias":
                    this.viewer.scene.sao.bias = parseFloat(value);
                    break;

                case "saoIntensity":
                    this.viewer.scene.sao.intensity = parseFloat(value);
                    break;

                case "saoScale":
                    this.viewer.scene.sao.scale = this._configs[name] = parseFloat(value);
                    break;

                case "saoKernelRadius":
                    this.viewer.scene.sao.kernelRadius = this._configs[name] = parseFloat(value);
                    break;

                case "saoBlur":
                    this.viewer.scene.sao.blur = this._configs[name] = parseBool(value);
                    break;

                case "viewFitFOV":
                    this.viewer.cameraFlight.fitFOV = this._configs[name] = parseFloat(value);
                    break;

                case "viewFitDuration":
                    this.viewer.cameraFlight.duration = this._configs[name] = parseFloat(value);
                    break;

                case "perspectiveFOV":
                    this.viewer.camera.perspective.fov = this._configs[name] = parseFloat(value);
                    break;

                case "excludeUnclassifiedObjects":
                    this._configs[name] = parseBool(value);
                    break;

                case "objectColorSource":
                    this.setObjectColorSource(value);
                    this._configs[name] = value;
                    break;

                case "xrayContext":
                    this._configs[name] = value;
                    break;

                case "saoInteractive":
                    this._configs["saoInteractive"] = parseBool(value);
                    break;

                case "saoInteractiveDelay":
                    var saoInteractiveDelay = parseFloat(value);
                    if (saoInteractiveDelay < 0) {
                        this.error("setConfig() - saoInteractiveDelay cannot be less than zero - clamping to zero");
                        saoInteractiveDelay = 0;
                    }
                    this._configs["saoInteractiveDelay"] = parseFloat(value);
                    break;

                default:
                    this.error("setConfig() - unsupported configuration: '" + name + "'");
            }

        } catch (e) {
            this.error("setConfig() - failed to configure '" + name + "': " + e);
        }
    }

    /**
     * Gets the value of a viewer configuration.
     *
     * These are set with {@link BIMViewer#setConfig} and {@link BIMViewer#setConfigs}.
     *
     * @param {String} name Configuration name.
     * @ereturns {*} Configuration value.
     */
    getConfig(name: string) {
        return this._configs[name];
    }

    //------------------------------------------------------------------------------------------------------------------
    // Content querying methods
    //------------------------------------------------------------------------------------------------------------------

    /**
     * Gets information on all available projects.
     *
     * See [Getting Info on Available Projects](https://xeokit.github.io/xeokit-bim-viewer/docs/#getting-info-on-available-projects) for usage.
     *
     * @param {Function} done Callback invoked on success, into which the projects information JSON is passed.
     * @param {Function} error Callback invoked on failure, into which the error message string is passed.
     */
    getProjectsInfo(done:any, error: any) {
        if (!done) {
            this.error("getProjectsInfo() - Argument expected: 'done'");
            return;
        }
        this.server.getProjects(done, (errorMsg: string) => {
            this.error("getProjectsInfo() - " + errorMsg);
            if (error) {
                error(errorMsg);
            }
        });
    }

    /**
     * Gets information on the given project.
     *
     * See [Getting Info on a Project](https://xeokit.github.io/xeokit-bim-viewer/docs/#getting-info-on-a-project) for usage.
     *
     * @param {String} projectId ID of the project to get information on. Must be the ID of one of the projects in the information obtained by {@link BIMViewer#getProjects}.
     * @param {Function} done Callback invoked on success, into which the project information JSON is passed.
     * @param {Function} error Callback invoked on failure, into which the error message string is passed.
     */
    getProjectInfo(projectId: string, done: any, error: any) {
        if (!projectId) {
            this.error("getProjectInfo() - Argument expected: projectId");
            return;
        }
        if (!done) {
            this.error("getProjectInfo() - Argument expected: 'done'");
            return;
        }
        this.server.getProject(projectId,
            done, (errorMsg: string) => {
                this.error("getProjectInfo() - " + errorMsg);
                if (error) {
                    error(errorMsg);
                }
            });
    }

    /**
     * Gets information on the given object, belonging to the given model, within the given project.
     *
     * See [Getting Info on an Object](https://xeokit.github.io/xeokit-bim-viewer/docs/#getting-info-on-an-object) for usage.
     *
     * @param {String} projectId ID of the project to get information on. Must be the ID of one of the projects in the information obtained by {@link BIMViewer#getProjects}.
     * @param {String} modelId ID of a model within the project. Must be the ID of one of the models in the information obtained by {@link BIMViewer#getProjectInfo}.
     * @param {String} objectId ID of an object in the model.
     * @param {Function} done Callback invoked on success, into which the object information JSON is passed.
     * @param {Function} error Callback invoked on failure, into which the error message string is passed.
     */
    getObjectInfo(projectId: string, modelId: string, objectId: string, done: any, error: any) {
        if (!projectId) {
            this.error("getObjectInfo() - Argument expected: projectId");
            return;
        }
        if (!modelId) {
            this.error("getObjectInfo() - Argument expected: modelId");
            return;
        }
        if (!objectId) {
            this.error("getObjectInfo() - Argument expected: objectId");
            return;
        }
        if (!done) {
            this.error("getProjectInfo() - Argument expected: 'done'");
            return;
        }
        this.server.getObjectInfo(projectId, modelId, objectId,
            done,
            (errorMsg: string) => {
                if (error) {
                    error(errorMsg);
                }
            });
    }

    //------------------------------------------------------------------------------------------------------------------
    // Content loading methods
    //------------------------------------------------------------------------------------------------------------------

    /**
     * Loads a project into the viewer.
     *
     * Unloads any currently loaded project and its models first. If the given project is already loaded, will unload that project first.
     *
     * @param {String} projectId ID of the project to load. Must be the ID of one of the projects in the information obtained by {@link BIMViewer#getProjects}.
     * @param {Function} done Callback invoked on success.
     * @param {Function} error Callback invoked on failure, into which the error message string is passed.
     */
    loadProject(projectId: string, done: any, error: any) {
        if (!projectId) {
            this.error("loadProject() - Argument expected: objectId");
            return;
        }
        this.props.server.getProject(projectId, (projectInfo: ViewerInfo) => {
            this.unloadProject();
            this._projectId = projectId;
            this._modelsInfo = {};
            this._numModels = 0;
            this.parseProject(projectInfo, done);
            if (this._numModelsLoaded < this._numModels) {
                this.setState({loadModelsEnabled: true});
                // this._loadModelsButtonElement.classList.remove("disabled");
            }
            if (this._numModelsLoaded > 0) {
                this.setState({unloadModelsEnabled: true});
                // this._unloadModelsButtonElement.classList.remove("disabled");
            }
            if (this._enableAddModels) {
                this.setState({addModelEnabled: true});
                // this._addModelButtonElement.classList.remove("disabled");
            }
        }, (errMsg: string) => {
            this.error(errMsg);
            if (error) {
                error(errMsg);
            }
        });
    }

    /**
     * Unloads whatever project is currently loaded.
     */
    unloadProject() {
        if (!this._projectId) {
            return;
        }
        const models = this.viewer.scene.models;
        for (var modelId in models) {
            if (models.hasOwnProperty(modelId)) {
                const model = models[modelId];
                model.destroy();
            }
        }
        this._numModelsLoaded = 0;

        this.setState({loadModelsEnabled: false, unloadModelsEnabled: false});
        // this._loadModelsButtonElement.classList.add("disabled");
        // this._unloadModelsButtonElement.classList.add("disabled");
        if (this._enableAddModels) {
            this.setState({addModelEnabled: false});
            // this._addModelButtonElement.classList.add("disabled");
        }
        const lastProjectId = this._projectId;
        this._projectId = null;
        // this.projectUnloaded({projectId: lastProjectId});

        this.setState({activeTab: "models"});
        this.setControlsEnabled(false); // For quick UI feedback
    }

    /**
     * Returns the ID of the currently loaded project, if any.
     *
     * @returns {String} The ID of the currently loaded project, otherwise ````null```` if no project is currently loaded.
     */
    getLoadedProjectId(): string {
        return this._projectId;
    }

    /**
     * Returns the IDs of the models in the currently loaded project.
     *
     * @returns {String[]} The IDs of the models in the currently loaded project.
     */
    getModelIds(): string[] {
        return Object.keys(this._modelsInfo);
    }

    /**
     * Loads a model into the viewer.
     *
     * Assumes that the project containing the model is currently loaded.
     *
     * @param {String} modelId ID of the model to load. Must be the ID of one of the models in the currently loaded project.
     * @param {Function} done Callback invoked on success.
     * @param {Function} error Callback invoked on failure, into which the error message string is passed.
     */
    loadModel(modelId: string, done: any = undefined, error: any = undefined) {
        if (!modelId) {
            this.error("loadModel() - Argument expected: modelId");
            return;
        }
        if (!this._projectId) {
          const errMsg = "No project currently loaded";
          this.error(errMsg);
          if (error) {
              error(errMsg);
          }
          return;
      }
      const modelInfo = this._modelsInfo[modelId];
      if (!modelInfo) {
          const errMsg = "Model not in currently loaded project";
          this.error(errMsg);
          if (error) {
              error(errMsg);
          }
          return;
      }
      this._busyModal.show("Loading: " + modelInfo.name);
      this.props.server.getMetadata(this._projectId, modelId,
          (json: string) => {
              this.props.server.getGeometry(this._projectId, modelId,
                  (arraybuffer: string[]) => {
                      const objectColorSource = (modelInfo.objectColorSource || this.getObjectColorSource());
                      const objectDefaults = (objectColorSource === "model") ? ModelIFCObjectColors : ViewerIFCObjectColors;
                      const model = this._xktLoader.load({
                          id: modelId,
                          metaModelData: json,
                          xkt: arraybuffer,
                          objectDefaults: objectDefaults,
                          excludeUnclassifiedObjects: true,
                          position: modelInfo.position,
                          scale: modelInfo.scale,
                          rotation: modelInfo.rotation,
                          matrix: modelInfo.matrix,
                          edges: (modelInfo.edges !== false),
                          saoEnabled: modelInfo.saoEnabled
                      });
                      model.on("loaded", () => {
                          // const checkbox = document.getElementById("" + modelId);
                          // (checkbox as any).checked = true;
                          const scene = this.viewer.scene;
                          const aabb = scene.getAABB(scene.visibleObjectIds);
                          this._numModelsLoaded++;
                          this.setState({unloadModelsEnabled: true, loadModelsEnabled: (this._numModelsLoaded < this._numModels)});
                          // // this._unloadModelsButtonElement.classList.remove("disabled");
                          // if (this._numModelsLoaded < this._numModels) {
                          //     this._loadModelsButtonElement.classList.remove("disabled");
                          // } else {
                          //     this._loadModelsButtonElement.classList.add("disabled");
                          // }
                          if (this._numModelsLoaded === 1) { // Jump camera to view-fit first model loaded
                              this.viewer.cameraFlight.jumpTo({
                                  aabb: aabb
                              });
                              this.viewer.cameraControl.pivotPos = math.getAABB3Center(aabb, tempVec3);
                              this.modelsExplorerLoaded(modelId);
                              this._busyModal.hide();
                              if (done) {
                                  done();
                              }
                          } else {
                              this.modelsExplorerLoaded(modelId);
                              this._busyModal.hide();
                              if (done) {
                                  done();
                              }
                          }
                      });
                  },
                  (errMsg: string) => {
                      this._busyModal.hide();
                      this.error(errMsg);
                      if (error) {
                          error(errMsg);
                      }
                  });
          },
          (errMsg: string) => {
              this._busyModal.hide();
              this.error(errMsg);
              if (error) {
                  error(errMsg);
              }
          });
    }

    /**
     * Load all models in the currently loaded project.
     *
     * Doesn't reload any models that are currently loaded.
     *
     * @param {Function} done Callback invoked on successful loading of the models.
     */
    loadAllModels(done = function () {
    }) {
        const modelIds = this.getModelIds();
        const loadNextModel = (i: number, done2: any) => {
            if (i >= modelIds.length) {
                done2();
            } else {
                const modelId: string = modelIds[i];
                if (!this.isModelLoaded(modelId)) {
                    this.loadModel(modelId, () => {
                        loadNextModel(i + 1, done2);
                    }, (errorMsg: string) => {
                        this.error("loadAllModels() - " + errorMsg);
                        loadNextModel(i + 1, done2);
                    });
                } else {
                    loadNextModel(i + 1, done2);
                }
            }
        };
        loadNextModel(0, done);
    }

    parseProject(projectInfo: ViewerInfo, done: any) {
        // this._buildModelsMenu(projectInfo);
        const modelsInfo = projectInfo.models || [];
        this._modelsInfo = {};
        this._numModels = modelsInfo.length;
        for (let i = 0, len = modelsInfo.length; i < len; i++) {
            const modelInfo = modelsInfo[i];
            this._modelsInfo[modelInfo.id] = modelInfo;
        }

        this.parseViewerConfigs(projectInfo);
        this.parseViewerContent(projectInfo, () => {
            this.parseViewerState(projectInfo, () => {
                done();
            });
        });
    }

    

    parseViewerConfigs(projectInfo: ViewerInfo) {
        const viewerConfigs = projectInfo.viewerConfigs;
        if (viewerConfigs) {
            this.setConfigs(viewerConfigs);
        }
    }

    parseViewerContent(projectInfo: ViewerInfo, done: any) {
        const viewerContent = projectInfo.viewerContent;
        if (!viewerContent) {
            done();
            return;
        }
        this.parseModelsLoaded(viewerContent, () => {
            done();
        });
    }

    parseModelsLoaded(viewerContent: ViewerContent, done: any) {
        const modelsLoaded = viewerContent.modelsLoaded;
        if (!modelsLoaded || (modelsLoaded.length === 0)) {
            done();
            return;
        }
        this.loadNextModel(modelsLoaded.slice(0), done);
    }

    loadNextModel(modelsLoaded: string[], done: any) {
        if (modelsLoaded.length === 0) {
            done();
            return;
        }
        const modelId = modelsLoaded.pop();
        this.loadModel(modelId,
            () => { // Done
                this.loadNextModel(modelsLoaded, done);
            },
            () => { // Error - recover and attempt to load next model
                this.loadNextModel(modelsLoaded, done);
            });
    }

    parseViewerState(projectInfo: ViewerInfo, done: any) {
        const viewerState = projectInfo.viewerState;
        if (!viewerState) {
            done();
            return;
        }
        this.setViewerState(viewerState, done);
    }

    getNumModelsLoaded() {
        return this._numModelsLoaded;
    }

    getModelsInfo() {
        return this._modelsInfo;
    }

    getModelInfo(modelId: string) {
        return this._modelsInfo[modelId];
    }

    /**
     * Returns the IDs of the currently loaded models, if any.
     *
     * @returns {String[]} The IDs of the currently loaded models, otherwise an empty array if no models are currently loaded.
     */
    getLoadedModelIds() {
        return Object.keys(this.viewer.scene.models);
    }

    /**
     * Gets if the given model is loaded.
     *
     * @param {String} modelId ID of the model to check. Must be the ID of one of the models in the currently loaded project.
     * @returns {Boolean} True if the given model is loaded.
     */
    isModelLoaded(modelId: string) {
        if (!modelId) {
            this.error("unloadModel() - Argument expected: modelId");
            return;
        }
        return (!!this.viewer.scene.models[modelId]);
    }

    /**
     * Unloads a model from the viewer.
     *
     * Does nothing if the model is not currently loaded.
     *
     * @param {String} modelId ID of the model to unload.
     */
    unloadModel(modelId: string) {
        if (!modelId) {
            this.error("unloadModel() - Argument expected: modelId");
            return;
        }
        const model = this.viewer.scene.models[modelId];
        if (!model) {
            this.error("Model not loaded: " + modelId);
            return;
        }
        model.destroy();
        // const checkbox = document.getElementById("" + modelId);
        // (checkbox as any).checked = false;
        // const span = document.getElementById("span-" + modelId);
        this._numModelsLoaded--;
        this.setState({
          unloadModelsEnabled: (this._numModelsLoaded > 0),
          loadModelsEnabled: (this._numModelsLoaded < this._numModels)
        })
        // if (this._numModelsLoaded > 0) {
        //     this._unloadModelsButtonElement.classList.remove("disabled");
        // } else {
        //     this._unloadModelsButtonElement.classList.add("disabled");
        // }
        // if (this._numModelsLoaded < this._numModels) {
        //     this._loadModelsButtonElement.classList.remove("disabled");
        // } else {
        //     this._loadModelsButtonElement.classList.add("disabled");
        // }
        this.modelsExplorerUnloaded(modelId);
    }

    /**
     * Unloads all currently loaded models.
     */
    unloadAllModels() {
        const models = this.viewer.scene.models;
        const modelIds = Object.keys(models);
        for (var i = 0, len = modelIds.length; i < len; i++) {
            const modelId = modelIds[i];
            this.unloadModel(modelId);
        }
    }

    /**
     * Edits a model.
     *
     * Assumes that the project containing the model is currently loaded.
     *
     * @param {String} modelId ID of the model to edit. Must be the ID of one of the models in the currently loaded project.
     */
    editModel(modelId: string) {
        this.fire("editModel", {
            modelId: modelId
        });
    }

    /**
     * Deletes a model.
     *
     * Assumes that the project containing the model is currently loaded.
     *
     * @param {String} modelId ID of the model to delete. Must be the ID of one of the models in the currently loaded project.
     */
    deleteModel(modelId: string) {
        this.fire("deleteModel", {
            modelId: modelId
        });
    }

    /**
     * Adds a model.
     *
     */
    addModel() {
        this.fire("addModel", {});
    }

    /**
     * Sets the viewer's background color.
     *
     * @param {Number[]} rgbColor Three-element array of RGB values, each in range ````[0..1]````.
     */
    setBackgroundColor(rgbColor: number[]) {
        this.viewer.scene.canvas.canvas.style.background = "rgba(" + (rgbColor[0] * 255) + "," + (rgbColor[1] * 255) + "," + (rgbColor[2] * 255) + ", 1.0)";
    }

    /**
     * Sets where the colors for model objects will be loaded from.
     *
     * Options are:
     *
     * * "model" - (default) load colors from models, and
     * * "viewer" - load colors from the viewer's inbuilt table of colors for IFC types.
     *
     * This is "model" by default.
     *
     * @param {String} source Where colors will be loaded from - "model" or "viewer".
     */
    setObjectColorSource(source: string) {
        switch (source) {
            case "model":
                break;
            case "viewer":
                break;
            default:
                source = "model";
                this.error("setObjectColorSource() - Unsupported value - accepted values are 'model' and 'viewer' - defaulting to 'model'");
                return;
        }
        this._objectColorSource = source;
    }

    /**
     * Gets where the colors for model objects will be loaded from.
     *
     * This is "model" by default.
     *
     * @return {String} Where colors will be loaded from - "model" to get colors from the model, or "viewer" to get them from the viewer's built-in table of colors for IFC types.
     */
    getObjectColorSource(): string {
        return this._objectColorSource || "model";
    }

    /**
     * Updates viewer UI state according to the properties in the given object.
     *
     * Note that, since some updates could be animated (e.g. flying the camera to fit objects to view) this
     * method optionally takes a callback, which it invokes after updating the UI.
     *
     * Also, this method is not to be confused with {@link BIMViewer#setConfigs}, which is used to batch-update various configurations and user preferences on the viewer.
     *
     * See [Viewer States](https://xeokit.github.io/xeokit-bim-viewer/docs/#viewer_states) for the list of states that may be batch-updated with this method.
     *
     * @param {Object} viewerState Specifies the viewer UI state updates.
     * @param {Function} done Callback invoked on successful update of the viewer states.
     */
    setViewerState(viewerState: ViewerState, done = () => {
    }) {
        if (viewerState.tabOpen && !this.state.activeTab) {
            this.setState({activeTab: viewerState.tabOpen});
        }
        if (viewerState.expandObjectsTree && this.objectsExplorerRef.current) {
            this.objectsExplorerRef.current.expandTreeViewToDepth(viewerState.expandObjectsTree);
        }
        if (viewerState.expandClassesTree && this.classesExplorerRef.current) {
            this.classesExplorerRef.current.expandTreeViewToDepth(viewerState.expandClassesTree);
        }
        if (viewerState.expandStoreysTree && this.storeysExplorerRef.current) {
            this.storeysExplorerRef.current.expandTreeViewToDepth(viewerState.expandStoreysTree);
        }
        if (viewerState.setCamera) {
            this.setCamera(viewerState.setCamera);
        }
        this._parseSelectedStorey(viewerState, () => {
            this._parseThreeDMode(viewerState, () => {
                done();
            });
        });
    }

    _parseSelectedStorey(viewerState: ViewerState, done: any) {
        if (viewerState.selectedStorey) {
            this.selectStorey(viewerState.selectedStorey);
            done();
        } else {
            done();
        }
    }

    _parseThreeDMode(viewerState: ViewerState, done: any) {
        const activateThreeDMode = (viewerState.threeDActive !== false);
        this.set3DEnabled(activateThreeDMode, done);
    }

    /**
     * Highlights the given object in the tree views within the Objects, Classes and Storeys tabs.
     *
     * Also scrolls the object's node into view within each tree, then highlights it.
     *
     * De-highlights whatever node is currently highlighted in each of those trees.
     *
     * @param {String} objectId ID of the object
     */
    showObjectInExplorers(objectId: string) {
        if (!objectId) {
            this.error("showObjectInExplorers() - Argument expected: objectId");
            return;
        }
        if (this.objectsExplorerRef.current) {
          this.objectsExplorerRef.current.showNodeInTreeView(objectId);
        }
        if (this.classesExplorerRef.current) {
          this.classesExplorerRef.current.showNodeInTreeView(objectId);
        }
        if (this.storeysExplorerRef.current) {
          this.storeysExplorerRef.current.showNodeInTreeView(objectId);
        }
    }

    /**
     * De-highlights the object previously highlighted with {@link BIMViewer#showObjectInExplorers}.
     *
     * This only de-highlights the node. If the node is currently scrolled into view, then the node will remain in view.
     *
     * For each tab, does nothing if a node is currently highlighted.
     */
    unShowObjectInExplorers() {
      if (this.objectsExplorerRef.current) {
        this.objectsExplorerRef.current.unShowNodeInTreeView();
      }
      if (this.classesExplorerRef.current) {
        this.classesExplorerRef.current.unShowNodeInTreeView();
      }
      if (this.storeysExplorerRef.current) {
        this.storeysExplorerRef.current.unShowNodeInTreeView();
      }
    }

    /**
     * Sets whether or not the given objects are visible.
     *
     * @param {String[]} objectIds IDs of objects.
     * @param {Boolean} visible True to set objects visible, false to set them invisible.
     */
    setObjectsVisible(objectIds: string[], visible: boolean) {
        this._withObjectsInSubtree(objectIds, (entity: Entity) => {
            entity.visible = visible;
        });
    }

    /**
     * Sets the visibility of all objects.
     *
     * @param {Boolean} visible True to set objects visible, false to set them invisible.
     */
    setAllObjectsVisible(visible: boolean) {
        if (visible) {
            this.viewer.scene.setObjectsVisible(this.viewer.scene.objectIds, true);
        } else {
            this.viewer.scene.setObjectsVisible(this.viewer.scene.visibleObjectIds, false);
        }
    }

    /**
     * Sets whether or not the given objects are X-rayed.
     *
     * @param {String[]} objectIds IDs of objects.
     * @param {Boolean} xrayed Whether or not to X-ray the objects.
     */
    setObjectsXRayed(objectIds: string[], xrayed: boolean) {
        this._withObjectsInSubtree(objectIds, (entity: Entity) => {
            entity.xrayed = xrayed;
        });
    }

    /**
     * Sets whether or not all objects are X-rayed.
     *
     * @param {Boolean} xrayed Whether or not to set all objects X-rayed.
     */
    setAllObjectsXRayed(xrayed: boolean) {
        if (xrayed) {
            this.viewer.scene.setObjectsXRayed(this.viewer.scene.objectIds, true);
        } else {
            this.viewer.scene.setObjectsXRayed(this.viewer.scene.xrayedObjectIds, false);
        }
    }

    /**
     * Sets whether or not the given objects are selected.
     *
     * @param {String[]} objectIds IDs of objects.
     * @param {Boolean} selected Whether or not to set the objects selected.
     */
    setObjectsSelected(objectIds: string[], selected: boolean) {
        this._withObjectsInSubtree(objectIds, (entity: Entity) => {
            entity.selected = selected;
        });
    }

    /**
     * Sets whether or not all objects are selected.
     *
     * @param {Boolean} selected Whether or not to set all objects selected.
     */
    setAllObjectsSelected(selected: boolean) {
        if (selected) {
            this.viewer.scene.setObjectsSelected(this.viewer.scene.objectIds, true);
        } else {
            this.viewer.scene.setObjectsSelected(this.viewer.scene.selectedObjectIds, false);
        }
    }

    _withObjectsInSubtree(objectIds: string[], callback: any) {
        if (!objectIds) {
            this.error("Argument expected: objectIds");
            return;
        }
        for (let i = 0, len = objectIds.length; i < len; i++) {
            const objectId = objectIds[i];
            this.viewer.metaScene.withMetaObjectsInSubtree(objectId, (metaObject: MetaData) => {
                const entity = this.viewer.scene.objects[metaObject.id];
                if (entity) {
                    callback(entity);
                }
            });
        }
    }

    /**
     * Flies the camera to fit the given object in view.
     *
     * @param {String} objectId ID of the object
     * @param {Function} done Callback invoked on completion
     */
    flyToObject(objectId: string, done: any) {
        if (!objectId) {
            this.error("flyToObject() - Argument expected: objectId");
            return;
        }
        const viewer = this.viewer;
        const scene = viewer.scene;
        const objectIds: string[] = [];
        this.viewer.metaScene.withMetaObjectsInSubtree(objectId, (metaObject: MetaData) => {
            if (scene.objects[metaObject.id]) {
                objectIds.push(metaObject.id);
            }
        });
        if (objectIds.length === 0) {
            this.error("Object not found in viewer: '" + objectId + "'");
            if (done) {
                done();
            }
            return;
        }
        scene.setObjectsVisible(objectIds, true);
        scene.setObjectsHighlighted(objectIds, true);
        const aabb = scene.getAABB(objectIds);
        viewer.cameraFlight.flyTo({
            aabb: aabb
        }, () => {
            if (done) {
                done();
            }
            setTimeout(function () {
                scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
            }, 500);
        });
        viewer.cameraControl.pivotPos = math.getAABB3Center(aabb);
    }

    /**
     * Flies the camera to fit the given objects in view.
     *
     * @param {String[]} objectIds IDs of the objects
     * @param {Function} done Callback invoked on completion
     */
    viewFitObjects(objectIds: string[], done: any) {
        if (!objectIds) {
            this.error("flyToObject() - Argument expected: objectIds");
            return;
        }
        const viewer = this.viewer;
        const scene = viewer.scene;

        const entityIds: string[] = [];

        for (var i = 0, len = objectIds.length; i < len; i++) {
            const objectId = objectIds[i];
            this.viewer.metaScene.withMetaObjectsInSubtree(objectId, (metaObject: MetaData) => {
                if (scene.objects[metaObject.id]) {
                    entityIds.push(metaObject.id);
                }
            });
        }
        if (entityIds.length === 0) {
            if (done) {
                done();
            }
            return;
        }
        scene.setObjectsVisible(entityIds, true);
        scene.setObjectsHighlighted(entityIds, true);
        const aabb = scene.getAABB(entityIds);
        viewer.cameraFlight.flyTo({
            aabb: aabb
        }, () => {
            if (done) {
                done();
            }
            setTimeout(function () {
                scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
            }, 500);
        });
        viewer.cameraControl.pivotPos = math.getAABB3Center(aabb);
    }

    /**
     * Flies the camera to fit all objects in view.
     *
     * @param {Function} done Callback invoked on completion
     */
    viewFitAll(done: any = undefined) {
        const viewer = this.viewer;
        const scene = viewer.scene;
        const aabb = scene.getAABB(undefined);
        viewer.cameraFlight.flyTo({
            aabb: aabb
        }, () => {
            if (done) {
                done();
            }
        });
        viewer.cameraControl.pivotPos = math.getAABB3Center(aabb);
    }

    /**
     * Jumps the camera to fit the given object in view.
     *
     * @param {String} objectId ID of the object
     */
    jumpToObject(objectId: string) {
        if (!objectId) {
            this.error("jumpToObject() - Argument expected: objectId");
            return;
        }
        const viewer = this.viewer;
        const scene = viewer.scene;
        const objectIds: string[] = [];
        this.viewer.metaScene.withMetaObjectsInSubtree(objectId, (metaObject: MetaData) => {
            if (scene.objects[metaObject.id]) {
                objectIds.push(metaObject.id);
            }
        });
        if (objectIds.length === 0) {
            this.error("Object not found in viewer: '" + objectId + "'");
            return;
        }
        scene.setObjectsVisible(objectIds, true);
        const aabb = scene.getAABB(objectIds);
        viewer.cameraFlight.jumpTo({
            aabb: aabb
        });
        viewer.cameraControl.pivotPos = math.getAABB3Center(aabb);
    }

    /**
     * Sets the camera to the given position.
     *
     * @param {Number[]} [params.eye] Eye position.
     * @param {Number[]} [params.look] Point of interest.
     * @param {Number[]} [params.up] Direction of "up".
     */
    setCamera(params: any) {
        const viewer = this.viewer;
        const scene = viewer.scene;
        const camera = scene.camera;
        if (params.eye) {
            camera.eye = params.eye;
        }
        if (params.look) {
            camera.look = params.look;
        }
        if (params.up) {
            camera.up = params.up;
        }
    }

    /**
     * Fits the given models in view.
     *
     * @param {String[]} modelIds ID of the models.
     * @param {Function} [done] Callback invoked on completion. Will be animated if this is given, otherwise will be instantaneous.
     */
    viewFitModels(modelIds: string, done: any) {
        if (!modelIds) {
            this.error("viewFitModels() - Argument expected: modelIds");
            return;
        }
        const viewer = this.viewer;
        const scene = viewer.scene;
        const aabb = math.AABB3();
        math.collapseAABB3(aabb);
        for (var i = 0, len = modelIds.length; i < len; i++) {
            const modelId = modelIds[i];
            const model = scene.models[modelId];
            if (!model) {
                this.error("Model not found in viewer: '" + modelId + "'");
                continue;
            }
            model.visible = true;
            model.highlighted = true;
            math.expandAABB3(aabb, model.aabb);
        }
        if (done) {
            viewer.cameraFlight.flyTo({
                aabb: aabb
            }, () => {
                done();
                setTimeout(function () {
                    scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
                }, 500);
            });
        } else {
            viewer.cameraFlight.jumpTo({
                aabb: aabb
            });
            setTimeout(function () {
                scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
            }, 500);
        }
        viewer.cameraControl.pivotPos = math.getAABB3Center(aabb);
    }

    /**
     * Switches the viewer between 2D and 3D viewing modes.
     *
     * @param {Boolean} enabled Set true to switch into 3D mode, else false to switch into 2D mode.
     * @param {Function} done Callback to invoke when switch complete. Supplying this callback causes an animated transition. Otherwise, the transition will be instant.
     */
    set3DEnabled(enabled: boolean, done: any) {
        this._threeDMode.setActive(enabled, done);
    }

    /**
     * Gets whether the viewer is in 3D or 2D viewing mode.
     *
     * @returns {boolean} True when in 3D mode, else false.
     */
    get3DEnabled() {
        return this._threeDMode.getActive();
    }


    /**
     * Sets whether the viewer is in orthographic viewing mode.
     *
     * The viewer is either in orthographic mode or perspective mode. The viewer is in perspective mode by default.
     *
     * @param {Boolean} enabled Set true to switch into ortho mode, else false to switch into perspective mode.
     * @param {Function} done Callback to invoke when switch complete. Supplying this callback causes an animated transition. Otherwise, the transition will be instant.
     */
    // setOrthoEnabled(enabled: boolean, done: any) {
    //     this._orthoMode.setActive(enabled, done);
    // }

    /**
     * Gets whether the viewer is in orthographic viewing mode.
     *
     * The viewer is either in orthographic mode or perspective mode. The viewer is in perspective mode by default.
     *
     * @returns {boolean} True when in ortho mode, else false when in perspective mode.
     */
    // getOrthoEnabled() {
    //     return this._orthoMode.getActive();
    // }

    /**
     * Transitions the viewer into an isolated view of the given building storey.
     *
     * Does nothing and logs an error if no object of the given ID is in the viewer, or if the object is not an ````IfcBuildingStorey````.
     *
     * @param {String} storeyObjectId ID of an ````IfcBuildingStorey```` object.
     * @param {Function} [done] Optional callback to invoke on completion. When provided, the transition will be animated, with the camera flying into position. Otherwise, the transition will be instant, with the camera jumping into position.
     */
    selectStorey(storeyObjectId: string, done?: any) {
        const metaScene = this.viewer.metaScene;
        const storeyMetaObject = metaScene.metaObjects[storeyObjectId];
        if (!storeyMetaObject) {
            this.error("selectStorey() - Object is not found: '" + storeyObjectId + "'");
            return;
        }
        if (storeyMetaObject.type !== "IfcBuildingStorey") {
            this.error("selectStorey() - Object is not an IfcBuildingStorey: '" + storeyObjectId + "'");
            return;
        }
        if (this.storeysExplorerRef.current) {
          this.storeysExplorerRef.current.selectStorey(storeyObjectId, done);
        }
    }

    /**
     * Saves viewer state to a BCF viewpoint.
     *
     * This does not save information about the project and model(s) that are currently loaded. When loading the viewpoint,
     * the viewer will assume that the same project and models will be currently loaded (the BCF viewpoint specification
     * does not contain that information).
     *
     * Note that xeokit's {@link Camera#look} is the **point-of-interest**, whereas the BCF ````camera_direction```` is a
     * direction vector. Therefore, we save ````camera_direction```` as the vector from {@link Camera#eye} to {@link Camera#look}.
     *
     * @param {*} [options] Options for getting the viewpoint.
     * @param {Boolean} [options.spacesVisible=false] Indicates whether ````IfcSpace```` types should be forced visible in the viewpoint.
     * @param {Boolean} [options.openingsVisible=false] Indicates whether ````IfcOpening```` types should be forced visible in the viewpoint.
     * @param {Boolean} [options.spaceBoundariesVisible=false] Indicates whether the boundaries of ````IfcSpace```` types should be visible in the viewpoint.
     * @param {Boolean} [options.defaultInvisible=false] When ````true````, will save the default visibility of all objects
     * as ````false````. This means that when we load the viewpoint again, and there are additional models loaded that
     * were not saved in the viewpoint, those models will be hidden when we load the viewpoint, and that only the
     * objects in the viewpoint will be visible.
     * @returns {*} BCF JSON viewpoint object
     * @example
     *
     * const viewpoint = bimViewer.saveBCFViewpoint({
     *     spacesVisible: false,          // Default
     *     spaceBoundariesVisible: false, // Default
     *     openingsVisible: false         // Default
     * });
     *
     * // viewpoint will resemble the following:
     *
     * {
     *     perspective_camera: {
     *         camera_view_point: {
     *             x: 0.0,
     *             y: 0.0,
     *             z: 0.0
     *         },
     *         camera_direction: {
     *             x: 1.0,
     *             y: 1.0,
     *             z: 2.0
     *         },
     *         camera_up_vector: {
     *             x: 0.0,
     *             y: 0.0,
     *             z: 1.0
     *         },
     *         field_of_view: 90.0
     *     },
     *     lines: [],
     *     clipping_planes: [{
     *         location: {
     *             x: 0.5,
     *             y: 0.5,
     *             z: 0.5
     *         },
     *         direction: {
     *             x: 1.0,
     *             y: 0.0,
     *             z: 0.0
     *         }
     *     }],
     *     bitmaps: [],
     *     snapshot: {
     *         snapshot_type: png,
     *         snapshot_data: "data:image/png;base64,......"
     *     },
     *     components: {
     *         visibility: {
     *             default_visibility: false,
     *             exceptions: [{
     *                 ifc_guid: 4$cshxZO9AJBebsni$z9Yk,
     *                 originating_system: xeokit.io,
     *                 authoring_tool_id: xeokit/v1.0
     *             }]
     *        },
     *         selection: [{
     *            ifc_guid: "4$cshxZO9AJBebsni$z9Yk",
     *         }]
     *     }
     * }
     */
    saveBCFViewpoint(options: any) {
        return this._bcfViewpointsPlugin.getViewpoint(options);
    }

    /**
     * Sets viewer state to the given BCF viewpoint.
     *
     * This assumes that the viewer currently contains the same project and model(s) that were loaded at the time that the
     * viewpoint was originally saved (the BCF viewpoint specification does not contain that information).
     *
     * Note that xeokit's {@link Camera#look} is the **point-of-interest**, whereas the BCF ````camera_direction```` is a
     * direction vector. Therefore, when loading a BCF viewpoint, we set {@link Camera#look} to the absolute position
     * obtained by offsetting the BCF ````camera_view_point````  along ````camera_direction````.
     *
     * When loading a viewpoint, we also have the option to find {@link Camera#look} as the closest point of intersection
     * (on the surface of any visible and pickable {@link Entity}) with a 3D ray fired from ````camera_view_point```` in
     * the direction of ````camera_direction````.
     *
     * @param {*} bcfViewpoint  BCF JSON viewpoint object or "reset" / "RESET" to reset the viewer, which clears SectionPlanes,
     * shows default visible entities and restores camera to initial default position.
     * @param {*} [options] Options for setting the viewpoint.
     * @param {Boolean} [options.rayCast=true] When ````true```` (default), will attempt to set {@link Camera#look} to the closest
     * point of surface intersection with a ray fired from the BCF ````camera_view_point```` in the direction of ````camera_direction````.
     * @param {Boolean} [options.immediate] When ````true```` (default), immediately set camera position.
     * @param {Boolean} [options.duration] Flight duration in seconds.  Overrides {@link CameraFlightAnimation#duration}.
     */
    loadBCFViewpoint(bcfViewpoint: any, options: any) {
        if (!bcfViewpoint) {
            this.error("loadBCFViewpoint() - Argument expected: bcfViewpoint");
            return;
        }
        this._bcfViewpointsPlugin.setViewpoint(bcfViewpoint, options);
    }

    /**
     * Resets the view.
     *
     * This resets object appearances (visibility, selection, highlight and X-ray), sets camera to
     * default position, and removes section planes.
     */
    resetView() {
        this._resetAction.reset();
    }

    /**
     * Enables or disables the various buttons and controls throughout the viewer.
     *
     * This also makes various buttons appear disabled.
     *
     * @param {Boolean} enabled Whether or not to disable the controls.
     */
    setControlsEnabled(enabled: boolean) {

        // Explorer

        // Models tab is always enabled
        if (this.objectsExplorerRef.current) {
          this.objectsExplorerRef.current.setEnabled(enabled);
        }
        if (this.classesExplorerRef.current) {
          this.classesExplorerRef.current.setEnabled(enabled);
        }
        if (this.storeysExplorerRef.current) {
          this.storeysExplorerRef.current.setEnabled(enabled);
        }

        // Toolbar

        this._resetAction.setEnabled(enabled);
        this._fitAction.setEnabled(enabled);
        this._threeDMode.setEnabled(enabled);
        // this._orthoMode.setEnabled(enabled);
        this._firstPersonMode.setEnabled(enabled);
        this._queryTool.setEnabled(enabled);
        this._hideTool.setEnabled(enabled);
        this._selectionTool.setEnabled(enabled);
        this._sectionTool.setEnabled(enabled);
    }

    /**
     * Sets whether or not keyboard camera control is enabled.
     *
     * This is useful when we don't want key events over the canvas to clash with other UI elements outside the canvas.
     *
     * Default value is ````true````.
     *
     * @param {Boolean} enabled Set ````true```` to enable keyboard input.
     */
    setKeyboardEnabled(enabled: boolean) {
        this.viewer.scene.input.keyboardEnabled = enabled;
    }

    /**
     * Gets whether keyboard camera control is enabled.
     *
     * This is useful when we don't want key events over the canvas to clash with other UI elements outside the canvas.
     *
     * Default value is ````true````.
     *
     * @returns {Boolean} Returns ````true```` if keyboard input is enabled.
     */
    getKeyboardEnabled() {
        return this.viewer.scene.input.keyboardEnabled;
    }

    /**
     * Clears sections.
     *
     * Sections are the sliceing planes, that we use to section models in order to see interior structures.
     */
    clearSections() {
        this._sectionTool.clear();
    }


    /**
     * Inverts the direction of sections.
     */
    flipSections() {
        this._sectionTool.flipSections();
    }

    /**
     * Hides the section edition control, if currently shown.
     */
    hideSectionEditControl() {
        this._sectionTool.hideControl();
    }

    /**
     * returns the number of sections that currently exist.
     *
     * sections are the sliceing planes, that we use to slice models in order to see interior structures.
     *
     * @returns {Number} The number of sections.
     */
    getNumSections() {
        return this._sectionTool.getNumSections();
    }

    /**
     * Fires an event on this Controller.
     *
     * @protected
     *
     * @param {String} event The event type name
     * @param {Object} value The event parameters
     * @param {Boolean} [forget=false] When true, does not retain for subsequent subscribers
     */
    fire(event: string, value: {}, forget = false) {
      if (!this._events) {
          this._events = {};
      }
      if (!this._eventSubs) {
          this._eventSubs = {};
      }
      if (forget !== true) {
          this._events[event] = value || true; // Save notification
      }
      const subs = this._eventSubs[event];
      let sub;
      if (subs) { // Notify subscriptions
          for (const subId in subs) {
              if (subs.hasOwnProperty(subId)) {
                  sub = subs[subId];
                  this._eventCallDepth++;
                  if (this._eventCallDepth < 300) {
                      sub.callback.call(sub.scope, value);
                  } else {
                      this.error("fire: potential stack overflow from recursive event '" + event + "' - dropping this event");
                  }
                  this._eventCallDepth--;
              }
          }
      }
  }

  /**
   * Subscribes to an event on this Controller.
   *
   * The callback is be called with this component as scope.
   *
   * @param {String} event The event
   * @param {Function} callback Called fired on the event
   * @param {Object} [scope=this] Scope for the callback
   * @return {String} Handle to the subscription, which may be used to unsubscribe with {@link #off}.
   */
  on(event: string, callback: any, scope = this): string {
      if (!this._events) {
          this._events = {};
      }
      if (!this._subIdMap) {
          this._subIdMap = new Map(); // Subscription subId pool
      }
      if (!this._subIdEvents) {
          this._subIdEvents = {};
      }
      if (!this._eventSubs) {
          this._eventSubs = {};
      }
      let subs = this._eventSubs[event];
      if (!subs) {
          subs = {};
          this._eventSubs[event] = subs;
      }
      const subId = this._subIdMap.addItem(); // Create unique subId
      subs[subId] = {
          callback: callback,
          scope: scope || this
      };
      this._subIdEvents[subId] = event;
      const value = this._events[event];
      if (value !== undefined) { // A publication exists, notify callback immediately
          callback.call(scope || this, value);
      }
      return subId;
  }

  /**
   * Cancels an event subscription that was previously made with {@link Controller#on} or {@link Controller#once}.
   *
   * @param {String} subId Subscription ID
   */
  off(subId: string) {
      if (subId === undefined || subId === null) {
          return;
      }
      if (!this._subIdEvents) {
          return;
      }
      const event = this._subIdEvents[subId];
      if (event) {
          delete this._subIdEvents[subId];
          const subs = this._eventSubs[event];
          if (subs) {
              delete subs[subId];
          }
          this._subIdMap.removeItem(subId); // Release subId
      }
  }

  /**
   * Subscribes to the next occurrence of the given event, then un-subscribes as soon as the event is handled.
   *
   * This is equivalent to calling {@link Controller#on}, and then calling {@link Controller#off} inside the callback function.
   *
   * @param {String} event Data event to listen to
   * @param {Function} callback Called when fresh data is available at the event
   * @param {Object} [scope=this] Scope for the callback
   */
  once(event: string, callback: any, scope = this) {
      const self = this;
      const subId = this.on(event,
          function (value: string) {
              self.off(subId);
              callback.call(scope || this, value);
          },
          scope);
  }

  /**
   * Logs a console debugging message for this Controller.
   *
   * The console message will have this format: *````[LOG] [<component type> <component id>: <message>````*
   *
   * @protected
   *
   * @param {String} message The message to log
   */
  log(message: string) {
      message = "[LOG] " + message;
      window.console.log(message);
  }

  /**
   * Logs a warning for this Controller to the JavaScript console.
   *
   * The console message will have this format: *````[WARN] [<component type> =<component id>: <message>````*
   *
   * @protected
   *
   * @param {String} message The message to log
   */
  warn(message: string) {
      message = "[WARN] " + message;
      window.console.warn(message);
  }

  /**
   * Logs an error for this Controller to the JavaScript console.
   *
   * The console message will have this format: *````[ERROR] [<component type> =<component id>: <message>````*
   *
   * @protected
   *
   * @param {String} message The message to log
   */
  error(message: string) {
      message = "[ERROR] " + message;
      window.console.error(message);
  }

  _mutexActivation(controllers: Controller[]) {
      const numControllers = controllers.length;
      for (let i = 0; i < numControllers; i++) {
          const controller = controllers[i];
          controller.on("active", (function () {
              const _i = i;
              return function (active: boolean) {
                  if (!active) {
                      return;
                  }
                  for (let j = 0; j < numControllers; j++) {
                      if (j === _i) {
                          continue;
                      }
                      controllers[j].setActive(false);
                  }
              };
          })());
      }
  }

  /**
   * Enables or disables this Controller.
   *
   * Fires an "enabled" event on update.
   *
   * @protected
   *
   *
   * @param {boolean} enabled Whether or not to enable.
   */
  setEnabled(enabled: boolean) {
      if (this._enabled === enabled) {
          return;
      }
      this._enabled = enabled;
      this.fire("enabled", this._enabled);
  }

  /**
   * Gets whether or not this Controller is enabled.
   *
   * @protected
   *
   * @returns {boolean}
   */
  getEnabled() {
      return this._enabled;
  }

  /**
   * Activates or deactivates this Controller.
   *
   * Fires an "active" event on update.
   *
   * @protected
   *
   * @param {boolean} active Whether or not to activate.
   */
  setActive(active: boolean) {
      if (this._active === active) {
          return;
      }
      this._active = active;
      this.fire("active", this._active);
  }

  /**
   * Gets whether or not this Controller is active.
   *
   * @protected
   *
   * @returns {boolean}
   */
  getActive() {
      return this._active;
  }

  /**
   * Destroys this Controller.
   *
   * @protected
   *
   */
  destroy() {
      if (this._destroyed) {
          return;
      }
      /**
       * Fired when this Controller is destroyed.
       * @event destroyed
       */
      this.viewer.destroy();
      this._bcfViewpointsPlugin.destroy();
      this._xktLoader.destroy();
      this._canvasContextMenu.destroy();
      this._objectContextMenu.destroy();
      this.fire("destroyed", this._destroyed = true);
      this._subIdMap = null;
      this._subIdEvents = null;
      this._eventSubs = null;
      this._events = null;
      this._eventCallDepth = 0;
      for (let i = 0, len = this._children.length; i < len; i++) {
          (this._children[i] as Controller).destroy();
      }
      this._children = [];
  }

  /**
   * Show object properties in the pane
   */
  showObjectPropertes(objectId: string) {
    const objectProperties: ObjectProperties = {
      id: objectId,
      hierarchy: null,
      modelAuthor: null,
      modelCreatedApp: null,
      modelCreatedAt: null,
      modelId: null,
      modelRevisionId: null,
      name: null,
      projectId: null,
      type: null,
    };
    if (this.viewer.metaScene.metaObjects[objectId]) {
      const object = this.viewer.metaScene.metaObjects[objectId];
      objectProperties.type = object.type;
      objectProperties.name = object.name;
      objectProperties.projectId = object.metaModel.projectId.toString();
      objectProperties.modelRevisionId = object.metaModel.revisionId.toString();
      objectProperties.modelId = object.metaModel.id as string;
      objectProperties.modelAuthor = object.metaModel.author;
      objectProperties.modelCreatedAt = object.metaModel.createdAt;
      objectProperties.modelCreatedApp = object.metaModel.creatingApplication;
      const hierarchy: string[] = [object.name];
      let parent = object.parent;
      while (parent != null) {
        if (parent.name && parent.name != "Default") {
          hierarchy.push(parent.name);
        } else if (parent.type) {
          hierarchy.push(parent.type);
        }
        parent = parent.parent;
      }
      objectProperties.hierarchy = hierarchy.reverse();
    }
    this.setState({showObjectProperties: objectProperties});
  }

  public render() {
    const { classes } = this.props;
    return (
      <>
        {/* { this.state.showObjectProperties != null &&
          <ConfirmationDialog
            title="Object Properties"
            continueText="Okay"
            centered
            content={<>
              <div className={classes.textRow}><div className={classes.textLabel}>ID:</div><div className={classes.textValue}>{this.state.showObjectProperties.id}</div></div>
              <div className={classes.textRow}><div className={classes.textLabel}>Name:</div><div className={classes.textValue}>{this.state.showObjectProperties.name ?? 'None'}</div></div>
              <div className={classes.textRow}><div className={classes.textLabel}>Type:</div><div className={classes.textValue}>{this.state.showObjectProperties.type ?? 'None'}</div></div>
              <div className={classes.textRow}><div className={classes.textLabel}>Hierarchy:</div><div className={classes.textValue}>{this.state.showObjectProperties.hierarchy ? this.state.showObjectProperties.hierarchy.join(' > ') : 'None'}</div></div>
              <div className={classes.textRow}><div className={classes.textLabel}>Project ID:</div><div className={classes.textValue}>{this.state.showObjectProperties.projectId ?? 'None'}</div></div>
              <div className={classes.textRow}><div className={classes.textLabel}>Model ID:</div><div className={classes.textValue}>{this.state.showObjectProperties.modelId ?? 'None'}</div></div>
              <div className={classes.textRow}><div className={classes.textLabel}>Model Revision ID:</div><div className={classes.textValue}>{this.state.showObjectProperties.modelRevisionId ?? 'None'}</div></div>
              <div className={classes.textRow}><div className={classes.textLabel}>Model Author:</div><div className={classes.textValue}>{this.state.showObjectProperties.modelAuthor ?? 'None'}</div></div>
              <div className={classes.textRow}><div className={classes.textLabel}>Model Created:</div><div className={classes.textValue}>{this.state.showObjectProperties.modelCreatedAt ?? 'None'}</div></div>
              <div className={classes.textRow}><div className={classes.textLabel}>Model Creation App:</div><div className={classes.textValue}>{this.state.showObjectProperties.modelCreatedApp ?? 'None'}</div></div>
            </>}
            onClose={() => {
              this.setState({showObjectProperties: null});
            }}
            onContinue={() => {
              this.setState({showObjectProperties: null});
            }}
          />
        } */}
        <div id="myViewer" className="xeokit-busy-modal-backdrop" ref={this.busyModelBackdropElementRef}>
          <SplitPane
            className={classes.explorerSidePane}
            style={
              {
                position: 'relative' as 'relative',
              } as React.CSSProperties
            }
            split="vertical"
            primary="first"
            minSize={400}
            defaultSize={localStorage.getItem('paneWidth') ? parseInt(localStorage.getItem('paneWidth'), 10) : '20%'}
            onChange={(size) => localStorage.setItem('paneWidth', size.toString())}
          >
            <div id="myExplorer" className={classes.myExplorer} ref={this.explorerElementRef}>
              <SplitPane
                className={classes.explorerSubPane}
                style={
                  {
                    position: 'relative' as 'relative',
                  } as React.CSSProperties
                }
                split="horizontal"
                primary="second"
                defaultSize={localStorage.getItem('objectPropertyHeight') ? parseInt(localStorage.getItem('objectPropertyHeight'), 10) : '200px'}
                onChange={(size) => localStorage.setItem('objectPropertyHeight', size.toString())}
              >
                <div className="xeokit-tabs">
                  { this.viewer != null &&
                    <>
                      <ModelsExplorerComponent
                        modelsInfo={this._modelsInfo}
                        activeTab={this.state.activeTab === "models"}
                        bimViewer={this}
                        viewer={this.viewer}
                        server={this.server}
                        numModelsLoaded={this._numModelsLoaded}
                        enableEditModels={this._enableAddModels}
                        ref={this.modelsExplorerRef}
                        loadModel={this.loadModel}
                        unloadModel={this.unloadModel}
                        error={this.error}
                        destroy={() => {this.destroy()}}
                        loadAll={this.handleLoadAllModels}
                        unloadAll={this.handleUnloadAllModels}
                        addModel={this.handleAddModel}
                        setActiveTab={() => this.handleSetTab("models")}
                      />
                      <ObjectsExplorerComponent
                        activeTab={this.state.activeTab === "objects"}
                        bimViewer={this}
                        viewer={this.viewer}
                        ref={this.objectsExplorerRef}
                        error={this.error}
                        destroy={() => {this.destroy()}}
                        showAll={this.handleShowAllObjects}
                        hideAll={this.handleHideAllObjects}
                        setActiveTab={() => this.handleSetTab("objects")}
                      />
                      <ClassesExplorerComponent
                        activeTab={this.state.activeTab === "classes"}
                        bimViewer={this}
                        viewer={this.viewer}
                        ref={this.classesExplorerRef}
                        error={this.error}
                        destroy={() => {this.destroy()}}
                        showAll={this.handleShowAllObjects}
                        hideAll={this.handleHideAllObjects}
                        setActiveTab={() => this.handleSetTab("classes")}
                      />
                      <StoreysExplorerComponent
                        activeTab={this.state.activeTab === "storeys"}
                        bimViewer={this}
                        viewer={this.viewer}
                        ref={this.storeysExplorerRef}
                        error={this.error}
                        destroy={() => {this.destroy()}}
                        showAll={this.handleShowAllObjects}
                        hideAll={this.handleHideAllObjects}
                        setActiveTab={() => this.handleSetTab("storeys")}
                      />
                    </>
                  }
                </div>
                <div>
                  <div className={classes.textTitle}><b>Object Properties:</b></div>
                  { this.state.showObjectProperties &&
                    <>
                      <div className={classes.textRow}><div className={classes.textLabel}>ID:</div><div className={classes.textValue}>{this.state.showObjectProperties.id}</div></div>
                      <div className={classes.textRow}><div className={classes.textLabel}>Name:</div><div className={classes.textValue}>{this.state.showObjectProperties.name ?? 'None'}</div></div>
                      <div className={classes.textRow}><div className={classes.textLabel}>Type:</div><div className={classes.textValue}>{this.state.showObjectProperties.type ?? 'None'}</div></div>
                      <div className={classes.textRow}><div className={classes.textLabel}>Hierarchy:</div><div className={classes.textValue}>{this.state.showObjectProperties.hierarchy ? this.state.showObjectProperties.hierarchy.join(' > ') : 'None'}</div></div>
                      <div className={classes.textRow}><div className={classes.textLabel}>Project ID:</div><div className={classes.textValue}>{this.state.showObjectProperties.projectId ?? 'None'}</div></div>
                      <div className={classes.textRow}><div className={classes.textLabel}>Model ID:</div><div className={classes.textValue}>{this.state.showObjectProperties.modelId ?? 'None'}</div></div>
                      <div className={classes.textRow}><div className={classes.textLabel}>Model Revision ID:</div><div className={classes.textValue}>{this.state.showObjectProperties.modelRevisionId ?? 'None'}</div></div>
                      <div className={classes.textRow}><div className={classes.textLabel}>Model Author:</div><div className={classes.textValue}>{this.state.showObjectProperties.modelAuthor ?? 'None'}</div></div>
                      <div className={classes.textRow}><div className={classes.textLabel}>Model Created:</div><div className={classes.textValue}>{this.state.showObjectProperties.modelCreatedAt ?? 'None'}</div></div>
                      <div className={classes.textRow}><div className={classes.textLabel}>Model Creation App:</div><div className={classes.textValue}>{this.state.showObjectProperties.modelCreatedApp ?? 'None'}</div></div>
                    </>
                  }
                </div>
              </SplitPane>
            </div>
            <div id="myContent" className={classes.myContent}>
              <div id="myToolbar" ref={this.toolbarElementRef}>
                <div className="xeokit-toolbar">
                  {/* Reset button */}
                  <div className="xeokit-btn-group">
                    <button type="button" className="xeokit-reset xeokit-btn fa fa-home fa-2x disabled" data-tippy-content="Reset view"></button>
                  </div>
                  <div className="xeokit-btn-group" role="group">
                    {/* 3D Mode button */}
                    <button type="button" className="xeokit-threeD xeokit-btn fa fa-cube fa-2x" data-tippy-content="Toggle 2D/3D"></button>
                    {/* Perspective/Ortho Mode button */}
                    {/* <button type="button" className="xeokit-ortho xeokit-btn fa fa-th fa-2x" data-tippy-content="Toggle Perspective/Ortho"></button> */}
                    {/* Fit button */}
                    <button type="button" className="xeokit-fit xeokit-btn fa fa-crop fa-2x disabled" data-tippy-content="View fit"></button>   
                    {/* First Person mode button */}
                    <button type="button" className="xeokit-firstPerson xeokit-btn fa fa-male fa-2x disabled" data-tippy-content="First person"></button>
                  </div>
                  {/* Tools button group */}
                  <div className="xeokit-btn-group" role="group">
                    {/* Hide tool button */}
                    <button type="button" className="xeokit-hide xeokit-btn fa fa-eraser fa-2x disabled" data-tippy-content="Hide objects"></button>
                    {/* Select tool button */}
                    <button type="button" className="xeokit-select xeokit-btn fa fa-mouse-pointer fa-2x disabled" data-tippy-content="Select objects"></button>
                    {/* Query tool button */}
                    <button type="button" className="xeokit-query xeokit-btn fa fa-info-circle fa-2x disabled" data-tippy-content="Query objects"></button>
                    {/* section tool button */}
                    <button type="button" className="xeokit-section xeokit-btn fa fa-cut fa-2x disabled" data-tippy-content="Slice objects">
                      <div className="xeokit-section-menu-button">
                        <span className="xeokit-arrow-down xeokit-section-menu-button-arrow"></span>
                      </div>
                      <div className="xeokit-section-counter" data-tippy-content="Number of existing slices"></div>
                    </button>
                  </div>
                </div>
              </div>
              <canvas id="myCanvas" ref={this.canvasElementRef}></canvas>
            </div>
          </SplitPane>
        </div>
        <canvas id="myNavCubeCanvas" ref={this.navCubeCanvasElementRef}></canvas>
      </>
    );
  };
}

const styles = () => ({
  root: {
  },
  content: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    padding: '1vw',
    backgroundColor: '#fff',
  },
  contentPage: {
    height: '100%',
    minWidth: '100%',
    display: 'flex',
    flexDirection: 'column' as 'column',
  },
  explorerSidePane: {
    height: '100%',
    '& > .Pane': {
      display: 'flex',
      overflow: 'auto',
      minWidth: '400px'
    },
    '& .Resizer': {
      background: '#6d6d6d',
      opacity: 0.2,
      zIndex: 1,
      MozBoxSizing: 'border-box' as 'border-box',
      WebkitBoxSizing: 'border-box' as 'border-box',
      boxSizing: 'border-box' as 'border-box',
      MozBackgroundClip: 'padding',
      WebkitBackgroundClip: 'padding',
      backgroundClip: 'padding-box'
    },
    '& .Resizer:hover': {
      WebkitTransition: 'all 2s ease',
      transition: 'all 2s ease'
    },
    '& .Resizer.vertical': {
      width: '11px',
      margin: '0 -5px',
      borderLeft: '4px solid rgba(255, 255, 255, 0)',
      borderRight: '4px solid rgba(255, 255, 255, 0)',
      cursor: 'col-resize'
    },
    '& .Resizer.vertical:hover': {
      borderLeft: '4px solid rgba(0, 0, 0, 0.5)',
      borderRight: '4px solid rgba(0, 0, 0, 0.5)'
    },
    '& .Resizer.horizontal': {
      height: '11px',
      margin: '-5px 0px',
      borderTop: '4px solid rgba(255, 255, 255, 0)',
      borderBottom: '4px solid rgba(255, 255, 255, 0)',
      cursor: 'row-resize',
      width: '100%'
    },
    '& .Resizer.horizontal:hover': {
      borderTop: '4px solid rgba(0, 0, 0, 0.5)',
      borderBottom: '4px solid rgba(0, 0, 0, 0.5)'
    }
  },
  splitPaneStyle: {
    position: 'relative' as 'relative',
  },
  pane: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as 'column'
  },
  leftPane: {
    flex: 1,
    paddingRight: '1vw',
    display: 'flex',
    flexDirection: 'column' as 'column'
  },
  rightPane: {
    flex: 1,
    paddingLeft: '1vw',
    display: 'flex',
    flexDirection: 'column' as 'column'
  },
  explorerSubPane: {
    height: '100%',
    '& > .Pane': {
      display: 'flex',
      overflow: 'auto'
    },
    '& .Resizer': {
      background: '#6d6d6d',
      opacity: 0.2,
      zIndex: 1,
      MozBoxSizing: 'border-box' as 'border-box',
      WebkitBoxSizing: 'border-box' as 'border-box',
      boxSizing: 'border-box' as 'border-box',
      MozBackgroundClip: 'padding',
      WebkitBackgroundClip: 'padding',
      backgroundClip: 'padding-box'
    },
    '& .Resizer:hover': {
      WebkitTransition: 'all 2s ease',
      transition: 'all 2s ease'
    },
    '& .Resizer.vertical': {
      width: '11px',
      margin: '0 -5px',
      borderLeft: '4px solid rgba(255, 255, 255, 0)',
      borderRight: '4px solid rgba(255, 255, 255, 0)',
      cursor: 'col-resize'
    },
    '& .Resizer.vertical:hover': {
      borderLeft: '4px solid rgba(0, 0, 0, 0.5)',
      borderRight: '4px solid rgba(0, 0, 0, 0.5)'
    },
    '& .Resizer.horizontal': {
      height: '11px',
      margin: '-5px 0px',
      borderTop: '4px solid rgba(255, 255, 255, 0)',
      borderBottom: '4px solid rgba(255, 255, 255, 0)',
      cursor: 'row-resize',
      width: '100%'
    },
    '& .Resizer.horizontal:hover': {
      borderTop: '4px solid rgba(0, 0, 0, 0.5)',
      borderBottom: '4px solid rgba(0, 0, 0, 0.5)'
    }
  },
  myExplorer: {
    width: '100%',
    height: '100%',
    background: '#03103F',
    color: '#fff',
    transition: 'all 0.3s',
    padding: '0',
    paddingLeft: '15px',
    overflowY: 'hidden' as 'hidden',
    '&.active': {
      marginLeft: '0',
    },
    '& .explorer-toolbar': {
      padding: '0',
      background: '#03103F',
    },
    '& ul.components': {
      padding: '20px 0',
      borderBottom: '1px solid #47748b',
    },
    '& ul p': {
      color: '#CFCFCF',
      padding: '10px',
    },
    '& ul li a': {
      padding: '0',
      fontSize: '14px',
      display: 'block',
    },
    '& ul li a:hover': {
      color: '#477dca',
    },
    '& ul li.active > a': {
      color: '#fff',
      background: '#03103F',
    },
    '& a[aria-expanded="true"]': {
      color: '#fff',
      background: '#03103F',
    },
    '& input[type="checkbox"]': {
      backgroundColor: 'initial',
      cursor: 'default',
      WebkitAppearance: 'checkbox',
      boxSizing: 'border-box',
      margin: '3px 4px 3px 8px',
      padding: 'initial',
      border: 'initial',
    },
  },
  myContent: {
    width: '100%',
    height: '100%',
    background: '#f2f2f2',
  },
  textTitle: {
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  textRow: {
    paddingBottom: '5px',
  },
  textLabel: {
    width: '40%',
    fontWeight: 'bold' as 'bold',
    display: 'inline-block',
    verticalAlign: 'top',
  },
  textValue: {
    display: 'inline-block',
    width: '60%',
    wordBreak: 'break-word' as 'break-word',
  },
});

export default withStyles(styles)(BIMViewer);
