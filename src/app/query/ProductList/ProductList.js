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

import { Field, Fragment } from 'Util/Query';

/**
 * Product List Query
 * @class ProductListQuery
 */
class ProductListQuery {
    /**
     * get ProductList query
     * @param  {{search: String, categoryIds: Array<String|Number>, productUrlPath: String, categoryUrlPath: String, activePage: Number, priceRange: {min: Number, max: Number}, sortKey: String, sortDirection: String, productPageSize: Number, customFilters: Object}} options A object containing different aspects of query, each item can be omitted
     * @return {Query} ProductList query
     * @memberof ProductListQuery
     */
    getQuery(options) {
        if (!options) throw new Error('Missing argument `options`');

        const args = this._prepareArgumentList(options);
        const items = this._prepareItemsField(options);
        const sortFields = this._prepareSortFields();
        const filters = this._prepeareFiltersField();

        const field = new Field('products')
            .addArgument('currentPage', 'Int!', args.currentPage)
            .addArgument('pageSize', 'Int!', args.pageSize)
            .addArgument('filter', 'ProductFilterInput!', args.filter)
            .addField('total_count')
            .addField(items);

        if (args.sort) field.addArgument('sort', 'ProductSortInput', args.sort);
        if (args.search) field.addArgument('search', 'String', args.search);

        // do not load sort and filter fields if this is next page load
        if (!options.isNextPage) field.addField(sortFields).addField(filters);

        return field;
    }

    /**
     * Prepare argument map
     * @param  {{isSingleProduct: Boolean, search: String, productUrlPath: String, categoryIds: Array<String|Number>, categoryUrlPath: String, activePage: Number, priceRange: {min: Number, max: Number}, sortKey: String, sortDirection: String, productPageSize: Number, customFilters: Object}} options A object containing different aspects of query, each item can be omitted
     * @return {Object}
     * @memberof ProductListQuery
     */
    _prepareArgumentList(options) {
        const {
            search,
            categoryIds,
            categoryUrlPath,
            priceRange,
            productsSkuArray,
            sortKey,
            sortDirection,
            pageSize,
            currentPage,
            productUrlPath,
            customFilters
        } = options;

        const argumentMap = {};

        const areCustomFiltersPresent = customFilters ? Object.keys(customFilters).length : false;

        if (categoryIds
            || categoryUrlPath
            || priceRange
            || productsSkuArray
            || productUrlPath
            || areCustomFiltersPresent
            || search
        ) {
            // TODO: rewrite when argument will be allowed not to be Strings only
            const filterList = [];

            const pushToList = (value, formatted) => {
                if (typeof value === 'object') {
                    if (Object.keys(value).length) {
                        filterList.push(formatted);
                    }
                } else if (value) {
                    filterList.push(formatted);
                }
            };

            pushToList(categoryIds, `category_id: { eq: ${categoryIds} }`);
            // TODO: Bring back when backend will be fixed
            pushToList(categoryUrlPath, `category_url_path: { eq: ${categoryUrlPath} }`);
            if (priceRange) pushToList(priceRange.min, `min_price: { gteq: ${priceRange.min} }`);
            if (priceRange) pushToList(priceRange.max, `max_price: { lteq: ${priceRange.max} }`);
            pushToList(productsSkuArray, `sku: { in: [${productsSkuArray}] }`);
            pushToList(productUrlPath, `url_key: { eq: ${productUrlPath}}`);
            pushToList(customFilters, this._getCustomAttributeFilters(customFilters));

            argumentMap.filter = `{${filterList.join(',')}}`;
        }

        argumentMap.pageSize = pageSize || 12; // TODO: move this hard-coded value to config
        argumentMap.currentPage = currentPage || 1;
        if (search) argumentMap.search = search;
        if (sortKey) argumentMap.sort = `{${sortKey}: ${sortDirection || 'ASC'}}`;

        return argumentMap;
    }

    /**
     * Prepare custom attribute filter queries
     * @param {Object} customFilters
     * @return {String}
     */
    _getCustomAttributeFilters(customFilters = {}) {
        return Object.keys(customFilters).map((key) => {
            const attribute = customFilters[key];
            if (attribute.length) return `${key}: { in: [ ${attribute.join(',')} ] } `;
        }).join(',');
    }

