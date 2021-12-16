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
import { createRef } from 'react';

import Image from 'Component/Image';
import Link from 'Component/Link';
import Loader from 'Component/Loader';
import { Product } from 'Component/Product/Product.component';
import PRODUCT_TYPE from 'Component/Product/Product.config';
import TextPlaceholder from 'Component/TextPlaceholder';
import { GRID_LAYOUT, LIST_LAYOUT } from 'Route/CategoryPage/CategoryPage.config';
import { MixType } from 'Type/Common.type';
import { DeviceType } from 'Type/Device.type';
import { LayoutType } from 'Type/Layout.type';
import { LinkType } from 'Type/Router.type';

import './ProductCard.style';

/**
 * Product card
 * @class ProductCard
 * @namespace Component/ProductCard/Component */
export class ProductCard extends Product {
    static propTypes = {
        ...Product.propTypes,
        linkTo: LinkType,
        device: DeviceType.isRequired,
        thumbnail: PropTypes.string,
        isLoading: PropTypes.bool,
        children: PropTypes.element,
        layout: LayoutType,
        mix: MixType,
        renderContent: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
        hideWishlistButton: PropTypes.bool,
        isWishlistEnabled: PropTypes.bool.isRequired,
        hideCompareButton: PropTypes.bool,
        parameters: PropTypes.objectOf(PropTypes.string).isRequired,
        showSelectOptionsNotification: PropTypes.func.isRequired,
        registerSharedElement: PropTypes.func.isRequired
    };

    static defaultProps = {
        ...Product.defaultProps,
        thumbnail: '',
        linkTo: {},
        children: null,
        isLoading: false,
        mix: {},
        renderContent: false,
        hideWishlistButton: false,
        hideCompareButton: false,
        layout: GRID_LAYOUT
    };

    contentObject = {
        renderCardLinkWrapper: this.renderCardLinkWrapper.bind(this),
        pictureBlock: {
            picture: this.renderPicture.bind(this)
        },
        content: {
            review: this.renderReviews.bind(this),
            productPrice: this.renderPrice.bind(this),
            mainDetails: this.renderMainDetails.bind(this),
            additionalProductDetails: this.renderBrand.bind(this)
        }
    };

    imageRef = createRef();

    className = 'ProductCard';

    registerSharedElement = this.registerSharedElement.bind(this);

    registerSharedElement() {
        const { registerSharedElement } = this.props;
        registerSharedElement(this.imageRef);
    }

    //#region PRICE
    renderEmptyProductPrice() {
        return (
            <div
              block="ProductCard"
              elem="PriceWrapper"
              mods={ { isEmpty: true } }
            />
        );
    }

    renderPrice() {
        const {
            getActiveProduct,
            product: {
                type_id: baseType
            } = {}
        } = this.props;

        const {
            price_range: priceRange,
            type_id: typeId
        } = getActiveProduct();

        if (!priceRange) {
            return this.renderTextPlaceholder();
        }

        // If product is not a variant.
        const notConfigured = baseType !== PRODUCT_TYPE.configurable || typeId === baseType;

        return super.renderPrice(notConfigured);
    }
    //#endregion

    renderPicture(mix = {}) {
        const { product: { id, name }, thumbnail } = this.props;

        this.sharedComponent = (
            <Image
              imageRef={ this.imageRef }
              src={ thumbnail }
              alt={ name }
              ratio="custom"
              mix={ { block: 'ProductCard', elem: 'Picture', mix } }
              isPlaceholder={ !id }
            />
        );

        return (
            <>
                { this.sharedComponent }
                <img
                  style={ { display: 'none' } }
                  alt={ name }
                  src={ thumbnail }
                />
            </>
        );
    }

    renderReviews() {
        const { layout } = this.props;

        return (
            <div
              block="ProductCard"
              elem="Reviews"
              mods={ { layout } }
            >
                { this.renderRatingSummary() }
            </div>
        );
    }

    renderProductCompareButton() {
        const {
            hideCompareButton
        } = this.props;

        if (hideCompareButton) {
            return null;
        }

        return this.renderCompareButton();
    }

    renderProductCardWishlistButton() {
        const { hideWishlistButton, isWishlistEnabled } = this.props;

        if (hideWishlistButton || !isWishlistEnabled) {
            return null;
        }

        return this.renderWishlistButton();
    }

    renderProductActions() {
        return (
            <div block="ProductCard" elem="ProductActions">
                { this.renderProductCardWishlistButton() }
                { this.renderProductCompareButton() }
            </div>
        );
    }

    renderMainDetails() {
        const { product: { name } } = this.props;

        return (
            <p
              block="ProductCard"
              elem="Name"
              mods={ { isLoaded: !!name } }
            >
                <TextPlaceholder content={ name } length="medium" />
            </p>
        );
    }

