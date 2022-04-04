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

import { Field, Mutation, Query } from '@tilework/opus';

import {
    GQLCheckoutAgreement,
    GQLCurrency,
    GQLCurrencyConfig, GQLPriceTaxDisplay, GQLQuery, GQLStoreConfig
} from 'Type/Graphql.type';

import { CommonField } from './Query.type';

/** @namespace Query/Config/Query */
export class ConfigQuery {
    getStoreListField(): Query<'storeList', GQLStoreConfig, true> {
        return new Query<'storeList', GQLStoreConfig, true>('storeList', true)
            .addFieldList(this._getStoreListFields());
    }

    getCheckoutAgreements(): Query<'checkoutAgreements', GQLCheckoutAgreement, true> {
        return new Query<'checkoutAgreements', GQLCheckoutAgreement, true>('checkoutAgreements', true)
            .addFieldList(this._getCheckoutAgreementFields());
    }

    getCurrencyField(): Query<'available_currencies_data', { id: string; label: string; value: string }, true> {
        return new Query<'available_currencies_data', GQLCurrency, true>('available_currencies_data', true)
            .addFieldList([
                'id',
                'label',
                'value'
            ]);
    }

    getCurrencyData(): Query<'currencyData', GQLCurrencyConfig> {
        return new Query<'currencyData', GQLCurrencyConfig>('currencyData')
            .addFieldList([
                this.getCurrencyField(),
                'current_currency_code'
            ]);
    }

    _getPriceDisplayTypeField(): Field<'priceTaxDisplay', GQLPriceTaxDisplay & {
        product_price_display_type: string;
        shipping_price_display_type: string;
    }> {
        return new Field<'priceTaxDisplay', GQLPriceTaxDisplay>('priceTaxDisplay')
            .addFieldList([
                'product_price_display_type',
                'shipping_price_display_type'
            ]);
    }

    getSaveSelectedCurrencyMutation(newCurrency: string): Mutation<'saveSelectedCurrency', GQLQuery> {
        return new Mutation<'saveSelectedCurrency', GQLQuery>('saveSelectedCurrency')
            .addArgument('currency', 'String', newCurrency)
            .addFieldList([
                this.getCurrencyData()
            ]);
    }

    _getCheckoutAgreementFields(): string[] {
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

    _getStoreListFields(): string[] {
        return [
            'name',
            'is_active',
            'base_url',
            'base_link_url',
            'code'
        ];
    }

    getQuery(): Field<'storeConfig', GQLStoreConfig> {
        return new Field('storeConfig')
            .addFieldList(this._getStoreConfigFields());
    }

    _getTimeDateFormatFields(): string[] {
        return [
            'use_calendar',
            'year_range',
            'date_fields_order',
            'time_format'
        ];
    }

    _getStoreConfigFields(): CommonField[] {
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
            'default_description',
            'default_country',
            'downloadable_links_target_new_window',
            'secure_base_media_url',
            'logo_alt',
            'logo_height',
            'logo_width',
            'cookie_text',
            'cookie_link',
            'terms_are_enabled',
            'address_lines_quantity',
            'base_url',
            'pagination_frame',
            'pagination_frame_skip',
            'anchor_text_for_previous',
            'anchor_text_for_next',
            'reviews_are_enabled',
            'reviews_allow_guest',
            'wishlist_general_active',
            'demo_notice',
            'guest_checkout',
            'is_email_confirmation_required',
            'display_product_stock_status',
            'base_link_url',
            'show_vat_number_on_storefront',
            'show_tax_vat_number',
            'product_use_categories',
            'category_url_suffix',
            'cookie_lifetime',
            'plp_list_mode',
            'layered_navigation_product_count_enabled',
            'region_display_all',
            'redirect_dashboard',
            'product_alert_allow_price',
            'product_alert_allow_stock',
            'newsletter_general_active',
            'newsletter_subscription_allow_guest_subscribe',
            'newsletter_subscription_confirm',
            'delivery_instore_active',
            'access_token_lifetime',
            'is_allowed_reorder',
            'rss_order_subscribe_allow',
            'downloadable_disable_guest_checkout',
            'minimun_password_length',
            'required_character_classes_number',
            ...this._getTimeDateFormatFields(),
            this._getPriceDisplayTypeField()
        ];
    }
}

export default new ConfigQuery();
