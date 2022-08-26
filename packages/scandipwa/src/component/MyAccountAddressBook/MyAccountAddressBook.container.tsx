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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { MyAccountAddressPopupAction } from 'Component/MyAccountAddressPopup/MyAccountAddressPopup.config';
import { showPopup } from 'Store/Popup/Popup.action';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import MyAccountAddressBook from './MyAccountAddressBook.component';
import {
    MyAccountAddressBookComponentProps,
    MyAccountAddressBookContainerFunctions,
    MyAccountAddressBookContainerMapDispatchProps,
    MyAccountAddressBookContainerMapStateProps,
    MyAccountAddressBookContainerProps
} from './MyAccountAddressBook.type';

/** @namespace Component/MyAccountAddressBook/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountAddressBookContainerMapStateProps => ({
    customer: state.MyAccountReducer.customer
});

/** @namespace Component/MyAccountAddressBook/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): MyAccountAddressBookContainerMapDispatchProps => ({
    showPopup: (payload) => dispatch(showPopup(MyAccountAddressPopupAction.ADDRESS_POPUP_ID, payload))
});

/** @namespace Component/MyAccountAddressBook/Container */
export class MyAccountAddressBookContainer extends PureComponent<MyAccountAddressBookContainerProps> {
    containerFunctions: MyAccountAddressBookContainerFunctions = {
        showCreateNewPopup: this.showCreateNewPopup.bind(this)
    };

    componentDidMount(): void {
        const { changeTabName, tabMap } = this.props;
        const { tabName } = tabMap[ADDRESS_BOOK];

        changeTabName(tabName);
    }

    containerProps(): Pick<MyAccountAddressBookComponentProps, 'customer'> {
        const { customer } = this.props;

        return { customer };
    }

    showCreateNewPopup(): void {
        const { showPopup } = this.props;

        showPopup({
            action: MyAccountAddressPopupAction.ADD_ADDRESS,
            title: __('Add new address'),
            address: {}
        });
    }

    render(): ReactElement {
        return (
            <MyAccountAddressBook
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountAddressBookContainer);
