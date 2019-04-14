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

class Checkout {
    getEstimateShippingCosts(address, guestCartId) {
        const mutation = new Field('estimateShippingCosts')
            .addArgument('address', 'EstimateShippingCostsAddress!', address)
            .addField('carrier_code')
            .addField('method_code')
            .addField('carrier_title')
            .addField('method_title')
            .addField('error_message')
            .addField('amount')
            .addField('base_amount')
            .addField('price_excl_tax')
            .addField('price_incl_tax')
            .addField('available');

        this._addGuestCartId(guestCartId, mutation);

        return mutation;
    }

    getSaveAddressInformation(addressInformation, guestCartId) {
        const paymentMethods = new Field('payment_methods')
            .addField('code')
            .addField('title');

        const mutation = new Field('saveAddressInformation')
            .addArgument('addressInformation', 'SaveAddressInformation!', addressInformation)
            .addField(paymentMethods)
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
        if (guestCartId) mutation.addArgument('guestCartId', 'String!', guestCartId);
    }

    _getTotalsField() {
        const items = new Field('items')
            .addField('item_id')
            .addField('price')
            .addField('base_price')
            .addField('qty')
            .addField('row_total')
            .addField('base_row_total')
            .addField('row_total_with_discount')
            .addField('tax_amount')
            .addField('base_tax_amount')
            .addField('tax_percent')
            .addField('discount_amount')
            .addField('base_discount_amount')
            .addField('discount_percent')
            .addField('price_incl_tax')
            .addField('base_price_incl_tax')
            .addField('row_total_incl_tax')
            .addField('base_row_total_incl_tax')
            .addField('options')
            .addField('weee_tax_applied_amount')
            .addField('weee_tax_applied')
            .addField('name');

        return new Field('totals')
            .addField(items)
            .addField('grand_total')
            .addField('base_grand_total')
            .addField('subtotal')
            .addField('base_subtotal')
            .addField('discount_amount')
            .addField('base_discount_amount')
            .addField('subtotal_with_discount')
            .addField('base_subtotal_with_discount')
            .addField('shipping_amount')
            .addField('base_shipping_amount')
            .addField('shipping_discount_amount')
            .addField('base_shipping_discount_amount')
            .addField('tax_amount')
            .addField('base_tax_amount')
            .addField('weee_tax_applied_amount')
            .addField('shipping_tax_amount')
            .addField('base_shipping_tax_amount')
            .addField('subtotal_incl_tax')
            .addField('shipping_incl_tax')
            .addField('base_shipping_incl_tax')
            .addField('base_currency_code')
            .addField('quote_currency_code');
    }
}

export default new Checkout();
