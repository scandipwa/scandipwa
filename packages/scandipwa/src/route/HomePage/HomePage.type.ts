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

import { match as Match } from 'react-router';

import { NavigationState } from 'Store/Navigation/Navigation.type';

export interface HomePageContainerMapStateProps {}

export interface HomePageContainerMapDispatchProps {
    changeHeaderState: (state: NavigationState) => void;
}

export interface HomePageContainerBaseProps {
    currentUrl: string;
    match: Match;
}

export interface HomePageContainerProps extends HomePageContainerMapStateProps,
    HomePageContainerMapDispatchProps,
    HomePageContainerBaseProps {}

export type HomePageContainerPropsKeys = 'changeHeaderState'
| 'currentUrl'
| 'match'
| 'pageIdentifiers';
