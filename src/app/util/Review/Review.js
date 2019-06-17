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
 * Get review text based on passed review count
 * @param {number} reviewCount review count
 */
const getReviewText = reviewCount => (reviewCount === 1 ? __('Review') : __('Reviews'));

export { getReviewText };
