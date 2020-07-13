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

import { ProductType } from 'Type/ProductList';
import ProductLinks from 'Component/ProductLinks';
import ProductGallery from 'Component/ProductGallery';
import ProductActions from 'Component/ProductActions';
import ContentWrapper from 'Component/ContentWrapper';
import ProductReviews from 'Component/ProductReviews';
import ProductInformation from 'Component/ProductInformation';
import ProductCustomizableOptions from 'Component/ProductCustomizableOptions';
import isMobile from 'Util/Mobile';
import { SIMPLE } from 'Util/Product';
import { RELATED, UPSELL } from 'Store/LinkedProducts/LinkedProducts.reducer';

import './ProductPage.style';

/** @namespace Route/ProductPage/Component */
export class ProductPage extends ExtensiblePureComponent {
    static propTypes = {
        configurableVariantIndex: PropTypes.number.isRequired,
        productOrVariant: ProductType.isRequired,
        getLink: PropTypes.func.isRequired,
        parameters: PropTypes.objectOf(PropTypes.string).isRequired,
        updateConfigurableVariant: PropTypes.func.isRequired,
        dataSource: ProductType.isRequired,
        areDetailsLoaded: PropTypes.bool.isRequired,
        getSelectedCustomizableOptions: PropTypes.func.isRequired,
        customizableOptionsData: PropTypes.object.isRequired
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
            customizableOptionsData
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
                  customizableOptionsData={ customizableOptionsData }
                />
            </>
        );
    }

    renderCustomizableOptions() {
        const {
            dataSource: { type_id, options },
            getSelectedCustomizableOptions
        } = this.props;

        if (!isMobile.any() || type_id !== SIMPLE) {
            return null;
        }

        return (
            <ProductCustomizableOptions
              options={ options || [] }
              getSelectedCustomizableOptions={ getSelectedCustomizableOptions }
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
                <ProductInformation
                  product={ { ...dataSource, parameters } }
                  areDetailsLoaded={ areDetailsLoaded }
                />
                <ProductReviews
                  product={ dataSource }
                  areDetailsLoaded={ areDetailsLoaded }
                />
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
