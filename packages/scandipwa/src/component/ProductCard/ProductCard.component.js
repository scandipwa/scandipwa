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

import AddToCart from 'Component/AddToCart';
import Image from 'Component/Image';
import Link from 'Component/Link';
import Loader from 'Component/Loader';
import { Product } from 'Component/Product/Product.component';
import ProductAttributeValue from 'Component/ProductAttributeValue';
import ProductConfigurableAttributes from 'Component/ProductConfigurableAttributes';
import ProductPrice from 'Component/ProductPrice';
import TextPlaceholder from 'Component/TextPlaceholder';
import PRODUCT_TYPE from 'Config/Product.config';
import { IN_STOCK } from 'Config/Stock.config';
import { GRID_LAYOUT, LIST_LAYOUT } from 'Route/CategoryPage/CategoryPage.config';
import { DeviceType } from 'Type/Device';
import { LayoutType } from 'Type/Layout';
import { ProductType } from 'Type/ProductList';
import {
    filterConfigurableOptions
} from 'Util/Product';
import { getPrice } from 'Util/Product/Extract';

import { TIER_PRICES } from './ProductCard.config';

import './ProductCard.style';

/**
 * Product card
 * @class ProductCard
 * @namespace Component/ProductCard/Component
 */
export class ProductCard extends Product {
    static propTypes = {
        ...Product.propTypes,
        linkTo: PropTypes.shape({}),
        product: ProductType.isRequired,
        device: DeviceType.isRequired,
        thumbnail: PropTypes.string,
        getAttribute: PropTypes.func.isRequired,
        registerSharedElement: PropTypes.func.isRequired,
        children: PropTypes.element,
        isLoading: PropTypes.bool,
        mix: PropTypes.shape({}),
        renderContent: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
        isConfigurableProductOutOfStock: PropTypes.func.isRequired,
        isBundleProductOutOfStock: PropTypes.func.isRequired,
        hideWishlistButton: PropTypes.bool,
        isWishlistEnabled: PropTypes.bool.isRequired,
        hideCompareButton: PropTypes.bool,
        siblingsHaveBrands: PropTypes.bool,
        setSiblingsHaveBrands: PropTypes.func,
        siblingsHavePriceBadge: PropTypes.bool,
        setSiblingsHavePriceBadge: PropTypes.func,
        siblingsHaveConfigurableOptions: PropTypes.bool,
        layout: LayoutType,
        updateConfigurableVariant: PropTypes.func.isRequired,
        configurableVariantIndex: PropTypes.number,
        parameters: PropTypes.shape({}).isRequired,
        showSelectOptionsNotification: PropTypes.func.isRequired,
        productOrVariant: ProductType.isRequired
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
        siblingsHaveBrands: false,
        setSiblingsHaveBrands: () => null,
        siblingsHavePriceBadge: false,
        setSiblingsHavePriceBadge: () => null,
        siblingsHaveConfigurableOptions: false,
        layout: GRID_LAYOUT,
        configurableVariantIndex: -1
    };

    contentObject = {
        renderCardLinkWrapper: this.renderCardLinkWrapper.bind(this),
        pictureBlock: {
            picture: this.renderPicture.bind(this)
        },
        content: {
            review: this.renderReviews.bind(this),
            productPrice: this.renderProductPrice.bind(this),
            mainDetails: this.renderMainDetails.bind(this),
            additionalProductDetails: this.renderAdditionalProductDetails.bind(this)
        }
    };

    productTypeRenderMap = {
        [PRODUCT_TYPE.bundle]: __('Starting from'),
        [PRODUCT_TYPE.grouped]: __('Starting from'),
        [PRODUCT_TYPE.configurable]: __('As Low as'),
        [TIER_PRICES]: __('As Low as')
    };

    imageRef = createRef();

    shouldComponentUpdate(nextProps) {
        const {
            product,
            device,
            productOrVariant,
            parameters,
            layout
        } = this.props;

        const {
            product: nextProduct,
            device: nextDevice,
            productOrVariant: nextProductOrVariant,
            parameters: nextParameters,
            layout: prevLayout
        } = nextProps;

        return product !== nextProduct
            || device !== nextDevice
            || productOrVariant !== nextProductOrVariant
            || parameters !== nextParameters
            || layout !== prevLayout;
    }

    registerSharedElement = () => {
        const { registerSharedElement } = this.props;
        registerSharedElement(this.imageRef);
    };

