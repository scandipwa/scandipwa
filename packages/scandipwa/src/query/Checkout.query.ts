/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */

import { Field, Mutation, Query } from '@tilework/opus';

import {
    GQLEstimateShippingCostsAddress,
    GQLSaveAddressInformation,
    GQLSSetBillingAddressOnCartInput,
    GQLSSetPaymentMethodOnCartInput
} from 'Type/Graphql.type';
import { isSignedIn } from 'Util/Auth';

import {
    PaymentDetails,
    PaymentMethod,
    SetGuestEmailOnCartOutput,
    ShippingMethod,
    TotalsItem,
    TotalsObject
} from './Checkout.type';

/** @namespace Query/Checkout/Query */
export class CheckoutQuery {
    getPaymentMethodsQuery(guestCartId: string): Query<'getPaymentMethods', PaymentMethod, true> {
        const query = new Query<'getPaymentMethods', PaymentMethod, true>('getPaymentMethods', true)
            .addFieldList(this._getPaymentMethodFields());

        this._addGuestCartId(guestCartId, query as Query<'getPaymentMethods', PaymentMethod, true>);

        return query as Query<'getPaymentMethods', PaymentMethod, true>;
    }

    getSaveGuestEmailMutation(
        email: string,
        cart_id: string
    ): Mutation<'setGuestEmailOnCart', SetGuestEmailOnCartOutput> {
        const input = { email, cart_id };
        const mutation = new Mutation<'setGuestEmailOnCart', SetGuestEmailOnCartOutput>('setGuestEmailOnCart')
            .addArgument('input', 'SetGuestEmailOnCartInput', input)
            .addField(((new Field('cart')).addField('email')));

        return mutation;
    }

    getEstimateShippingCosts(
        address: GQLEstimateShippingCostsAddress,
        guestCartId: string
    ): Mutation<'estimateShippingCosts', ShippingMethod, true> {
        const mutation = new Mutation<'estimateShippingCosts', ShippingMethod, true>('estimateShippingCosts', true)
            .addArgument('address', 'EstimateShippingCostsAddress!', address)
            .addFieldList(this._getEstimatedShippingFields());

        this._addGuestCartId(guestCartId, mutation);

        return mutation;
    }

    getSaveAddressInformation(
        addressInformation: GQLSaveAddressInformation,
        guestCartId: string
    ): Mutation<'saveAddressInformation', PaymentDetails> {
        const mutation = new Mutation<'saveAddressInformation', PaymentDetails>('saveAddressInformation')
            .addArgument('addressInformation', 'SaveAddressInformation!', addressInformation)
            .addFieldList(this._getSaveAddressInformationFields());

        this._addGuestCartId(guestCartId, mutation);

        return mutation;
    }

    getSetBillingAddressOnCart(
        input: GQLSSetBillingAddressOnCartInput
    ): Mutation<'billingAddress', { cart: { id: number } }> {
        return new Mutation<'setBillingAddressOnCart', { cart: { id: number } }>('setBillingAddressOnCart')
            .addArgument('input', 'SetBillingAddressOnCartInput', input)
            .addField(this._getCartField())
            .setAlias('billingAddress');
    }

    getSetPaymentMethodOnCartMutation(
        input: GQLSSetPaymentMethodOnCartInput
    ): Mutation<'paymentMethod', { cart: { id: number } }> {
        return new Mutation<'setPaymentMethodOnCart', { cart: { id: number } }>('setPaymentMethodOnCart')
            .addArgument('input', 'SetPaymentMethodOnCartInput', input)
            .addField(this._getCartField())
            .setAlias('paymentMethod');
    }

    getPlaceOrderMutation(cartId: string): Mutation<'placeOrder', { order: { order_id: string } }> {
        const mutation = new Mutation<'placeOrder', { order: { order_id: string } }>('placeOrder')
            .addArgument('input', 'PlaceOrderInput', { cart_id: cartId })
            .addField(this._getOrderField());

        return mutation;
    }

    _addGuestCartId(
        guestCartId: string,
        mutation: Mutation<'saveAddressInformation', PaymentDetails>
        | Mutation<'estimateShippingCosts', ShippingMethod, true>
        | Query<'getPaymentMethods', PaymentMethod, true>
    ): void {
        if (guestCartId && !isSignedIn()) {
            mutation.addArgument('guestCartId', 'String!', guestCartId);
        }
    }

    _getOrderField(): Field<'order', { order_id: string }> {
        return new Field<'order', { order_id: string }>('order')
            .addFieldList([new Field<'order_id', string>('order_id')]);
    }

