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

export interface MyAccountConfirmEmailComponentProps {
    state: MyAccountPageState | '';
    handleSignIn: (e: MouseEvent) => void;
}

export interface MyAccountConfirmEmailComponentState {}

export interface MyAccountConfirmEmailContainerState {}
