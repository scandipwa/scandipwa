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

import { Field, Query } from '@tilework/opus';

import { GQLCmsBlock, GQLCmsBlocks } from 'Type/Graphql.type';

/**
 * CMS Blocks Query
 * @class CmsBlocksQuery
 * @namespace Query/CmsBlock/Query */
export class CmsBlockQuery {
    /**
     * get CMS Block query
     * @param  {{identifier: String, title: String, content: String}} options A object containing different aspects of query, each item can be omitted
     * @return {Field} CMS Block query
     * @memberof CmsBlocksQuery
     */
    getQuery({ identifiers }: { identifiers: string[] }): Query<'cmsBlocks', GQLCmsBlocks & {
        items: GQLCmsBlock[];
    }> {
        if (!identifiers) {
            throw new Error('Missing argument `options`');
        }

        return new Query<'cmsBlocks', GQLCmsBlocks>('cmsBlocks')
            .addArgument('identifiers', '[String]', identifiers)
            .addField(this._getItemsField());
    }

    _getItemFields(): string[] {
        return [
            'title',
            'content',
            'identifier',
            'disabled'
        ];
    }

    _getItemsField(): Field<'items', GQLCmsBlock, true> {
        return new Field<'items', GQLCmsBlock, true>('items', true)
            .addFieldList(this._getItemFields());
    }
}

export default new CmsBlockQuery();
