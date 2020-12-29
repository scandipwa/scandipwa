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

// eslint-disable-next-line import/prefer-default-export
export const DeviceType = PropTypes.shape({
    isMobile: PropTypes.bool,
    android: PropTypes.bool,
    ios: PropTypes.bool,
    blackberry: PropTypes.bool,
    opera: PropTypes.bool,
    safari: PropTypes.bool,
    windows: PropTypes.bool,
    standaloneMode: PropTypes.bool
});
