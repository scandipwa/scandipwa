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

export const MixType = PropTypes.shape({
    block: PropTypes.string,
    elem: PropTypes.string,
    mods: PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]))
});

export const HistoryType = PropTypes.shape({
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired
});

export const LocationType = PropTypes.shape({
    pathname: PropTypes.string.isRequired
});

export const MatchType = PropTypes.shape({
    path: PropTypes.string.isRequired
});

export const ChildrenType = PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
]);
