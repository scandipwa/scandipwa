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

import { DataType, Field, Query } from '@tilework/opus';

/**
 * CMS Blocks Query
 * @namespace Query/CmsBlock/Query
 */
export class CmsBlockQuery {
    /**
     * get CMS Block query
     */
    static getQuery({ identifiers }: { identifiers: string[] }) {
        if (!identifiers) {
            throw new Error('Missing argument `options`');
        }

        return new Query('cmsBlocks')
            .addArgument('identifiers', '[String]', identifiers)
            .addField(CmsBlockQuery.getItemsField())
            .setAlias('cmsBlocks');
    }

    static getItemFields() {
        return [
            'title',
            'content',
            'identifier',
            'disabled'
        ] as const;
    }

    static getItemsField() {
        return new Field('items')
            .addFieldList(CmsBlockQuery.getItemFields());
    }
}

export type CmsBlockQueryData = DataType<ReturnType<typeof CmsBlockQuery.getQuery>>
