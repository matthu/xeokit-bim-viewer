export namespace K3D {
    function load(path: any, resp: any): void;
    function save(buff: any, path: any): void;
    function clone(o: any): any;
    namespace bin {
        const f: Float32Array;
        const fb: Uint8Array;
        function rf(buff: any, off: any): number;
        function rsl(buff: any, off: any): number;
        function ril(buff: any, off: any): number;
        function rASCII0(buff: any, off: any): string;
        function wf(buff: any, off: any, v: any): void;
        function wsl(buff: any, off: any, v: any): void;
        function wil(buff: any, off: any, v: any): void;
    }
    namespace parse {
        function _buffToStr(buff: any): string;
        function _strToBuff(str: any): ArrayBuffer;
        function _readLine(a: any, off: any): string;
        function fromJSON(buff: any): any;
        function toJSON(object: any): ArrayBuffer;
        function fromOBJ(buff: any): {
            groups: {};
            c_verts: any[];
            c_uvt: any[];
            c_norms: any[];
            i_verts: any[];
            i_uvt: any[];
            i_norms: any[];
        };
        function fromMD2(buff: any): {
            c_uvt: any[];
            i_verts: any[];
            i_uvt: any[];
            skins: any[];
            frames: any[];
        };
        namespace fromMD2 {
            const _normals: number[];
        }
        function fromCollada(buff: any): {
            asset: {
                created: any;
                modified: any;
                up_axis: any;
            };
            geometries: {
                sources: {};
                triangles: any[];
            }[];
            images: {};
            materials: {};
            effects: {};
        };
        namespace fromCollada {
            function _asset(xml: any): {
                created: any;
                modified: any;
                up_axis: any;
            };
            function _libGeometries(xml: any): {
                sources: {};
                triangles: any[];
            }[];
            function _getMesh(mesh: any): {
                sources: {};
                triangles: any[];
            };
            function _libImages(xml: any): {};
            function _libMaterials(xml: any): {};
            function _libEffects(xml: any): {};
        }
        function from3DS(buff: any): {
            edit: {
                objects: any[];
            };
            keyf: {
                desc: any[];
            };
        };
        namespace from3DS {
            function _edit3ds(buff: any, coff: any, clng: any): {
                objects: any[];
            };
            function _keyf3ds(buff: any, coff: any, clng: any): {
                desc: any[];
            };
            function _keyf_objdes(buff: any, coff: any, clng: any): {
                hierarchy: {
                    name: string;
                    hierarchy: number;
                };
                dummy_name: string;
            };
            function _keyf_objhierarch(buff: any, coff: any, clng: any): {
                name: string;
                hierarchy: number;
            };
            function _edit_object(buff: any, coff: any, clng: any): {
                name: string;
                mesh: {
                    vertices: number[];
                    indices: number[];
                    uvt: number[];
                    local: {
                        X: number[];
                        Y: number[];
                        Z: number[];
                        C: number[];
                    };
                };
            };
            function _obj_trimesh(buff: any, coff: any, clng: any): {
                vertices: number[];
                indices: number[];
                uvt: number[];
                local: {
                    X: number[];
                    Y: number[];
                    Z: number[];
                    C: number[];
                };
            };
            function _tri_vertexl(buff: any, coff: any, clng: any): number[];
            function _tri_facel1(buff: any, coff: any, clng: any): number[];
            function _tri_mappingcoors(buff: any, coff: any, clng: any): number[];
            function _tri_local(buff: any, coff: any, clng: any): {
                X: number[];
                Y: number[];
                Z: number[];
                C: number[];
            };
        }
        function fromBIV(buff: any): {
            vertices: number[];
            uvt: number[];
            indices: number[];
        };
        namespace fromBIV {
            function _readFloats(buff: any, off: any, len: any): number[];
            function _writeFloats(buff: any, off: any, arr: any): void;
            function _readInts(buff: any, off: any, len: any, cs: any): number[];
            function _writeInts(buff: any, off: any, arr: any, cs: any): void;
        }
        function toBIV(obj: any): ArrayBufferLike;
    }
    namespace gen {
        function Plane(sw: any, sh: any, tsw: any, tsh: any): {
            verts: any[];
            inds: any[];
            uvt: any[];
        };
        function Cube(): {
            verts: number[];
            inds: number[];
            uvt: number[];
        };
        function Sphere(sx: any, sy: any): {
            verts: any[];
            inds: any[];
            uvt: any[];
        };
    }
    namespace mat {
        function scale(x: any, y: any, z: any): any[];
        function translate(x: any, y: any, z: any): any[];
        function rotateDeg(x: any, y: any, z: any): number[];
        function rotate(x: any, y: any, z: any): number[];
    }
    namespace edit {
        function interpolate(a: any, b: any, d: any, t: any): void;
        function transform(a: any, m: any): void;
        function unwrap(ind: any, crd: any, cpi: any): any[];
        function remap(ind: any, nind: any, arr: any, cpi: any): any[];
    }
    namespace utils {
        function getAABB(vts: any): {
            min: {
                x: any;
                y: any;
                z: any;
            };
            max: {
                x: any;
                y: any;
                z: any;
            };
        };
    }
}
