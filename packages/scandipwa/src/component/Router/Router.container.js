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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { updateConfigDevice } from 'Store/Config/Config.action';
import { updateMeta } from 'Store/Meta/Meta.action';
import {
    isMobile,
    isMobileClientHints,
    isUsingClientHints
} from 'Util/Mobile';

import Router from './Router.component';

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
export const mapStateToProps = (state) => ({
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
    status_code: state.MetaReducer.status_code
});

/** @namespace Component/Router/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    updateConfigDevice: (device) => dispatch(updateConfigDevice(device)),
    init: () => {
        ConfigDispatcher.then(
            ({ default: dispatcher }) => dispatcher.handleData(dispatch)
        );
        MyAccountDispatcher.then(
            ({ default: dispatcher }) => dispatcher.handleCustomerDataOnInit(dispatch)
        );
        WishlistDispatcher.then(
            ({ default: dispatcher }) => dispatcher.updateInitialWishlistData(dispatch)
        );
        CartDispatcher.then(
            ({ default: dispatcher }) => dispatcher.updateInitialCartData(dispatch)
        );
    }
});

/** @namespace Component/Router/Container */
export class RouterContainer extends PureComponent {
    static propTypes = {
        init: PropTypes.func.isRequired,
        updateMeta: PropTypes.func.isRequired,
        updateConfigDevice: PropTypes.func.isRequired,
        base_link_url: PropTypes.string,
        default_description: PropTypes.string,
        default_keywords: PropTypes.string,
        default_title: PropTypes.string,
        title_prefix: PropTypes.string,
        title_suffix: PropTypes.string,
        isLoading: PropTypes.bool,
        isBigOffline: PropTypes.bool,
        meta_title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                TranslatedValue: PropTypes.string,
                value: PropTypes.string,
                injectables: PropTypes.array
            })
        ]),
        status_code: PropTypes.string
    };

    static defaultProps = {
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

    __construct(props) {
        super.__construct(props);

        this.state = ({
            currentUrl: window.location.pathname
        });

        this.initializeApplication();
        this.redirectFromPartialUrl();
        this.handleResize();
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentDidUpdate(prevProps) {
        const { isLoading, updateMeta } = this.props;
        const { isLoading: prevIsLoading } = prevProps;

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

            const { value: metaTitle = meta_title } = meta_title;

            updateMeta({
                default_title,
                title: metaTitle || default_title,
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

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = async () => {
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
    };

    containerProps() {
        const { isBigOffline } = this.props;

        return { isBigOffline };
    }

    initializeApplication() {
        const { init } = this.props;
        init();
    }

    redirectFromPartialUrl() {
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

    render() {
        return (
            <Router
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterContainer);
