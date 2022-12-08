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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ReactElement } from 'Type/Common.type';
import history from 'Util/History';
import { RootState } from 'Util/Store/Store.type';

import UrlRewrites from './UrlRewrites.component';
import {
    UrlRewritePageType,
} from './UrlRewrites.config';
import {
    UrlRewriteProps,
    UrlRewritesComponentProps,
    UrlRewritesContainerMapDispatchProps,
    UrlRewritesContainerMapStateProps,
    UrlRewritesContainerProps,
    UrlRewritesContainerPropsKeys,
    UrlRewriteTypeSpecificProps,
} from './UrlRewrites.type';

export const UrlRewritesDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/UrlRewrites/UrlRewrites.dispatcher'
);

export const NoMatchDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/NoMatch/NoMatch.dispatcher'
);

/** @namespace Route/UrlRewrites/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): UrlRewritesContainerMapStateProps => ({
    urlRewrite: state.UrlRewritesReducer.urlRewrite,
    isLoading: state.UrlRewritesReducer.isLoading,
    requestedUrl: state.UrlRewritesReducer.requestedUrl,
});

/** @namespace Route/UrlRewrites/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): UrlRewritesContainerMapDispatchProps => ({
    requestUrlRewrite: (urlParam) => {
        UrlRewritesDispatcher.then(
            ({ default: dispatcher }) => dispatcher.handleData(dispatch, { urlParam }),
        );
    },
});

/** @namespace Route/UrlRewrites/Container */
export class UrlRewritesContainer extends PureComponent<UrlRewritesContainerProps> {
    static defaultProps: Partial<UrlRewritesContainerProps> = {
        requestedUrl: '',
    };

    static stateMapping = {
        category: UrlRewritePageType.CATEGORY,
        product: UrlRewritePageType.PRODUCT,
        page: UrlRewritePageType.CMS_PAGE,
    };

    initialUrl = '';

    componentDidMount(): void {
        this.requestUrlRewrite();

        this.initialUrl = location.pathname;
    }

    componentDidUpdate(): void {
        const { isLoading } = this.props;

        /**
         * If the latest requested URL rewrite is not related
         * to the current location, and the URL rewrites are not loading
         * request new URL rewrite.
         */
        if (this.getIsLoading() && !isLoading) {
            this.requestUrlRewrite();
        }

        /**
         * Make sure that PDP & PLP url don't have "/" in the end
         */
        this.redirectToCorrectUrl();
    }

    redirectToCorrectUrl(): void {
        const { location } = history;

        const type = this.getType();

        if (type in [UrlRewritePageType.CATEGORY, UrlRewritePageType.PRODUCT]) {
            if (location.pathname.endsWith('/')) {
                history.replace(
                    location.pathname.slice(0, -1),
                );
            }
        }
    }

    containerProps(): Pick<UrlRewritesComponentProps, UrlRewritesContainerPropsKeys> {
        return {
            type: this.getType(),
            props: this.getProps(),
        };
    }

    getTypeSpecificProps(): Partial<UrlRewriteTypeSpecificProps> {
        const {
            urlRewrite: {
                id,
                sku,
                display_mode,
            },
        } = this.props;

        const isLoading = this.getIsLoading();

        switch (this.getType()) {
        case UrlRewritePageType.PRODUCT:
            /**
                 * In case we are not yet sure what product ID it is:
                 * - check if there is a hint in browser history
                 * - fallback to none
                 */
            if (isLoading) {
                // TODO: history.state.state looks like undefined all the time.
                const product = history?.location?.state?.product;

                if (product) {
                    const { sku: historySKU, id } = product;

                    return { productSKU: historySKU, id };
                }

                return {};
            }

            return { productSKU: sku, id };
        case UrlRewritePageType.CMS_PAGE:
            if (isLoading) {
                return { isOnlyPlaceholder: true };
            }

            return { pageIds: id };
        case UrlRewritePageType.CATEGORY:
            /**
                 * In case we are not yet sure what category ID it is:
                 * - check if there is a hint in browser history
                 * - fallback to none
                 */
            if (isLoading) {
                // TODO: history.state.state looks like undefined all the time.
                const category = history?.location?.state?.category;
                const displayMode = history?.location?.state?.displayMode;

                if (category && category !== true) {
                    return {
                        categoryIds: category,
                        displayMode,
                    };
                }

                return {};
            }

            return {
                categoryIds: id,
                displayMode: display_mode,
            };
        case UrlRewritePageType.NOTFOUND:
        default:
            return {};
        }
    }

    getIsLoading(): boolean {
        const { requestedUrl } = this.props;

        return location.pathname !== requestedUrl;
    }

    getProps(): UrlRewriteProps {
        const {
            match,
        } = this.props;

        return {
            match,
            ...this.getTypeSpecificProps(),
        };
    }

    getFallbackType(): string {
        const {
            actionName: { type: initialType = '' } = {},
        } = window;

        if (this.initialUrl === location.pathname) {
            return initialType;
        }

        return '';
    }

    getType(): UrlRewritePageType | string {
        const { urlRewrite: { type, notFound } } = this.props;

        /**
         * If the URL rewrite is loading, prefer state-defined URL type,
         * else fallback to one defined in HTML document by PHP controller
         * (which is only valid for 1st load).
         */
        if (this.getIsLoading()) {
            // TODO: history.state.state looks like undefined all the time.
            const state = history?.location?.state || {};
            const typeKey = Object.keys(state).find((key) => key in UrlRewritesContainer.stateMapping);

            if (typeKey) {
                return UrlRewritesContainer.stateMapping[ typeKey as keyof typeof UrlRewritesContainer.stateMapping];
            }

            /**
             * Otherwise fallback to other guessed types - from window i.e.
             */
            return this.getFallbackType();
        }

        if (notFound) {
            return UrlRewritePageType.NOTFOUND;
        }

        if (type) {
            return type;
        }

        return '';
    }

    requestUrlRewrite(): void {
        const { requestUrlRewrite } = this.props;

        return requestUrlRewrite(location.pathname);
    }

    render(): ReactElement {
        return (
            <UrlRewrites
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UrlRewritesContainer);
