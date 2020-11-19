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

import Loader from 'Component/Loader';
import MyAccountAddressForm from 'Component/MyAccountAddressForm';
import MyAccountAddressTable from 'Component/MyAccountAddressTable';
import Popup from 'Component/Popup';
import { addressType } from 'Type/Account';

import {
    ADD_ADDRESS, ADDRESS_POPUP_ID, DELETE_ADDRESS, EDIT_ADDRESS
} from './MyAccountAddressPopup.config';

import './MyAccountAddressPopup.style';

/** @namespace Component/MyAccountAddressPopup/Component */
export class MyAccountAddressPopup extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        handleAddress: PropTypes.func.isRequired,
        handleDeleteAddress: PropTypes.func.isRequired,
        payload: PropTypes.shape({
            action: PropTypes.oneOf([
                EDIT_ADDRESS,
                DELETE_ADDRESS,
                ADD_ADDRESS
            ]),
            address: addressType
        }).isRequired
    };

    renderAddressForm() {
        const { payload: { address }, handleAddress } = this.props;

        return (
            <MyAccountAddressForm
              address={ address }
              onSave={ handleAddress }
            />
        );
    }

    renderDeleteNotice() {
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

    renderContent() {
        const { payload: { action } } = this.props;

        switch (action) {
        case EDIT_ADDRESS:
        case ADD_ADDRESS:
            return this.renderAddressForm();
        case DELETE_ADDRESS:
            return this.renderDeleteNotice();
        default:
            return null;
        }
    }

    render() {
        const { isLoading } = this.props;

        return (
            <Popup
              id={ ADDRESS_POPUP_ID }
              clickOutside={ false }
              mix={ { block: 'MyAccountAddressPopup' } }
            >
                <Loader isLoading={ isLoading } />
                { this.renderContent() }
            </Popup>
        );
    }
}

export default MyAccountAddressPopup;
