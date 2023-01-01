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

import { Children, Mix, Mods } from 'Type/Common.type';
import { Device } from 'Type/Device.type';

export interface ExpandableContentContainerMapStateProps {
    device: Device;
}


export interface ExpandableContentContainerDispatchProps {}

export interface ExpandableContentComponentProps {
    isContentExpanded: boolean;
    isArrow: boolean;
    heading?: string;
    children: Children;
    mix: Mix;
    mods: Mods;
    device: Device;
    onClick?: (props?: ExpandableContentComponentProps, propName?: string, componentName?: string) => void;
}

export interface ExpandableContentComponentState {
    isContentExpanded: boolean;
    prevIsContentExpanded: boolean;
}
