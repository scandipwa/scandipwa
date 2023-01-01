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

import { Category } from 'Query/Category.type';

export interface CategoryDetailsComponentProps {
    category: Partial<Category>;
    isCurrentCategoryLoaded: boolean;
}

export interface CategoryDetailsComponentState {}
