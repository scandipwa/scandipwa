/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { CategoryDisplayMode } from 'Route/CategoryPage/CategoryPage.config';
import { IndexedProduct } from 'Util/Product/Product.type';

export interface HistoryState {
    title?: string;
    category?: number | boolean;
    categoryBanner?: string;
    categoryDescription?: string;
    displayMode?: CategoryDisplayMode;
    popupOpen?: boolean;
    page?: number | Partial<IndexedProduct> | undefined;
    product?: Partial<IndexedProduct>;
    isForgotPassword?: boolean;
    isFromLocked?: boolean;
    editPassword?: boolean;
    isFromEmailChange?: boolean;
    prevCategoryId?: number;
    stack?: string[];
    firstName?: string;
    lastName?: string;
    email?: string;
    overlayOpen?: boolean;
}
