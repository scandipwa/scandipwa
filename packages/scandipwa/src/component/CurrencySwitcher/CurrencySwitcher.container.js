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
import { connect } from 'react-redux';

import { CART_URL } from 'Route/CartPage/CartPage.config';
import { CHECKOUT_URL } from 'Route/Checkout/Checkout.config';
import { ConfigDispatcher } from 'Store/Config/Config.dispatcher';
import DataContainer from 'Util/Request/DataContainer';
import { appendWithStoreCode } from 'Util/Url';

import CurrencySwitcher from './CurrencySwitcher.component';

/** @namespace Component/CurrencySwitcher/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    currencyData: state.ConfigReducer.currencyData
});

/** @namespace Component/CurrencySwitcher/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateCurrency: (options) => ConfigDispatcher.updateCurrency(dispatch, options)
});

/** @namespace Component/CurrencySwitcher/Container */
export class CurrencySwitcherContainer extends DataContainer {
    static propTypes = {
        currencyData: PropTypes.shape({
            available_currencies_data: PropTypes.arrayOf(
                PropTypes.objectOf(
                    PropTypes.string
                )
            ),
            current_currency_code: PropTypes.string
        }).isRequired
    };

    containerFunctions = {
        handleCurrencySelect: this._handleCurrencySelect.bind(this)
    };

    __construct(props) {
        super.__construct(props, 'CurrencySwitcherContainer');
    }

    _handleCurrencySelect(currencyCode) {
        const { updateCurrency } = this.props;

        updateCurrency({ currencyCode }).then(
            /** @namespace Component/CurrencySwitcher/Container/CurrencySwitcherContainer/_handleCurrencySelect/updateCurrency/then */
            () => {
                const { pathname = '' } = location;
                const checkoutOrCartUrlsRegex = (
                    new RegExp(`^(${appendWithStoreCode('')})?((${CHECKOUT_URL})|(${CART_URL}(/)?$))`)
                );

                if (!pathname.match(checkoutOrCartUrlsRegex)) {
                    location.reload();
                }
            }
        );
    }

    containerProps() {
        const { currencyData } = this.props;

        return { currencyData };
    }

    render() {
        return (
            <CurrencySwitcher
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    CurrencySwitcherContainer
);
