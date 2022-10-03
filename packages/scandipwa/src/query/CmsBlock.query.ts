/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { Field, Query } from '@tilework/opus';

import { CmsBlock, CmsBlocks } from './CmsBlock.type';

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
    getQuery({ identifiers }: { identifiers: string[] }): Query<'cmsBlocks', CmsBlocks> {
        if (!identifiers) {
            throw new Error('Missing argument `options`');
        }

        return new Query<'cmsBlocks', CmsBlocks>('cmsBlocks')
            .addArgument('identifiers', '[String]', identifiers)
            .addField(this._getItemsField());
    }

    _getItemFields(): Array<
    Field<'title', string>
    | Field<'content', string>
    | Field<'identifier', string>
    | Field<'disabled', boolean>
    > {
        return [
            new Field<'title', string>('title'),
            new Field<'content', string>('content'),
            new Field<'identifier', string>('identifier'),
            new Field<'disabled', boolean>('disabled'),
        ];
    }

    _getItemsField(): Field<'items', CmsBlock, true> {
        return new Field<'items', CmsBlock, true>('items', true)
            .addFieldList(this._getItemFields());
    }
}

export default new CmsBlockQuery();
