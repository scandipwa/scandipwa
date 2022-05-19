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

import { KeyboardEvent, MouseEvent, PureComponent } from 'react';

import CartItemPrice from 'Component/CartItemPrice';
import CloseIcon from 'Component/CloseIcon';
import Field from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';
import Image from 'Component/Image';
import { ImageRatio } from 'Component/Image/Image.type';
import Link from 'Component/Link';
import Loader from 'Component/Loader';
import { ReactElement } from 'Type/Common.type';
import {
    GQLSelectedBundleOption,
    GQLSelectedBundleOptionValue,
    GQLSelectedCustomizableOption,
    GQLSelectedCustomizableOptionValue,
    GQLSelectedDownloadableLinks
} from 'Type/Graphql.type';
import { formatPrice } from 'Util/Price';
import { ValidationInputType } from 'Util/Validator/Config';

import { CartItemComponentProps } from './CartItem.type';

import './CartItem.style';

/**
 * Cart and CartOverlay item
 * @class CartItem
 * @namespace Component/CartItem/Component
 */
export class CartItem extends PureComponent<CartItemComponentProps> {
    static defaultProps = {
        isCartOverlay: false,
        isMobileLayout: false,
        showLoader: true
    };

    renderProductOption = this._renderProductOption.bind(this);

    renderProductConfigurations(): ReactElement {
        const { optionsLabels } = this.props;

        return (
            <div
              block="CartItem"
              elem="Options"
            >
                { optionsLabels.join(', ') }
            </div>
        );
    }

    renderWrapperContent(): ReactElement {
        const { isEditing, isMobileLayout } = this.props;

        if (isMobileLayout) {
            return this.renderMobileContent();
        }

        return isEditing ? this.renderDesktopContent() : this.renderDesktopSummary();
    }

    renderDesktopSummary(): ReactElement {
        return (
            <div block="CartItem" elem="Wrapper" mods={ { isSummary: true } }>
                { this.renderImage() }
                <div block="CartItem" elem="CartItemRows">
                    <div block="CartItem" elem="ProductInfo">
                        { this.renderTitle() }
                        { this.renderProductPrice() }
                    </div>
                    <div block="CartItem" elem="ProductActions">
                        { this.renderQuantity() }
                    </div>
                </div>
            </div>
        );
    }

    renderTitle(): ReactElement {
        const { isMobileLayout } = this.props;

        const {
            item: {
                customizable_options,
                bundle_options,
                downloadable_links
            } = {}
        } = this.props;

        return (
            <div block="CartItem" elem="Title" mods={ { isMobileLayout } }>
                { this.renderProductName() }
                { this.renderOutOfStockMessage() }
                { this.renderProductConfigurations() }
                { this.renderProductOptions(customizable_options) }
                { this.renderProductBundleOptions(bundle_options) }
                { this.renderProductLinks(downloadable_links) }
            </div>
        );
    }

    renderMobileContent(): ReactElement {
        const { isMobileLayout, isProductInStock } = this.props;

        return (
            <div block="CartItem" elem="Wrapper" mods={ { isMobileLayout, isProductOutOfStock: !isProductInStock } }>
                { this.renderImage() }
                <div block="CartItem" elem="CartItemRows">
                    <div block="CartItem" elem="ProductInfo" mods={ { isMobileLayout } }>
                        { this.renderTitle() }
                        { this.renderDeleteButton() }
                    </div>
                    <div block="CartItem" elem="ProductActions" mods={ { isMobileLayout } }>
                        { this.renderQuantityChangeField() }
                        { this.renderProductPrice() }
                    </div>
                </div>
            </div>
        );
    }

    renderDesktopContent(): ReactElement {
        return (
            <div block="CartItem" elem="Wrapper" mods={ { isCart: true } }>
                <div block="CartItem" elem="ProductInfo">
                    { this.renderImage() }
                    { this.renderTitle() }
                </div>
                <div
                  block="CartItem"
                  elem="ProductActions"
                >
                    { this.renderQuantityChangeField() }
                    { this.renderDeleteButton() }
                </div>
                { this.renderProductPrice() }
            </div>
        );
    }

