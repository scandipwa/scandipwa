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

import { PageMeta } from 'Store/Meta/Meta.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';

export interface MenuPageContainerMapStateProps {
    isMobile: boolean;
}

export interface MenuPageContainerMapDispatchProps {
    updateMeta: (meta: Partial<PageMeta>) => void;
    changeHeaderState: (state: NavigationState) => void;
}

export interface MenuPageContainerProps extends MenuPageContainerMapStateProps,
    MenuPageContainerMapDispatchProps {}

export interface MenuPageContainerState {}
