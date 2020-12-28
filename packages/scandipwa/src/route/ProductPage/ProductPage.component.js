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
import ProductCustomizableOptions from 'Component/ProductCustomizableOptions';
import ProductGallery from 'Component/ProductGallery';
import ProductInformation from 'Component/ProductInformation';
import ProductLinks from 'Component/ProductLinks';
import ProductReviews from 'Component/ProductReviews';
import ProductTabs from 'Component/ProductTabs';
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
        productOptionsData: PropTypes.object.isRequired,
        setBundlePrice: PropTypes.func.isRequired,
        selectedBundlePrice: PropTypes.number.isRequired,
        device: DeviceType.isRequired
    };

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
            selectedBundlePrice
        } = this.props;

        return (
            <>
                <ProductGallery
                  product={ productOrVariant }
                  areDetailsLoaded={ areDetailsLoaded }
                />
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

    isProductInformationTabEmpty() {
        const { dataSource } = this.props;

        return !(dataSource
            && dataSource.description
            && dataSource.description.html
            && dataSource.description.html.length);
    }

    isProductAttributesTabEmpty() {
        const { dataSource } = this.props;

        return !(dataSource
                && dataSource.attributes
                && !(Object.keys(dataSource.attributes).length === 0));
    }

    getTabNames() {
        const tabNames = [];

        if (!this.isProductInformationTabEmpty()) {
            tabNames.push(__('About'));
        }

        if (!this.isProductAttributesTabEmpty()) {
            tabNames.push(__('Details'));
        }

        tabNames.push(...[
            __('Reviews')
        ]);

        return tabNames;
    }

    renderProductInformationTab() {
        const {
            dataSource,
            parameters,
            areDetailsLoaded
        } = this.props;

        if (this.isProductInformationTabEmpty()) {
            return null;
        }

        return (
            <ProductInformation
              product={ { ...dataSource, parameters } }
              areDetailsLoaded={ areDetailsLoaded }
            />
        );
    }

    renderProductAttributesTab() {
        const {
            dataSource,
            parameters,
            areDetailsLoaded
        } = this.props;

        if (this.isProductAttributesTabEmpty()) {
            return null;
        }

        return (
            <ProductAttributes
              product={ { ...dataSource, parameters } }
              areDetailsLoaded={ areDetailsLoaded }
            />
        );
    }

    renderProductTabItems() {
        const {
            dataSource,
            areDetailsLoaded
        } = this.props;

        const productTabItems = [
            this.renderProductInformationTab(),
            this.renderProductAttributesTab(),
            <ProductReviews
              product={ dataSource }
              areDetailsLoaded={ areDetailsLoaded }
            />
        ];

        return (
            <ProductTabs tabNames={ this.getTabNames() }>
                { productTabItems.filter(Boolean).map((item) => <div key={ item.toString() }>{ item }</div>) }
            </ProductTabs>
        );
    }

    renderProductTabs() {
        return (
            <>
                { this.renderProductTabItems() }
            </>
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
        );
    }
}

export default ProductPage;
