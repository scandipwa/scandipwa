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

export const SlideType = PropTypes.shape({
    slide_id: PropTypes.string,
    image: PropTypes.string,
    slide_text: PropTypes.string
});

export const SliderType = PropTypes.shape({
    slider_id: PropTypes.string,
    slides: PropTypes.arrayOf(SlideType)
});
