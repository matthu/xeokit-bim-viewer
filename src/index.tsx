import * as React from 'react';
import * as ReactDOM from 'react-dom';
import tippy from "tippy.js";
import "../public/css/backdrop.css";
import "../public/css/BIMViewer.css";
import "../public/css/style.css";
import { BIMViewer } from "./BIMViewer";
import { Server } from "./server/Server";


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

// Set up application
const requestParams = getRequestParams() as RequestParameters;

// Project to load into the viewer
const projectId = requestParams.projectId;
if (!projectId) {
    // return;
}

const enableEditModels = (requestParams.enableEditModels === "true");

// Server client will load data from the file systems
const server = new Server({
    dataDir: "./dist/data"
});

// Create  BIMViewer that loads data via the Server
const bimViewer = new BIMViewer(server, {
    canvasElement: document.getElementById("myCanvas"), // WebGL canvas
    explorerElement: document.getElementById("myExplorer"), // Left panel
    toolbarElement: document.getElementById("myToolbar"), // Toolbar
    navCubeCanvasElement: document.getElementById("myNavCubeCanvas"),
    busyModelBackdropElement: document.querySelector(".xeokit-busy-modal-backdrop"),
    enableEditModels: enableEditModels

});

// Create tooltips on various HTML elements created by BIMViewer
tippy('[data-tippy-content]', {
    appendTo: function () {
        return document.querySelector('#myViewer')
    }
});

// Configure our viewer
bimViewer.setConfigs({});

// Log info on whatever objects we click with the BIMViewer's Query tool
bimViewer.on("queryPicked", (event: any) => {
    console.log("queryPicked: " + JSON.stringify(event, null, "\t"));
});

bimViewer.on("addModel", (event: any) => { // "Add" selected in Models tab's context menu
    console.log("addModel: " + JSON.stringify(event, null, "\t"));
});

bimViewer.on("editModel", (event: any) => { // "Edit" selected in Models tab's context menu
    console.log("editModel: " + JSON.stringify(event, null, "\t"));
});

bimViewer.on("deleteModel", (event: any) => { // "Delete" selected in Models tab's context menu
    console.log("deleteModel: " + JSON.stringify(event, null, "\t"));
});

//--------------------------------------------------------------------------------------------------------------
// Process page request params, which set up initial viewer state
//--------------------------------------------------------------------------------------------------------------

// Viewer configurations
const viewerConfigs = requestParams.configs;
if (viewerConfigs) {
    const configNameVals = viewerConfigs.split(",");
    for (let i = 0, len = configNameVals.length; i < len; i++) {
        const configNameValStr = configNameVals[i];
        const configNameVal = configNameValStr.split(":");
        const configName = configNameVal[0];
        const configVal = configNameVal[1];
        bimViewer.setConfig(configName, configVal);
    }
}

// Load a project
bimViewer.loadProject(projectId, () => {

        // The project may load one or models initially.

        // Withe request params, we can also specify:
        //  - models to load
        // - explorer tab to open


        const modelId = requestParams.modelId;
        if (modelId) {
            bimViewer.loadModel(modelId);
        }

        const tab = requestParams.tab;
        if (tab) {
            bimViewer.openTab(tab);
        }

        //
        window.setInterval((function () {
            var lastHash = "";
            return function () {
                const currentHash = window.location.hash;
                if (currentHash !== lastHash) {
                    parseHashParams();
                    lastHash = currentHash;
                }
            };
        })(), 200);
    },
    (errorMsg: any) => {
        console.error(errorMsg);
    });

function getRequestParams(): RequestParameters {
    var vars: {[id: string]: string} = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m: any, key: any, value: any) => {
        vars[key] = value;
        return value;
    });
    return vars as any;
}

function parseHashParams() {
    const params = getHashParams() as HashParameters;
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
                bimViewer.setAllObjectsSelected(false);
                bimViewer.setObjectsSelected([objectId], true);
                bimViewer.flyToObject(objectId, () => {
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
                bimViewer.setAllObjectsSelected(false);
                bimViewer.setObjectsSelected(objectIdArray, true);
                bimViewer.viewFitObjects(objectIdArray, () => {
                });
                break;
            case "clearFocusObjects":
                bimViewer.setAllObjectsSelected(false);
                bimViewer.viewFitAll();
                // TODO: view fit nothing?
                break;
            case "openTab":
                const tabId = params.tabId;
                if (!tabId) {
                    console.error("Param expected for `openTab` action: 'tabId'");
                    break;
                }
                bimViewer.openTab(tabId);
                break;
            default:
                console.error("Action not supported: '" + action + "'");
                break;
        }
    }
}

function getHashParams(): HashParameters {
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

(window as any).bimViewer = bimViewer; // For debugging

ReactDOM.render(
<div>
</div>,
document.getElementById('app-root')
);