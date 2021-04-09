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
 * @namespace Query/Order
 */
export class OrderQuery {
    getOrderListQuery() {
        return new Field('getOrderList')
            .addFieldList(this._getOrderListFields(true));
    }

    getDownloadableQuery() {
        return new Field('customerDownloadableProducts')
            .addField(this._getDownloadableField());
    }

    getOrderByIdQuery(orderId) {
        return this._getOrderByIdField(orderId);
    }

    linkOrderMutation(customerEmail) {
        return new Field('linkOrder')
            .addArgument('customer_email', 'String!', customerEmail);
    }

    _getOrderListFields(isList) {
        return [
            this._getOrderItemsField(isList)
        ];
    }

    _getOrderByIdField(orderId) {
        return new Field('getOrderById')
            .addArgument('id', 'Int!', orderId)
            .addFieldList(this._getOrderItemsFields());
    }

    _getOrderProductsField() {
        return new Field('order_products')
            .addFieldList(this._getOrderProductsFields());
    }

    _getOrderProductsFields() {
        return [
            ...this._getDefaultFields(),
            ...this._prepareImageFields(),
            this._prepareAttributes()
        ];
    }

    _prepareImageFields() {
        return [
            new Field('thumbnail')
                .addFieldList(this._prepareThumbnailFields()),
            new Field('small_image')
                .addFieldList(this._prepareSmallImageFields())
        ];
    }

    _prepareSmallImageFields() {
        return [
            'url',
            'label',
            'path'
        ];
    }

    _prepareThumbnailFields() {
        return [
            'url',
            'label',
            'path'
        ];
    }

    _prepareAttributes() {
        return new Field('s_attributes')
            .setAlias('attributes')
            .addFieldList(this._prepareAttributesFields());
    }

    _prepareAttributesFields() {
        return [
            'attribute_value',
            'attribute_code',
            'attribute_type',
            'attribute_label',
            this._getAttributeOptions()
        ];
    }

    _getAttributeOptions() {
        return new Field('attribute_options')
            .addFieldList(this._getAttributeOptionsFields());
    }

    _getAttributeOptionsFields() {
        return [
            'label',
            'value',
            new Field('swatch_data')
                .addField('value')
        ];
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
            .addFieldList(this._prepareShippingInfoFields());
    }

    _prepareShippingInfoFields() {
        return [
            'shipping_method',
            'shipping_description',
            'shipping_incl_tax',
            'shipping_amount',
            'tracking_numbers',
            this._prepareOrderCustomerAddressInfo()
        ];
    }

    _prepareOrderCustomerAddressInfo() {
        return new Field('shipping_address')
            .addFieldList(this._prepareOrderCustomerAddressInfoFields());
    }

    _prepareOrderCustomerAddressInfoFields() {
        return [
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
        ];
    }

    _getBaseOrderInfoField(isList) {
        return new Field('base_order_info')
            .addFieldList(this._getBaseOrderInfoFields(isList));
    }

    _getBaseOrderInfoFields(isList) {
        return [
            'id',
            'increment_id',
            'created_at',
            'status_label',
            'grand_total',
            'currency_code',
            ...(isList ? [] : ['sub_total'])
        ];
    }

    _getPaymentInfoField() {
        return new Field('payment_info')
            .addFieldList(this._getPaymentInfoFields());
    }

    _getPaymentInfoFields() {
        return [
            'method',
            this._getAdditionalInformationField()
        ];
    }

    _getAdditionalInformationField() {
        return new Field('additional_information')
            .addFieldList(this._getAdditionalInformationFields());
    }

    _getAdditionalInformationFields() {
        return [
            'bank',
            'method_title',
            'credit_type',
            'month',
            this._getCustomerInfoField()
        ];
    }

    _getCustomerInfoField() {
        return new Field('customer_info')
            .addFieldList(this._getCustomerInfoFields());
    }

    _getCustomerInfoFields() {
        return [
            'first_name',
            'last_name',
            'phone'
        ];
    }

    _getOrderItemsField(isList) {
        return new Field('items')
            .addFieldList(this._getOrderItemsFields(isList));
    }

    _getOrderItemsFields(isList) {
        return [
            this._getBaseOrderInfoField(isList),
            ...(!isList ? [
                this._getPaymentInfoField(),
                this._prepareShippingInfo(),
                this._getOrderProductsField()
            ] : [])
        ];
    }

    _getDownloadableField() {
        return new Field('items')
            .addFieldList(this._getDownloadableFields());
    }

    _getDownloadableFields() {
        return [
            'order_increment_id',
            'date',
            'status',
            'download_url',
            'link_title',
            'remaining_downloads',
            'title'
        ];
    }
}

export default new OrderQuery();
