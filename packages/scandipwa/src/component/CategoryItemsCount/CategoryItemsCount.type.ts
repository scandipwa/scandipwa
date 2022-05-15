/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

export interface CategoryItemsCountContainerMapStateProps {
    totalItems: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CategoryItemsCountContainerMapDispatchProps {}

export interface CategoryItemsCountComponentBaseProps {
    isMatchingListFilter: boolean;
}

export type CategoryItemsCountComponentProps = CategoryItemsCountContainerMapStateProps
& CategoryItemsCountComponentBaseProps;
