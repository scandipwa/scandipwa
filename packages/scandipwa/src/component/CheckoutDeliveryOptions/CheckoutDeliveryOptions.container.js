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

import { SHIPPING_STEP } from 'Route/Checkout/Checkout.config';
import { addressType } from 'Type/Account';
import { shippingMethodsType } from 'Type/Checkout';

import CheckoutDeliveryOptions from './CheckoutDeliveryOptions.component';

/** @namespace Component/CheckoutDeliveryOptions/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Component/CheckoutDeliveryOptions/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/CheckoutDeliveryOptions/Container */
export class CheckoutDeliveryOptionsContainer extends PureComponent {
    static propTypes = {
        onShippingMethodSelect: PropTypes.func.isRequired,
        onStoreSelect: PropTypes.func.isRequired,
        shippingMethods: shippingMethodsType.isRequired,
        estimateAddress: addressType.isRequired,
        handleSelectDeliveryMethod: PropTypes.func.isRequired,
        selectedShippingMethod: PropTypes.object
    };

    static defaultProps = {
        selectedShippingMethod: {}
    };

    state = {
        isShippingMethodPreSelected: true
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

    containerProps() {
        const {
            estimateAddress,
            onShippingMethodSelect,
            onStoreSelect,
            shippingMethods,
            handleSelectDeliveryMethod,
            selectedShippingMethod
        } = this.props;
        const { isShippingMethodPreSelected } = this.state;

        return {
            estimateAddress,
            onShippingMethodSelect,
            onStoreSelect,
            selectedShippingMethod,
            shippingMethods,
            handleSelectDeliveryMethod,
            isShippingMethodPreSelected
        };
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
        const { onShippingMethodSelect } = this.props;
        const { isShippingMethodPreSelected } = this.state;

        if (isShippingMethodPreSelected) {
            this.setState({ isShippingMethodPreSelected: false });
        }

        onShippingMethodSelect(shippingMethod);
    }

    render() {
        return (
            <CheckoutDeliveryOptions
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutDeliveryOptionsContainer);
