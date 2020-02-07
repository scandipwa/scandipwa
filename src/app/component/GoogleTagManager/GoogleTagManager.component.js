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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import General from 'Component/GoogleTagManager/events/General.event';
import Scripts from 'Component/GoogleTagManager/Scripts';
import Impression from 'Component/GoogleTagManager/events/Impression.event';
import ProductClickEvent from 'Component/GoogleTagManager/events/ProductClick.event';
import AddToCartEvent from 'Component/GoogleTagManager/events/AddToCart.event';
import RemoveFromCartEvent from 'Component/GoogleTagManager/events/RemoveFromCart.event';
import ProductDetailEvent from 'Component/GoogleTagManager/events/ProductDetail.event';
import PurchaseEvent from 'Component/GoogleTagManager/events/Purchase.event';
import CheckoutEvent from 'Component/GoogleTagManager/events/Checkout.event';

/**
 * Event list
 */
export const EVENT_GENERAL = 'general';
export const EVENT_IMPRESSION = 'productImpression';
export const EVENT_PRODUCT_CLICK = 'productClick';
export const EVENT_ADD_TO_CART = 'addToCart';
export const EVENT_REMOVE_FROM_CART = 'removeFromCart';
export const EVENT_PRODUCT_DETAIL = 'productDetail';
export const EVENT_PURCHASE = 'purchase';
export const EVENT_CHECKOUT = 'checkout';

/**
 * Const
 */
export const DATA_LAYER_NAME = 'dataLayer';
export const GTM_INJECTION_TIMEOUT = 4000;

/**
 * Google tag manager wrapper
 * This should have 1 instance to avoid multiple initializations
 */
class GoogleTagManager extends PureComponent {
    static propTypes = {
        gtm: PropTypes.shape(),
        // eslint-disable-next-line react/no-unused-prop-types
        state: PropTypes.shape(),
        // eslint-disable-next-line react/no-unused-prop-types
        dispatch: PropTypes.func
    };

    static defaultProps = {
        gtm: {
            enabled: false,
            gtm_id: ''
        },
        state: {},
        dispatch: () => {}
    };

    /**
     * Event list used in GTM
     * All used events should be registered in this data mapping
     *
     * @type {{[p: string]: General|Purchase|CheckoutEvent|OrderData|Impression|AddToCartEvent|ProductClickEvent|ProductDetail|CheckoutOptionEvent|RemoveFromCartEvent}}
     */
    static eventList = {
        [EVENT_GENERAL]: General,
        [EVENT_PURCHASE]: PurchaseEvent,
        [EVENT_CHECKOUT]: CheckoutEvent,
        [EVENT_IMPRESSION]: Impression,
        [EVENT_ADD_TO_CART]: AddToCartEvent,
        [EVENT_PRODUCT_CLICK]: ProductClickEvent,
        [EVENT_PRODUCT_DETAIL]: ProductDetailEvent,
        [EVENT_REMOVE_FROM_CART]: RemoveFromCartEvent
    };

    /**
     * GoogleTagManager instance
     *
     * @type {GoogleTagManager}
     */
    static instance = null;

    /**
     * Push data to GTM
     *
     * @param event
     * @param data
     */
    static pushData(event, data) {
        if (this.getInstance()) {
            this.getInstance().processDataPush(event, data);
        }
    }

    /**
     * Append Data Layer with new data
     *
     * @param data
     */
    static appendData(data) {
        if (this.getInstance()) {
            this.getInstance().addDataLayer(data);
        }
    }

    /**
     * Get event by name
     *
     * @param name
     * @return {null|BaseEvent}
     */
    static getEvent(name) {
        if (this.getInstance()) {
            return this.getInstance().getEvent(name);
        }

        return null;
    }

    /**
     * Get GoogleTagManager Instance
     *
     * @return {GoogleTagManager}
     */
    static getInstance() {
        return this.instance;
    }

    /**
     * Is GoogleTagManager enabled
     *
     * @type {boolean}
     */
    enabled = false;

    /**
     * Prepared Data Layer
     *
     * @type {{}}
     */
    currentDataLayer = {};

    /**
     * Data layer name
     *
     * @type {string}
     */
    currentDataLayerName = DATA_LAYER_NAME;

    /**
     * Event data object
     *
     * @type {{}}
     */
    events = {};

    /**
     * Data storage for event data
     *
     * @type {{}}
     */
    eventDataStorage = {};

    /**
     * Did mount
     */
    componentDidMount() {
        this.initialize();
    }

    /**
     * If props is updated
     */
    componentDidUpdate() {
        this.initialize();
    }

    /**
     * Unregister component
     */
    componentWillUnmount() {
        this.destruct();
    }

    /**
     * Get event by name
     *
     * @param name
     * @return {null|*}
     */
    getEvent(name) {
        if (Object.keys(this.events).indexOf(name) >= 0) {
            return this.events[name];
        }

        return null;
    }

    /**
     * Set event storage
     *
     * @param event
     * @param data
     */
    setEventStorage(event, data) {
        this.eventDataStorage[event] = data;
    }

    /**
     * Get reference to the storage
     *
     * @param event
     * @return {*}
     */
    getEventDataStorage(event) {
        if (typeof this.eventDataStorage[event] === 'undefined') {
            this.resetEventDataStorage(event);
        }

        return this.eventDataStorage[event];
    }

    /**
     * Reset storage data
     *
     * @param event
     */
    resetEventDataStorage(event) {
        this.eventDataStorage[event] = {};
    }

    /**
     * Register GTM event handlers
     */
    registerEvents() {
        this.events = Object.entries(GoogleTagManager.eventList).reduce((acc, [name, Event]) => {
            acc[name] = new Event(name, this);
            acc[name].bindEvent();

            return acc;
        }, {});
    }

    /**
     * Send event and data to the GoogleTagManager
     *
     * @param event
     * @param data
     */
    processDataPush(event, data) {
        if (this.enabled) {
            this.addDataLayer(data);

            if (this.debug) {
                // eslint-disable-next-line no-console
                console.log(event, data);
            }

            window[this.currentDataLayerName].push({
                event,
                ...this.currentDataLayer
            });

            this.currentDataLayer = {};
        }
    }

    /**
     * Unregister/ destruct all parts related to the gtm
     */
    destruct() {
        Object.values(this.events).forEach((event, name) => {
            event.destruct();
            // eslint-disable-next-line fp/no-delete
            delete this.events[name];
        });

        this.events = {};
    }

    /**
     * Append current DataLayer with new nata
     *
     * @param data
     */
    addDataLayer(data) {
        if (this.enabled) {
            this.currentDataLayer = Object.assign({}, this.currentDataLayer, data);
        }
    }

    /**
     * Initialize GTM
     */
    initialize() {
        const { gtm: { enabled } } = this.props;

        if (this.enabled || !enabled || GoogleTagManager.getInstance()) {
            return;
        }

        this.enabled = true;
        GoogleTagManager.instance = this;

        this.injectGTMScripts();
        this.registerEvents();
    }

    /**
     * Insert GTM scripts to the document
     */
    injectGTMScripts() {
        const { gtm: { gtm_id: id } } = this.props;

        const script = document.createElement('script');
        script.innerHTML = Scripts.getScript(
            { id, dataLayerName: this.currentDataLayerName }
        );

        setTimeout(() => {
            document.head.insertBefore(script, document.head.childNodes[0]);
        }, GTM_INJECTION_TIMEOUT);
        window[this.currentDataLayerName] = window[this.currentDataLayerName] || [];
    }

    /**
     * Skip render
     *
     * @return {null}
     */
    render() {
        return null;
    }
}

export default GoogleTagManager;
