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

export const LocationType = PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.object,
    hash: PropTypes.string,
    key: PropTypes.string
});

export const HistoryType = PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string,
    location: LocationType
});

export const MatchType = PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    params: PropTypes.object,
    isExact: PropTypes.bool
});

export const UrlRewriteType = PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    sku: PropTypes.string,
    notFound: PropTypes.bool
});
