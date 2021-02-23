import * as React from 'react';
import * as ReactDOM from 'react-dom';
import BIMViewerComponent, {BIMViewer} from "./BIMViewer";
import { Server } from "./server/Server";
import { styleTheme } from './styles/Theme';
import { MuiThemeProvider } from '@material-ui/core/styles';


interface RequestParameters {
  projectId: string;
  modelId: string;
  tab: string;
  enableEditModels: string;
  configs: string;
}

interface HashParameters {
  actions: string;
  objectId: string;
  tabId: string;
  objectIds: string;
}


// Server client will load data from the file systems
const server = new Server({
    dataDir: "./public/data"
});

// Create  BIMViewer that loads data via the Server
// const bimViewer = new BIMViewer(server, {
//     canvasElement: document.getElementById("myCanvas"), // WebGL canvas
//     explorerElement: document.getElementById("myExplorer"), // Left panel
//     toolbarElement: document.getElementById("myToolbar"), // Toolbar
//     navCubeCanvasElement: document.getElementById("myNavCubeCanvas"),
//     busyModelBackdropElement: document.querySelector(".xeokit-busy-modal-backdrop"),
//     enableEditModels: enableEditModels
// });

// // Log info on whatever objects we click with the BIMViewer's Query tool
// bimViewer.on("queryPicked", (event: any) => {
//     console.log("queryPicked: " + JSON.stringify(event, null, "\t"));
// });

// bimViewer.on("addModel", (event: any) => { // "Add" selected in Models tab's context menu
//     console.log("addModel: " + JSON.stringify(event, null, "\t"));
// });

// bimViewer.on("editModel", (event: any) => { // "Edit" selected in Models tab's context menu
//     console.log("editModel: " + JSON.stringify(event, null, "\t"));
// });

// bimViewer.on("deleteModel", (event: any) => { // "Delete" selected in Models tab's context menu
//     console.log("deleteModel: " + JSON.stringify(event, null, "\t"));
// });

class App extends React.Component {
  bimViewer: React.RefObject<BIMViewer>;
  requestParams: RequestParameters;
  enableEditModels: boolean;
  projectId: string;
  defaultTab: "models" | "objects" | "classes" | "storeys";

  constructor(props: any) {
    super(props);
    this.bimViewer = React.createRef();

    // Set up application
    this.requestParams = this.getRequestParams() as RequestParameters;

    // Project to load into the viewer
    this.projectId = this.requestParams.projectId;
    if (!this.projectId) {
        console.error("No project ID provided");
        // return;
    }

    const tab = this.requestParams.tab;
    if (tab) {
        this.defaultTab = tab as "models" | "objects" | "classes" | "storeys";
    }

    this.enableEditModels = (this.requestParams.enableEditModels === "true");
  }

  public componentDidMount() {
    if (!this.bimViewer.current) {
      console.log("No BIM Viewer");
      return;
    }

    (window as any).bimViewer = this.bimViewer.current; // For debugging

    // Configure our viewer
    this.bimViewer.current.setConfigs({});

    //--------------------------------------------------------------------------------------------------------------
    // Process page request params, which set up initial viewer state
    //--------------------------------------------------------------------------------------------------------------

    // Viewer configurations
    const viewerConfigs = this.requestParams.configs;
    if (viewerConfigs) {
        const configNameVals = viewerConfigs.split(",");
        for (let i = 0, len = configNameVals.length; i < len; i++) {
            const configNameValStr = configNameVals[i];
            const configNameVal = configNameValStr.split(":");
            const configName = configNameVal[0];
            const configVal = configNameVal[1];
            this.bimViewer.current.setConfig(configName, configVal);
        }
    }

    // Load a project
    this.bimViewer.current.loadProject(this.projectId, () => {

      // The project may load one or models initially.

      // Withe request params, we can also specify:
      //  - models to load
      // - explorer tab to open

      const modelId = this.requestParams.modelId;
      if (modelId) {
          this.bimViewer.current.loadModel(modelId);
      }

      window.setInterval((function () {
          var lastHash = "";
          return function () {
              const currentHash = window.location.hash;
              if (currentHash !== lastHash) {
                  this.parseHashParams();
                  lastHash = currentHash;
              }
          };
      })(), 200);
    },
    (errorMsg: any) => {
      console.error(errorMsg);
    });
  }

  getRequestParams(): RequestParameters {
    var vars: {[id: string]: string} = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m: any, key: any, value: any) => {
        vars[key] = value;
        return value;
    });
    return vars as any;
  }

  parseHashParams() {
      const params = this.getHashParams() as HashParameters;
      const actionsStr = params.actions;
      if (!actionsStr) {
          return;
      }
      const actions = actionsStr.split(",");
      if (actions.length === 0) {
          return;
      }
      for (var i = 0, len = actions.length; i < len; i++) {
          const action = actions[i];
          switch (action) {
              case "focusObject":
                  const objectId = params.objectId;
                  if (!objectId) {
                      console.error("Param expected for `focusObject` action: 'objectId'");
                      break;
                  }
                  this.bimViewer.current.setAllObjectsSelected(false);
                  this.bimViewer.current.setObjectsSelected([objectId], true);
                  this.bimViewer.current.flyToObject(objectId, () => {
                      // FIXME: Showing objects in tabs involves scrolling the HTML within the tabs - disable until we know how to scroll the correct DOM element. Otherwise, that function works OK

                      // bimViewer.showObjectInObjectsTab(objectId);
                      // bimViewer.showObjectInClassesTab(objectId);
                      // bimViewer.showObjectInStoreysTab(objectId);
                  });
                  break;
              case "focusObjects":
                  const objectIds = params.objectIds;
                  if (!objectIds) {
                      console.error("Param expected for `focusObjects` action: 'objectIds'");
                      break;
                  }
                  const objectIdArray = objectIds.split(",");
                  this.bimViewer.current.setAllObjectsSelected(false);
                  this.bimViewer.current.setObjectsSelected(objectIdArray, true);
                  this.bimViewer.current.viewFitObjects(objectIdArray, () => {
                  });
                  break;
              case "clearFocusObjects":
                  this.bimViewer.current.setAllObjectsSelected(false);
                  this.bimViewer.current.viewFitAll();
                  // TODO: view fit nothing?
                  break;
              case "openTab":
                  const tabId = params.tabId;
                  if (!tabId) {
                      console.error("Param expected for `openTab` action: 'tabId'");
                      break;
                  }
                  this.defaultTab = tabId as "models" | "objects" | "classes" | "storeys";
                  break;
              default:
                  console.error("Action not supported: '" + action + "'");
                  break;
          }
      }
  }

  getHashParams(): HashParameters {
      const hashParams: {[id: string]: string} = {};
      let e;
      const a = /\+/g;  // Regex for replacing addition symbol with a space
      const r = /([^&;=]+)=?([^&;]*)/g;
      const d = function (s: string) {
          return decodeURIComponent(s.replace(a, " "));
      };
      const q = window.location.hash.substring(1);
      while (e = r.exec(q)) {
          hashParams[d(e[1])] = d(e[2]);
      }
      return hashParams as any;
  }

  public render() {
    return (
      <MuiThemeProvider theme={styleTheme}>
        <BIMViewerComponent
          defaultTab={this.defaultTab}
          server={server}
          enableEditModels={this.enableEditModels}
          ref={this.bimViewer}
        />
      </MuiThemeProvider>
    );
  };
}

ReactDOM.render(
<App/>,
document.getElementById('app-root')
);