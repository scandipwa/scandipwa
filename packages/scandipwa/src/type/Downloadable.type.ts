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

export const DownloadableLinkType = PropTypes.shape({
    sample_url: PropTypes.string,
    sort_order: PropTypes.number,
    title: PropTypes.string,
    id: PropTypes.number,
    uid: PropTypes.string,
    price: PropTypes.number,
});

export const DownloadableLinksType = PropTypes.oneOfType([PropTypes.arrayOf(DownloadableLinkType), PropTypes.string]);