    renderContent(): ReactElement {
        const { linkTo = {}, isProductInStock, isMobile } = this.props;

        if (!isProductInStock || Object.keys(linkTo).length === 0 || isMobile) {
            // If product is out of stock, or link is not set
            return (
                <span block="CartItem" elem="Link">
                    { this.renderWrapperContent() }
                </span>
            );
        }

        return (
            <Link to={ linkTo } block="CartItem" elem="Link">
                { this.renderWrapperContent() }
            </Link>
        );
    }

    renderProductOptionLabel(
        option: GQLSelectedCustomizableOption | GQLSelectedDownloadableLinks & { values?: never[] }
    ): ReactElement {
        const { label, values = [] } = option;

        if (Array.isArray(values) && values.length > 0) {
            return (
                <>
                    <strong>{ `${label}: ` }</strong>
                    <span>
                    { (values as GQLSelectedCustomizableOptionValue[])
                        .map(({ label, value }) => label || value)
                        .join(', ') }
                    </span>
                </>
            );
        }

        return label;
    }

    renderBundleProductOptionValue(value: GQLSelectedBundleOptionValue, index: number): ReactElement {
        const {
            label, quantity, price, id
        } = value;
        const { currency_code: currencyCode } = this.props;
        const formattedPrice = formatPrice(price, currencyCode);

        return (
            <div key={ `${id}-${index}` }>
                { `${quantity} x ${label} ` }
                <strong>{ formattedPrice }</strong>
            </div>
        );
    }

    renderBundleProductOptionLabel(option: GQLSelectedBundleOption): ReactElement {
        const { label, values = [] } = option;

        if (values.length === 0) {
            return null;
        }

        return (
            <>
                <div block="CartItem" elem="BundleGroupTitle">
                    <strong>{ `${label}:` }</strong>
                </div>
                <div block="CartItem" elem="BundleGroupValues">
                    { (values as GQLSelectedBundleOptionValue[]).map(this.renderBundleProductOptionValue.bind(this)) }
                </div>
            </>
        );
    }

    renderProductBundleOption(option: GQLSelectedBundleOption): ReactElement {
        const { id } = option;

        return (
            <div
              block="CartItem"
              elem="Option"
              mods={ { isBundle: true } }
              key={ id }
            >
                { this.renderBundleProductOptionLabel(option) }
            </div>
        );
    }

    renderProductBundleOptions(itemOptions: GQLSelectedBundleOption[] = []): ReactElement {
        if (!itemOptions.length) {
            return null;
        }

        return (
            <div
              block="CartItem"
              elem="Options"
            >
                { itemOptions.map(this.renderProductBundleOption.bind(this)) }
            </div>
        );
    }

    _renderProductOption(
        option: GQLSelectedCustomizableOption | GQLSelectedDownloadableLinks
    ): ReactElement {
        const { id } = option;

        return (
            <div
              block="CartItem"
              elem="Option"
              key={ id }
            >
                { this.renderProductOptionLabel(option) }
            </div>
        );
    }

    renderProductOptions(itemOptions: GQLSelectedCustomizableOption[] = []): ReactElement {
        if (!itemOptions.length) {
            return null;
        }

        return (
            <div
              block="CartItem"
              elem="Options"
            >
                { itemOptions.map(this.renderProductOption) }
            </div>
        );
    }

    renderProductLinks(itemOptions: GQLSelectedDownloadableLinks[] = []): ReactElement {
        if (!itemOptions.length) {
            return null;
        }

        return (
            <div
              block="CartItem"
              elem="ItemLinksWrapper"
            >
                <span
                  block="CartItem"
                  elem="ItemLinks"
                >
                    <strong>{ __('Links:') }</strong>
                </span>
                <div
                  block="CartItem"
                  elem="ItemOptionsWrapper"
                >
                    { itemOptions.map(this.renderProductOption) }
                </div>
            </div>
        );
    }

    renderProductName(): ReactElement {
        const {
            item: {
                product: {
                    name = ''
                } = {}
            }
        } = this.props;

        return (
            <p
              block="CartItem"
              elem="Heading"
            >
                { name }
            </p>
        );
    }

    renderProductPrice(): ReactElement {
        const {
            currency_code,
            item: {
                row_total,
                row_total_incl_tax
            },
            isCartOverlay,
            isMobileLayout
        } = this.props;

        return (
            <CartItemPrice
              row_total={ row_total }
              row_total_incl_tax={ row_total_incl_tax }
              currency_code={ currency_code }
              mix={ {
                  block: 'CartItem',
                  elem: 'Price',
                  mods: { isCartOverlay, isMobileLayout }
              } }
            />
        );
    }

