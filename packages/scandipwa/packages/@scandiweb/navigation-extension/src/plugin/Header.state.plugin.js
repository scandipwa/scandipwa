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

const SideMenuDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    '../store/SideMenu/SideMenu.dispatcher'
);

const mapDispatchToProps = (args, callback) => {
    const [dispatch] = args;

    return {
        ...callback(...args),
        openSideMenu: () => SideMenuDispatcher.then(
            ({ default: dispatcher }) => dispatcher.openSideMenu(dispatch)
        )
    };
};

export default {
    'Component/Header/Container/mapDispatchToProps': {
        function: mapDispatchToProps
    }
};
