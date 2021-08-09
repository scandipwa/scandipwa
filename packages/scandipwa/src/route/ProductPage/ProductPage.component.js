/* eslint-disable react/no-unused-state */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-ProductReviewListtheme
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import ProductActions from 'Component/ProductActions';
import ProductAttributes from 'Component/ProductAttributes';
import ProductCompareButton from 'Component/ProductCompareButton';
import ProductCustomizableOptions from 'Component/ProductCustomizableOptions';
import ProductGallery from 'Component/ProductGallery';
import ProductInformation from 'Component/ProductInformation';
import ProductLinks from 'Component/ProductLinks';
import ProductReviews from 'Component/ProductReviews';
import ProductTabs from 'Component/ProductTabs';
import NoMatchHandler from 'Route/NoMatchHandler';
import {
    PRODUCT_ATTRIBUTES,
    PRODUCT_INFORMATION,
    PRODUCT_REVIEWS
} from 'Route/ProductPage/ProductPage.config';
import { RELATED, UPSELL } from 'Store/LinkedProducts/LinkedProducts.reducer';
import { DeviceType } from 'Type/Device';
import { ProductType } from 'Type/ProductList';

import './ProductPage.style';

/** @namespace Route/ProductPage/Component */
export class ProductPage extends PureComponent {
    static propTypes = {
        configurableVariantIndex: PropTypes.number.isRequired,
        productOrVariant: ProductType.isRequired,
        getLink: PropTypes.func.isRequired,
        parameters: PropTypes.objectOf(PropTypes.string).isRequired,
        updateConfigurableVariant: PropTypes.func.isRequired,
        dataSource: ProductType.isRequired,
        areDetailsLoaded: PropTypes.bool.isRequired,
        getSelectedCustomizableOptions: PropTypes.func.isRequired,
        setActiveTabToReviewTab: PropTypes.func.isRequired,
        setLinkedDownloadables: PropTypes.func.isRequired,
        setLinkedDownloadablesPrice: PropTypes.func.isRequired,
        productOptionsData: PropTypes.object.isRequired,
        setBundlePrice: PropTypes.func.isRequired,
        selectedLinkPrice: PropTypes.number.isRequired,
        selectedBundlePrice: PropTypes.number.isRequired,
        device: DeviceType.isRequired,
        isInformationTabEmpty: PropTypes.bool.isRequired,
        isAttributesTabEmpty: PropTypes.bool.isRequired,
        selectedBundlePriceExclTax: PropTypes.number.isRequired,
        selectedInitialBundlePrice: PropTypes.number.isRequired,
        productTabsDefaultValue: PropTypes.number.isRequired,
        handleSetReviewTabIndex: PropTypes.func.isRequired
    };

    tabMap = {
        [PRODUCT_INFORMATION]: {
            name: __('About'),
            tabKey: PRODUCT_INFORMATION,
            shouldTabRender: () => {
                const { isInformationTabEmpty } = this.props;

                return !isInformationTabEmpty;
            },
            render: (key) => this.renderProductInformationTab(key),
            key: PRODUCT_INFORMATION
        },
        [PRODUCT_ATTRIBUTES]: {
            name: __('Details'),
            tabKey: PRODUCT_ATTRIBUTES,
            shouldTabRender: () => {
                const { isAttributesTabEmpty } = this.props;

                return !isAttributesTabEmpty;
            },
            render: (key) => this.renderProductAttributesTab(key),
            key: PRODUCT_ATTRIBUTES
        },
        [PRODUCT_REVIEWS]: {
            name: __('Reviews'),
            tabKey: PRODUCT_REVIEWS,
            // Return true since we always show 'Add review' button
            shouldTabRender: () => true,
            render: (key) => this.renderProductReviewsTab(key)
        }
    };

    renderProductCompareButton() {
        const {
            dataSource: { id } = {},
            device: { isMobile } = {}
        } = this.props;

        if (!isMobile) {
            return null;
        }

        return (
            <div block="ProductPage" elem="ProductCompareButtonWrapper">
                <ProductCompareButton
                  productId={ id }
                  mix={ {
                      block: 'ProductCompareButton',
                      mods: { isGrey: true }
                  } }
                />
            </div>
        );
    }

