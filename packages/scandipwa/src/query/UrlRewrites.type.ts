/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { GQLUrlRewriteEntityTypeEnum } from 'Type/Graphql.type';

export interface EntityUrl {
    sku: string;
    type: GQLUrlRewriteEntityTypeEnum;
}

export interface UrlRewritesOutput {
    sku: string;
    type: EntityUrl;
}

export type UrlRewritesQueryOptions = {
    urlParam: string;
};
