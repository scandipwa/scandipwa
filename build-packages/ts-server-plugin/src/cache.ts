/* eslint-disable consistent-return */
import ts from 'typescript/lib/tsserverlibrary';

import { NamespaceDeclaration } from './declaration';
import { NamespaceReference } from './reference';
import {
    CLASS_PLUGIN_METHOD_TYPE, CLASS_PLUGIN_PROPERTY_TYPE, CLASS_PLUGIN_STATIC_TYPE, ClassPluginTypes, FUNCTION_PLUGIN_TYPE
} from './util/config';
import { Ctx } from './util/context';
import { getAllThemeFiles } from './util/parent-theme';

type DeclarationCacheMap = Record<string, NamespaceDeclaration>;
type ReferenceCacheMap = Record<string, Array<NamespaceReference>>;
type FileToNamespaceMap = Record<string, Array<NamespaceReference | NamespaceDeclaration>>;

export class Cache {
    ctx: Ctx;

    mosaicSourceFiles: ts.SourceFile[] | undefined;

    mosaicProgram: ts.Program | undefined;

    hasCachedAll = false;

    declarationMap: DeclarationCacheMap = {};

    referenceMap: ReferenceCacheMap = {};

    fileToNamespaceMap: FileToNamespaceMap = {};

    // (cache) Lookup plugins by namespace
    // Provide error diagnostics (lookup plugins by namespace)
    // Update cache by filename

    constructor(
        ctx: Ctx
    ) {
        this.ctx = ctx;
    }

    getProgramSourceFiles(): readonly ts.SourceFile[] {
        const program = this.ctx.info.project.getLanguageService().getProgram();
        if (!program) {
            return [];
        }
        const sourceFiles = program.getSourceFiles();
        if (!sourceFiles) {
            return [];
        }

        return sourceFiles;
    }

    getSourceFileByPath(fileName: string, tryCount = 0): ts.SourceFile | undefined {
        // TODO: optimize this function

        const program = this.ctx.info.project.getLanguageService().getProgram();
        if (!program || tryCount > 1) {
            return;
        }
        // ^^^ Allow only one try to get the source file

        const sourceFile = program.getSourceFile(fileName);

        if (sourceFile) {
            return sourceFile;
        }

        // vvv Add file as new source file
        this.ctx.info.project.addMissingFileRoot(fileName as ts.server.NormalizedPath);

        return this.getSourceFileByPath(fileName, tryCount + 1);
    }

    getMosaicSourceFiles(): ts.SourceFile[] {
        if (this.mosaicSourceFiles) {
            return this.mosaicSourceFiles;
        }

        const program = this.ctx.info.project.getLanguageService().getProgram();
        if (!program) {
            return [];
        }

        const themeFiles = getAllThemeFiles(program.getCurrentDirectory()).sort(
            (a, b) => (a.length - b.length)
            // ^^^ Sort by length to put index files first
        );

        const moreSourceFiles = themeFiles.reduce((acc, fileName) => {
            const sourceFile = this.getSourceFileByPath(fileName);

            if (!sourceFile) {
                return acc;
            }

            return [...acc, sourceFile];
        }, [] as ts.SourceFile[]);

        this.mosaicSourceFiles = moreSourceFiles;

        return this.mosaicSourceFiles;
    }

    getAllSourceFiles(): ts.SourceFile[] {
        return [
            ...this.getMosaicSourceFiles(),
            ...this.getProgramSourceFiles()
        ];
    }

    cacheAllFiles(): void {
        const allSourceFiles = this.getAllSourceFiles();

        if (allSourceFiles.length > 0) {
            this.hasCachedAll = true;
        }

        allSourceFiles.forEach((sourceFile) => {
            this.refreshBySourceFile(sourceFile);
        });
    }

