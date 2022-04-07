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

import { Field, InlineFragment, Query } from '@tilework/opus';

import { SORT_DIRECTION_TYPE } from 'Route/CategoryPage/CategoryPage.config';
import { NONE_SORT_OPTION_VALUE } from 'Route/SearchPage/SearchPage.config';
import { CUSTOMER } from 'Store/MyAccount/MyAccount.dispatcher';
import {
    GQLAggregation,
    GQLAggregationOption,
    GQLAttributeOption,
    GQLAttributeWithValue,
    GQLBreadcrumb,
    GQLBundleItem,
    GQLBundleItemOption,
    GQLBundleProduct,
    GQLCategoryInterface,
    GQLComplexTextValue,
    GQLConfigurableProduct,
    GQLConfigurableProductOption,
    GQLConfigurableProductOptions,
    GQLConfigurableProductOptionsValues,
    GQLConfigurableVariant,
    GQLCurrencyEnum,
    GQLCustomizableAreaOption,
    GQLCustomizableCheckboxOption,
    GQLCustomizableCheckboxValue,
    GQLCustomizableDateOption,
    GQLCustomizableDateValue,
    GQLCustomizableDropDownOption,
    GQLCustomizableDropDownValue,
    GQLCustomizableFieldOption,
    GQLCustomizableFieldValue,
    GQLCustomizableFileOption,
    GQLCustomizableFileValue,
    GQLCustomizableMultipleOption,
    GQLCustomizableMultipleValue,
    GQLCustomizableOptionInterface,
    GQLCustomizableProductInterface,
    GQLCustomizableRadioOption,
    GQLDownloadableProduct,
    GQLDownloadableProductLinks,
    GQLDownloadableProductSamples,
    GQLGroupedProduct,
    GQLGroupedProductItem,
    GQLMediaGalleryEntry,
    GQLMoney,
    GQLOptimizedProductImage,
    GQLPriceRange,
    GQLPriceTypeEnum,
    GQLProductDiscount,
    GQLProductInterface,
    GQLProductLinksInterface,
    GQLProductMediaGalleryEntriesVideoContent,
    GQLProductPrice,
    GQLProductReview,
    GQLProductReviewRating,
    GQLProductReviews,
    GQLProducts,
    GQLProductStockItem,
    GQLSearchResultPageInfo,
    GQLSimpleProduct,
    GQLSortField,
    GQLSortFields,
    GQLSwatchData,
    GQLTierPrice,
    GQLUrlRewrite,
    GQLVirtualProduct
} from 'Type/Graphql.type';
import BrowserDatabase from 'Util/BrowserDatabase';

import { CommonField, ProductListOptions } from './Query.type';

/**
 * Product List Query
 * @class ProductListQuery
 * @namespace Query/ProductList/Query */
export class ProductListQuery {
    options = {} as ProductListOptions;

    getQuery(options: ProductListOptions): Query<'products', GQLProducts> {
        if (!options) {
            throw new Error('Missing argument `options`');
        }

        this.options = options;

        return this._getProductsField();
    }

