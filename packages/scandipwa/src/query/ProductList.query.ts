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

import { SORT_DIRECTION_TYPE } from 'Route/CategoryPage/CategoryPage.config';
import { NONE_SORT_OPTION_VALUE } from 'Route/SearchPage/SearchPage.config';
import { CUSTOMER } from 'Store/MyAccount/MyAccount.dispatcher';
import BrowserDatabase from 'Util/BrowserDatabase';
import { Field, Fragment } from 'Util/Query';

import { ProductListOptions } from './Query.type';

/**
 * Product List Query
 * @class ProductListQuery
 * @namespace Query/ProductList/Query */
export class ProductListQuery {
    options = {} as ProductListOptions;

    getQuery(options: ProductListOptions): Field {
        if (!options) {
            throw new Error('Missing argument `options`');
        }

        this.options = options;

        return this._getProductsField();
    }

    _getProductsField(): Field {
        const products = new Field('products')
            .addFieldList(this._getProductFields());

        this._getProductArguments().forEach((arg) => products.addArgument(...arg));

        return products;
    }

    _getPriceFilter(key: string, value: string): Record<string, { from?: string; to?: string }> {
        const [from, to] = value[0].split('_');

        if (from === '*') {
            return { [key]: { to } };
        }

        if (to === '*') {
            return { [key]: { from } };
        }

        return {
            [key]: { from, to }
        };
    }

