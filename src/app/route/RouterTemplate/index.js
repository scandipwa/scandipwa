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

import { connect } from 'react-redux';
import { HeaderAndFooterDispatcher } from 'Store/HeaderAndFooter';
import { AppRouter as BaseRouter } from 'SourceRoute';
import { CartDispatcher } from 'Store/Cart';
import { WishlistDispatcher } from 'Store/Wishlist';

/**
 * Extends core router.
 * @class AppRouter
 */
class AppRouter extends BaseRouter {
    constructor() {
        super();
        this.customItems = {
            beforeItems: [
                /**
                 * A shape of custom data passed to the BaseRouter
                    {
                        component: <p>Test1</p>,
                        position: 1
                    },
                    {
                        component: <p>Test2</p>,
                        position: 21
                    }
                 */
            ],
            switchItems: [
                /**
                 * One more example
                    {
                        component: <Route path="/myroute" exact component={ MyComponent } />,
                        position: 11
                    }
                 */
            ],
            afterItems: [
            ]
        };
    }
}

const mapDispatchToProps = dispatch => ({
    updateHeaderAndFooter: (options) => {
        HeaderAndFooterDispatcher.handleData(dispatch, options);
    },

    updateInitialCartData: () => {
        CartDispatcher.updateInitialCartData(dispatch);
    },

    updateInitialWishlistData: () => {
        WishlistDispatcher.updateInitialWishlistData(dispatch);
    }
});

const AppRouterContainer = connect(() => ({}), mapDispatchToProps)(AppRouter);

export default AppRouterContainer;
