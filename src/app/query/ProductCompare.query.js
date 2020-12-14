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

import { ProductListQuery } from 'Query/ProductList.query';
import { Field } from 'Util/Query';

/** @namespace Query/ProductCompare */
export class ProductCompareQuery extends ProductListQuery {
    getQuery(guestCartId = null) {
        const field = new Field('compareProducts');

        if (guestCartId) {
            field.addArgument('guestCartId', 'String', guestCartId);
        }

        return field.addFieldList(this._getQueryFields());
    }

    getAddProductToCompareMutation(productId, guestCartId = null) {
        const field = new Field('addProductToCompare')
            .addArgument('product_id', 'Int!', productId);

        if (guestCartId) {
            field.addArgument('guestCartId', 'String', guestCartId);
        }

        return field;
    }

    getRemoveComparedProductMutation(productId, guestCartId = null) {
        const field = new Field('removeComparedProduct')
            .addArgument('product_id', 'Int!', productId);

        if (guestCartId) {
            field.addArgument('guestCartId', 'String', guestCartId);
        }

        return field;
    }

    getClearComparedProductsMutation(guestCartId = null) {
        const field = new Field('clearComparedProducts');

        if (guestCartId) {
            field.addArgument('guestCartId', 'String', guestCartId);
        }

        return field;
    }

    _getQueryFields() {
        return [
            'count',
            this._getProductsField()
        ];
    }

    _getProductsField() {
        return new Field('products')
            .addFieldList(this._getProductsFields());
    }

    _getProductsFields() {
        return [
            'id',
            'name',
            'sku',
            'url',
            'type_id',
            this._getProductThumbnailField(),
            this._getPriceRangeField(),
            this._getComparableAttributesField(),
            this._getConfigurableProductFragment(),
            this._getGroupedProductItems(),
            this._getCustomizableProductFragment()
        ];
    }

    _getComparableAttributesField() {
        return new Field('comparableAttributes')
            .addFieldList(this._getComparableAttributesFields());
    }

    _getComparableAttributesFields() {
        return [
            'attribute_id',
            'attribute_label',
            'attribute_value'
        ];
    }

    _getConfigurableOptionFields() {
        return [
            'attribute_code',
            'label',
            this._getValuesField()
        ];
    }

    _getValueFields() {
        return [
            'label'
        ];
    }
}

export default new ProductCompareQuery();
