import ts from 'typescript/lib/tsserverlibrary';

import { Cache } from './cache';
import { NamespaceDeclaration } from './declaration';
import {
    CLASS_PLUGIN_METHOD_TYPE,
    CLASS_PLUGIN_PROPERTY_TYPE,
    CLASS_PLUGIN_STATIC_TYPE,
    createNewPluginReferenceConfig,
    FUNCTION_PLUGIN_TYPE,
    PluginReferenceConfig,
    PluginTargetConfig,
} from './util/config';
import { Ctx } from './util/context';

export class NamespaceReference {
    node: ts.Node;

    ctx: Ctx;

    config: PluginReferenceConfig;

    namespace?: ts.Node;

    namespaceStringCache?: string;

    constructor(ctx: Ctx, node: ts.Node, config: PluginReferenceConfig) {
        this.node = node;
        this.ctx = ctx;
        this.config = config;
    }

    getNamespaceString(): string {
        if (this.namespaceStringCache) {
            return this.namespaceStringCache;
        }

        const namespace = this.getNamespace();

        if (!namespace) {
            return '';
        }

        // this removes all quotes
        const cached = namespace.getText().replace(/['"]/gm, '');
        this.namespaceStringCache = cached;

        return cached;
    }

    getNamespace(): ts.Node | undefined {
        if (this.namespace) {
            return this.namespace;
        }

        const [namespace] = this.ctx.nodeUtils.getNodeChildByCondition(
            this.node,
            (node) => ts.isStringLiteral(node) || ts.isIdentifier(node),
            1, // look for the first child only
        );

        this.namespace = namespace;

        return namespace;
    }

    getNamespaceTextSpan = (): ts.TextSpan | undefined => {
        if (!this.namespace) {
            return undefined;
        }

        const nIndex = this.namespace.getFullText().indexOf(this.namespace.getText());

        return {
            start: this.namespace.pos + nIndex,
            length: this.namespace.getText().length,
        };
    };

    getNamespaceReference(): ts.ReferenceEntry | undefined {
        const namespace = this.getNamespace();

        if (!namespace) {
            return undefined;
        }

        return this.ctx.nodeUtils.getReferenceForNode(
            namespace,
            this.getNamespaceTextSpan,
        );
    }

    getImplDecReferenceByTargetConfig(targetConfig: PluginTargetConfig): ts.ReferenceEntry | undefined {
        const node = this.getImplDecByTargetConfig(targetConfig);

        if (!node) {
            return undefined;
        }

        return this.ctx.nodeUtils.getReferenceForNode(node);
    }

    getImplDecByTargetConfig(targetConfig: PluginTargetConfig): ts.Node | undefined {
        const { type, name } = targetConfig;
        const lookupResult = this.config[type];

        if (!lookupResult) {
            return undefined;
        }

        if (type === FUNCTION_PLUGIN_TYPE) {
            return this.config[type];
        }

        return this.config[type][name];
    }

    getTargetConfigForNode(lookupNode: ts.Node): PluginTargetConfig | undefined {
        const classMethodEntry = Object.entries(this.config[CLASS_PLUGIN_METHOD_TYPE]).find(([_, node]) => node === lookupNode);

        if (classMethodEntry) {
            return { type: CLASS_PLUGIN_METHOD_TYPE, name: classMethodEntry[0] };
        }

        const classPropertyEntry = Object.entries(this.config[CLASS_PLUGIN_PROPERTY_TYPE]).find(([_, node]) => node === lookupNode);

        if (classPropertyEntry) {
            return { type: CLASS_PLUGIN_PROPERTY_TYPE, name: classPropertyEntry[0] };
        }

        const classStaticEntry = Object.entries(this.config[CLASS_PLUGIN_STATIC_TYPE]).find(([_, node]) => node === lookupNode);

        if (classStaticEntry) {
            return { type: CLASS_PLUGIN_STATIC_TYPE, name: classStaticEntry[0] };
        }

        if (lookupNode === this.config[FUNCTION_PLUGIN_TYPE]) {
            return { type: FUNCTION_PLUGIN_TYPE, name: 'unknown' };
        }

        return undefined;
    }

    // vvv PA = Proprty Assignment
    static constructFromKnownPANode(
        ctx: Ctx,
        namespacePANode: ts.Node,
    ): NamespaceReference | undefined {
        // We expect a property assignment,
        // which has another property assignment inside
        // which has an identifier (of member-* or function)

        const isPropertyAssignment = ts.isPropertyAssignment(namespacePANode);

        if (!isPropertyAssignment) {
            return undefined;
        }

        const pluginReferenceConfig = createNewPluginReferenceConfig();
        // ^^^ reset for each parent (previous was not correct)

        const pluginTypeDeclarations = ctx.nodeUtils.getNodeChildByCondition(namespacePANode, (typePANode) => {
            const isPropertyAssignment = ts.isPropertyAssignment(typePANode);

            if (!isPropertyAssignment) {
                return false;
            }

            const pluginTypeDeclarations = typePANode.getChildren().find((typeIdentifierNode) => {
                const isIdentifier = ts.isStringLiteral(typeIdentifierNode) || ts.isIdentifier(typeIdentifierNode);

                if (!isIdentifier) {
                    return false;
                }

                const typeIdentifier = typeIdentifierNode.getText().replace(/['"]/gm, '');

                if (typeIdentifier === FUNCTION_PLUGIN_TYPE) {
                    // ^^^ can only then be a function
                    pluginReferenceConfig[FUNCTION_PLUGIN_TYPE] = typeIdentifierNode;

                    return true;
                }

                if (
                    typeIdentifier === CLASS_PLUGIN_METHOD_TYPE
                    || typeIdentifier === CLASS_PLUGIN_PROPERTY_TYPE
                    || typeIdentifier === CLASS_PLUGIN_STATIC_TYPE
                ) {
                    // vvv lookup pNode for plugin implementation references
                    const childMethodAssignments = ctx.nodeUtils.getNodeChildByCondition(typePANode, (implementationPANode) => {
                        const isPropertyAssignment = ts.isPropertyAssignment(implementationPANode)
                            || ts.isShorthandPropertyAssignment(implementationPANode);

                        if (!isPropertyAssignment) {
                            return false;
                        }

                        const pluginImplementationDeclarationNodes = implementationPANode.getChildren().find((implementationDeclarationNode) => {
                            const isIdentifier = ts.isStringLiteral(implementationDeclarationNode)
                                || ts.isIdentifier(implementationDeclarationNode);

                            if (!isIdentifier) {
                                return false;
                            }

                            const implementationDeclaration = implementationDeclarationNode.getText().replace(/['"]/gm, '');
                            pluginReferenceConfig[typeIdentifier][implementationDeclaration] = implementationDeclarationNode;

                            return true;
                        });

                        return !!pluginImplementationDeclarationNodes;
                    }, 3, false);

                    return childMethodAssignments.length > 0;
                }

                return false;
            });

            if (!pluginTypeDeclarations) {
                return false;
            }

            return true;
        }, 3, false);

        const isTypeDeclarationsPresent = pluginTypeDeclarations.length > 0;

        if (!isTypeDeclarationsPresent) {
            return undefined;
        }

        return new NamespaceReference(ctx, namespacePANode, pluginReferenceConfig);
    }

    static constructFromNode(
        ctx: Ctx,
        node: ts.Node,
    ): NamespaceReference | undefined {
        const namespaceReference = this.constructFromKnownPANode(ctx, node);

        if (namespaceReference) {
            return namespaceReference;
        }

        const { parent } = node;

        if (!parent) {
            return undefined;
        }

        // vvv Try parent, if failed to construct from current node
        return this.constructFromNode(
            ctx,
            parent,
        );
    }
}

export const getNamespacePluginsReferences = (_ctx: Ctx, cache: Cache, comment: NamespaceDeclaration): ts.ReferencedSymbol[] => {
    const plugins = cache.getReferencesByNamespace(comment.getNamespaceString());
    const validPluginReferences: ts.ReferencedSymbol[] = [];

    plugins.forEach((plugin) => {
        const reference = plugin.getNamespaceReference();

        if (!reference) {
            return;
        }

        validPluginReferences.push({
            references: [reference],
            definition: {
                ...comment.getDefinition(),
                displayParts: comment.getDisplayParts(),
            },
        });
    });

    return validPluginReferences;
};

export const pluginNodeReferenceEntries = (ctx: Ctx, cache: Cache, node: ts.Node): ts.ReferenceEntry[] => {
    const references: ts.ReferenceEntry[] = [];

    const comment = NamespaceDeclaration.constructFromNode(ctx, node);

    if (!comment) {
        return references;
    }

    const targetConfig = comment.getTargetConfigForNode(node);

    if (!targetConfig) {
        return references;
    }
    const plugins = cache.getReferencesByNamespace(comment.getNamespaceString());

    if (!plugins.length) {
        return references;
    }

    plugins.forEach((plugin) => {
        const reference = plugin.getImplDecReferenceByTargetConfig(targetConfig);

        if (!reference) {
            return;
        }

        references.push(reference);
    });

    return references;
};

export const implementationNodeReferenceEntries = (ctx: Ctx, cache: Cache, node: ts.Node): ts.ReferenceEntry[] => {
    const references: ts.ReferenceEntry[] = [];
    const plugin = NamespaceReference.constructFromNode(ctx, node);

    if (!plugin) {
        return references;
    }
    const namespace = plugin.getNamespaceString();

    if (!namespace) {
        return references;
    }
    const nsDeclaration = cache.getDeclarationByNamespace(namespace);

    if (!nsDeclaration) {
        return references;
    }
    const targetConfig = plugin.getTargetConfigForNode(node);

    let reference;

    if (!targetConfig) {
        const isNamespaceNode = node.getText().indexOf(namespace) !== -1;

        if (!isNamespaceNode) {
            return references;
        }
        reference = nsDeclaration.getNamespaceReference();
    } else {
        const nodeToReference = nsDeclaration.getNodeByTargetConfig(targetConfig);

        if (!nodeToReference) {
            return references;
        }
        reference = ctx.nodeUtils.getReferenceForNode(nodeToReference);
    }

    if (!reference) {
        return references;
    }

    references.push(reference);

    return references;
};
