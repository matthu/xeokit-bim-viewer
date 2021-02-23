/** @private
 */
export class ModelTreeView {
    /**
     * @private
     */
    private constructor();
    _id: any;
    _baseId: string;
    _viewer: any;
    _metaModel: any;
    _treeViewPlugin: any;
    _rootMetaObject: any;
    _containerElement: any;
    _rootElement: HTMLUListElement;
    _muteSceneEvents: boolean;
    _muteTreeEvents: boolean;
    _rootNodes: any[];
    _objectNodes: {};
    _rootName: any;
    _sortNodes: any;
    _pruneEmptyNodes: any;
    _showListItemElementId: string;
    _onObjectVisibility: any;
    switchExpandHandler: (event: any) => void;
    switchCollapseHandler: (event: any) => void;
    _checkboxChangeHandler: (event: any) => void;
    _hierarchy: any;
    _autoExpandDepth: any;
    _nodeToObjectID(nodeId: any): any;
    _objectToNodeID(objectId: any): string;
    setAutoExpandDepth(depth?: number): void;
    setHierarchy(hierarchy: any): void;
    _createNodes(): void;
    _findEmptyNodes(metaObject?: any, countEntities?: number): any;
    _createStoreysNodes(metaObject: any, buildingNode: any, storeyNode: any, typeNodes: any): void;
    _createTypesNodes(metaObject: any, rootNode: any, typeNodes: any): void;
    _createContainmentNodes(metaObject: any, parent: any): void;
    _doSortNodes(): void;
    _sortChildren(node: any): void;
    _getSpatialSortFunc(): (node1: any, node2: any) => 1 | 0 | -1;
    _spatialSortFunc: (node1: any, node2: any) => 1 | 0 | -1;
    _alphaSortFunc(node1: any, node2: any): 1 | 0 | -1;
    _synchNodesToEntities(): void;
    _withNodeTree(node: any, callback: any): void;
    _createTrees(): void;
    _createNodeElement(node: any): HTMLLIElement;
    expandToDepth(depth: any): void;
    collapse(): void;
    showNode(objectId: any): void;
    unShowNode(): void;
    _expandSwitchElement(switchElement: any): void;
    _collapseNode(objectId: any): void;
    _collapseSwitchElement(switchElement: any): void;
    /**
     * Destroys this ModelTreeView.
     */
    destroy(): void;
    _destroyed: boolean;
}