    _getProductsField(): Query<'products', GQLProducts> {
        const products = new Query<'products', GQLProducts>('products')
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

    _getProductFields(): CommonField[] {
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

    _getCartProductInterfaceFields(): CommonField[] {
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

    _getCartConfigurableProductFragment(): InlineFragment<'ConfigurableProduct', GQLConfigurableProduct & {
        configurable_options: GQLConfigurableProductOptions[];
        variants: GQLConfigurableVariant[];
    }> {
        return new InlineFragment<'ConfigurableProduct', GQLConfigurableProduct>('ConfigurableProduct')
            .addFieldList([
                this._getConfigurableOptionsField(),
                this._getCartVariantsField()
            ]);
    }

    _getCartVariantsField(): Field<'variants', GQLConfigurableVariant, true> {
        return new Field<'variants', GQLConfigurableVariant, true>('variants', true)
            .addFieldList(this._getCartVariantFields());
    }

    _getCartVariantFields(): CommonField[] {
        return [
            this._getCartProductField()
        ];
    }

    _getCartProductField(): Field<'product', GQLProductInterface> {
        return new Field<'product', GQLProductInterface>('product')
            .addFieldList(this._getCartProductFields());
    }

    _getCartProductFields(): CommonField[] {
        return [
            'id',
            'sku',
            'stock_status',
            'salable_qty',
            this._getStockItemField(),
            this._getProductThumbnailField(),
            this._getAttributesField(true, true)
        ];
    }

    _getProductInterfaceFields(
        isVariant: boolean,
        isForLinkedProducts = false,
        isForWishlist = false
    ): CommonField[] {
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
        const fields: CommonField[] = [
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
    _getGroupedProductItemFields(): CommonField[] {
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
    _getGroupedProductItems(): InlineFragment<'GroupedProduct', GQLGroupedProduct & {
        items: GQLGroupedProductItem[];
    }> {
        return new InlineFragment<'GroupedProduct', GQLGroupedProduct>('GroupedProduct').addField(
            new Field<'items', GQLGroupedProductItem, true>('items', true)
                .addFieldList(this._getGroupedProductItemFields())
        );
    }

    /**
     * A DownloadableProduct-specific field that queries the links and samples
     * @returns {Field}
     * @private
     */
    _getDownloadableProductFields(): InlineFragment<'DownloadableProduct', GQLDownloadableProduct> {
        return new InlineFragment<'DownloadableProduct', GQLDownloadableProduct>('DownloadableProduct')
            .addFieldList(this._getDownloadableProductLinks());
    }

    _getDownloadableProductLinks(): CommonField[] {
        return [
            'links_title',
            'samples_title',
            'links_purchased_separately',
            this._getDownloadableProductLinkField(),
            this._getDownloadableProductSampleField()
        ];
    }

    _getDownloadableProductLinksRequired(): InlineFragment<'DownloadableProduct', GQLDownloadableProduct> {
        return new InlineFragment<'DownloadableProduct', GQLDownloadableProduct>('DownloadableProduct')
            .addFieldList(this._getDownloadableProductLinksRequiredFields());
    }

    _getDownloadableProductLinksRequiredFields(): string[] {
        return [
            'links_purchased_separately'
        ];
    }

    _getDownloadableProductLinkField(): Field<'downloadable_product_links', GQLDownloadableProductLinks, true> {
        return new Field<'downloadable_product_links', GQLDownloadableProductLinks, true>(
            'downloadable_product_links',
            true
        )
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

    _getDownloadableProductSampleField(): Field<'downloadable_product_samples', GQLDownloadableProductSamples, true> {
        return new Field<'downloadable_product_samples', GQLDownloadableProductSamples, true>(
            'downloadable_product_samples',
            true
        )
            .addFieldList(this._getDownloadableProductSampleFields());
    }

    _getDownloadableProductSampleFields(): string[] {
        return [
            'title',
            'sort_order',
            'sample_url'
        ];
    }

    _getItemsField<T>(): Field<'items', T & { [x: string]: unknown }, true> {
        const { isSingleProduct } = this.options;

        const items = new Field<'items', T, true>('items', true)
            .addFieldList(this._getProductInterfaceFields(false));

        if (isSingleProduct) {
            // items.addField(this._getGroupedProductItems());
            items.addField(this._getDownloadableProductFields());
        } else {
            items.addField(this._getDownloadableProductLinksRequired());
        }

        return items;
    }

    _getProductField(): Field<'product', GQLProductInterface> {
        const { isForLinkedProducts, isForWishlist = false } = this.options;

        return new Field<'product', GQLProductInterface>('product')
            .addFieldList(this._getProductInterfaceFields(true, isForLinkedProducts, isForWishlist));
    }

    _getShortDescriptionFields(): string[] {
        return [
            'html'
        ];
    }

    _getShortDescriptionField(): Field<'short_description', GQLComplexTextValue> {
        return new Field<'short_description', GQLComplexTextValue>('short_description')
            .addFieldList(this._getShortDescriptionFields());
    }

    _getStockItemField(): Field<'stock_item', GQLProductStockItem> {
        return new Field<'stock_item', GQLProductStockItem>('stock_item')
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

    _getBreadcrumbsField(): Field<'breadcrumbs', GQLBreadcrumb, true> {
        return new Field<'breadcrumbs', GQLBreadcrumb, true>('breadcrumbs', true)
            .addFieldList(this._getBreadcrumbFields());
    }

    _getCategoryFields(): CommonField[] {
        return [
            'id',
            'name',
            'url',
            this._getBreadcrumbsField()
        ];
    }

    _getCategoriesField(): Field<'categories', GQLCategoryInterface, true> {
        return new Field<'categories', GQLCategoryInterface, true>('categories', true)
            .addFieldList(this._getCategoryFields());
    }

    _getMinimalPriceFields(): CommonField[] {
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

    _getMinimalPriceField(): Field<'minimum_price', GQLProductPrice> {
        return new Field<'minimum_price', GQLProductPrice>('minimum_price')
            .addFieldList(this._getMinimalPriceFields());
    }

    _getMaximalPriceField(): Field<'maximum_price', GQLProductPrice> {
        return new Field<'maximum_price', GQLProductPrice>('maximum_price')
            .addFieldList(this._getMinimalPriceFields());
    }

    _getPriceRangeFields(): CommonField[] {
        // Using an array as potentially would want to add maximum price
        return [
            this._getMinimalPriceField(),
            this._getMaximalPriceField()
        ];
    }

    _getPriceRangeField(): Field<'price_range', GQLPriceRange> {
        return new Field<'price_range', GQLPriceRange>('price_range')
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
    _getProductThumbnailField(): Field<'thumbnail', GQLOptimizedProductImage> {
        return new Field<'thumbnail', GQLOptimizedProductImage>('thumbnail')
            .addFieldList(this._getProductThumbnailFields());
    }

    _getProductSmallField(): Field<'small_image', GQLOptimizedProductImage> {
        return new Field<'small_image', GQLOptimizedProductImage>('small_image')
            .addFieldList(this._getProductSmallFields());
    }

    _getProductImageField(): Field<'image', GQLOptimizedProductImage> {
        return new Field<'image', GQLOptimizedProductImage>('image')
            .addFieldList(this._getProductThumbnailFields());
    }

    _getAttributeOptionField(noSwatches: boolean): CommonField[] {
        const fields: CommonField[] = [
            'label',
            'value'
        ];

        if (!noSwatches) {
            fields.push(this._getSwatchDataField());
        }

        return fields;
    }

    _getAttributeOptionsField(noSwatches: boolean): Field<'attribute_options', GQLAttributeOption, true> {
        return new Field<'attribute_options', GQLAttributeOption, true>('attribute_options', true)
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

    _getAttributeOptionsFields(isVariant: boolean): CommonField[] {
        if (isVariant) {
            return [];
        }

        return [
            this._getAttributeOptionsField(false)
        ];
    }

    _getAttributeFields(isVariant = false, isCart = false): CommonField[] {
        return [
            'attribute_id',
            'attribute_value',
            'attribute_code',
            'attribute_label',
            ...this._getAdditionalAttributeFields(isCart),
            ...this._getAttributeOptionsFields(isVariant)
        ];
    }

    _getAttributesField(isVariant: boolean, isCart: boolean): Field<'attributes', GQLAttributeWithValue, true> {
        return new Field<'s_attributes', GQLAttributeWithValue, true>('s_attributes', true)
            .setAlias('attributes')
            .addFieldList(this._getAttributeFields(isVariant, isCart));
    }

    _getMediaGalleryFields(): CommonField[] {
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
    _getVideoContentField(): Field<'video_content', GQLProductMediaGalleryEntriesVideoContent & {
        media_type: string;
        video_description: string;
        video_metadata: string;
        video_provider: string;
        video_title: string;
        video_url: string;
    }> {
        return new Field<'video_content', GQLProductMediaGalleryEntriesVideoContent>('video_content').addFieldList([
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
    _getMediaThumbnailField(): Field<'thumbnail', string & { url: string }> {
        return new Field<'thumbnail', string>('thumbnail').addField('url');
    }

    _getMediaBaseField(): Field<'base', string & { url: string }> {
        return new Field<'base', string>('base').addField('url');
    }

    _getMediaLargeField(): Field<'large', string & { url: string }> {
        return new Field<'large', string>('large').addField('url');
    }

    _getMediaGalleryField(): Field<'media_gallery_entries', GQLMediaGalleryEntry, true> {
        return new Field<'media_gallery_entries', GQLMediaGalleryEntry, true>('media_gallery_entries', true)
            .addFieldList(this._getMediaGalleryFields());
    }

    _getProductLinksField(): Field<'product_links', GQLProductLinksInterface, true> {
        return new Field<'product_links', GQLProductLinksInterface, true>('product_links', true)
            .addFieldList(this._getProductLinkFields());
    }

    _getDescriptionFields(): string[] {
        return [
            'html'
        ];
    }

    _getDescriptionField(): Field<'description', GQLComplexTextValue> {
        return new Field<'description', GQLComplexTextValue>('description')
            .addFieldList(this._getDescriptionFields());
    }

    _getUrlRewritesFields(): Field<'url_rewrites', GQLUrlRewrite & { url: string }, true> {
        return new Field<'url_rewrites', GQLUrlRewrite, true>('url_rewrites')
            .addFieldList(['url']);
    }

    _getProductLinkFields(): string[] {
        return [
            'position',
            'link_type',
            'linked_product_sku'
        ];
    }

    _getRatingsBreakdownFields(): CommonField[] {
        return [
            new Field('name').setAlias('rating_code'),
            'value'
        ];
    }

    _getRatingsBreakdownField(): Field<'rating_votes', GQLProductReviewRating, true> {
        return new Field<'ratings_breakdown', GQLProductReviewRating, true>('ratings_breakdown', true)
            .setAlias('rating_votes')
            .addFieldList(this._getRatingsBreakdownFields());
    }

    _getReviewItemsFields(): CommonField[] {
        return [
            'average_rating',
            'nickname',
            new Field('summary').setAlias('title'),
            new Field('text').setAlias('detail'),
            'created_at',
            this._getRatingsBreakdownField()
        ];
    }

    _getReviewItemsField(): Field<'items', GQLProductReview, true> {
        return new Field<'items', GQLProductReview, true>('items', true)
            .addFieldList(this._getReviewItemsFields());
    }

    _getReviewsFields(): CommonField[] {
        return [
            this._getReviewItemsField()
        ];
    }

    _getReviewsField(): Field<'reviews', GQLProductReviews> {
        return new Field<'reviews', GQLProductReviews>('reviews')
            // Hard-coded pages, it will be very hard to
            // paginate using current implementation
            // eslint-disable-next-line no-magic-numbers
            .addArgument('pageSize', 'Int', 20)
            .addArgument('currentPage', 'Int', 1)
            .addFieldList(this._getReviewsFields());
    }

    _getReviewCountField(): Field<'review_count', number> {
        return new Field<'review_count', number>('review_count');
    }

    _getRatingSummaryField(): Field<'rating_summary', number> {
        return new Field<'rating_summary', number>('rating_summary');
    }

    _getBundleOptionsFields(): CommonField[] {
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

    _getProductBundleOptionField(): Field<'product', GQLProductInterface> {
        return new Field<'product', GQLProductInterface>('product')
            .addFieldList(this._getProductBundleOptionFields());
    }

    _getProductBundleOptionFields(): CommonField[] {
        return [
            'name',
            'stock_status',
            this._getPriceRangeField()
        ];
    }

    _getBundleOptionsField(): Field<'options', GQLBundleItemOption, true> {
        return new Field<'options', GQLBundleItemOption, true>('options', true)
            .addFieldList(this._getBundleOptionsFields());
    }

    _getBundleItemsFields(): CommonField[] {
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

    _getBundleItemsField(): Field<'items', GQLBundleItem, true> {
        return new Field<'items', GQLBundleItem, true>('items', true)
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

    _getBundlePriceOptionFields(): CommonField[] {
        return [
            'option_id',
            new Field('selection_details')
                .addFieldList(this._getBundlePriceOptionSelectionFields())
        ];
    }

    _getBundlePriceOptionsField(): Field<'bundle_options', {
        [x: string]: unknown;
    }, true> {
        return new Field<'bundle_options', unknown, true>('bundle_options', true)
            .addFieldList(this._getBundlePriceOptionFields());
    }

    _getBundleProductFragmentFields(): CommonField[] {
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

    _getValuesField(): Field<'values', GQLConfigurableProductOptionsValues, true> {
        return new Field<'values', GQLConfigurableProductOptionsValues, true>('values', true)
            .addFieldList(this._getValueFields());
    }

    _getConfigurableOptionFields(): CommonField[] {
        return [
            'attribute_code',
            this._getValuesField()
        ];
    }

    _getConfigurableOptionsField(): Field<'configurable_options', GQLConfigurableProductOption, true> {
        return new Field<'configurable_options', GQLConfigurableProductOption, true>('configurable_options', true)
            .addFieldList(this._getConfigurableOptionFields());
    }

    _getVariantFields(): CommonField[] {
        return [
            this._getProductField()
        ];
    }

    _getVariantsField(): Field<'variants_plp' | 'variants', GQLConfigurableVariant, true> {
        const { isPlp = false, isForWishlist = false } = this.options;

        // For PLP page we have optimized variants graphql field
        const variantsField = isPlp && !isForWishlist ? 'variants_plp' : 'variants';

        return new Field<'variants_plp' | 'variants', GQLConfigurableVariant, true>(variantsField, true)
            .setAlias('variants')
            .addFieldList(this._getVariantFields());
    }

    _getConfigurableProductFragmentFields(): CommonField[] {
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

    _getCustomizableTextValueField<A extends string>(alias: A): Field<A, GQLCustomizableFieldValue> {
        return new Field<'value', GQLCustomizableFieldValue>('value')
            .addFieldList(this._getCustomizableTextValueFields())
            .setAlias(alias);
    }

    _getCustomizableTextFields(alias: string): CommonField[] {
        return [
            this._getCustomizableTextValueField(alias),
            'product_sku'
        ];
    }

    _getCustomizableFileValueField<A extends string>(alias: A): Field<A, GQLCustomizableFileValue & {
        price: number;
        sku: string;
        price_type: GQLPriceTypeEnum;
        priceInclTax: number;
        priceExclTax: number;
        currency: string;
        file_extension: string;
    }> {
        return new Field<'value', GQLCustomizableFileValue>('value')
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

    _getCustomizableAreaOption(): InlineFragment<'CustomizableAreaOption', GQLCustomizableAreaOption> {
        return new InlineFragment<'CustomizableAreaOption', GQLCustomizableAreaOption>('CustomizableAreaOption')
            .addFieldList(this._getCustomizableTextFields('areaValues'));
    }

    _getCustomizableFieldOption(): InlineFragment<'CustomizableFieldOption', GQLCustomizableFieldOption> {
        return new InlineFragment<'CustomizableFieldOption', GQLCustomizableFieldOption>('CustomizableFieldOption')
            .addFieldList(this._getCustomizableTextFields('fieldValues'));
    }

    _getCustomizableFileOption(): InlineFragment<'CustomizableFileOption', GQLCustomizableFileOption & {
        fileValues: GQLCustomizableFileValue[];
    }> {
        return new InlineFragment<'CustomizableFileOption', GQLCustomizableFileOption>('CustomizableFileOption')
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

    _getCustomizableDateValueField(): Field<'value', GQLCustomizableDateValue> {
        return new Field<'value', GQLCustomizableDateValue>('value')
            .addFieldList(this._getCustomizableDateValueFields());
    }

    _getCustomizableDateFields(): CommonField[] {
        return [
            this._getCustomizableDateValueField(),
            'product_sku'
        ];
    }

    _getCustomizableDateOption(): InlineFragment<'CustomizableDateOption', GQLCustomizableDateOption> {
        return new InlineFragment<'CustomizableDateOption', GQLCustomizableDateOption>('CustomizableDateOption')
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

    _getCustomizableSelectionValueField<A extends string, T>(alias: A): Field<A, T> {
        return new Field<'value', T>('value')
            .addFieldList(this._getCustomizableSelectionValueFields())
            .setAlias(alias);
    }

    _getCustomizableCheckboxOption(): InlineFragment<'CustomizableCheckboxOption', GQLCustomizableCheckboxOption & {
        checkboxValues: GQLCustomizableCheckboxValue[];
    }> {
        return new InlineFragment<'CustomizableCheckboxOption', GQLCustomizableCheckboxOption>(
            'CustomizableCheckboxOption'
        )
            .addFieldList([this._getCustomizableSelectionValueField('checkboxValues')]);
    }

    _getCustomizableMultiOption(): InlineFragment<'CustomizableMultipleOption', GQLCustomizableMultipleOption & {
        checkboxValues: GQLCustomizableMultipleValue[];
    }> {
        return new InlineFragment<'CustomizableMultipleOption', GQLCustomizableMultipleOption>(
            'CustomizableMultipleOption'
        )
            .addFieldList([this._getCustomizableSelectionValueField('checkboxValues')]); // same as checkbox
    }

    _getCustomizableDropdownOption(): InlineFragment<'CustomizableDropDownOption', GQLCustomizableDropDownOption & {
        dropdownValues: GQLCustomizableDropDownValue[];
    }> {
        return new InlineFragment<'CustomizableDropDownOption', GQLCustomizableDropDownOption>(
            'CustomizableDropDownOption'
        )
            .addFieldList([this._getCustomizableSelectionValueField('dropdownValues')]);
    }

    _getCustomizableRadioOption(): InlineFragment<'CustomizableRadioOption', GQLCustomizableRadioOption & {
        dropdownValues: GQLCustomizableDropDownValue[];
    }> {
        return new InlineFragment<'CustomizableRadioOption', GQLCustomizableRadioOption>('CustomizableRadioOption')
            .addFieldList([this._getCustomizableSelectionValueField('dropdownValues')]); // same as dropdown
    }

    _getCustomizableProductFragmentOptionsFields(): CommonField[] {
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

    _getCustomizableProductFragmentOptionsField(): Field<'options', GQLCustomizableOptionInterface, true> {
        return new Field<'options', GQLCustomizableOptionInterface, true>('options', true)
            .addFieldList(this._getCustomizableProductFragmentOptionsFields());
    }

    _getCustomizableProductFragment(): InlineFragment<
    'CustomizableProductInterface',
    GQLCustomizableProductInterface & {
        options: GQLCustomizableOptionInterface[];
    }> {
        return new InlineFragment<'CustomizableProductInterface', GQLCustomizableProductInterface>(
            'CustomizableProductInterface'
        )
            .addFieldList([this._getCustomizableProductFragmentOptionsField()]);
    }

    _getSimpleProductFragmentFields(): CommonField[] {
        return [
            this._getTierPricesField()
        ];
    }

    _getVirtualProductFragmentFields(): CommonField[] {
        return [
            this._getTierPricesField()
        ];
    }

    _getTierPricesField(): Field<'price_tiers', GQLTierPrice, true> {
        return new Field<'price_tiers', GQLTierPrice, true>('price_tiers')
            .addFieldList(this._getTierPricesFields());
    }

    _getTierPricesFields(): CommonField[] {
        return [
            this._getDiscountField(),
            this._getFinalPriceField(),
            'quantity'
        ];
    }

    _getDiscountField(): Field<'discount', GQLProductDiscount & {
        amount_off: number;
        percent_off: number;
    }> {
        return new Field<'discount', GQLProductDiscount>('discount')
            .addField('amount_off')
            .addField('percent_off');
    }

    _getFinalPriceField(): Field<'final_price', GQLMoney & {
        currency: GQLCurrencyEnum;
        value: number;
    }> {
        return new Field<'final_price', GQLMoney>('final_price')
            .addField('currency')
            .addField('value');
    }

    _getFinalPriceExclTaxField(): Field<'final_price_excl_tax', GQLMoney & {
        currency: GQLCurrencyEnum;
        value: number;
    }> {
        return new Field<'final_price_excl_tax', GQLMoney>('final_price_excl_tax')
            .addField('currency')
            .addField('value');
    }

    _getRegularPriceField(): Field<'regular_price', GQLMoney & {
        currency: GQLCurrencyEnum;
        value: number;
    }> {
        return new Field<'regular_price', GQLMoney>('regular_price')
            .addField('currency')
            .addField('value');
    }

    _getRegularPriceExclTaxField(): Field<'regular_price_excl_tax', GQLMoney & {
        currency: GQLCurrencyEnum;
        value: number;
    }> {
        return new Field<'regular_price_excl_tax', GQLMoney>('regular_price_excl_tax')
            .addField('currency')
            .addField('value');
    }

    _getDefaultFinalPriceExclTaxField(): Field<'default_final_price_excl_tax', GQLMoney & {
        currency: GQLCurrencyEnum;
        value: number;
    }> {
        return new Field<'default_final_price_excl_tax', GQLMoney>('default_final_price_excl_tax')
            .addField('currency')
            .addField('value');
    }

    _getDefaultPriceField(): Field<'default_price', GQLMoney & {
        currency: GQLCurrencyEnum;
        value: number;
    }> {
        return new Field<'default_price', GQLMoney>('default_price')
            .addField('currency')
            .addField('value');
    }

    _getDefaultFinalPriceField(): Field<'default_final_price', GQLMoney & {
        currency: GQLCurrencyEnum;
        value: number;
    }> {
        return new Field<'default_final_price', GQLMoney>('default_final_price')
            .addField('currency')
            .addField('value');
    }

    _getBundleProductFragment(): InlineFragment<'BundleProduct', GQLBundleProduct> {
        return new InlineFragment<'BundleProduct', GQLBundleProduct>('BundleProduct')
            .addFieldList(this._getBundleProductFragmentFields());
    }

    _getConfigurableProductFragment(): InlineFragment<'ConfigurableProduct', GQLConfigurableProduct> {
        return new InlineFragment<'ConfigurableProduct', GQLConfigurableProduct>('ConfigurableProduct')
            .addFieldList(this._getConfigurableProductFragmentFields());
    }

    _getSimpleProductFragment(): InlineFragment<'SimpleProduct', GQLSimpleProduct> {
        return new InlineFragment<'SimpleProduct', GQLSimpleProduct>('SimpleProduct')
            .addFieldList(this._getSimpleProductFragmentFields());
    }

    _getVirtualProductFragment(): InlineFragment<'VirtualProduct', GQLVirtualProduct> {
        return new InlineFragment<'VirtualProduct', GQLVirtualProduct>('VirtualProduct')
            .addFieldList(this._getVirtualProductFragmentFields());
    }

    _getSortOptionFields(): string[] {
        return [
            'value',
            'label'
        ];
    }

    _getSortOptionsField(): Field<'options', GQLSortField, true> {
        return new Field<'options', GQLSortField, true>('options', true)
            .addFieldList(this._getSortOptionFields());
    }

    _getSortFields(): CommonField[] {
        return [
            this._getSortOptionsField()
        ];
    }

    _getSortField(): Field<'sort_fields', GQLSortFields> {
        return new Field<'sort_fields', GQLSortFields>('sort_fields')
            .addFieldList(this._getSortFields());
    }

    _getSwatchDataFields(): string[] {
        return [
            'type',
            'value'
        ];
    }

    _getSwatchDataField(): Field<'swatch_data', GQLSwatchData> {
        return new Field<'swatch_data', GQLSwatchData>('swatch_data')
            .addFieldList(this._getSwatchDataFields());
    }

    _getAggregationsField(): Field<'filters', GQLAggregation, true> {
        return new Field<'aggregations', GQLAggregation, true>('aggregations', true)
            .setAlias('filters')
            .addFieldList(this._getAggregationsFields());
    }

    _getAggregationsFields(): CommonField[] {
        return [
            new Field('label').setAlias('name'),
            new Field('attribute_code').setAlias('request_var'),
            'is_boolean',
            'has_swatch',
            'position',
            this._getAggregationsOptionsField()
        ];
    }

    _getAggregationsOptionsField(): Field<'filter_items', GQLAggregationOption, true> {
        return new Field<'options', GQLAggregationOption, true>('options', true)
            .setAlias('filter_items')
            .addFieldList(this._getAggregationsOptionsFields());
    }

    _getAggregationsOptionsFields(): CommonField[] {
        return [
            'label',
            'count',
            new Field('value').setAlias('value_string'),
            this._getSwatchDataField()
        ];
    }

    _getPageInfoField(): Field<'page_info', GQLSearchResultPageInfo & {
        current_page: number;
        total_pages: number;
    }> {
        return new Field<'page_info', GQLSearchResultPageInfo>('page_info')
            .addField('current_page')
            .addField('total_pages');
    }
}

export default new ProductListQuery();
