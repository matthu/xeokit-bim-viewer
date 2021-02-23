import { Mesh } from "../mesh/Mesh";
/**
 * @desc A Skybox.
 */
export class Skybox {
    /**
     * @constructor
     * @param {Component} owner Owner component. When destroyed, the owner will destroy this PointLight as well.
     * @param {*} [cfg]  Skybox configuration
     * @param {String} [cfg.id] Optional ID, unique among all components in the parent {Scene}, generated automatically when omitted.
     * @param {String} [cfg.src=null] Path to skybox texture
     * @param {String} [cfg.encoding="linear"] Texture encoding format.  See the {@link Texture#encoding} property for more info.
     * @param {Number} [cfg.size=1000] Size of this Skybox, given as the distance from the center at ````[0,0,0]```` to each face.
     * @param {Boolean} [cfg.active=true] True when this Skybox is visible.
     */
    constructor(owner: any, cfg?: any);
    _skyboxMesh: Mesh;
    /**
     * Sets the size of this Skybox, given as the distance from the center at [0,0,0] to each face.
     *
     * Default value is ````1000````.
     *
     * @param {Number} value The size.
     */
    set size(arg: number);
    /**
     * Gets the size of this Skybox, given as the distance from the center at [0,0,0] to each face.
     *
     * Default value is ````1000````.
     *
     * @returns {Number} The size.
     */
    get size(): number;
    /**
     * Sets whether this Skybox is visible or not.
     *
     * Default value is ````true````.
     *
     * @param {Boolean} active Whether to make active or not.
     */
    set active(arg: boolean);
    /**
     * Gets if this Skybox is visible or not.
     *
     * Default active is ````true````.
     *
     * @returns {Boolean} ````true```` if the Skybox is active.
     */
    get active(): boolean;
    _size: number;
}
