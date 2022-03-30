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

export type Mods = Record<string, string | boolean>;

export type Mix = {
    block?: string;
    elem?: string;
    mods?: Mods;
}

export type Children = React.ReactNode[] | React.ReactNode

export type Ref = () => void | { current: Element }

// TODO unknown
export type MetaTitle = string | unknown
