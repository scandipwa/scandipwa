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

import { StockStatus } from 'Component/Product/Stock.config';

// Support for comtabilitiy

// eslint-disable-next-line import/prefer-default-export
export const StockStatusType = PropTypes.oneOf(Object.values(StockStatus));
