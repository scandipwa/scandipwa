import { ResourceType } from "../types";

const extendableDirectoryMap = {
    [ResourceType.Route]: 'src/route',
    [ResourceType.Component]: 'src/component',
    [ResourceType.Query]: 'src/query',
    [ResourceType.Store]: 'src/store'
};

export default extendableDirectoryMap;