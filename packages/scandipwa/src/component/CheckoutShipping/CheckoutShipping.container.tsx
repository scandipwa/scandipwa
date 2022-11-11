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

import { FormFields } from 'Component/Form/Form.type';
import {
    StoreInPickUpCode,
} from 'Component/StoreInPickUp/StoreInPickUp.config';
import { StoreWithCountryId } from 'Component/StoreInPickUpPopup/StoreInPickUpPopup.type';
import { ShippingMethod } from 'Query/Checkout.type';
import { updateCheckoutStore } from 'Store/Checkout/Checkout.action';
import { CheckoutAddress } from 'Store/Checkout/Checkout.type';
import { ReactElement } from 'Type/Common.type';
import {
    trimCheckoutAddress,
    trimCheckoutCustomerAddress,
} from 'Util/Address';
import { scrollToTop } from 'Util/Browser';
import { getCartTotalSubPrice } from 'Util/Cart';
import scrollToError from 'Util/Form/Form';
import { FieldData } from 'Util/Form/Form.type';
import transformToNameValuePair from 'Util/Form/Transform';
import { RootState } from 'Util/Store/Store.type';
import { ValidationDOMOutput } from 'Util/Validator/Validator.type';

import CheckoutShipping from './CheckoutShipping.component';
import {
    CheckoutShippingComponentProps,
    CheckoutShippingContainerFunctions,
    CheckoutShippingContainerMapDispatchProps,
    CheckoutShippingContainerMapStateProps,
    CheckoutShippingContainerProps,
    CheckoutShippingContainerPropsKeys,
    CheckoutShippingContainerState,
} from './CheckoutShipping.type';

export const CheckoutDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Checkout/Checkout.dispatcher'
);

