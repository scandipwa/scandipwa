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

import { Query } from '@tilework/opus';
import { Dispatch } from 'redux';

import CmsPageQuery from 'Query/CmsPage.query';
import { CmsPageFields, CmsPageQueryOptions } from 'Query/CmsPage.type';
import { updateNoMatch } from 'Store/NoMatch/NoMatch.action';
import { QueryDispatcher } from 'Util/Request';

import { updateCmsPage, updateCmsPageLoading } from './Cms.action';
import { CmsDispatcherData } from './Cms.type';

/**
 * Cms Page Dispatcher
 * @class CmsDispatcher
 * @extends CmsDispatcher
 * @namespace Store/Cms/Dispatcher */
export class CmsDispatcher extends QueryDispatcher<Partial<CmsPageQueryOptions>, CmsDispatcherData> {
    __construct(): void {
        super.__construct('CmsPage');
    }

    onSuccess(data: CmsDispatcherData, dispatch: Dispatch): void {
        const { cmsPage } = data;

        dispatch(updateCmsPage(cmsPage));
    }

    onError(_: unknown, dispatch: Dispatch): void {
        dispatch(updateCmsPageLoading(false));
        dispatch(updateNoMatch(true));
    }

    prepareRequest(options: Partial<CmsPageQueryOptions>, dispatch: Dispatch): Query<'cmsPage', CmsPageFields> {
        dispatch(updateCmsPageLoading(true));

        return CmsPageQuery.getQuery(options);
    }
}

export default new CmsDispatcher();
