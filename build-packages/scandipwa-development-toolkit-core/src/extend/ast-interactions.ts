/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { parse } from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import {
    ExportDefaultDeclaration,
    ExportNamedDeclaration,
    SourceLocation,
} from '@babel/types';

import {
    ExportData,
    ExportsPaths,
    ExportType,
} from '../types/extend-component.types';

const isAsyncImport = (node: ExportNamedDeclaration): boolean => {
    const { declaration } = node;

    if (declaration?.type === 'VariableDeclaration') {
        const { init } = declaration.declarations[0];

        if (init?.type === 'CallExpression') {
            const { callee } = init;

            if (callee.type === 'Import') {
                return true;
            }
        }
    }

    return false;
};

/**
 * Extract export nodes from original code
 * @param originalCode
 */
export const getExportPathsFromCode = (originalCode: string) : ExportsPaths => {
    const ast = parse(originalCode, {
        sourceType: 'unambiguous',
        plugins: [
            'jsx',
            'classProperties',
            'dynamicImport',
            'optionalCatchBinding',
            'optionalChaining',
            'objectRestSpread',
            'typescript',
        ],
    });

    const exportsPaths: ExportsPaths = [];

    traverse(ast, {
        ExportNamedDeclaration: (path) => {
            // Skip `export const x = import(...)` statements
            if (isAsyncImport(path.node)) {
                return;
            }

            exportsPaths.push(path);
        },
        ExportDefaultDeclaration: (path) => {
            exportsPaths.push(path);
        },
    });

    return exportsPaths;
};

/**
 * Extract additional information from export nodes
 * The following information is retrieved:
 *   + name
 * @param exports
 */
export const getNamedExportsNames = (exports: ExportsPaths) : ExportData[] => {
    const processNamedExport = (path: NodePath<ExportNamedDeclaration>) : ExportData => {
        const getNameFromDeclaration = (declaration: any) : ExportData => {
            const { declarations, id: { name = '' } = {}, type } = declaration;

            if (Array.isArray(declarations)) {
                const [{ id: { name: declarationName }, type: declarationType }] = declarations;

                return { name: declarationName, type: declarationType };
            }

            return { name, type };
        };

        const getDataByTraverse = () : ExportData => {
            let searchResult: ExportData = {
                name: '',
                type: ExportType.not_yet_assigned,
            };

            traverse(headNode, {
                ExportSpecifier: (path) => {
                    // TODO remove any
                    const { node: { exported: { name } } } = path as any;
                    searchResult = { name, type: ExportType.specifier };
                    path.stop();
                },
                ClassDeclaration: (path) => {
                    const { node: { id: { name } } } = path;
                    searchResult = { name, type: ExportType.class };
                    path.stop();
                },
            }, path.scope, null, path.parentPath);

            if (searchResult.type === ExportType.not_yet_assigned) {
                // TODO warn
            }

            return searchResult;
        };

        const { node: { declaration }, node: headNode } = path;

        // handle variable declaration
        if (declaration && declaration.type !== 'ClassDeclaration') {
            return getNameFromDeclaration(declaration);
        }

        return getDataByTraverse();
    };

    return exports.filter((e) => e.type === 'ExportNamedDeclaration').map(
        (elem): ExportData => processNamedExport(<NodePath<ExportNamedDeclaration>>elem),
    );
};

/**
 * Extract additional information from export node
 * The following information is retrieved:
 *   + actual code
 * @param exports
 */
export const getDefaultExportCode = (exports: ExportsPaths, code: string) : string | undefined => {
    const processDefaultExport = (path: NodePath<ExportDefaultDeclaration>) : string => {
        const { node: { loc } } = path;
        const { start, end } = <SourceLocation>loc;

        const codeArray = code.split(/\n/gm);
        const exportDeclarationArray = codeArray.reduce((acc, cur, index) => {
            const lineNumber = ++index;

            if (lineNumber >= start.line && lineNumber <= end.line) {
                if (lineNumber === start.line) {
                    acc.push(cur.slice(start.column));
                } else if (lineNumber === end.line) {
                    acc.push(cur.slice(0, end.column));
                } else {
                    acc.push(cur);
                }
            }

            return acc;
        }, new Array<string>());

        return exportDeclarationArray.join('\n');
    };

    const exportDefaultPaths = exports.filter((e) => e.type === 'ExportDefaultDeclaration');

    if (!exportDefaultPaths.length) {
        return;
    }

    return processDefaultExport(<NodePath<ExportDefaultDeclaration>>exportDefaultPaths[0]);
};
