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

export type Location = {
    pathname?: string;
    search?: string;
    state?: LocationState;
    hash?: string;
    key?: string;
}

// TODO use History
export type History = {
    length?: number;
    action?: string;
    location?: Location;
}

// TODO use match from react-router
export type Match = {
    path?: string;
    url?: string;
    params?: any;
    isExact?: boolean;
}

export type UrlRewrite = {
    id?: number;
    type?: string;
    sku?: string;
    notFound?: boolean;
}

export type Link = [string | unknown]
