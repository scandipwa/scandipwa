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

import { MetaTitleType } from 'Type/Common.type';

// Support for comtabilitiy

export const PageType = PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    meta_title: MetaTitleType,
    meta_description: PropTypes.string,
    meta_keywords: PropTypes.string,
});

export const BlockType = PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
});

export const BlockListType = PropTypes.shape({
    items: PropTypes.objectOf(BlockType),
});
