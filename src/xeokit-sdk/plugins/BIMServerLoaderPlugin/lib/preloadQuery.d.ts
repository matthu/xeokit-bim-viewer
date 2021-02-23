export namespace preloadQuery {
    namespace defines {
        namespace Representation {
            const type: string;
            const fields: string[];
        }
        namespace ContainsElementsDefine {
            const type_1: string;
            export { type_1 as type };
            export const field: string;
            export namespace include {
                const type_2: string;
                export { type_2 as type };
                const field_1: string;
                export { field_1 as field };
                export const includes: string[];
            }
        }
        namespace IsDecomposedByDefine {
            const type_3: string;
            export { type_3 as type };
            const field_2: string;
            export { field_2 as field };
            export namespace include_1 {
                const type_4: string;
                export { type_4 as type };
                const field_3: string;
                export { field_3 as field };
                const includes_1: string[];
                export { includes_1 as includes };
            }
            export { include_1 as include };
        }
    }
    const queries: ({
        type: string;
        includes: string[];
        includeAllSubtypes?: undefined;
    } | {
        type: string;
        includeAllSubtypes: boolean;
        includes?: undefined;
    } | {
        type: string;
        includes?: undefined;
        includeAllSubtypes?: undefined;
    } | {
        type: string;
        includes: {
            type: string;
            field: string;
        }[];
        includeAllSubtypes?: undefined;
    })[];
}
