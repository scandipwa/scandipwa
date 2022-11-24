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

import { match as Match } from 'react-router';

import { PageMeta } from 'Store/Meta/Meta.type';

export interface ConfirmNewsletterPageContainerMapDispatchProps {
    showErrorNotification: (error: string) => void;
    toggleBreadcrumbs: (isVisible: boolean) => void;
    updateMeta: (meta: Partial<PageMeta>) => void;
}

export type ConfirmNewsletterPageContainerProps = {
    match: Match<{
        id?: string;
        code?: string;
    }>;
} & ConfirmNewsletterPageContainerMapDispatchProps;

export interface ConfirmNewsletterPageContainerState {
    status: string;
    message: string;
}

export interface ConfirmNewsletterPageComponentProps extends ConfirmNewsletterPageContainerState {
    shouldDisplayWarning: boolean;
}

export type ConfirmNewsletterPageContainerPropsKeys =
    | 'status'
    | 'message'
    | 'shouldDisplayWarning';
