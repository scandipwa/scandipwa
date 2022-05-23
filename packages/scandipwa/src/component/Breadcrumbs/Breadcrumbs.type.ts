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

import { Breadcrumb } from 'Store/Breadcrumbs/Breadcrumbs.type';

export interface BreadcrumbsContainerMapStateProps {
    breadcrumbs: Breadcrumb[];
    areBreadcrumbsVisible: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BreadcrumbsContainerMapDispatchProps {}

export type BreadcrumbsComponentProps = BreadcrumbsContainerMapStateProps & BreadcrumbsContainerMapDispatchProps;
