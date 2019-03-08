import { RequestDispatcher } from 'Util/Request';
import { CmsPageQuery } from 'Query';
import { updateNoMatch } from 'Store/NoMatch';
import { updateCmsPage } from 'Store/CmsPage';
/**
 * CMS Page Dispatcher
 * @class CmsPageDispatcher
 * @extends RequestDispatcher
 */
class CmsPageDispatcher extends RequestDispatcher {
    constructor() {
        super('CmsPage', 86400);
    }

    onSuccess(data, dispatch) {
        dispatch(updateCmsPage(data.cmsPage));
    }

    onError(error, dispatch) {
        dispatch(updateNoMatch(true));
    }

    /**
     * Prepare CMS Page query
     * @param {{url_key: String, title: Int, content: String, content_heading: String, page_layout: String, meta_title: String, meta_description: String, meta_keywords, string}} options A object containing different aspects of query, each item can be omitted
     * @return {Query} CMS Page query
     * @memberof CmsPageDispatcher
     */
    prepareRequest(options, dispatch) {
        dispatch(updateCmsPage({}));
        return CmsPageQuery.getQuery(options);
    }
}

export default new CmsPageDispatcher();
