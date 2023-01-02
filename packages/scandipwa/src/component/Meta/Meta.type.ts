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

export interface MetaContainerMapStateProps {
    default_description?: string;
    default_keywords?: string;
    default_title?: string;
    canonical_url?: string;
    title_prefix?: string;
    title_suffix?: string;
    description?: string;
    keywords?: string;
    title?: string;
    robots?: string;
    status_code?: string;
}

export interface MetaContainerMapDispatchProps {}

export type MetaContainerProps = MetaContainerMapStateProps
& MetaContainerMapDispatchProps;

export interface MetaComponentProps {
    metadata: Record<string, string>[];
    canonical_url?: string;
    default_title?: string;
    title_prefix?: string;
    title_suffix?: string;
    title?: string;
}

export type MetaContainerPropsKeys = 'metadata'
| 'canonical_url'
| 'default_title'
| 'title'
| 'title_prefix'
| 'title_suffix';

export interface MetaComponentState {}

export interface MetaContainerState {}
