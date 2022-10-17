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

import { Children } from 'Type/Common.type';

export interface TranslateOnCursorMoveMapStateProps {
    isMobile: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TranslateOnCursorMoveMapDispatchProps {}

export interface TranslateOnCursorMoveComponentProps {
    activeImageId: number;
    itemSelector: string;
    targetSelector: string;
    isMobile: boolean;
    children: Children;
}
