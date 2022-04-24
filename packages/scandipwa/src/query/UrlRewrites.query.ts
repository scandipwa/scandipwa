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
import { Field, Query } from '@tilework/opus';

import { GQLUrlRewriteEntityTypeEnum } from 'Type/Graphql.type';

import {
    EntityUrl,
    UrlRewritesOutput,
    UrlRewritesQueryOptions
} from './UrlRewrites.type';

/**
 * UrlRewrites Query
 * @class UrlRewritesQuery
 * @namespace Query/UrlRewrites/Query */
export class UrlRewritesQuery {
    getQuery({ urlParam }: UrlRewritesQueryOptions): Query<'urlResolver', {
        sku: string;
        type: EntityUrl;
    }> {
        return new Query<'urlResolver', UrlRewritesOutput>('urlResolver')
            .addArgument('url', 'String!', urlParam)
            .addFieldList(this._getUrlResolverFields());
    }

    _getUrlResolverFields(): Array<
    Field<'sku', string>
    | Field<'type', GQLUrlRewriteEntityTypeEnum>
    > {
        return [
            new Field<'sku', string>('sku'),
            new Field<'type', GQLUrlRewriteEntityTypeEnum>('type')
        ];
    }
}

export default new UrlRewritesQuery();