    _getSaveAddressInformationFields(): Array<
    Field<'payment_methods', PaymentMethod, true>
    | Field<'totals', TotalsObject>
    > {
        return [
            this._getPaymentMethodsField(),
            this._getTotalsField()
        ];
    }

    _getEstimatedShippingFields(): Array<
    Field<'amount', number>
    | Field<'available', boolean>
    | Field<'base_amount', number>
    | Field<'method_code', string>
    | Field<'carrier_code', string>
    | Field<'method_title', string>
    | Field<'carrier_title', string>
    | Field<'error_message', string>
    | Field<'price_excl_tax', number>
    | Field<'price_incl_tax', number>
    > {
        return [
            new Field<'amount', number>('amount'),
            new Field<'available', boolean>('available'),
            new Field<'base_amount', number>('base_amount'),
            new Field<'method_code', string>('method_code'),
            new Field<'carrier_code', string>('carrier_code'),
            new Field<'method_title', string>('method_title'),
            new Field<'carrier_title', string>('carrier_title'),
            new Field<'error_message', string>('error_message'),
            new Field<'price_excl_tax', number>('price_excl_tax'),
            new Field<'price_incl_tax', number>('price_incl_tax')
        ];
    }

    _getPaymentMethodsField(): Field<'payment_methods', PaymentMethod, true> {
        return new Field<'payment_methods', PaymentMethod, true>('payment_methods', true)
            .addFieldList(this._getPaymentMethodFields()) as Field<'payment_methods', PaymentMethod, true>;
    }

    _getPaymentMethodFields(): Array<
    Field<'code', string>
    | Field<'title', string>
    > {
        return [
            new Field<'code', string>('code'),
            new Field<'title', string>('title')
        ];
    }

    _getTotalItemFields(): Array<
    Field<'qty', number>
    | Field<'name', string>
    | Field<'price', number>
    | Field<'item_id', number>
    | Field<'options', string>
    | Field<'tax_amount', number>
    | Field<'tax_percent', number>
    | Field<'price_incl_tax', number>
    | Field<'discount_amount', number>
    | Field<'discount_percent', number>
    > {
        return [
            new Field<'qty', number>('qty'),
            new Field<'name', string>('name'),
            new Field<'price', number>('price'),
            new Field<'item_id', number>('item_id'),
            new Field<'options', string>('options'),
            new Field<'tax_amount', number>('tax_amount'),
            new Field<'tax_percent', number>('tax_percent'),
            new Field<'price_incl_tax', number>('price_incl_tax'),
            new Field<'discount_amount', number>('discount_amount'),
            new Field<'discount_percent', number>('discount_percent')
        ];
    }

    _getTotalItemField(): Field<'items', TotalsItem, true> {
        return new Field<'items', TotalsItem, true>('items')
            .addFieldList(this._getTotalItemFields());
    }

    _getTotalsFields(): Array<
    Field<'subtotal', number>
    | Field<'tax_amount', number>
    | Field<'base_grand_total', number>
    | Field<'grand_total', number>
    | Field<'discount_amount', number>
    | Field<'shipping_amount', number>
    | Field<'subtotal_incl_tax', number>
    | Field<'shipping_incl_tax', number>
    | Field<'quote_currency_code', string>
    | Field<'shipping_tax_amount', number>
    | Field<'subtotal_with_discount', number>
    | Field<'shipping_discount_amount', number>
    | Field<'items', TotalsItem, true>
    > {
        return [
            new Field<'subtotal', number>('subtotal'),
            new Field<'tax_amount', number>('tax_amount'),
            new Field<'base_grand_total', number>('base_grand_total'),
            new Field<'grand_total', number>('grand_total'),
            new Field<'discount_amount', number>('discount_amount'),
            new Field<'shipping_amount', number>('shipping_amount'),
            new Field<'subtotal_incl_tax', number>('subtotal_incl_tax'),
            new Field<'shipping_incl_tax', number>('shipping_incl_tax'),
            new Field<'quote_currency_code', string>('quote_currency_code'),
            new Field<'shipping_tax_amount', number>('shipping_tax_amount'),
            new Field<'subtotal_with_discount', number>('subtotal_with_discount'),
            new Field<'shipping_discount_amount', number>('shipping_discount_amount'),
            this._getTotalItemField()
        ];
    }

    _getTotalsField(): Field<'totals', TotalsObject> {
        return new Field<'totals', TotalsObject>('totals')
            .addFieldList(this._getTotalsFields());
    }

    _getCartField(): Field<'cart', { id: number }> {
        return new Field<'cart', { id: number }>('cart')
            .addFieldList(this._getCartFieldList());
    }

    _getCartFieldList(): Field<'id', number>[] {
        return [
            new Field<'id', number>('id')
        ];
    }
}

export default new CheckoutQuery();
