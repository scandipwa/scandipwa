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
import { Dispatch } from 'redux';

import { ConfigDispatcher } from 'Store/Config/Config.dispatcher';
import { ReactElement } from 'Type/Common.type';
import DataContainer from 'Util/Request/DataContainer';
import { RootState } from 'Util/Store/Store.type';

import CurrencySwitcher from './CurrencySwitcher.component';
import {
    CurrencySwitcherComponentProps,
    CurrencySwitcherContainerProps,
    CurrencySwitcherMapDispatchProps,
    CurrencySwitcherMapStateProps
} from './CurrencySwitcher.type';

/** @namespace Component/CurrencySwitcher/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CurrencySwitcherMapStateProps => ({
    currencyData: state.ConfigReducer.currencyData
});

/** @namespace Component/CurrencySwitcher/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CurrencySwitcherMapDispatchProps => ({
    updateCurrency: (options) => ConfigDispatcher.updateCurrency(dispatch, options)
});

/** @namespace Component/CurrencySwitcher/Container */
export class CurrencySwitcherContainer extends DataContainer<CurrencySwitcherContainerProps> {
    containerFunctions = {
        handleCurrencySelect: this._handleCurrencySelect.bind(this)
    };

    __construct(props: CurrencySwitcherContainerProps): void {
        super.__construct(props, 'CurrencySwitcherContainer');
    }

    _handleCurrencySelect(currencyCode: GQLCurrencyEnum): void {
        const { updateCurrency } = this.props;

        updateCurrency({ currencyCode }).then(
            /** @namespace Component/CurrencySwitcher/Container/CurrencySwitcherContainer/_handleCurrencySelect/updateCurrency/then */
            () => location.reload()
        );
    }

    containerProps(): Pick<CurrencySwitcherComponentProps, 'currencyData'> {
        const { currencyData } = this.props;

        return { currencyData };
    }

    render(): ReactElement {
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
