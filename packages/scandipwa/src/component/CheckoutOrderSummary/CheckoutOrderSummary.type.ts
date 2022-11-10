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

import { CartDisplayConfig } from 'Query/Cart.type';
import { CheckoutSteps } from 'Route/Checkout/Checkout.config';
import { CartTotals } from 'Store/Cart/Cart.type';
import { Children } from 'Type/Common.type';

export interface CheckoutOrderSummaryContainerMapStateProps {
    cartDisplayConfig: CartDisplayConfig;
    cartSubtotal: number;
    cartSubtotalSubPrice: number | null;
    cartShippingPrice: number;
    cartShippingSubPrice: number | null;
    cartTotalSubPrice: number | null;
    isLoading: boolean;
    isMobile: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CheckoutOrderSummaryContainerMapDispatchProps {}

export interface CheckoutOrderSummaryComponentBaseProps {
    totals: CartTotals;
    checkoutStep?: CheckoutSteps;
    showItems: boolean;
    children?: Children;
}
export type CheckoutOrderSummaryComponentProps = CheckoutOrderSummaryContainerMapStateProps
& CheckoutOrderSummaryContainerMapDispatchProps
& CheckoutOrderSummaryComponentBaseProps;
