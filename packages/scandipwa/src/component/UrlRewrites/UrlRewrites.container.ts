/* eslint-disable no-use-before-define */
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

import { useEffect } from 'react';
import { match as Match, useHistory, useLocation } from 'react-router-dom';
import { useAppSelector } from 'src/hooks';

import { useUrlRewritesStore } from 'Store/UrlRewrites';
import { renderHOC } from 'Util/RenderHOC';
import { RootState } from 'Util/Store/type';

import { UrlRewritesComponent, UrlRewritesProps, UrlRewritesTypes } from './UrlRewrites.component';
import {
    TYPE_CATEGORY,
    TYPE_CMS_PAGE,
    TYPE_NOTFOUND,
    TYPE_PRODUCT
} from './UrlRewrites.config';

/** @namespace Component/UrlRewrites/Container/mapStateToProps */
export const urlRewritesSelector = (state: RootState) => ({
    urlRewrite: state.UrlRewritesReducer.urlRewrite,
    isLoading: state.UrlRewritesReducer.isLoading,
    requestedUrl: state.UrlRewritesReducer.requestedUrl
});

export interface UrlRewritesExternalProps {
    match: Match
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental,@scandipwa/scandipwa-guidelines/export-level-one,prefer-const
let initialUrl = location.pathname;

export const stateMapping: { [key: string]: UrlRewritesTypes } = {
    category: TYPE_CATEGORY,
    product: TYPE_PRODUCT,
    page: TYPE_CMS_PAGE
};

export const urlRewritesLogic = (props: UrlRewritesExternalProps): UrlRewritesProps => {
    const { match } = props;
    const history = useHistory();
    const location = useLocation();

    const {
        isLoading,
        urlRewrite,
        requestedUrl = ''
    } = useAppSelector(urlRewritesSelector);
    const { requestUrlRewrite } = useUrlRewritesStore();

    const getIsLoading = () => location.pathname !== requestedUrl;
    const redirectToCorrectUrl = () => {
        const type = getType();
        if ([TYPE_CATEGORY, TYPE_PRODUCT].includes(type)) {
            if (location.pathname.endsWith('/')) {
                history.replace(
                    location.pathname.slice(0, -1),
                    location.state
                );
            }
        }
    };
    const getType = (): UrlRewritesTypes => {
        const { type, notFound } = urlRewrite;

        /**
         * If the URL rewrite is loading, prefer state-defined URL type,
         * else fallback to one defined in HTML document by PHP controller
         * (which is only valid for 1st load).
         */
        if (getIsLoading()) {
            const state = (<Record<string, unknown>>location?.state)?.state || <Record<string, unknown>>{};
            const typeKey = Object.keys(state as Record<string, unknown>)
                .find((key) => key in stateMapping) as keyof typeof stateMapping | undefined;

            if (typeKey) {
                return stateMapping[typeKey];
            }

            /**
             * Otherwise fallback to other guessed types - from window i.e.
             */
            return getFallbackType();
        }

        if (notFound) {
            return TYPE_NOTFOUND;
        }

        if (type) {
            return type as UrlRewritesTypes;
        }

        return '';
    };

    const getTypeSpecificProps = () => {
        const { id, sku } = urlRewrite;

        const isLoading = getIsLoading();

        switch (getType()) {
        case TYPE_PRODUCT:
            /**
             * In case we are not yet sure what product ID it is:
             * - check if there is a hint in browser history
             * - fallback to none
             */
            if (isLoading) {
                const product = (location.state as { state?: { product: { id: string, sku: string } } }).state?.product;

                if (product) {
                    const { sku: historySKU, id } = product;

                    return { productSKU: historySKU, id };
                }

                return {};
            }

            return { productSKU: sku, id };
        case TYPE_CMS_PAGE:
            if (isLoading) {
                return { isOnlyPlaceholder: true };
            }

            return { pageIds: Number(id) };
        case TYPE_CATEGORY:
            /**
             * In case we are not yet sure what category ID it is:
             * - check if there is a hint in browser history
             * - fallback to none
             */
            if (isLoading) {
                const category = (
                    location.state as { state?: { category: { id: string, sku: string } | boolean } }
                ).state?.category;

                if (category && category !== true) {
                    return { categoryIds: Number(category.id) };
                }

                return {};
            }

            return { categoryIds: Number(id) };
        case TYPE_NOTFOUND:
        default:
            return {};
        }
    };

    const getFallbackType = (): UrlRewritesTypes => {
        const {
            actionName: { type: initialType = '' } = {}
        } = window;

        if (initialUrl === location.pathname) {
            return initialType as UrlRewritesTypes;
        }

        return '';
    };

    useEffect(() => {
        requestUrlRewrite();
    }, [location.pathname]);

    useEffect(() => {
        initialUrl = location.pathname;
    }, [location.pathname]);

    useEffect(() => {
        /**
         * If the latest requested URL rewrite is not related
         * to the current location, and the URL rewrites are not loading
         * request new URL rewrite.
         */
        if (getIsLoading() && !isLoading) {
            requestUrlRewrite();
        }

        /**
         * Make sure that PDP & PLP url don't have "/" in the end
         */
        redirectToCorrectUrl();
    }, [isLoading]);

    return {
        match,
        type: getType(),
        ...getTypeSpecificProps()
    };
};

export const UrlRewrites = renderHOC(UrlRewritesComponent, urlRewritesLogic, 'UrlRewrites');
