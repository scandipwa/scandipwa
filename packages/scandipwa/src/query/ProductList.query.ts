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

import { SortDirections } from 'Route/CategoryPage/CategoryPage.config';
import { NONE_SORT_OPTION_VALUE } from 'Route/SearchPage/SearchPage.config';
import { CUSTOMER } from 'Store/MyAccount/MyAccount.dispatcher';
import {
    GQLCurrencyEnum,
    GQLPriceTypeEnum,
    GQLProductStockStatus,
    GQLShipBundleItemsEnum
} from 'Type/Graphql.type';
import BrowserDatabase from 'Util/BrowserDatabase';

import {
    Aggregation,
    AggregationOption,
    ArgumentsMap,
    AttributeOptionField,
    AttributeWithValue,
    AttributeWithValueOption,
    Breadcrumb,
    BundleItem,
    BundleOption,
    BundleOptionSelection,
    BundlePriceOption,
    BundleProductFragment,
    CategoryInterface,
    ComplexTextValue,
    ConfigurableCartProductFragment,
    ConfigurableProductFragment,
    ConfigurableProductOptions,
    ConfigurableProductOptionsValues,
    ConfigurableVariant,
    CustomizableAreaOptionFragment,
    CustomizableDateOptionFragment,
    CustomizableDateValue,
    CustomizableFieldOptionFragment,
    CustomizableFieldValue,
    CustomizableFileValue,
    CustomizableProductFragmentOptions,
    CustomizableProductFragmentOptionsFields,
    CustomizableSelectionValue,
    DownloadableProductFragment,
    DownloadableProductLinks,
    DownloadableProductSamples,
    FilterArgumentMap,
    GroupedProductItem,
    MediaGalleryEntry,
    Money,
    OptimizedProductImage,
    PriceRange,
    PriceRangeMap,
    ProductAttributeFilterOptions,
    ProductBundleOption,
    ProductDiscount,
    ProductItem,
    ProductItemFields,
    ProductLink,
    ProductListOptions,
    ProductMediaGalleryEntriesVideoContent,
    ProductPrice,
    ProductReview,
    ProductReviews,
    ProductsQueryOutput,
    ProductStockItem,
    RatingsBreakdown,
    SearchResultPageInfo,
    SortField,
    SortFields,
    SwatchData,
    TierPrice,
    UrlRewrite,
    VariantItem
} from './ProductList.type';

/**
 * Product List Query
 * @class ProductListQuery
 * @namespace Query/ProductList/Query */
export class ProductListQuery {
    options: Partial<ProductListOptions> = {};

    getQuery(options: Partial<ProductListOptions>): Query<'products', ProductsQueryOutput> {
        if (!options) {
            throw new Error('Missing argument `options`');
        }

        this.options = options;

        return this._getProductsField();
    }

