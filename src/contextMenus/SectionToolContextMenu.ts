import { ContextMenu } from "../xeokit-sdk/extras/ContextMenu/ContextMenu";
import { SectionPlanesPlugin } from "../xeokit-sdk/plugins/SectionPlanesPlugin/SectionPlanesPlugin";
import { math } from "../xeokit-sdk/viewer/scene/math/math";
import { SectionPlane } from "../xeokit-sdk/viewer/scene/sectionPlane/SectionPlane";
import { utils } from "../xeokit-sdk/viewer/scene/utils";
import { Viewer } from "../xeokit-sdk/viewer/Viewer";

const tempAABB = math.AABB3();
const tempVec3 = math.vec3();

class SectionToolContextMenu extends ContextMenu {

    _sectionPlanesPlugin: SectionPlanesPlugin;
    _viewer: Viewer;
    _onSceneSectionPlaneCreated: any;
    _onSceneSectionPlaneDestroyed: any;

    constructor(cfg: any = {}) {

        if (!cfg.sectionPlanesPlugin) {
            throw "Missing config: sectionPlanesPlugin";
        }

        super(utils.apply({}, cfg));

        this._sectionPlanesPlugin = cfg.sectionPlanesPlugin;
        this._viewer = this._sectionPlanesPlugin.viewer;

        this._onSceneSectionPlaneCreated = this._viewer.scene.on("sectionPlaneCreated", () => {
            this._buildMenu();
        });

        this._onSceneSectionPlaneDestroyed = this._viewer.scene.on("sectionPlaneDestroyed", () => {
            this._buildMenu();
        });

        this._buildMenu();
    }

    _buildMenu() {

        const sectionPlanesPlugin = this._sectionPlanesPlugin;
        const sectionPlanes = Object.values(sectionPlanesPlugin.sectionPlanes);

        const sectionPlanesMenuItems: any[] = [];

        for (let i = 0, len = sectionPlanes.length; i < len; i++) {

            const sectionPlane = sectionPlanes[i] as SectionPlane;

            sectionPlanesMenuItems.push({

                getTitle: () => {
                    return "Slice #" + (i + 1);
                },

                doHoverEnter(context: any) {
                    sectionPlanesPlugin.hideControl();
                    sectionPlanesPlugin.showControl(sectionPlane.id as string);
                },

                doHoverLeave(context: any) {
                    sectionPlanesPlugin.hideControl();
                },

                items: [ // Submenu
                    [ // Group
                        {
                            getTitle(context: any) {
                                return "Edit"
                            },

                            doAction: (context: any) => {

                                sectionPlanesPlugin.hideControl();
                                sectionPlanesPlugin.showControl(sectionPlane.id as string);

                                const sectionPlanePos = sectionPlane.pos;
                                tempAABB.set(this._viewer.scene.aabb);
                                math.getAABB3Center(tempAABB, tempVec3);
                                tempAABB[0] += sectionPlanePos[0] - tempVec3[0];
                                tempAABB[1] += sectionPlanePos[1] - tempVec3[1];
                                tempAABB[2] += sectionPlanePos[2] - tempVec3[2];
                                tempAABB[3] += sectionPlanePos[0] - tempVec3[0];
                                tempAABB[4] += sectionPlanePos[1] - tempVec3[1];
                                tempAABB[5] += sectionPlanePos[2] - tempVec3[2];

                                this._viewer.cameraFlight.flyTo({
                                    aabb: tempAABB,
                                    fitFOV: 65
                                });
                            }
                        },
                        {
                            getTitle(context: any) {
                                return "Flip"
                            },

                            doAction: (context: any) => {
                                sectionPlane.flipDir();
                            }
                        },
                        {
                            getTitle(context: any) {
                                return "Delete"
                            },

                            doAction: (context: any) => {
                                sectionPlane.destroy();
                            }
                        }
                    ]
                ]
            });
        }

        this.items = [
            [
                {
                    title: "Clear Slices",
                    getEnabled: function (context: any) {
                        return (context.bimViewer.getNumSections() > 0);
                    },
                    doAction: function (context: any) {
                        context.bimViewer.clearSections();
                    }
                },
                {
                    title: "Flip Slices",
                    getEnabled: function (context: any) {
                        return (context.bimViewer.getNumSections() > 0);
                    },
                    doAction: function (context: any) {
                        context.bimViewer.flipSections();
                    }
                }
            ],

            sectionPlanesMenuItems
        ];
    }

    destroy() {
        super.destroy();
        const scene = this._viewer.scene;
        scene.off(this._onSceneSectionPlaneCreated);
        scene.off(this._onSceneSectionPlaneDestroyed);
    }
}


export { SectionToolContextMenu };
