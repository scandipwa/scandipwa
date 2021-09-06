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

import { IN_STOCK, OUT_OF_STOCK } from 'Component/ProductCard/ProductCard.config';

// eslint-disable-next-line import/prefer-default-export
export const StockStatusType = PropTypes.oneOf([
    IN_STOCK,
    OUT_OF_STOCK
]);
