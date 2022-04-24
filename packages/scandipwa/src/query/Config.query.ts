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

import { GQLCheckoutAgreementMode } from 'Type/Graphql.type';

import {
    CheckoutAgreement,
    Currency,
    CurrencyConfig,
    PriceTaxDisplay,
    StoreConfig,
    StoreConfigFields,
    StoreItem
} from './Config.type';

/** @namespace Query/Config/Query */
export class ConfigQuery {
    getStoreListField(): Query<'storeList', StoreItem, true> {
        return new Query<'storeList', StoreItem, true>('storeList', true)
            .addFieldList(this._getStoreListFields());
    }

    getCheckoutAgreements(): Query<'checkoutAgreements', CheckoutAgreement, true> {
        return new Query<'checkoutAgreements', CheckoutAgreement, true>('checkoutAgreements', true)
            .addFieldList(this._getCheckoutAgreementFields());
    }

    getCurrencyField(): Field<'available_currencies_data', Currency, true> {
        return new Field<'available_currencies_data', Currency, true>('available_currencies_data', true)
            .addFieldList([
                new Field<'id', string>('id'),
                new Field<'label', string>('label'),
                new Field<'value', string>('value')
            ]);
    }

    getCurrencyData(): Query<'currencyData', CurrencyConfig> {
        return new Query<'currencyData', CurrencyConfig>('currencyData')
            .addFieldList([
                this.getCurrencyField(),
                new Field<'current_currency_code', string>('current_currency_code')
            ]);
    }

    _getPriceDisplayTypeField(): Field<'priceTaxDisplay', PriceTaxDisplay> {
        return new Field<'priceTaxDisplay', PriceTaxDisplay>('priceTaxDisplay')
            .addFieldList([
                new Field<'product_price_display_type', string>('product_price_display_type'),
                new Field<'shipping_price_display_type', string>('shipping_price_display_type')
            ]);
    }

    getSaveSelectedCurrencyMutation(newCurrency: string): Mutation<'saveSelectedCurrency', {
        currencyData: CurrencyConfig;
    }> {
        return new Mutation<'saveSelectedCurrency', {
            currencyData: CurrencyConfig;
        }>('saveSelectedCurrency')
            .addArgument('currency', 'String', newCurrency)
            .addFieldList([
                this._getCurrencyDataField()
            ]);
    }

    _getCurrencyDataField(): Field<'currencyData', CurrencyConfig> {
        return new Field<'currencyData', CurrencyConfig>('currencyData')
            .addFieldList([
                this.getCurrencyField(),
                new Field<'current_currency_code', string>('current_currency_code')
            ]);
    }

    _getCheckoutAgreementFields(): Array<
    Field<'agreement_id', number>
    | Field<'checkbox_text', string>
    | Field<'content', string>
    | Field<'content_height', number>
    | Field<'is_html', boolean>
    | Field<'mode', GQLCheckoutAgreementMode>
    | Field<'name', string>
    > {
        return [
            new Field<'agreement_id', number>('agreement_id'),
            new Field<'checkbox_text', string>('checkbox_text'),
            new Field<'content', string>('content'),
            new Field<'content_height', number>('content_height'),
            new Field<'is_html', boolean>('is_html'),
            new Field<'mode', GQLCheckoutAgreementMode>('mode'),
            new Field<'name', string>('name')
        ];
    }

    _getStoreListFields(): Array<
    Field<'name', string>
    | Field<'is_active', boolean>
    | Field<'base_url', string>
    | Field<'base_link_url', string>
    | Field<'code', string>
    > {
        return [
            new Field<'name', string>('name'),
            new Field<'is_active', boolean>('is_active'),
            new Field<'base_url', string>('base_url'),
            new Field<'base_link_url', string>('base_link_url'),
            new Field<'code', string>('code')
        ];
    }

    getQuery(): Query<'storeConfig', StoreConfig> {
        return new Query<'storeConfig', StoreConfig>('storeConfig')
            .addFieldList(this._getStoreConfigFields());
    }

    _getTimeDateFormatFields(): Array<
    Field<'use_calendar', boolean>
    | Field<'year_range', string>
    | Field<'date_fields_order', string>
    | Field<'time_format', string>
    > {
        return [
            new Field<'use_calendar', boolean>('use_calendar'),
            new Field<'year_range', string>('year_range'),
            new Field<'date_fields_order', string>('date_fields_order'),
            new Field<'time_format', string>('time_format')
        ];
    }

