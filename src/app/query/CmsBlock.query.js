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
 * @namespace Query/CmsBlock
 */
export class CmsBlockQuery {
    /**
     * get CMS Block query
     * @param  {{identifier: String, title: String, content: String}} options A object containing different aspects of query, each item can be omitted
     * @return {Field} CMS Block query
     * @memberof CmsBlocksQuery
     */
    getQuery({ identifiers }) {
        if (!identifiers) {
            throw new Error('Missing argument `options`');
        }

        return new Field('cmsBlocks')
            .addArgument('identifiers', '[String]', identifiers)
            .addField(this._getItemsField())
            .setAlias('cmsBlocks');
    }

    _getItemFields() {
        return [
            'title',
            'content',
            'identifier',
            'disabled'
        ];
    }

    _getItemsField() {
        return new Field('items')
            .addFieldList(this._getItemFields());
    }
}

export default new CmsBlockQuery();
