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

import { STORE_IN_PICK_UP_POPUP_ID } from 'Component/StoreInPickUpPopup/StoreInPickUpPopup.config';
import { Store } from 'Query/StoreInPickUp.type';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { showPopup } from 'Store/Popup/Popup.action';
import { setPickUpStore } from 'Store/StoreInPickUp/StoreInPickUp.action';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import StoreInPickUp from './StoreInPickUp.component';
import {
    StoreInPickUpComponentProps,
    StoreInPickUpComponentPropsKeys,
    StoreInPickUpContainerDispatchProps,
    StoreInPickUpContainerFunctions,
    StoreInPickUpContainerMapStateProps,
    StoreInPickUpContainerProps
} from './StoreInPickUp.type';

/** @namespace Component/StoreInPickUp/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): StoreInPickUpContainerDispatchProps => ({
    showPopup: (payload) => dispatch(showPopup(STORE_IN_PICK_UP_POPUP_ID, payload)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    setPickUpStore: (store) => dispatch(setPickUpStore(store))
});

/** @namespace Component/StoreInPickUp/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): StoreInPickUpContainerMapStateProps => ({
    selectedStore: state.StoreInPickUpReducer.store
});

/** @namespace Component/StoreInPickUp/Container */
<<<<<<< HEAD:packages/scandipwa/src/component/StoreInPickUp/StoreInPickUp.container.tsx
export class StoreInPickUpContainer extends PureComponent<StoreInPickUpContainerProps> {
    static defaultProps: Partial<StoreInPickUpContainerProps> = {
=======
export class StoreInPickUpContainer extends PureComponent {
    static propTypes = {
        showPopup: PropTypes.func.isRequired,
        estimateAddress: Addresstype.isRequired,
        shippingMethods: ShippingMethodsType.isRequired,
        onStoreSelect: PropTypes.func.isRequired,
        onShippingMethodSelect: PropTypes.func.isRequired,
        countryId: PropTypes.string.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        setSelectedShippingMethodCode: PropTypes.func,
        cartItemsSku: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
        setPickUpStore: PropTypes.func.isRequired,
        selectedStore: StoreType
    };

    static defaultProps = {
        setSelectedShippingMethodCode: null,
>>>>>>> scandipwa/master:packages/scandipwa/src/component/StoreInPickUp/StoreInPickUp.container.js
        cartItemsSku: [],
        selectedStore: null
    };

    containerFunctions: StoreInPickUpContainerFunctions = {
        handleOpenPopup: this.handleOpenPopup.bind(this),
        setSelectedStore: this.setSelectedStore.bind(this)
    };

    containerProps(): Pick<StoreInPickUpComponentProps, StoreInPickUpComponentPropsKeys> {
        const {
            countryId,
            onShippingMethodSelect,
            onStoreSelect,
            shippingMethods,
            cartItemsSku,
            selectedStore
        } = this.props;

        return {
            countryId,
            onShippingMethodSelect,
            onStoreSelect,
            selectedStore,
            shippingMethods,
            cartItemsSku
        };
    }

    handleOpenPopup(): void {
        const { showPopup } = this.props;

        showPopup({ title: __('Select Store') });
    }

    setSelectedStore(store: Store): void {
        const { setPickUpStore } = this.props;

        setPickUpStore(store);
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
