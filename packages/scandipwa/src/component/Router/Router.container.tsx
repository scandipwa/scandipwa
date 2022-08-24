/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
<<<<<<< HEAD:packages/scandipwa/src/component/Router/Router.container.tsx
 * @package scandipwa/scandipwa
=======
 * @package scandipwa/scandipwa
>>>>>>> scandipwa/master:packages/scandipwa/src/component/Router/Router.container.js
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { updateConfigDevice } from 'Store/Config/Config.action';
import { updateMeta } from 'Store/Meta/Meta.action';
<<<<<<< HEAD:packages/scandipwa/src/component/Router/Router.container.tsx
import { ReactElement } from 'Type/Common.type';
import { history } from 'Util/History';
=======
import { setBigOfflineNotice } from 'Store/Offline/Offline.action';
import { MetaTitleType } from 'Type/Common.type';
>>>>>>> scandipwa/master:packages/scandipwa/src/component/Router/Router.container.js
import {
    isMobile,
    isMobileClientHints,
    isUsingClientHints
} from 'Util/Mobile';
import { RootState } from 'Util/Store/Store.type';

import Router from './Router.component';
<<<<<<< HEAD:packages/scandipwa/src/component/Router/Router.container.tsx
import {
    RouterComponentProps, RouterContainerMapDispatchProps, RouterContainerMapStateProps, RouterContainerProps
} from './Router.type';
=======
import { URL_ONLY_MAIN_ITEMS_RENDER } from './Router.config';
>>>>>>> scandipwa/master:packages/scandipwa/src/component/Router/Router.container.js

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
    base_link_url: state.ConfigReducer.base_link_url
});

/** @namespace Component/Router/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): RouterContainerMapDispatchProps => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    updateConfigDevice: (device) => dispatch(updateConfigDevice(device)),
    setBigOfflineNotice: (isBig) => dispatch(setBigOfflineNotice(isBig)),
    init: async () => {
        ConfigDispatcher.then(
            ({ default: dispatcher }) => dispatcher.handleData(dispatch, undefined)
        );

        const { default: dispatcher } = await MyAccountDispatcher;

        await dispatcher.handleCustomerDataOnInit(dispatch);

        WishlistDispatcher.then(
            ({ default: dispatcher }) => dispatcher.updateInitialWishlistData(dispatch)
        );
        CartDispatcher.then(
            ({ default: dispatcher }) => dispatcher.updateInitialCartData(dispatch)
        );
        ProductCompareDispatcher.then(
            ({ default: dispatcher }) => dispatcher.updateInitialProductCompareData(dispatch)
        );
    }
});

/** @namespace Component/Router/Container */
<<<<<<< HEAD:packages/scandipwa/src/component/Router/Router.container.tsx
export class RouterContainer extends PureComponent<RouterContainerProps> {
    static defaultProps: Partial<RouterContainerProps> = {
=======
export class RouterContainer extends PureComponent {
    static propTypes = {
        init: PropTypes.func.isRequired,
        updateMeta: PropTypes.func.isRequired,
        updateConfigDevice: PropTypes.func.isRequired,
        setBigOfflineNotice: PropTypes.func.isRequired,
        base_link_url: PropTypes.string,
        default_description: PropTypes.string,
        default_keywords: PropTypes.string,
        default_title: PropTypes.string,
        title_prefix: PropTypes.string,
        title_suffix: PropTypes.string,
        isLoading: PropTypes.bool,
        isBigOffline: PropTypes.bool,
        meta_title: MetaTitleType,
        status_code: PropTypes.string
    };

    static defaultProps = {
>>>>>>> scandipwa/master:packages/scandipwa/src/component/Router/Router.container.js
        base_link_url: '',
        default_description: '',
        default_keywords: '',
        default_title: '',
        title_prefix: '',
        title_suffix: '',
        isLoading: true,
        isBigOffline: false,
        meta_title: '',
        status_code: ''
    };

    __construct(props: RouterContainerProps): void {
        super.__construct?.(props);

        this.state = ({
            currentUrl: window.location.pathname,
            isOnlyMainItems: this.handleCheckIfOnlyMainItemsRender()
        });

        this.initializeApplication();
        this.redirectFromPartialUrl();
        this.handleResize();
<<<<<<< HEAD:packages/scandipwa/src/component/Router/Router.container.tsx

        this.handleResize = this.handleResize.bind(this);
=======
        this.handleCheckIfOnlyMainItemsRender();
>>>>>>> scandipwa/master:packages/scandipwa/src/component/Router/Router.container.js
    }

    componentDidMount(): void {
        window.addEventListener('resize', this.handleResize);
    }

    componentDidUpdate(prevProps: RouterContainerProps): void {
        const { isLoading, updateMeta } = this.props;
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
                status_code
            } = this.props;

            updateMeta({
                default_title,
                title: meta_title || default_title,
                default_description,
                description: default_description,
                default_keywords,
                keywords: default_keywords,
                title_prefix,
                title_suffix,
                status_code
            });
        }
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.handleResize);
    }

    async handleResize(): Promise<void> {
        const { updateConfigDevice } = this.props;

        if (isUsingClientHints) {
            const { platform, model } = await isMobileClientHints.getDeviceData();

            updateConfigDevice({
                isMobile: isMobile.any(),
                android: isMobile.android(platform),
                ios: isMobile.iOS(platform),
                blackberry: isMobile.blackBerry(model),
                opera: isMobile.opera(model),
                safari: isMobile.safari(model),
                windows: isMobile.windows(model)
            });
        } else {
            updateConfigDevice({
                isMobile: isMobile.any(),
                android: isMobile.android(),
                ios: isMobile.iOS(),
                blackberry: isMobile.blackBerry(),
                opera: isMobile.opera(),
                safari: isMobile.safari(),
                windows: isMobile.windows()
            });
        }
    }

<<<<<<< HEAD:packages/scandipwa/src/component/Router/Router.container.tsx
    containerProps(): Pick<RouterComponentProps, 'isBigOffline'> {
        const { isBigOffline } = this.props;
=======
    handleCheckIfOnlyMainItemsRender() {
        const { pathname } = location;

        if (URL_ONLY_MAIN_ITEMS_RENDER.find((url) => pathname.includes(url))) {
            return true;
        }

        return false;
    }

    setRenderAllItems() {
        this.setState({ isOnlyMainItems: false });
    }

    setRenderOnlyMainItems() {
        this.setState({ isOnlyMainItems: true });
    }

    containerProps() {
        const { isBigOffline, setBigOfflineNotice } = this.props;
        const { isOnlyMainItems, currentUrl } = this.state;
>>>>>>> scandipwa/master:packages/scandipwa/src/component/Router/Router.container.js

        return {
            isBigOffline,
            setBigOfflineNotice,
            isOnlyMainItems,
            currentUrl
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
