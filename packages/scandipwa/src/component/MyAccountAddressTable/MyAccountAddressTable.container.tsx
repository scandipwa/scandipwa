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

import { ComponentType, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
    MyAccountAddressPopupAction
} from 'Component/MyAccountAddressPopup/MyAccountAddressPopup.config';
import { showPopup } from 'Store/Popup/Popup.action';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import MyAccountAddressTable from './MyAccountAddressTable.component';
import {
    MyAccountAddressTableComponentProps,
    MyAccountAddressTableContainerMapDispatchProps,
    MyAccountAddressTableContainerMapStateProps,
    MyAccountAddressTableContainerProps,
    MyAccountAddressTableContainerPropsKeys
} from './MyAccountAddressTable.type';

/** @namespace Component/MyAccountAddressTable/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountAddressTableContainerMapStateProps => ({
    countries: state.ConfigReducer.countries
});

/** @namespace Component/MyAccountAddressTable/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): MyAccountAddressTableContainerMapDispatchProps => ({
    showEditPopup: (payload) => dispatch(showPopup(MyAccountAddressPopupAction.ADDRESS_POPUP_ID, payload))
});

/** @namespace Component/MyAccountAddressTable/Container */
export class MyAccountAddressTableContainer<
    Props extends MyAccountAddressTableContainerProps = MyAccountAddressTableContainerProps
> extends PureComponent<Props> {
    static defaultProps: Partial<MyAccountAddressTableContainerProps> = {
        showAdditionalFields: false,
        showActions: false,
        mix: {},
        title: ''
    };

    containerFunctions = {
        onEditClick: this.onEditClick.bind(this),
        onDeleteClick: this.onDeleteClick.bind(this)
    };

    containerProps(): Pick<
    MyAccountAddressTableComponentProps,
    MyAccountAddressTableContainerPropsKeys
    > {
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

    onEditClick(): void {
        const { showEditPopup, address } = this.props;

        showEditPopup({
            action: MyAccountAddressPopupAction.EDIT_ADDRESS,
            title: __('Edit address'),
            address
        });
    }

    onDeleteClick(): void {
        const { showEditPopup, address } = this.props;

        showEditPopup({
            action: MyAccountAddressPopupAction.DELETE_ADDRESS,
            title: __('Confirm delete'),
            address
        });
    }

    render(): ReactElement {
        return (
            <MyAccountAddressTable
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    MyAccountAddressTableContainer as unknown as ComponentType<MyAccountAddressTableContainerProps>
);
