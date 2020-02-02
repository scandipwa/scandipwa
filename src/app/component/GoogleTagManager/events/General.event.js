/* eslint-disable import/no-cycle */
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

import { roundPrice } from 'Util/Price';
import { Event, EVENT_GTM_META_UPDATE, EVENT_GTM_GENERAL_INIT } from 'Util/Event';
import BaseEvent from 'Component/GoogleTagManager/events/BaseEvent.event';
import { Product as ProductHelper } from 'Component/GoogleTagManager/utils';

export const GENERAL_EVENT_DELAY = 500;

/**
 * GTM PWA General event
 *
 * On: page load, page change location
 */
class General extends BaseEvent {
    /**
     * If already loading data, do not do second request
     *
     * @type {boolean}
     */
    isLoadingData = false;

    /**
     * Set base event call delay
     *
     * @type {number}
     */
    eventHandleDelay = 0;

    /**
     * Current meta data
     *
     * @type {{}}
     */
    currentMeta = { title: '' };

    /**
     * Bind PWA event handling
     */
    bindEvent() {
        // Page load, wait a bit for better user performance
        setTimeout(() => {
            this.saveCartDataToStorage();
            this.handle();
        }, GENERAL_EVENT_DELAY);

        this.getGTM().props.history.listen(() => { // On page change
            this.saveCartDataToStorage();

            setTimeout(() => {
                this.handle();
            }, GENERAL_EVENT_DELAY);
        });

        // Receive current meta
        Event.observer(EVENT_GTM_META_UPDATE, (meta) => {
            this.currentMeta = meta;
        });
    }

    saveCartDataToStorage() {
        const storage = this.getStorage() || {};
        storage.cartLast = storage.cart;
        storage.cart = this.getAppState().CartReducer.cartTotals.items;
        this.setStorage(storage);
    }

    /**
     * Handler General
     */
    handler() {
        Event.dispatch(EVENT_GTM_GENERAL_INIT, {});

        this.pushEventData({
            cart: this.prepareCartData(),
            country: this.getCountryName(),
            pageType: this.getPageType(),
            language: this.getLanguage(),
            storeView: this.getStoreView(),
            customerId: this.getCustomerId(),
            portalName: this.getPortalName(),
            categoryName: this.getCategoryName(),
            categoryGroupName: this.getCategoryGroupName()
        });
    }

    /**
     * Prepare cart data
     *
     * @return {{quantity: number, price: number, name: string, variant: string, id: string, availability: boolean, category: string, brand: string}[]}
     */
    prepareCartData() {
        const {
            subtotal, tax_amount, items_qty,
            items = [],
            quote_currency_code
        } = this.getCartProductData();

        const itemsData = items
            .map(item => ({
                ...ProductHelper.getProductData(item)
            }));

        return {
            items_qty,
            total: roundPrice(subtotal + tax_amount),
            currency: quote_currency_code,
            itemsData
        };
    }

    /**
     * Get current store view
     *
     * @return {string}
     */
    getStoreView() {
        return this.getAppState().ConfigReducer.code || '';
    }

    /**
     * Get current language
     *
     * @return {string}
     */
    getLanguage() {
        return this.getAppState().ConfigReducer.locale || '';
    }

    /**
     * Get current signed in customer id
     *
     * @return {string}
     */
    getCustomerId() {
        return this.isSignedIn() ? this.getAppState().MyAccountReducer.customer.id : '';
    }

    /**
     * Get customer city
     *
     * @return {string}
     */
    getCountryName() {
        return this.getAppState().ConfigReducer.default_country;
    }

    /**
     * Get cart products
     *
     * @return {initialState.productsInCart|{}}
     */
    getCartProductData() {
        return this.getAppState().CartReducer.cartTotals;
    }

    /**
     * Get portal name (first category name)
     *
     * @return {string}
     */
    getPortalName() {
        const { breadcrumbs, areBreadcrumbsVisible } = this.getAppState().BreadcrumbsReducer;

        return areBreadcrumbsVisible ? (breadcrumbs.slice(0).pop() || { name: '' }).name : '';
    }

    /**
     * Should be 2'nd category name
     *
     * @return {string}
     */
    getCategoryGroupName() {
        const { breadcrumbs, areBreadcrumbsVisible } = this.getAppState().BreadcrumbsReducer;

        return areBreadcrumbsVisible ? (breadcrumbs.slice(0, -1).pop() || { name: '' }).name : '';
    }

    /**
     * Last category name
     *
     * @return {string}
     */
    getCategoryName() {
        const { breadcrumbs, areBreadcrumbsVisible } = this.getAppState().BreadcrumbsReducer;

        return areBreadcrumbsVisible ? (breadcrumbs.slice(0).shift() || { name: '' }).name : '';
    }
}

export default General;
