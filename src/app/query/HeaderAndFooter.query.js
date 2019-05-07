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
 * HeaderAndFooter Mutations
 * @class HeaderAndFooter
 */
class HeaderAndFooter {
    getCountriesList() {
        const countries = new Field('countries')
            .addField(this.getAvalaibleRegions())
            .addField('id')
            .addField('full_name_locale');

        return countries;
    }

    getAvalaibleRegions() {
        const available_regions = new Field('available_regions')
            .addField('code')
            .addField('name')
            .addField('id');

        return available_regions;
    }
}

export default new HeaderAndFooter();
