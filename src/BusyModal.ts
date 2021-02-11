import { Controller } from "./Controller";

/** @private */
class BusyModal extends Controller {

    _modal: HTMLDivElement;
    _modalVisible: boolean;

    constructor(parent: Controller, cfg: any = {}) {

        super(parent, cfg);

        const busyModalBackdropElement = cfg.busyModalBackdropElement || document.body;

        if (!busyModalBackdropElement) {
            throw "Missing config: busyModalBackdropElement";
        }

        this._modal = document.createElement("div");
        this._modal.classList.add("xeokit-busy-modal");
        this._modal.innerHTML = '<div class="xeokit-busy-modal-content"><div class="xeokit-busy-modal-body"><div class="xeokit-busy-modal-message">Default text</div></div></div>';

        busyModalBackdropElement.appendChild(this._modal);

        this._modalVisible = false;
        this._modal.style.display = 'hidden';
    }

    show(message: string) {
        this._modalVisible = true;
        (this._modal.querySelector('.xeokit-busy-modal-message') as HTMLElement).innerText = message;
        this._modal.style.display = 'block';
    }

    hide() {
        this._modalVisible = false;
        this._modal.style.display = 'none';
    }

    destroy() {
        super.destroy();
        if (this._modal) {
            this._modal.parentNode.removeChild(this._modal);
            this._modal = null;
        }
    }
}

export { BusyModal };
