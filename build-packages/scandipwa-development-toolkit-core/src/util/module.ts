import { getPackageJson } from "@scandipwa/scandipwa-dev-utils/package-json";
import { ModuleInformation, SourceType } from "../types";

import { getMosaicConfig } from '@tilework/mosaic-dev-utils/mosaic-config';

export const getModuleInformation = (sourceModule: string): ModuleInformation => {
    const buildModuleInformationObject = (
        name: string,
        type: SourceType,
        alias: string
    ): ModuleInformation => ({ name, type, alias });

    const packageJson = getPackageJson(sourceModule);

    const { name } = packageJson;
    const {
        type,
        themeAlias
    } = getMosaicConfig(packageJson);

    // TODO catch this
    // Handle no module type in the base module
    if (!type) {
        throw new Error('No package type found in the base module!');
    }

    // Handle no theme alias in a theme
    if (type === SourceType.Theme && !themeAlias) {
        throw new Error('No theme alias found in the base module!');
    }

    if (type === SourceType.Extension) {
        return buildModuleInformationObject(
            name, 
            type as SourceType, 
            'Base'
        );
    }

    return buildModuleInformationObject(
        name, 
        type as SourceType, 
        themeAlias!
    );
}