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

/** @namespace Query/Config */
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
            'base_link_url',
            'code'
        ];
    }

    getQuery() {
        return new Field('storeConfig')
            .addFieldList(this._getStoreConfigFields());
    }

    _getStoreConfigFields() {
        return [
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
            // 'paypal_sandbox_flag',
            // 'paypal_client_id',
            'logo_alt',
            'cookie_text',
            'cookie_link',
            'terms_are_enabled',
            'base_url',
            'pagination_frame',
            'pagination_frame_skip',
            'anchor_text_for_previous',
            'anchor_text_for_next',
            'reviews_are_enabled',
            'reviews_allow_guest',
            'demo_notice',
            'guest_checkout',
            'is_email_confirmation_required',
            'base_link_url'
        ];
    }
}

export default new ConfigQuery();
