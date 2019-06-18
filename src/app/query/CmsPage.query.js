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
 * CMS Page Query
 * @class CmsPageQuery
 */
class CmsPageQuery {
    /**
     * get CMS Page query
     * @param  {{url_key: String, title: Int, content: String, content_heading: String, page_layout: String, meta_title: String, meta_description: String, meta_keywords, string}} options A object containing different aspects of query, each item can be omitted
     * @return {Query} CMS Page query
     * @memberof CmsPageQuery
     */
    getQuery(options) {
        if (!options) throw 'Missing argument `options`';
        const items = this._prepareFields(options);
        const { id } = options;

        return new Field('cmsPage')
            .addArgument('url_key', 'String!', id)
            .addFieldList(items);
    }

    /**
     * Prepare argument map
     * @param  {{url_key: String, id: Int}} options A object containing different aspects of query, each item can be omitted
     * @return {Object}
     * @memberof ProductListQuery
     */
    _prepareArgumentList(options) {
        const {
            id,
            url_key
        } = options;

        const argumentMap = {};
        if (id) argumentMap.id = id;
        if (url_key) argumentMap.url_key = url_key;

        return argumentMap;
    }

    /**
     * Prepare fields for the CMS Page
     */
    _prepareFields(options) {
        const defaultFields = [
            'title',
            'content',
            'content_heading',
            'meta_title',
            'meta_description',
            'meta_keywords'
        ];
        let fields = defaultFields;

        if (options.fields) {
            fields = [...new Set(defaultFields.concat(options.fields))];
        }

        return fields;
    }
}

export { CmsPageQuery };

export default new CmsPageQuery();
