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
import { connect } from 'react-redux';

import { MixType } from 'Type/Common';
import { PriceType } from 'Type/ProductList';
import {
    formatPrice,
    getLowestPriceTiersPrice,
    roundPrice
} from 'Util/Price';

import ProductPrice from './ProductPrice.component';
import {
    DISPLAY_PRODUCT_PRICES_IN_CATALOG_BOTH,
    DISPLAY_PRODUCT_PRICES_IN_CATALOG_EXCL_TAX,
    DISPLAY_PRODUCT_PRICES_IN_CATALOG_INCL_TAX
} from './ProductPrice.config';

/** @namespace Component/ProductPrice/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    displayTaxInPrice: state.ConfigReducer.priceTaxDisplay?.product_price_display_type
});

/** @namespace Component/ProductPrice/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/**
 * Product price
 * @class ProductPrice
 * @namespace Component/ProductPrice/Container
 */
export class ProductPriceContainer extends PureComponent {
    static propTypes = {
        isSchemaRequired: PropTypes.bool,
        price: PriceType,
        mix: MixType,
        displayTaxInPrice: PropTypes.string,
        price_tiers: PropTypes.array,
        label: PropTypes.string,
        variantsCount: PropTypes.number
    };

    static defaultProps = {
        isSchemaRequired: false,
        displayTaxInPrice: DISPLAY_PRODUCT_PRICES_IN_CATALOG_INCL_TAX,
        mix: {},
        price: {},
        price_tiers: [],
        label: '',
        variantsCount: 0
    };

    containerProps() {
        const {
            price: {
                minimum_price: {
                    discount: {
                        percent_off: discountPercentage = 0
                    } = {},
                    final_price: {
                        value: minimalPriceValue = 0,
                        currency: priceCurrency = ''
                    } = {},
                    regular_price: {
                        value: regularPriceValue = 0
                    } = {},
                    default_price: {
                        value: defaultPriceValue = 0
                    } = {},
                    default_final_price_excl_tax: {
                        value: defaultFinalPriceExclTax = 0
                    } = {}
                } = {}
            } = {},
            isSchemaRequired,
            label,
            mix,
            price,
            price_tiers,
            variantsCount
        } = this.props;

        if ((!minimalPriceValue || !regularPriceValue) && !defaultPriceValue) {
            return {};
        }

        const roundedRegularPrice = this.getRoundedRegularPrice();
        const formattedFinalPrice = this.getFormattedFinalPrice();
        const formattedSubPrice = this.getFormattedSubPrice();

        return {
            roundedRegularPrice,
            priceCurrency,
            defaultFinalPriceExclTax,
            discountPercentage,
            formattedFinalPrice,
            formattedSubPrice,
            isSchemaRequired,
            label,
            mix,
            price,
            price_tiers,
            variantsCount
        };
    }

    getRoundedRegularPrice() {
        const {
            price: {
                minimum_price: {
                    regular_price: {
                        value: regularPriceValue = 0,
                        currency: priceCurrency
                    } = {},
                    regular_price_excl_tax: {
                        value: regularPriceExclTaxValue = 0
                    } = {}
                } = {}
            } = {},
            displayTaxInPrice
        } = this.props;

        if (displayTaxInPrice === DISPLAY_PRODUCT_PRICES_IN_CATALOG_EXCL_TAX) {
            return formatPrice(roundPrice(regularPriceExclTaxValue), priceCurrency);
        }

        return formatPrice(roundPrice(regularPriceValue), priceCurrency);
    }

    getFormattedFinalPrice() {
        const {
            price: {
                minimum_price: {
                    final_price: {
                        value: minimalPriceValue,
                        currency: priceCurrency
                    } = {},
                    final_price_excl_tax: {
                        value: minimalPriceExclTaxValue
                    } = {}
                } = {}
            } = {},
            price_tiers,
            displayTaxInPrice = ''
        } = this.props;

        if (price_tiers.length) {
            return getLowestPriceTiersPrice(price_tiers, priceCurrency);
        }

        if (displayTaxInPrice === DISPLAY_PRODUCT_PRICES_IN_CATALOG_EXCL_TAX) {
            return formatPrice(minimalPriceExclTaxValue, priceCurrency);
        }

        return formatPrice(minimalPriceValue, priceCurrency);
    }

    getFormattedSubPrice() {
        const {
            price: {
                minimum_price: {
                    final_price: {
                        currency: priceCurrency = ''
                    },
                    final_price_excl_tax: {
                        value: minimalPriceExclTaxValue = 0
                    } = {}
                } = {}
            } = {},
            displayTaxInPrice = ''
        } = this.props;

        if (displayTaxInPrice === DISPLAY_PRODUCT_PRICES_IN_CATALOG_BOTH) {
            return formatPrice(minimalPriceExclTaxValue, priceCurrency);
        }

        return null;
    }

    render() {
        return (
            <ProductPrice
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPriceContainer);
