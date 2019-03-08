import { RequestDispatcher } from 'Util/Request';
import { MenuQuery, CmsBlockQuery } from 'Query';
import { showNotification } from 'Store/Notification';
import { updateMenu } from 'Store/HeaderAndFooter';
import { updateCmsBlocks } from 'Store/CmsBlocksAndSlider';

class HeaderAndFooterDispatcher extends RequestDispatcher {
    constructor() {
        super('HeaderAndFooter', 86400);
    }

    onSuccess({ menu, cmsBlocks }, dispatch) {
        dispatch(updateMenu(menu));
        dispatch(updateCmsBlocks(cmsBlocks));
    }

    onError(error, dispatch) {
        dispatch(showNotification('error', 'Error fetching Menu!', error));
    }

    /**
     * Prepare Header and Footer requests
     * @param {{ menuId: String }} options A object containing different aspects of query, each item can be omitted
     * @return {Query} Menu query
     * @memberof HeaderAndFooterDispatcher
     */
    prepareRequest(options) {
        return [MenuQuery.getQuery(options.menu),
            CmsBlockQuery.getQuery(options.footer)];
    }
}

export default new HeaderAndFooterDispatcher();
