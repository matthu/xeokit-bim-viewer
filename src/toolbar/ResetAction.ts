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

        camera.eye = [0.577, 0.577, 0.577];
        camera.look = [0,0,0];
        camera.up = [-1, 1, -1];

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
        const center = math.getAABB3Center(aabb, tempVec3a);
        const dist = Math.abs(diag / Math.tan(65.0 / 2));     // TODO: fovy match with CameraFlight
        const camera = scene.camera;
        const dir = (camera.yUp) ? [-1, -1, -1] : [1, 1, 1];
    //    const up = math.mulVec3Scalar((camera.yUp) ? [-1, 1, -1] : [-1, 1, 1], -1, []);
        const up = (camera.yUp) ? [-1, 1, -1] : [-1, 1, 1];
        viewer.cameraControl.pivotPos = center;
        viewer.cameraControl.planView = false;
        viewer.cameraFlight.flyTo({
            look: center,
            eye: [center[0] - (dist * dir[0]), center[1] - (dist * dir[1]), center[2] - (dist * dir[2])],
            up: up,
            orthoScale: diag * 1.3,
            projection: "perspective",
            duration: 1
        });
    }
}

export { ResetAction };

