/**
 * Insert namespace decorator comment before the appropriate node
 * @param {Fixer} fixer
 * @param {Node} node
 * @param {Context} context
 * @param {string} namespace
 */
module.exports = (fixer, node, context, namespace) => {
    const { leadingComments = [] } = node;
    if (leadingComments.find(comment => comment.value.includes('@namespace'))) {
        return null;
    }

    const blockComment = leadingComments.reverse().find(
         comment => comment.type === 'Block' && !['eslint-disable-next-line', '@license'].some(cond => comment.value.includes(cond))
    );
    const lineComment = leadingComments.reverse().find(
        ({ type }) => type === 'Line'
    );
    const eslintComment = leadingComments.find(
        comment => comment.value.includes('eslint-disable-next-line')
    );

    if (blockComment) {
        return fixer.replaceText(
            blockComment,
            '/*' + blockComment.value.concat(`* @namespace ${namespace}`) + '\n */'
        );
    }
    if (eslintComment) {
        return fixer.insertTextBefore(eslintComment, `/** @namespace ${namespace} */\n`);
    }

    return fixer.insertTextBefore(
        node,
        `${
            context.getSourceCode().text[node.start - 1] === '(' ? '\n' : ''
        }/** @namespace ${namespace} */\n`
    );
}
