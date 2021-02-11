/**
 * @private
 * @type {Core}
 */
export const core: Core;
/**
 * @private
 */
declare function Core(): void;
declare class Core {
    /**
     Semantic version number. The value for this is set by an expression that's concatenated to
     the end of the built binary by the xeokit build script.
     @property version
     @namespace xeokit
     @type {String}
     */
    version: string;
    /**
     Existing {@link Scene}s , mapped to their IDs
     @property scenes
     @namespace xeokit
     @type {{Scene}}
     */
    scenes: {
        Scene: any;
    };
    _superTypes: {};
    /**
     * Registers a scene on xeokit.
     * This is called within the xeokit.Scene constructor.
     * @private
     */
    private _addScene;
    /**
     * @private
     */
    private clear;
    /**
     * Schedule a task to run at the next frame.
     *
     * Internally, this pushes the task to a FIFO queue. Within each frame interval, xeokit processes the queue
     * for a certain period of time, popping tasks and running them. After each frame interval, tasks that did not
     * get a chance to run during the task are left in the queue to be run next time.
     *
     * @param {Function} callback Callback that runs the task.
     * @param {Object} [scope] Scope for the callback.
     */
    scheduleTask: (callback: Function, scope?: any) => void;
    runTasks: (until?: number) => number;
    getNumTasks: () => any;
}
export {};
