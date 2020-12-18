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

import Image from 'Component/Image';
import Link from 'Component/Link';
import Loader from 'Component/Loader';
import ProductAttributeValue from 'Component/ProductAttributeValue';
import ProductPrice from 'Component/ProductPrice';
import ProductReviewRating from 'Component/ProductReviewRating';
import ProductWishlistButton from 'Component/ProductWishlistButton';
import TextPlaceholder from 'Component/TextPlaceholder';
import TierPrices from 'Component/TierPrices';
import { DeviceType } from 'Type/Device';
import { ProductType } from 'Type/ProductList';
import { BUNDLE, CONFIGURABLE } from 'Util/Product';

import { OPTION_TYPE_COLOR, validOptionTypes } from './ProductCard.config';

import './ProductCard.style';
/**
 * Product card
 * @class ProductCard
 * @namespace Component/ProductCard/Component
 */
export class ProductCard extends PureComponent {
    static propTypes = {
        linkTo: PropTypes.shape({}),
        product: ProductType.isRequired,
        device: DeviceType.isRequired,
        productOrVariant: ProductType.isRequired,
        thumbnail: PropTypes.string,
        availableVisualOptions: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
            type: PropTypes.string
        })).isRequired,
        getAttribute: PropTypes.func.isRequired,
        registerSharedElement: PropTypes.func.isRequired,
        children: PropTypes.element,
        isLoading: PropTypes.bool,
        mix: PropTypes.shape({}),
        renderContent: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
        isConfigurableProductOutOfStock: PropTypes.func.isRequired,
        isBundleProductOutOfStock: PropTypes.func.isRequired,
        hideWishlistButton: PropTypes.bool,
        siblingsHaveBrands: PropTypes.bool,
        setSiblingsHaveBrands: PropTypes.func,
        siblingsHavePriceBadge: PropTypes.bool,
        setSiblingsHavePriceBadge: PropTypes.func,
        siblingsHaveTierPrice: PropTypes.bool,
        setSiblingsHaveTierPrice: PropTypes.func,
        siblingsHaveConfigurableOptions: PropTypes.bool,
        setSiblingsHaveConfigurableOptions: PropTypes.func
    };

    static defaultProps = {
        thumbnail: '',
        linkTo: {},
        children: null,
        isLoading: false,
        mix: {},
        renderContent: false,
        hideWishlistButton: false,
        siblingsHaveBrands: false,
        setSiblingsHaveBrands: () => null,
        siblingsHavePriceBadge: false,
        setSiblingsHavePriceBadge: () => null,
        siblingsHaveTierPrice: false,
        setSiblingsHaveTierPrice: () => null,
        siblingsHaveConfigurableOptions: false,
        setSiblingsHaveConfigurableOptions: () => null
    };

    contentObject = {
        renderCardLinkWrapper: this.renderCardLinkWrapper.bind(this),
        pictureBlock: {
            picture: this.renderPicture.bind(this)
        },
        content: {
            review: this.renderReviews.bind(this),
            productPrice: this.renderProductPrice.bind(this),
            confOptions: this.renderVisualConfigurableOptions.bind(this),
            tierPrice: this.renderTierPrice.bind(this),
            mainDetails: this.renderMainDetails.bind(this),
            additionalProductDetails: this.renderAdditionalProductDetails.bind(this)
        }
    };

    imageRef = createRef();

    registerSharedElement = () => {
        const { registerSharedElement } = this.props;
        registerSharedElement(this.imageRef);
    };

    renderConfigurablePriceBadge() {
        const {
            product: { type_id },
            siblingsHavePriceBadge,
            setSiblingsHavePriceBadge
        } = this.props;

        if (type_id !== CONFIGURABLE) {
            return null;
        }

        if (!siblingsHavePriceBadge) {
            setSiblingsHavePriceBadge();
        }

        return (
            <p
              mix={ {
                  block: 'ProductCard',
                  elem: 'PriceBadge'
              } }
            >
                { __('As Low as') }
            </p>
        );
    }

    renderEmptyProductPrice() {
        return (
            <div
              block="ProductCard"
              elem="PriceWrapper"
              mods={ { isEmpty: true } }
            />
        );
    }

    renderProductPrice() {
        const {
            product: { price_range, type_id },
            isConfigurableProductOutOfStock,
            isBundleProductOutOfStock
        } = this.props;

        if (!price_range) {
            return <TextPlaceholder />;
        }

        switch (type_id) {
        case CONFIGURABLE:
            if (isConfigurableProductOutOfStock()) {
                return this.renderEmptyProductPrice();
            }
            break;
        case BUNDLE:
            if (isBundleProductOutOfStock()) {
                return this.renderEmptyProductPrice();
            }
            break;
        default:
            break;
        }

        return (
            <div block="ProductCard" elem="PriceWrapper">
                { this.renderTierPrice() }
                { this.renderConfigurablePriceBadge() }
                <ProductPrice
                  price={ price_range }
                  mix={ { block: 'ProductCard', elem: 'Price' } }
                />
            </div>
        );
    }

    renderTierPrice() {
        const {
            productOrVariant,
            siblingsHaveTierPrice,
            setSiblingsHaveTierPrice
        } = this.props;
        const { price_tiers } = productOrVariant;

        if (!price_tiers || !price_tiers.length) {
            return null;
        }

        if (!siblingsHaveTierPrice) {
            setSiblingsHaveTierPrice();
        }

        return (
            <TierPrices
              product={ productOrVariant }
              isLowestPrice
            />
        );
    }

    renderVisualOption({ value, label, type }, i) {
        const isColor = type === OPTION_TYPE_COLOR;

        return (
            <span
              block="ProductCard"
              elem={ isColor ? 'Color' : 'String' }
              key={ i }
              style={ isColor ? { backgroundColor: value } : {} }
              aria-label={ isColor ? label : '' }
              title={ isColor ? '' : label }
            >
                { isColor ? '' : value }
            </span>
        );
    }

    renderVisualConfigurableOptions() {
        const {
            siblingsHaveConfigurableOptions,
            setSiblingsHaveConfigurableOptions,
            availableVisualOptions,
            device
        } = this.props;

        if (device.isMobile || !availableVisualOptions.length) {
            return <div block="ProductCard" elem="ConfigurableOptions" />;
        }

        if (!validOptionTypes.includes(availableVisualOptions[0].type)) {
            return <div block="ProductCard" elem="ConfigurableOptions" />;
        }

        if (!siblingsHaveConfigurableOptions) {
            setSiblingsHaveConfigurableOptions();
        }

        return (
            <div block="ProductCard" elem="ConfigurableOptions">
                { availableVisualOptions.map(this.renderVisualOption) }
            </div>
        );
    }

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
        const {
            product: {
                review_summary: {
                    rating_summary
                } = {}
            }
        } = this.props;

        if (!rating_summary) {
            return null;
        }

        return (
            <div
              block="ProductCard"
              elem="Reviews"
            >
                <ProductReviewRating summary={ rating_summary || 0 } />
            </div>
        );
    }

    renderProductCardWishlistButton() {
        const { product, hideWishlistButton } = this.props;

        if (hideWishlistButton) {
            return null;
        }

        return (
            <ProductWishlistButton
              product={ product }
              mix={ { block: 'ProductCard', elem: 'WishListButton' } }
            />
        );
    }

    renderBrandValue() {
        const {
            getAttribute,
            siblingsHaveBrands,
            setSiblingsHaveBrands
        } = this.props;
        const {
            product_list_content: {
                attribute_to_display
            } = {}
        } = window.contentConfiguration;
        const brand = getAttribute(attribute_to_display || 'brand');

        if (!brand) {
            return null;
        }

        if (!siblingsHaveBrands) {
            setSiblingsHaveBrands();
        }

        return (
            <ProductAttributeValue
              attribute={ brand }
              isFormattedAsText
              mix={ {
                  block: 'ProductCard',
                  elem: 'BrandAttributeValue'
              } }
            />
        );
    }

    renderAdditionalProductDetails() {
        return (
            <div block="ProductCard" elem="Brand">
                { this.renderBrandValue() }
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
            return (<div>{ children }</div>);
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

    renderCardContent() {
        const { renderContent } = this.props;

        if (renderContent) {
            return renderContent(this.contentObject);
        }

        return (
            this.renderCardLinkWrapper((
                <>
                    <div block="ProductCard" elem="Figure-Review">
                        <figure block="ProductCard" elem="Figure">
                            { this.renderPicture() }
                        </figure>
                        { this.renderReviews() }
                    </div>
                    <div block="ProductCard" elem="Content">
                        { this.renderAdditionalProductDetails() }
                        { this.renderMainDetails() }
                        { this.renderProductPrice() }
                        { this.renderVisualConfigurableOptions() }
                    </div>
                </>
            ))
        );
    }

    render() {
        const {
            children,
            mix,
            isLoading,
            siblingsHaveBrands,
            siblingsHavePriceBadge,
            siblingsHaveTierPrice,
            siblingsHaveConfigurableOptions
        } = this.props;

        const mods = {
            siblingsHaveBrands,
            siblingsHavePriceBadge,
            siblingsHaveTierPrice,
            siblingsHaveConfigurableOptions
        };

        return (
            <li
              block="ProductCard"
              mods={ mods }
              mix={ mix }
            >
                <Loader isLoading={ isLoading } />
                { this.renderCardContent() }
                { this.renderProductCardWishlistButton() }
                <div block="ProductCard" elem="AdditionalContent">
                    { children }
                </div>
            </li>
        );
    }
}

export default ProductCard;
