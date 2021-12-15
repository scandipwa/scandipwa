/* eslint-disable spaced-comment */
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

import PropTypes from 'prop-types';
import { createRef, PureComponent } from 'react';

import AddToCart from 'Component/AddToCart';
import FieldContainer from 'Component/Field';
import { FIELD_TYPE } from 'Component/Field/Field.config';
import GroupedProductList from 'Component/GroupedProductList';
import PRODUCT_TYPE from 'Component/Product/Product.config';
import ProductBundleOptions from 'Component/ProductBundleOptions';
import ProductCompareButton from 'Component/ProductCompareButton';
// eslint-disable-next-line max-len
import ProductConfigurableAttributes from 'Component/ProductConfigurableAttributes/ProductConfigurableAttributes.container';
import ProductCustomizableOptions from 'Component/ProductCustomizableOptions';
import ProductDownloadableLinks from 'Component/ProductDownloadableLinks';
import ProductDownloadableSamples from 'Component/ProductDownloadableSamples/ProductDownloadableSamples.component';
import ProductPrice from 'Component/ProductPrice';
import ProductReviewRating from 'Component/ProductReviewRating';
import ProductWishlistButton from 'Component/ProductWishlistButton';
import TextPlaceholder from 'Component/TextPlaceholder';
import { GRID_LAYOUT } from 'Route/CategoryPage/CategoryPage.config';
import { RefType } from 'Type/Common.type';
import { PriceType } from 'Type/Price.type';
import { MagentoProductType, ProductType } from 'Type/ProductList.type';
import { filterConfigurableOptions } from 'Util/Product';
import { VALIDATION_INPUT_TYPE_NUMBER } from 'Util/Validator/Config';

/**
 * Product
 * @class Product
 * @namespace Component/Product/Component
 */
