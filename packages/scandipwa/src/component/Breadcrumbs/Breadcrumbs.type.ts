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

import { Breadcrumb } from 'Store/Breadcrumbs/Breadcrumbs.type';

export interface BreadcrumbsContainerMapStateProps {
    breadcrumbs: Breadcrumb[];
    areBreadcrumbsVisible: boolean;
}

export interface BreadcrumbsContainerMapDispatchProps {}

export interface BreadcrumbsComponentProps extends BreadcrumbsContainerMapStateProps,
    BreadcrumbsContainerMapDispatchProps {}

export interface BreadcrumbsComponentState {}
