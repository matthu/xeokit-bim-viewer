import { BIMConfig } from "../BIMViewer";
import { Controller } from "../Controller";
import { math } from "../xeokit-sdk/viewer/scene/math/math";
import { ModelMemento } from "../xeokit-sdk/viewer/scene/mementos/ModelMemento";

const tempVec3a = math.vec3();

/** @private */
class ResetAction extends Controller {

    _modelMementos: {[id: string]: ModelMemento};

    constructor(parent: Controller, cfg: BIMConfig = {}) {

        super(parent, cfg);

        if (!cfg.buttonElement) {
            throw "Missing config: buttonElement";
        }

        const buttonElement = cfg.buttonElement;
        const camera = this.viewer.camera;

        this._modelMementos = {};

        // Initial camera position - looking down negative diagonal

        const scene = this.viewer.scene;
        const aabb = scene.getAABB(scene.visibleObjectIds);
        const diag = math.getAABB3Diag(aabb);
        const look2 = math.getAABB3Center(aabb);

        const up2 = math.mulVec3Scalar(camera.worldForward, -1, []);
        const eye2 = tempVec3a;
        const fitFOV = 45; // fitFOV;
        const sca = Math.abs(diag / Math.tan(fitFOV * math.DEGTORAD));

        eye2[0] = look2[0] + (camera.worldUp[0] * sca);
        eye2[1] = look2[1] + (camera.worldUp[1] * sca);
        eye2[2] = look2[2] + (camera.worldUp[2] * sca);

        camera.eye = eye2;
        camera.look = look2;
        camera.up = up2;
        // camera.eye = [0.577, 0.577, 0.577];
        // camera.look = [0,0,0];
        // camera.up = [-1, 1, -1];

        this.bimViewer.on("modelLoaded", (modelId: string) => {
            this._saveModelMemento(modelId);
        });

        this.bimViewer.on("modelUnloaded", (modelId: string) => {
            this._destroyModelMemento(modelId);
        });

        this.on("enabled", (enabled: boolean) => {
            if (!enabled) {
                buttonElement.classList.add("disabled");
            } else {
                buttonElement.classList.remove("disabled");
            }
        });

        this.on("active", (active: boolean) => {
            if (active) {
                buttonElement.classList.add("active");
            } else {
                buttonElement.classList.remove("active");
            }
        });

        buttonElement.addEventListener("click", (event: Event) => {
            if (this.getEnabled()) {
                this.reset();
            }
            event.preventDefault();
        });
    }

    _saveModelMemento(modelId: string) {
        const metaModel = this.viewer.metaScene.metaModels[modelId];
        if (!metaModel) {
            return;
        }
        const modelMemento = new ModelMemento();
        modelMemento.saveObjects(this.viewer.scene, metaModel, {
            visible: true,
            edges: true,
            xrayed: true,
            highlighted: true,
            selected: true,
            clippable: true,
            pickable: true,
            colorize: true,
            opacity: false // FIXME: Restoring opacity broken by colorize fix - details at https://github.com/xeokit/xeokit-sdk/issues/239
        });
        this._modelMementos[modelId] = modelMemento;
    }

    _restoreModelMemento(modelId: string) {
        const metaModel = this.viewer.metaScene.metaModels[modelId];
        if (!metaModel) {
            return;
        }
        const modelMemento = this._modelMementos[modelId];
        modelMemento.restoreObjects(this.viewer.scene, metaModel);
    }

    _destroyModelMemento(modelId: string) {
        delete this._modelMementos[modelId];
    }

    reset() {
        const scene = this.viewer.scene;
        const modelIds = scene.modelIds;
        for (var i = 0, len = modelIds.length; i < len; i++) {
            const modelId = modelIds[i];
            this._restoreModelMemento(modelId);
        }
        this.bimViewer.unShowObjectInExplorers();
        this.fire("reset", true);
        this._resetCamera();
    }

    _resetCamera() {
        const viewer = this.viewer;
        const scene = viewer.scene;
        const aabb = scene.getAABB(scene.visibleObjectIds);
        const diag = math.getAABB3Diag(aabb);
        const look2 = math.getAABB3Center(aabb);
        const camera = scene.camera;
        const up2 = math.mulVec3Scalar(camera.worldForward, -1, []);
        const eye2 = tempVec3a;
        const fitFOV = 45; // fitFOV;
        const sca = Math.abs(diag / Math.tan(fitFOV * math.DEGTORAD));

        eye2[0] = look2[0] + (camera.worldUp[0] * sca);
        eye2[1] = look2[1] + (camera.worldUp[1] * sca);
        eye2[2] = look2[2] + (camera.worldUp[2] * sca);
        // viewer.cameraControl.pivotPos = center;
        // viewer.cameraControl.planView = false;
        viewer.cameraFlight.flyTo({
            orthoScale: diag * 1.3,
            eye: eye2,
            look: look2,
            up: up2,
            projection: "ortho", // Auto set orthogonal perspective
            duration: 1
        });
    }
}

export { ResetAction };

