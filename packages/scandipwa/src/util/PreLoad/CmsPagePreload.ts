/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { CmsPageQueryOptions } from 'Query/CmsPage.type';
import CmsDispatcher from 'Store/Cms/Cms.dispatcher';
import getStore from 'Util/Store';

/** @namespace Util/PreLoad/CmsPagePreload */
export class CmsPagePreload {
    options: Partial<CmsPageQueryOptions> = {
        id: window.actionName?.id,
        identifier: window.actionName?.identifier,
    };

    preloadCms() {
        CmsDispatcher.handleData(getStore().dispatch, this.options);
    }
}

export default new CmsPagePreload();
