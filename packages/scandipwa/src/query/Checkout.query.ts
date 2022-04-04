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

import { Field, Mutation, Query } from '@tilework/opus';

import {
    GQLCart,
    GQLOrder,
    GQLPaymentDetails,
    GQLPaymentMethod,
    GQLPaymentTotals,
    GQLPlaceOrderOutput,
    GQLS_SetBillingAddressOnCartInput,
    GQLS_SetPaymentMethodOnCartInput,
    GQLSetBillingAddressOnCartOutput,
    GQLSetGuestEmailOnCartOutput,
    GQLSetPaymentMethodOnCartOutput,
    GQLShippingMethod,
    GQLTotalsItem
} from 'Type/Graphql.type';
import { isSignedIn } from 'Util/Auth';

import { CommonField } from './Query.type';

/** @namespace Query/Checkout/Query */
export class CheckoutQuery {
    getPaymentMethodsQuery(guestCartId: string): Query<'getPaymentMethods', GQLPaymentMethod, true> {
        const query = new Query<'getPaymentMethods', GQLPaymentMethod, true>('getPaymentMethods')
            .addFieldList(this._getPaymentMethodFields());

        this._addGuestCartId(guestCartId, query as Query<string, unknown, boolean>);

        return query;
    }

    getSaveGuestEmailMutation(
        email: string,
        cart_id: string
    ): Mutation<'setGuestEmailOnCart', GQLSetGuestEmailOnCartOutput & {
            cart: {
                email: string;
            };
        }, false> {
        const input = { email, cart_id };
        const mutation = new Mutation<'setGuestEmailOnCart', GQLSetGuestEmailOnCartOutput>('setGuestEmailOnCart')
            .addArgument('input', 'SetGuestEmailOnCartInput', input)
            .addField(((new Field('cart')).addField('email')));

        return mutation;
    }

    getEstimateShippingCosts(
        address: string,
        guestCartId: string
    ): Mutation<'estimateShippingCosts', GQLShippingMethod, true> {
        const mutation = new Mutation<'estimateShippingCosts', GQLShippingMethod, true>('estimateShippingCosts', true)
            .addArgument('address', 'EstimateShippingCostsAddress!', address)
            .addFieldList(this._getEstimatedShippingFields());

        this._addGuestCartId(guestCartId, mutation as Mutation<string, unknown, boolean>);

        return mutation;
    }

    getSaveAddressInformation(
        addressInformation: string,
        guestCartId: string
    ): Mutation<'saveAddressInformation', GQLPaymentDetails & {
            [x: string]: unknown;
        }> {
        const mutation = new Mutation<'saveAddressInformation', GQLPaymentDetails>('saveAddressInformation')
            .addArgument('addressInformation', 'SaveAddressInformation!', addressInformation)
            .addFieldList(this._getSaveAddressInformationFields());

        this._addGuestCartId(guestCartId, mutation as Mutation<string, unknown, false>);

        return mutation;
    }

    getSetBillingAddressOnCart(
        input: GQLS_SetBillingAddressOnCartInput
    ): Mutation<'billingAddress', GQLSetBillingAddressOnCartOutput> {
        return new Mutation<'s_setBillingAddressOnCart', GQLSetBillingAddressOnCartOutput>('s_setBillingAddressOnCart')
            .addArgument('input', 'S_SetBillingAddressOnCartInput!', input)
            .addField(this._getCartField())
            .setAlias('billingAddress');
    }

    getSetPaymentMethodOnCartMutation(
        input: GQLS_SetPaymentMethodOnCartInput
    ): Mutation<'paymentMethod', GQLSetPaymentMethodOnCartOutput> {
        return new Mutation<'s_setPaymentMethodOnCart', GQLSetPaymentMethodOnCartOutput>('s_setPaymentMethodOnCart')
            .addArgument('input', 'S_SetPaymentMethodOnCartInput!', input)
            .addField(this._getCartField())
            .setAlias('paymentMethod');
    }

    getPlaceOrderMutation(guestCartId: string): Mutation<'placeOrder', GQLPlaceOrderOutput & {
        order: GQLOrder & {
            order_id: string;
        };
    }> {
        const mutation = new Mutation<'s_placeOrder', GQLPlaceOrderOutput>('s_placeOrder')
            .setAlias('placeOrder')
            .addField(this._getOrderField());

        if (!isSignedIn()) {
            mutation.addArgument('guestCartId', 'String', guestCartId);
        }

        return mutation;
    }

    _addGuestCartId(
        guestCartId: string,
        mutation: Mutation<string, unknown, boolean> | Query<string, unknown, boolean>
    ): void {
        if (guestCartId && !isSignedIn()) {
            mutation.addArgument('guestCartId', 'String!', guestCartId);
        }
    }

    _getOrderField(): Field<'order', GQLOrder & {
        order_id: string;
    }, false> {
        return new Field<'order', GQLOrder>('order')
            .addFieldList(['order_id']);
    }

    _getSaveAddressInformationFields(): CommonField[] {
        return [
            this._getPaymentMethodsField(),
            this._getTotalsField()
        ];
    }

    _getEstimatedShippingFields(): string[] {
        return [
            'amount',
            'available',
            'base_amount',
            'method_code',
            'carrier_code',
            'method_title',
            'carrier_title',
            'error_message',
            'price_excl_tax',
            'price_incl_tax'
        ];
    }

    _getPaymentMethodsField(): Field<'payment_methods', GQLPaymentMethod, true> {
        return new Field<'payment_methods', GQLPaymentMethod, true>('payment_methods', true)
            .addFieldList(this._getPaymentMethodFields());
    }

    _getPaymentMethodFields(): string[] {
        return ['code', 'title'];
    }

    _getTotalItemFields(): string[] {
        return [
            'qty',
            'name',
            'price',
            'item_id',
            'options',
            'tax_amount',
            'tax_percent',
            'price_incl_tax',
            'discount_amount',
            'discount_percent'
        ];
    }

    _getTotalItemField(): Field<'items', GQLTotalsItem> {
        return new Field('items')
            .addFieldList(this._getTotalItemFields());
    }

    _getTotalsFields(): CommonField[] {
        return [
            'subtotal',
            'tax_amount',
            'base_grand_total',
            'grand_total',
            'discount_amount',
            'shipping_amount',
            'subtotal_incl_tax',
            'shipping_incl_tax',
            'quote_currency_code',
            'shipping_tax_amount',
            'subtotal_with_discount',
            'shipping_discount_amount',
            this._getTotalItemField()
        ];
    }

    _getTotalsField(): Field<'totals', GQLPaymentTotals> {
        return new Field('totals')
            .addFieldList(this._getTotalsFields());
    }

    _getCartField(): Field<'cart', GQLCart> {
        return new Field<'cart', GQLCart>('cart')
            .addFieldList(this._getCartFieldList());
    }

    _getCartFieldList(): string[] {
        return [
            'id'
        ];
    }
}

export default new CheckoutQuery();
