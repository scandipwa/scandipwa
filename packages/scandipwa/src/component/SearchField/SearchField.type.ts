/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { ChangeEvent } from 'react';

import { Device } from 'Type/Device.type';

export interface SearchFieldContainerMapStateToProps {
    device: Device;
}


export interface SearchFieldContainerMapDispatchToProps {}

export interface SearchFieldComponentProps extends SearchFieldContainerMapStateToProps {
    searchCriteria: string;
    onSearchBarFocus: () => void;
    onSearchBarChange: (e: ChangeEvent<HTMLInputElement> | { target: { value: string } }) => void;
    onSearchOutsideClick: () => void;
    onClearSearchButtonClick: () => void;
    isVisible: boolean;
    isActive: boolean;
    hideActiveOverlay: () => void;
}
