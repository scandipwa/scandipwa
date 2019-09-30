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

/**
 * Order Query
 * @class OrderQuery
 */
export class OrderQuery {
    getOrderListQuery() {
        return new Field('getOrderList')
            .addField(this._prepareBaseOrderInfo());
    }

    getOrderByIdQuery(orderId) {
        return this._getOrderByIdFields(orderId);
    }

    _getOrderByIdFields(orderId) {
        return new Field('getOrderById')
            .addArgument('id', 'Int', orderId)
            .addFieldList([
                this._prepareExpandedOrderInfo(),
                this._preparePaymentInfo(),
                this._prepareShippingInfo(),
                this._getOrderProductsField()
            ]);
    }

    _getOrderProductsField() {
        return new Field('order_products')
            .addFieldList([
                this._getDefaultFields(),
                this._prepareImageFields(),
                this._prepareAttributes()
            ]);
    }

    _prepareImageFields() {
        return [
            new Field('thumbnail')
                .addFieldList([
                    'url',
                    'label',
                    'path'
                ]),
            new Field('small_image')
                .addFieldList([
                    'url',
                    'label',
                    'path'
                ])
        ];
    }

    _prepareAttributes() {
        return new Field('attributes')
            .addFieldList([
                'attribute_value',
                'attribute_code',
                'attribute_type',
                'attribute_label',
                this._getAttributeOptions()
            ]);
    }

    _getAttributeOptions() {
        new Field('attribute_options')
            .addFieldList([
                'label',
                'value',
                new Field('swatch_data')
                    .addField('value')
            ]);
    }

    _getDefaultFields() {
        return [
            'id',
            'name',
            (new Field('short_description').addField('html')),
            'sku',
            'qty',
            'row_total',
            'original_price',
            'license_key'
        ];
    }

    _prepareShippingInfo() {
        return new Field('shipping_info')
            .addFieldList([
                'shipping_method',
                'shipping_description',
                'shipping_amount',
                'tracking_numbers',
                this._prepareOrderCustomerAddressInfo()
            ]);
    }

    _prepareOrderCustomerAddressInfo() {
        return new Field('shipping_address')
            .addFieldList([
                'city',
                'company',
                'firstname',
                'lastname',
                'middlename',
                'telephone',
                'district',
                'house_number',
                'apartment_number',
                'postomat_code',
                'store_pickup_code',
                'post_office_code',
                'postcode',
                'street',
                'is_b2b',
                'region',
                'organizationname',
                'organizationbin',
                'organizationaddress',
                'organizationiic',
                'organizationbik'
            ]);
    }

    _prepareExpandedOrderInfo() {
        return new Field('base_order_info')
            .addFieldList([
                'id',
                'increment_id',
                'created_at',
                'status',
                'status_label',
                'grand_total',
                'sub_total',
                'total_qty_ordered'
            ]);
    }

    _preparePaymentInfo() {
        return new Field('payment_info')
            .addFieldList([
                'method',
                this._prepareAdditionalCustomerInfo()
            ]);
    }

    _prepareAdditionalCustomerInfo() {
        return new Field('additional_information')
            .addFieldList([
                'bank',
                'method_title',
                'credit_type',
                'month',
                this._prepareCreditCustomerInfo()
            ]);
    }

    _prepareCreditCustomerInfo() {
        return new Field('customer_info')
            .addFieldList([
                'first_name',
                'last_name',
                'middle_name',
                'iin_number',
                'phone'
            ]);
    }

    _prepareBaseOrderInfo() {
        return new Field('items')
            .addFieldList([
                this._prepareExpandedOrderInfo(),
                this._preparePaymentInfo(),
                this._prepareShippingInfo()
            ]);
    }
}

export default new OrderQuery();
