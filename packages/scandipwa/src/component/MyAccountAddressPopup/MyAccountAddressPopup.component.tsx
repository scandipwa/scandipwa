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

import Loader from 'Component/Loader';
import MyAccountAddressForm from 'Component/MyAccountAddressForm';
import MyAccountAddressTable from 'Component/MyAccountAddressTable';
import Popup from 'Component/Popup';
import { ReactElement } from 'Type/Common.type';

import { MyAccountAddressPopupAction } from './MyAccountAddressPopup.config';
import { MyAccountAddressPopupComponentProps } from './MyAccountAddressPopup.type';

import './MyAccountAddressPopup.style';

/** @namespace Component/MyAccountAddressPopup/Component */
export class MyAccountAddressPopupComponent<
P extends Readonly<MyAccountAddressPopupComponentProps> = Readonly<MyAccountAddressPopupComponentProps>,
S extends MyAccountAddressPopupComponentState = MyAccountAddressPopupComponentState,
> extends PureComponent<P, S> {
    renderAddressForm(): ReactElement {
        const { payload: { address }, handleAddress } = this.props;

        return (
            <MyAccountAddressForm
              address={ address }
              onSave={ handleAddress }
            />
        );
    }

    renderDeleteNotice(): ReactElement {
        const { payload: { address }, handleDeleteAddress } = this.props;

        return (
            <>
                <p>{ __('Are you sure you want to delete this address?') }</p>
                <div block="MyAccountAddressPopup" elem="Address">
                    <MyAccountAddressTable address={ address } title={ __('Address details') } />
                </div>
                <button block="Button" onClick={ handleDeleteAddress }>
                    { __('Yes, delete address') }
                </button>
            </>
        );
    }

    renderContent(): ReactElement {
        const { payload: { action } = {} } = this.props;

        switch (action) {
        case MyAccountAddressPopupAction.EDIT_ADDRESS:
        case MyAccountAddressPopupAction.ADD_ADDRESS:
            return this.renderAddressForm();
        case MyAccountAddressPopupAction.DELETE_ADDRESS:
            return this.renderDeleteNotice();
        default:
            return null;
        }
    }

    render(): ReactElement {
        const { isLoading } = this.props;

        return (
            <Popup
              id={ MyAccountAddressPopupAction.ADDRESS_POPUP_ID }
              mix={ { block: 'MyAccountAddressPopup' } }
            >
                <div>
                    <Loader isLoading={ isLoading } />
                    { this.renderContent() }
                </div>
            </Popup>
        );
    }
}

export default MyAccountAddressPopupComponent;
