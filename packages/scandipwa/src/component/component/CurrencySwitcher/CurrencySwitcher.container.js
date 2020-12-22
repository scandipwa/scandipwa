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

import { connect } from 'react-redux';

import { ConfigDispatcher } from 'Store/Config/Config.dispatcher';
import DataContainer from 'Util/Request/DataContainer';

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
    containerFunctions = {
        handleCurrencySelect: this._handleCurrencySelect.bind(this)
    };

    _handleCurrencySelect(currencyCode) {
        const { updateCurrency } = this.props;

        updateCurrency({ currencyCode }).then(
            /** @namespace Component/CurrencySwitcher/Container/updateCurrencyThen */
            () => location.reload()
        );
    }

    render() {
        return (
            <CurrencySwitcher
              { ...this.containerFunctions }
              { ...this.props }
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
