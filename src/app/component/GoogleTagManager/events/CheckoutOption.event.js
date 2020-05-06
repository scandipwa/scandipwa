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

import Event, { EVENT_GTM_CHECKOUT_OPTION } from 'Util/Event';
import BaseEvent from 'Component/GoogleTagManager/events/BaseEvent.event';

export const CHECKOUT_OPTIONS_EVENT_DELAY = 500;
export const EVENT_TIMEOUT_ON_LOAD = 1000;
export const SPAM_PROTECTION_DELAY = 100;


/**
 * On checkout
 */
export default class CheckoutOptionEvent extends BaseEvent {
    /**
     * Event fire delay
     *
     * @type {number}
     */
    eventHandleDelay = CHECKOUT_OPTIONS_EVENT_DELAY;

    /**
     * Bind
     */
    bindEvent() {
        Event.observer(EVENT_GTM_CHECKOUT_OPTION, ({ step, option }) => {
            this.handle(step, option);
        });
    }

    /**
     * Handle
     */
    handler(step, option) {
        if (this.spamProtection(SPAM_PROTECTION_DELAY)) {
            return;
        }

        this.pushEventData({
            ecommerce: {
                checkout: {
                    actionField: {
                        step,
                        option,
                        action: 'checkout'
                    }
                }
            }
        });
    }
}
