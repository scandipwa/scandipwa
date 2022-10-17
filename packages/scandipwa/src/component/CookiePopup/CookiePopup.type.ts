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

export interface CookiePopupContainerMapStateProps {
    cookieText: string;
    cookieLink: string;
    code: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CookiePopupContainerMapDispatchProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CookiePopupContainerBaseProps {}

export type CookiePopupContainerProps = CookiePopupContainerMapStateProps
& CookiePopupContainerMapDispatchProps
& CookiePopupContainerBaseProps;

export interface CookiePopupComponentProps {
    cookieText: string;
    cookieLink: string;
    code: string;
}

export interface CookiePopupComponentState {
    isAccepted: boolean;
}
