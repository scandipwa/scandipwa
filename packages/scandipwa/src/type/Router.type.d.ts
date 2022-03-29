/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { LocationState } from 'history';

export interface LocationType {
    pathname?: string;
    search?: string;
    state?: LocationState;
    hash?: string;
    key?: string;
}

// TODO use HistoryType
export interface HistoryType {
    length?: number;
    action?: string;
    location?: LocationType;
}

// TODO use match from react-router
export interface MatchType {
    path?: string;
    url?: string;
    params?: any;
    isExact?: boolean;
}

export interface UrlRewriteType {
    id?: number;
    type?: string;
    sku?: string;
    notFound?: boolean;
}

export type LinkType = [string | unknown]
