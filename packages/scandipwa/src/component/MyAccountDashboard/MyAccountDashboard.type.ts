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
import { Customer, CustomerAddress } from 'Query/MyAccount.type';

export interface MyAccountDashboardContainerMapStateProps {
    customer: Partial<Customer>;
}


export interface MyAccountDashboardContainerMapDispatchProps {}

export interface MyAccountDashboardContainerFunctions {
    getDefaultAddress: (isBilling: boolean) => CustomerAddress | undefined;
}

export type MyAccountDashboardContainerProps = MyAccountDashboardContainerMapStateProps
& MyAccountDashboardContainerMapDispatchProps;

export interface MyAccountDashboardComponentProps {
    customer: Partial<Customer>;
    getDefaultAddress: (isBilling: boolean) => CustomerAddress | undefined;
}
