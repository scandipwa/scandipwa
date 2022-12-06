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

import {
    Directions,
} from 'Component/ChevronIcon/ChevronIcon.config';
import { SortDirections } from 'Route/CategoryPage/CategoryPage.config';

// Support for comtabilitiy

export const DirectionType = PropTypes.oneOf([Directions.RIGHT, Directions.LEFT, Directions.TOP, Directions.BOTTOM]);

export const SortDirectionType = PropTypes.oneOf(Object.values(SortDirections));
