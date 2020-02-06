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

import Event, { EVENT_GTM_PRODUCT_CLICK } from 'Util/Event';
import BaseEvent from 'Component/GoogleTagManager/events/BaseEvent.event';
import ProductHelper from 'Component/GoogleTagManager/utils';
import { EVENT_IMPRESSION } from 'Component/GoogleTagManager/GoogleTagManager.component';

/**
 * Product click event
 */
class ProductClickEvent extends BaseEvent {
    /**
     * Set delay
     *
     * @type {number}
     */
    eventHandleDelay = 0;

    /**
     * Bind click events
     */
    bindEvent() {
        Event.observer(EVENT_GTM_PRODUCT_CLICK, (product) => {
            this.handle(product);
        });
    }

    /**
     * Handle product click
     */
    handler(product) {
        const {
            position = 1,
            list = ''
        } = this.getProductFromImpression(product);

        this.pushEventData({
            ecommerce: {
                click: {
                    actionField: {
                        list
                    },
                    products: [
                        {
                            ...ProductHelper.getProductData(product),
                            list,
                            position
                        }
                    ]
                }
            }
        });
    }

    /**
     * Get product position in impression
     *
     * @return {*}
     * @param clickedProduct
     */
    getProductFromImpression(clickedProduct) {
        const { impressions = [] } = this.getStorage(EVENT_IMPRESSION);
        const id = ProductHelper.getSku(clickedProduct);

        return impressions.reduce((acc, product) => (
            Object.keys(acc).length === 0 && id === product.id ? product : acc
        ), {});
    }
}

export default ProductClickEvent;
