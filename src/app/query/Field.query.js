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
 * FieldQuery Mutations
 * @class FieldQuery
 */
class FieldQuery {
    getCountryList() {
        const countries = new Field('countries')
            .addField('id')
            .addField('two_letter_abbreviation')
            .addField('full_name_locale')
            .addField('available_regions');

        return countries;
    }
}

export default new FieldQuery();
