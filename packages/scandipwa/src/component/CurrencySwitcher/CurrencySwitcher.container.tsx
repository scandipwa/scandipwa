/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { CART_URL } from 'Route/CartPage/CartPage.config';
import { CheckoutStepUrl } from 'Route/Checkout/Checkout.config';
import { ConfigDispatcher } from 'Store/Config/Config.dispatcher';
import { ReactElement } from 'Type/Common.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import DataContainer from 'Util/Request/DataContainer';
import { RootState } from 'Util/Store/Store.type';
import { appendWithStoreCode } from 'Util/Url';

import CurrencySwitcher from './CurrencySwitcher.component';
import {
    CurrencySwitcherComponentProps,
    CurrencySwitcherContainerFunctions,
    CurrencySwitcherContainerProps,
    CurrencySwitcherMapDispatchProps,
    CurrencySwitcherMapStateProps,
} from './CurrencySwitcher.type';

/** @namespace Component/CurrencySwitcher/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CurrencySwitcherMapStateProps => ({
    currencyData: state.ConfigReducer.currencyData,
});

/** @namespace Component/CurrencySwitcher/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CurrencySwitcherMapDispatchProps => ({
    updateCurrency: (options) => ConfigDispatcher.updateCurrency(dispatch, options),
});

/** @namespace Component/CurrencySwitcher/Container */
export class CurrencySwitcherContainer extends DataContainer<CurrencySwitcherContainerProps> {
    containerFunctions: CurrencySwitcherContainerFunctions = {
        handleCurrencySelect: this._handleCurrencySelect.bind(this),
    };

    __construct(props: CurrencySwitcherContainerProps): void {
        super.__construct(props, 'CurrencySwitcherContainer');
    }

    async _handleCurrencySelect(currencyCode: GQLCurrencyEnum): Promise<void> {
        const { updateCurrency } = this.props;

        try {
            await updateCurrency({ currencyCode });

            const { pathname = '' } = location;
            const checkoutOrCartUrlsRegex = (
                new RegExp(`^(${appendWithStoreCode('')})?((${CheckoutStepUrl.CHECKOUT_URL})|(${CART_URL}(/)?$))`)
            );

            if (!pathname.match(checkoutOrCartUrlsRegex)) {
                location.reload();
            }
        } catch (e) {
            throw new Error(e as string);
        }
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
    mapDispatchToProps,
)(
    CurrencySwitcherContainer,
);
