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

const Routes = {
    routes: [
        {
            path: '/',
            component: 'HomePage'
        },
        {
            path: '/category',
            component: 'CategoryPage'
        },
        {
            path: '/page/:id',
            component: 'CmsPage'
        },
        {
            path: '/product',
            component: 'ProductPage'
        },
        {
            path: '/cart',
            component: 'CartPage'
        },
        {
            path: '',
            component: 'NoMatch'
        }
    ]
};

export default Routes;
