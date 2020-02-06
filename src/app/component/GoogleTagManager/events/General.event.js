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

import Event, { EVENT_GTM_META_UPDATE, EVENT_GTM_GENERAL_INIT } from 'Util/Event';
import BaseEvent from 'Component/GoogleTagManager/events/BaseEvent.event';

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
     * Get current store view
     *
     * @return {string}
     */
    getStoreView() {
        return this.getAppState().ConfigReducer.code || '';
    }

    /**
     *
     * @param {} item
     */
    getQuantity({ qty }) {
        return qty;
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
