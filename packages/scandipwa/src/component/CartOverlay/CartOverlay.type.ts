/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { GQLCurrencyEnum } from 'Type/Graphql.type';

export interface CartOverlayComponentProps {
    totals: Totals;
    changeHeaderState: () => void;
    handleCheckoutClick: () => void;
    currencyCode: GQLCurrencyEnum;
    showOverlay: (overlay: string) => void;
    activeOverlay: string;
    hasOutOfStockProductsInCart: boolean;
    cartTotalSubPrice: number;
    cartDisplaySettings: CartDisplay;
    isMobile: boolean;
    onCartItemLoading: () => void;
}
