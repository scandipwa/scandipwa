/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENCE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { Field } from 'Util/Query';

/**
 * Category Query
 * @class CategoryQuery
 */
class CategoryQuery {
    /**
     * get Category query
     * @param  {{categoryUrlPath: String, currentPage: Number, customFilters: Object, getConfigurableData: Boolean, getSubCategories: Boolean, pageSize: Number, previousPage: Boolean, priceRange: Object, productsLoaded: Boolean, sortDirection: String, sortKey: String}} options A object containing different aspects of query, each item can be omitted
     * @return {Field} Category query
     * @memberof CategoryQuery
     */
    getQuery(options) {
        const { categoryUrlPath } = options;
        const categoryFields = this._prepareChildrenFields();
        const children = new Field('children').addFieldList(categoryFields);

        const field = new Field('category')
            .addArgument('url_path', 'String!', categoryUrlPath)
            .addFieldList(categoryFields)
            .addField(children);

        return field;
    }

    /**
     * Prepare Children Fields of any category
     * @return {Array<Field|String>}
     * @memberof Category
     */
    _prepareChildrenFields() {
        const breadcrumbs = new Field('breadcrumbs')
            .addFieldList(['category_name', 'category_url_key', 'category_level']);

        return [
            'id', 'name', 'description', 'url_path',
            'image', 'url_key', 'product_count',
            'meta_title', 'meta_description', breadcrumbs
        ];
    }
}

export default new CategoryQuery();
