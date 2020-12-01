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
import TextPlaceholder from 'Component/TextPlaceholder';
import TierPrices from 'Component/TierPrices';
import { DeviceType } from 'Type/Device';
import { ProductType } from 'Type/ProductList';
import { CONFIGURABLE } from 'Util/Product';

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
            value: PropTypes.string
        })).isRequired,
        getAttribute: PropTypes.func.isRequired,
        registerSharedElement: PropTypes.func.isRequired,
        children: PropTypes.element,
        isLoading: PropTypes.bool,
        mix: PropTypes.shape({}),
        renderContent: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
        productsInWishlist: PropTypes.shape({})
    };

    static defaultProps = {
        thumbnail: '',
        linkTo: {},
        children: null,
        isLoading: false,
        mix: {},
        renderContent: false,
        productsInWishlist: {}
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
            product: { type_id }
        } = this.props;

        if (type_id !== CONFIGURABLE) {
            return null;
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

    renderProductPrice() {
        const { product: { price_range } } = this.props;

        if (!price_range) {
            return <TextPlaceholder />;
        }

        return (
            <>
                { this.renderConfigurablePriceBadge() }
                <ProductPrice
                  price={ price_range }
                  mix={ { block: 'ProductCard', elem: 'Price' } }
                />
            </>
        );
    }

    renderTierPrice() {
        const { productOrVariant } = this.props;

        return (
            <TierPrices
              product={ productOrVariant }
              isLowestPrice
            />
        );
    }

    renderVisualConfigurableOptions() {
        const { availableVisualOptions, device } = this.props;
        if (device.isMobile) {
            return null;
        }

        return (
            <div block="ProductCard" elem="ConfigurableOptions">
                { availableVisualOptions.map(({ value, label }) => (
                    <span
                      block="ProductCard"
                      elem="Color"
                      key={ value }
                      style={ { backgroundColor: value } }
                      aria-label={ label }
                    />
                )) }
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
        const {
            product,
            productsInWishlist
        } = this.props;

        const isInWishList = Object.values(productsInWishlist).some((e) => e.id === product.id);

        return (
            <div block="ProductCard" elem="WishListButton">
              { isInWishList ? (
                <svg block="ProductCard" elem="Fill-Heart" viewBox="0 0 15 15">
                    <g>
                    <path
                      d="M 34.5 24.65 C 34.5 17.35 28.566667 11.45 21.25 11.45 C 13.933333 11.45 8
                    17.35 8 24.65 C 8 31.933333 13.933333 37.85 21.25 37.85 C 28.566667 37.85 34.5
                    31.933333 34.5 24.65 Z M 34.5 24.65 "
                      transform="matrix(0.234375,0,0,0.234375,0,0)"
                    />
                    <path
                      d="M 55.8 24.65 C 55.8 17.35 49.933333 11.45 42.7 11.45 C 35.466667 11.45 29.6
                    17.35 29.6 24.65 C 29.6 31.933333 35.466667 37.85 42.7 37.85 C 49.933333 37.85
                    55.8 31.933333 55.8 24.65 Z M 55.8 24.65 "
                      transform="matrix(0.234375,0,0,0.234375,0,0)"
                    />
                    <path
                      d="M 14.184859 29.126633 L 40.623068 29.130077 L 40.629721 45.486224 L 14.191513 45.482781
                    Z M 14.184859 29.126633 "
                      transform="matrix(-0.171411,-0.159843,0.159843,-0.171411,5.158555,19.517794)"
                    />
                    <path
                      d="M 22.442338 28.28035 L 48.877593 28.287489 L 48.87744 45.623586 L 22.431033 45.628833
                    Z M 22.442338 28.28035 "
                      transform="matrix(0.174175,-0.156827,0.156827,0.174175,-3.648708,7.816514)"
                    />
                    </g>
                </svg>
              )
                  : (
                <svg block="ProductCard" elem="Heart" viewBox="0 0 15 15" version="1.1">
                    <g>
                    <path
                      d="M 13.789062 2.128906 C 13.003906 1.34375 11.964844 0.914062 10.851562 0.914062
                    C 9.742188 0.914062 8.699219 1.347656 7.914062 2.132812 L 7.503906 2.542969 L 7.089844
                    2.128906 C 6.304688 1.34375 5.257812 0.90625 4.148438 0.90625 C 3.039062 0.90625 1.996094
                    1.339844 1.214844 2.121094 C 0.429688 2.90625 -0.00390625 3.949219 0 5.058594 C 0 6.167969
                    0.4375 7.210938 1.222656 7.996094 L 7.191406 13.964844 C 7.277344 14.050781 7.386719 14.09375
                    7.496094 14.09375 C 7.601562 14.09375 7.714844 14.050781 7.796875 13.96875 L 13.78125
                    8.007812 C 14.566406 7.222656 15 6.179688 15 5.070312 C 15.003906 3.960938 14.574219
                    2.917969 13.789062 2.128906 Z M 13.179688 7.398438 L 7.496094 13.058594 L 1.824219 7.390625
                    C 1.203125 6.765625 0.859375 5.941406 0.859375 5.058594 C 0.859375 4.179688 1.199219 3.351562
                    1.820312 2.730469 C 2.441406 2.113281 3.269531 1.769531 4.148438 1.769531 C 5.027344 1.769531
                    5.859375 2.113281 6.480469 2.734375 L 7.199219 3.453125 C 7.367188 3.621094 7.636719 3.621094
                    7.808594 3.453125 L 8.519531 2.742188 C 9.140625 2.117188 9.972656 1.773438 10.851562 1.773438
                    C 11.726562 1.773438 12.554688 2.117188 13.179688 2.738281 C 13.800781 3.359375 14.140625 4.1875
                   14.140625 5.070312 C 14.144531 5.949219 13.800781 6.777344 13.179688 7.398438 Z M 13.179688 7.398438"
                    />
                    </g>
                </svg>
                  ) }
            </div>
        );
    }

    renderAdditionalProductDetails() {
        const { product: { sku }, getAttribute } = this.props;
        const { product_list_content: { attribute_to_display } = {} } = window.contentConfiguration;
        const brand = getAttribute(attribute_to_display || 'brand') || {};

        if (sku && !brand) {
            return null;
        }

        return (
            <div
              block="ProductCard"
              elem="Brand"
              mods={ { isLoaded: !!brand } }
            >
                <ProductAttributeValue
                  attribute={ brand }
                  isFormattedAsText
                />
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
                        { this.renderProductCardWishlistButton() }
                    </div>
                    <div block="ProductCard" elem="Content">
                        { this.renderAdditionalProductDetails() }
                        { this.renderMainDetails() }
                        { this.renderProductPrice() }
                        { this.renderTierPrice() }
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
            isLoading
        } = this.props;

        return (
            <li
              block="ProductCard"
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
