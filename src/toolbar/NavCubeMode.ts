import { NavCubePlugin } from "@xeokit/xeokit-sdk/src/plugins/NavCubePlugin/NavCubePlugin.js";
import { Controller } from "../Controller";

/** @private */
class NavCubeMode extends Controller {

    _navCube: NavCubePlugin;

    constructor(parent: Controller, cfg: any) {

        super(parent, cfg);

        if (!cfg.navCubeCanvasElement) {
            throw "Missing config: navCubeCanvasElement";
        }

        const navCubeCanvasElement = cfg.navCubeCanvasElement;

        this._navCube = new NavCubePlugin(this.viewer, {
            canvasElement: navCubeCanvasElement,
            fitVisible: true,
            color: "#CFCFCF"
        });

        this._navCube.setVisible(this._active);

        this.on("active", (active: boolean) => {
            this._navCube.setVisible(active);
        });
    }

    destroy() {
        this._navCube.destroy();
        super.destroy();
    }
}

export { NavCubeMode };
