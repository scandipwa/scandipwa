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

/**
 * Generate custom response
 * @param body
 * @param status
 * @param statusText
 * @returns {Promise<any>}
 */
const generateCustomResponse = (body, status = 200, statusText = 'OK') => new Response(body, { status, statusText });

export default generateCustomResponse;
