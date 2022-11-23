/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
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
import { CartBundleOption, CartCustomizableOption } from 'Query/Cart.type';
import Button from 'Src/ui-library/Button';
import { ReactElement } from 'Type/Common.type';
import {
    GQLCurrencyEnum,
    GQLSelectedBundleOptionValue,
    GQLSelectedCustomizableOption,
    GQLSelectedDownloadableLinks,
} from 'Type/Graphql.type';
import { formatPrice } from 'Util/Price';
import { ValidationInputType } from 'Util/Validator/Config';

import { CartItemComponentProductOption, CartItemComponentProps } from './CartItem.type';

import './CartItem.style';

/**
 * Cart and CartOverlay item
 * @class CartItem
 * @namespace Component/CartItem/Component
 */
export class CartItemComponent extends PureComponent<CartItemComponentProps> {
    static defaultProps: Partial<CartItemComponentProps> = {
        isCartOverlay: false,
        isMobileLayout: false,
        showLoader: true,
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
                links,
            } = {},
        } = this.props;

        return (
            <div block="CartItem" elem="Title" mods={ { isMobileLayout } }>
                { this.renderProductName() }
                { this.renderOutOfStockMessage() }
                { this.renderProductConfigurations() }
                { this.renderProductBundleOptions(bundle_options) }
                { this.renderProductOptions(customizable_options) }
                { this.renderProductLinks(links) }
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
        const { linkTo = { pathname: '' }, isProductInStock, isMobile } = this.props;

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
        option: CartItemComponentProductOption,
    ): ReactElement {
        const { label, title, values = [] } = option;

        if (Array.isArray(values) && values.length > 0) {
            return (
                <>
                    <strong>{ `${label}: ` }</strong>
                    <span>
                    { (values)
                        .map(({ label, value }) => label || value)
                        .join(', ') }
                    </span>
                </>
            );
        }

        return label || title;
    }

    renderBundleProductOptionValue(value: GQLSelectedBundleOptionValue, index: number): ReactElement {
        const {
            label, quantity, price, id,
        } = value;
        const { currency_code: currencyCode } = this.props;
        const formattedPrice = formatPrice(price, currencyCode as GQLCurrencyEnum);

        return (
            <div key={ `${id}-${index}` }>
                { `${quantity} x ${label} ` }
                <strong>{ formattedPrice }</strong>
            </div>
        );
    }

    renderBundleProductOptionLabel(option: CartBundleOption): ReactElement {
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

    renderProductBundleOption(option: CartBundleOption): ReactElement {
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

    renderProductBundleOptions(itemOptions: CartBundleOption[] = []): ReactElement {
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
        option: GQLSelectedCustomizableOption | GQLSelectedDownloadableLinks,
    ): ReactElement {
        const { id } = option;

        return (
            <div
              block="CartItem"
              elem="Option"
              key={ id }
            >
                { this.renderProductOptionLabel(option as CartItemComponentProductOption) }
            </div>
        );
    }

    renderProductOptions(itemOptions: CartCustomizableOption[] = []): ReactElement {
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
                    name = '',
                } = {},
            },
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
                prices: {
                    row_total: {
                        value: row_total = 0,
                    } = {},
                    row_total_including_tax: {
                        value: row_total_incl_tax = 0,
                    } = {},
                } = {},
            },
            isCartOverlay,
            isMobileLayout,
        } = this.props;

        return (
            <CartItemPrice
              row_total={ row_total }
              row_total_incl_tax={ row_total_incl_tax }
              currency_code={ currency_code }
              mix={ {
                  block: 'CartItem',
                  elem: 'Price',
                  mods: { isCartOverlay, isMobileLayout },
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
                quantity = 0,
                product: {
                    stock_item: {
                        qty_increments: qtyIncrement = 1,
                    } = {},
                } = {},
            } = {},
            minSaleQuantity,
            maxSaleQuantity,
            handleChangeQuantity,
            isProductInStock,
            isCartOverlay,
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
                  id="item_qty"
                  type={ FieldType.NUMBER_WITH_CONTROLS }
                  attr={ {
                      id: `${sku}_item_qty`,
                      name: `${sku}_item_qty`,
                      defaultValue: quantity,
                      min: minSaleQuantity,
                      max: maxSaleQuantity,
                      step: qtyIncrement,
                  } }
                  value={ quantity }
                  events={ {
                      onChange: handleChangeQuantity,
                  } }
                  validationRule={ {
                      inputType: ValidationInputType.NUMERIC,
                      range: {
                          min: minSaleQuantity,
                          max: maxSaleQuantity,
                      },
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
            <Button
              attr={ { name: 'RemoveItem', id: 'RemovedItem', 'aria-label': 'Remove item from cart' } }
              events={ { onClick: handleRemoveItem } }
              mix={ { block: 'CartItem', elem: 'Delete', mods: { isMobileLayout } } }
            >
                <CloseIcon />
                <span block="CartItem" elem="DeleteButtonText" mods={ { isMobileLayout } }>
                    { __('Delete') }
                </span>
            </Button>
        );
    }

    renderImageElement(): ReactElement {
        const {
            item: {
                product: { name = '' } = {},
            },
            thumbnail,
            isProductInStock,
            isMobileLayout,
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
                      isNotAvailable, isMobileLayout,
                  },
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
        const { item: { quantity } } = this.props;

        return (
            <p
              block="CartItem"
              elem="Quantity"
            >
                { __('Quantity: %s', quantity) }
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

export default CartItemComponent;
