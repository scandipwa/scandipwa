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

import {
    BreadcrumbsActionType,
    BreadcrumbsStore,
    UpdateBreadcrumbsActionStore,
} from './Breadcrumbs.type';

/** @namespace Store/Breadcrumbs/Action/updateBreadcrumbsStore */
export const updateBreadcrumbsStore = (state: Partial<BreadcrumbsStore>): UpdateBreadcrumbsActionStore => ({
    type: BreadcrumbsActionType.UPDATE_BREADCRUMBS_STORE,
    state,
});
