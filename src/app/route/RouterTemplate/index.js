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

import { AppRouter as BaseRouter } from 'SourceRoute';

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

export default AppRouter;