    renderProductTypePriceBadge() {
        const {
            product: { type_id, price_tiers = [] },
            siblingsHavePriceBadge,
            setSiblingsHavePriceBadge
        } = this.props;

        const typeId = price_tiers.length ? TIER_PRICES : type_id;

        const label = this.productTypeRenderMap[typeId];
        if (!label) {
            return null;
        }

        if (!siblingsHavePriceBadge) {
            setSiblingsHavePriceBadge();
        }

        return label;
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
            product: {
                price_range: priceRange,
                price_tiers: priceTiers = [],
                type_id: type,
                dynamic_price: dynamicPrice = false
            },
            isConfigurableProductOutOfStock,
            isBundleProductOutOfStock
        } = this.props;

        if (!priceRange) {
            return <TextPlaceholder />;
        }

        switch (type) {
        case PRODUCT_TYPE.configurable:
            if (isConfigurableProductOutOfStock()) {
                return this.renderEmptyProductPrice();
            }
            break;
        case PRODUCT_TYPE.bundle:
            if (isBundleProductOutOfStock()) {
                return this.renderEmptyProductPrice();
            }
            break;
        default:
            break;
        }

        return (
            <div block="ProductCard" elem="PriceWrapper">
                <ProductPrice
                  price={ getPrice(priceRange, dynamicPrice, {}, type) }
                  price_tiers={ priceTiers }
                  mix={ { block: 'ProductCard', elem: 'Price' } }
                  label={ this.renderProductTypePriceBadge() }
                  isPreview
                  priceType={ type }
                />
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

    renderAddToCart() {
        const {
            product,
            product: {
                type_id,
                stock_status,
                options = []
            },
            configurableVariantIndex,
            layout,
            showSelectOptionsNotification
        } = this.props;

        const quantity = 1;
        const groupedProductQuantity = {};

        const requiredOptions = options.reduce((acc, { option_id, required }) => {
            if (required) {
                acc.push(option_id);
            }

            return acc;
        }, []);

        const productOptionsData = {
            requiredOptions
        };

        if (type_id === PRODUCT_TYPE.bundle || type_id === PRODUCT_TYPE.grouped) {
            return (
                <button
                  block="Button AddToCart"
                  mods={ { layout } }
                  onClick={ showSelectOptionsNotification }
                >
                    { __('Add To Cart') }
                </button>
            );
        }

        return (
            <AddToCart
              product={ product }
              configurableVariantIndex={ configurableVariantIndex }
              mix={ { block: 'ProductActions', elem: 'AddToCart' } }
              quantity={ quantity }
              groupedProductQuantity={ groupedProductQuantity }
              productOptionsData={ productOptionsData }
              disabled={ stock_status !== IN_STOCK }
              layout={ layout }
            />
        );
    }

    getAttributesToShow() {
        const {
            product: {
                configurable_options = [],
                variants
            }
        } = this.props;

        const filteredOptions = filterConfigurableOptions(configurable_options, variants);

        return Object.fromEntries(Object.entries(filteredOptions).filter(([, option]) => {
            const { attribute_options = {} } = option;

            return Object.values(attribute_options).some(({ swatch_data }) => swatch_data);
        }));
    }

    renderConfigurableOptions() {
        const {
            parameters,
            updateConfigurableVariant,
            product: { variants },
            isLoading
        } = this.props;

        return (
            <ProductConfigurableAttributes
              configurable_options={ this.getAttributesToShow() }
              updateConfigurableVariant={ updateConfigurableVariant }
              parameters={ parameters }
              variants={ variants }
              isExpandable={ false }
              isReady={ !isLoading }
              showProductAttributeAsLink={ false }
            />
        );
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
                        { this.renderProductPrice() }
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
                        { this.renderAdditionalProductDetails() }
                        { this.renderMainDetails() }
                    </div>
                    <div block="ProductCard" elem="AttributeWrapper">
                        { this.renderProductPrice() }
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
            siblingsHaveBrands,
            siblingsHavePriceBadge,
            siblingsHaveConfigurableOptions,
            layout
        } = this.props;

        const mods = {
            siblingsHaveBrands,
            siblingsHavePriceBadge,
            siblingsHaveConfigurableOptions,
            layout
        };

        if (layout === LIST_LAYOUT) {
            return (
                <li
                  block="ProductCard"
                  mods={ mods }
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
              mods={ mods }
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
