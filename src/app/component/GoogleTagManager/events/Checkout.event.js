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

import Event, { EVENT_GTM_CHECKOUT } from 'Util/Event';
import ProductHelper from 'Component/GoogleTagManager/utils';
import BaseEvent from 'Component/GoogleTagManager/events/BaseEvent.event';

export const CHECKOUT_EVENT_DELAY = 500;
export const SPAM_PROTECTION_DELAY = 1000;

/**
 * On checkout
 */
class CheckoutEvent extends BaseEvent {
    /**
     * Event fire delay
     *
     * @type {number}
     */
    eventHandleDelay = CHECKOUT_EVENT_DELAY;

    /**
     * Bind
     */
    bindEvent() {
        Event.observer(EVENT_GTM_CHECKOUT, ({ totals, step }) => {
            this.handle(totals, step);
        });
    }

    /**
     * Handle
     */
    handler(totals, step) {
        if (this.spamProtection(SPAM_PROTECTION_DELAY)) {
            return;
        }

        this.pushEventData({
            ecommerce: {
                checkout: {
                    actionField: this.getActionFields(step),
                    products: this.getProducts(totals)
                }
            }
        });
    }

    /**
     * Get action field for GTM data
     *
     * @param step
     * @return {{action: string, step: *}}
     */
    getActionFields(step) {
        return {
            step,
            action: 'checkout'
        };
    }

    /**
     * Get product detail
     *
     * @param paymentTotals
     *
     * @return {{quantity: number, price: number, name: string, variant: string, id: string, category: string, brand: string, url: string}[]}
     */
    getProducts({ items }) {
        const products = Object.values(items).reduce((acc, item) => (
            [
                ...acc,
                {
                    ...ProductHelper.getItemData(item),
                    quantity: ProductHelper.getQuantity(item),
                    availability: true
                }
            ]), []);

        const groupedProducts = this.getGroupedProducts();
        Object.values(groupedProducts || {}).forEach(({ data }) => products.push(data));

        return products;
    }
}

export default CheckoutEvent;
