/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */

import { Field, Query } from '@tilework/opus';

import { CmsPageFields, CmsPageQueryOptions } from './CmsPage.type';

/**
 * CMS Page Query
 * @class CmsPageQuery
 * @namespace Query/CmsPage/Query */
export class CmsPageQuery {
    getQuery({ id, url_key, identifier }: Partial<CmsPageQueryOptions>): Query<'cmsPage', CmsPageFields> {
        if (!id && !url_key && !identifier) {
            throw new Error('Missing argument `id` or `url_key`!');
        }

        const cmsPage = new Query<'cmsPage', CmsPageFields>('cmsPage')
            .addFieldList(this._getPageFields());

        if (identifier) {
            cmsPage.addArgument('identifier', 'String!', identifier);
        } else if (id) {
            cmsPage.addArgument('id', 'Int!', id);
        }

        return cmsPage;
    }

    _getPageFields(): Array<
    Field<'title', string>
    | Field<'content', string>
    | Field<'page_width', string>
    | Field<'content_heading', string>
    | Field<'meta_title', string>
    | Field<'meta_description', string>
    | Field<'meta_keywords', string>
    > {
        return [
            new Field<'title', string>('title'),
            new Field<'content', string>('content'),
            new Field<'page_width', string>('page_width'),
            new Field<'content_heading', string>('content_heading'),
            new Field<'meta_title', string>('meta_title'),
            new Field<'meta_description', string>('meta_description'),
            new Field<'meta_keywords', string>('meta_keywords')
        ];
    }
}

export default new CmsPageQuery();
