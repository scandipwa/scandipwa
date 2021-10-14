/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { createContext, ErrorInfo, useContext } from 'react';

export interface ErrorCatcherContextType {
    hasError: boolean;
    error?: Error
    errorInfo?: ErrorInfo
    setHasError: (hasError: boolean) => void
}

export const ErrorCatcherContext = createContext<ErrorCatcherContextType>({
    hasError: false,
    error: undefined,
    errorInfo: undefined,
    setHasError: () => {}
});

export const useErrorCatcherContext = (): ErrorCatcherContextType => useContext(ErrorCatcherContext);
