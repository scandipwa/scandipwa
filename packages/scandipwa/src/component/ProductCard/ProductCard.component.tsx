/* eslint-disable spaced-comment */
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

import { createRef, Suspense } from 'react';

import Image from 'Component/Image';
import { ImageRatio } from 'Component/Image/Image.type';
import Link from 'Component/Link';
import Loader from 'Component/Loader';
import { ProductComponent, ProductConfigurableAttributes } from 'Component/Product/Product.component';
import { ProductType } from 'Component/Product/Product.config';
import TextPlaceholder from 'Component/TextPlaceholder';
import { TextPlaceHolderLength } from 'Component/TextPlaceholder/TextPlaceholder.config';
import { GroupedProductItem } from 'Query/ProductList.type';
import { CategoryPageLayout } from 'Route/CategoryPage/CategoryPage.config';
import { Children, ReactElement } from 'Type/Common.type';
import { IndexedConfigurableOption } from 'Util/Product/Product.type';

import { scrollToTop } from '../../util/Browser/Browser';
import { ContentObject, ProductCardComponentProps } from './ProductCard.type';

import './ProductCard.style';

/**
 * Product card
 * @class ProductCard
 * @namespace Component/ProductCard/Component */
export class ProductCardComponent extends ProductComponent<ProductCardComponentProps> {
    static defaultProps: Partial<ProductCardComponentProps> = {
        ...ProductComponent.defaultProps,
        thumbnail: '',
        linkTo: '',
        children: null,
        isLoading: false,
        mix: {},
        renderContent: null,
        hideWishlistButton: false,
        hideCompareButton: false,
        layout: CategoryPageLayout.GRID,
    };

    contentObject: ContentObject = {
        renderCardLinkWrapper: this.renderCardLinkWrapper.bind(this),
        pictureBlock: {
            picture: this.renderPicture.bind(this),
        },
        content: {
            review: this.renderReviews.bind(this),
            productPrice: this.renderPrice.bind(this),
            mainDetails: this.renderMainDetails.bind(this),
            additionalProductDetails: this.renderBrand.bind(this),
        },
    };

    imageRef = createRef<HTMLImageElement>();

    className = 'ProductCard';

    __construct(props: ProductCardComponentProps): void {
        super.__construct?.(props);

        this.handleLinkClick = this.handleLinkClick.bind(this);
    }

    handleLinkClick(): void {
        const { registerSharedElement, isPlp } = this.props;

        if (!isPlp) {
            scrollToTop();
        }

        registerSharedElement(this.imageRef);
    }

    //#region PRICE
    renderEmptyProductPrice(): ReactElement {
        return (
            <div
              block="ProductCard"
              elem="PriceWrapper"
              mods={ { isEmpty: true } }
            />
        );
    }

    renderPrice(): ReactElement {
        const {
            getActiveProduct,
            product: {
                type_id: baseType,
            } = {},
        } = this.props;

        const {
            price_range: priceRange,
            type_id: typeId,
        } = getActiveProduct();

        if (!priceRange) {
            return this.renderTextPlaceholder();
        }

        // If product is not a variant.
        const notConfigured = baseType !== ProductType.CONFIGURABLE || typeId === baseType;

        return super.renderPrice(notConfigured);
    }
    //#endregion

    renderPicture(mix = {}): ReactElement {
        const { product: { id, name }, thumbnail, onLoad } = this.props;

        return (
            <>
                <Image
                  imageRef={ this.imageRef }
                  src={ thumbnail }
                  alt={ name }
                  ratio={ ImageRatio.IMG_CUSTOM }
                  mix={ { block: 'ProductCard', elem: 'Picture', mix } }
                  isPlaceholder={ !id }
                  onImageLoad={ onLoad }
                />
                <img
                  style={ { display: 'none' } }
                  alt={ name }
                  src={ thumbnail }
                />
            </>
        );
    }

    renderReviews(): ReactElement {
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

    renderProductCompareButton(): ReactElement {
        const {
            hideCompareButton,
        } = this.props;

        if (hideCompareButton) {
            return null;
        }

        return this.renderCompareButton();
    }

    renderProductCardWishlistButton(): ReactElement {
        const { hideWishlistButton, isWishlistEnabled } = this.props;

        if (hideWishlistButton || !isWishlistEnabled) {
            return null;
        }

        return this.renderWishlistButton();
    }

    renderProductActions(): ReactElement {
        return (
            <div block="ProductCard" elem="ProductActions">
                { this.renderProductCardWishlistButton() }
                { this.renderProductCompareButton() }
            </div>
        );
    }

    renderMainDetails(): ReactElement {
        const { product: { name } } = this.props;

        return (
            <p
              block="ProductCard"
              elem="Name"
              mods={ { isLoaded: !!name } }
            >
                <TextPlaceholder content={ name } length={ TextPlaceHolderLength.MEDIUM } />
            </p>
        );
    }

    renderCardLinkWrapper(children: Children, mix = {}): ReactElement {
        const { linkTo = '', product: { url } } = this.props;

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
              onClick={ this.handleLinkClick }
              mix={ mix }
            >
              { children }
            </Link>
        );
    }

