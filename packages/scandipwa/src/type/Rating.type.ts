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

import PropTypes from 'prop-types';

// Support for comtabilitiy

export const RatingOptionItemType = PropTypes.shape({
    option_id: PropTypes.string,
    value: PropTypes.string,
});

export const RatingItemsType = PropTypes.arrayOf(
    PropTypes.shape({
        rating_id: PropTypes.string,
        rating_code: PropTypes.string,
        rating_options: PropTypes.arrayOf(RatingOptionItemType),
    }),
);

export const VoteType = PropTypes.shape({
    rating_code: PropTypes.string,
    value: PropTypes.string,
    percent: PropTypes.number,
});

export const ReviewItemType = PropTypes.shape({
    average_rating: PropTypes.number,
    nickname: PropTypes.string,
    title: PropTypes.string,
    detail: PropTypes.string,
    created_at: PropTypes.string,
    rating_votes: PropTypes.arrayOf(VoteType),
});
