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

import PRODUCT_TYPE from 'Component/Product/Product.config';
import { MixType } from 'Type/Common.type';
import { LabelType } from 'Type/Field.type';
import { ProductPriceType, TierPricesType } from 'Type/Price.type';
import { formatPrice } from 'Util/Price';

import ProductPrice from './ProductPrice.component';
import {
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
        // Price should be gotten from Util/Product/Extract/getPrice()
        price: ProductPriceType,
        isPreview: PropTypes.bool,
        priceType: PropTypes.oneOf(Object.values(PRODUCT_TYPE)),

        isSchemaRequired: PropTypes.bool,
        mix: MixType,
        displayTaxInPrice: PropTypes.string,
        tierPrices: TierPricesType,
        label: LabelType,
        variantsCount: PropTypes.number
    };

    static defaultProps = {
        isPreview: false,
        isSchemaRequired: false,
        displayTaxInPrice: DISPLAY_PRODUCT_PRICES_IN_CATALOG_INCL_TAX,
        mix: {},
        price: {},
        priceType: PRODUCT_TYPE.simple,
        tierPrices: [],
        label: '',
        variantsCount: 0
    };

    containerProps() {
        const {
            price: {
                price,
                originalPrice,
                configuration,
                price: {
                    finalPrice: {
                        currency: priceCurrency
                    },
                    discount: {
                        percentOff: discountPercentage = 0
                    } = {}
                } = {}
            },
            isPreview,
            isSchemaRequired,
            label,
            mix,
            variantsCount,
            priceType
        } = this.props;

        if (!price || !originalPrice) {
            return {};
        }

        return {
            price,
            originalPrice,
            configuration,
            tierPrice: this.getMinTierPrice(priceCurrency),
            priceCurrency,
            discountPercentage,
            isPreview,
            isSchemaRequired,
            label,
            mix,
            variantsCount,
            priceType
        };
    }

    getMinTierPrice(currency) {
        const { tierPrices } = this.props;

        if (tierPrices && tierPrices.length > 0) {
            const prices = tierPrices.map(({ final_price: { value = 0 } = {} }) => value);
            const minPrice = Math.min(...prices);

            return formatPrice(minPrice, currency);
        }

        return '';
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