    _getStoreConfigFields(): StoreConfigFields {
        return [
            new Field<'code', string>('code'),
            new Field<'is_active', boolean>('is_active'),
            new Field<'cms_home_page', string>('cms_home_page'),
            new Field<'cms_no_route', string>('cms_no_route'),
            new Field<'copyright', string>('copyright'),
            new Field<'timezone', string>('timezone'),
            new Field<'header_logo_src', string>('header_logo_src'),
            new Field<'title_prefix', string>('title_prefix'),
            new Field<'title_suffix', string>('title_suffix'),
            new Field<'default_display_currency_code', string>('default_display_currency_code'),
            new Field<'default_keywords', string>('default_keywords'),
            new Field<'default_title', string>('default_title'),
            new Field<'default_description', string>('default_description'),
            new Field<'default_country', string>('default_country'),
            new Field<'downloadable_links_target_new_window', boolean>('downloadable_links_target_new_window'),
            new Field<'secure_base_media_url', string>('secure_base_media_url'),
            new Field<'logo_alt', string>('logo_alt'),
            new Field<'logo_height', number>('logo_height'),
            new Field<'logo_width', number>('logo_width'),
            new Field<'cookie_text', string>('cookie_text'),
            new Field<'cookie_link', string>('cookie_link'),
            new Field<'terms_are_enabled', boolean>('terms_are_enabled'),
            new Field<'address_lines_quantity', number>('address_lines_quantity'),
            new Field<'base_url', string>('base_url'),
            new Field<'pagination_frame', number>('pagination_frame'),
            new Field<'pagination_frame_skip', number>('pagination_frame_skip'),
            new Field<'anchor_text_for_previous', string>('anchor_text_for_previous'),
            new Field<'anchor_text_for_next', string>('anchor_text_for_next'),
            new Field<'reviews_are_enabled', boolean>('reviews_are_enabled'),
            new Field<'reviews_allow_guest', boolean>('reviews_allow_guest'),
            new Field<'wishlist_general_active', boolean>('wishlist_general_active'),
            new Field<'demo_notice', boolean>('demo_notice'),
            new Field<'guest_checkout', boolean>('guest_checkout'),
            new Field<'is_email_confirmation_required', boolean>('is_email_confirmation_required'),
            new Field<'display_product_stock_status', boolean>('display_product_stock_status'),
            new Field<'base_link_url', string>('base_link_url'),
            new Field<'show_vat_number_on_storefront', boolean>('show_vat_number_on_storefront'),
            new Field<'show_tax_vat_number', boolean>('show_tax_vat_number'),
            new Field<'product_use_categories', boolean>('product_use_categories'),
            new Field<'category_url_suffix', string>('category_url_suffix'),
            new Field<'cookie_lifetime', string>('cookie_lifetime'),
            new Field<'plp_list_mode', string>('plp_list_mode'),
            new Field<'layered_navigation_product_count_enabled', boolean>('layered_navigation_product_count_enabled'),
            new Field<'region_display_all', boolean>('region_display_all'),
            new Field<'redirect_dashboard', boolean>('redirect_dashboard'),
            new Field<'product_alert_allow_price', boolean>('product_alert_allow_price'),
            new Field<'product_alert_allow_stock', boolean>('product_alert_allow_stock'),
            new Field<'newsletter_general_active', boolean>('newsletter_general_active'),
            new Field<'newsletter_subscription_allow_guest_subscribe', boolean>(
                'newsletter_subscription_allow_guest_subscribe'
            ),
            new Field<'newsletter_subscription_confirm', boolean>('newsletter_subscription_confirm'),
            new Field<'delivery_instore_active', boolean>('delivery_instore_active'),
            new Field<'access_token_lifetime', string>('access_token_lifetime'),
            new Field<'is_allowed_reorder', boolean>('is_allowed_reorder'),
            new Field<'rss_order_subscribe_allow', boolean>('rss_order_subscribe_allow'),
            new Field<'downloadable_disable_guest_checkout', boolean>('downloadable_disable_guest_checkout'),
            new Field<'minimun_password_length', number>('minimun_password_length'),
            new Field<'required_character_classes_number', string>('required_character_classes_number'),
            ...this._getTimeDateFormatFields(),
            this._getPriceDisplayTypeField()
        ];
    }
}

export default new ConfigQuery();
