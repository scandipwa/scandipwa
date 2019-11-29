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

export class ConfigQuery {
    getStoreListField() {
        return new Field('storeList')
            .addFieldList(this._getStoreListFields());
    }

    _getStoreListFields() {
        return [
            'name',
            'is_active',
            'base_url',
            'code'
        ];
    }

    getQuery() {
        return new Field('storeConfig')
            .addFieldList([
                'code',
                'is_active',
                'cms_home_page',
                'cms_no_route',
                'copyright',
                'timezone',
                'header_logo_src',
                'timezone',
                'title_prefix',
                'title_suffix',
                'base_currency_code',
                'default_keywords',
                'default_title',
                'secure_base_media_url',
                'paypal_sandbox_flag',
                'paypal_client_id',
                'stripe_mode',
                'stripe_live_pk',
                'stripe_test_pk',
                'logo_alt'
            ]);
    }
}

export default new ConfigQuery();
