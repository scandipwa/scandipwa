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

import CheckoutAddressBook from 'Component/CheckoutAddressBook';
import CheckoutDeliveryOptions from 'Component/CheckoutDeliveryOptions';
import Form from 'Component/Form';
import Loader from 'Component/Loader';
import LockIcon from 'Component/LockIcon';
import StoreInPickUpComponent from 'Component/StoreInPickUp';
import { SHIPPING_STEP } from 'Route/Checkout/Checkout.config';
import { Addresstype } from 'Type/Account.type';
import { ShippingMethodsType, ShippingMethodType } from 'Type/Checkout.type';
import { TotalsType } from 'Type/MiniCart.type';
import { getAllCartItemsSku } from 'Util/Cart';
import { formatPrice } from 'Util/Price';

import './CheckoutShipping.style';

/** @namespace Component/CheckoutShipping/Component */
export class CheckoutShipping extends PureComponent {
    static propTypes = {
        totals: TotalsType.isRequired,
        cartTotalSubPrice: PropTypes.number,
        onShippingSuccess: PropTypes.func.isRequired,
        onShippingError: PropTypes.func.isRequired,
        onShippingEstimationFieldsChange: PropTypes.func.isRequired,
        shippingMethods: ShippingMethodsType.isRequired,
        onShippingMethodSelect: PropTypes.func.isRequired,
        selectedShippingMethod: ShippingMethodType.isRequired,
        onAddressSelect: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isSubmitted: PropTypes.bool.isRequired,
        onStoreSelect: PropTypes.func.isRequired,
        estimateAddress: Addresstype.isRequired,
        handleSelectDeliveryMethod: PropTypes.func.isRequired,
        isPickInStoreMethodSelected: PropTypes.bool.isRequired,
        setSelectedShippingMethodCode: PropTypes.func
    };

    static defaultProps = {
        setSelectedShippingMethodCode: null,
        cartTotalSubPrice: null
    };

    renderOrderTotalExclTax() {
        const {
            cartTotalSubPrice,
            totals: { quote_currency_code }
        } = this.props;

        if (!cartTotalSubPrice) {
            return null;
        }

        const orderTotalExclTax = formatPrice(cartTotalSubPrice, quote_currency_code);

        return (
            <span block="Checkout" elem="SubPrice">
                { __('Excl. tax: %s', orderTotalExclTax) }
            </span>
        );
    }

    renderPriceLine(price) {
        const { totals: { quote_currency_code } } = this.props;

        return formatPrice(price, quote_currency_code);
    }

    renderOrderTotal() {
        const {
            totals: {
                grand_total,
                quote_currency_code
            }
        } = this.props;

        const orderTotal = formatPrice(grand_total, quote_currency_code);

        return (
            <dl block="Checkout" elem="OrderTotal">
                <dt>
                    { __('Order total') }
                </dt>
                <dt block="Checkout" elem="TotalValue">
                    { orderTotal }
                    { this.renderOrderTotalExclTax() }
                </dt>
            </dl>
        );
    }

    renderActions() {
        const { selectedShippingMethod } = this.props;

        return (
            <div block="Checkout" elem="StickyButtonWrapper">
                { this.renderOrderTotal() }
                <button
                  type="submit"
                  block="Button"
                  disabled={ !selectedShippingMethod }
                  mix={ { block: 'CheckoutShipping', elem: 'Button' } }
                >
                    <LockIcon />
                    { __('Proceed to billing') }
                </button>
            </div>
        );
    }

    renderPickInStoreMethod() {
        const {
            estimateAddress: { country_id },
            shippingMethods,
            onStoreSelect,
            onShippingMethodSelect,
            estimateAddress,
            setSelectedShippingMethodCode,
            totals: { items }
        } = this.props;

        return (
            <StoreInPickUpComponent
              countryId={ country_id }
              shippingMethods={ shippingMethods }
              onStoreSelect={ onStoreSelect }
              onShippingMethodSelect={ onShippingMethodSelect }
              estimateAddress={ estimateAddress }
              setSelectedShippingMethodCode={ setSelectedShippingMethodCode }
              cartItemsSku={ getAllCartItemsSku(items) }
            />
        );
    }

    renderDelivery() {
        const {
            shippingMethods,
            onShippingMethodSelect,
            estimateAddress,
            onStoreSelect,
            handleSelectDeliveryMethod,
            selectedShippingMethod
        } = this.props;

        return (
            <CheckoutDeliveryOptions
              shippingMethods={ shippingMethods }
              onShippingMethodSelect={ onShippingMethodSelect }
              estimateAddress={ estimateAddress }
              onStoreSelect={ onStoreSelect }
              handleSelectDeliveryMethod={ handleSelectDeliveryMethod }
              selectedShippingMethod={ selectedShippingMethod }
            />
        );
    }

    renderAddressBook() {
        const {
            onAddressSelect,
            onShippingEstimationFieldsChange,
            isSubmitted
        } = this.props;

        return (
            <CheckoutAddressBook
              onAddressSelect={ onAddressSelect }
              onShippingEstimationFieldsChange={ onShippingEstimationFieldsChange }
              isSubmitted={ isSubmitted }
            />
        );
    }

    renderContent() {
        const { isLoading, isPickInStoreMethodSelected } = this.props;

        if (isPickInStoreMethodSelected) {
            return this.renderPickInStoreMethod();
        }

        return (
            <>
                { this.renderAddressBook() }
                <div>
                    <Loader isLoading={ isLoading } />
                    { this.renderDelivery() }
                    { this.renderActions() }
                </div>
            </>
        );
    }

    render() {
        const {
            onShippingSuccess,
            onShippingError
        } = this.props;

        return (
            <Form
              attr={ {
                  id: SHIPPING_STEP
              } }
              onSubmit={ onShippingSuccess }
              onError={ onShippingError }
            >
                { this.renderContent() }
            </Form>
        );
    }
}

export default CheckoutShipping;
