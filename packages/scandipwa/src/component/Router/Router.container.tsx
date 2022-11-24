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

import { updateConfigStore } from 'Store/Config/Config.action';
import { updateMetaStore } from 'Store/Meta/Meta.action';
import { updateOfflineStore } from 'Store/Offline/Offline.action';
import { ReactElement } from 'Type/Common.type';
import { history } from 'Util/History';
import {
    isMobile,
    isMobileClientHints,
    isUsingClientHints,
} from 'Util/Mobile';
import { RootState } from 'Util/Store/Store.type';

import Router from './Router.component';
import { URL_ONLY_MAIN_ITEMS_RENDER } from './Router.config';
import {
    RouterComponentProps,
    RouterContainerMapDispatchProps,
    RouterContainerMapStateProps,
    RouterContainerProps,
    RouterContainerPropsKeys,
    RouterContainerState,
} from './Router.type';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);
export const ConfigDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Config/Config.dispatcher'
);
export const WishlistDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Wishlist/Wishlist.dispatcher'
);
export const ProductCompareDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/ProductCompare/ProductCompare.dispatcher'
);
export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Component/Router/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): RouterContainerMapStateProps => ({
    isLoading: state.ConfigReducer.isLoading,
    default_description: state.ConfigReducer.default_description,
    default_keywords: state.ConfigReducer.default_keywords,
    default_title: state.ConfigReducer.default_title,
    title_prefix: state.ConfigReducer.title_prefix,
    title_suffix: state.ConfigReducer.title_suffix,
    meta_title: state.MetaReducer.title,
    device: state.ConfigReducer.device,
    isOffline: state.OfflineReducer.isOffline,
    isBigOffline: state.OfflineReducer.isBig,
    status_code: state.MetaReducer.status_code,
    base_link_url: state.ConfigReducer.base_link_url,
});

/** @namespace Component/Router/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): RouterContainerMapDispatchProps => ({
    updateMetaStore: (state) => dispatch(updateMetaStore(state)),
    updateConfigState: (state) => dispatch(updateConfigStore(state)),
    updateOfflineStore: (state) => dispatch(updateOfflineStore(state)),
    init: async () => {
        ConfigDispatcher.then(
            ({ default: dispatcher }) => dispatcher.getConfigs(),
        );

        const { default: dispatcher } = await MyAccountDispatcher;

        await dispatcher.handleCustomerDataOnInit();

        WishlistDispatcher.then(
            ({ default: dispatcher }) => dispatcher.updateInitialWishlistData(),
        );
        CartDispatcher.then(
            ({ default: dispatcher }) => dispatcher.updateInitialCartData(),
        );
        ProductCompareDispatcher.then(
            ({ default: dispatcher }) => dispatcher.updateInitialProductCompareData(),
        );
    },
});

/** @namespace Component/Router/Container */
export class RouterContainer extends PureComponent<RouterContainerProps, RouterContainerState> {
    static defaultProps: Partial<RouterContainerProps> = {
        base_link_url: '',
        default_description: '',
        default_keywords: '',
        default_title: '',
        title_prefix: '',
        title_suffix: '',
        isLoading: true,
        isBigOffline: false,
        meta_title: '',
        status_code: '',
    };

    __construct(props: RouterContainerProps): void {
        super.__construct?.(props);

        this.state = ({
            currentUrl: window.location.pathname,
            isOnlyMainItems: this.handleCheckIfOnlyMainItemsRender(),
        });

        this.initializeApplication();
        this.redirectFromPartialUrl();
        this.handleResize();

        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount(): void {
        window.addEventListener('resize', this.handleResize);
    }

    componentDidUpdate(prevProps: RouterContainerProps): void {
        const { isLoading, updateMetaStore } = this.props;
        const { isLoading: prevIsLoading } = prevProps;

        if (!this.handleCheckIfOnlyMainItemsRender()) {
            this.setRenderAllItems();
        } else {
            this.setRenderOnlyMainItems();
        }

        if (!isLoading && isLoading !== prevIsLoading) {
            const {
                default_description,
                default_keywords,
                default_title,
                title_prefix,
                title_suffix,
                meta_title,
                status_code,
            } = this.props;

            updateMetaStore({
                default_title,
                title: meta_title || default_title,
                default_description,
                description: default_description,
                default_keywords,
                keywords: default_keywords,
                title_prefix,
                title_suffix,
                status_code,
            });
        }
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.handleResize);
    }

    async handleResize(): Promise<void> {
        const { updateConfigState } = this.props;

        if (isUsingClientHints) {
            const { platform, model } = await isMobileClientHints.getDeviceData();

            updateConfigState(
                {
                    device: {
                        isMobile: isMobile.any(),
                        android: isMobile.android(platform),
                        ios: isMobile.iOS(platform),
                        blackberry: isMobile.blackBerry(model),
                        opera: isMobile.opera(model),
                        safari: isMobile.safari(model),
                        windows: isMobile.windows(model),
                    },
                },
            );
        } else {
            updateConfigState(
                {
                    device: {
                        isMobile: isMobile.any(),
                        android: isMobile.android(),
                        ios: isMobile.iOS(),
                        blackberry: isMobile.blackBerry(),
                        opera: isMobile.opera(),
                        safari: isMobile.safari(),
                        windows: isMobile.windows(),
                    },
                },
            );
        }
    }

    handleCheckIfOnlyMainItemsRender(): boolean {
        const { pathname } = location;

        if (URL_ONLY_MAIN_ITEMS_RENDER.find((url) => pathname.includes(url))) {
            return true;
        }

        return false;
    }

    setRenderAllItems(): void {
        this.setState({ isOnlyMainItems: false });
    }

    setRenderOnlyMainItems(): void {
        this.setState({ isOnlyMainItems: true });
    }

    containerProps(): Pick<RouterComponentProps, RouterContainerPropsKeys> {
        const { isBigOffline, updateOfflineStore } = this.props;
        const { isOnlyMainItems, currentUrl } = this.state;

        return {
            isBigOffline,
            updateOfflineStore,
            isOnlyMainItems,
            currentUrl,
        };
    }

    initializeApplication(): void {
        const { init } = this.props;

        init();
    }

    redirectFromPartialUrl(): void {
        const { base_link_url } = this.props;
        const { pathname: storePrefix } = new URL(base_link_url || window.location.origin);
        const { pathname } = location;

        if (storePrefix === '/') {
            return;
        }

        if (storePrefix.slice(0, -1) === pathname) {
            history.replace(storePrefix);
        }
    }

    render(): ReactElement {
        return (
            <Router
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterContainer);