export class Product extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        productName: PropTypes.string.isRequired,
        productPrice: PriceType.isRequired,
        inStock: PropTypes.bool.isRequired,
        magentoProduct: PropTypes.arrayOf(MagentoProductType).isRequired,

        quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.objectOf(PropTypes.number)]).isRequired,
        maxQuantity: PropTypes.number.isRequired,
        minQuantity: PropTypes.number.isRequired,
        setQuantity: PropTypes.func.isRequired,

        addToCart: PropTypes.func.isRequired,
        updateSelectedValues: PropTypes.func.isRequired,
        setAdjustedPrice: PropTypes.func.isRequired,
        setDownloadableLinks: PropTypes.func.isRequired,

        getActiveProduct: PropTypes.func.isRequired,
        setActiveProduct: PropTypes.func.isRequired,
        parameters: PropTypes.objectOf(PropTypes.string).isRequired,

        configFormRef: RefType
    };

    static defaultProps = {
        configFormRef: createRef()
    };

    className = this.constructor.name.slice(0, -1) || 'Product';

    //#region PLACEHOLDERS
    renderTextPlaceholder() {
        return <TextPlaceholder />;
    }

    renderBlockPlaceholder() {
        return (
            <div
              block={ this.className }
              mods={ { isLoading: true, isPlaceholder: true } }
            />
        );
    }
    //#endregion

    //#region PRODUCT OPTIONS
    renderBundleOptions() {
        const {
            product: {
                items
            } = {},
            updateSelectedValues
        } = this.props;

        return (
            <ProductBundleOptions
              updateSelectedValues={ updateSelectedValues }
              options={ items }
            />
        );
    }

    renderCustomizableOptions() {
        const {
            product: {
                options
            },
            updateSelectedValues
        } = this.props;

        return (
            <ProductCustomizableOptions
              updateSelectedValues={ updateSelectedValues }
              options={ options }
            />
        );
    }

    renderDownloadableLinks() {
        const {
            setDownloadableLinks,
            setAdjustedPrice,
            product: {
                type_id,
                downloadable_product_links: links,
                links_title,
                links_purchased_separately
            }
        } = this.props;

        if (type_id !== PRODUCT_TYPE.downloadable || (Array.isArray(links) && !links.length)) {
            return null;
        }

        const isRequired = links_purchased_separately === 1;

        return (
            <ProductDownloadableLinks
              links={ links }
              setLinkedDownloadables={ setDownloadableLinks }
              setLinkedDownloadablesPrice={ setAdjustedPrice }
              title={ links_title }
              isRequired={ isRequired }
            />
        );
    }

    renderDownloadableSamples() {
        const {
            product: {
                type_id,
                samples_title,
                downloadable_product_samples: samples
            }
        } = this.props;

        if (type_id !== PRODUCT_TYPE.downloadable || !samples || (Array.isArray(samples) && !samples.length)) {
            return null;
        }

        return (
            <ProductDownloadableSamples
              title={ samples_title }
              samples={ samples }
            />
        );
    }

    getConfigurableAttributes() {
        const {
            product: { configurable_options: configurableOptions = {}, variants = {} }
        } = this.props;

        return filterConfigurableOptions(configurableOptions, variants);
    }

    renderConfigurableOptions() {
        const {
            setActiveProduct,
            parameters,
            product: { type_id: type, variants = {} },
            inStock
        } = this.props;

        if (type !== PRODUCT_TYPE.configurable) {
            return null;
        }

        return (
            <div
              block="ProductActions"
              elem="AttributesWrapper"
            >
                <ProductConfigurableAttributes
                    // eslint-disable-next-line no-magic-numbers
                  numberOfPlaceholders={ [2, 4] }
                  mix={ { block: this.className, elem: 'Attributes' } }
                  parameters={ parameters }
                  variants={ variants }
                  updateConfigurableVariant={ setActiveProduct }
                  configurable_options={ this.getConfigurableAttributes() }
                  isContentExpanded
                  inStock={ inStock }
                />
            </div>
        );
    }

    renderGroupedOptions() {
        const {
            product,
            product: {
                type_id: typeId
            },
            setQuantity,
            quantity
        } = this.props;

        if (typeId !== PRODUCT_TYPE.grouped) {
            return null;
        }

        return (
            <div
              block={ this.className }
              elem="GroupedItems"
            >
                <GroupedProductList
                  product={ product }
                  quantity={ quantity }
                  setQuantity={ setQuantity }
                />
            </div>
        );
    }

    renderCustomAndBundleOptions() {
        const { product: { type_id }, configFormRef } = this.props;

        return (
            <form ref={ configFormRef }>
                    { type_id === PRODUCT_TYPE.bundle && this.renderBundleOptions() }
                    { this.renderCustomizableOptions() }
            </form>
        );
    }
    //#endregion

    //#region BUTTONS
    renderAddToCartButton(layout = GRID_LAYOUT) {
        const {
            addToCart,
            inStock,
            quantity,
            getActiveProduct
        } = this.props;

        return (
            <AddToCart
              mix={ { block: this.className, elem: 'AddToCart' } }
              addToCart={ addToCart }
              isDisabled={ !inStock }
              isIconEnabled={ false }
              layout={ layout }
              quantity={ quantity }
              product={ getActiveProduct() }
            />
        );
    }

    renderWishlistButton() {
        const { magentoProduct } = this.props;

        if (magentoProduct.length === 0) {
            return null;
        }

        return (
            <ProductWishlistButton
              magentoProduct={ magentoProduct }
              mix={ {
                  block: this.className,
                  elem: 'WishListButton'
              } }
            />
        );
    }

    renderCompareButton() {
        const { product: { id } } = this.props;

        if (!id) {
            return null;
        }

        return (
            <ProductCompareButton
              productId={ id }
              mix={ {
                  block: this.className,
                  elem: 'ProductCompareButton',
                  mods: { isGrey: true }
              } }
            />
        );
    }

    renderQuantityChanger() {
        const {
            quantity,
            minQuantity,
            maxQuantity,
            setQuantity,
            inStock,
            product: { type_id }
        } = this.props;

        if (type_id === PRODUCT_TYPE.grouped) {
            return null;
        }

        return (
            <FieldContainer
              type={ FIELD_TYPE.number }
              attr={ {
                  id: 'item_qty',
                  name: 'item_qty',
                  defaultValue: quantity,
                  max: maxQuantity,
                  min: minQuantity
              } }
              validationRule={ {
                  inputType: VALIDATION_INPUT_TYPE_NUMBER.numeric,
                  isRequired: true,
                  range: {
                      min: minQuantity,
                      max: maxQuantity
                  }
              } }
              isDisabled={ !inStock }
              mix={ { block: this.className, elem: 'Qty' } }
              events={ { onChange: setQuantity } }
              validateOn={ ['onChange'] }
            />
        );
    }
    //#endregion

    //#region FIELDS
    renderRatingSummary() {
        const {
            product: {
                review_summary: {
                    rating_summary,
                    review_count
                } = {}
            }
        } = this.props;

        if (!rating_summary) {
            return null;
        }

        return <ProductReviewRating summary={ rating_summary || 0 } count={ review_count } />;
    }

    renderBrand(withMeta = false) {
        const {
            product: {
                attributes: { brand: { attribute_value: brand } = {} } = {}
            }
        } = this.props;

        if (!brand) {
            return null;
        }

        return (
            <>
                { withMeta && <meta itemProp="brand" content={ brand } /> }
                <h4 block={ this.className } elem="Brand" itemProp="brand">
                    <TextPlaceholder content={ brand } />
                </h4>
            </>
        );
    }

    renderPrice(isPreview = false) {
        const { getActiveProduct, productPrice } = this.props;
        const product = getActiveProduct();

        const {
            type_id: type,
            price_tiers: priceTiers
        } = product;

        if (!productPrice) {
            return null;
        }

        return (
            <div
              block={ this.className }
              elem="PriceWrapper"
            >
                <ProductPrice
                  meta
                  price={ productPrice }
                  priceType={ type }
                  tierPrices={ priceTiers }
                  isPreview={ isPreview }
                  mix={ { block: this.className, elem: 'Price' } }
                />
            </div>
        );
    }

    renderStock() {
        // const { displayProductStockStatus } = this.props;
        //
        // if (!displayProductStockStatus) {
        //     return null;
        // }

        const { inStock } = this.props;

        const stockStatusLabel = inStock ? __('In stock') : __('Out of stock');

        return <span block={ this.className } elem="Stock">{ stockStatusLabel }</span>;
    }

    renderSku() {
        const { getActiveProduct } = this.props;
        const { sku } = getActiveProduct();

        return <span block={ this.className } elem="Sku" itemProp="sku">{ __('SKU: %s', sku) }</span>;
    }

    /**
     * Renders name if { dynamic } is set to true, then will output
     * name to active product AKA configurable products selected variant
     *
     * @param header If header outputs as H1
     * @param dynamic Name type (false - shows parent product only)
     * @returns {JSX.Element}
     */
    renderName(header = true, dynamic = false) {
        const { product: { name }, productName } = this.props;
        const nameToRender = dynamic ? productName : name;

        if (!header) {
            return (
                <p block={ this.className } elem="Name">
                    <TextPlaceholder content={ nameToRender } length="medium" />
                </p>
            );
        }

        return (
            <h1 block={ this.className } elem="Title" itemProp="name">
                <TextPlaceholder content={ nameToRender } length="medium" />
            </h1>
        );
    }
    //#endregion

    render() {
        return null;
    }
}

export default Product;
