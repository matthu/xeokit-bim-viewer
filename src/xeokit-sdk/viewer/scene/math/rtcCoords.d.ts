export function createRTCViewMat(viewMat: any, rtcCenter: any, rtcViewMat?: Float32Array): Float32Array;
/**
 * Converts a World-space 3D position to RTC coordinates.
 *
 * Given a double-precision World-space position, returns a double-precision relative-to-center (RTC) center pos
 * and a single-precision offset fom that center.
 *
 * @param {Float64Array} worldPos The World-space position.
 * @param {Float64Array} rtcCenter Double-precision relative-to-center (RTC) center pos.
 * @param {Float32Array} rtcPos Single-precision offset fom that center.
 */
export function worldToRTCPos(worldPos: Float64Array, rtcCenter: Float64Array, rtcPos: Float32Array): void;
/**
 * Given a 3D plane defined by distance from origin and direction, and an RTC center position,
 * return a plane position that is relative to the RTC center.
 *
 * @param dist
 * @param dir
 * @param rtcCenter
 * @param rtcPlanePos
 * @returns {*}
 */
export function getPlaneRTCPos(dist: any, dir: any, rtcCenter: any, rtcPlanePos: any): any;
