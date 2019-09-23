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
import { OrderProductQuery } from 'Query';

/**
 * Order Query
 * @class OrderQuery
 */
export class OrderQuery {
    getOrderListQuery() {
        const orderListItems = this._prepareBaseOrderInfo();

        return new Field('getOrderList')
            .addField(orderListItems);
    }

    getOrderByIdQuery(orderId) {
        const query = new Field('getOrderById');

        this._getOrderItemField(query);

        const baseOrderInfo = this._prepareExpandedOrderInfo();
        const paymentInfo = this._preparePaymentInfo();
        const shippingInfo = this._prepareShippingInfo();

        query
            .addField(baseOrderInfo)
            .addField(paymentInfo)
            .addField(shippingInfo);

        query.addArgument('id', 'Int', orderId);

        return query;
    }

    _getOrderItemField(field) {
        field.addField(OrderProductQuery._prepareItemsField(
            new Field('order_products')
        ));
    }

    _prepareShippingInfo() {
        const orderCustomerAddressInfo = this._prepareOrderCustomerAddressInfo();

        return new Field('shipping_info')
            .addField('shipping_method')
            .addField(orderCustomerAddressInfo)
            .addField('shipping_description')
            .addField('shipping_amount')
            .addField('tracking_numbers');
    }

    _prepareOrderCustomerAddressInfo() {
        return new Field('shipping_address')
            .addField('city')
            .addField('company')
            .addField('firstname')
            .addField('lastname')
            .addField('middlename')
            .addField('telephone')
            .addField('district')
            .addField('house_number')
            .addField('apartment_number')
            .addField('postomat_code')
            .addField('store_pickup_code')
            .addField('post_office_code')
            .addField('postcode')
            .addField('street')
            .addField('is_b2b')
            .addField('region')
            .addField('organizationname')
            .addField('organizationbin')
            .addField('organizationaddress')
            .addField('organizationiic')
            .addField('organizationbik');
    }

    _prepareExpandedOrderInfo() {
        return new Field('base_order_info')
            .addField('id')
            .addField('increment_id')
            .addField('created_at')
            .addField('status')
            .addField('status_label')
            .addField('grand_total')
            .addField('sub_total')
            .addField('total_qty_ordered');
    }

    _preparePaymentInfo() {
        const additionalCustomerInfo = this._prepareAdditionalCustomerInfo();

        return new Field('payment_info')
            .addField('method')
            .addField(additionalCustomerInfo);
    }

    _prepareAdditionalCustomerInfo() {
        const creditCustomerInfo = this._prepareCreditCustomerInfo();

        return new Field('additional_information')
            .addField('bank')
            .addField('method_title')
            .addField('credit_type')
            .addField('month')
            .addField(creditCustomerInfo);
    }

    _prepareCreditCustomerInfo() {
        return new Field('customer_info')
            .addField('first_name')
            .addField('last_name')
            .addField('middle_name')
            .addField('iin_number')
            .addField('phone');
    }

    _prepareBaseOrderInfo() {
        const baseOrderInfo = this._prepareExpandedOrderInfo();
        const paymentInfo = this._preparePaymentInfo();
        const shippingInfo = this._prepareShippingInfo();

        return new Field('items')
            .addField(baseOrderInfo)
            .addField(paymentInfo)
            .addField(shippingInfo);
    }
}

export default new OrderQuery();
