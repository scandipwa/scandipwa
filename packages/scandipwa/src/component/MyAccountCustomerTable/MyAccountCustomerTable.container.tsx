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

import { PureComponent } from 'react';

import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import { ReactElement } from 'Type/Common.type';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import MyAccountCustomerTable from './MyAccountCustomerTable.component';
import {
    MyAccountCustomerTableComponentProps,
    MyAccountCustomerTableContainerFunctions,
    MyAccountCustomerTableContainerProps
} from './MyAccountCustomerTable.type';

/** @namespace Component/MyAccountCustomerTable/Container */
export class MyAccountCustomerTableContainer extends PureComponent<MyAccountCustomerTableContainerProps> {
    static defaultProps: Partial<MyAccountCustomerTableContainerProps> = {
        title: ''
    };

    containerFunctions: MyAccountCustomerTableContainerFunctions = {
        handleOnEditPassword: this.handleOnEditPassword.bind(this),
        handleOnEditInformation: this.handleOnEditInformation.bind(this)
    };

    containerProps(): Pick<MyAccountCustomerTableComponentProps, 'customer' | 'title'> {
        const {
            customer,
            title
        } = this.props;

        return {
            customer,
            title
        };
    }

    handleOnEditPassword(): void {
        history.push({
            pathname: appendWithStoreCode(AccountPageUrl.INFORMATION_EDIT_URL),
            state: { editPassword: true }
        });
    }

    handleOnEditInformation(): void {
        history.push({ pathname: appendWithStoreCode(AccountPageUrl.INFORMATION_EDIT_URL) });
    }

    render(): ReactElement {
        return (
            <MyAccountCustomerTable
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default MyAccountCustomerTableContainer;
