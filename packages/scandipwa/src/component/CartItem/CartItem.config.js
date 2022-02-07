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

import { STOCK_TYPE } from 'Component/Product/Stock.config';

export const STATUS = {
    ok: 'STATUS_OK',
    qty: 'ERR_QTY',
    stock: STOCK_TYPE.OUT_OF_STOCK
};

export default STATUS;
