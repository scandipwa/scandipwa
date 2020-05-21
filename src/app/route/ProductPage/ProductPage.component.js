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

import { PureComponent } from 'react';
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
import { CONFIGURABLE } from 'Util/Product';
import { RELATED, UPSELL } from 'Store/LinkedProducts/LinkedProducts.reducer';

import './ProductPage.style';

export default class ProductPage extends PureComponent {
    static propTypes = {
        configurableVariantIndex: PropTypes.number.isRequired,
        productOrVariant: ProductType.isRequired,
        getLink: PropTypes.func.isRequired,
        parameters: PropTypes.objectOf(PropTypes.string).isRequired,
        updateConfigurableVariant: PropTypes.func.isRequired,
        dataSource: ProductType.isRequired,
        areDetailsLoaded: PropTypes.bool.isRequired,
        getRequiredCustomizableOptions: PropTypes.func.isRequired,
        getSelectedCustomizableOptions: PropTypes.func.isRequired,
        requiredCustomizableOptions: PropTypes.array.isRequired,
        customizable_options: PropTypes.array.isRequired,
        customizable_options_multi: PropTypes.array.isRequired
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
            getRequiredCustomizableOptions,
            getSelectedCustomizableOptions,
            requiredCustomizableOptions,
            customizable_options,
            customizable_options_multi
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
                  getRequiredCustomizableOptions={ getRequiredCustomizableOptions }
                  getSelectedCustomizableOptions={ getSelectedCustomizableOptions }
                  requiredCustomizableOptions={ requiredCustomizableOptions }
                  customizable_options={ customizable_options }
                  customizable_options_multi={ customizable_options_multi }
                />
            </>
        );
    }

    renderAdditionalSections() {
        const {
            dataSource,
            parameters,
            areDetailsLoaded,
            getRequiredCustomizableOptions,
            getSelectedCustomizableOptions
        } = this.props;

        return (
            <>
                { isMobile.any() && dataSource.type_id !== CONFIGURABLE && (
                    <ProductCustomizableOptions
                      options={ dataSource.options || [] }
                      getRequiredCustomizableOptions={ getRequiredCustomizableOptions }
                      getSelectedCustomizableOptions={ getSelectedCustomizableOptions }
                    />
                ) }
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
