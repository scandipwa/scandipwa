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

import PropTypes, { number, object } from 'prop-types';
import { connect } from 'react-redux';
import { PureComponent } from 'react';
import PRODUCT_TYPE from 'Config/Product.config';

export const mapStateToProps = (state) => ({
    currencyCode: state.ConfigReducer.currencyData.current_currency_code,
    displayTaxInPrice: state.ConfigReducer.priceTaxDisplay?.product_price_display_type
});

export const mapDispatchToProps = () => ({
});

export class PriceContainer extends PureComponent {
    static propTypes = {
        price: PropTypes.oneOfType([number, object]).isRequired,
        adjustedPrice: PropTypes.array,
        productType: PropTypes.oneOf(Object.values(PRODUCT_TYPE)),
        fallbackCurrencyCode: PropTypes.string.isRequired,
        displayTaxInPrice: PropTypes.string,

    };

    static defaultProps = {
        adjustedPrice: [],
        productType: PRODUCT_TYPE.simple,
    }

    state = {
    };

    containerFunctions = {
    };

    render() {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceContainer);
