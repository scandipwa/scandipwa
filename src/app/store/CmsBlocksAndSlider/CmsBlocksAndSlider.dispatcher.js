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
import { CmsBlockQuery, HomeSlider } from 'Query';
import { showNotification } from 'Store/Notification';
import { updateCmsBlocks, updateSlider } from 'Store/CmsBlocksAndSlider';

/**
 * CMS Blocks And Slider Dispatcher
 * @class CmsBlocksAndSliderDispatcher
 * @extends QueryDispatcher
 */
export class CmsBlocksAndSliderDispatcher extends QueryDispatcher {
    constructor() {
        super('CmsBlocksAndSlider', 86400);
    }

    onSuccess(data, dispatch) {
        dispatch(updateSlider(data.slider));
        dispatch(updateCmsBlocks(data.cmsBlocks));
    }

    onError(error, dispatch) {
        dispatch(showNotification('error', 'Error fetching CMS Block!', error));
    }

    isSliderRequested({ sliderId }) {
        return !!sliderId;
    }

    /**
     * Prepare CMS Block and Slider query
     * @param {{identifires: Array, fields: Array, sliderId: number}} options An object containing different aspects of query, each item can be omitted
     * @return {Query} CMS Block and Slider query
     * @memberof CmsBlocksAndSliderDispatcher
     */
    prepareRequest(options) {
        return this.isSliderRequested(options)
            ? [HomeSlider.getQuery(options), CmsBlockQuery.getQuery(options)]
            : [CmsBlockQuery.getQuery(options)];
    }
}

export default new CmsBlocksAndSliderDispatcher();
