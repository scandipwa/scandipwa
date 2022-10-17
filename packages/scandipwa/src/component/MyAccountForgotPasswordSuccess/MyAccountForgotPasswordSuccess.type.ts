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

import { MouseEvent } from 'react';

import { MyAccountPageState } from 'Component/MyAccountOverlay/MyAccountOverlay.config';

export interface MyAccountForgotPasswordSuccessContainerMapStateProps {
    submittedEmail: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MyAccountForgotPasswordSuccessContainerMapDispatchProps {}

export type MyAccountForgotPasswordSuccessContainerProps = MyAccountForgotPasswordSuccessContainerMapStateProps
& MyAccountForgotPasswordSuccessContainerMapDispatchProps & {
    state: MyAccountPageState | '';
    handleSignIn: (event: MouseEvent) => void;
};

export interface MyAccountForgotPasswordSuccessComponentProps {
    state: MyAccountPageState | '';
    handleSignIn: (event: MouseEvent) => void;
    submittedEmail: string;
}

export type MyAccountForgotPasswordSuccessContainerPropsKeys =
| 'state'
| 'handleSignIn'
| 'submittedEmail';
