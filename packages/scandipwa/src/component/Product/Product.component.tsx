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

import { createRef, PureComponent } from 'react';

import AddToCart from 'Component/AddToCart';
import FieldContainer from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';
import GroupedProductList from 'Component/GroupedProductList';
import ProductBundleOptions from 'Component/ProductBundleOptions';
import ProductCompareButton from 'Component/ProductCompareButton';
// eslint-disable-next-line max-len
import ProductConfigurableAttributes from 'Component/ProductConfigurableAttributes/ProductConfigurableAttributes.container';
import ProductCustomizableOptions from 'Component/ProductCustomizableOptions';
import ProductDownloadableLinks from 'Component/ProductDownloadableLinks';
import ProductDownloadableSamples from 'Component/ProductDownloadableSamples';
import ProductPrice from 'Component/ProductPrice';
import ProductReviewRating from 'Component/ProductReviewRating';
import ProductWishlistButton from 'Component/ProductWishlistButton';
import TextPlaceholder from 'Component/TextPlaceholder';
import { TextPlaceHolderLength } from 'Component/TextPlaceholder/TextPlaceholder.config';
import { CategoryPageLayout } from 'Route/CategoryPage/CategoryPage.config';
import { ReactElement } from 'Type/Common.type';
import { filterConfigurableOptions } from 'Util/Product';
import { IndexedBundleItem, IndexedConfigurableOption } from 'Util/Product/Product.type';
import { ValidationInputTypeNumber } from 'Util/Validator/Config';

import { ProductType } from './Product.config';
import { ProductComponentProps } from './Product.type';

/**
 * Product
 * @class Product
 * @namespace Component/Product/Component
 */
export class Product<P extends ProductComponentProps = ProductComponentProps> extends PureComponent<P> {
    static defaultProps: Partial<ProductComponentProps> = {
        configFormRef: createRef<HTMLFormElement>()
    };

    className = this.constructor.name.slice(0, -1) || 'Product';

    //#region PLACEHOLDERS
    renderTextPlaceholder(): ReactElement {
        return <TextPlaceholder />;
    }

    renderBlockPlaceholder(): ReactElement {
        return (
            <div
              block={ this.className }
              mods={ { isLoading: true, isPlaceholder: true } }
            />
        );
    }
    //#endregion

    //#region PRODUCT OPTIONS
    renderBundleOptions(): ReactElement {
        const {
            product: {
                items = []
            } = {},
            updateSelectedValues
        } = this.props;

        return (
            <ProductBundleOptions
              options={ items as IndexedBundleItem[] }
              updateSelectedValues={ updateSelectedValues }
            />
        );
    }

    renderCustomizableOptions(): ReactElement {
        const {
            product: {
                options
            },

            updateSelectedValues
        } = this.props;

        return (
            <ProductCustomizableOptions
              options={ options }
              updateSelectedValues={ updateSelectedValues }

            />
        );
    }

    renderDownloadableLinks(): ReactElement {
        const {
            setDownloadableLinks,
            product: {
                type_id,
                downloadable_product_links: links,
                links_title,
                links_purchased_separately
            }
        } = this.props;

        if (type_id !== ProductType.DOWNLOADABLE || (Array.isArray(links) && !links.length)) {
            return null;
        }

        const isRequired = links_purchased_separately === 1;

        return (
            <ProductDownloadableLinks
              links={ links }
              setLinkedDownloadables={ setDownloadableLinks }
              title={ links_title }
              isRequired={ isRequired }
            />
        );
    }

    renderDownloadableSamples(): ReactElement {
        const {
            product: {
                type_id,
                samples_title = '',
                downloadable_product_samples: samples
            }
        } = this.props;

        if (type_id !== ProductType.DOWNLOADABLE || !samples || (Array.isArray(samples) && !samples.length)) {
            return null;
        }

        return (
            <ProductDownloadableSamples
              title={ samples_title }
              samples={ samples }
            />
        );
    }

    getConfigurableAttributes(): Record<string, IndexedConfigurableOption> {
        const {
            product: { configurable_options: configurableOptions = {}, variants = [] }
        } = this.props;

        return filterConfigurableOptions(configurableOptions, variants);
    }

