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
import { PureComponent } from 'react';

import AddToCart from 'Component/AddToCart';
import Image from 'Component/Image';
import Link from 'Component/Link';
import Loader from 'Component/Loader';
import ProductPrice from 'Component/ProductPrice';
import { DeviceType } from 'Type/Device';
import { ProductType } from 'Type/ProductList';

import {
    PRODUCT_ADD_TO_CART_DEFAULT_QUANTITY,
    PRODUCT_ADD_TO_CART_DEFAULT_VARIANT_INDEX
} from './ProductCompareItem.config';

import './ProductCompareItem.style';

/** @namespace Component/ProductCompareItem/Component */
export class ProductCompareItem extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        product: ProductType.isRequired,
        removeComparedProduct: PropTypes.func.isRequired,
        getGroupedProductQuantity: PropTypes.func.isRequired,
        getProductOptionsData: PropTypes.func.isRequired,
        device: DeviceType.isRequired,
        imgUrl: PropTypes.string.isRequired,
        overrideAddToCartBtnBehavior: PropTypes.bool.isRequired,
        linkTo: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({})
        ]),
        overriddenAddToCartBtnHandler: PropTypes.func.isRequired
    };

    static defaultProps = {
        linkTo: {}
    };

    renderProductImage() {
        const {
            product: {
                id,
                name
            },
            imgUrl,
            linkTo
        } = this.props;

        return (
            <figure block="ProductCompareItem" elem="Figure">
                <Link block="ProductCompareItem" elem="ImageLink" to={ linkTo }>
                    <Image
                      ratio="custom"
                      src={ imgUrl }
                      alt={ name }
                      isPlaceholder={ !id }
                    />
                </Link>
            </figure>
        );
    }

    renderTitle() {
        const { product: { name }, linkTo } = this.props;

        return (
            <Link
              block="ProductCompareItem"
              elem="Title"
              to={ linkTo }
            >
                { name }
            </Link>
        );
    }

    renderAddToCartBtnEnabled() {
        const {
            product,
            getGroupedProductQuantity,
            getProductOptionsData
        } = this.props;

        return (
            <AddToCart
              product={ product }
              quantity={ PRODUCT_ADD_TO_CART_DEFAULT_QUANTITY }
              configurableVariantIndex={ PRODUCT_ADD_TO_CART_DEFAULT_VARIANT_INDEX }
              groupedProductQuantity={ getGroupedProductQuantity() }
              productOptionsData={ getProductOptionsData() }
              mix={ { block: 'ProductCompareItem', elem: 'AddToCartBtn' } }
            />
        );
    }

    renderAddToCartBtnDisabled() {
        const { linkTo, overriddenAddToCartBtnHandler } = this.props;
        return (
            <Link
              to={ linkTo }
              onClick={ overriddenAddToCartBtnHandler }
              block="ProductCompareItem"
              elem="AddToCartBtnWrapper"
            >
                <AddToCart
                  product={ {} }
                  groupedProductQuantity={ {} }
                  productOptionsData={ {} }
                  disableHandler
                  mix={ { block: 'ProductCompareItem', elem: 'AddToCartBtn' } }
                />
            </Link>
        );
    }

    renderAddToCartBtn() {
        const { overrideAddToCartBtnBehavior } = this.props;

        if (!overrideAddToCartBtnBehavior) {
            return this.renderAddToCartBtnEnabled();
        }

        return this.renderAddToCartBtnDisabled();
    }

    renderPrice() {
        const {
            device: { isMobile } = {},
            product: { price_range } = {}
        } = this.props;

        if (!isMobile) {
            return null;
        }

        return <ProductPrice price={ price_range } />;
    }

    renderProductDetails() {
        return (
            <div block="ProductCompareItem" elem="Details">
                { this.renderPrice() }
                { this.renderTitle() }
                { this.renderAddToCartBtn() }
            </div>
        );
    }

    renderProductRemoveBtn() {
        const { removeComparedProduct } = this.props;

        return (
            <button
              block="ProductCompareItem"
              elem="CloseBtn"
              onClick={ removeComparedProduct }
              aria-label={ __('Remove') }
            />
        );
    }

    renderLoader() {
        const { isLoading } = this.props;

        return <Loader isLoading={ isLoading } />;
    }

    render() {
        return (
            <div block="ProductCompareItem">
                { this.renderProductImage() }
                { this.renderProductDetails() }
                { this.renderProductRemoveBtn() }
                { this.renderLoader() }
            </div>
        );
    }
}

export default ProductCompareItem;
