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

import { RouteComponentProps } from 'react-router';

import { NavigationState } from 'Store/Navigation/Navigation.type';

export interface HomePageContainerMapStateProps {
    pageIdentifiers: string;
}

export interface HomePageContainerMapDispatchProps {
    changeHeaderState: (state: NavigationState) => void;
}

export interface HomePageContainerBaseProps {
    currentUrl: string;
}

export interface HomePageContainerProps extends HomePageContainerMapStateProps,
    HomePageContainerMapDispatchProps,
    RouteComponentProps,
    HomePageContainerBaseProps {}

export type HomePageContainerPropsKeys = 'changeHeaderState'
| 'currentUrl'
| 'match'
| 'pageIdentifiers';
