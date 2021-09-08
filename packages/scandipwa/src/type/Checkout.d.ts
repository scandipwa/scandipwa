export * from './Checkout.js';

export interface PaymentMethod {
    code: string
    title: string
}

export type PaymentMethods = PaymentMethod[]

export interface ShippingMethodType {
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

export type ShippingMethodTypes = ShippingMethodType[]

export interface CheckoutStore {
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
