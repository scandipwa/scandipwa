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

import { GROUPED } from 'Util/Product';

/**
 * Updates grouped product price to match default configuration sum
 * @param {Object} product
 * @namespace Util/Wishlist/updateGroupedProductPrice
 */
export const updateGroupedProductPrice = (product) => {
    const {
        type_id,
        items
    } = product;

    if (type_id !== GROUPED || !items) {
        return;
    }

    const { price_range: { minimum_price } } = product;

    items.forEach((item) => {
        const {
            qty,
            product: {
                price_range: {
                    minimum_price: link_minimum_price
                }
            }
        } = item;

        Object.keys(minimum_price).forEach((type, index) => {
            if (link_minimum_price[type].value) {
                const basePrice = (index === 0) ? 0 : minimum_price[type].value;
                minimum_price[type].value = basePrice + link_minimum_price[type].value * qty;
            }
        });
    });

    // eslint-disable-next-line no-param-reassign
    product.groupedPriceUpdated = true;
};

export default updateGroupedProductPrice;
