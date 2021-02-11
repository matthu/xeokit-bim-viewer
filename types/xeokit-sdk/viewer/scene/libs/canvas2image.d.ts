/**
 * @private
 */
export const Canvas2Image: {
    saveAsBMP: () => void;
    saveAsPNG: () => void;
    saveAsJPEG: () => void;
} | {
    saveAsPNG: (oCanvas: any, bReturnImg: any, iWidth: any, iHeight: any, flipy: any) => boolean | HTMLImageElement;
    saveAsJPEG: (oCanvas: any, bReturnImg: any, iWidth: any, iHeight: any, flipy: any) => boolean | HTMLImageElement;
    saveAsBMP: (oCanvas: any, bReturnImg: any, iWidth: any, iHeight: any, flipy: any) => boolean | HTMLImageElement;
};
