import ts from 'typescript/lib/tsserverlibrary';

export class NodeUtils {
    info: ts.server.PluginCreateInfo;

    constructor(info: ts.server.PluginCreateInfo) {
        this.info = info;
    }

    getClassNodeHeritage(node: ts.ClassDeclaration): ts.ClassDeclaration[] {
        if (!node.heritageClauses) {
            return [node];
        }

        const extendsHeritageClauses = node.heritageClauses.filter((heritageClause) => (
            heritageClause.token === ts.SyntaxKind.ExtendsKeyword
            && heritageClause.types.length > 0
        ));

        return extendsHeritageClauses.reduce(
            (
                acc: ts.ClassDeclaration[],
                extendsHeritageClause: ts.HeritageClause,
            ) => {
                const identifierPosition = extendsHeritageClause.types[0].getStart();
                const classDefinitions = this.info.languageService.getDefinitionAtPosition(
                    node.getSourceFile().fileName,
                    identifierPosition,
                );

                if (!classDefinitions || classDefinitions.length <= 0) {
                    return acc;
                }

                const [classDefintion] = classDefinitions;

                const definitionNode = this.getFileNodeAtPosition(
                    classDefintion.fileName,
                    classDefintion.textSpan.start,
                );

                if (!definitionNode) {
                    return acc;
                }

                const classDeclaration = this.getParentNodeByCondition(
                    definitionNode,
                    (node) => ts.isClassDeclaration(node),
                );

                if (!classDeclaration || !ts.isClassDeclaration(classDeclaration)) {
                    return acc;
                }

                return [...acc, ...this.getClassNodeHeritage(classDeclaration)];
            },
            [node] as ts.ClassDeclaration[],
        );
    }

    getSourceFile(fileName: string): ts.SourceFile | undefined {
        const program = this.info.project.getLanguageService().getProgram();

        return program ? program.getSourceFile(fileName) : undefined;
    }

    getFileNodeAtPosition(fileName: string, position: number): ts.Node | undefined {
        const sourceFile = this.getSourceFile(fileName);

        if (!sourceFile) {
            return undefined;
        }

        const find = (node: ts.Node): ts.Node | undefined => {
            if (position >= node.pos && position < node.end) {
                for (let i = 0; i < node.getChildren().length; i++) {
                    const childNode = node.getChildren()[i];
                    const foundNode = find(childNode);

                    if (foundNode) {
                        return foundNode;
                    }
                }

                return node;
            }

            return undefined;
        };

        return find(sourceFile);
    }

    getParentNodeByCondition(
        node: ts.Node,
        cond: (n: ts.Node) => boolean,
        includeInitial = true,
    ): ts.Node | undefined {
        if (!node) {
            return undefined;
        }

        if (includeInitial && cond(node)) {
            return node;
        }

        const { parent } = node;

        if (parent && cond(parent)) {
            return parent;
        }

        return this.getParentNodeByCondition(parent, cond, false);
    }

    getNodeChildByCondition(
        node: ts.Node,
        cond: (n: ts.Node) => boolean,
        maxDepth: number = Number.POSITIVE_INFINITY,
        validateNode = true,
    ): ts.Node[] {
        const result: ts.Node[] = [];

        const find = (node: ts.Node, depth: number, validateNode: boolean) => {
            if (depth > maxDepth) {
                return;
            }
            // ^^^ ignore nodes without source file ?

            if (validateNode && cond(node)) {
                result.push(node);
            } else {
                if (!node.getSourceFile()) {
                    return;
                }

                for (let i = 0; i < node.getChildren().length; i++) {
                    find(node.getChildren()[i], depth + 1, true);
                }
            }
        };

        find(node, 0, validateNode);

        return result;
    }

    getFileNodesByCondition(fileName: string, cond: (n: ts.Node) => boolean): ReadonlyArray<ts.Node> {
        const sourceFile = this.getSourceFile(fileName);

        if (!sourceFile) {
            return [];
        }

        return this.getNodeChildByCondition(sourceFile, cond);
    }

    getTextSpanForNode(node: ts.Node): ts.TextSpan | undefined {
        const nIndex = node.getFullText().indexOf(node.getText());

        if (!nIndex) {
            return {
                start: node.pos,
                length: node.end - node.pos,
            };
        }

        return {
            start: node.pos + nIndex,
            length: node.getText().length,
        };
    }

    getReferenceForNode(
        node: ts.Node,
        textSpanGetter: (node: ts.Node) => ts.TextSpan | undefined = this.getTextSpanForNode,
    ): ts.ReferenceEntry | undefined {
        const textSpan = textSpanGetter(node);

        if (!textSpan) {
            return undefined;
        }

        return {
            textSpan,
            fileName: node.getSourceFile().fileName,
            isWriteAccess: true, // TODO: get if this plugin is editable
            isDefinition: false
        };
    }
}
