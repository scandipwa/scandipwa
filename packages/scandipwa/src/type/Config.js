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

export const regionType = PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number
});

export const countriesType = PropTypes.arrayOf(
    PropTypes.shape({
        label: PropTypes.string,
        id: PropTypes.string,
        available_regions: PropTypes.arrayOf(regionType)
    })
);
