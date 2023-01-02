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

import { Location } from 'history';
import { RouteComponentProps } from 'react-router';

import { PageMeta } from 'Store/Meta/Meta.type';
import { Children } from 'Type/Common.type';

export interface NoMatchHandlerContainerMapStateProps {
    noMatch: boolean;
}

export interface NoMatchHandlerContainerMapDispatchProps {
    updateMeta: (meta: Partial<PageMeta>) => void;
    updateNoMatch: (options: { noMatch: boolean }) => void;
}

export interface NoMatchHandlerContainerBaseProps {
    children: Children;
}

export interface NoMatchHandlerContainerProps extends RouteComponentProps,
    NoMatchHandlerContainerMapStateProps,
    NoMatchHandlerContainerMapDispatchProps,
    NoMatchHandlerContainerBaseProps {}

export interface NoMatchHandlerContainerState {}

export interface NoMatchHandlerComponentState {}

export interface NoMatchHandlerComponentProps {
    children: Children;
    noMatch: boolean;
    updateNoMatch: (options: { noMatch: boolean }) => void;
    location: Location;
}

export type NoMatchHandlerContainerPropsKeys = 'children'
| 'noMatch'
| 'updateNoMatch'
| 'location';
