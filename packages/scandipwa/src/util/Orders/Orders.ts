/* eslint-disable import/prefer-default-export */
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

import {
    InvoiceItem, OrderItem, OrderItemProduct, RefundItem, ShipmentItemInterface
} from 'Query/Order.type';
import { decodeBase64 } from 'Util/Base64';

import { OrderItemQtyArray } from './Orders.type';

/** @namespace Util/Orders/getFormattedDate */
export const getFormattedDate = (rawDate = ''): string => {
    const date = new Date(rawDate.replace(/\s/, 'T'));
    const RADIX = 10;

    const addLeadingZero = (value: number) => (value < RADIX ? `0${value}` : value);

    const day = addLeadingZero(date.getDate());
    const month = addLeadingZero(date.getMonth() + 1);

    return `${date.getFullYear()}-${month}-${day}`;
};

/** @namespace Util/Orders/formatOrders */
export const formatOrders = (orders: OrderItem[]): OrderItem[] => orders.reduceRight((acc: OrderItem[], order) => {
    const { order_date, id: uid } = order;
    const formattedDate = getFormattedDate(order_date);

    return [
        ...acc,
        {
            ...order,
            id: decodeBase64(uid),
            created_at: formattedDate
        }
    ];
}, []);

/** @namespace Util/Orders/getOrderItemQtyToArray */
export const getOrderItemQtyToArray = (
    product: OrderItemProduct
    | ShipmentItemInterface
    | InvoiceItem
    | RefundItem
): OrderItemQtyArray => ({
    quantity_ordered: 'quantity_ordered' in product ? product.quantity_ordered : 0,
    quantity_canceled: 'quantity_canceled' in product ? product.quantity_canceled : 0,
    quantity_invoiced: 'quantity_invoiced' in product ? product.quantity_invoiced : 0,
    quantity_refunded: 'quantity_refunded' in product ? product.quantity_refunded : 0,
    quantity_returned: 'quantity_returned' in product ? product.quantity_returned : 0,
    quantity_shipped: 'quantity_shipped' in product ? product.quantity_shipped : 0
});

/** @namespace Util/Orders/getProductFromOrder */
export const getProductFromOrder = (
    allProducts: OrderItemProduct[],
    requiredProductSku: string
): OrderItemProduct | undefined => allProducts.find(({ product_sku }) => product_sku === requiredProductSku);

/** @namespace Util/Orders/getOrderItemRowDiscount */
export const getOrderItemRowDiscount = (discounts: Array<{ amount: { value?: string | number } }>): number => discounts
    .reduce((currentValue, { amount: { value } }) => (Number(value) || 0) + currentValue, 0);
