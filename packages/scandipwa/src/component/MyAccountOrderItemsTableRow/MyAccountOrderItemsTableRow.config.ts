/* eslint-disable no-magic-numbers */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

export const ORDER_STATUS_TRANSLATION_MAP = {
    quantity_ordered: __('Ordered'),
    quantity_canceled: __('Canceled'),
    quantity_invoiced: __('Invoiced'),
    quantity_refunded: __('Refunded'),
    quantity_returned: __('Returned'),
    quantity_shipped: __('Shipped')
};

export enum OrderColumnSpanCount {
    ORDER_REFUNDS = 7,
    ORDER_SHIPMENTS = 3,
    DEFAULT = 5
}
