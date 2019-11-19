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

class CompareProductQuery {
    _prepareItemsPriceField() {
        const amount = new Field('amount').addFieldList(['value', 'currency']);
        const regularPrice = new Field('regularPrice').addField(amount);
        const minimalPrice = new Field('minimalPrice').addField(amount);

        return new Field('price').addFieldList([regularPrice, minimalPrice]);
    }

    _prepareImageFields() {
        return new Field('thumbnail')
            .addField('url')
            .addField('label')
            .addField('path');
    }

    prepareAttributes() {
        const comparableAttributes = new Field('attributes')
            .addField('attribute_value')
            .addField('attribute_code')
            .addField('attribute_type')
            .addField('attribute_label')
            .addField(this.prepareAttributeOptions());

        return comparableAttributes;
    }

    prepareComparableAttributes() {
        const comparableAttributes = new Field('comparableAttributes')
            .addField('attribute_value')
            .addField('attribute_code')
            .addField('attribute_type')
            .addField('attribute_label')
            .addField(this.prepareAttributeOptions());

        return comparableAttributes;
    }

    prepareAttributeOptions() {
        const attributeOptions = new Field('attribute_options')
            .addField('label')
            .addField('value')
            .addField(
                new Field('swatch_data')
                    .addField('type')
                    .addField('value')
            );

        return attributeOptions;
    }

    _prepareItemsField(items) {
        const price = this._prepareItemsPriceField();
        const images = this._prepareImageFields();
        const comparableAttributes = this.prepareComparableAttributes();
        const attributes = this.prepareAttributes();

        const defaultFields = [
            'id',
            'name',
            (new Field('short_description').addField('html')),
            'url_key',
            'parent_url_key',
            'sku'
        ];

        return items
            .addFieldList(defaultFields)
            .addField(price)
            .addField(images)
            .addField(comparableAttributes)
            .addField(attributes);
    }
}

export default new CompareProductQuery();
