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

import { STORE_IN_PICK_UP_POPUP_ID } from 'Component/StoreInPickUpPopup/StoreInPickUpPopup.config';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { showPopup } from 'Store/Popup/Popup.action';
import { setPickUpStore } from 'Store/StoreInPickUp/StoreInPickUp.action';
import { Addresstype } from 'Type/Account.type';
import { ShippingMethodsType, StoreType } from 'Type/Checkout.type';

import StoreInPickUp from './StoreInPickUp.component';

/** @namespace Component/StoreInPickUp/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showPopup: (payload) => dispatch(showPopup(STORE_IN_PICK_UP_POPUP_ID, payload)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    setPickUpStore: (store) => dispatch(setPickUpStore(store))
});

/** @namespace Component/StoreInPickUp/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    selectedStore: state.StoreInPickUpReducer.store
});

/** @namespace Component/StoreInPickUp/Container */
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
        cartItemsSku: PropTypes.arrayOf(PropTypes.string),
        setPickUpStore: PropTypes.func.isRequired,
        selectedStore: StoreType
    };

    static defaultProps = {
        setSelectedShippingMethodCode: null,
        cartItemsSku: [],
        selectedStore: null
    };

    containerFunctions = {
        handleOpenPopup: this.handleOpenPopup.bind(this),
        setSelectedStore: this.setSelectedStore.bind(this)
    };

    containerProps() {
        const {
            countryId,
            estimateAddress,
            onShippingMethodSelect,
            onStoreSelect,
            shippingMethods,
            setSelectedShippingMethodCode,
            cartItemsSku,
            selectedStore
        } = this.props;

        return {
            countryId,
            estimateAddress,
            onShippingMethodSelect,
            onStoreSelect,
            selectedStore,
            shippingMethods,
            setSelectedShippingMethodCode,
            cartItemsSku
        };
    }

    handleOpenPopup() {
        const { showPopup } = this.props;

        showPopup({ title: __('Select Store') });
    }

    setSelectedStore(store) {
        const { setPickUpStore } = this.props;

        setPickUpStore(store);
    }

    render() {
        return (
            <StoreInPickUp
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreInPickUpContainer);
