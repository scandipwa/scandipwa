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

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { customerType } from 'Type/Account';
import { ADDRESS_POPUP_ID, ADD_ADDRESS } from 'Component/MyAccountAddressPopup/MyAccountAddressPopup.component';
import { showPopup } from 'Store/Popup';

import MyAccountAddressBook from './MyAccountAddressBook.component';

export const mapStateToProps = middleware(
    state => ({
        customer: state.MyAccountReducer.customer
    }),
    'Component/MyAccountAddressBook/Container/mapStateToProps'
);

export const mapDispatchToProps = middleware(
    dispatch => ({
        showPopup: payload => dispatch(showPopup(ADDRESS_POPUP_ID, payload))
    }),
    'Component/MyAccountAddressBook/Container/mapDispatchToProps'
);

export class MyAccountAddressBookContainer extends ExtensiblePureComponent {
    static propTypes = {
        customer: customerType.isRequired,
        showPopup: PropTypes.func.isRequired
    };

    containerFunctions = {
        getDefaultPostfix: this.getDefaultPostfix.bind(this),
        showCreateNewPopup: this.showCreateNewPopup.bind(this)
    };

    getDefaultPostfix(address) {
        const { default_billing, default_shipping } = address;
        if (!default_billing && !default_shipping) {
            return '';
        }
        if (default_billing && default_shipping) {
            return ' - default shipping, billing address';
        }
        if (default_billing) {
            return ' - default billing address';
        }

        return ' - default shipping address';
    }

    showCreateNewPopup() {
        const { showPopup } = this.props;

        showPopup({
            action: ADD_ADDRESS,
            title: __('Add new address'),
            address: {}
        });
    }

    render() {
        return (
            <MyAccountAddressBook
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    middleware(MyAccountAddressBookContainer, 'Component/MyAccountAddressBook/Container')
);
