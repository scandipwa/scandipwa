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

import PRODUCT_TYPE from 'Config/Product.config';
import { MixType } from 'Type/Common';

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
        price: PropTypes.object,
        isPreview: PropTypes.bool,
        priceType: PropTypes.oneOf(Object.values(PRODUCT_TYPE)),

        isSchemaRequired: PropTypes.bool,
        mix: MixType,
        displayTaxInPrice: PropTypes.string,
        price_tiers: PropTypes.array,
        label: PropTypes.string,
        variantsCount: PropTypes.number
    };

    static defaultProps = {
        isPreview: false,
        isSchemaRequired: false,
        displayTaxInPrice: DISPLAY_PRODUCT_PRICES_IN_CATALOG_INCL_TAX,
        mix: {},
        price: {},
        priceType: PRODUCT_TYPE.simple,
        price_tiers: [],
        label: '',
        variantsCount: 0
    };

    containerProps() {
        const {
            price: {
                price,
                originalPrice,
                price: {
                    finalPrice: {
                        currency: priceCurrency
                    },
                    discount: {
                        percentOff: discountPercentage = 0
                    } = {}
                } = {}
            },
            price_tiers: priceTiers,
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
            priceTiers,
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

    render() {
        return (
            <ProductPrice
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPriceContainer);