/** @namespace Component/CheckoutShipping/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CheckoutShippingContainerMapStateProps => ({
    customer: state.MyAccountReducer.customer,
    addressLinesQty: state.ConfigReducer.address_lines_quantity,
    totals: state.CartReducer.cartTotals,
    isDeliveryOptionsLoading: state.CheckoutReducer.isDeliveryOptionsLoading,
    cartTotalSubPrice: getCartTotalSubPrice(state),
    savedShippingMethodCode: state.CheckoutReducer.shippingFields.shippingMethod as string,
    selectedStoreAddress: state.CheckoutReducer.selectedStoreAddress,
    selectedShippingMethod: state.CheckoutReducer.selectedShippingMethod,
    shippingMethods: state.CheckoutReducer.shippingMethods,
});

/** @namespace Component/CheckoutShipping/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CheckoutShippingContainerMapDispatchProps => ({
    updateCheckoutStore: (state) => dispatch(updateCheckoutStore(state)),
    onChangeEmailRequired: () => CheckoutDispatcher.then(
        ({ default: dispatcher }) => dispatcher.onChangeEmailRequired(dispatch),
    ),
});

/** @namespace Component/CheckoutShipping/Container */
export class CheckoutShippingContainer extends PureComponent<
CheckoutShippingContainerProps,
CheckoutShippingContainerState
> {
    static defaultProps: Partial<CheckoutShippingContainerProps> = {
        cartTotalSubPrice: null,
    };

    containerFunctions: CheckoutShippingContainerFunctions = {
        onShippingSuccess: this.onShippingSuccess.bind(this),
        onShippingError: this.onShippingError.bind(this),
        onAddressSelect: this.onAddressSelect.bind(this),
    };

    __construct(props: CheckoutShippingContainerProps): void {
        super.__construct?.(props);

        this.state = {
            selectedCustomerAddressId: 0,
        };
    }

    componentDidUpdate(prevProps: CheckoutShippingContainerProps): void {
        const { isPickInStoreMethodSelected } = this.props;
        const { isPickInStoreMethodSelected: prevIsPickInStoreMethodSelected } = prevProps;

        if (isPickInStoreMethodSelected !== prevIsPickInStoreMethodSelected) {
            if (isPickInStoreMethodSelected) {
                scrollToTop();
                this.onShippingMethodSelect(this.returnInStorePickupMethod());
            } else if (prevIsPickInStoreMethodSelected) {
                this.resetShippingMethod();
            }
        }
    }

    containerProps(): Pick<CheckoutShippingComponentProps, CheckoutShippingContainerPropsKeys> {
        const {
            cartTotalSubPrice,
            isDeliveryOptionsLoading,
            isPickInStoreMethodSelected,
            totals,
            onShippingEstimationFieldsChange,
        } = this.props;

        return {
            cartTotalSubPrice,
            isDeliveryOptionsLoading,
            isPickInStoreMethodSelected,
            totals,
            onShippingEstimationFieldsChange,
            selectedShippingMethod: this.handleSelectedShippingMethod(),
        };
    }

    handleSelectedShippingMethod(): ShippingMethod | undefined {
        const {
            shippingMethods = [],
            savedShippingMethodCode,
        } = this.props;

        const previousShippingMethod = shippingMethods.find(
            (method) => `${method.carrier_code}_${method.method_code}` === savedShippingMethodCode,
        );

        const [defaultShippingMethod] = shippingMethods.filter((method) => method.available);
        const selectedShippingMethod = previousShippingMethod || defaultShippingMethod || {};
        const { method_code = '' } = selectedShippingMethod;

        return method_code && method_code !== StoreInPickUpCode.METHOD_CODE
            ? selectedShippingMethod
            : undefined;
    }

    returnInStorePickupMethod(): ShippingMethod | undefined {
        const { shippingMethods = [] } = this.props;

        return shippingMethods.find((el) => el?.method_code === StoreInPickUpCode.METHOD_CODE);
    }

    resetShippingMethod(): void {
        this.onShippingMethodSelect({ method_code: '' } as ShippingMethod);
    }

    getStoreAddress(
        shippingAddress: CheckoutAddress,
        isBillingAddress = false,
    ): Partial<StoreWithCountryId> {
        const {
            selectedStoreAddress: {
                region,
                city,
                postcode,
                phone,
                street,
                name,
                pickup_location_code,
                country_id,
            } = {},
        } = this.props;

        const storeAddress = {
            ...shippingAddress,
            country_id,
            region,
            city,
            postcode,
            telephone: phone,
            street,
            firstname: name,
            lastname: 'Store',
        };

        if (isBillingAddress) {
            return storeAddress;
        }

        return {
            ...storeAddress,
            extension_attributes: [
                {
                    attribute_code: StoreInPickUpCode.ATTRIBUTE_CODE,
                    value: pickup_location_code || '',
                },
            ],
        };
    }

    onAddressSelect(id: number): void {
        this.setState({ selectedCustomerAddressId: id });
    }

    onShippingMethodSelect(selectedShippingMethod?: ShippingMethod): void {
        const { updateCheckoutStore } = this.props;

        if (!selectedShippingMethod) {
            return;
        }

        updateCheckoutStore({ selectedShippingMethod });
    }

    onShippingError(
        form: HTMLFormElement,
        fields: FormFields | null,
        validation: boolean | ValidationDOMOutput,
    ): void {
        const { onChangeEmailRequired } = this.props;

        onChangeEmailRequired();
        scrollToError(fields, validation);
    }

    onShippingSuccess(
        form: HTMLFormElement,
        fields: FieldData[],
    ): void {
        const {
            saveAddressInformation,
            updateCheckoutStore,
            addressLinesQty,
            selectedStoreAddress,
            customer: { default_shipping },
            selectedShippingMethod,
        } = this.props;

        const {
            selectedCustomerAddressId,
        } = this.state;

        const formattedFields = transformToNameValuePair <CheckoutAddress & Record<string, unknown>>(fields);

        // Joins streets into one variable
        if (addressLinesQty > 1) {
            formattedFields.street = [];
            // eslint-disable-next-line fp/no-loops,fp/no-let
            for (let i = 0; i < addressLinesQty; i++) {
                if (formattedFields[ `street_${i}` as keyof typeof formattedFields ]) {
                    (formattedFields.street).push(
                        formattedFields[ `street_${i}` as keyof typeof formattedFields ] as string,
                    );
                }
            }
        }

        const formFields = trimCheckoutAddress(formattedFields);

        const shippingAddress = selectedCustomerAddressId
            ? this._getAddressById(selectedCustomerAddressId)
            : formFields;

        if (!shippingAddress) {
            return;
        }

        const {
            carrier_code: shipping_carrier_code,
            method_code: shipping_method_code,
        } = selectedShippingMethod || {};

        const isInStoreDelivery = Object.keys(selectedStoreAddress || {}).length > 0;

        const data = {
            billing_address: isInStoreDelivery ? this.getStoreAddress(shippingAddress, true) : shippingAddress,
            shipping_address: isInStoreDelivery ? this.getStoreAddress(shippingAddress) : shippingAddress,
            shipping_carrier_code: shipping_carrier_code || '',
            shipping_method_code: shipping_method_code || '',
        };

        saveAddressInformation(data);
        const shippingMethod = `${shipping_carrier_code}_${shipping_method_code}`;
        const { street = [] } = formattedFields;

        updateCheckoutStore({
            shippingFields: {
                ...(
                    street.length
                    || ('id' in data.shipping_address
                    && default_shipping
                    && parseInt(default_shipping, 10) === data.shipping_address.id)
                        ? formattedFields : data.shipping_address
                ),
                shippingMethod,
            },
        });
    }

    _getAddressById(addressId: number): CheckoutAddress | null {
        const { customer: { addresses } } = this.props;

        const address = (addresses)?.find(({ id }) => id === addressId);

        if (!address) {
            return null;
        }

        return {
            ...trimCheckoutCustomerAddress(address),
            save_in_address_book: false,
            id: addressId,
        };
    }

    render(): ReactElement {
        return (
            <CheckoutShipping
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutShippingContainer);
