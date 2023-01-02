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

import { Children } from 'Type/Common.type';

export interface ExpandableContentShowMoreContainerMapStateProps {
    isMobile: boolean;
}

export interface ExpandableContentContainerDispatchProps {}

export interface ExpandableContentShowMoreComponentBaseProps {
    showElemCount: number;
    children: Children[];
}

export type ExpandableContentShowMoreComponentProps = ExpandableContentShowMoreContainerMapStateProps
& ExpandableContentContainerDispatchProps
& ExpandableContentShowMoreComponentBaseProps;

export interface ExpandableContentShowMoreComponentState {
    isOpen: boolean;
    isExpanding: boolean;
}
