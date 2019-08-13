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

import { Field } from 'Util/Query';
import { isSignedIn } from 'Util/Auth';

export class Checkout {
    getEstimateShippingCosts(address, guestCartId) {
        const mutation = new Field('estimateShippingCosts')
            .addArgument('address', 'EstimateShippingCostsAddress!', address)
            .addFieldList(this._getEstimatedShippingFields());

        this._addGuestCartId(guestCartId, mutation);

        return mutation;
    }

    getSaveAddressInformation(addressInformation, guestCartId) {
        const mutation = new Field('saveAddressInformation')
            .addArgument('addressInformation', 'SaveAddressInformation!', addressInformation)
            .addField(this._getPaymentMethodsField())
            .addField(this._getTotalsField());

        this._addGuestCartId(guestCartId, mutation);

        return mutation;
    }

    getSavePaymentInformationAndPlaceOrder(paymentInformation, guestCartId) {
        const mutation = new Field('savePaymentInformationAndPlaceOrder')
            .addArgument('paymentInformation', 'PaymentInformation!', paymentInformation)
            .addField('orderID');

        this._addGuestCartId(guestCartId, mutation);

        return mutation;
    }

    _addGuestCartId(guestCartId, mutation) {
        if (guestCartId && !isSignedIn()) mutation.addArgument('guestCartId', 'String!', guestCartId);
    }

    _getEstimatedShippingFields() {
        return [
            'carrier_code',
            'method_code',
            'carrier_title',
            'method_title',
            'error_message',
            'amount',
            'base_amount',
            'price_excl_tax',
            'price_incl_tax',
            'available'
        ];
    }

    _getPaymentMethodsField() {
        return new Field('payment_methods')
            .addFieldList(this._getPaymentMethodFields());
    }

    _getPaymentMethodFields() {
        return ['code', 'title'];
    }

    _getTotalItemFields() {
        return [
            'item_id', 'price', 'base_price', 'qty', 'row_total',
            'base_row_total', 'row_total_with_discount', 'tax_amount',
            'base_tax_amount', 'tax_percent', 'discount_amount',
            'base_discount_amount', 'discount_percent', 'price_incl_tax',
            'base_price_incl_tax', 'row_total_incl_tax', 'base_row_total_incl_tax',
            'options', 'weee_tax_applied_amount', 'weee_tax_applied', 'name'
        ];
    }

    _getTotalItemField() {
        return new Field('items')
            .addFieldList(this._getTotalItemFields());
    }

    _getTotalsFields() {
        return [
            'grand_total', 'base_grand_total', 'subtotal', 'base_subtotal',
            'discount_amount', 'base_discount_amount', 'subtotal_with_discount',
            'base_subtotal_with_discount', 'shipping_amount', 'base_shipping_amount',
            'shipping_discount_amount', 'base_shipping_discount_amount', 'tax_amount',
            'base_tax_amount', 'weee_tax_applied_amount', 'shipping_tax_amount',
            'base_shipping_tax_amount', 'subtotal_incl_tax', 'shipping_incl_tax',
            'base_shipping_incl_tax', 'base_currency_code', 'quote_currency_code',
            this._getTotalItemField()
        ];
    }

    _getTotalsField() {
        return new Field('totals')
            .addFieldList(this._getTotalsFields());
    }
}

export default new Checkout();
