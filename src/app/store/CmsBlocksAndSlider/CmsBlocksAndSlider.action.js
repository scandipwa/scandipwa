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

export const UPDATE_CMS_BLOCKS = 'UPDATE_CMS_BLOCKS';
export const UPDATE_SLIDER = 'UPDATE_SLIDER';

/**
 * Update CMS Block information
 * @param {Object} block URL Key of the page that must be returned
 */
export const updateCmsBlocks = blocks => ({
    type: UPDATE_CMS_BLOCKS,
    blocks
});

/**
 * Update Homepage slider
 * @param {Object} slider Slider object with id and slides
 */
export const updateSlider = slider => ({
    type: UPDATE_SLIDER,
    slider
});
