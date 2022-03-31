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

import { UrlRewrite } from 'Type/Router.type';

/**
 * UrlRewrites Query
 * @class UrlRewritesQuery
 * @namespace Query/UrlRewrites/Query */
export class UrlRewritesQuery {
    getQuery({ urlParam }: { urlParam: string }): UrlRewrite {
        return new Query('urlResolver')
            .addArgument('url', 'String!', urlParam)
            .addFieldList(this._getUrlResolverFields());
    }

    _getUrlResolverFields(): Array<string | Field<string, unknown>> {
        return [
            'sku',
            'type'
        ];
    }
}

export default new UrlRewritesQuery();
