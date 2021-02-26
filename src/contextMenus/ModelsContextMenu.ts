import { BIMViewer } from "../BIMViewer";
import { ContextMenu } from "../xeokit-sdk/extras/ContextMenu/ContextMenu";
import { Viewer } from "../xeokit-sdk/viewer/Viewer";

interface Context {
  viewer: Viewer;
  bimViewer: BIMViewer;
  modelId: string;
}

/**
 * @private
 * @param {*} cfg Configs
 * @param {Boolean} [cfg.enableEditModels=false] Set true to show Add/Edit/Delete options in the menu.
 */
class ModelsContextMenu extends ContextMenu {

    constructor(cfg: any = {}) {

        const enableEditModels = (!!cfg.enableEditModels);

        const items = [
            [
                {
                    title: "Load",
                    getEnabled: function (context: Context) {
                        return (!context.bimViewer.isModelLoaded(context.modelId));
                    },
                    doAction: function (context: Context) {
                        context.bimViewer.loadModel(context.modelId);
                    }
                },
                {
                    title: "Unload",
                    getEnabled: function (context: Context) {
                        return context.bimViewer.isModelLoaded(context.modelId);
                    },
                    doAction: function (context: Context) {
                        context.bimViewer.unloadModel(context.modelId);
                    }
                }
            ]
        ];

        if (enableEditModels) {

            items.push([
                {
                    title: "Edit",
                    getEnabled: function (context: Context) {
                        return true;
                    },
                    doAction: function (context: Context) {
                        context.bimViewer.editModel(context.modelId);
                    }
                },
                {
                    title: "Delete",
                    getEnabled: function (context: Context) {
                        return true;
                    },
                    doAction: function (context: Context) {
                        context.bimViewer.deleteModel(context.modelId);
                    }
                }
            ]);
        }

        items.push([
            {
                title: "Load All",
                getEnabled: function (context: Context) {
                    const bimViewer = context.bimViewer;
                    const modelIds = bimViewer.getModelIds();
                    const loadedModelIds = bimViewer.getLoadedModelIds();
                    return (loadedModelIds.length < modelIds.length);
                },
                doAction: function (context: Context) {
                    context.bimViewer.loadAllModels();
                }
            },
            {
                title: "Unload All",
                getEnabled: function (context: Context) {
                    const loadedModelIds = context.bimViewer.getLoadedModelIds();
                    return (loadedModelIds.length > 0);
                },
                doAction: function (context: Context) {
                    context.bimViewer.unloadAllModels();
                }
            }
        ]);

        // items.push([
        //     {
        //         title: "Clear Slices",
        //         getEnabled: function (context: Context) {
        //             return (context.bimViewer.getNumSections() > 0);
        //         },
        //         doAction: function (context: Context) {
        //             context.bimViewer.clearSections();
        //         }
        //     }
        // ]);

        super({
            context: cfg.context,
            items: items
        });
    }
}

export { ModelsContextMenu };
