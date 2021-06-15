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

export const DEFAULT_ERROR_MESSAGE = __('Something went wrong!');

/**
 * Get error message from an array of errors from graphql, or from a regular error object.
 * @param array | object error
 * @param string optional default error message if couldn't get any from the given error
 * @return string message
 * @namespace Util/Request/getErrorMessage
 */
export const getErrorMessage = (error, defaultMessage = DEFAULT_ERROR_MESSAGE) => {
    const {
        message = defaultMessage
    } = error?.length ? error[0] : error || {};

    return message;
};
