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
import { ProductType } from 'Type/ProductList';

import './ProductCompareItem.style';

/** @namespace Component/ProductCompareItem/Component */
export class ProductCompareItem extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        product: ProductType.isRequired,
        removeComparedProduct: PropTypes.func.isRequired
    };

    renderProductImage() {
        const {
            product: {
                id,
                name,
                url,
                thumbnail: { url: imgUrl }
            }
        } = this.props;

        return (
            <figure block="ProductCompareItem" elem="Figure">
                <Link block="ProductCompareItem" elem="ImageLink" to={ url }>
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
        const { product: { name, url } } = this.props;

        return (
            <Link
              block="ProductCompareItem"
              elem="Title"
              to={ url }
            >
                { name }
            </Link>
        );
    }

    renderOptions() {
        return <div block="ProductCompareItem" elem="Options">Options List</div>;
    }

    renderAddToCartBtn() {
        const { product } = this.props;
        const quantity = 1; // TODO set a proper value
        const configurableVariantIndex = 0; // TODO set a proper value

        return (
            <AddToCart
              product={ product }
              quantity={ quantity }
              configurableVariantIndex={ configurableVariantIndex }
              mix={ { block: 'ProductCompareItem', elem: 'AddToCartBtn' } }
            />
        );
    }

    renderProductDetails() {
        return (
            <div block="ProductCompareItem" elem="Details">
                { this.renderTitle() }
                { this.renderOptions() }
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
            >
                &times;
            </button>
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
