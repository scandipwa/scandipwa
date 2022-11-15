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

import UrlRewritesQuery from 'Query/UrlRewrites.query';
import { UrlRewritesQueryOptions } from 'Query/UrlRewrites.type';
import { updateNoMatch } from 'Store/NoMatch/NoMatch.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { setIsUrlRewritesLoading, updateUrlRewrite } from 'Store/UrlRewrites/UrlRewrites.action';
import { NetworkError } from 'Type/Common.type';
import { fetchCancelableQuery, isAbortError } from 'Util/Request/BroadCast';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import { UrlRewritesDispatcherData } from './UrlRewrites.type';

/**
 * Url Rewrite Dispathcer
 * @class UrlRewritesDispatcher
 * @extends RequestDispatcher
 * @namespace Store/UrlRewrites/Dispatcher
 */
export class UrlRewritesDispatcher extends SimpleDispatcher {
    processUrlOptions(options: UrlRewritesQueryOptions): UrlRewritesQueryOptions {
        const { urlParam } = options;

        // FAILSAFE: Trim index.php if someone forgot to set "Use Web Server Rewrites" to "Yes"
        const trimmedParam = urlParam.replace('index.php/', '');

        return {
            ...options,
            urlParam: trimmedParam.replace(new RegExp(window.storeRegexText), ''),
        };
    }

    async getUrlRewrites(
        options: UrlRewritesQueryOptions,
    ) {
        const { urlParam } = options;
        const rawQueries = UrlRewritesQuery.getQuery(this.processUrlOptions(options));

        this.dispatch(setIsUrlRewritesLoading(true));

        try {
            const { urlResolver } = await fetchCancelableQuery<UrlRewritesDispatcherData>(rawQueries, 'UrlRewrites');

            this.dispatch(updateUrlRewrite(urlResolver || { notFound: true }, urlParam));
            this.dispatch(updateNoMatch(!urlResolver));
        } catch (err) {
            if (!isAbortError(err as NetworkError)) {
                this.dispatch(updateUrlRewrite({ notFound: true }, urlParam));
                this.dispatch(updateNoMatch(true));
                this.dispatch(showNotification(NotificationType.ERROR, __('Error fetching URL-rewrites!'), err));
            }
        }
    }
}

export default new UrlRewritesDispatcher();
