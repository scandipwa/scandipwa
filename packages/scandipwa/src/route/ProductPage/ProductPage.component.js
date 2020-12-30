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
import ProductAddToCard from 'Component/ProductAddToCart';
import ProductAttributes from 'Component/ProductAttributes';
import ProductBottomSheet from 'Component/ProductBottomSheet';
import ProductCompareButton from 'Component/ProductCompareButton';
import ProductCustomizableOptions from 'Component/ProductCustomizableOptions';
import ProductGallery from 'Component/ProductGallery';
import ProductInformation from 'Component/ProductInformation';
import ProductLinks from 'Component/ProductLinks';
import ProductReviews from 'Component/ProductReviews';
import ProductTabs from 'Component/ProductTabs';
import { RELATED, UPSELL } from 'Store/LinkedProducts/LinkedProducts.reducer';
import { HistoryType } from 'Type/Common';
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
        productOptionsData: PropTypes.object.isRequired,
        setBundlePrice: PropTypes.func.isRequired,
        selectedBundlePrice: PropTypes.number.isRequired,
        device: DeviceType.isRequired,
        history: HistoryType.isRequired
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

    renderBottomPlaceholder() {
        return (
          <span
            block="ProductPage"
            elem="BottomPlaceholder"
          />
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
            setBundlePrice,
            selectedBundlePrice,
            device,
            history
        } = this.props;

        if (device.isMobile) {
            return (
                <>
                  <ProductGallery
                    product={ productOrVariant }
                    areDetailsLoaded={ areDetailsLoaded }
                  />
                  { this.renderProductCompareButton() }
                  <ProductAddToCard
                    getLink={ getLink }
                    product={ dataSource }
                    parameters={ parameters }
                    productOrVariant={ productOrVariant }
                    areDetailsLoaded={ areDetailsLoaded }
                    productOptionsData={ productOptionsData }
                    selectedBundlePrice={ selectedBundlePrice }
                    configurableVariantIndex={ configurableVariantIndex }
                  />
                  <ProductBottomSheet
                    product={ dataSource }
                    history={ history }
                  >
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
                      setBundlePrice={ setBundlePrice }
                      selectedBundlePrice={ selectedBundlePrice }
                    />
                  { this.renderAdditionalSections() }
                  { this.renderBottomPlaceholder() }
                  </ProductBottomSheet>
                </>
            );
        }

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
                  setBundlePrice={ setBundlePrice }
                  selectedBundlePrice={ selectedBundlePrice }
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

    renderAdditionalSections() {
        const {
            dataSource,
            parameters,
            areDetailsLoaded
        } = this.props;

        return (
            <>
                { this.renderCustomizableOptions() }
                <ProductTabs tabNames={ [__('About'), __('Details'), __('Reviews')] }>
                    <ProductInformation
                      product={ { ...dataSource, parameters } }
                      areDetailsLoaded={ areDetailsLoaded }
                    />
                    <ProductAttributes
                      product={ { ...dataSource, parameters } }
                      areDetailsLoaded={ areDetailsLoaded }
                    />
                    <ProductReviews
                      product={ dataSource }
                      areDetailsLoaded={ areDetailsLoaded }
                    />
                </ProductTabs>

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
        const { device } = this.props;
        return (
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
                { !device.isMobile ? this.renderAdditionalSections() : null }
            </main>
        );
    }
}

export default ProductPage;
