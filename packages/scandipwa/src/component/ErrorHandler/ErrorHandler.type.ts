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

import { Children } from 'Type/Common.type';

export interface ErrorHandlerComponentProps {
    children: Children;
    setBigOfflineNotice: (value: boolean) => void;
}

export interface ErrorHandlerComponentState {
    hasError: boolean;
    pathname: string;
}
