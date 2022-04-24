/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { Field } from '@tilework/opus';

import { GQLCheckoutAgreementMode } from 'Type/Graphql.type';

export interface PriceTaxDisplay {
    product_price_display_type: string;
    shipping_price_display_type: string;
}

export type StoreConfigFields = Array<
Field<'code', string>
| Field<'is_active', boolean>
| Field<'cms_home_page', string>
| Field<'cms_no_route', string>
| Field<'copyright', string>
| Field<'timezone', string>
| Field<'header_logo_src', string>
| Field<'title_prefix', string>
| Field<'title_suffix', string>
| Field<'default_display_currency_code', string>
| Field<'default_keywords', string>
| Field<'default_title', string>
| Field<'default_description', string>
| Field<'default_country', string>
| Field<'downloadable_links_target_new_window', boolean>
| Field<'secure_base_media_url', string>
| Field<'logo_alt', string>
| Field<'logo_height', number>
| Field<'logo_width', number>
| Field<'cookie_text', string>
| Field<'cookie_link', string>
| Field<'terms_are_enabled', boolean>
| Field<'address_lines_quantity', number>
| Field<'base_url', string>
| Field<'pagination_frame', number>
| Field<'pagination_frame_skip', number>
| Field<'anchor_text_for_previous', string>
| Field<'anchor_text_for_next', string>
| Field<'reviews_are_enabled', boolean>
| Field<'reviews_allow_guest', boolean>
| Field<'wishlist_general_active', boolean>
| Field<'demo_notice', boolean>
| Field<'guest_checkout', boolean>
| Field<'is_email_confirmation_required', boolean>
| Field<'display_product_stock_status', boolean>
| Field<'base_link_url', string>
| Field<'show_vat_number_on_storefront', boolean>
| Field<'show_tax_vat_number', boolean>
| Field<'product_use_categories', boolean>
| Field<'category_url_suffix', string>
| Field<'cookie_lifetime', string>
| Field<'plp_list_mode', string>
| Field<'layered_navigation_product_count_enabled', boolean>
| Field<'region_display_all', boolean>
| Field<'redirect_dashboard', boolean>
| Field<'product_alert_allow_price', boolean>
| Field<'product_alert_allow_stock', boolean>
| Field<'newsletter_general_active', boolean>
| Field<'newsletter_subscription_allow_guest_subscribe', boolean>
| Field<'newsletter_subscription_confirm', boolean>
| Field<'delivery_instore_active', boolean>
| Field<'access_token_lifetime', string>
| Field<'is_allowed_reorder', boolean>
| Field<'rss_order_subscribe_allow', boolean>
| Field<'downloadable_disable_guest_checkout', boolean>
| Field<'minimun_password_length', number>
| Field<'required_character_classes_number', string>
| Field<'use_calendar', boolean>
| Field<'year_range', string>
| Field<'date_fields_order', string>
| Field<'time_format', string>
| Field<'priceTaxDisplay', PriceTaxDisplay>
>;

export interface StoreConfig {
    code: string;
    is_active: boolean;
    cms_home_page: string;
    cms_no_route: string;
    copyright: string;
    timezone: string;
    header_logo_src: string;
    title_prefix: string;
    title_suffix: string;
    default_display_currency_code: string;
    default_keywords: string;
    default_title: string;
    default_description: string;
    default_country: string;
    downloadable_links_target_new_window: boolean;
    secure_base_media_url: string;
    logo_alt: string;
    logo_height: number;
    logo_width: number;
    cookie_text: string;
    cookie_link: string;
    terms_are_enabled: boolean;
    address_lines_quantity: number;
    base_url: string;
    pagination_frame: number;
    pagination_frame_skip: number;
    anchor_text_for_previous: string;
    anchor_text_for_next: string;
    reviews_are_enabled: boolean;
    reviews_allow_guest: boolean;
    wishlist_general_active: boolean;
    demo_notice: boolean;
    guest_checkout: boolean;
    is_email_confirmation_required: boolean;
    display_product_stock_status: boolean;
    base_link_url: string;
    show_vat_number_on_storefront: boolean;
    show_tax_vat_number: boolean;
    product_use_categories: boolean;
    category_url_suffix: string;
    cookie_lifetime: string;
    plp_list_mode: string;
    layered_navigation_product_count_enabled: boolean;
    region_display_all: boolean;
    redirect_dashboard: boolean;
    product_alert_allow_price: boolean;
    product_alert_allow_stock: boolean;
    newsletter_general_active: boolean;
    newsletter_subscription_allow_guest_subscribe: boolean;
    newsletter_subscription_confirm: boolean;
    delivery_instore_active: boolean;
    access_token_lifetime: string;
    is_allowed_reorder: boolean;
    rss_order_subscribe_allow: boolean;
    downloadable_disable_guest_checkout: boolean;
    minimun_password_length: number;
    required_character_classes_number: string;
    use_calendar: boolean;
    year_range: string;
    date_fields_order: string;
    time_format: string;
    priceTaxDisplay: PriceTaxDisplay;
}

export interface StoreItem {
    name: string;
    is_active: boolean;
    base_url: string;
    base_link_url: string;
    code: string;
}

export interface Currency {
    id: string;
    label: string;
    value: string;
}

export interface CurrencyConfig {
    available_currencies_data: Currency[];
    current_currency_code: string;
}

export interface CheckoutAgreement {
    agreement_id: number;
    checkbox_text: string;
    content: string;
    content_height: number;
    is_html: boolean;
    mode: GQLCheckoutAgreementMode;
    name: string;
}
