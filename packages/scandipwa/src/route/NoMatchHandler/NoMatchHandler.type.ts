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

import { MetaStore } from 'Store/Meta/Meta.type';
import { Children } from 'Type/Common.type';

export interface NoMatchHandlerContainerMapStateProps {
    noMatch: boolean;
}

export interface NoMatchHandlerContainerMapDispatchProps {
    updateMetaStore: (state: Partial<MetaStore>) => void;
    updateNoMatch: (options: { noMatch: boolean }) => void;
}

export interface NoMatchHandlerContainerBaseProps {
    children: Children;
}

export type NoMatchHandlerContainerProps = RouteComponentProps
& NoMatchHandlerContainerMapStateProps
& NoMatchHandlerContainerMapDispatchProps
& NoMatchHandlerContainerBaseProps;

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
