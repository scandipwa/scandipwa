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

export const PageType = PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    meta_title: PropTypes.string,
    meta_description: PropTypes.string,
    meta_keywords: PropTypes.string
});

export const BlockType = PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string
});

export const BlockListType = PropTypes.shape({
    items: PropTypes.objectOf(BlockType)
});
