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

import { ReactNodeLike } from 'prop-types';

export type ModsType = Record<string, string | boolean>;

export interface MixType {
    block?: string;
    elem?: string;
    mods?: ModsType;
}

export type ChildrenType = ReactNodeLike[] | ReactNodeLike

export type RefType = () => void | { current: Element }

// TODO unknown
export type MetaTitleType = string | unknown
