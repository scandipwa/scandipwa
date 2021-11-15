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
import { connect } from 'react-redux';

import {
    ADDRESS_POPUP_ID,
    DELETE_ADDRESS,
    EDIT_ADDRESS
} from 'Component/MyAccountAddressPopup/MyAccountAddressPopup.config';
import { showPopup } from 'Store/Popup/Popup.action';
import { Addresstype } from 'Type/Account.type';
import { MixType } from 'Type/Common.type';
import { CountriesType } from 'Type/Config.type';

import MyAccountAddressTable from './MyAccountAddressTable.component';

/** @namespace Component/MyAccountAddressTable/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    countries: state.ConfigReducer.countries
});

/** @namespace Component/MyAccountAddressTable/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showEditPopup: (payload) => dispatch(showPopup(ADDRESS_POPUP_ID, payload))
});

/** @namespace Component/MyAccountAddressTable/Container */
export class MyAccountAddressTableContainer extends PureComponent {
    static propTypes = {
        mix: MixType,
        address: Addresstype.isRequired,
        showEditPopup: PropTypes.func.isRequired,
        countries: CountriesType.isRequired,
        showAdditionalFields: PropTypes.bool,
        showActions: PropTypes.bool,
        title: PropTypes.string
    };

    static defaultProps = {
        showAdditionalFields: false,
        showActions: false,
        mix: {},
        title: ''
    };

    containerFunctions = {
        onEditClick: this.onEditClick.bind(this),
        onDeleteClick: this.onDeleteClick.bind(this)
    };

    containerProps() {
        const {
            address,
            countries,
            mix,
            showAdditionalFields,
            showActions,
            title
        } = this.props;

        return {
            address,
            countries,
            mix,
            showAdditionalFields,
            showActions,
            title
        };
    }

    onEditClick() {
        const { showEditPopup, address } = this.props;

        showEditPopup({
            action: EDIT_ADDRESS,
            title: __('Edit address'),
            address
        });
    }

    onDeleteClick() {
        const { showEditPopup, address } = this.props;

        showEditPopup({
            action: DELETE_ADDRESS,
            title: __('Confirm delete'),
            address
        });
    }

    render() {
        return (
            <MyAccountAddressTable
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountAddressTableContainer);
