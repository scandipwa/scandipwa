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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { ADD_ADDRESS, ADDRESS_POPUP_ID } from 'Component/MyAccountAddressPopup/MyAccountAddressPopup.config';
import { showPopup } from 'Store/Popup/Popup.action';
import { ADDRESS_BOOK, CustomerType, TabMapType } from 'Type/Account.type';

import MyAccountAddressBook from './MyAccountAddressBook.component';

/** @namespace Component/MyAccountAddressBook/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    customer: state.MyAccountReducer.customer
});

/** @namespace Component/MyAccountAddressBook/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showPopup: (payload) => dispatch(showPopup(ADDRESS_POPUP_ID, payload))
});

/** @namespace Component/MyAccountAddressBook/Container */
export class MyAccountAddressBookContainer extends PureComponent {
    static propTypes = {
        customer: CustomerType.isRequired,
        showPopup: PropTypes.func.isRequired,
        changeTabName: PropTypes.func.isRequired,
        tabMap: TabMapType.isRequired
    };

    containerFunctions = {
        showCreateNewPopup: this.showCreateNewPopup.bind(this)
    };

    componentDidMount() {
        const { changeTabName, tabMap } = this.props;
        const { tabName } = tabMap[ADDRESS_BOOK];

        changeTabName(tabName);
    }

    containerProps() {
        const { customer, showPopup } = this.props;

        return { customer, showPopup };
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
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountAddressBookContainer);
