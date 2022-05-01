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

import { createBrowserHistory } from 'history';

import { HistoryState } from './History.type';

export const history = createBrowserHistory<HistoryState>({ basename: '/' });
export default history;
