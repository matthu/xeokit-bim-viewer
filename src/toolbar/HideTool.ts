import { BIMConfig } from "../BIMViewer";
import { Controller } from "../Controller";
import { Entity } from "../xeokit-sdk/viewer/scene/Entity";
import { math } from "../xeokit-sdk/viewer/scene/math/math";

function closeEnough(p: number[], q: number[]) {
    const CLICK_DIST = 4;
    return (Math.abs(p[0] - q[0]) < 4) && (Math.abs(p[1] - q[1]) < CLICK_DIST);
}

/** @private */
class HideTool extends Controller {

    _onHover: any;
    _onHoverOff: any;
    _onMousedown: any;
    _onMouseup: any;

    constructor(parent: Controller, cfg: BIMConfig) {

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
                this.viewer.cameraControl.doublePickFlyTo = false;
            } else {
                buttonElement.classList.remove("active");
                this.viewer.cameraControl.doublePickFlyTo = true;
            }
        });

        buttonElement.addEventListener("click", (event: Event) => {
            if (!this.getEnabled()) {
                return;
            }
            this.bimViewer._sectionTool.hideControl();
            const active = this.getActive();
            this.setActive(!active);
            event.preventDefault();
        });

        this.bimViewer.on("reset", () => {
            this.setActive(false);
        });

        this._init();
    }

    _init() {
        var entity: Entity = null;
        this._onHover = this.viewer.cameraControl.on("hover", (e: any) => {
            if (!this.getActive() || !this.getEnabled()) {
                return;
            }
            if (entity) {
                entity.highlighted = false;
                entity = null;
            }
            if (!e.entity || !e.entity.isObject) {
                return;
            }
            entity = e.entity;
            entity.highlighted = true;
        });
        this._onHoverOff = this.viewer.cameraControl.on("hoverOff", (e: any) => {
            if (!this.getActive() || !this.getEnabled()) {
                return;
            }
            if (entity) {
                entity.highlighted = false;
                entity = null;
            }
        });
        const lastCoords = math.vec2();
        const input = this.viewer.scene.input;
        this._onMousedown = input.on("mousedown", (coords: number[]) => {
            if (!input.mouseDownLeft || input.mouseDownRight || input.mouseDownMiddle) {
                return;
            }
            lastCoords[0] = coords[0];
            lastCoords[1] = coords[1];
        });
        this._onMouseup = input.on("mouseup", (coords: number[]) => {
            if (!this.getActive() || !this.getEnabled()) {
                return;
            }
            if (entity) {
                if (!closeEnough(lastCoords, coords)) {
                    entity = null;
                    return;
                }
                entity.visible = false;
                entity.highlighted = false;
                entity = null;
            }
        });
    }
}

export { HideTool };
