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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { ACCOUNT_INFORMATION_EDIT_URL } from 'Route/MyAccount/MyAccount.config';
import { CustomerType } from 'Type/Account.type';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import MyAccountCustomerTable from './MyAccountCustomerTable.component';

/** @namespace Component/MyAccountCustomerTable/Container */
export class MyAccountCustomerTableContainer extends PureComponent {
    static propTypes = {
        customer: CustomerType.isRequired,
        title: PropTypes.string
    };

    static defaultProps = {
        title: ''
    };

    containerFunctions = {
        handleOnEditPassword: this.handleOnEditPassword.bind(this),
        handleOnEditInformation: this.handleOnEditInformation.bind(this)
    };

    containerProps() {
        const {
            customer,
            title
        } = this.props;

        return {
            customer,
            title
        };
    }

    handleOnEditPassword() {
        history.push({
            pathname: appendWithStoreCode(ACCOUNT_INFORMATION_EDIT_URL),
            state: { editPassword: true }
        });
    }

    handleOnEditInformation() {
        history.push({ pathname: appendWithStoreCode(ACCOUNT_INFORMATION_EDIT_URL) });
    }

    render() {
        return (
            <MyAccountCustomerTable
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default MyAccountCustomerTableContainer;
