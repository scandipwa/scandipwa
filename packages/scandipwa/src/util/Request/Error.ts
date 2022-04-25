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

import { NetworkError } from 'Type/Common.type';

export const DEFAULT_ERROR_MESSAGE = __('Something went wrong!');

/**
 * Get error message from an array of errors from graphql, or from a regular error object.
 * @param array | object error
 * @param string optional default error message if couldn't get any from the given error
 * @return string message
 * @namespace Util/Request/Error/getErrorMessage */
export const getErrorMessage = (
    error: NetworkError | NetworkError[],
    defaultMessage: string = DEFAULT_ERROR_MESSAGE
): string => {
    if (Array.isArray(error)) {
        return error?.[0].message || defaultMessage;
    }

    return error?.message || defaultMessage;
};
