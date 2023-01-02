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

import { ComponentType, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
    MyAccountAddressPopupAction,
} from 'Component/MyAccountAddressPopup/MyAccountAddressPopup.config';
import { showPopup } from 'Store/Popup/Popup.action';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import MyAccountAddressTable from './MyAccountAddressTable.component';
import {
    MyAccountAddressTableComponentProps,
    MyAccountAddressTableContainerFunctions,
    MyAccountAddressTableContainerMapDispatchProps,
    MyAccountAddressTableContainerMapStateProps,
    MyAccountAddressTableContainerProps,
    MyAccountAddressTableContainerPropsKeys,
    MyAccountAddressTableContainerState,
} from './MyAccountAddressTable.type';

/** @namespace Component/MyAccountAddressTable/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountAddressTableContainerMapStateProps => ({
    countries: state.ConfigReducer.countries,
});

/** @namespace Component/MyAccountAddressTable/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): MyAccountAddressTableContainerMapDispatchProps => ({
    showEditPopup: (payload) => dispatch(showPopup(MyAccountAddressPopupAction.ADDRESS_POPUP_ID, payload)),
});

/** @namespace Component/MyAccountAddressTable/Container */
export class MyAccountAddressTableContainer<
    P extends Readonly<MyAccountAddressTableContainerProps> = Readonly<MyAccountAddressTableContainerProps>,
    S extends MyAccountAddressTableContainerState = MyAccountAddressTableContainerState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<MyAccountAddressTableContainerProps> = {
        showActions: false,
        mix: {},
        title: '',
    };

    containerFunctions: MyAccountAddressTableContainerFunctions = {
        onEditClick: this.onEditClick.bind(this),
        onDeleteClick: this.onDeleteClick.bind(this),
    };

    containerProps(): Pick<
    MyAccountAddressTableComponentProps,
    MyAccountAddressTableContainerPropsKeys
    > {
        const {
            address,
            countries,
            mix,
            showActions,
            title,
        } = this.props;

        return {
            address,
            countries,
            mix,
            showActions,
            title,
        };
    }

    onEditClick(): void {
        const { showEditPopup, address } = this.props;

        showEditPopup({
            action: MyAccountAddressPopupAction.EDIT_ADDRESS,
            title: __('Edit address'),
            address,
        });
    }

    onDeleteClick(): void {
        const { showEditPopup, address } = this.props;

        showEditPopup({
            action: MyAccountAddressPopupAction.DELETE_ADDRESS,
            title: __('Confirm delete'),
            address,
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
    mapDispatchToProps,
)(
    MyAccountAddressTableContainer as unknown as ComponentType<MyAccountAddressTableContainerProps>,
);
