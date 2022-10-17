/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

export interface OrderItemQtyArray {
    quantity_ordered: number;
    quantity_canceled: number;
    quantity_invoiced: number;
    quantity_refunded: number;
    quantity_returned: number;
    quantity_shipped: number;
}
