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

import { History, Location } from 'history';
import { RefObject } from 'react';
import { RouteComponentProps } from 'react-router';

import { Mix } from 'Type/Common.type';

export interface ResetButtonContainerBaseProps {
    history: History;
    location: Location;
    mix: Mix;
    onClick: () => void;
    categoryPageRef: RefObject<HTMLElement>;
}

export interface ResetButtonContainerFunctions {
    onClick: () => void;
}

export type ResetButtonContainerProps = RouteComponentProps & ResetButtonContainerBaseProps & ResetButtonContainerMapDispatchProps;

export interface ResetButtonComponentProps extends ResetButtonContainerFunctions {
    mix: Mix;
    isContentFiltered: boolean;
}

export interface ResetButtonContainerMapDispatchProps {
    resetFilters: () => void;
}

export type ResetButtonComponentContainerPropKeys =
    | 'mix'
    | 'onClick'
    | 'isContentFiltered';
