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

import {
    BOTTOM,
    LEFT,
    RIGHT,
    TOP
} from 'Component/ChevronIcon/ChevronIcon.config';
import { SORT_DIRECTION_TYPE } from 'Route/CategoryPage/CategoryPage.config';

export const DirectionType = PropTypes.oneOf([RIGHT, LEFT, TOP, BOTTOM]);

export const SortDirectionType = PropTypes.oneOf(Object.values(SORT_DIRECTION_TYPE));
