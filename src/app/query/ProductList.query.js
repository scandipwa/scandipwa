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
     * Get ProductList query
     * @param  {{search: String, categoryIds: Array<String|Number>, productUrlPath: String, categoryUrlPath: String, activePage: Number, priceRange: {min: Number, max: Number}, sortKey: String, sortDirection: String, productPageSize: Number, customFilters: Object}} options A object containing different aspects of query, each item can be omitted
     * @return {Query} ProductList query
     * @memberof ProductListQuery
     */
    getQuery(options) {
        if (!options) throw new Error('Missing argument `options`');

        const args = this._prepareArgumentList(options);
        const items = this._prepareItemsField(options, new Field('items'));
        const sortFields = this._prepareSortFields();
        const filters = this._prepeareFiltersField();

        const field = new Field('products')
            .addArgument('currentPage', 'Int!', args.currentPage)
            .addArgument('pageSize', 'Int!', args.pageSize)
            .addArgument('filter', 'ProductFilterInput!', args.filter);

        if (args.sort) field.addArgument('sort', 'ProductSortInput', args.sort);
        if (args.search) field.addArgument('search', 'String', encodeURIComponent(args.search));

        if (!options.notRequireInfo) {
            field
                .addField('total_count')
                .addField('min_price')
                .addField('max_price')
                .addField(sortFields)
                .addField(filters);
        }

        if (!options.notRequireItems) field.addField(items);

        return field;
    }

    /**
     * Prepare grouped product data
     * @private
     * @return {Fragment}
     * @memberof ProductListQuery
     */
    _prepareGroupedData() {
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

        const product = new Field('product')
            .addField('id')
            .addField('sku')
            .addField('name')
            .addField(new Field('short_description').addField('html'))
            .addField(new Field('image').addField('url').addField('label').addField('path'))
            .addField(new Field('thumbnail').addField('url').addField('label').addField('path'))
            .addField(price);

        const itemsGrouped = new Field('items').addField(product);

        return new Fragment('GroupedProduct')
            .addField(itemsGrouped);
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
                    if (value && Object.keys(value).length) {
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
        return Object.keys(customFilters).reduce((prev, key) => {
            const attribute = customFilters[key];
            if (attribute.length) prev.push(`${key}: { in: [ ${attribute.join(',')} ] } `);
            return prev;
        }, []).join(',');
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
            new Field('thumbnail').addField('url').addField('label').addField('path'),
            new Field('small_image').addField('url').addField('label').addField('path')
        ];
        if (options.isSingleProduct) images.push(new Field('image').addField('url').addField('label').addField('path'));
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
                .addField('attribute_id')
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
                .addField(this._prepareAttributes())
                .addField(
                    new Field('short_description').addField('html')
                )
                .addField(
                    new Field('image').addField('url').addField('label').addField('path')
                )
                .addField(
                    new Field('thumbnail')
                        .addField('url')
                        .addField('label')
                        .addField('path')
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
     * Prepare attributes
     */
    _prepareAttributes(isFullProduct = false) {
        const attributes = new Field('attributes')
            .addField('attribute_value')
            .addField('attribute_code')
            .addField('attribute_label');

        if (isFullProduct) {
            attributes
                .addField(
                    new Field('attribute_options')
                        .addField('label')
                        .addField('value')
                        .addField(
                            new Field('swatch_data')
                                .addField('value')
                        )
                );
        }

        return attributes;
    }

    /**
     * Prepare single product specific fields, example: `meta_title`, `description`, etc.
     * @private
     * @param  {{isSingleProduct: Boolean, search: String, categoryIds: Array<String|Number>, categoryUrlPath: String, activePage: Number, priceRange: {min: Number, max: Number}, sortKey: String, sortDirection: String, productPageSize: Number}} options A object containing different aspects of query, each item can be omitted
     * @return {Array<String>} Prepared array of fields
     * @memberof ProductListQuery
     */
    _prepareAdditionalInformation(options) {
        const additionalInformation = [
            this._prepareAttributes(true),
            'stock_status',
            'only_x_left_in_stock'
        ];

        if (options.isSingleProduct) {
            const mediaGallery = this._prepareAdditionalGallery();
            const tierPrices = this._prepareTierPrice();
            const productLinks = this._prepareAdditionalProductLinks();
            const description = new Field('description').addField('html');
            const groupedProductItems = this._prepareGroupedData();
            const reviews = this._prepareReviewsField();

            additionalInformation.push(...[
                'meta_title', 'meta_keyword', 'meta_description', 'canonical_url',
                description, mediaGallery, tierPrices, productLinks, groupedProductItems, reviews
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
     * Prepare review summary field
     * @returns {Field}
     * @private
     */
    _prepareReviewSummaryField() {
        return new Field('review_summary')
            .addField('rating_summary')
            .addField('review_count');
    }

    /**
     * Prepare review summary field
     * @returns {Field}
     * @private
     */
    _prepareReviewsField() {
        const ratingVotes = new Field('rating_votes')
            .addField('vote_id')
            .addField('rating_code')
            .addField('percent');

        return new Field('reviews')
            .addField('review_id')
            .addField('nickname')
            .addField('title')
            .addField('detail')
            .addField('created_at')
            .addField(ratingVotes);
    }

    /**
     * Prepare `items` field
     * @private
     * @param  {{isSingleProduct: Boolean, search: String, categoryIds: Array<String|Number>, categoryUrlPath: String, activePage: Number, priceRange: {min: Number, max: Number}, sortKey: String, sortDirection: String, productPageSize: Number}} options A object containing different aspects of query, each item can be omitted
     * @param {Field}
     * @return {Field} Prepared items field
     * @memberof ProductListQuery
     */
    _prepareItemsField(options, items) {
        const categories = this._prepareItemsCategoriesField(); // same for ProductList and single product
        const price = this._prepareItemsPriceField(); // same for ProductList and single product
        const images = this._prepareImageFields(options); // images related to product (based on `isSingleProduct` option)
        const additionalInformation = this._prepareAdditionalInformation(options); // additional options related to SINGLE product request
        const configurableData = this._prepareConfigurableData(options);
        const reviewSummary = this._prepareReviewSummaryField();

        // default fields for all queries
        const defaultFields = [
            'id',
            'name',
            (new Field('short_description').addField('html')),
            'url_key',
            'special_price',
            'sku'
        ];

        return items
            .addFieldList(defaultFields) // Important fields, default for all Products
            .addField(categories) // Categories & Breadcrumbs
            .addField(price) // Minimal & Regular Price (Minimal – for Customizable products)
            .addFieldList(images) // Simple images: either `small_image` and `thumbnail`, either both previous + `image`
            .addFieldList(additionalInformation) // Single product related fields
            .addFieldList(configurableData)
            .addField(reviewSummary);
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

export { ProductListQuery };

export default new ProductListQuery();
