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

    getCheckoutAgreements() {
        return new Field('checkoutAgreements')
            .addFieldList(this._getCheckoutAgreementFields());
    }

    _getCheckoutAgreementFields() {
        return [
            'agreement_id',
            'checkbox_text',
            'content',
            'content_height',
            'is_html',
            'mode',
            'name'
        ];
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
                'default_display_currency_code',
                'default_keywords',
                'default_title',
                'default_country',
                'secure_base_media_url',
                'paypal_sandbox_flag',
                'paypal_client_id',
                'logo_alt',
                'terms_are_enabled'
            ]);
    }
}

export default new ConfigQuery();
