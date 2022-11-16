/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { STORE_IN_PICK_UP_POPUP_ID } from 'Component/StoreInPickUpPopup/StoreInPickUpPopup.config';
import { Store } from 'Query/StoreInPickUp.type';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { showPopup } from 'Store/Popup/Popup.action';
import { updateStoreInPickUpStore } from 'Store/StoreInPickUp/StoreInPickUp.action';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import StoreInPickUp from './StoreInPickUp.component';
import {
    StoreInPickUpComponentProps,
    StoreInPickUpComponentPropsKeys,
    StoreInPickUpContainerDispatchProps,
    StoreInPickUpContainerFunctions,
    StoreInPickUpContainerMapStateProps,
    StoreInPickUpContainerProps,
} from './StoreInPickUp.type';

/** @namespace Component/StoreInPickUp/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): StoreInPickUpContainerDispatchProps => ({
    showPopup: (payload) => dispatch(showPopup(STORE_IN_PICK_UP_POPUP_ID, payload)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    updateStoreInPickUpStore: (state) => dispatch(updateStoreInPickUpStore(state)),
});

/** @namespace Component/StoreInPickUp/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): StoreInPickUpContainerMapStateProps => ({
    selectedStore: state.StoreInPickUpReducer.store,
    shippingMethods: state.CheckoutReducer.shippingMethods,
});

/** @namespace Component/StoreInPickUp/Container */
export class StoreInPickUpContainer extends PureComponent<StoreInPickUpContainerProps> {
    static defaultProps: Partial<StoreInPickUpContainerProps> = {
        selectedStore: null,
    };

    containerFunctions: StoreInPickUpContainerFunctions = {
        handleOpenPopup: this.handleOpenPopup.bind(this),
        setSelectedStore: this.setSelectedStore.bind(this),
    };

    containerProps(): Pick<StoreInPickUpComponentProps, StoreInPickUpComponentPropsKeys> {
        const {
            shippingMethods,
            selectedStore,
        } = this.props;

        return {
            selectedStore,
            shippingMethods,
        };
    }

    handleOpenPopup(): void {
        const { showPopup } = this.props;

        showPopup({ title: __('Select Store') });
    }

    setSelectedStore(store: Store): void {
        const { updateStoreInPickUpStore } = this.props;

        updateStoreInPickUpStore({ store });
    }

    render(): ReactElement {
        return (
            <StoreInPickUp
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreInPickUpContainer);
