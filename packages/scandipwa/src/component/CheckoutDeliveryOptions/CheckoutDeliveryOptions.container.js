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

import { STORE_IN_PICK_UP_METHOD_CODE, STORE_IN_PICK_UP_POPUP_ID } from 'Component/StoreInPickUp/StoreInPickUp.config';
import { SHIPPING_STEP } from 'Route/Checkout/Checkout.config';
import { showPopup } from 'Store/Popup/Popup.action';
import { shippingMethodsType } from 'Type/Checkout';

import CheckoutDeliveryOptions from './CheckoutDeliveryOptions.component';

/** @namespace Component/CheckoutDeliveryOptions/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Component/CheckoutDeliveryOptions/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showPopup: (popupId) => dispatch(showPopup(popupId))
});

/** @namespace Component/CheckoutDeliveryOptions/Container */
export class CheckoutDeliveryOptionsContainer extends PureComponent {
    static propTypes = {
        onShippingMethodSelect: PropTypes.func.isRequired,
        showPopup: PropTypes.func.isRequired,
        onStoreSelect: PropTypes.func.isRequired,
        shippingMethods: shippingMethodsType.isRequired,
        selectedShippingMethod: PropTypes.object
    };

    static defaultProps = {
        selectedShippingMethod: {}
    };

    containerFunctions = {
        selectShippingMethod: this.selectShippingMethod.bind(this)
    };

    dataMap = {};

    componentDidMount() {
        if (window.formPortalCollector) {
            window.formPortalCollector.subscribe(SHIPPING_STEP, this.collectAdditionalData, 'CheckoutDeliveryOptions');
        }
    }

    componentWillUnmount() {
        if (window.formPortalCollector) {
            window.formPortalCollector.unsubscribe(SHIPPING_STEP, 'CheckoutDeliveryOptions');
        }
    }

    collectAdditionalData = () => {
        const { selectedShippingMethod: { method_code } } = this.props;
        const additionalDataGetter = this.dataMap[method_code];

        if (!additionalDataGetter) {
            return {};
        }

        return additionalDataGetter();
    };

    selectShippingMethod(shippingMethod) {
        const { onShippingMethodSelect, showPopup, onStoreSelect } = this.props;
        const { method_code } = shippingMethod;

        if (method_code === STORE_IN_PICK_UP_METHOD_CODE) {
            showPopup(STORE_IN_PICK_UP_POPUP_ID);
        }

        onShippingMethodSelect(shippingMethod);
        onStoreSelect();
    }

    render() {
        return (
            <CheckoutDeliveryOptions
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.state }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutDeliveryOptionsContainer);
