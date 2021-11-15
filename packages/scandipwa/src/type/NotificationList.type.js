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

export const NotificationType = PropTypes.shape({
    msgText: PropTypes.string,
    msgType: PropTypes.string,
    msgDebug: PropTypes.arrayOf(
        PropTypes.shape({
            message: PropTypes.string,
            extensions: PropTypes.shape({
                category: PropTypes.string
            }),
            locations: PropTypes.arrayOf(PropTypes.shape({
                line: PropTypes.number,
                column: PropTypes.number
            })),
            path: PropTypes.arrayOf(PropTypes.string)
        })
    )
});

export const NotificationListType = PropTypes.objectOf(NotificationType);
