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

import { NavigationState } from 'Store/Navigation/Navigation.type';
import { Device } from 'Type/Device.type';

export interface SearchFieldContainerMapStateToProps {
    device: Device;
    navigationState: NavigationState;
    searchCriteria: string;
    activeOverlay: string;
}

export interface SearchFieldContainerMapDispatchToProps {
    hideActiveOverlay: () => void;
    setNavigationState: (stateName: NavigationState) => void;
    goToPreviousNavigationState: () => void;
    showOverlay: (overlayKey: string) => void;
    updateSearchCriteria: (searchCriteria: string) => void;
}

export interface SearchFieldContainerBaseProps {
    isVisible: boolean;
}

export interface SearchFieldContainerFunctions {
    onSearchBarFocus: () => void;
    onSearchBarChange: (e: ChangeEvent<HTMLInputElement> | { target: { value: string } }) => void;
    onSearchOutsideClick: () => void;
    onClearSearchButtonClick: () => void;
}

export type SearchFieldContainerProps = SearchFieldContainerMapStateToProps
& SearchFieldContainerMapDispatchToProps
& SearchFieldContainerBaseProps;

export interface SearchFieldComponentProps extends SearchFieldContainerFunctions {
    onSearchBarChange: (e: ChangeEvent<HTMLInputElement> | { target: { value: string } }) => void;
    isVisible: boolean;
    hideActiveOverlay: () => void;
    device: Device;
    navigationState: NavigationState;
    searchCriteria: string;
}

export type SearchFieldComponentContainerPropKeys = 'searchCriteria'
| 'isVisible';
