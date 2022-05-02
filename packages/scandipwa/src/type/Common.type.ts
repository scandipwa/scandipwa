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

export type Mix = {
    block?: string;
    elem?: string;
    mods?: Mods;
};

export type ReactElement = ReactNode | ReactNode[];

export type Children = ReactElement;

// TODO unknown
export type MetaTitle = string | unknown;

export type Url<T = unknown> = string | {
    search?: string;
    pathname: string;
    state: T;
};

export type NetworkError = { message: string };

export type ObjectEntries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T];
export type NameValue<T = string> = {
    name: string;
    value: T;
};
