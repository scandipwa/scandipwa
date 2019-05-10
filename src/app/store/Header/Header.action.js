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

export const CHANGE_HEADER_STATE = 'CHANGE_HEADER_STATE';
export const GOTO_PREVIOUS_HEADER_STATE = 'GOTO_PREVIOUS_HEADER_STATE';

export const changeHeaderState = headerState => ({
    type: CHANGE_HEADER_STATE,
    headerState
});

export const goToPreviousHeaderState = () => ({
    type: GOTO_PREVIOUS_HEADER_STATE
});
