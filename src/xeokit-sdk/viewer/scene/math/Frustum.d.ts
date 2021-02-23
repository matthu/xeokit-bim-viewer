/**
 * @private
 */
export class Frustum {
    planes: FrustumPlane[];
}
export namespace Frustum {
    const INSIDE: number;
    const INTERSECT: number;
    const OUTSIDE: number;
}
/**
 * @private
 */
export class FrustumPlane {
    normal: any;
    offset: number;
    testVertex: any;
    set(nx: any, ny: any, nz: any, offset: any): void;
}
/** @private */
export function frustumIntersectsAABB3(frustum: any, aabb: any): number;
/** @private */
export function setFrustum(frustum: any, viewMat: any, projMat: any): void;
