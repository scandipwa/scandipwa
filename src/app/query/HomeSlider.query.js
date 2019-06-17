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
 * Home Slider Query
 * @class HomeSlider
 */
class HomeSlider {
    /**
     * get Home Slider query
     * @param  {{sliderId: String}} options A object containing different aspects of query, each item can be omitted
     * @return {Field} Home Slider query
     * @memberof HomeSlider
     */
    getQuery(options) {
        const { sliderId } = options;

        const items = new Field('slides')
            .addFieldList([
                'slide_id', 'image', 'slide_text'
            ]);

        return new Field('scandiwebSlider')
            .addArgument('id', 'ID!', sliderId)
            .addFieldList(['slider_id'])
            .addField(items)
            .setAlias('slider');
    }
}

export { HomeSlider };

export default new HomeSlider();
