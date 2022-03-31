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

import { CmsPage } from './Query.type';

/**
 * CMS Page Query
 * @class CmsPageQuery
 * @namespace Query/CmsPage/Query */
export class CmsPageQuery {
    getQuery({ id, url_key, identifier }: CmsPage): Field {
        if (!id && !url_key && !identifier) {
            throw new Error('Missing argument `id` or `url_key`!');
        }

        const cmsPage = new Field('cmsPage')
            .addFieldList(this._getPageFields());

        if (identifier) {
            cmsPage.addArgument('identifier', 'String!', identifier);
        } else if (id) {
            cmsPage.addArgument('id', 'Int!', id);
        }

        return cmsPage;
    }

    _getPageFields(): string[] {
        return [
            'title',
            'content',
            'page_width',
            'content_heading',
            'meta_title',
            'meta_description',
            'meta_keywords'
        ];
    }
}

export default new CmsPageQuery();