    _getCustomFilters(
        filters: Record<string, string> = {}
    ): Record<string, { from?: string; to?: string; in?: string }> {
        return Object.entries(filters)
            .reduce((acc, [key, attribute]: [string, string]) => {
                if (!attribute.length) {
                    return acc;
                }

                if (key === 'price') {
                    return {
                        ...acc,
                        ...this._getPriceFilter(key, attribute)
                    };
                }

                return {
                    ...acc,
                    [key]: { in: attribute }
                };
            }, {} as Record<string, { from?: string; to?: string; in?: string }>);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    _getFilterArgumentMap() {
        return {
            categoryIds: (id: number) => ({ category_id: { eq: id } }),
            categoryUrlPath: (url: string) => ({ category_url_path: { eq: url } }),
            priceRange: ({ min, max }: { min: number; max: number }) => {
                const price = {} as { from?: number; to?: number };

                if (min) {
                    price.from = min;
                }

                if (max) {
                    price.to = max;
                }

                return { price };
            },
            productsSkuArray: (sku: string) => ({ sku: { in: sku } }),
            productSKU: (sku: string) => ({ sku: { eq: sku } }),
            productID: (id: number) => ({ id: { eq: id } }),
            productUrlPath: (url: string) => ({ url_key: { eq: url } }),
            customFilters: this._getCustomFilters.bind(this),
            newToDate: (date: string) => ({ news_to_date: { gteq: date } }),
            conditions: (conditions: string) => ({ conditions: { eq: conditions } }),
            customerGroupId: (id: number) => ({ customer_group_id: { eq: id } })
        };
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    _getArgumentsMap() {
        const { requireInfo } = this.options;
        const filterArgumentMap = this._getFilterArgumentMap();

        return {
            currentPage: { type: 'Int!' },
            pageSize: {
                type: 'Int!',
                handler: (option: number) => (requireInfo ? 1 : option)
            },
            search: {
                type: 'String!',
                handler: (option: string) => option.replace(/\+/g, ' ')
            },
            sort: {
                type: 'ProductAttributeSortInput!',
                // ! Convert both strings to enums!
                handler: ({ sortKey, sortDirection }: { sortKey: string; sortDirection: string }) => {
                    if (sortKey === NONE_SORT_OPTION_VALUE) {
                        return {};
                    }

                    return { [sortKey]: sortDirection || SORT_DIRECTION_TYPE.asc };
                }
            },
            filter: {
                type: 'ProductAttributeFilterInput!',
                handler: (initialOptions = {}) => {
                    // add customer group by default to all requests
                    const { group_id } = BrowserDatabase.getItem(CUSTOMER) || {};

                    const options = {
                        ...initialOptions,
                        customerGroupId: group_id || '0'
                    } as {
                        customerGroupId: number;
                        customFilters?: { category_id: number };
                        categoryIds?: number[];
                    };

                    const {
                        customFilters: { category_id } = {}
                    } = options;

                    /**
                     * Remove category ID from select, if there is a custom filter
                     * of category already selected in filtering options.
                     */
                    if (category_id) {
                        // eslint-disable-next-line fp/no-delete
                        options.categoryIds = undefined;
                    }

                    const parsedOptions = (Object.entries(options) as Array<[string, unknown]>).reduce(
                        (
                            acc: Record<string, unknown>,
                            [key, option]: [string, unknown]
                        ) => {
                            // if there is no value, or if the key is just not present in options object
                            if (!option || !filterArgumentMap[key as keyof typeof filterArgumentMap]) {
                                return acc;
                            }

                            return {
                                ...acc,
                                ...filterArgumentMap[key as keyof typeof filterArgumentMap](option as never)
                            };
                        },
                        {} as Record<string, unknown>
                    );

                    return parsedOptions;
                }
            }
        };
    }

    _getProductArguments(): Array<[string, string, unknown]> {
        const { args } = this.options;
        const argumentMap = this._getArgumentsMap();

        return Object.entries(args).reduce((
            acc: Array<[string, string, unknown]>,
            [key, arg]: [string, unknown]
        ) => {
            if (!arg) {
                return acc;
            }

            const {
                type,
                handler = (option) => option
            } = argumentMap[key as keyof typeof argumentMap] as {
                type: string;
                handler: <T>(x: T) => T;
            };

            return [...acc, [key, type, handler(arg)]] as Array<[string, string, unknown]>;
        }, [] as Array<[string, string, unknown]>);
    }

    _getProductFields(): Array<string | Field> {
        const { requireInfo, isSingleProduct, notRequireInfo } = this.options;

        // do not request total count for PDP
        if (isSingleProduct || notRequireInfo) {
            return [
                this._getItemsField()
            ];
        }

        // for filters only request
        if (requireInfo) {
            return [
                this._getSortField(),
                this._getAggregationsField()
            ];
        }

        return [
            'total_count',
            this._getItemsField(),
            this._getPageInfoField()
        ];
    }

    _getCartProductInterfaceFields(): Array<string | Field> {
        return [
            'uid',
            'id',
            'sku',
            'name',
            'type_id',
            'stock_status',
            'url',
            'salable_qty',
            this._getStockItemField(),
            this._getProductThumbnailField(),
            this._getCartConfigurableProductFragment(),
            this._getAttributesField(false, true),
            this._getProductLinksField()
        ];
    }

    _getCartConfigurableProductFragment(): Fragment {
        return new Fragment('ConfigurableProduct')
            .addFieldList([
                this._getConfigurableOptionsField(),
                this._getCartVariantsField()
            ]);
    }

    _getCartVariantsField(): Field {
        return new Field('variants')
            .setAlias('variants')
            .addFieldList(this._getCartVariantFields());
    }

    _getCartVariantFields(): Field[] {
        return [
            this._getCartProductField()
        ];
    }

    _getCartProductField(): Field {
        return new Field('product')
            .addFieldList([
                'id',
                'sku',
                'stock_status',
                'salable_qty',
                this._getStockItemField(),
                this._getProductThumbnailField(),
                this._getAttributesField(true, true)
            ]);
    }

    _getProductInterfaceFields(
        isVariant: boolean,
        isForLinkedProducts = false,
        isForWishlist = false
    ): Array<string | Field> {
        const {
            isPlp = false,
            isSingleProduct,
            noAttributes = false,
            noVariants = false,
            noVariantAttributes = false
        } = this.options;

        // set option to always request images for product variants if they're requested for wishlist
        if (isForWishlist) {
            this.options.isForWishlist = true;
        }

        // Basic fields returned always
        const fields = [
            'uid',
            'id',
            'sku',
            'name',
            'type_id',
            'stock_status',
            'salable_qty',
            this._getStockItemField(),
            this._getPriceRangeField()
        ];

        // Additional fields, which we want to return always, except when it's variants on PLP (due to hugh number of items)
        if (!(isPlp && isVariant) || isForWishlist) {
            fields.push(
                this._getProductImageField(),
                this._getProductThumbnailField(),
                this._getProductSmallField(),
                this._getShortDescriptionField(),
                'special_from_date',
                'special_to_date',
                this._getTierPricesField()
            );
        }

        // if it is normal product and we need attributes
        // or if, it is variant, but we need variant attributes or variants them-self
        if ((!isVariant && !noAttributes) || (isVariant && !noVariantAttributes && !noVariants)) {
            fields.push(this._getAttributesField(isVariant, false));
        }

        // to all products (non-variants)
        if (!isVariant) {
            fields.push(
                'url',
                this._getUrlRewritesFields(),
                this._getReviewCountField(),
                this._getRatingSummaryField(),
                this._getCustomizableProductFragment()
            );

            // if variants are not needed
            if (!noVariants) {
                fields.push(
                    this._getConfigurableProductFragment(),
                    this._getBundleProductFragment(),
                    this._getGroupedProductItems()
                );
            }
        }

        // prevent linked products from looping
        if (isForLinkedProducts) {
            fields.push(this._getProductLinksField());
        }

        // additional information to PDP loads
        if (isSingleProduct) {
            fields.push(
                'stock_status',
                this._getDescriptionField(),
                this._getMediaGalleryField(),
                this._getSimpleProductFragment()
            );

            // for variants of PDP requested product
            if (!isVariant) {
                fields.push(
                    'canonical_url',
                    'meta_title',
                    'meta_keyword',
                    'meta_description',
                    this._getCategoriesField(),
                    this._getReviewsField(),
                    this._getVirtualProductFragment(),
                    this._getCustomizableProductFragment(),
                    this._getProductLinksField()
                );
            }
        }

        return fields;
    }

    /**
     * For grouped products, returns the subfields of the elements of the `items` field
     * @returns {*[]}
     * @private
     */
    _getGroupedProductItemFields(): Array<string | Field> {
        return [
            this._getProductField(),
            'position',
            'qty'
        ];
    }

    /**
     * A GroupedProduct-specific field that queries the products that are grouped under this product
     * @returns {Field}
     * @protected
     */
    _getGroupedProductItems(): Field {
        return new Fragment('GroupedProduct').addField(
            new Field('items')
                .addFieldList(this._getGroupedProductItemFields())
        );
    }

    /**
     * A DownloadableProduct-specific field that queries the links and samples
     * @returns {Field}
     * @private
     */
    _getDownloadableProductFields(): Fragment {
        return new Fragment('DownloadableProduct')
            .addFieldList(this._getDownloadableProductLinks());
    }

    _getDownloadableProductLinks(): Array<string | Field> {
        return [
            'links_title',
            'samples_title',
            'links_purchased_separately',
            this._getDownloadableProductLinkField(),
            this._getDownloadableProductSampleField()
        ];
    }

    _getDownloadableProductLinksRequired(): Field {
        return new Fragment('DownloadableProduct')
            .addFieldList(this._getDownloadableProductLinksRequiredFields());
    }

    _getDownloadableProductLinksRequiredFields(): string[] {
        return [
            'links_purchased_separately'
        ];
    }

    _getDownloadableProductLinkField(): Field {
        return new Field('downloadable_product_links')
            .addFieldList(this._getDownloadableProductLinkFields());
    }

    _getDownloadableProductLinkFields(): string[] {
        return [
            'sample_url',
            'sort_order',
            'title',
            'id',
            'uid',
            'price'
        ];
    }

    _getDownloadableProductSampleField(): Field {
        return new Field('downloadable_product_samples')
            .addFieldList(this._getDownloadableProductSampleFields());
    }

    _getDownloadableProductSampleFields(): string[] {
        return [
            'title',
            'sort_order',
            'sample_url'
        ];
    }

    _getItemsField(): Field {
        const { isSingleProduct } = this.options;

        const items = new Field('items')
            .addFieldList(this._getProductInterfaceFields(false));

        if (isSingleProduct) {
            // items.addField(this._getGroupedProductItems());
            items.addField(this._getDownloadableProductFields());
        } else {
            items.addField(this._getDownloadableProductLinksRequired());
        }

        return items;
    }

    _getProductField(): Field {
        const { isForLinkedProducts, isForWishlist = false } = this.options;

        return new Field('product')
            .addFieldList(this._getProductInterfaceFields(true, isForLinkedProducts, isForWishlist));
    }

    _getShortDescriptionFields(): string[] {
        return [
            'html'
        ];
    }

    _getShortDescriptionField(): Field {
        return new Field('short_description')
            .addFieldList(this._getShortDescriptionFields());
    }

    _getStockItemField(): Field {
        return new Field('stock_item')
            .addFieldList(this._getStockItemFields());
    }

    _getStockItemFields(): string[] {
        return [
            'in_stock',
            'min_sale_qty',
            'max_sale_qty',
            'qty_increments'
        ];
    }

    _getBreadcrumbFields(): string[] {
        return [
            'category_id',
            'category_name',
            'category_level',
            'category_url',
            'category_is_active'
        ];
    }

    _getBreadcrumbsField(): Field {
        return new Field('breadcrumbs')
            .addFieldList(this._getBreadcrumbFields());
    }

    _getCategoryFields(): Array<string | Field> {
        return [
            'id',
            'name',
            'url',
            this._getBreadcrumbsField()
        ];
    }

    _getCategoriesField(): Field {
        return new Field('categories')
            .addFieldList(this._getCategoryFields());
    }

    _getMinimalPriceFields(): Field[] {
        return [
            this._getDiscountField(),
            this._getFinalPriceField(),
            this._getFinalPriceExclTaxField(),
            this._getRegularPriceField(),
            this._getRegularPriceExclTaxField(),
            this._getDefaultPriceField(),
            this._getDefaultFinalPriceField(),
            this._getDefaultFinalPriceExclTaxField()
        ];
    }

    _getMinimalPriceField(): Field {
        return new Field('minimum_price')
            .addFieldList(this._getMinimalPriceFields());
    }

    _getMaximalPriceField(): Field {
        return new Field('maximum_price')
            .addFieldList(this._getMinimalPriceFields());
    }

    _getPriceRangeFields(): Field[] {
        // Using an array as potentially would want to add maximum price
        return [
            this._getMinimalPriceField(),
            this._getMaximalPriceField()
        ];
    }

    _getPriceRangeField(): Field {
        return new Field('price_range')
            .addFieldList(this._getPriceRangeFields());
    }

    /**
     * @returns {[string]} an array representing the subfields of the product thumbnail
     * @private
     */
    _getProductThumbnailFields(): string[] {
        return [
            'path',
            'url'
        ];
    }

    _getProductSmallFields(): string[] {
        return this._getProductThumbnailFields();
    }

    /**
     * Returns the field for fetching the thumbnail of a product.
     * Not to be confused with the media thumbnail field, which has the same name but is a subfield of media_gallery_entries
     * @returns {Field}
     * @private
     */
    _getProductThumbnailField(): Field {
        return new Field('thumbnail')
            .addFieldList(this._getProductThumbnailFields());
    }

    _getProductSmallField(): Field {
        return new Field('small_image')
            .addFieldList(this._getProductSmallFields());
    }

    _getProductImageField(): Field {
        return new Field('image')
            .addFieldList(this._getProductThumbnailFields());
    }

    _getAttributeOptionField(noSwatches: boolean): Array<string | Field> {
        const fields: Array<string | Field> = [
            'label',
            'value'
        ];

        if (!noSwatches) {
            fields.push(this._getSwatchDataField());
        }

        return fields;
    }

    _getAttributeOptionsField(noSwatches: boolean): Field {
        return new Field('attribute_options')
            .addFieldList(this._getAttributeOptionField(noSwatches));
    }

    _getAdditionalAttributeFields(isCart: boolean): string[] {
        if (isCart) {
            return [];
        }

        return [
            'attribute_type',
            'attribute_group_id',
            'attribute_group_name'
        ];
    }

    _getAttributeOptionsFields(isVariant: boolean): Field[] {
        if (isVariant) {
            return [];
        }

        return [
            this._getAttributeOptionsField(false)
        ];
    }

    _getAttributeFields(isVariant = false, isCart = false): Array<string | Field> {
        return [
            'attribute_id',
            'attribute_value',
            'attribute_code',
            'attribute_label',
            ...this._getAdditionalAttributeFields(isCart),
            ...this._getAttributeOptionsFields(isVariant)
        ];
    }

    _getAttributesField(isVariant: boolean, isCart: boolean): Field {
        return new Field('s_attributes')
            .setAlias('attributes')
            .addFieldList(this._getAttributeFields(isVariant, isCart));
    }

    _getMediaGalleryFields(): Array<string | Field> {
        return [
            'id',
            'file',
            'label',
            'position',
            'disabled',
            'media_type',
            'types',
            this._getVideoContentField(),
            this._getMediaThumbnailField(),
            this._getMediaBaseField(),
            this._getMediaLargeField()
        ];
    }

    /**
     * Returns a field querying video-specific data for a media gallery entry.
     * @returns {Field} the video_content field
     * @private
     */
    _getVideoContentField(): Field {
        return new Field('video_content').addFieldList([
            'media_type',
            'video_description',
            'video_metadata',
            'video_provider',
            'video_title',
            'video_url'
        ]);
    }

    /**
     * Returns a field querying the thumbnail of a media gallery entry.
     * Not to be confused with the product thumbnail field, which has the same name but is a direct subfield of the product
     * @returns {Field}
     * @private
     */
    _getMediaThumbnailField(): Field {
        return new Field('thumbnail').addField('url');
    }

    _getMediaBaseField(): Field {
        return new Field('base').addField('url');
    }

    _getMediaLargeField(): Field {
        return new Field('large').addField('url');
    }

    _getMediaGalleryField(): Field {
        return new Field('media_gallery_entries')
            .addFieldList(this._getMediaGalleryFields());
    }

    _getProductLinksField(): Field {
        return new Field('product_links')
            .addFieldList(this._getProductLinkFields());
    }

    _getDescriptionFields(): string[] {
        return [
            'html'
        ];
    }

    _getDescriptionField(): Field {
        return new Field('description')
            .addFieldList(this._getDescriptionFields());
    }

    _getUrlRewritesFields(): Field {
        return new Field('url_rewrites')
            .addFieldList(['url']);
    }

    _getProductLinkFields(): string[] {
        return [
            'position',
            'link_type',
            'linked_product_sku'
        ];
    }

    _getRatingsBreakdownFields(): Array<string | Field> {
        return [
            new Field('name').setAlias('rating_code'),
            'value'
        ];
    }

    _getRatingsBreakdownField(): Field {
        return new Field('ratings_breakdown')
            .setAlias('rating_votes')
            .addFieldList(this._getRatingsBreakdownFields());
    }

    _getReviewItemsFields(): Array<string | Field> {
        return [
            'average_rating',
            'nickname',
            new Field('summary').setAlias('title'),
            new Field('text').setAlias('detail'),
            'created_at',
            this._getRatingsBreakdownField()
        ];
    }

    _getReviewItemsField(): Field {
        return new Field('items')
            .addFieldList(this._getReviewItemsFields());
    }

    _getReviewsFields(): Field[] {
        return [
            this._getReviewItemsField()
        ];
    }

    _getReviewsField(): Field {
        return new Field('reviews')
            // Hard-coded pages, it will be very hard to
            // paginate using current implementation
            // eslint-disable-next-line no-magic-numbers
            .addArgument('pageSize', 'Int', 20)
            .addArgument('currentPage', 'Int', 1)
            .addFieldList(this._getReviewsFields());
    }

    _getReviewCountField(): Field {
        return new Field('review_count');
    }

    _getRatingSummaryField(): Field {
        return new Field('rating_summary');
    }

    _getBundleOptionsFields(): Array<string | Field> {
        return [
            'uid',
            'label',
            'quantity',
            'position',
            'is_default',
            'price',
            'price_type',
            'can_change_quantity',
            this._getProductBundleOptionField()
        ];
    }

    _getProductBundleOptionField(): Field {
        return new Field('product')
            .addFieldList(this._getProductBundleOptionFields());
    }

    _getProductBundleOptionFields(): Array<string | Field> {
        return [
            'name',
            'stock_status',
            this._getPriceRangeField()
        ];
    }

    _getBundleOptionsField(): Field {
        return new Field('options')
            .addFieldList(this._getBundleOptionsFields());
    }

    _getBundleItemsFields(): Array<string | Field> {
        return [
            'uid',
            'option_id',
            'title',
            'required',
            'type',
            'position',
            'sku',
            this._getBundleOptionsField()
        ];
    }

    _getBundleItemsField(): Field {
        return new Field('items')
            .addFieldList(this._getBundleItemsFields());
    }

    _getBundlePriceOptionSelectionFields(): string[] {
        return [
            'selection_id',
            'final_option_price',
            'final_option_price_excl_tax',
            'regular_option_price',
            'regular_option_price_excl_tax'
        ];
    }

    _getBundlePriceOptionFields(): Array<string | Field> {
        return [
            'option_id',
            new Field('selection_details')
                .addFieldList(this._getBundlePriceOptionSelectionFields())
        ];
    }

    _getBundlePriceOptionsField(): Field {
        return new Field('bundle_options')
            .addFieldList(this._getBundlePriceOptionFields());
    }

    _getBundleProductFragmentFields(): Array<string | Field> {
        return [
            'dynamic_price',
            'dynamic_sku',
            'ship_bundle_items',
            'dynamic_weight',
            this._getBundleItemsField(),
            this._getBundlePriceOptionsField()
        ];
    }

    _getValueFields(): string[] {
        return [
            'value_index'
        ];
    }

    _getValuesField(): Field {
        return new Field('values')
            .addFieldList(this._getValueFields());
    }

    _getConfigurableOptionFields(): Array<string | Field> {
        return [
            'attribute_code',
            this._getValuesField()
        ];
    }

    _getConfigurableOptionsField(): Field {
        return new Field('configurable_options')
            .addFieldList(this._getConfigurableOptionFields());
    }

    _getVariantFields(): Field[] {
        return [
            this._getProductField()
        ];
    }

    _getVariantsField(): Field {
        const { isPlp = false, isForWishlist = false } = this.options;

        // For PLP page we have optimized variants graphql field
        const variantsField = isPlp && !isForWishlist ? 'variants_plp' : 'variants';

        return new Field(variantsField)
            .setAlias('variants')
            .addFieldList(this._getVariantFields());
    }

    _getConfigurableProductFragmentFields(): Field[] {
        return [
            this._getConfigurableOptionsField(),
            this._getVariantsField()
        ];
    }

    _getCustomizableTextValueFields(): string[] {
        return [
            'price',
            'priceInclTax',
            'priceExclTax',
            'price_type',
            'currency',
            'sku',
            'max_characters'
        ];
    }

    _getCustomizableTextValueField(alias: string): Field {
        return new Field('value')
            .addFieldList(this._getCustomizableTextValueFields())
            .setAlias(alias);
    }

    _getCustomizableTextFields(alias: string): Array<string | Field> {
        return [
            this._getCustomizableTextValueField(alias),
            'product_sku'
        ];
    }

    _getCustomizableFileValueField(alias: string): Field {
        return new Field('value')
            .addFieldList([
                'price',
                'priceInclTax',
                'priceExclTax',
                'price_type',
                'currency',
                'sku',
                'file_extension'
            ])
            .setAlias(alias);
    }

    _getCustomizableAreaOption(): Field {
        return new Fragment('CustomizableAreaOption')
            .addFieldList(this._getCustomizableTextFields('areaValues'));
    }

    _getCustomizableFieldOption(): Field {
        return new Fragment('CustomizableFieldOption')
            .addFieldList(this._getCustomizableTextFields('fieldValues'));
    }

    _getCustomizableFileOption(): Field {
        return new Fragment('CustomizableFileOption')
            .addFieldList([this._getCustomizableFileValueField('fileValues')]);
    }

    _getCustomizableDateValueFields(): string[] {
        return [
            'price',
            'priceInclTax',
            'priceExclTax',
            'price_type',
            'currency',
            'sku'
        ];
    }

    _getCustomizableDateValueField(): Field {
        return new Field('value')
            .addFieldList(this._getCustomizableDateValueFields());
    }

    _getCustomizableDateFields(): Array<string | Field> {
        return [
            this._getCustomizableDateValueField(),
            'product_sku'
        ];
    }

    _getCustomizableDateOption(): Field {
        return new Fragment('CustomizableDateOption')
            .addFieldList(this._getCustomizableDateFields());
    }

    _getCustomizableSelectionValueFields(): string[] {
        return [
            'uid',
            'option_type_id',
            'price',
            'priceInclTax',
            'priceExclTax',
            'price_type',
            'currency',
            'sku',
            'title',
            'sort_order'
        ];
    }

    _getCustomizableSelectionValueField(alias: string): Field {
        return new Field('value')
            .addFieldList(this._getCustomizableSelectionValueFields())
            .setAlias(alias);
    }

    _getCustomizableCheckboxOption(): Field {
        return new Fragment('CustomizableCheckboxOption')
            .addFieldList([this._getCustomizableSelectionValueField('checkboxValues')]);
    }

    _getCustomizableMultiOption(): Field {
        return new Fragment('CustomizableMultipleOption')
            .addFieldList([this._getCustomizableSelectionValueField('checkboxValues')]); // same as checkbox
    }

    _getCustomizableDropdownOption(): Field {
        return new Fragment('CustomizableDropDownOption')
            .addFieldList([this._getCustomizableSelectionValueField('dropdownValues')]);
    }

    _getCustomizableRadioOption(): Field {
        return new Fragment('CustomizableRadioOption')
            .addFieldList([this._getCustomizableSelectionValueField('dropdownValues')]); // same as dropdown
    }

    _getCustomizableProductFragmentOptionsFields(): Array<string | Field> {
        return [
            this._getCustomizableDropdownOption(),
            this._getCustomizableRadioOption(),
            this._getCustomizableCheckboxOption(),
            this._getCustomizableMultiOption(),
            this._getCustomizableFieldOption(),
            this._getCustomizableAreaOption(),
            this._getCustomizableFileOption(),
            this._getCustomizableDateOption(),
            'title',
            'required',
            'sort_order',
            'type',
            'uid'
        ];
    }

    _getCustomizableProductFragmentOptionsField(): Field {
        return new Field('options')
            .addFieldList(this._getCustomizableProductFragmentOptionsFields());
    }

    _getCustomizableProductFragment(): Field {
        return new Fragment('CustomizableProductInterface')
            .addFieldList([this._getCustomizableProductFragmentOptionsField()]);
    }

    _getSimpleProductFragmentFields(): Field[] {
        return [
            this._getTierPricesField()
        ];
    }

    _getVirtualProductFragmentFields(): Field[] {
        return [
            this._getTierPricesField()
        ];
    }

    _getTierPricesField(): Field {
        return new Field('price_tiers')
            .addFieldList(this._getTierPricesFields());
    }

    _getTierPricesFields(): Array<string | Field> {
        return [
            this._getDiscountField(),
            this._getFinalPriceField(),
            'quantity'
        ];
    }

    _getDiscountField(): Field {
        return new Field('discount')
            .addField('amount_off')
            .addField('percent_off');
    }

    _getFinalPriceField(): Field {
        return new Field('final_price')
            .addField('currency')
            .addField('value');
    }

    _getFinalPriceExclTaxField(): Field {
        return new Field('final_price_excl_tax')
            .addField('currency')
            .addField('value');
    }

    _getRegularPriceField(): Field {
        return new Field('regular_price')
            .addField('currency')
            .addField('value');
    }

    _getRegularPriceExclTaxField(): Field {
        return new Field('regular_price_excl_tax')
            .addField('currency')
            .addField('value');
    }

    _getDefaultFinalPriceExclTaxField(): Field {
        return new Field('default_final_price_excl_tax')
            .addField('currency')
            .addField('value');
    }

    _getDefaultPriceField(): Field {
        return new Field('default_price')
            .addField('currency')
            .addField('value');
    }

    _getDefaultFinalPriceField(): Field {
        return new Field('default_final_price')
            .addField('currency')
            .addField('value');
    }

    _getBundleProductFragment(): Field {
        return new Fragment('BundleProduct')
            .addFieldList(this._getBundleProductFragmentFields());
    }

    _getConfigurableProductFragment(): Field {
        return new Fragment('ConfigurableProduct')
            .addFieldList(this._getConfigurableProductFragmentFields());
    }

    _getSimpleProductFragment(): Field {
        return new Fragment('SimpleProduct')
            .addFieldList(this._getSimpleProductFragmentFields());
    }

    _getVirtualProductFragment(): Field {
        return new Fragment('VirtualProduct')
            .addFieldList(this._getVirtualProductFragmentFields());
    }

    _getSortOptionFields(): string[] {
        return [
            'value',
            'label'
        ];
    }

    _getSortOptionsField(): Field {
        return new Field('options')
            .addFieldList(this._getSortOptionFields());
    }

    _getSortFields(): Field[] {
        return [
            this._getSortOptionsField()
        ];
    }

    _getSortField(): Field {
        return new Field('sort_fields')
            .addFieldList(this._getSortFields());
    }

    _getSwatchDataFields(): string[] {
        return [
            'type',
            'value'
        ];
    }

    _getSwatchDataField(): Field {
        return new Field('swatch_data')
            .addFieldList(this._getSwatchDataFields());
    }

    _getAggregationsField(): Field {
        return new Field('aggregations')
            .setAlias('filters')
            .addFieldList(this._getAggregationsFields());
    }

    _getAggregationsFields(): Array<string | Field> {
        return [
            new Field('label').setAlias('name'),
            new Field('attribute_code').setAlias('request_var'),
            'is_boolean',
            'has_swatch',
            'position',
            this._getAggregationsOptionsField()
        ];
    }

    _getAggregationsOptionsField(): Field {
        return new Field('options')
            .setAlias('filter_items')
            .addFieldList(this._getAggregationsOptionsFields());
    }

    _getAggregationsOptionsFields(): Array<string | Field> {
        return [
            'label',
            'count',
            new Field('value').setAlias('value_string'),
            this._getSwatchDataField()
        ];
    }

    _getPageInfoField(): Field {
        return new Field('page_info')
            .addField('current_page')
            .addField('total_pages');
    }
}

export default new ProductListQuery();