    refreshBySourceFile(sourceFile: ts.SourceFile): void {
        const { fileName } = sourceFile;
        const prevDecOrRef = this.fileToNamespaceMap[fileName] || [];

        // vvv flush reference/declaration cache based on previous references in this file
        prevDecOrRef.forEach((decOrRef) => {
            const isRef = decOrRef instanceof NamespaceReference;
            const namespace = decOrRef.getNamespaceString();

            // vvv Flush declaration cache
            if (!isRef) {
                // eslint-disable-next-line fp/no-delete
                delete this.declarationMap[namespace];
                return;
            }

            if (!this.referenceMap[namespace]) {
                // ^^^ This namespace no longer exists ?
                // (fixed by caching namespace)
                return;
            }

            // vvv Flush reference cache (filter out ones not matching the current)
            this.referenceMap[namespace] = this.referenceMap[namespace].filter((ref) => {
                const isNotSameRef = ref !== decOrRef;
                return isNotSameRef;
            });
        });

        if (fileName.indexOf('.plugin') !== -1) {
            // ^^^ This is a plugin
            const namespaceNodes = this.ctx.nodeUtils.getNodeChildByCondition(sourceFile, (node) => (
                ts.isStringLiteral(node)
                || ts.isIdentifier(node)
                // ^^^ is StringLiteral or Identifier
            ));

            if (!namespaceNodes.length) {
                return;
            }

            const plugins: NamespaceReference[] = [];

            namespaceNodes.forEach((namespaceNode) => {
                if (!namespaceNode.parent) {
                    return;
                }

                // vvv constructing from namespace node parent (PA node), to get only one plugin from all constructable targets
                const plugin = NamespaceReference.constructFromKnownPANode(this.ctx, namespaceNode.parent);

                if (!plugin) {
                    return;
                }

                plugins.push(plugin);

                // vvv need to check if node we constructed plugin is a real reference
                const prevValue = this.referenceMap[plugin.getNamespaceString()] || [];
                this.referenceMap[plugin.getNamespaceString()] = [...prevValue, plugin];
            });

            this.fileToNamespaceMap[fileName] = plugins;

            return;
        }

        // vvv This is NOT a plugin
        const commentNodes = this.ctx.nodeUtils.getNodeChildByCondition(sourceFile, (node) => (
            node.kind === ts.SyntaxKind.JSDocTag
            && (node as ts.JSDocTag).tagName.escapedText === 'namespace'
            // ^^^ is JSDoc namespace comment
        ));

        if (!commentNodes.length) {
            return;
        }

        const comments: NamespaceDeclaration[] = [];

        commentNodes.forEach((commentNode) => {
            // vvv constructing from node to ensure validation
            const comment = NamespaceDeclaration.constructFromNode(this.ctx, commentNode);

            if (comment) {
                comments.push(comment);
                this.declarationMap[comment.getNamespaceString()] = comment;
            }
        });

        this.fileToNamespaceMap[fileName] = comments;
    }

    refreshFileCache(fileName: string): void {
        const sourceFiles = this.getAllSourceFiles();
        const sourceFile = sourceFiles.find((s) => s.fileName === fileName);
        if (!sourceFile) {
            return;
        }

        this.refreshBySourceFile(sourceFile);
    }

    getReferencesByNamespace(namespace: string): NamespaceReference[] {
        if (!this.hasCachedAll) {
            // ^^^ force cache all if not yet
            this.cacheAllFiles();
        }

        return this.referenceMap[namespace] || [];
    }

    getDeclarationByNamespace(namespace: string): NamespaceDeclaration {
        if (!this.hasCachedAll) {
            // ^^^ force cache all if not yet
            this.cacheAllFiles();
        }

        return this.declarationMap[namespace];
    }

