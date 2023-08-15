import * as path from 'path';

import { JS_FILE_EXTENSION, ResourceType, SourceType } from '../types';
import { capitalize } from './misc';

export const getImportPath = (
    resourceName: string,
    resourceType: ResourceType,
    relativeResourceDirectory: string,
    sourceAlias: string,
    sourceType: SourceType,
    sourceModuleName: string,
    fileName: string,
): string => {
    const removeFileExtension = (name: string) => name.slice(0, name.lastIndexOf('.'));

    if (sourceType === SourceType.Extension) {
        return path.join(
            sourceModuleName,
            relativeResourceDirectory,
            removeFileExtension(fileName),
        );
    }

    return path.join(
        [sourceAlias, capitalize(resourceType)].join(''),
        resourceName,
        removeFileExtension(fileName),
    );
};

export const replaceTsWithJs = (fileName: string) => fileName.replace(/\.ts|\.tsx$/, JS_FILE_EXTENSION);

export const removeTsAnnotationsFromDefault = (input: string): string =>
    input.replace(
        /(.*?)(?: as unknown as (?:React\.)?ComponentType<[^>]+>)(.*?)(,)/g,
        '$1$2$3'
    );
