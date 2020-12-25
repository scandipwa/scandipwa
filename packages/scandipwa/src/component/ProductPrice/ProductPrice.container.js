/* eslint-disable */
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
import { PureComponent } from 'react';

import { MixType } from 'Type/Common';
import { PriceType } from 'Type/ProductList';
import {
    calculateFinalPrice,
    formatPrice,
    roundPrice
} from 'Util/Price';

import {
    DISPLAY_PRODUCT_PRICES_IN_CATALOG_BOTH,
    DISPLAY_PRODUCT_PRICES_IN_CATALOG_EXCL_TAX
} from './ProductPrice.config';

import ProductPrice from './ProductPrice.component';

/** @namespace Component/ProductPrice/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    displayTaxInPrice: state.ConfigReducer.priceTaxDisplay.product_price_display_type
});

/** @namespace Component/ProductPrice/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = (dispatch) => ({});

/**
 * Product price
 * @class ProductPrice
 * @namespace Component/ProductPrice/Container
 */
export class ProductPriceContainer extends PureComponent {
    static propTypes = {
        isSchemaRequired: PropTypes.bool,
        price: PriceType,
        mix: MixType
    };

    static defaultProps = {
        isSchemaRequired: false,
        mix: {},
        price: {}
    };

    containerProps = () => {
        const {
            price: {
                minimum_price: {
                    discount: {
                        percent_off: discountPercentage
                    } = {},
                    final_price: {
                        value: minimalPriceValue,
                        currency: priceCurrency
                    } = {},
                    regular_price: {
                        value: regularPriceValue
                    } = {}
                } = {}
            } = {}
        } = this.props;

        if (!minimalPriceValue || !regularPriceValue) {
            return {};
        }

        const roundedRegularPrice = this.getRoundedRegularPrice();
        const formattedFinalPrice = this.getFormattedFinalPrice();
        const formattedSubPrice = this.getFormattedSubPrice();

        return {
            roundedRegularPrice,
            priceCurrency,
            discountPercentage,
            formattedFinalPrice,
            formattedSubPrice
        };
    };

    getRoundedRegularPrice() {
        const {
            price: {
                minimum_price: {
                    regular_price: {
                        value: regularPriceValue
                    } = {}
                } = {}
            } = {},
            displayTaxInPrice
        } = this.props;

        // TODO
        if (displayTaxInPrice === DISPLAY_PRODUCT_PRICES_IN_CATALOG_EXCL_TAX) {
            return null;
        }

        return roundPrice(regularPriceValue)
    }

    getFormattedFinalPrice() {
        const {
            price: {
                minimum_price: {
                    discount: {
                        percent_off: discountPercentage
                    } = {},
                    final_price: {
                        value: minimalPriceValue,
                        currency: priceCurrency
                    } = {},
                    regular_price: {
                        value: regularPriceValue
                    } = {}
                } = {}
            } = {},
            displayTaxInPrice
        } = this.props;

        // TODO
        if (displayTaxInPrice === DISPLAY_PRODUCT_PRICES_IN_CATALOG_EXCL_TAX) {
            return null;
        }

        const finalPrice = calculateFinalPrice(discountPercentage, minimalPriceValue, regularPriceValue);

        return formatPrice(finalPrice, priceCurrency);
    }

    getFormattedSubPrice() {
        const {
            displayTaxInPrice
        } = this.props;

        // TODO
        if (displayTaxInPrice === DISPLAY_PRODUCT_PRICES_IN_CATALOG_BOTH) {
            return null;
        }

        return null;
    }

    render() {
        return (
            <ProductPrice
              { ...this.props }
              { ...this.containerProps() }
            />
        );
    }
}

export default ProductPriceContainer;
