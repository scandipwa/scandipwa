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
export const mapStateToProps = (state) => ({
    shippingMethod: state.CartReducer.cartTotals.shipping_method
});

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
        shippingMethods: shippingMethodsType.isRequired
    };

    static _getDefaultMethod(props) {
        const {
            shippingMethods = [],
            shippingMethod
        } = props;

        const items = shippingMethods.filter(({ available }) => available);

        /**
         * Code bellow checking the first selected shipping method.
         *
         * In the case of PICK UP IN STORE, code will not select it, as we need customer to select it manually,
         * to open popup and select actual store where order will be shipped.
         */
        const result = items.find(
            ({ method_code, carrier_code }) => (`${carrier_code}_${method_code}` === shippingMethod
            ) && method_code !== STORE_IN_PICK_UP_METHOD_CODE
        ) || (
            items[0] && items[0].method_code !== STORE_IN_PICK_UP_METHOD_CODE
                ? items[0]
                : {}
        );

        return result.method_code;
    }

    containerFunctions = {
        selectShippingMethod: this.selectShippingMethod.bind(this),
        setSelectedShippingMethodCode: this.setSelectedShippingMethodCode.bind(this)
    };

    dataMap = {};

    __construct(props) {
        super.__construct(props);

        const { shippingMethods } = props;
        this.state = { prevShippingMethods: shippingMethods };

        const selectedShippingMethodCode = CheckoutDeliveryOptionsContainer._getDefaultMethod(props);

        if (selectedShippingMethodCode) {
            this.state = {
                ...this.state,
                selectedShippingMethodCode
            };
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { shippingMethods } = props;
        const { prevShippingMethods } = state;

        if (shippingMethods.length !== prevShippingMethods.length) {
            const selectedShippingMethodCode = CheckoutDeliveryOptionsContainer._getDefaultMethod(props);

            return {
                selectedShippingMethodCode,
                prevShippingMethods: shippingMethods
            };
        }

        return null;
    }

    componentDidMount() {
        if (window.formPortalCollector) {
            window.formPortalCollector.subscribe(SHIPPING_STEP, this.collectAdditionalData, 'CheckoutDeliveryOptions');
        }
    }

    componentDidUpdate(_, prevState) {
        const { onShippingMethodSelect, shippingMethods } = this.props;
        const { selectedShippingMethodCode } = this.state;
        const { selectedShippingMethodCode: prevSelectedShippingMethodCode } = prevState;

        if (selectedShippingMethodCode !== prevSelectedShippingMethodCode) {
            const shippingMethod = shippingMethods.find(
                ({ method_code }) => method_code === selectedShippingMethodCode
            );

            onShippingMethodSelect(shippingMethod);
        }
    }

    componentWillUnmount() {
        if (window.formPortalCollector) {
            window.formPortalCollector.unsubscribe(SHIPPING_STEP, 'CheckoutDeliveryOptions');
        }
    }

    collectAdditionalData = () => {
        const { selectedShippingMethodCode } = this.state;
        const additionalDataGetter = this.dataMap[selectedShippingMethodCode];
        if (!additionalDataGetter) {
            return {};
        }

        return additionalDataGetter();
    };

    setSelectedShippingMethodCode(code) {
        this.setState({ selectedShippingMethodCode: code });
    }

    selectShippingMethod(shippingMethod) {
        const { onShippingMethodSelect, showPopup, onStoreSelect } = this.props;
        const { method_code } = shippingMethod;

        if (method_code === STORE_IN_PICK_UP_METHOD_CODE) {
            showPopup(STORE_IN_PICK_UP_POPUP_ID);
        }

        this.setSelectedShippingMethodCode(method_code);
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
