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
 */
export class UrlRewritesQuery {
    getQuery({ urlParam }) {
        // FAILSAFE: Trim index.php if someone forgot to set "Use Web Server Rewrites" to "Yes"
        const trimmedParam = urlParam.replace('index.php/', '');

        return new Field('urlResolver')
            .addArgument('url', 'String!', trimmedParam)
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
