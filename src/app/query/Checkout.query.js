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
        if (guestCartId && !isSignedIn()) mutation.addArgument('guestCartId', 'String!', guestCartId);
    }

    _getTotalsField() {
        const items = new Field('items')
            .addFieldList([
                'item_id', 'price', 'base_price', 'qty', 'row_total',
                'base_row_total', 'row_total_with_discount', 'tax_amount',
                'base_tax_amount', 'tax_percent', 'discount_amount',
                'base_discount_amount', 'discount_percent', 'price_incl_tax',
                'base_price_incl_tax', 'row_total_incl_tax', 'base_row_total_incl_tax',
                'options', 'weee_tax_applied_amount', 'weee_tax_applied', 'name'
            ]);

        return new Field('totals')
            .addField(items)
            .addFieldList([
                'grand_total', 'base_grand_total', 'subtotal', 'base_subtotal',
                'discount_amount', 'base_discount_amount', 'subtotal_with_discount',
                'base_subtotal_with_discount', 'shipping_amount', 'base_shipping_amount',
                'shipping_discount_amount', 'base_shipping_discount_amount', 'tax_amount',
                'base_tax_amount', 'weee_tax_applied_amount', 'shipping_tax_amount',
                'base_shipping_tax_amount', 'subtotal_incl_tax', 'shipping_incl_tax',
                'base_shipping_incl_tax', 'base_currency_code', 'quote_currency_code'
            ]);
    }
}

export { Checkout };

export default new Checkout();
