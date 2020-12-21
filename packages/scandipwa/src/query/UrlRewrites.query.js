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

import { Field } from 'Util/Query';
/**
 * UrlRewrites Query
 * @class UrlRewritesQuery
 * @namespace Query/UrlRewrites
 */
export class UrlRewritesQuery {
    getQuery({ urlParam }) {
        return new Field('urlResolver')
            .addArgument('url', 'String!', urlParam)
            .addFieldList(this._getUrlResolverFields());
    }

    _getUrlResolverFields() {
        return [
            'id',
            'sku',
            'type'
        ];
    }
}

export default new UrlRewritesQuery();
