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
    STORE_IN_PICK_UP_ATTRIBUTE_CODE,
    STORE_IN_PICK_UP_METHOD_CODE
} from 'Component/StoreInPickUp/StoreInPickUp.config';
import { updateShippingFields } from 'Store/Checkout/Checkout.action';
import { addressType, customerType } from 'Type/Account';
import { shippingMethodsType, shippingMethodType } from 'Type/Checkout';
import { TotalsType } from 'Type/MiniCart';
import { getFormFields, trimAddressFields, trimCustomerAddress } from 'Util/Address';
import { getCartTotalSubPrice } from 'Util/Cart';

import CheckoutShipping from './CheckoutShipping.component';

/** @namespace Component/CheckoutShipping/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    customer: state.MyAccountReducer.customer,
    addressLinesQty: state.ConfigReducer.address_lines_quantity,
    totals: state.CartReducer.cartTotals,
    cartTotalSubPrice: getCartTotalSubPrice(state)
});

/** @namespace Component/CheckoutShipping/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateShippingFields: (fields) => dispatch(updateShippingFields(fields))
});

/** @namespace Component/CheckoutShipping/Container */
export class CheckoutShippingContainer extends PureComponent {
    static propTypes = {
        saveAddressInformation: PropTypes.func.isRequired,
        shippingMethods: shippingMethodsType.isRequired,
        customer: customerType.isRequired,
        addressLinesQty: PropTypes.number.isRequired,
        updateShippingFields: PropTypes.func.isRequired,
        cartTotalSubPrice: PropTypes.number,
        estimateAddress: addressType.isRequired,
        handleSelectDeliveryMethod: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isPickInStoreMethodSelected: PropTypes.bool.isRequired,
        isSubmitted: PropTypes.bool,
        onShippingEstimationFieldsChange: PropTypes.func.isRequired,
        onShippingMethodSelect: PropTypes.func.isRequired,
        onStoreSelect: PropTypes.func.isRequired,
        selectedShippingMethod: shippingMethodType,
        setSelectedShippingMethodCode: PropTypes.func,
        totals: TotalsType.isRequired
    };

    static defaultProps = {
        selectedShippingMethod: null,
        setSelectedShippingMethodCode: null,
        isSubmitted: false,
        cartTotalSubPrice: null
    };

    containerFunctions = {
        onShippingSuccess: this.onShippingSuccess.bind(this),
        onShippingError: this.onShippingError.bind(this),
        onAddressSelect: this.onAddressSelect.bind(this),
        onShippingMethodSelect: this.onShippingMethodSelect.bind(this),
        onStoreSelect: this.onStoreSelect.bind(this)
    };

    __construct(props) {
        super.__construct(props);

        const { shippingMethods } = props;
        const [selectedShippingMethod] = shippingMethods;
        const { method_code = '' } = selectedShippingMethod || {};

        this.state = {
            selectedCustomerAddressId: 0,
            isSubmitted: false,
            selectedShippingMethod: method_code && method_code !== STORE_IN_PICK_UP_METHOD_CODE
                ? selectedShippingMethod
                : {}
        };
    }

    containerProps() {
        const {
            cartTotalSubPrice,
            estimateAddress,
            handleSelectDeliveryMethod,
            isLoading,
            isPickInStoreMethodSelected,
            isSubmitted,
            setSelectedShippingMethodCode,
            shippingMethods,
            totals
        } = this.props;
        const { selectedShippingMethod } = this.state;

        return {
            cartTotalSubPrice,
            estimateAddress,
            handleSelectDeliveryMethod,
            isLoading,
            isPickInStoreMethodSelected,
            isSubmitted,
            setSelectedShippingMethodCode,
            shippingMethods,
            totals,
            selectedShippingMethod
        };
    }

    getStoreAddress(shippingAddress, isBillingAddress = false) {
        const {
            selectedStoreAddress: {
                region,
                city,
                postcode,
                phone,
                street,
                name,
                pickup_location_code,
                country_id
            }
        } = this.state;

        const storeAddress = {
            ...shippingAddress,
            country_id,
            region,
            city,
            postcode,
            telephone: phone,
            street: [street],
            firstname: name,
            lastname: 'Store'
        };

        if (isBillingAddress) {
            return storeAddress;
        }

        return {
            ...storeAddress,
            extension_attributes: [
                {
                    attribute_code: STORE_IN_PICK_UP_ATTRIBUTE_CODE,
                    value: pickup_location_code
                }
            ]
        };
    }

    onAddressSelect(id) {
        this.setState({ selectedCustomerAddressId: id });
    }

    onShippingMethodSelect(method) {
        const { onShippingMethodSelect } = this.props;

        this.setState({ selectedShippingMethod: method });
        onShippingMethodSelect(method);
    }

    onShippingError() {
        // TODO: implement notification if some data in Form can not display error
        const { isSubmitted } = this.state;
        this.setState({ isSubmitted: !isSubmitted });
    }

    onStoreSelect(address) {
        this.setState({ selectedStoreAddress: address });
    }

    onShippingSuccess(fields) {
        const {
            saveAddressInformation,
            updateShippingFields,
            addressLinesQty
        } = this.props;

        const {
            selectedCustomerAddressId,
            selectedShippingMethod,
            selectedStoreAddress
        } = this.state;

        const formFields = getFormFields(fields, addressLinesQty);

        const shippingAddress = selectedCustomerAddressId
            ? this._getAddressById(selectedCustomerAddressId)
            : trimAddressFields(formFields);

        const {
            carrier_code: shipping_carrier_code,
            method_code: shipping_method_code
        } = selectedShippingMethod;

        const data = {
            billing_address: selectedStoreAddress ? this.getStoreAddress(shippingAddress, true) : shippingAddress,
            shipping_address: selectedStoreAddress ? this.getStoreAddress(shippingAddress) : shippingAddress,
            shipping_carrier_code,
            shipping_method_code
        };

        saveAddressInformation(data);
        const shippingMethod = `${shipping_carrier_code}_${shipping_method_code}`;
        updateShippingFields({ ...fields, shippingMethod });
    }

    _getAddressById(addressId) {
        const { customer: { addresses } } = this.props;
        const address = addresses.find(({ id }) => id === addressId);

        return {
            ...trimCustomerAddress(address),
            save_in_address_book: false,
            id: addressId
        };
    }

    render() {
        return (
            <CheckoutShipping
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutShippingContainer);