    /**
     * Prepare `filters` field (child of `items` field)
     * @private
     * @return {Field}
     * @memberof ProductListQuery
     */
    _prepareItemsFiltersField() {
        const filterItems = new Field('filter_items')
            .addField('label')
            .addField('value_string');

        return new Field('filters')
            .addField('name')
            .addField('request_var')
            .addField(filterItems);
    }

    /**
     * Prepare `categories` field (child of `items` field)
     * @private
     * @return {Field}
     * @memberof ProductListQuery
     */
    _prepareItemsCategoriesField() {
        const breadcrumbs = new Field('breadcrumbs')
            .addFieldList(['category_name', 'category_url_key']);

        return new Field('categories')
            .addField('name')
            .addField('url_path')
            .addField(breadcrumbs);
    }

    /**
     * Prepare `price` field (child of `items` field)
     * @private
     * @return {Field}
     * @memberof ProductListQuery
     */
    _prepareItemsPriceField() {
        const amount = new Field('amount').addFieldList(['value', 'currency']);
        const regularPrice = new Field('regularPrice').addField(amount);
        const minimalPrice = new Field('minimalPrice').addField(amount);

        return new Field('price').addFieldList([regularPrice, minimalPrice]);
    }

    /**
     * Prepare `image`, `small_image`, `thumbnail` and related labels. (child of `items` field)
     * @private
     * @param  {{isSingleProduct: Boolean, search: String, categoryIds: Array<String|Number>, categoryUrlPath: String, activePage: Number, priceRange: {min: Number, max: Number}, sortKey: String, sortDirection: String, productPageSize: Number}} options A object containing different aspects of query, each item can be omitted
     * @return {Array<String>} Prepared field strings for image types
     * @memberof ProductListQuery
     */
    _prepareImageFields(options) {
        const images = [
            new Field('thumbnail').addField('url').addField('label'),
            new Field('small_image').addField('url').addField('label')
        ];
        if (options.isSingleProduct) images.push(new Field('image').addField('url').addField('label'));
        return images;
    }

    /**
     * Prepare configurable product data
     * @private
     * @param  {{getConfigurableData: Boolean}} options A object containing different aspects of query, each item can be omitted
     * @return {Array<String>} Array of prepared SKU id's
     * @memberof ProductListQuery
     */
    _prepareConfigurableData(options) {
        let data = ['type_id'];

        if (options.getConfigurableData) {
            const values = new Field('values')
                .addField('value_index')
                .addField('label');

            const configurableOptions = new Field('configurable_options')
                .addField('id')
                .addField('label')
                .addField('attribute_code')
                .addField(values);

            const amount = new Field('amount')
                .addField('value')
                .addField('currency');

            const regularPrice = new Field('regularPrice')
                .addField(amount);

            const minimalPrice = new Field('minimalPrice')
                .addField(amount);

            const price = new Field('price')
                .addField(regularPrice)
                .addField(minimalPrice);

            const mediaGallery = new Field('media_gallery_entries')
                .addField('id')
                .addField('file');

            const product = new Field('product')
                .addField('id')
                .addField('sku')
                .addField('name')
                .addField('color')
                .addField('size')
                .addField('shoes_size')
                .addField(
                    new Field('short_description').addField('html')
                )
                .addField(
                    new Field('image').addField('url')
                )
                .addField(
                    new Field('thumbnail')
                        .addField('url')
                        .addField('label')
                )
                .addField(mediaGallery)
                .addField(price);

            const variants = new Field('variants')
                .addField(product);

            const configurableData = new Fragment('ConfigurableProduct')
                .addField(configurableOptions)
                .addField(variants);

            data = [...data, configurableData];
        }

        return data;
    }

    /**
     * Prepare single product specific fields, example: `meta_title`, `description`, etc.
     * @private
     * @param  {{isSingleProduct: Boolean, search: String, categoryIds: Array<String|Number>, categoryUrlPath: String, activePage: Number, priceRange: {min: Number, max: Number}, sortKey: String, sortDirection: String, productPageSize: Number}} options A object containing different aspects of query, each item can be omitted
     * @return {Array<String>} Prepared array of fields
     * @memberof ProductListQuery
     */
    _prepareAdditionalInformation(options) {
        const additionalInformation = ['brand', 'color', 'size', 'shoes_size'];

        if (options.isSingleProduct) {
            const mediaGallery = this._prepareAdditionalGallery();
            const tierPrices = this._prepareTierPrice();
            const productLinks = this._prepareAdditionalProductLinks();
            const description = new Field('description').addField('html');

            additionalInformation.push(...[
                'meta_title', 'meta_keyword',
                'meta_description', 'canonical_url',
                description, mediaGallery, tierPrices, productLinks
            ]);
        }

        return additionalInformation;
    }

    /**
     * Prepare tier price (single product specific)
     * @private
     * @return {Field} Prepared field
     * @memberof ProductListQuery
     */
    _prepareTierPrice() {
        return new Field('tier_prices')
            .addFieldList([
                'customer_group_id', 'qty', 'value',
                'percentage_value', 'website_id'
            ]);
    }

    /**
     * Prepare additional gallery (single product specific)
     * @private
     * @return {Field} Prepared field
     * @memberof ProductListQuery
     */
    _prepareAdditionalGallery() {
        const content = new Field('content')
            .addFieldList(['base64_encoded_data', 'type', 'name']);

        const videoContent = new Field('video_content')
            .addFieldList([
                'media_type', 'video_provider', 'video_url',
                'video_title', 'video_description', 'video_metadata'
            ]);

        const additionalFields = [
            'id', 'media_type', 'label',
            'position', 'disabled', 'types', 'file'
        ];

        return new Field('media_gallery_entries')
            .addField(content)
            .addField(videoContent)
            .addFieldList(additionalFields);
    }

    /**
     * Prepare product fields (single product specific)
     * @private
     * @return {Field} Prepared field
     * @memberof ProductListQuery
     */
    _prepareAdditionalProductLinks() {
        return new Field('product_links')
            .addFieldList(['link_type', 'linked_product_sku', 'position']);
    }

    /**
     * Prepare filters field
     * @private
     * @return {Field} Prepared field
     * @memberof ProductListQuery
     */
    _prepeareFiltersField() {
        const swatchData = new Field('swatch_data')
            .addField('type')
            .addField('value');

        const swatchLayerFilterItem = new Fragment('SwatchLayerFilterItem')
            .addField('label')
            .addField(swatchData);

        const filterItems = new Field('filter_items')
            .addField('label')
            .addField('value_string')
            .addField(swatchLayerFilterItem);

        return new Field('filters')
            .addField('name')
            .addField('request_var')
            .addField(filterItems);
    }

    /**
     * Prepare `items` field
     * @private
     * @param  {{isSingleProduct: Boolean, search: String, categoryIds: Array<String|Number>, categoryUrlPath: String, activePage: Number, priceRange: {min: Number, max: Number}, sortKey: String, sortDirection: String, productPageSize: Number}} options A object containing different aspects of query, each item can be omitted
     * @return {Field} Prepared items field
     * @memberof ProductListQuery
     */
    _prepareItemsField(options) {
        const categories = this._prepareItemsCategoriesField(); // same for ProductList and single product
        const price = this._prepareItemsPriceField(); // same for ProductList and single product
        const images = this._prepareImageFields(options); // images related to product (based on `isSingleProduct` option)
        const additionalInformation = this._prepareAdditionalInformation(options); // additional options related to SINGLE product request
        const configurableData = this._prepareConfigurableData(options);
        // default fields for all queries
        const defaultFields = [
            'id',
            'name',
            (new Field('short_description').addField('html')),
            'url_key',
            'special_price',
            'sku'
        ];

        return new Field('items')
            .addFieldList(defaultFields) // Important fields, default for all Products
            .addField(categories) // Categories & Breadcrumbs
            .addField(price) // Minimal & Regular Price (Minimal – for Customizable products)
            .addFieldList(images) // Simple images: either `small_image` and `thumbnail`, either both previous + `image`
            .addFieldList(additionalInformation) // Single product related fields
            .addFieldList(configurableData);
    }

    /**
     * Prepare `sort_fields` field
     * @private
     * @return {Field} Prepared items field
     * @memberof ProductListQuery
     */
    _prepareSortFields() {
        const options = new Field('options').addFieldList(['value', 'label']);

        return new Field('sort_fields')
            .addField(options);
    }
}

export default new ProductListQuery();
