import { CameraFlightAnimation } from "@xeokit/xeokit-sdk/src/viewer/scene/camera/CameraFlightAnimation.js";
import { math } from "@xeokit/xeokit-sdk/src/viewer/scene/math/math.js";
import { Scene } from "@xeokit/xeokit-sdk/src/viewer/scene/scene/Scene.js";
import { Viewer } from "@xeokit/xeokit-sdk/src/viewer/Viewer.js";
import { BIMConfig } from '../BIMViewer';
import { Controller } from "../Controller";

const tempVec3 = math.vec3();

interface FitViewer extends Viewer {
  scene: FitScene;
}

interface FitScene extends Scene {
  cameraFlight: CameraFlightAnimation;
}

/** @private */
class FitAction extends Controller {
    viewer: FitViewer;

    constructor(parent: Controller, cfg: BIMConfig = {}) {

        super(parent, cfg);

        if (!cfg.buttonElement) {
            throw "Missing config: buttonElement";
        }

        const buttonElement = cfg.buttonElement;

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
                this.fit();
            }
            event.preventDefault();
        });
    }

    fit() {
        const scene = this.viewer.scene;
        const aabb = scene.getAABB(scene.visibleObjectIds);
        this.viewer.cameraFlight.flyTo({
            aabb: aabb
        });
        this.viewer.cameraControl.pivotPos = math.getAABB3Center(aabb, tempVec3);
    }

    set fov(fov) {
        this.viewer.scene.cameraFlight.fitFOV = fov;
    }

    get fov() {
        return this.viewer.scene.cameraFlight.fitFOV;
    }

    set duration(duration) {
        this.viewer.scene.cameraFlight.duration = duration;
    }

    get duration() {
        return this.viewer.scene.cameraFlight.duration;
    }
}

export { FitAction };
