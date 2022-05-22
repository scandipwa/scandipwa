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

import { PureComponent } from 'react';

import AddToCart from 'Component/AddToCart';
import CloseIcon from 'Component/CloseIcon';
import Image from 'Component/Image';
import { ImageRatio } from 'Component/Image/Image.type';
import Link from 'Component/Link';
import Loader from 'Component/Loader';
import ProductReviewRating from 'Component/ProductReviewRating';
import ProductWishlistButton from 'Component/ProductWishlistButton/ProductWishlistButton.container';
import { ReactElement } from 'Type/Common.type';
import { UrlType } from 'Type/Router.type';
import { ADD_TO_WISHLIST } from 'Util/Product';
import { magentoProductTransform } from 'Util/Product/Transform';

import './ProductCompareItem.style';

/** @namespace Component/ProductCompareItem/Component */
export class ProductCompareItem extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        product: ProductType.isRequired,
        addItemToCart: PropTypes.func.isRequired,
        removeComparedProduct: PropTypes.func.isRequired,
        imgUrl: PropTypes.string.isRequired,
        overrideAddToCartBtnBehavior: PropTypes.bool.isRequired,
        linkTo: UrlType,
        overriddenAddToCartBtnHandler: PropTypes.func.isRequired,
        isWishlistEnabled: PropTypes.bool.isRequired,
        isInStock: PropTypes.func.isRequired
    };

    static defaultProps = {
        linkTo: {}
    };

    renderProductImage(): ReactElement {
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
                      ratio={ ImageRatio.IMG_CUSTOM }
                      src={ imgUrl }
                      alt={ name }
                      isPlaceholder={ !id }
                    />
                </Link>
            </figure>
        );
    }

    renderTitle(): ReactElement {
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

    renderRating(): ReactElement {
        const { product: { rating_summary, review_count } } = this.props;

        if (review_count < 1) {
            return null;
        }

        return <ProductReviewRating summary={ rating_summary } count={ review_count } />;
    }

    renderWishlistButton(): ReactElement {
        const { product, isWishlistEnabled } = this.props;

        if (!isWishlistEnabled) {
            return null;
        }

        return (
            <ProductWishlistButton
              magentoProduct={ magentoProductTransform(ADD_TO_WISHLIST, product) }
              mix={ { block: 'ProductCard', elem: 'WishListButton' } }
            />
        );
    }

    renderAddToCartBtnEnabled(): ReactElement {
        const {
            addItemToCart
        } = this.props;

        return (
            <AddToCart
              addToCart={ addItemToCart }
              mix={ { block: 'ProductCompareItem', elem: 'AddToCartBtn' } }
            />
        );
    }

    renderAddToCartButtonWithLink(): ReactElement {
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
                  mix={ { block: 'ProductCompareItem', elem: 'AddToCartBtn' } }
                  disableHandler
                />
            </Link>
        );
    }

    renderAddToCartBtnDisabled(): ReactElement {
        return (
            <AddToCart
              product={ {} }
              groupedProductQuantity={ {} }
              productOptionsData={ {} }
              mix={ { block: 'ProductCompareItem', elem: 'AddToCartBtn' } }
              isDisabled
            />
        );
    }

    renderAddToCartBtn(): ReactElement {
        const {
            overrideAddToCartBtnBehavior,
            product,
            isInStock
        } = this.props;

        if (!isInStock(product)) {
            return this.renderAddToCartBtnDisabled();
        }

        if (overrideAddToCartBtnBehavior) {
            return this.renderAddToCartButtonWithLink();
        }

        return this.renderAddToCartBtnEnabled();
    }

    renderProductDetails(): ReactElement {
        return (
            <div>
                { this.renderRating() }
                { this.renderTitle() }
            </div>
        );
    }

    renderProductRemoveBtn(): ReactElement {
        const { removeComparedProduct } = this.props;

        return (
            <button
              block="ProductCompareItem"
              elem="CloseBtn"
              onClick={ removeComparedProduct }
              aria-label={ __('Remove') }
            >
                <CloseIcon />
            </button>
        );
    }

    renderLoader(): ReactElement {
        const { isLoading } = this.props;

        return <Loader isLoading={ isLoading } />;
    }

    render(): ReactElement {
        return (
            <div block="ProductCompareItem">
                <div block="ProductCompareItem" elem="Details">
                    { this.renderProductImage() }
                    { this.renderProductDetails() }
                    { this.renderProductRemoveBtn() }
                    { this.renderLoader() }
                </div>
                <div block="ProductCompareItem" elem="Actions">
                    { this.renderAddToCartBtn() }
                    { this.renderWishlistButton() }
                </div>
            </div>
        );
    }
}

export default ProductCompareItem;
