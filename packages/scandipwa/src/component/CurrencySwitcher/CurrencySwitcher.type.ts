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

import { CurrencyConfig } from 'Query/Config.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';

export interface CurrencySwitcherMapStateProps {
    currencyData: CurrencyConfig;
}

export interface CurrencySwitcherMapDispatchProps {
    updateCurrency: (options: { currencyCode: GQLCurrencyEnum }) => Promise<void>;
}

export interface CurrencySwitcherContainerFunctions {
    handleCurrencySelect: (currencyCode: GQLCurrencyEnum) => void;
}

export type CurrencySwitcherContainerProps = CurrencySwitcherMapStateProps & CurrencySwitcherMapDispatchProps;

export interface CurrencySwitcherComponentProps {
    currencyData: CurrencyConfig;
    handleCurrencySelect: (currencyCode: GQLCurrencyEnum) => void;
}
