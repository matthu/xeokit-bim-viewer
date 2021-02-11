import { CameraControl } from "@xeokit/xeokit-sdk/src/viewer/scene/CameraControl/CameraControl.js";
import { Controller } from "../Controller";

interface FirstPersonModeCameraControl extends CameraControl {
  pivoting: boolean;
}

/** @private */
class FirstPersonMode extends Controller {

    constructor(parent: Controller, cfg: any) {

        super(parent, cfg);

        if (!cfg.buttonElement) {
            throw "Missing config: buttonElement";
        }

        const buttonElement = cfg.buttonElement;
        const cameraControl = this.viewer.cameraControl as FirstPersonModeCameraControl;
        const cameraControlNavModeMediator = cfg.cameraControlNavModeMediator;

        cameraControl.navMode = "orbit";
        cameraControl.followPointer = true;

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

        this.on("active", (active: boolean) => {
            cameraControlNavModeMediator.setFirstPersonModeActive(active);
            if (active) {
                cameraControl.followPointer = true;
                cameraControl.pivoting = false;
            } else {
                cameraControl.pivoting = true;
            }
        });

        buttonElement.addEventListener("click", (event: Event) => {
            if (!this.getEnabled()) {
                return;
            }
            const active = this.getActive();
            this.setActive(!active);
            event.preventDefault();
        });

        this.bimViewer.on("reset", ()=>{
            this.setActive(false);
        });
    }
}

export { FirstPersonMode };