    requiresConfiguration(): boolean {
        const {
            parameters,
            product: {
                type_id: type,
                options = [],
                items = [],
                links_purchased_separately,
            },
        } = this.props;

        const configureBundle = type === ProductType.BUNDLE;

        const allAttrs = super.getConfigurableAttributes();
        const plpConfigurableAttrs = this.getConfigurableAttributes();

        const isConfigurable = type === ProductType.CONFIGURABLE;

        const configureConfig = isConfigurable && (
            (
                Object.keys(allAttrs).length
                !== Object.keys(plpConfigurableAttrs).length
            )
            || (
                Object.values(plpConfigurableAttrs).some(
                    (value) => value.attribute_values.length === 0,
                )
            )
            || (Object.keys(allAttrs).length > 0 && Object.keys(parameters).length === 0)
        );

        const configureGrouped = type === ProductType.GROUPED
            && (items as GroupedProductItem[]).every(({ qty }) => qty === 0);

        const configureCustomize = options.some(({ required = false }) => required);

        const configureDownloadableLinks = ProductType.DOWNLOADABLE && links_purchased_separately === 1;

        return configureGrouped
            || configureBundle
            || configureConfig
            || configureCustomize
            || configureDownloadableLinks;
    }

    renderAddToCart(): ReactElement {
        const {
            layout,
            showSelectOptionsNotification,
            inStock,
        } = this.props;

        const requiresConfiguration = this.requiresConfiguration();

        if (inStock && requiresConfiguration) {
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

    getConfigurableAttributes(): Record<string, IndexedConfigurableOption> {
        const filteredOptions = super.getConfigurableAttributes();

        return Object.fromEntries(
            Object.entries(filteredOptions).filter(
                ([, option]) => {
                    const { attribute_options } = option;

                    if (!attribute_options) {
                        return false;
                    }

                    return Object.values(attribute_options)
                        .some(({ swatch_data: swatchData }) => swatchData);
                },
            ),
        );
    }

    renderVisibleOnHover(): ReactElement {
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

    renderConfigurableOptions(): ReactElement {
        const {
            setActiveProduct,
            parameters,
            product: { type_id: type, variants = [] },
            inStock,
            addToCartTriggeredWithError,
            updateAddToCartTriggeredWithError,
        } = this.props;

        if (
            type !== ProductType.CONFIGURABLE
            || !Object.keys(this.getConfigurableAttributes()).length
        ) {
            return null;
        }

        return (
            <div
              block="ProductActions"
              elem="AttributesWrapper"
            >
                <Suspense fallback={ null }>
                    <ProductConfigurableAttributes
                      // eslint-disable-next-line no-magic-numbers
                      numberOfPlaceholders={ [2, 4] }
                      updateAddToCartTriggeredWithError={ updateAddToCartTriggeredWithError }
                      addToCartTriggeredWithError={ addToCartTriggeredWithError }
                      mix={ { block: this.className, elem: 'Attributes' } }
                      parameters={ parameters }
                      variants={ variants }
                      updateConfigurableVariant={ setActiveProduct }
                      configurable_options={ this.getConfigurableAttributes() }
                      isContentExpanded
                      inStock={ inStock }
                      showProductAttributeAsLink={ false }
                    />
                </Suspense>
            </div>
        );
    }

    renderCardContent(): ReactElement {
        const { renderContent, product: { name } } = this.props;

        if (renderContent) {
            return renderContent(this.contentObject);
        }

        return (
            this.renderCardLinkWrapper((
                <div block="ProductCard" elem="LinkInnerWrapper" mods={ { loaded: !!name } }>
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
                </div>
            ))
        );
    }

    renderCardListContent(): ReactElement {
        const {
            children, layout, renderContent, product: { name },
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
                    <div block="ProductCard" elem="ActionWrapper" mods={ { loaded: !!name } }>
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

    render(): ReactElement {
        const {
            children,
            mix,
            isLoading,
            layout,
        } = this.props;

        if (layout === CategoryPageLayout.LIST) {
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

export default ProductCardComponent;
