/**
 *
 * @param bimServerClient
 * @param bimServerClientModel
 * @param roid
 * @param globalTransformationMatrix
 * @param performanceModelBuilder
 * @constructor
 * @private
 */
export function BIMServerPerformanceGeometryLoader(bimServerClient: any, bimServerClientModel: any, roid: any, globalTransformationMatrix: any, performanceModelBuilder: any): void;
export class BIMServerPerformanceGeometryLoader {
    /**
     *
     * @param bimServerClient
     * @param bimServerClientModel
     * @param roid
     * @param globalTransformationMatrix
     * @param performanceModelBuilder
     * @constructor
     * @private
     */
    private constructor();
    roid: any;
    addProgressListener: (progressListener: any) => void;
    process: () => void;
    setLoadOids: (oids: any) => void;
    start: () => void;
}
