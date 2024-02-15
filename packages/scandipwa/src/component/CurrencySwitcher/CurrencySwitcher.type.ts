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

import { CurrencyData } from 'Query/Config.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';

export interface CurrencySwitcherMapStateProps {
    currencyData: CurrencyData;
}

export interface CurrencySwitcherMapDispatchProps {
    updateCurrency: (options: { currencyCode: GQLCurrencyEnum }) => Promise<void>;
    updateCurrentCurrency: (options: string) => void;
}

export interface CurrencySwitcherContainerFunctions {
    handleCurrencySelect: (currencyCode: GQLCurrencyEnum) => void;
}

export type CurrencySwitcherContainerProps = CurrencySwitcherMapStateProps & CurrencySwitcherMapDispatchProps;

export interface CurrencySwitcherComponentProps {
    currencyData: CurrencyData;
    handleCurrencySelect: (currencyCode: GQLCurrencyEnum) => void;
}
