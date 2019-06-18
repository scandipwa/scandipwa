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

import { Field } from 'Util/Query';

/**
 * CMS Blocks Query
 * @class CmsBlocksQuery
 */
class CmsBlockQuery {
    /**
     * get CMS Block query
     * @param  {{identifier: String, title: String, content: String}} options A object containing different aspects of query, each item can be omitted
     * @return {Field} CMS Block query
     * @memberof CmsBlocksQuery
     */
    getQuery(options) {
        if (!options) throw 'Missing argument `options`';
        const items = CmsBlockQuery._prepareFields(options);

        return new Field('cmsBlocks')
            .addArgument('identifiers', '[String]', options.identifiers)
            .addField(items)
            .setAlias('cmsBlocks');
    }

    /**
     * Prepare fields for the CMS Block
     */
    static _prepareFields(options) {
        const defaultFields = ['title', 'content'];
        let fields = defaultFields;

        if (options.fields) {
            fields = [...new Set(defaultFields.concat(options.fields))];
        }

        return new Field('items').addFieldList(fields);
    }
}

export { CmsBlockQuery };

export default new CmsBlockQuery();
