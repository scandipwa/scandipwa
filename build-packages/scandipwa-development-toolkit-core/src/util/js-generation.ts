import * as path from 'path';
import { ResourceType, SourceType } from "../types";
import { capitalize } from './misc';

export const getImportPath = (
    resourceName: string, 
    resourceType: ResourceType,
    relativeResourceDirectory: string,
    sourceAlias: string,
    sourceType: SourceType,
    sourceModuleName: string,
    fileName: string
): string => {
    const removeFileExtension = (name: string) => name.slice(0, name.lastIndexOf('.'));

    if (sourceType === SourceType.Extension) {
        return path.join(
            sourceModuleName,
            relativeResourceDirectory,
            removeFileExtension(fileName)
        )
    }

    return path.join(
        [sourceAlias, capitalize(resourceType)].join(''),
        resourceName,
        removeFileExtension(fileName)
    );
}