    renderConfigurableOptions(): ReactElement {
        const {
            // setActiveProduct,
            parameters,
            product: { type_id: type, variants = [] },
            inStock,
            addToCartTriggeredWithError,
            updateAddToCartTriggeredWithError
        } = this.props;

        if (type !== ProductType.CONFIGURABLE) {
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
                  updateAddToCartTriggeredWithError={ updateAddToCartTriggeredWithError }
                  addToCartTriggeredWithError={ addToCartTriggeredWithError }
                  mix={ { block: this.className, elem: 'Attributes' } }
                  parameters={ parameters }
                  variants={ variants }
                //   updateConfigurableVariant={ setActiveProduct }
                  configurable_options={ this.getConfigurableAttributes() }
                  isContentExpanded
                  inStock={ inStock }
                  showProductAttributeAsLink={ false }
                />
            </div>
        );
    }

    renderGroupedOptions(): ReactElement {
        const {
            product,
            product: {
                type_id: typeId
            },
            setQuantity,
            quantity
        } = this.props;

        if (typeId !== ProductType.GROUPED) {
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

    renderCustomAndBundleOptions(): ReactElement {
        const { product: { type_id }, configFormRef } = this.props;

        return (
            <form ref={ configFormRef }>
                    { type_id === ProductType.BUNDLE && this.renderBundleOptions() }
                    { this.renderCustomizableOptions() }
            </form>
        );
    }
    //#endregion

    //#region BUTTONS
    renderAddToCartButton(layout = CategoryPageLayout.GRID): ReactElement {
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

    renderWishlistButton(): ReactElement {
        const { magentoProduct, isWishlistEnabled } = this.props;

        if (magentoProduct.length === 0 || !isWishlistEnabled) {
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

    renderCompareButton(): ReactElement {
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

    renderQuantityChanger(): ReactElement {
        const {
            quantity,
            minQuantity,
            maxQuantity,
            setQuantity,
            inStock,
            product: { type_id }
        } = this.props;

        if (type_id === ProductType.GROUPED) {
            return null;
        }

        return (
            <FieldContainer
              type={ FieldType.NUMBER }
              attr={ {
                  id: 'item_qty',
                  name: 'item_qty',
                  defaultValue: quantity as number,
                  max: maxQuantity,
                  min: minQuantity
              } }
              validationRule={ {
                  inputType: ValidationInputTypeNumber.NUMERIC,
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
    renderRatingSummary(): ReactElement {
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

    renderBrand(withMeta = false): ReactElement {
        const {
            product: {
                attributes: { brand: { attribute_value: brand = '' } = {} } = {}
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

    renderPrice(isPreview = false): ReactElement {
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
                  price={ productPrice }
                  priceType={ type as ProductType }
                  tierPrices={ priceTiers }
                  isPreview={ isPreview }
                  mix={ { block: this.className, elem: 'Price' } }
                />
            </div>
        );
    }

    renderStock(): ReactElement {
        // const { displayProductStockStatus } = this.props;
        //
        // if (!displayProductStockStatus) {
        //     return null;
        // }

        const { inStock } = this.props;

        const stockStatusLabel = inStock ? __('In stock') : __('Out of stock');

        return <span block={ this.className } elem="Stock">{ stockStatusLabel }</span>;
    }

    renderSku(): ReactElement {
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
     * @returns {ReactElement}
     */
    renderName(header = true, dynamic = false): ReactElement {
        const { product: { name }, productName } = this.props;
        const nameToRender = dynamic ? productName : name;

        if (!header) {
            return (
                <p block={ this.className } elem="Name">
                    <TextPlaceholder content={ nameToRender } length={ TextPlaceHolderLength.MEDIUM } />
                </p>
            );
        }

        return (
            <h1 block={ this.className } elem="Title" itemProp="name">
                <TextPlaceholder content={ nameToRender } length={ TextPlaceHolderLength.MEDIUM } />
            </h1>
        );
    }
    //#endregion

    render(): ReactElement {
        return null;
    }
}

export default Product;
