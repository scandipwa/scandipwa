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

import Event, { EVENT_GTM_PRODUCT_REMOVE_FROM_CART } from 'Util/Event';
import ProductHelper from 'Component/GoogleTagManager/utils';
import BaseEvent from 'Component/GoogleTagManager/events/BaseEvent.event';

export const SPAM_PROTECTION_DELAY = 200;
/**
 * Product add to cart event
 */
class RemoveFromCartEvent extends BaseEvent {
    /**
     * Bind add to cart
     */
    bindEvent() {
        Event.observer(EVENT_GTM_PRODUCT_REMOVE_FROM_CART, ({
            item,
            quantity
        }) => {
            this.handle(item, quantity);
        });
    }

    /**
     * Handle product add to cart
     */
    handler(item, quantity) {
        if (this.spamProtection(SPAM_PROTECTION_DELAY)) {
            return;
        }

        const productData = ProductHelper.getItemData(item);
        const { id, price } = productData;
        const removedGroupedProduct = ProductHelper.updateGroupedProduct(id, -price * quantity);

        const removedProducts = removedGroupedProduct
            ? [
                { ...productData, quantity },
                removedGroupedProduct.data
            ]
            : [{ ...productData, quantity }];

        this.pushEventData({
            ecommerce: {
                currencyCode: this.getCurrencyCode(),
                remove: {
                    products: removedProducts
                },
                cart: this.prepareCartData()
            }
        });
    }
}
export default RemoveFromCartEvent;
