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
import { Addresstype, CustomerType } from 'Type/Account.type';
import { ShippingMethodsType, ShippingMethodType, StoreType } from 'Type/Checkout.type';
import { TotalsType } from 'Type/MiniCart.type';
import {
    trimCheckoutAddress,
    trimCheckoutCustomerAddress
} from 'Util/Address';
import { getCartTotalSubPrice } from 'Util/Cart';
import transformToNameValuePair from 'Util/Form/Transform';

import CheckoutShipping from './CheckoutShipping.component';

/** @namespace Component/CheckoutShipping/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    customer: state.MyAccountReducer.customer,
    addressLinesQty: state.ConfigReducer.address_lines_quantity,
    totals: state.CartReducer.cartTotals,
    cartTotalSubPrice: getCartTotalSubPrice(state),
    savedShippingMethodCode: state.CheckoutReducer.shippingFields.shippingMethod
});

/** @namespace Component/CheckoutShipping/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateShippingFields: (fields) => dispatch(updateShippingFields(fields))
});

/** @namespace Component/CheckoutShipping/Container */
export class CheckoutShippingContainer extends PureComponent {
    static propTypes = {
        saveAddressInformation: PropTypes.func.isRequired,
        shippingMethods: ShippingMethodsType.isRequired,
        customer: CustomerType.isRequired,
        addressLinesQty: PropTypes.number.isRequired,
        updateShippingFields: PropTypes.func.isRequired,
        cartTotalSubPrice: PropTypes.number,
        estimateAddress: Addresstype.isRequired,
        handleSelectDeliveryMethod: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isPickInStoreMethodSelected: PropTypes.bool.isRequired,
        isSubmitted: PropTypes.bool,
        onShippingEstimationFieldsChange: PropTypes.func.isRequired,
        onShippingMethodSelect: PropTypes.func.isRequired,
        onStoreSelect: PropTypes.func.isRequired,
        selectedShippingMethod: ShippingMethodType,
        setSelectedShippingMethodCode: PropTypes.func,
        totals: TotalsType.isRequired,
        selectedStoreAddress: StoreType
    };

    static defaultProps = {
        selectedStoreAddress: {},
        selectedShippingMethod: null,
        setSelectedShippingMethodCode: null,
        isSubmitted: false,
        cartTotalSubPrice: null
    };

    containerFunctions = {
        onShippingSuccess: this.onShippingSuccess.bind(this),
        onShippingError: this.onShippingError.bind(this),
        onAddressSelect: this.onAddressSelect.bind(this),
        onShippingMethodSelect: this.onShippingMethodSelect.bind(this)
    };

    __construct(props) {
        super.__construct(props);

        const { shippingMethods = [], savedShippingMethodCode } = props;

        const previousShippingMethod = shippingMethods.find(
            (method) => `${method.carrier_code}_${method.method_code}` === savedShippingMethodCode
        );

        const [defaultShippingMethod] = shippingMethods.filter((method) => method.available);
        const selectedShippingMethod = previousShippingMethod || defaultShippingMethod || {};
        const { method_code = '' } = selectedShippingMethod;

        this.state = {
            selectedCustomerAddressId: 0,
            isSubmitted: false,
            selectedShippingMethod: method_code && method_code !== STORE_IN_PICK_UP_METHOD_CODE
                ? selectedShippingMethod
                : {}
        };
    }

    componentDidUpdate(prevProps) {
        const { shippingMethods: prevShippingMethods } = prevProps;
        const { shippingMethods } = this.props;

        if (prevShippingMethods !== shippingMethods) {
            this.resetShippingMethod();
        }
    }

    resetShippingMethod() {
        const { selectedShippingMethod: { method_code: selectedMethodCode = '' } } = this.state;
        const { shippingMethods } = this.props;

        if (shippingMethods.find(({ method_code }) => method_code === selectedMethodCode)) {
            return;
        }

        const [defaultShippingMethod] = shippingMethods.filter((method) => method.available);
        const selectedShippingMethod = defaultShippingMethod || {};

        this.setState({ selectedShippingMethod });
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
            totals,
            onStoreSelect,
            onShippingEstimationFieldsChange
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
            selectedShippingMethod,
            onStoreSelect,
            onShippingEstimationFieldsChange
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
        } = this.props;

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

    onShippingSuccess(form, fields) {
        const {
            saveAddressInformation,
            updateShippingFields,
            addressLinesQty,
            selectedStoreAddress
        } = this.props;

        const {
            selectedCustomerAddressId,
            selectedShippingMethod
        } = this.state;

        const formattedFields = transformToNameValuePair(fields);

        // Joins streets into one variable
        if (addressLinesQty > 1) {
            formattedFields.street = [];
            // eslint-disable-next-line fp/no-loops,fp/no-let
            for (let i = 0; i < addressLinesQty; i++) {
                if (formattedFields[`street_${i}`]) {
                    formattedFields.street.push(formattedFields[`street_${i}`]);
                }
            }
        }

        const formFields = trimCheckoutAddress(formattedFields);

        const shippingAddress = selectedCustomerAddressId
            ? this._getAddressById(selectedCustomerAddressId)
            : formFields;

        const {
            carrier_code: shipping_carrier_code,
            method_code: shipping_method_code
        } = selectedShippingMethod;

        const isInStoreDelivery = Object.keys(selectedStoreAddress).length > 0;

        const data = {
            billing_address: isInStoreDelivery ? this.getStoreAddress(shippingAddress, true) : shippingAddress,
            shipping_address: isInStoreDelivery ? this.getStoreAddress(shippingAddress) : shippingAddress,
            shipping_carrier_code,
            shipping_method_code
        };

        saveAddressInformation(data);
        const shippingMethod = `${shipping_carrier_code}_${shipping_method_code}`;
        updateShippingFields({ ...formattedFields, shippingMethod });
    }

    _getAddressById(addressId) {
        const { customer: { addresses } } = this.props;
        const address = addresses.find(({ id }) => id === addressId);

        return {
            ...trimCheckoutCustomerAddress(address),
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
