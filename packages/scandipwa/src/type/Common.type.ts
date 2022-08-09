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

import { ReactNode } from 'react';

export type Merge<A, B> = Omit<A, keyof B> & B;

export type Mods = Record<string, string | boolean>;

export interface Mix {
    block?: string;
    elem?: string;
    mods?: Mods;
}

export type ReactElement = ReactNode | ReactNode[];

export type Children = ReactElement;

// TODO unknown
export type MetaTitle = string | unknown;

export type Url<T = unknown> = {
    search?: string;
    pathname: string;
    state?: T;
};

export interface NetworkError { message: string }

export type ObjectEntries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T];