    _getProductsField(): Query<'products', ProductsQueryOutput> {
        const products = new Query<'products', ProductsQueryOutput>('products')
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
            }, {});
    }

    _getFilterArgumentMap(): FilterArgumentMap {
        return {
            categoryIds: (id: number | number[]) => ({ category_id: { eq: id } }),
            categoryUrlPath: (url: string) => ({ category_url_path: { eq: url } }),
            priceRange: ({ min, max }: { min: number; max: number }) => {
                const price: PriceRangeMap = {};

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

    _getArgumentsMap(): ArgumentsMap {
        const { requireInfo } = this.options;
        const filterArgumentMap = this._getFilterArgumentMap();

        return {
            currentPage: {
                type: 'Int!',
                handler: undefined
            },
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
                handler: <SortKey extends string>(
                    { sortKey, sortDirection }: { sortKey: SortKey; sortDirection: SortDirections }
                ): Partial<Record<SortKey, SortDirections>> => {
                    if (sortKey === NONE_SORT_OPTION_VALUE) {
                        return {};
                    }

                    return { [sortKey]: sortDirection || SortDirections.ASC } as Record<SortKey, SortDirections>;
                }
            },
            filter: {
                type: 'ProductAttributeFilterInput!',
                handler: (initialOptions = {}) => {
                    // add customer group by default to all requests
                    const { group_id } = BrowserDatabase.getItem(CUSTOMER) || {};

                    const options: ProductAttributeFilterOptions = {
                        ...initialOptions,
                        customerGroupId: group_id || '0'
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

                    type FilterArgumentMapKey = keyof FilterArgumentMap;

                    const parsedOptions: Record<string, unknown> = Object.entries(options).reduce(
                        (acc, [key, option]) => {
                            // if there is no value, or if the key is just not present in options object
                            if (!option || !filterArgumentMap[key as FilterArgumentMapKey]) {
                                return acc;
                            }

                            return {
                                ...acc,
                                ...filterArgumentMap[key as FilterArgumentMapKey](option as never)
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
        const { args = [] } = this.options;
        const argumentMap = this._getArgumentsMap();

        type ArgumentsMapKey = keyof ArgumentsMap;

        return Object.entries(args).reduce((
            acc,
            [key, arg]
        ) => {
            if (!arg) {
                return acc;
            }

            const {
                type,
                handler = (option: unknown): unknown => option
            } = argumentMap[key as ArgumentsMapKey];

            return [
                ...acc,
                [key, type, handler(arg as never)]
            ];
        }, [] as [string, string, unknown][]);
    }

    _getProductFields(): Array<
    Field<'items', ProductItem & {
        DownloadableProduct: DownloadableProductFragment;
    }, true>
    | Field<'sort_fields', SortFields>
    | Field<'filters', Aggregation, true>
    | Field<'total_count', number>
    | Field<'page_info', SearchResultPageInfo>
    > {
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
            new Field<'total_count', number>('total_count'),
            this._getItemsField(),
            this._getPageInfoField()
        ];
    }

    _getCartProductInterfaceFields(): Array<
    Field<'uid', string>
    | Field<'id', number>
    | Field<'sku', string>
    | Field<'name', string>
    | Field<'type_id', string>
    | Field<'stock_status', GQLProductStockStatus>
    | Field<'url', string>
    | Field<'salable_qty', number>
    | Field<'stock_item', ProductStockItem>
    | Field<'thumbnail', OptimizedProductImage>
    | InlineFragment<'ConfigurableProduct', ConfigurableCartProductFragment>
    | Field<'attributes', AttributeWithValue, true>
    | Field<'product_links', ProductLink, true>
    > {
        return [
            new Field<'uid', string>('uid'),
            new Field<'id', number>('id'),
            new Field<'sku', string>('sku'),
            new Field<'name', string>('name'),
            new Field<'type_id', string>('type_id'),
            new Field<'stock_status', GQLProductStockStatus>('stock_status'),
            new Field<'url', string>('url'),
            new Field<'salable_qty', number>('salable_qty'),
            this._getStockItemField(),
            this._getProductThumbnailField(),
            this._getCartConfigurableProductFragment(),
            this._getAttributesField(false, true),
            this._getProductLinksField()
        ];
    }

    _getCartConfigurableProductFragment(): InlineFragment<'ConfigurableProduct', ConfigurableCartProductFragment> {
        return new InlineFragment<'ConfigurableProduct', ConfigurableCartProductFragment>('ConfigurableProduct')
            .addFieldList([
                this._getConfigurableOptionsField(),
                this._getCartVariantsField()
            ]);
    }

    _getCartVariantsField(): Field<'variants', ConfigurableVariant, true> {
        return new Field<'variants', ConfigurableVariant, true>('variants', true)
            .addFieldList(this._getCartVariantFields());
    }

    _getCartVariantFields(): Field<'product', ProductItem>[] {
        return [
            this._getCartProductField()
        ];
    }

    _getCartProductField(): Field<'product', ProductItem> {
        return new Field<'product', ProductItem>('product')
            .addFieldList(this._getCartProductFields());
    }

    _getCartProductFields(): Array<
    Field<'id', number>
    | Field<'sku', string>
    | Field<'stock_status', GQLProductStockStatus>
    | Field<'salable_qty', number>
    | Field<'stock_item', ProductStockItem>
    | Field<'thumbnail', OptimizedProductImage>
    | Field<'attributes', AttributeWithValue, true>
    > {
        return [
            new Field<'id', number>('id'),
            new Field<'sku', string>('sku'),
            new Field<'stock_status', GQLProductStockStatus>('stock_status'),
            new Field<'salable_qty', number>('salable_qty'),
            this._getStockItemField(),
            this._getProductThumbnailField(),
            this._getAttributesField(true, true)
        ];
    }

    _getProductInterfaceFields(
        isVariant: boolean,
        isForLinkedProducts = false,
        isForWishlist = false
    ): ProductItemFields {
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
        const fields: ProductItemFields = [
            new Field<'uid', string>('uid'),
            new Field<'id', number>('id'),
            new Field<'sku', string>('sku'),
            new Field<'name', string>('name'),
            new Field<'type_id', string>('type_id'),
            new Field<'stock_status', GQLProductStockStatus>('stock_status'),
            new Field<'salable_qty', number>('salable_qty'),
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
                new Field<'special_from_date', string>('special_from_date'),
                new Field<'special_to_date', string>('special_to_date'),
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
                new Field<'url', string>('url'),
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
                new Field<'stock_status', GQLProductStockStatus>('stock_status'),
                this._getDescriptionField(),
                this._getMediaGalleryField(),
                this._getSimpleProductFragment()
            );

            // for variants of PDP requested product
            if (!isVariant) {
                fields.push(
                    new Field<'canonical_url', string>('canonical_url'),
                    new Field<'meta_title', string>('meta_title'),
                    new Field<'meta_keyword', string>('meta_keyword'),
                    new Field<'meta_description', string>('meta_description'),
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
    _getGroupedProductItemFields(): Array<
    Field<'product', ProductItem>
    | Field<'position', number>
    | Field<'qty', number>
    > {
        return [
            this._getProductField(),
            new Field<'position', number>('position'),
            new Field<'qty', number>('qty')
        ];
    }

    /**
     * A GroupedProduct-specific field that queries the products that are grouped under this product
     * @returns {Field}
     * @protected
     */
    _getGroupedProductItems(): InlineFragment<'GroupedProduct', {
        items: GroupedProductItem[];
    }> {
        return new InlineFragment<'GroupedProduct', {
            items: GroupedProductItem[];
        }>('GroupedProduct').addField(
            new Field<'items', GroupedProductItem, true>('items', true)
                .addFieldList(this._getGroupedProductItemFields())
        );
    }

    /**
     * A DownloadableProduct-specific field that queries the links and samples
     * @returns {Field}
     * @private
     */
    _getDownloadableProductFields(): InlineFragment<'DownloadableProduct', DownloadableProductFragment> {
        return new InlineFragment<'DownloadableProduct', DownloadableProductFragment>('DownloadableProduct')
            .addFieldList(this._getDownloadableProductLinks());
    }

    _getDownloadableProductLinks(): Array<
    Field<'links_title', string>
    | Field<'samples_title', string>
    | Field<'links_purchased_separately', number>
    | Field<'downloadable_product_links', DownloadableProductLinks, true>
    | Field<'downloadable_product_samples', DownloadableProductSamples, true>
    > {
        return [
            new Field<'links_title', string>('links_title'),
            new Field<'samples_title', string>('samples_title'),
            new Field<'links_purchased_separately', number>('links_purchased_separately'),
            this._getDownloadableProductLinkField(),
            this._getDownloadableProductSampleField()
        ];
    }

    _getDownloadableProductLinksRequired(): InlineFragment<'DownloadableProduct', DownloadableProductFragment> {
        return new InlineFragment<'DownloadableProduct', DownloadableProductFragment>('DownloadableProduct')
            .addFieldList(this._getDownloadableProductLinksRequiredFields());
    }

    _getDownloadableProductLinksRequiredFields(): Field<'links_purchased_separately', number>[] {
        return [
            new Field<'links_purchased_separately', number>('links_purchased_separately')
        ];
    }

    _getDownloadableProductLinkField(): Field<'downloadable_product_links', DownloadableProductLinks, true> {
        return new Field<'downloadable_product_links', DownloadableProductLinks, true>(
            'downloadable_product_links',
            true
        )
            .addFieldList(this._getDownloadableProductLinkFields());
    }

    _getDownloadableProductLinkFields(): Array<
    Field<'sample_url', string>
    | Field<'sort_order', number>
    | Field<'title', string>
    | Field<'id', number>
    | Field<'uid', string>
    | Field<'price', number>
    > {
        return [
            new Field<'sample_url', string>('sample_url'),
            new Field<'sort_order', number>('sort_order'),
            new Field<'title', string>('title'),
            new Field<'id', number>('id'),
            new Field<'uid', string>('uid'),
            new Field<'price', number>('price')
        ];
    }

    _getDownloadableProductSampleField(): Field<'downloadable_product_samples', DownloadableProductSamples, true> {
        return new Field<'downloadable_product_samples', DownloadableProductSamples, true>(
            'downloadable_product_samples',
            true
        )
            .addFieldList(this._getDownloadableProductSampleFields());
    }

    _getDownloadableProductSampleFields(): Array<
    Field<'title', string>
    | Field<'sort_order', number>
    | Field<'sample_url', string>
    > {
        return [
            new Field<'title', string>('title'),
            new Field<'sort_order', number>('sort_order'),
            new Field<'sample_url', string>('sample_url')
        ];
    }

    _getItemsField(): Field<'items', ProductItem & {
        DownloadableProduct: DownloadableProductFragment;
    }, true> {
        const { isSingleProduct } = this.options;

        const items = new Field<'items', ProductItem & {
            DownloadableProduct: DownloadableProductFragment;
        }, true>('items', true)
            .addFieldList(this._getProductInterfaceFields(false));

        if (isSingleProduct) {
            // items.addField(this._getGroupedProductItems());
            items.addField(this._getDownloadableProductFields());
        } else {
            items.addField(this._getDownloadableProductLinksRequired());
        }

        return items;
    }

    _getProductField(): Field<'product', ProductItem> {
        const { isForLinkedProducts, isForWishlist = false } = this.options;

        return new Field<'product', ProductItem>('product')
            .addFieldList(this._getProductInterfaceFields(true, isForLinkedProducts, isForWishlist));
    }

    _getShortDescriptionFields(): Field<'html', string>[] {
        return [
            new Field<'html', string>('html')
        ];
    }

    _getShortDescriptionField(): Field<'short_description', ComplexTextValue> {
        return new Field<'short_description', ComplexTextValue>('short_description')
            .addFieldList(this._getShortDescriptionFields());
    }

    _getStockItemField(): Field<'stock_item', ProductStockItem> {
        return new Field<'stock_item', ProductStockItem>('stock_item')
            .addFieldList(this._getStockItemFields());
    }

    _getStockItemFields(): Array<
    Field<'in_stock', boolean>
    | Field<'min_sale_qty', number>
    | Field<'max_sale_qty', number>
    | Field<'qty_increments', number>
    > {
        return [
            new Field<'in_stock', boolean>('in_stock'),
            new Field<'min_sale_qty', number>('min_sale_qty'),
            new Field<'max_sale_qty', number>('max_sale_qty'),
            new Field<'qty_increments', number>('qty_increments')
        ];
    }

    _getBreadcrumbFields(): Array<
    Field<'category_id', number>
    | Field<'category_name', string>
    | Field<'category_level', number>
    | Field<'category_url', string>
    | Field<'category_is_active', boolean>
    > {
        return [
            new Field<'category_id', number>('category_id'),
            new Field<'category_name', string>('category_name'),
            new Field<'category_level', number>('category_level'),
            new Field<'category_url', string>('category_url'),
            new Field<'category_is_active', boolean>('category_is_active')
        ];
    }

    _getBreadcrumbsField(): Field<'breadcrumbs', Breadcrumb, true> {
        return new Field<'breadcrumbs', Breadcrumb, true>('breadcrumbs', true)
            .addFieldList(this._getBreadcrumbFields());
    }

    _getCategoryFields(): Array<
    Field<'id', string>
    | Field<'name', string>
    | Field<'url', string>
    | Field<'breadcrumbs', Breadcrumb, true>
    > {
        return [
            new Field<'id', string>('id'),
            new Field<'name', string>('name'),
            new Field<'url', string>('url'),
            this._getBreadcrumbsField()
        ];
    }

    _getCategoriesField(): Field<'categories', CategoryInterface, true> {
        return new Field<'categories', CategoryInterface, true>('categories', true)
            .addFieldList(this._getCategoryFields());
    }

    _getMinimalPriceFields(): Array<
    Field<'discount', ProductDiscount>
    | Field<'final_price', Money>
    | Field<'final_price_excl_tax', Money>
    | Field<'regular_price', Money>
    | Field<'regular_price_excl_tax', Money>
    | Field<'default_price', Money>
    | Field<'default_final_price', Money>
    | Field<'default_final_price_excl_tax', Money>
    > {
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

    _getMinimalPriceField(): Field<'minimum_price', ProductPrice> {
        return new Field<'minimum_price', ProductPrice>('minimum_price')
            .addFieldList(this._getMinimalPriceFields());
    }

    _getMaximalPriceField(): Field<'maximum_price', ProductPrice> {
        return new Field<'maximum_price', ProductPrice>('maximum_price')
            .addFieldList(this._getMinimalPriceFields());
    }

    _getPriceRangeFields(): Array<
    Field<'minimum_price', ProductPrice>
    | Field<'maximum_price', ProductPrice>
    > {
        // Using an array as potentially would want to add maximum price
        return [
            this._getMinimalPriceField(),
            this._getMaximalPriceField()
        ];
    }

    _getPriceRangeField(): Field<'price_range', PriceRange> {
        return new Field<'price_range', PriceRange>('price_range')
            .addFieldList(this._getPriceRangeFields());
    }

    /**
     * @returns {[string]} an array representing the subfields of the product thumbnail
     * @private
     */
    _getProductThumbnailFields(): Array<
    Field<'path', string>
    | Field<'url', string>
    > {
        return [
            new Field<'path', string>('path'),
            new Field<'url', string>('url')
        ];
    }

    _getProductSmallFields(): Array<
    Field<'path', string>
    | Field<'url', string>
    > {
        return this._getProductThumbnailFields();
    }

    /**
     * Returns the field for fetching the thumbnail of a product.
     * Not to be confused with the media thumbnail field, which has the same name but is a subfield of media_gallery_entries
     * @returns {Field}
     * @private
     */
    _getProductThumbnailField(): Field<'thumbnail', OptimizedProductImage> {
        return new Field<'thumbnail', OptimizedProductImage>('thumbnail')
            .addFieldList(this._getProductThumbnailFields());
    }

    _getProductSmallField(): Field<'small_image', OptimizedProductImage> {
        return new Field<'small_image', OptimizedProductImage>('small_image')
            .addFieldList(this._getProductSmallFields());
    }

    _getProductImageField(): Field<'image', OptimizedProductImage> {
        return new Field<'image', OptimizedProductImage>('image')
            .addFieldList(this._getProductThumbnailFields());
    }

    _getAttributeOptionField(noSwatches: boolean): AttributeOptionField {
        const fields: AttributeOptionField = [
            new Field<'label', string>('label'),
            new Field<'value', string>('value')
        ];

        if (!noSwatches) {
            fields.push(this._getSwatchDataField());
        }

        return fields;
    }

    _getAttributeOptionsField(noSwatches: boolean): Field<'attribute_options', AttributeWithValueOption, true> {
        return new Field<'attribute_options', AttributeWithValueOption, true>('attribute_options', true)
            .addFieldList(this._getAttributeOptionField(noSwatches));
    }

    _getAdditionalAttributeFields(isCart: boolean): Array<
    Field<'attribute_type', string>
    | Field<'attribute_group_id', string>
    | Field<'attribute_group_name', string>
    > {
        if (isCart) {
            return [];
        }

        return [
            new Field<'attribute_type', string>('attribute_type'),
            new Field<'attribute_group_id', string>('attribute_group_id'),
            new Field<'attribute_group_name', string>('attribute_group_name')
        ];
    }

    _getAttributeOptionsFields(isVariant: boolean): Field<'attribute_options', AttributeWithValueOption, true>[] {
        if (isVariant) {
            return [];
        }

        return [
            this._getAttributeOptionsField(false)
        ];
    }

    _getAttributeFields(isVariant = false, isCart = false): Array<
    Field<'attribute_id', number>
    | Field<'attribute_value', string>
    | Field<'attribute_code', string>
    | Field<'attribute_label', string>
    | Field<'attribute_type', string>
    | Field<'attribute_group_id', string>
    | Field<'attribute_group_name', string>
    | Field<'attribute_options', AttributeWithValueOption, true>
    > {
        return [
            new Field<'attribute_id', number>('attribute_id'),
            new Field<'attribute_value', string>('attribute_value'),
            new Field<'attribute_code', string>('attribute_code'),
            new Field<'attribute_label', string>('attribute_label'),
            ...this._getAdditionalAttributeFields(isCart),
            ...this._getAttributeOptionsFields(isVariant)
        ];
    }

    _getAttributesField(isVariant: boolean, isCart: boolean): Field<'attributes', AttributeWithValue, true> {
        return new Field<'s_attributes', AttributeWithValue, true>('s_attributes', true)
            .setAlias('attributes')
            .addFieldList(this._getAttributeFields(isVariant, isCart));
    }

    _getMediaGalleryFields(): Array<
    Field<'id', number>
    | Field<'file', string>
    | Field<'label', string>
    | Field<'position', number>
    | Field<'disabled', boolean>
    | Field<'media_type', string>
    | Field<'types', string, true>
    | Field<'video_content', ProductMediaGalleryEntriesVideoContent>
    | Field<'thumbnail', { url: string }>
    | Field<'base', { url: string }>
    | Field<'large', { url: string }>
    > {
        return [
            new Field<'id', number>('id'),
            new Field<'file', string>('file'),
            new Field<'label', string>('label'),
            new Field<'position', number>('position'),
            new Field<'disabled', boolean>('disabled'),
            new Field<'media_type', string>('media_type'),
            new Field<'types', string, true>('types', true),
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
    _getVideoContentField(): Field<'video_content', ProductMediaGalleryEntriesVideoContent> {
        return new Field<'video_content', ProductMediaGalleryEntriesVideoContent>('video_content').addFieldList([
            new Field<'media_type', string>('media_type'),
            new Field<'video_description', string>('video_description'),
            new Field<'video_metadata', string>('video_metadata'),
            new Field<'video_provider', string>('video_provider'),
            new Field<'video_title', string>('video_title'),
            new Field<'video_url', string>('video_url')
        ]);
    }

    /**
     * Returns a field querying the thumbnail of a media gallery entry.
     * Not to be confused with the product thumbnail field, which has the same name but is a direct subfield of the product
     * @returns {Field}
     * @private
     */
    _getMediaThumbnailField(): Field<'thumbnail', { url: string }> {
        return new Field<'thumbnail', { url: string }>('thumbnail').addField('url');
    }

    _getMediaBaseField(): Field<'base', { url: string }> {
        return new Field<'base', { url: string }>('base').addField('url');
    }

    _getMediaLargeField(): Field<'large', { url: string }> {
        return new Field<'large', { url: string }>('large').addField('url');
    }

    _getMediaGalleryField(): Field<'media_gallery_entries', MediaGalleryEntry, true> {
        return new Field<'media_gallery_entries', MediaGalleryEntry, true>('media_gallery_entries', true)
            .addFieldList(this._getMediaGalleryFields());
    }

    _getProductLinksField(): Field<'product_links', ProductLink, true> {
        return new Field<'product_links', ProductLink, true>('product_links', true)
            .addFieldList(this._getProductLinkFields());
    }

    _getDescriptionFields(): Field<'html', string>[] {
        return [
            new Field<'html', string>('html')
        ];
    }

    _getDescriptionField(): Field<'description', ComplexTextValue> {
        return new Field<'description', ComplexTextValue>('description')
            .addFieldList(this._getDescriptionFields());
    }

    _getUrlRewritesFields(): Field<'url_rewrites', UrlRewrite, true> {
        return new Field<'url_rewrites', UrlRewrite, true>('url_rewrites')
            .addFieldList([new Field<'url', string>('url')]);
    }

    _getProductLinkFields(): Array<
    Field<'position', number>
    | Field<'link_type', string>
    | Field<'linked_product_sku', string>
    > {
        return [
            new Field<'position', number>('position'),
            new Field<'link_type', string>('link_type'),
            new Field<'linked_product_sku', string>('linked_product_sku')
        ];
    }

    _getRatingsBreakdownFields(): Array<
    Field<'rating_code', string>
    | Field<'value', string>
    > {
        return [
            new Field<'name', string>('name').setAlias('rating_code'),
            new Field<'value', string>('value')
        ];
    }

    _getRatingsBreakdownField(): Field<'rating_votes', RatingsBreakdown, true> {
        return new Field<'ratings_breakdown', RatingsBreakdown, true>('ratings_breakdown', true)
            .setAlias('rating_votes')
            .addFieldList(this._getRatingsBreakdownFields());
    }

    _getReviewItemsFields(): Array<
    Field<'average_rating', number>
    | Field<'nickname', string>
    | Field<'title', string>
    | Field<'detail', string>
    | Field<'created_at', string>
    | Field<'rating_votes', RatingsBreakdown, true>
    > {
        return [
            new Field<'average_rating', number>('average_rating'),
            new Field<'nickname', string>('nickname'),
            new Field<'summary', string>('summary').setAlias('title'),
            new Field<'text', string>('text').setAlias('detail'),
            new Field<'created_at', string>('created_at'),
            this._getRatingsBreakdownField()
        ];
    }

    _getReviewItemsField(): Field<'items', ProductReview, true> {
        return new Field<'items', ProductReview, true>('items', true)
            .addFieldList(this._getReviewItemsFields());
    }

    _getReviewsFields(): Field<'items', ProductReview, true>[] {
        return [
            this._getReviewItemsField()
        ];
    }

    _getReviewsField(): Field<'reviews', ProductReviews> {
        return new Field<'reviews', ProductReviews>('reviews')
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

    _getBundleOptionsFields(): Array<
    Field<'uid', string>
    | Field<'label', string>
    | Field<'quantity', number>
    | Field<'position', number>
    | Field<'is_default', boolean>
    | Field<'price', number>
    | Field<'price_type', GQLPriceTypeEnum>
    | Field<'can_change_quantity', boolean>
    | Field<'product', ProductBundleOption>
    > {
        return [
            new Field<'uid', string>('uid'),
            new Field<'label', string>('label'),
            new Field<'quantity', number>('quantity'),
            new Field<'position', number>('position'),
            new Field<'is_default', boolean>('is_default'),
            new Field<'price', number>('price'),
            new Field<'price_type', GQLPriceTypeEnum>('price_type'),
            new Field<'can_change_quantity', boolean>('can_change_quantity'),
            this._getProductBundleOptionField()
        ];
    }

    _getProductBundleOptionField(): Field<'product', ProductBundleOption> {
        return new Field<'product', ProductBundleOption>('product')
            .addFieldList(this._getProductBundleOptionFields());
    }

    _getProductBundleOptionFields(): Array<
    Field<'name', string>
    | Field<'stock_status', GQLProductStockStatus>
    | Field<'price_range', PriceRange>
    > {
        return [
            new Field<'name', string>('name'),
            new Field<'stock_status', GQLProductStockStatus>('stock_status'),
            this._getPriceRangeField()
        ];
    }

    _getBundleOptionsField(): Field<'options', BundleOption, true> {
        return new Field<'options', BundleOption, true>('options', true)
            .addFieldList(this._getBundleOptionsFields());
    }

    _getBundleItemsFields(): Array<
    Field<'uid', string>
    | Field<'option_id', number>
    | Field<'title', string>
    | Field<'required', boolean>
    | Field<'type', string>
    | Field<'position', number>
    | Field<'sku', string>
    | Field<'options', BundleOption, true>
    > {
        return [
            new Field<'uid', string>('uid'),
            new Field<'option_id', number>('option_id'),
            new Field<'title', string>('title'),
            new Field<'required', boolean>('required'),
            new Field<'type', string>('type'),
            new Field<'position', number>('position'),
            new Field<'sku', string>('sku'),
            this._getBundleOptionsField()
        ];
    }

    _getBundleItemsField(): Field<'items', BundleItem, true> {
        return new Field<'items', BundleItem, true>('items', true)
            .addFieldList(this._getBundleItemsFields());
    }

    _getBundlePriceOptionSelectionFields(): Array<
    Field<'selection_id', number>
    | Field<'final_option_price', number>
    | Field<'final_option_price_excl_tax', number>
    | Field<'regular_option_price', number>
    | Field<'regular_option_price_excl_tax', number>
    > {
        return [
            new Field<'selection_id', number>('selection_id'),
            new Field<'final_option_price', number>('final_option_price'),
            new Field<'final_option_price_excl_tax', number>('final_option_price_excl_tax'),
            new Field<'regular_option_price', number>('regular_option_price'),
            new Field<'regular_option_price_excl_tax', number>('regular_option_price_excl_tax')
        ];
    }

    _getBundlePriceOptionFields(): Array<
    Field<'option_id', number>
    | Field<'selection_details', BundleOptionSelection, true>
    > {
        return [
            new Field<'option_id', number>('option_id'),
            new Field<'selection_details', BundleOptionSelection, true>('selection_details', true)
                .addFieldList(this._getBundlePriceOptionSelectionFields())
        ];
    }

    _getBundlePriceOptionsField(): Field<'bundle_options', BundlePriceOption, true> {
        return new Field<'bundle_options', BundlePriceOption, true>('bundle_options', true)
            .addFieldList(this._getBundlePriceOptionFields());
    }

    _getBundleProductFragmentFields(): Array<
    Field<'dynamic_price', boolean>
    | Field<'dynamic_sku', boolean>
    | Field<'ship_bundle_items', GQLShipBundleItemsEnum>
    | Field<'dynamic_weight', boolean>
    | Field<'items', BundleItem, true>
    | Field<'bundle_options', BundlePriceOption, true>
    > {
        return [
            new Field<'dynamic_price', boolean>('dynamic_price'),
            new Field<'dynamic_sku', boolean>('dynamic_sku'),
            new Field<'ship_bundle_items', GQLShipBundleItemsEnum>('ship_bundle_items'),
            new Field<'dynamic_weight', boolean>('dynamic_weight'),
            this._getBundleItemsField(),
            this._getBundlePriceOptionsField()
        ];
    }

    _getValueFields(): Field<'value_index', number>[] {
        return [
            new Field<'value_index', number>('value_index')
        ];
    }

    _getValuesField(): Field<'values', ConfigurableProductOptionsValues, true> {
        return new Field<'values', ConfigurableProductOptionsValues, true>('values', true)
            .addFieldList(this._getValueFields());
    }

    _getConfigurableOptionFields(): Array<
    Field<'attribute_code', string>
    | Field<'values', ConfigurableProductOptionsValues, true>
    > {
        return [
            new Field<'attribute_code', string>('attribute_code'),
            this._getValuesField()
        ];
    }

    _getConfigurableOptionsField(): Field<'configurable_options', ConfigurableProductOptions, true> {
        return new Field<'configurable_options', ConfigurableProductOptions, true>('configurable_options', true)
            .addFieldList(this._getConfigurableOptionFields());
    }

    _getVariantFields(): Field<'product', ProductItem>[] {
        return [
            this._getProductField()
        ];
    }

    _getVariantsField(): Field<'variants', VariantItem, true> {
        const { isPlp = false, isForWishlist = false } = this.options;

        // For PLP page we have optimized variants graphql field
        const variantsField = isPlp && !isForWishlist ? 'variants_plp' : 'variants';

        return new Field<'variants_plp' | 'variants', VariantItem, true>(variantsField, true)
            .setAlias('variants')
            .addFieldList(this._getVariantFields());
    }

    _getConfigurableProductFragmentFields(): Array<
    Field<'configurable_options', ConfigurableProductOptions, true>
    | Field<'variants', VariantItem, true>
    > {
        return [
            this._getConfigurableOptionsField(),
            this._getVariantsField()
        ];
    }

    _getCustomizableTextValueFields(): Array<
    Field<'price', number>
    | Field<'priceInclTax', number>
    | Field<'priceExclTax', number>
    | Field<'price_type', GQLPriceTypeEnum>
    | Field<'currency', string>
    | Field<'sku', string>
    | Field<'max_characters', number>
    > {
        return [
            new Field<'price', number>('price'),
            new Field<'priceInclTax', number>('priceInclTax'),
            new Field<'priceExclTax', number>('priceExclTax'),
            new Field<'price_type', GQLPriceTypeEnum>('price_type'),
            new Field<'currency', string>('currency'),
            new Field<'sku', string>('sku'),
            new Field<'max_characters', number>('max_characters')
        ];
    }

    _getCustomizableTextValueField<A extends string>(alias: A): Field<A, CustomizableFieldValue> {
        return new Field<'value', CustomizableFieldValue>('value')
            .addFieldList(this._getCustomizableTextValueFields())
            .setAlias(alias);
    }

    _getCustomizableTextFields<A extends string>(alias: A): Array<
    Field<A, CustomizableFieldValue>
    | Field<'product_sku', string>
    > {
        return [
            this._getCustomizableTextValueField(alias),
            new Field<'product_sku', string>('product_sku')
        ];
    }

    _getCustomizableFileValueField<A extends string>(alias: A): Field<A, CustomizableFileValue, true> {
        return new Field<'value', CustomizableFileValue, true>('value', true)
            .addFieldList([
                new Field<'price', number>('price'),
                new Field<'priceInclTax', number>('priceInclTax'),
                new Field<'priceExclTax', number>('priceExclTax'),
                new Field<'price_type', GQLPriceTypeEnum>('price_type'),
                new Field<'currency', string>('currency'),
                new Field<'sku', string>('sku'),
                new Field<'file_extension', string>('file_extension')
            ])
            .setAlias(alias);
    }

    _getCustomizableAreaOption(): InlineFragment<'CustomizableAreaOption', CustomizableAreaOptionFragment> {
        return new InlineFragment<'CustomizableAreaOption', CustomizableAreaOptionFragment>('CustomizableAreaOption')
            .addFieldList(this._getCustomizableTextFields('areaValues'));
    }

    _getCustomizableFieldOption(): InlineFragment<'CustomizableFieldOption', CustomizableFieldOptionFragment> {
        return new InlineFragment<'CustomizableFieldOption', CustomizableFieldOptionFragment>('CustomizableFieldOption')
            .addFieldList(this._getCustomizableTextFields('fieldValues'));
    }

    _getCustomizableFileOption(): InlineFragment<'CustomizableFileOption', {
        fileValues: CustomizableFileValue[];
    }> {
        return new InlineFragment<'CustomizableFileOption', {
            fileValues: CustomizableFileValue[];
        }>('CustomizableFileOption')
            .addFieldList([this._getCustomizableFileValueField('fileValues')]);
    }

    _getCustomizableDateValueFields(): Array<
    Field<'price', number>
    | Field<'priceInclTax', number>
    | Field<'priceExclTax', number>
    | Field<'price_type', GQLPriceTypeEnum>
    | Field<'currency', string>
    | Field<'sku', string>
    > {
        return [
            new Field<'price', number>('price'),
            new Field<'priceInclTax', number>('priceInclTax'),
            new Field<'priceExclTax', number>('priceExclTax'),
            new Field<'price_type', GQLPriceTypeEnum>('price_type'),
            new Field<'currency', string>('currency'),
            new Field<'sku', string>('sku')
        ];
    }

    _getCustomizableDateValueField(): Field<'value', CustomizableDateValue, true> {
        return new Field<'value', CustomizableDateValue, true>('value', true)
            .addFieldList(this._getCustomizableDateValueFields());
    }

    _getCustomizableDateFields(): Array<
    Field<'value', CustomizableDateValue, true>
    | Field<'product_sku', string>
    > {
        return [
            this._getCustomizableDateValueField(),
            new Field<'product_sku', string>('product_sku')
        ];
    }

    _getCustomizableDateOption(): InlineFragment<'CustomizableDateOption', CustomizableDateOptionFragment> {
        return new InlineFragment<'CustomizableDateOption', CustomizableDateOptionFragment>('CustomizableDateOption')
            .addFieldList(this._getCustomizableDateFields());
    }

    _getCustomizableSelectionValueFields(): Array<
    Field<'uid', string>
    | Field<'option_type_id', number>
    | Field<'price', number>
    | Field<'priceInclTax', number>
    | Field<'priceExclTax', number>
    | Field<'price_type', GQLPriceTypeEnum>
    | Field<'currency', string>
    | Field<'sku', string>
    | Field<'title', string>
    | Field<'sort_order', number>
    > {
        return [
            new Field<'uid', string>('uid'),
            new Field<'option_type_id', number>('option_type_id'),
            new Field<'price', number>('price'),
            new Field<'priceInclTax', number>('priceInclTax'),
            new Field<'priceExclTax', number>('priceExclTax'),
            new Field<'price_type', GQLPriceTypeEnum>('price_type'),
            new Field<'currency', string>('currency'),
            new Field<'sku', string>('sku'),
            new Field<'title', string>('title'),
            new Field<'sort_order', number>('sort_order')
        ];
    }

    _getCustomizableSelectionValueField<A extends string>(alias: A): Field<A, CustomizableSelectionValue, true> {
        return new Field<'value', CustomizableSelectionValue, true>('value', true)
            .addFieldList(this._getCustomizableSelectionValueFields())
            .setAlias(alias);
    }

    _getCustomizableCheckboxOption(): InlineFragment<'CustomizableCheckboxOption', {
        checkboxValues: CustomizableSelectionValue[];
    }> {
        return new InlineFragment<'CustomizableCheckboxOption', { checkboxValues: CustomizableSelectionValue[] }>(
            'CustomizableCheckboxOption'
        )
            .addFieldList([this._getCustomizableSelectionValueField('checkboxValues')]);
    }

    _getCustomizableMultiOption(): InlineFragment<'CustomizableMultipleOption', {
        checkboxValues: CustomizableSelectionValue[];
    }> {
        return new InlineFragment<'CustomizableMultipleOption', { checkboxValues: CustomizableSelectionValue[] }>(
            'CustomizableMultipleOption'
        )
            .addFieldList([this._getCustomizableSelectionValueField('checkboxValues')]); // same as checkbox
    }

    _getCustomizableDropdownOption(): InlineFragment<'CustomizableDropDownOption', {
        dropdownValues: CustomizableSelectionValue[];
    }> {
        return new InlineFragment<'CustomizableDropDownOption', { dropdownValues: CustomizableSelectionValue[] }>(
            'CustomizableDropDownOption'
        )
            .addFieldList([this._getCustomizableSelectionValueField('dropdownValues')]);
    }

    _getCustomizableRadioOption(): InlineFragment<'CustomizableRadioOption', {
        dropdownValues: CustomizableSelectionValue[];
    }> {
        return new InlineFragment<'CustomizableRadioOption', {
            dropdownValues: CustomizableSelectionValue[];
        }>('CustomizableRadioOption')
            .addFieldList([this._getCustomizableSelectionValueField('dropdownValues')]); // same as dropdown
    }

    _getCustomizableProductFragmentOptionsFields(): CustomizableProductFragmentOptionsFields {
        return [
            this._getCustomizableDropdownOption(),
            this._getCustomizableRadioOption(),
            this._getCustomizableCheckboxOption(),
            this._getCustomizableMultiOption(),
            this._getCustomizableFieldOption(),
            this._getCustomizableAreaOption(),
            this._getCustomizableFileOption(),
            this._getCustomizableDateOption(),
            new Field<'title', string>('title'),
            new Field<'required', boolean>('required'),
            new Field<'sort_order', number>('sort_order'),
            new Field<'type', string>('type'),
            new Field<'uid', string>('uid')
        ];
    }

    _getCustomizableProductFragmentOptionsField(): Field<'options', CustomizableProductFragmentOptions, true> {
        return new Field<'options', CustomizableProductFragmentOptions, true>('options', true)
            .addFieldList(this._getCustomizableProductFragmentOptionsFields());
    }

    _getCustomizableProductFragment(): InlineFragment<'CustomizableProductInterface', {
        options: CustomizableProductFragmentOptions[];
    }> {
        return new InlineFragment<'CustomizableProductInterface', {
            options: CustomizableProductFragmentOptions[];
        }>(
            'CustomizableProductInterface'
        )
            .addFieldList([this._getCustomizableProductFragmentOptionsField()]);
    }

    _getSimpleProductFragmentFields(): Field<'price_tiers', TierPrice, true>[] {
        return [
            this._getTierPricesField()
        ];
    }

    _getVirtualProductFragmentFields(): Field<'price_tiers', TierPrice, true>[] {
        return [
            this._getTierPricesField()
        ];
    }

    _getTierPricesField(): Field<'price_tiers', TierPrice, true> {
        return new Field<'price_tiers', TierPrice, true>('price_tiers', true)
            .addFieldList(this._getTierPricesFields());
    }

    _getTierPricesFields(): Array<
    Field<'discount', ProductDiscount>
    | Field<'final_price', Money>
    | Field<'quantity', number>
    > {
        return [
            this._getDiscountField(),
            this._getFinalPriceField(),
            new Field<'quantity', number>('quantity')
        ];
    }

    _getDiscountField(): Field<'discount', ProductDiscount> {
        return new Field<'discount', ProductDiscount>('discount')
            .addField(new Field<'amount_off', number>('amount_off'))
            .addField(new Field<'percent_off', number>('percent_off'));
    }

    _getFinalPriceField(): Field<'final_price', Money> {
        return new Field<'final_price', Required<Money>>('final_price')
            .addField(new Field<'currency', GQLCurrencyEnum>('currency'))
            .addField(new Field<'value', number>('value'));
    }

    _getFinalPriceExclTaxField(): Field<'final_price_excl_tax', Money> {
        return new Field<'final_price_excl_tax', Money>('final_price_excl_tax')
            .addField(new Field<'currency', GQLCurrencyEnum>('currency'))
            .addField(new Field<'value', number>('value'));
    }

    _getRegularPriceField(): Field<'regular_price', Money> {
        return new Field<'regular_price', Money>('regular_price')
            .addField(new Field<'currency', GQLCurrencyEnum>('currency'))
            .addField(new Field<'value', number>('value'));
    }

    _getRegularPriceExclTaxField(): Field<'regular_price_excl_tax', Money> {
        return new Field<'regular_price_excl_tax', Money>('regular_price_excl_tax')
            .addField(new Field<'currency', GQLCurrencyEnum>('currency'))
            .addField(new Field<'value', number>('value'));
    }

    _getDefaultFinalPriceExclTaxField(): Field<'default_final_price_excl_tax', Money> {
        return new Field<'default_final_price_excl_tax', Money>('default_final_price_excl_tax')
            .addField(new Field<'currency', GQLCurrencyEnum>('currency'))
            .addField(new Field<'value', number>('value'));
    }

    _getDefaultPriceField(): Field<'default_price', Money> {
        return new Field<'default_price', Money>('default_price')
            .addField(new Field<'currency', GQLCurrencyEnum>('currency'))
            .addField(new Field<'value', number>('value'));
    }

    _getDefaultFinalPriceField(): Field<'default_final_price', Money> {
        return new Field<'default_final_price', Money>('default_final_price')
            .addField(new Field<'currency', GQLCurrencyEnum>('currency'))
            .addField(new Field<'value', number>('value'));
    }

    _getBundleProductFragment(): InlineFragment<'BundleProduct', BundleProductFragment> {
        return new InlineFragment<'BundleProduct', BundleProductFragment>('BundleProduct')
            .addFieldList(this._getBundleProductFragmentFields());
    }

    _getConfigurableProductFragment(): InlineFragment<'ConfigurableProduct', ConfigurableProductFragment> {
        return new InlineFragment<'ConfigurableProduct', ConfigurableProductFragment>('ConfigurableProduct')
            .addFieldList(this._getConfigurableProductFragmentFields());
    }

    _getSimpleProductFragment(): InlineFragment<'SimpleProduct', {
        price_tiers: TierPrice[];
    }> {
        return new InlineFragment<'SimpleProduct', {
            price_tiers: TierPrice[];
        }>('SimpleProduct')
            .addFieldList(this._getSimpleProductFragmentFields());
    }

    _getVirtualProductFragment(): InlineFragment<'VirtualProduct', {
        price_tiers: TierPrice[];
    }> {
        return new InlineFragment<'VirtualProduct', {
            price_tiers: TierPrice[];
        }>('VirtualProduct')
            .addFieldList(this._getVirtualProductFragmentFields());
    }

    _getSortOptionFields(): Array<
    Field<'value', string>
    | Field<'label', string>
    > {
        return [
            new Field<'value', string>('value'),
            new Field<'label', string>('label')
        ];
    }

    _getSortOptionsField(): Field<'options', SortField, true> {
        return new Field<'options', SortField, true>('options', true)
            .addFieldList(this._getSortOptionFields());
    }

    _getSortFields(): Field<'options', SortField, true>[] {
        return [
            this._getSortOptionsField()
        ];
    }

    _getSortField(): Field<'sort_fields', SortFields> {
        return new Field<'sort_fields', SortFields>('sort_fields')
            .addFieldList(this._getSortFields());
    }

    _getSwatchDataFields(): Array<
    Field<'type', string>
    | Field<'value', string>
    > {
        return [
            new Field<'type', string>('type'),
            new Field<'value', string>('value')
        ];
    }

    _getSwatchDataField(): Field<'swatch_data', SwatchData> {
        return new Field<'swatch_data', SwatchData>('swatch_data')
            .addFieldList(this._getSwatchDataFields());
    }

    _getAggregationsField(): Field<'filters', Aggregation, true> {
        return new Field<'aggregations', Aggregation, true>('aggregations', true)
            .setAlias('filters')
            .addFieldList(this._getAggregationsFields());
    }

    _getAggregationsFields(): Array<
    Field<'name', string>
    | Field<'request_var', string>
    | Field<'is_boolean', boolean>
    | Field<'has_swatch', boolean>
    | Field<'position', number>
    | Field<'filter_items', AggregationOption, true>
    > {
        return [
            new Field<'label', string>('label').setAlias('name'),
            new Field<'attribute_code', string>('attribute_code').setAlias('request_var'),
            new Field<'is_boolean', boolean>('is_boolean'),
            new Field<'has_swatch', boolean>('has_swatch'),
            new Field<'position', number>('position'),
            this._getAggregationsOptionsField()
        ];
    }

    _getAggregationsOptionsField(): Field<'filter_items', AggregationOption, true> {
        return new Field<'options', AggregationOption, true>('options', true)
            .setAlias('filter_items')
            .addFieldList(this._getAggregationsOptionsFields());
    }

    _getAggregationsOptionsFields(): Array<
    Field<'label', string>
    | Field<'count', number>
    | Field<'value_string', string>
    | Field<'swatch_data', SwatchData>
    > {
        return [
            new Field<'label', string>('label'),
            new Field<'count', number>('count'),
            new Field<'value', string>('value').setAlias('value_string'),
            this._getSwatchDataField()
        ];
    }

    _getPageInfoField(): Field<'page_info', SearchResultPageInfo> {
        return new Field<'page_info', SearchResultPageInfo>('page_info')
            .addField(new Field<'current_page', number>('current_page'))
            .addField(new Field<'total_pages', number>('total_pages'));
    }
}

export default new ProductListQuery();
