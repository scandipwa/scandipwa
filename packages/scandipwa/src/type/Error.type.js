/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const ErrorDetailsType = PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    err: PropTypes.object,
    info: PropTypes.shape({
        componentStack: PropTypes.string
    })
});
