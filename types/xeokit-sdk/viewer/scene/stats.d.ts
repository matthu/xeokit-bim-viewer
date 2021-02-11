/**
 * xeokit runtime statistics.
 * @private
 * @type {{components: {models: number, objects: number, scenes: number, meshes: number}, memory: {indices: number, uvs: number, textures: number, materials: number, transforms: number, positions: number, programs: number, normals: number, meshes: number, colors: number}, build: {version: string}, client: {browser: string}, frame: {frameCount: number, useProgram: number, bindTexture: number, drawElements: number, bindArray: number, tasksRun: number, fps: number, drawArrays: number, tasksScheduled: number}}}
 */
export const stats: {
    components: {
        models: number;
        objects: number;
        scenes: number;
        meshes: number;
    };
    memory: {
        indices: number;
        uvs: number;
        textures: number;
        materials: number;
        transforms: number;
        positions: number;
        programs: number;
        normals: number;
        meshes: number;
        colors: number;
    };
    build: {
        version: string;
    };
    client: {
        browser: string;
    };
    frame: {
        frameCount: number;
        useProgram: number;
        bindTexture: number;
        drawElements: number;
        bindArray: number;
        tasksRun: number;
        fps: number;
        drawArrays: number;
        tasksScheduled: number;
    };
};
