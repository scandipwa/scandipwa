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

import { QueryDispatcher } from 'Util/Request';
import { CmsPageQuery } from 'Query';
import { updateNoMatch } from 'Store/NoMatch';
import { updateCmsPage } from 'Store/CmsPage';
/**
 * CMS Page Dispatcher
 * @class CmsPageDispatcher
 * @extends QueryDispatcher
 */
export class CmsPageDispatcher extends QueryDispatcher {
    constructor() {
        super('CmsPage');
    }

    onSuccess({ cmsPage }, dispatch) {
        dispatch(updateCmsPage(cmsPage, false));
    }

    onError(_, dispatch) {
        dispatch(updateNoMatch(true));
    }

    /**
     * Prepare CMS Page query
     * @param {{url_key: String, title: Int, content: String, content_heading: String, page_layout: String, meta_title: String, meta_description: String, meta_keywords, string}} options A object containing different aspects of query, each item can be omitted
     * @return {Query} CMS Page query
     * @memberof CmsPageDispatcher
     */
    prepareRequest(options, dispatch) {
        dispatch(updateCmsPage({}, true));
        return CmsPageQuery.getQuery(options);
    }
}

export default new CmsPageDispatcher();
