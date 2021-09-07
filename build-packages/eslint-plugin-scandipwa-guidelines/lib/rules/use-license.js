/**
* @fileoverview Provide license comments!
* @author Jegors Batovs
*/

const licenseComment = `
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */
`;

module.exports = {
	meta: {
		docs: {
			description: 'Do not forget to provide license comments!',
			category: 'Coding standard',
			recommended: false,
		},
		fixable: 'code'
	},

	create: (context) => ({
		Program(node) {
			const comments = context.getSourceCode().getAllComments();

			if (!comments.find(comment => comment.value.includes('@license'))) {
				context.report({
					node,
					message: 'Provide license comments!',
					fix: fixer => fixer.insertTextBefore(node, licenseComment)
				});
			}
		}
	}),
};
