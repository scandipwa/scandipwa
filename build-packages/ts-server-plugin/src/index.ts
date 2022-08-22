/* eslint-disable no-restricted-syntax */
import ts from 'typescript/lib/tsserverlibrary';

import { Cache } from './cache';
import { handleReferenceCompletions } from './completions';
import { getCommentAtPosition } from './declaration';
import {
    getNamespacePluginsReferences,
    implementationNodeReferenceEntries,
    pluginNodeReferenceEntries
} from './reference';
import { Ctx } from './util/context';
import { getAllThemeFiles } from './util/parent-theme';

function init(): ts.server.PluginModule {
    function create(info: ts.server.PluginCreateInfo) {
        const ctx = new Ctx(info);
        const cache = new Cache(ctx);

        // Diagnostic logging
        info.project.projectService.logger.info(
            "I'm getting set up now! Check the log for this message."
        );

        // ============================

        // Set up decorator object
        const proxy: ts.LanguageService = Object.create(null);
        for (const k of Object.keys(info.languageService) as Array<keyof ts.LanguageService>) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const x = info.languageService[k]!;
            // @ts-expect-error - JS runtime trickery which is tricky to type tersely
            // eslint-disable-next-line @typescript-eslint/ban-types
            proxy[k] = (...args: Array<{}>) => x.apply(info.languageService, args);
        }

        // eslint-disable-next-line arrow-body-style
        // proxy.provideInlayHints = (fileName: string, span: ts.TextSpan): ts.InlayHint[] => {
        //     // vvv Ignore original inline hints
        //     // eslint-disable-next-line arrow-body-style
        //     return cache.getDeclarationInlayHintsForFile(fileName).filter((inlayHint) => {
        //         return inlayHint.position > span.start && inlayHint.position < span.start + span.length;
        //     });
        // };

        proxy.getSemanticDiagnostics = (fileName: string): ts.Diagnostic[] => {
            const diagnostics = info.languageService.getSemanticDiagnostics(fileName);
            cache.refreshFileCache(fileName);
            return [...diagnostics, ...cache.getDiagnosticsByFile(fileName)];
        };

        proxy.findReferences = (fileName: string, position: number): ts.ReferencedSymbol[] | undefined => {
            const prior = info.languageService.findReferences(fileName, position);

            const comment = getCommentAtPosition(ctx, fileName, position);
            if (comment) {
                return getNamespacePluginsReferences(ctx, cache, comment);
            }

            if (!prior) {
                return undefined;
            }

            const additionalReferences: ts.ReferencedSymbol[] = [];

            for (let i = 0; i < prior.length; i++) {
                const { definition } = prior[i];
                const node = ctx.nodeUtils.getFileNodeAtPosition(
                    definition.fileName,
                    definition.textSpan.start
                );

                if (!node) {
                    // eslint-disable-next-line no-continue
                    continue;
                }

                const definitionReferences = [
                    ...pluginNodeReferenceEntries(ctx, cache, node),
                    ...implementationNodeReferenceEntries(ctx, cache, node)
                ];

                definitionReferences.forEach((reference) => {
                    additionalReferences.push({
                        definition,
                        references: [reference]
                    });
                });
            }

            return [...prior, ...additionalReferences];
        };

        proxy.getDefinitionAndBoundSpan = (fileName: string, position: number, ...rest): ts.DefinitionInfoAndBoundSpan | undefined => {
            const prior = info.languageService.getDefinitionAndBoundSpan(fileName, position, ...rest);

            const comment = getCommentAtPosition(ctx, fileName, position);
            if (!comment) {
                return prior;
            } // <-- this is not a comment, skip

            return {
                textSpan: comment.getTextSpan(),
                definitions: [comment.getDefinition()]
            };
        };

        proxy.getCompletionsAtPosition = (
            fileName: string,
            position: number,
            ...rest
        ): ts.WithMetadata<ts.CompletionInfo> | undefined => {
            const prior = info.languageService.getCompletionsAtPosition(fileName, position, ...rest);
            return handleReferenceCompletions(fileName, position, prior, ctx, cache);
        };

        return proxy;
    }

    function getExternalFiles(project: ts.server.Project): string[] {
        const themeFiles = getAllThemeFiles(project.getCurrentDirectory()).sort(
            (a, b) => (a.length - b.length)
            // ^^^ Sort by length to put index files first
        );

        project.projectService.logger.info(
            `Adding following files as external: ${themeFiles.join(', ')}`
        );

        return themeFiles;
    }

    return { create, getExternalFiles };
}

export = init;
