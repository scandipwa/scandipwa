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

export const LocationType = PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.object,
    hash: PropTypes.string,
    key: PropTypes.string
});

export const HistoryType = {
    length: PropTypes.number,
    action: PropTypes.string,
    location: LocationType
};

export const MatchType = PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    params: PropTypes.object,
    isExact: PropTypes.bool
});

export const ChildrenType = PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
]);

export const RefType = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
]);
