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

import { OfflineStore } from 'Store/Offline/Offline.type';
import { Children } from 'Type/Common.type';

export interface ErrorHandlerComponentProps {
    children: Children;
    updateOfflineStore: (state: Partial<OfflineStore>) => void;
}

export interface ErrorHandlerComponentState {
    hasError: boolean;
    pathname: string;
}