    renderCardLinkWrapper(children, mix = {}) {
        const { linkTo, product: { url } } = this.props;

        if (!url) {
            return (
                <div
                  block="ProductCard"
                  elem="Link"
                >
                    { children }
                </div>
            );
        }

        return (
            <Link
              block="ProductCard"
              elem="Link"
              to={ linkTo }
              onClick={ this.registerSharedElement }
              mix={ mix }
            >
              { children }
            </Link>
        );
    }

    requiresConfiguration() {
        const {
            product: {
                type_id: type,
                options = [],
                links_purchased_separately
            }
        } = this.props;

        const configureBundleAndGrouped = type === PRODUCT_TYPE.bundle || type === PRODUCT_TYPE.grouped;
        const configureConfig = type === PRODUCT_TYPE.configurable
            // eslint-disable-next-line max-len
            && Object.keys(super.getConfigurableAttributes()).length !== Object.keys(this.getConfigurableAttributes()).length;
        const configureCustomize = options.some(({ required = false }) => required);
        const configureDownloadableLinks = PRODUCT_TYPE.downloadable && links_purchased_separately === 1;

        return configureBundleAndGrouped || configureConfig || configureCustomize || configureDownloadableLinks;
    }

    renderAddToCart() {
        const {
            layout,
            showSelectOptionsNotification,
            inStock
        } = this.props;

        if (inStock && this.requiresConfiguration()) {
            return (
                <button
                  block="Button AddToCart"
                  mods={ { layout } }
                  onClick={ showSelectOptionsNotification }
                >
                    { __('Add to cart') }
                </button>
            );
        }

        if (!inStock) {
            return (
                <div block="ProductCard" elem="OutOfStock">
                    <p>
                        { __('Out of stock') }
                    </p>
                </div>
            );
        }

        return this.renderAddToCartButton(layout);
    }

    getConfigurableAttributes() {
        const filteredOptions = super.getConfigurableAttributes();

        return Object.fromEntries(Object.entries(filteredOptions).filter(([, option]) => {
            const { attribute_options: attributeOptions = {} } = option;

            return Object.values(attributeOptions).some(({ swatch_data: swatchData }) => swatchData);
        }));
    }

    renderVisibleOnHover() {
        const { device } = this.props;

        if (device.isMobile) {
            return null;
        }

        return (
            <>
                { this.renderConfigurableOptions() }
                <div block="ProductCard" elem="Footer">
                    { this.renderAddToCart() }
                    { this.renderProductActions() }
                </div>
            </>
        );
    }

    renderCardContent() {
        const { renderContent } = this.props;

        if (renderContent) {
            return renderContent(this.contentObject);
        }

        return (
            this.renderCardLinkWrapper((
                <>
                    <div block="ProductCard" elem="FigureReview">
                        <figure block="ProductCard" elem="Figure">
                            { this.renderPicture() }
                        </figure>
                    </div>
                    <div block="ProductCard" elem="Content">
                        { this.renderReviews() }
                        { this.renderBrand() }
                        { this.renderName(false) }
                        { this.renderPrice() }
                    </div>
                    <div block="ProductCard" elem="VisibleOnHover">
                        { this.renderVisibleOnHover() }
                    </div>
                </>
            ))
        );
    }

    renderCardListContent() {
        const {
            children, layout, renderContent
        } = this.props;

        if (renderContent) {
            return renderContent(this.contentObject);
        }

        return this.renderCardLinkWrapper((
            <div block="ProductCard" elem="Link">
                <div block="ProductCard" elem="FigureReview">
                    <figure block="ProductCard" elem="Figure">
                        { this.renderPicture() }
                    </figure>
                </div>
                <div block="ProductCard" elem="Content" mods={ { layout } }>
                    <div block="ProductCard" elem="MainInfo">
                        { this.renderReviews() }
                        { this.renderBrand() }
                        { this.renderMainDetails() }
                    </div>
                    <div block="ProductCard" elem="AttributeWrapper">
                        { this.renderPrice() }
                        { this.renderConfigurableOptions() }
                    </div>
                    <div block="ProductCard" elem="ActionWrapper">
                        { this.renderAddToCart() }
                        { this.renderProductActions() }
                    </div>
                    <div block="ProductCard" elem="AdditionalContent">
                        { children }
                    </div>
                </div>
            </div>
        ));
    }

    render() {
        const {
            children,
            mix,
            isLoading,
            layout
        } = this.props;

        if (layout === LIST_LAYOUT) {
            return (
                <li
                  block="ProductCard"
                  mods={ { layout } }
                  mix={ mix }
                >
                    <Loader isLoading={ isLoading } />
                    { this.renderCardListContent() }
                </li>
            );
        }

        return (
            <li
              block="ProductCard"
              mods={ { layout } }
              mix={ mix }
            >
                <Loader isLoading={ isLoading } />
                { this.renderCardContent() }
                <div block="ProductCard" elem="AdditionalContent">
                    { children }
                </div>
            </li>
        );
    }
}

export default ProductCard;
