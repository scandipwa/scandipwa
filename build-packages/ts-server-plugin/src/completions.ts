import ts from 'typescript/lib/tsserverlibrary';

import { Cache } from './cache';
import {
    CLASS_PLUGIN_METHOD_TYPE, CLASS_PLUGIN_PROPERTY_TYPE, CLASS_PLUGIN_STATIC_TYPE, FUNCTION_PLUGIN_TYPE
} from './util/config';
import { Ctx } from './util/context';

const NS_DECLARATION = 3;
const TYPE_DECLARATION = 5;
const METHOD_DECLARATION = 7;

type SupportedCompletionDepths =
    typeof NS_DECLARATION
    | typeof TYPE_DECLARATION
    | typeof METHOD_DECLARATION;

const getNodeParentOfLevel = (node: ts.Node, level: number): undefined | ts.Node => {
    if (level === 0) {
        return node;
    }

    const { parent } = node;

    if (!parent) {
        return undefined;
    }

    return getNodeParentOfLevel(parent, level - 1);
};

const getExportDepth = (node: ts.Node, accDepth = 0): number => {
    if (ts.isExportAssignment(node)) {
        return accDepth;
    }

    if (!node.parent) {
        return -1;
    }

    return getExportDepth(node.parent, accDepth + 1);
};

type CompletionStringsGetter = () => string[];

export const getCompletionStringsForNode = (
    node: ts.Node,
    _ctx: Ctx,
    cache: Cache
): string[] => {
    const exportDepth = getExportDepth(node);

    const completionMap: Record<SupportedCompletionDepths, CompletionStringsGetter> = {
        [NS_DECLARATION]: () => (
            // vvv Return all namespaces
            Object.keys(cache.declarationMap)
        ),
        [TYPE_DECLARATION]: () => {
            // vvv Get namespace type by name, suggest types
            const nsPA = getNodeParentOfLevel(node, 3);

            if (!nsPA) {
                return [];
            }

            const namespace = nsPA.getChildAt(0).getText().replace(/['"]/gm, '');
            const declaration = cache.declarationMap[namespace];

            if (!declaration) {
                return [];
            }

            const { isFunctionDeclaration } = declaration;

            return isFunctionDeclaration
                ? [FUNCTION_PLUGIN_TYPE]
                : [
                    CLASS_PLUGIN_PROPERTY_TYPE,
                    CLASS_PLUGIN_METHOD_TYPE,
                    CLASS_PLUGIN_STATIC_TYPE
                ];
        },
        [METHOD_DECLARATION]: () => {
            // vvv Suggest class methods / properties
            const nsPA = getNodeParentOfLevel(node, 5);

            if (!nsPA) {
                return [];
            }

            const namespace = nsPA.getChildAt(0).getText().replace(/['"]/gm, '');
            const declaration = cache.declarationMap[namespace];

            if (!declaration) {
                return [];
            }

            const { isFunctionDeclaration } = declaration;

            if (isFunctionDeclaration) {
                return [];
            }

            const typePA = getNodeParentOfLevel(node, 3);

            if (!typePA) {
                return [];
            }

            const type = typePA.getChildAt(0).getText().replace(/['"]/gm, '');

            if (
                type !== CLASS_PLUGIN_PROPERTY_TYPE
                && type !== CLASS_PLUGIN_METHOD_TYPE
                && type !== CLASS_PLUGIN_STATIC_TYPE
            ) {
                return [];
            }

            const nodes = declaration.getNodesByTargetConfig({ type });
            const names = nodes.map((n) => n.getText());
            return names;
        }
    };

    const completionStringsGetter: CompletionStringsGetter = completionMap[exportDepth as SupportedCompletionDepths] || (() => ([]));

    return completionStringsGetter();
};

export const handleReferenceCompletions = (
    fileName: string,
    position: number,
    prior: ts.WithMetadata<ts.CompletionInfo> | undefined,
    ctx: Ctx,
    cache: Cache
): ts.WithMetadata<ts.CompletionInfo> | undefined => {
    if (!fileName.includes('.plugin')) {
        // ^^^ only process plugin files
        return prior;
    }

    const completionNode = ctx.nodeUtils.getFileNodeAtPosition(
        fileName,
        position - 1
        // ^^^ Get one before
    );

    if (
        !completionNode
        || !completionNode.parent
        || !(
            // vvv We expect to see PA
            ts.isPropertyAssignment(completionNode.parent)
            || ts.isShorthandPropertyAssignment(completionNode.parent)
        )
    ) {
        // We only care about strings, part of PA
        return prior;
    }

    const completions = getCompletionStringsForNode(completionNode, ctx, cache);
    const completionEntries: ts.CompletionEntry[] = completions.map((completion) => ({
        name: completion,
        kind: ts.ScriptElementKind.constElement,
        sortText: '1'
    }));

    if (prior) {
        prior.entries.push(...completionEntries);
        return prior;
    }

    return {
        isGlobalCompletion: false,
        isMemberCompletion: false,
        isNewIdentifierLocation: true,
        entries: completionEntries
    };
};
