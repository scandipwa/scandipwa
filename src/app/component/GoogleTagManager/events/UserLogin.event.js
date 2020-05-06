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

import Event, { EVENT_GTM_USER_LOGIN } from 'Util/Event';
import BaseEvent from 'Component/GoogleTagManager/events/BaseEvent.event';

export const USER_LOGIN_EVENT_DELAY = 500;
export const SPAM_PROTECTION_DELAY = 100;

/**
 * On checkout
 */
export default class UserLoginEvent extends BaseEvent {
    /**
     * Event fire delay
     *
     * @type {number}
     */
    eventHandleDelay = USER_LOGIN_EVENT_DELAY;

    /**
     * Bind
     */
    bindEvent() {
        Event.observer(EVENT_GTM_USER_LOGIN, () => {
            this.handle();
        });
    }

    checkDataExists() {
        return true;
    }

    /**
     * Handle
     */
    handler() {
        if (this.spamProtection(SPAM_PROTECTION_DELAY)) {
            return;
        }

        this.pushEventData({});
    }
}