    renderOutOfStockMessage(): ReactElement {
        const { isProductInStock } = this.props;

        if (isProductInStock) {
            return null;
        }

        return (
            <p block="CartItem" elem="OutOfStock">
                { __('Product is out of stock') }
            </p>
        );
    }

    quantityClickHandler(e: MouseEvent | KeyboardEvent): void {
        e.preventDefault();
    }

    renderQuantityChangeField(): ReactElement {
        const {
            item: {
                sku,
                qty,
                product: {
                    stock_item: {
                        qty_increments: qtyIncrement = 1
                    } = {}
                } = {}
            } = {},
            minSaleQuantity,
            maxSaleQuantity,
            handleChangeQuantity,
            isProductInStock,
            isCartOverlay
        } = this.props;

        if (!isProductInStock) {
            return <div block="CartItem" elem="QuantityWrapper" mods={ { isPlaceholder: true } } />;
        }

        return (
            <div
              block="CartItem"
              elem="QuantityWrapper"
              mods={ { isCartOverlay } }
              onClick={ this.quantityClickHandler }
              onKeyDown={ this.quantityClickHandler }
              role="button"
              tabIndex={ -1 }
            >
                <Field
                  type={ FieldType.NUMBER }
                  attr={ {
                      id: `${sku}_item_qty`,
                      name: `${sku}_item_qty`,
                      value: qty,
                      defaultValue: qty,
                      min: minSaleQuantity,
                      max: maxSaleQuantity,
                      step: qtyIncrement
                  } }
                  events={ {
                      onChange: handleChangeQuantity
                  } }
                  validationRule={ {
                      inputType: ValidationInputType.NUMERIC,
                      range: {
                          min: minSaleQuantity,
                          max: maxSaleQuantity
                      }
                  } }
                  validateOn={ ['onChange'] }
                  mix={ { block: 'CartItem', elem: 'Qty' } }
                />
            </div>
        );
    }

    renderDeleteButton(): ReactElement {
        const { handleRemoveItem, isMobileLayout } = this.props;

        return (
            <button
              block="CartItem"
              id="RemoveItem"
              name="RemoveItem"
              elem="Delete"
              mods={ { isMobileLayout } }
              aria-label="Remove item from cart"
              onClick={ handleRemoveItem }
            >
                <CloseIcon />
                <span block="CartItem" elem="DeleteButtonText" mods={ { isMobileLayout } }>
                    { __('Delete') }
                </span>
            </button>
        );
    }

    renderImageElement(): ReactElement {
        const {
            item: {
                product: { name = '' } = {}
            },
            thumbnail,
            isProductInStock,
            isMobileLayout
        } = this.props;
        const isNotAvailable = !isProductInStock;

        return (
            <>
            <Image
              src={ thumbnail }
              mix={ {
                  block: 'CartItem',
                  elem: 'Picture',
                  mods: {
                      isNotAvailable, isMobileLayout
                  }
              } }
              ratio={ ImageRatio.IMG_CUSTOM }
              alt={ `Product ${name} thumbnail.` }
            />
                <img
                  style={ { display: 'none' } }
                  alt={ name }
                  src={ thumbnail }
                />
            </>
        );
    }

    renderImage(): ReactElement {
        const { linkTo, isMobile } = this.props;

        if (isMobile) {
            return (
                <Link to={ linkTo } block="CartItem" elem="Link">
                    { this.renderImageElement() }
                </Link>
            );
        }

        return this.renderImageElement();
    }

    renderQuantity(): ReactElement {
        const { item: { qty } } = this.props;

        return (
            <p
              block="CartItem"
              elem="Quantity"
            >
                { __('Quantity: %s', qty) }
            </p>
        );
    }

    renderLoader(): ReactElement {
        const { showLoader, isLoading } = this.props;

        if (!showLoader) {
            return false;
        }

        return (
            <Loader isLoading={ isLoading } />
        );
    }

    render(): ReactElement {
        const { isEditing, isCartOverlay } = this.props;

        return (
            <div block="CartItem" mods={ { isEditing, isCartOverlay } }>
                { this.renderLoader() }
                { this.renderContent() }
            </div>
        );
    }
}

export default CartItem;
