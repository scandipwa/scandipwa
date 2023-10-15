/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */
import { Field, Query } from '@tilework/opus';

import { CategoryDisplayMode } from 'Route/CategoryPage/CategoryPage.config';
import { GQLUrlRewriteEntityTypeEnum } from 'Type/Graphql.type';

import {
    UrlRewritesOutput,
    UrlRewritesQueryOptions,
} from './UrlRewrites.type';

/**
 * UrlRewrites Query
 * @class UrlRewritesQuery
 * @namespace Query/UrlRewrites/Query */
export class UrlRewritesQuery {
    getQuery({ urlParam }: UrlRewritesQueryOptions): Query<'urlResolver', {
        sku: string;
        type: GQLUrlRewriteEntityTypeEnum;
        id: number;
        display_mode: CategoryDisplayMode;
        sort_by: string;
    }> {
        return new Query<'urlResolver', UrlRewritesOutput>('urlResolver')
            .addArgument('url', 'String!', urlParam)
            .addFieldList(this._getUrlResolverFields());
    }

    _getUrlResolverFields(): Array<
    Field<'sku', string>
    | Field<'type', GQLUrlRewriteEntityTypeEnum>
    | Field<'id', number>
    | Field<'display_mode', CategoryDisplayMode>
    | Field<'sort_by', string>
    > {
        return [
            new Field<'sku', string>('sku'),
            new Field<'type', GQLUrlRewriteEntityTypeEnum>('type'),
            new Field<'id', number>('id'),
            new Field<'display_mode', CategoryDisplayMode>('display_mode'),
            new Field<'sort_by', string>('sort_by'),
        ];
    }
}

export default new UrlRewritesQuery();
