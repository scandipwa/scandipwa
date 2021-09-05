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

import { Field } from '@tilework/opus';

/**
 * @namespace Query/CmsPage
 */
export class CmsPageQuery {
    /**
     * get CMS Page query
     */
    static getQuery({ id, identifier }: { id: string, identifier: string }) {
        if (!id && !identifier) {
            throw new Error('Missing argument `id`!');
        }

        const cmsPage = new Field('cmsPage')
            .addFieldList(CmsPageQuery.getPageFields());

        if (identifier) {
            cmsPage.addArgument('identifier', 'String!', identifier);
        } else if (id) {
            cmsPage.addArgument('id', 'Int!', id);
        }

        return cmsPage;
    }

    static getPageFields() {
        return [
            'title',
            'content',
            'page_width',
            'content_heading',
            'meta_title',
            'meta_description',
            'meta_keywords'
        ] as const;
    }
}
