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
class UrlRewritesQuery {
    /**
     * get UrlRewrites query
     * @param  {{urlParam: String}} options A object containing different aspects of query, each item can be omitted
     * @return {Field} UrlRewrites query
     * @memberof UrlRewritesQuery
     */
    getQuery(options) {
        const { urlParam } = options;

        return new Field('urlResolver')
            .addArgument('url', 'String!', urlParam)
            .addField('id')
            .addField('type')
            .addField('canonical_url')
            .addField('url_key');
    }
}

export { UrlRewritesQuery };

export default new UrlRewritesQuery();
