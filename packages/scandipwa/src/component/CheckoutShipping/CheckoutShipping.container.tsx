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
import { CheckoutAddress } from 'Route/Checkout/Checkout.type';
import { updateShippingFields } from 'Store/Checkout/Checkout.action';
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

/** @namespace Component/CheckoutShipping/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CheckoutShippingContainerMapStateProps => ({
    customer: state.MyAccountReducer.customer,
    addressLinesQty: state.ConfigReducer.address_lines_quantity,
    totals: state.CartReducer.cartTotals,
    cartTotalSubPrice: getCartTotalSubPrice(state),
    savedShippingMethodCode: state.CheckoutReducer.shippingFields.shippingMethod as string,
});

/** @namespace Component/CheckoutShipping/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CheckoutShippingContainerMapDispatchProps => ({
    updateShippingFields: (fields) => dispatch(updateShippingFields(fields)),
});

/** @namespace Component/CheckoutShipping/Container */
export class CheckoutShippingContainer<
P extends Readonly<CheckoutShippingContainerProps> = Readonly<CheckoutShippingContainerProps>,
S extends CheckoutShippingContainerState = CheckoutShippingContainerState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<CheckoutShippingContainerProps> = {
        selectedStoreAddress: undefined,
        isSubmitted: false,
        cartTotalSubPrice: null,
    };

    containerFunctions: CheckoutShippingContainerFunctions = {
        onShippingSuccess: this.onShippingSuccess.bind(this),
        onShippingError: this.onShippingError.bind(this),
        onAddressSelect: this.onAddressSelect.bind(this),
        onShippingMethodSelect: this.onShippingMethodSelect.bind(this),
    };

    __construct(props: P): void {
        super.__construct?.(props);

        const { shippingMethods = [], savedShippingMethodCode } = props;

        const previousShippingMethod = shippingMethods.find(
            (method) => `${method.carrier_code}_${method.method_code}` === savedShippingMethodCode,
        );

        const [defaultShippingMethod] = shippingMethods.filter((method) => method.available);
        const selectedShippingMethod = previousShippingMethod || defaultShippingMethod || {};
        const { method_code = '' } = selectedShippingMethod;

        this.state = {
            selectedCustomerAddressId: 0,
            isSubmitted: false,
            selectedShippingMethod: method_code && method_code !== StoreInPickUpCode.METHOD_CODE
                ? selectedShippingMethod
                : undefined,
        } as S;
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
            estimateAddress,
            handleSelectDeliveryMethod,
            isLoading,
            isPickInStoreMethodSelected,
            isSubmitted,
            shippingMethods,
            totals,
            onStoreSelect,
            onShippingEstimationFieldsChange,
        } = this.props;
        const { selectedShippingMethod } = this.state;

        return {
            cartTotalSubPrice,
            estimateAddress,
            handleSelectDeliveryMethod,
            isLoading,
            isPickInStoreMethodSelected,
            isSubmitted,
            shippingMethods,
            totals,
            selectedShippingMethod,
            onStoreSelect,
            onShippingEstimationFieldsChange,
        };
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

    onShippingMethodSelect(method?: ShippingMethod): void {
        const { onShippingMethodSelect } = this.props;

        if (!method) {
            return;
        }

        this.setState({ selectedShippingMethod: method });
        onShippingMethodSelect(method);
    }

    onShippingError(
        form: HTMLFormElement,
        fields: FormFields | null,
        validation: boolean | ValidationDOMOutput,
    ): void {
        // TODO: implement notification if some data in Form can not display error
        const { isSubmitted } = this.state;
        const { onChangeEmailRequired } = this.props;

        onChangeEmailRequired();
        this.setState({ isSubmitted: !isSubmitted });
        scrollToError(fields, validation);
    }

    onShippingSuccess(
        form: HTMLFormElement,
        fields: FieldData[],
    ): void {
        const {
            saveAddressInformation,
            updateShippingFields,
            addressLinesQty,
            selectedStoreAddress,
            customer: { default_shipping },
        } = this.props;

        const {
            selectedCustomerAddressId,
            selectedShippingMethod,
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
        const shipping_method = `${shipping_carrier_code}_${shipping_method_code}`;
        const { street = [] } = formattedFields;

        updateShippingFields({
            ...(
                street.length
                    || ('id' in data.shipping_address
                    && default_shipping
                    && parseInt(default_shipping, 10) === data.shipping_address.id)
                    ? formattedFields : data.shipping_address
            ),
            shipping_method,
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
