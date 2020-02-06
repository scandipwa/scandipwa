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

import Event, { EVENT_GTM_PRODUCT_DETAIL, EVENT_GTM_GENERAL_INIT } from 'Util/Event';
import ProductHelper from 'Component/GoogleTagManager/utils';
import BaseEvent from 'Component/GoogleTagManager/events/BaseEvent.event';

export const SPAM_PROTECTION_TIMEOUT = 10000;
export const EVENT_EXECUTION_DELAY = 500;

/**
 * Product detail push event
 */
class ProductDetail extends BaseEvent {
    /**
     * Last product path name
     *
     * @type {null|string}
     */
    lastPath = null;

    /**
     * Bind on product detail
     */
    bindEvent() {
        Event.observer(EVENT_GTM_PRODUCT_DETAIL, ({ product, pathname }) => {
            setTimeout(() => {
                this.handle(product, pathname);
            }, EVENT_EXECUTION_DELAY);
        });

        Event.observer(EVENT_GTM_GENERAL_INIT, () => {
            this.lastPath = null;
        });
    }

    /**
     * Handle product detail event
     *
     * @param product
     * @param pathname
     */
    handler(product, pathname) {
        const { sku } = product;
        if (this.spamProtection(SPAM_PROTECTION_TIMEOUT, sku)
            || pathname === this.lastPath
        ) {
            return;
        }

        this.lastPath = pathname;

        this.pushEventData({
            ecommerce: {
                detail: {
                    products: ProductHelper.getProductData(product)
                }
            }
        });
    }
}

export default ProductDetail;
