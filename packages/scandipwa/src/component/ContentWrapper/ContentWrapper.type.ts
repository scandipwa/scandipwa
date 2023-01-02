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

import { Children, Mix } from 'Type/Common.type';

export interface ContentWrapperComponentProps {
    children?: Children;
    mix?: Mix;
    wrapperMix?: Mix;
    label?: string;
    isNotSection?: boolean;
}

export interface ContentWrapperComponentState {}

export interface ContentWrapperContainerState {}