    getDiagnosticsByFile(fileName: string): ts.Diagnostic[] {
        const refsOrDecs = this.fileToNamespaceMap[fileName] || [];

        const diagnostics = refsOrDecs.reduce((
            acc: ts.Diagnostic[],
            refOrDec: NamespaceDeclaration | NamespaceReference
        ) => {
            if (refOrDec instanceof NamespaceDeclaration) {
                return acc;
            }

            const namespace = refOrDec.getNamespaceString();
            const declaration = this.getDeclarationByNamespace(namespace);
            const sourceFile = refOrDec.getNamespace()?.getSourceFile();
            if (!sourceFile) {
                return acc;
            }
            const textSpan = refOrDec.getNamespaceTextSpan();
            if (!textSpan) {
                return acc;
            }

            if (!declaration) {
                return [
                    ...acc,
                    {
                        category: ts.DiagnosticCategory.Warning,
                        file: sourceFile,
                        messageText: 'Such namespace is not declared',
                        code: 191919,
                        ...textSpan
                    }
                ];
            }

            const { config } = refOrDec;
            if (!config) {
                return acc;
            }
            if (config[FUNCTION_PLUGIN_TYPE]) {
                return acc;
            }

            const typeDiagnostics = [
                CLASS_PLUGIN_PROPERTY_TYPE,
                CLASS_PLUGIN_METHOD_TYPE,
                CLASS_PLUGIN_STATIC_TYPE
            ].reduce((acc: ts.Diagnostic[], type) => {
                const methodMap: Record<string, ts.Node> = config[type as ClassPluginTypes];

                const methodDiagnostics = Object.entries(methodMap).reduce(
                    (cAcc: ts.Diagnostic[], [methodName, referenceMethod]) => {
                        const methodDec = declaration.getNodeByTargetConfig({
                            type: type as ClassPluginTypes,
                            name: methodName
                        });

                        if (!methodDec) {
                            return [
                                ...cAcc,
                                {
                                    start: referenceMethod.getStart(),
                                    length: referenceMethod.getText().length,
                                    category: ts.DiagnosticCategory.Warning,
                                    file: sourceFile,
                                    code: 191920,
                                    messageText: 'Such method or property is not declared'
                                }
                            ];
                        }

                        return cAcc;
                    },
                    []
                );

                return [...acc, ...methodDiagnostics];
            }, []);

            return [...acc, ...typeDiagnostics];
        }, []);

        return diagnostics;
    }

    // vvv This code is not supported in current version of TS
    // + it is dependent on https://github.com/microsoft/TypeScript/issues/50300
    // and https://github.com/microsoft/TypeScript/issues/40824

    // getDeclarationInlayHintsForFile(fileName: string): ts.InlayHint[] {
    //     // Method hints hint on amount of plugins for this method
    //     const refsOrDecs = this.fileToNamespaceMap[fileName] || [];

    //     return refsOrDecs.reduce((acc, refOrDec) => {
    //         if (refOrDec instanceof NamespaceReference) {
    //             // ^^^ we only care about namespace declarations
    //             return acc;
    //         }

    //         const referenceNodes = refOrDec.getNodesByTargetConfig();
    //         const pluginHints = referenceNodes.reduce((acc, node) => {
    //             const nodeFileName = node.getSourceFile().fileName;
    //             if (nodeFileName !== fileName) {
    //                 return acc;
    //             }
    //             // ^^^ we only care about nodes in the same file
    //             const plugins = this.getReferencesByNamespace(refOrDec.getNamespaceString());
    //             if (!plugins.length) {
    //                 return acc;
    //             }

    //             let position = node.getEnd();

    //             if (ts.isPropertyDeclaration(node.parent)) {
    //                 position = node.parent.name.getEnd();
    //             }

    //             if (ts.isMethodDeclaration(node.parent)) {
    //                 const [closeParenToken] = this.ctx.nodeUtils.getNodeChildByCondition(
    //                     node.parent,
    //                     (n) => n.kind === ts.SyntaxKind.CloseParenToken
    //                 );

    //                 if (closeParenToken) {
    //                     position = closeParenToken.getEnd();
    //                 }
    //             }

    //             return [
    //                 ...acc,
    //                 {
    //                     text: `⬅ has ${plugins.length} plugin${plugins.length > 1 ? 's' : ''}`,
    //                     position,
    //                     kind: ts.InlayHintKind.Parameter,
    //                     whitespaceBefore: true
    //                 }
    //             ];
    //         }, [] as ts.InlayHint[]);

    //         return [
    //             ...acc,
    //             ...pluginHints
    //         ];
    //     }, [] as ts.InlayHint[]);
    // }
}