    renderProductPageContent() {
        const {
            configurableVariantIndex,
            parameters,
            getLink,
            dataSource,
            updateConfigurableVariant,
            productOrVariant,
            areDetailsLoaded,
            getSelectedCustomizableOptions,
            productOptionsData,
            setActiveTabToReviewTab,
            setBundlePrice,
            selectedBundlePrice,
            selectedInitialBundlePrice,
            selectedBundlePriceExclTax,
            setLinkedDownloadables,
            setLinkedDownloadablesPrice,
            selectedLinkPrice
        } = this.props;

        return (
            <>
                <ProductGallery
                  product={ productOrVariant }
                  areDetailsLoaded={ areDetailsLoaded }
                />
                { this.renderProductCompareButton() }
                <ProductActions
                  getLink={ getLink }
                  updateConfigurableVariant={ updateConfigurableVariant }
                  product={ dataSource }
                  productOrVariant={ productOrVariant }
                  parameters={ parameters }
                  areDetailsLoaded={ areDetailsLoaded }
                  configurableVariantIndex={ configurableVariantIndex }
                  getSelectedCustomizableOptions={ getSelectedCustomizableOptions }
                  productOptionsData={ productOptionsData }
                  setActiveTabToReviewTab={ setActiveTabToReviewTab }
                  setBundlePrice={ setBundlePrice }
                  selectedBundlePrice={ selectedBundlePrice }
                  selectedInitialBundlePrice={ selectedInitialBundlePrice }
                  selectedBundlePriceExclTax={ selectedBundlePriceExclTax }
                  setLinkedDownloadables={ setLinkedDownloadables }
                  setLinkedDownloadablesPrice={ setLinkedDownloadablesPrice }
                  selectedLinkPrice={ selectedLinkPrice }
                />
            </>
        );
    }

    renderCustomizableOptions() {
        const {
            dataSource: { options },
            getSelectedCustomizableOptions,
            productOptionsData,
            device
        } = this.props;

        if (!device.isMobile) {
            return null;
        }

        return (
            <ProductCustomizableOptions
              options={ options || [] }
              getSelectedCustomizableOptions={ getSelectedCustomizableOptions }
              productOptionsData={ productOptionsData }
            />
        );
    }

    renderProductInformationTab(key) {
        const {
            dataSource,
            parameters,
            areDetailsLoaded
        } = this.props;

        return (
            <ProductInformation
              product={ { ...dataSource, parameters } }
              areDetailsLoaded={ areDetailsLoaded }
              key={ key }
            />
        );
    }

    renderProductAttributesTab(key) {
        const {
            dataSource,
            parameters,
            areDetailsLoaded
        } = this.props;

        return (
            <ProductAttributes
              product={ { ...dataSource, parameters } }
              areDetailsLoaded={ areDetailsLoaded }
              key={ key }
            />
        );
    }

    renderProductReviewsTab(key) {
        const {
            dataSource,
            areDetailsLoaded
        } = this.props;

        return (
            <ProductReviews
              product={ dataSource }
              areDetailsLoaded={ areDetailsLoaded }
              key={ key }
            />
        );
    }

    shouldTabsRender() {
        return Object.values(this.tabMap).filter(({ shouldTabRender }) => shouldTabRender());
    }

    renderProductTabs() {
        const {
            productTabsDefaultValue,
            handleSetReviewTabIndex,
            dataSource: { id: productId }
        } = this.props;

        return (
            <ProductTabs
              tabs={ this.shouldTabsRender() }
              defaultTab={ productTabsDefaultValue }
              handleSetReviewTabIndex={ handleSetReviewTabIndex }
              productId={ productId }
            />
        );
    }

    renderAdditionalSections() {
        const {
            areDetailsLoaded
        } = this.props;

        return (
            <>
                { this.renderCustomizableOptions() }
                { this.renderProductTabs() }
                <ProductLinks
                  linkType={ RELATED }
                  title={ __('Recommended for you') }
                  areDetailsLoaded={ areDetailsLoaded }
                />
                <ProductLinks
                  linkType={ UPSELL }
                  title={ __('You might also like') }
                  areDetailsLoaded={ areDetailsLoaded }
                />
            </>
        );
    }

    render() {
        return (
            <NoMatchHandler>
                <main
                  block="ProductPage"
                  aria-label="Product page"
                  itemScope
                  itemType="http://schema.org/Product"
                >
                    <ContentWrapper
                      wrapperMix={ { block: 'ProductPage', elem: 'Wrapper' } }
                      label={ __('Main product details') }
                    >
                        { this.renderProductPageContent() }
                    </ContentWrapper>
                    { this.renderAdditionalSections() }
                </main>
            </NoMatchHandler>
        );
    }
}

export default ProductPage;
