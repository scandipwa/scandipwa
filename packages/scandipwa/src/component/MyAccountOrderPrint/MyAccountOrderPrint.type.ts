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

import { match } from 'react-router';

import { OrderTabs } from 'Component/MyAccountOrder/MyAccountOrder.config';
import {
    MyAccountOrderComponentProps,
    MyAccountOrderComponentState,
    MyAccountOrderContainerBaseProps,
    MyAccountOrderContainerFunctions,
    MyAccountOrderContainerMapDispatchProps,
    MyAccountOrderContainerMapStateProps,
    MyAccountOrderContainerPropsKeys,
    MyAccountOrderContainerState,
} from 'Component/MyAccountOrder/MyAccountOrder.type';
import { OrderPrintMapItems } from 'Route/OrderPrintPage/OrderPrintPage.type';
import { PageMeta } from 'Store/Meta/Meta.type';

import { PrintTypes } from './MyAccountOrderPrint.config';

export interface MyAccountOrderPrintContainerMapStateProps
    extends MyAccountOrderContainerMapStateProps {
    logo_src: string;
    logo_alt: string;
    logo_height: number;
    logo_width: number;
    copyright: string;
}

export interface MyAccountOrderPrintContainerMapDispatchProps
    extends MyAccountOrderContainerMapDispatchProps {
    updateMeta: (meta: Partial<PageMeta>) => void;
}

export interface MyAccountOrderPrintContainerFunctions
    extends MyAccountOrderContainerFunctions {
    onLogoLoad: () => void;
}

export interface MyAccountOrderPrintContainerBaseProps
    extends MyAccountOrderContainerBaseProps {
    orderPrintRequest: PrintTypes;
    orderPrintMap: OrderPrintMapItems;
    match: match<{
        orderId?: string;
        invoiceId?: string;
        shipmentId?: string;
        refundId?: string;
    }>;
}

export type MyAccountOrderPrintContainerProps = MyAccountOrderPrintContainerMapStateProps
& MyAccountOrderPrintContainerMapDispatchProps
& MyAccountOrderPrintContainerBaseProps;

export interface MyAccountOrderPrintContainerState
    extends MyAccountOrderContainerState {
    isLogoLoaded: boolean;
}

export interface MyAccountOrderPrintComponentProps
    extends MyAccountOrderComponentProps,
    MyAccountOrderPrintContainerFunctions {
    logo_src: string;
    logo_alt: string;
    logo_height: number;
    logo_width: number;
    copyright: string;
    match: match<{
        invoiceId?: string;
        shipmentId?: string;
        refundId?: string;
    }>;
    activeTab: OrderTabs;
    isLogoLoaded: boolean;
}

export type MyAccountOrderPrintContainerPropsKeys = MyAccountOrderContainerPropsKeys
| 'logo_alt'
| 'logo_src'
| 'logo_height'
| 'logo_width'
| 'match'
| 'copyright'
| 'activeTab'
| 'isLogoLoaded';

export interface MyAccountOrderPrintComponentState extends MyAccountOrderComponentState {
    isPrintShown: boolean;
}
