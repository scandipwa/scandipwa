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

import PropTypes from 'prop-types';

export const RatingOptionItemType = PropTypes.shape({
    option_id: PropTypes.number,
    value: PropTypes.number
});

export const RatingItemsType = PropTypes.arrayOf(
    PropTypes.shape({
        rating_id: PropTypes.number,
        rating_code: PropTypes.string,
        rating_options: PropTypes.arrayOf(RatingOptionItemType)
    })
);
