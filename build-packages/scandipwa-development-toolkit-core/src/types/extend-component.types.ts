import { NodePath } from '@babel/traverse';
import {
    ExportDefaultDeclaration,
    ExportNamedDeclaration,
} from '@babel/types';

import { ResourceType } from './common.types';

export type ExportsPaths = Array<
NodePath<ExportNamedDeclaration> |
NodePath<ExportDefaultDeclaration>
>;

export enum ExportType {
    class = 'Class',
    specifier = 'Specifier',
    variable = 'VariableDeclarator',
    not_yet_assigned = 'NotYeatAssigned',
    ts_interface = 'TSInterfaceDeclaration',
    ts_enum = 'TSEnumDeclaration',
    ts_type = 'TSTypeAliasDeclaration',
}

export interface ExportData {
    name: string;
    type: ExportType;
}

export enum StylesOption {
    extend = 'extend',
    override = 'override',
    keep = 'keep',
}

export interface ISearchedFiles {
    [key: string]: string;
}

export interface FileInformation {
    allExports: ExportData[];
    chosenExports: ExportData[];
    defaultExportCode: string | undefined;
    fileName: string;
    originalCode: string;
    resourceType: ResourceType;
    resourceName: string;
    chosenStylesOption: StylesOption;
    // sourceModule: string,
    relativeResourceDirectory: string;
    sourceModuleName: string;
    sourceModuleType: SourceType;
    sourceModuleAlias: string;
}

export type ModuleInformation = {
    type: SourceType;
    alias: string;
    name: string;
};

export enum SourceType {
    Theme = 'theme',
    Extension = 'extension',
}
