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

class OrderProduct {
    _prepareImageFields() {
        const images = [
            new Field('thumbnail').addField('url').addField('label').addField('path'),
            new Field('small_image').addField('url').addField('label').addField('path')
        ];

        return images;
    }

    _prepareAttributes() {
        const attributes = new Field('attributes')
            .addField('attribute_value')
            .addField('attribute_code')
            .addField('attribute_type')
            .addField('attribute_label')
            .addField(
                new Field('attribute_options')
                    .addField('label')
                    .addField('value')
                    .addField(
                        new Field('swatch_data')
                            .addField('value')
                    )
            )
            .addField('is_comparable');

        return attributes;
    }

    _prepareItemsField(items) {
        const images = this._prepareImageFields();
        const attributes = this._prepareAttributes();

        // default fields for all queries
        const defaultFields = [
            'id',
            'name',
            (new Field('short_description').addField('html')),
            'sku',
            'qty',
            'row_total',
            'original_price',
            'license_key'
        ];

        return items
            .addFieldList(defaultFields)
            .addFieldList(images)
            .addField(attributes);
    }
}

export default new OrderProduct();
