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

export const GET_COUNTRY_LIST = 'GET_COUNTRY_LIST';
export const UPDATE_REVIEW_RATINGS = 'UPDATE_REVIEW_RATINGS';

const updateReviewRatings = reviewRatings => ({
    type: UPDATE_REVIEW_RATINGS,
    reviewRatings
});

const getCountryList = countries => ({
    type: GET_COUNTRY_LIST,
    countries
});

export { getCountryList, updateReviewRatings };
