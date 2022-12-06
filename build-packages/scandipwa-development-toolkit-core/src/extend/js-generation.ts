import { ResourceType } from '../types';
import {
    ExportData,
    ExportType,
    FileInformation,
    StylesOption,
} from '../types/extend-component.types';
import { getImportPath } from '../util/js-generation';
import { capitalize, decapitalize } from '../util/misc';
import { getStyleFileName } from './scss-generation';

const isMapping = (name: string) => ['mapStateToProps', 'mapDispatchToProps'].includes(name);

const getPrefixedName = (name: string, moduleAlias: string) => {
    const isCapitalized = (word: string) => word[0].toUpperCase() === word[0];
    const isUpperCase = (word: string) => word.toUpperCase() === word;

    if (isUpperCase(name)) {
        return `${moduleAlias.toUpperCase()}_${name}`;
    }

    if (isCapitalized(name)) {
        return [moduleAlias, name].map(capitalize).join('');
    }

    return [decapitalize(moduleAlias), capitalize(name)].join('');
};

const generateAdditionalImportString = (originalCode: string, defaultExportCode?: string): string => {
    if (!defaultExportCode) {
        return '';
    }

    const exdfWords = Array.from(new Set(
        defaultExportCode.match(/\w+\(/gm)?.filter(
            (word) => !['export', 'default'].includes(word),
        ) || [],
    ), (str) => str.slice(0, str.length - 1));

    return (exdfWords).reduce((acc, importableName): Array<string | undefined> => {
        const library = originalCode.match(
            new RegExp(`import.+${importableName}.+from '(?<library>.+)'`),
        )?.groups?.library;

        const braces = !!originalCode.match(
            new RegExp(`import.+{.*${importableName}.*}.+from '(?<library>.+)'`),
        );

        if (!library) {
            return acc;
        }

        acc.push(
            [
                'import',
                braces ? '{' : '',
                importableName,
                braces ? '}' : '',
                `from '${library}';`,
            ].join(' '),
        );

        return acc;
    }, new Array<string | undefined>()).join('\n');
};

const generateStyleImport = (
    fileName: string,
    resourceName: string,
    extendableType: ResourceType,
    chosenStylesOption: StylesOption,
): string => {
    if (
        [ResourceType.Route, ResourceType.Component].includes(extendableType)
        && fileName.includes('component')
        && chosenStylesOption !== StylesOption.keep
    ) {
        const styleFilename = getStyleFileName(resourceName, chosenStylesOption).replace(/\.s?(c|a)ss$/, '');

        return `import './${styleFilename}';`;
    }

    return '';
};

const generateImportString = (
    sourceFilePath: string,
    sourceModuleAlias: string,
    chosenExports: ExportData[],
    notChosenExports: ExportData[],
): string => {
    if (!chosenExports.length) {
        return '';
    }

    const exportsWithoutInterface = chosenExports.filter((exportItem) => exportItem.type !== ExportType.ts_interface);

    return [
        'import {',
        ...exportsWithoutInterface.map(({ name }) => `    ${name} as ${getPrefixedName(name, sourceModuleAlias)},`),
        ...notChosenExports.map(({ name }) => `    ${name},`),
        `} from '${sourceFilePath}';`,
    ].join('\n');
};

const generateExportsFromSource = (notChosenExports: ExportData[]): string => {
    if (!notChosenExports.length) {
        return '';
    }

    return [
        'export {\n',
        ...notChosenExports.map(({ name }) => `    ${name},\n`),
        '};',
    ].join('');
};

const generateClassExtend = (chosenExports: ExportData[], sourceModuleAlias: string): string => {
    const classExport = chosenExports.find((one) => one.type === ExportType.class);

    if (!classExport) {
        return '';
    }

    const { name } = classExport;

    return [
        `export class ${name} extends ${getPrefixedName(name, sourceModuleAlias)} {`,
        '    // TODO implement logic',
        '};',
    ].join('\n');
};

const generateMappingsExtends = (chosenExports: ExportData[], sourceModuleAlias: string): Array<string> => chosenExports
    .filter(({ name }) => isMapping(name))
    .map(
        ({ name }) => {
            const argument = name.includes('State')
                ? 'state'
                : 'dispatch';

            const newExport = [
                `export const ${name} = ${argument} => ({`,
                `    ...${getPrefixedName(name, sourceModuleAlias)}(${argument}),`,
                `    // TODO extend ${name}`,
                '});',
            ].join('\n');

            return newExport;
        },
    );

const generateExtendStrings = (chosenExports: ExportData[], sourceModuleAlias: string): Array<string> => {
    if (!chosenExports.length) {
        return [];
    }

    return chosenExports
        .filter((one) => one.type === ExportType.variable && !isMapping(one.name))
        .map(({ name }) => [
            `//TODO: implement ${name}`,
            `export const ${name} = ${getPrefixedName(name, sourceModuleAlias)};`,
        ].join('\n'));
};

const generateTSInterfaceExtend = (sourceFilePath: string, chosenExports: ExportData[]): string => {
    if (!chosenExports.length) {
        return '';
    }

    const mappedInterfaces = [
        `declare module '${sourceFilePath}' {`,
        chosenExports
            .filter((one) => [one.type === ExportType.ts_interface && !isMapping(one.name)])
            .map(({ name }) => [
                `export interface ${name} {}`,
            ]).join('\n\n'),
        '}',
    ].join('\n');

    return mappedInterfaces;
};

const generateTSTypes = (chosenExports: ExportData[], sourceModuleAlias: string): Array<string> => {
    if (!chosenExports.length) {
        return [];
    }

    return chosenExports
        .filter((one) => one.type === ExportType.ts_type)
        .map(({ name }) => [
            `//TODO: extend type ${name}`,
            `export type ${name} = ${getPrefixedName(name, sourceModuleAlias)} | {};`,
        ].join('\n'));
};

const generateTSEnums = (chosenExports: ExportData[], sourceModuleAlias: string): Array<string> => {
    if (!chosenExports.length) {
        return [];
    }

    return chosenExports
        .filter((one) => one.type === ExportType.ts_enum)
        .map(({ name }) => [
            `enum ${name} {}`,
            `export type ${name}Type = ${getPrefixedName(name, sourceModuleAlias)} & ${name};`,
        ].join('\n\n'));
};

/**
 * Generate all necessary contents for the created file
 */
const generateNewFileContents = ({
    fileName,
    allExports,
    chosenExports,
    defaultExportCode,
    originalCode,
    resourceType,
    resourceName,
    chosenStylesOption,
    relativeResourceDirectory,
    sourceModuleName,
    sourceModuleType,
    sourceModuleAlias,
}: FileInformation) : string => {
    const importPath = getImportPath(
        resourceName,
        resourceType,
        relativeResourceDirectory,
        sourceModuleAlias,
        sourceModuleType,
        sourceModuleName,
        fileName,
    );

    const notChosenExports = allExports.filter((one) => !chosenExports.includes(one));
    const interfacesExports = chosenExports.filter((exportItem) => exportItem.type === ExportType.ts_interface);

    // Generate new file: imports + exports from source + all extendables + class template + exdf + interface + types + enums
    const result = [
        generateAdditionalImportString(originalCode, defaultExportCode),
        generateImportString(importPath, sourceModuleAlias, chosenExports, notChosenExports),
        generateStyleImport(fileName, resourceName, resourceType, chosenStylesOption),
        generateExportsFromSource(notChosenExports),
        ...generateExtendStrings(chosenExports, sourceModuleAlias),
        ...generateMappingsExtends(chosenExports, sourceModuleAlias),
        generateClassExtend(chosenExports, sourceModuleAlias),
        generateTSInterfaceExtend(importPath, interfacesExports),
        ...generateTSTypes(chosenExports, sourceModuleAlias),
        ...generateTSEnums(chosenExports, sourceModuleAlias),
        defaultExportCode,
    ].filter(Boolean).join('\n\n').concat('\n');

    return result;
};

export default generateNewFileContents;
