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
 * RegionQuery Mutations
 * @class RegionQuery
 */
class RegionQuery {
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

export { RegionQuery };

export default new RegionQuery();
