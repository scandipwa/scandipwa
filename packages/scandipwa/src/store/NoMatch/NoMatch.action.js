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

export const UPDATE_NOMATCH = 'UPDATE_NOMATCH';

/**
 * Update router to show NoMatch page
 * @param  {Boolean} noMatch New noMatch value
 * @return {void}
 * @namespace Store/NoMatch/Action/updateNoMatch
 */
export const updateNoMatch = (noMatch) => ({
    type: UPDATE_NOMATCH,
    noMatch
});
