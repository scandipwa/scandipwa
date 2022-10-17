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
import { Customer } from 'Query/MyAccount.type';

export interface MyAccountCustomerTableContainerProps {
    customer: Partial<Customer>;
    title?: string;
}

export interface MyAccountCustomerTableContainerFunctions {
    handleOnEditInformation: () => void;
    handleOnEditPassword: () => void;
}

export interface MyAccountCustomerTableComponentProps {
    handleOnEditInformation: () => void;
    handleOnEditPassword: () => void;
    customer: Partial<Customer>;
    title?: string;
}
