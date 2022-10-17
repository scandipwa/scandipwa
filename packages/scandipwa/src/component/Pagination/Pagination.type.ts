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

import { RouteComponentProps } from 'react-router';

import { Mix } from 'Type/Common.type';

export interface PaginationContainerMapStateProps {
    paginationFrame: number;
    paginationFrameSkip: number;
    anchorTextPrevious: string;
    anchorTextNext: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PaginationContainerMapDispatchProps {}

export interface PaginationContainerFunctions {
    getSearchQuery: (pageNumber: number) => string;
}

export interface PaginationContainerBaseProps {
    isLoading: boolean;
    totalPages: number;
    id?: string;
    mix?: Mix;
}

export type PaginationContainerProps = PaginationContainerMapStateProps
& PaginationContainerMapDispatchProps
& PaginationContainerBaseProps
& RouteComponentProps;

export interface PaginationComponentProps {
    isLoading: boolean;
    pathname: string;
    totalPages: number;
    currentPage: number;
    getSearchQuery: (pageNumber: number) => string;
    anchorTextPrevious: string;
    anchorTextNext: string;
    firstFramePage: number;
    lastFramePage: number;
    prevPageJump: number;
    nextPageJump: number;
    shouldRenderNextJump: boolean;
    shouldRenderPreviousJump: boolean;
    shouldRenderJumps: boolean;
    paginationFrame: number;
    id?: string;
    mix?: Mix;
}

export type PaginationContainerPropsKeys =
| 'anchorTextNext'
| 'anchorTextPrevious'
| 'id'
| 'isLoading'
| 'paginationFrame'
| 'pathname'
| 'totalPages'
| 'mix'
| 'currentPage'
| 'prevPageJump'
| 'nextPageJump'
| 'firstFramePage'
| 'lastFramePage'
| 'shouldRenderNextJump'
| 'shouldRenderPreviousJump'
| 'shouldRenderJumps';
