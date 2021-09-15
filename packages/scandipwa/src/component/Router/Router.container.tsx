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
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { renderHOC } from 'Util/RenderHOC';
import { RootState } from 'Util/Store/type';

import { RouterComponent, RouterProps } from './Router.component';

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

export const routerSelector = (state: RootState) => ({
    isBigOffline: state.OfflineReducer.isBig
});

export const useRouterInit = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        const init = () => {
            ConfigDispatcher.then(
                ({ default: dispatcher }) => dispatcher.handleData(dispatch, {})
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
        };

        const redirectFromPartialUrl = (): void => {
            // const { base_link_url } = this.props;
            const { pathname: storePrefix } = new URL(/* base_link_url || */ window.location.origin);
            const { pathname } = location;

            if (storePrefix === '/') {
                return;
            }

            if (storePrefix.slice(0, -1) === pathname) {
                history.replace(storePrefix);
            }
        };

        init();
        redirectFromPartialUrl();
    }, []);
};

export const routerLogic = (): RouterProps => {
    const { isBigOffline } = useSelector(routerSelector);

    useRouterInit();

    return {
        isBigOffline
    };
};

export const Router = renderHOC(RouterComponent, routerLogic, 'Router');
