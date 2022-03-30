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

export type PaymentMethod = {
    code: string
    title: string
}

export type PaymentMethods = PaymentMethod[]

export type ShippingMethod = {
    amount: number
    available: boolean
    base_amount: number
    carrier_code: string
    carrier_title: string
    error_message: string
    method_code: string
    method_title: string
    price_excl_tax: number
    price_incl_tax: number
}

export type ShippingMethods = ShippingMethod[]

export type CheckoutStore = {
    city: string
    country: string
    description: string
    name: string
    phone: string
    pickup_location_code: string
    postcode: string
    region: string
    street: string
}
