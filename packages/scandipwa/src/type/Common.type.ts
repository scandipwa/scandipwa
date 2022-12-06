/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import PropTypes from 'prop-types';
import { ReactNode } from 'react';

export type Merge<A, B> = Omit<A, keyof B> & B;

export type Mods = Record<string, string | boolean>;

export interface Mix {
    block?: string;
    elem?: string;
    mods?: Mods;
    mix?: Mix;
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

// Support for comtabilitiy

export const ModsType = PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
]));

export const MixType = PropTypes.shape({
    block: PropTypes.string,
    elem: PropTypes.string,
    mods: ModsType,
});

// @ts-ignore
MixType.mix = MixType;

export const ChildrenType = PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
]);

export const RefType = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
]);

export const MetaTitleType = PropTypes.oneOfType([PropTypes.string, PropTypes.object]);
