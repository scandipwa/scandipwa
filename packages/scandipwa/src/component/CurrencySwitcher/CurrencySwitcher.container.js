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

import { ConfigDispatcher } from 'Store/Config/Config.dispatcher';
import { showNotification } from 'Store/Notification/Notification.action';
import { Field, prepareQuery } from 'Util/Query';
import { executeGet } from 'Util/Request';
import DataContainer from 'Util/Request/DataContainer';

import CurrencySwitcher from './CurrencySwitcher.component';

/** @namespace Component/CurrencySwitcher/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    currencyData: state.ConfigReducer.currencyData
});

/** @namespace Component/CurrencySwitcher/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateCurrency: (options) => ConfigDispatcher.updateCurrency(dispatch, options),
    showNotification: (type, title, error) => dispatch(showNotification(type, title, error))
});

/** @namespace Component/CurrencySwitcher/Container */
export class CurrencySwitcherContainer extends DataContainer {
    static propTypes = {
        showNotification: PropTypes.func.isRequired,
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

    state = {};

    // namespaces?
    async componentDidMount() {
        const { showNotification } = this.props;
        const currencyRatesQuery = new Field('currency')
            .addField('base_currency_code')
            .addField(new Field('exchange_rates')
                .addFieldList(['currency_to', 'rate']));

        const cacheLifetime = 86400;
        try {
            const data = await executeGet(prepareQuery(currencyRatesQuery), 'currencyRatesQuery', cacheLifetime);
            this.setState(data);
        } catch (e) {
            showNotification('error', __('Error fetching Currency Rates!'), e);
        }
    }

    _handleCurrencySelect(currencyCode) {
        const { updateCurrency } = this.props;

        updateCurrency({ currencyCode }).then(
            /** @namespace Component/CurrencySwitcher/Container/CurrencySwitcherContainer/_handleCurrencySelect/updateCurrency/then */
            () => location.reload()
        );
    }

    containerProps() {
        const { currencyData } = this.props;
        const { currency: currencyRates } = this.state;

        return { currencyData, currencyRates };
    }

    renderCurrencySwitcherComponent() {
        if (!this.state.currency) {
            return '';
        }

        return (
            <CurrencySwitcher
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }

    render() {
        return (
            <>
            { this.renderCurrencySwitcherComponent() }
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    CurrencySwitcherContainer
);
