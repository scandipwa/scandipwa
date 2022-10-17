/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

export interface CheckoutTermsAndConditionsPopupContainerMapStateProps {
    payload: CheckoutTermsAndConditionsPopupPayload;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CheckoutTermsAndConditionsPopupContainerMapDispatchProps {}

export type CheckoutTermsAndConditionsPopupContainerProps = CheckoutTermsAndConditionsPopupContainerMapStateProps
& CheckoutTermsAndConditionsPopupContainerMapDispatchProps;

export interface CheckoutTermsAndConditionsPopupComponentProps {
    payload: CheckoutTermsAndConditionsPopupPayload;
}

export interface CheckoutTermsAndConditionsPopupPayload {
    title: string;
    text: string;
}

export type CheckoutTermsAndConditionsContainerPropsKeys = 'payload';
