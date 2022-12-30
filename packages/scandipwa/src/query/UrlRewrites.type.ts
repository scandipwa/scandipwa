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
import { GQLUrlRewriteEntityTypeEnum } from 'Type/Graphql.type';

export interface UrlRewritesOutput {
    sku: string;
    type: GQLUrlRewriteEntityTypeEnum;
    id: number;
    display_mode: CategoryDisplayMode;
}

export interface UrlRewritesQueryOptions {
    urlParam: string;
}
