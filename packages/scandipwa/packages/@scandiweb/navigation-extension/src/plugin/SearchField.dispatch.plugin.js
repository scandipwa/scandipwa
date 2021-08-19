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

const MobileSearchBarDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    '../store/MobileSearchBar/MobileSearchBar.dispatcher'
);

const mapDispatchToProps = (args, callback) => {
    const [dispatch] = args;

    return {
        ...callback(...args),
        deactivateSearchBar: () => MobileSearchBarDispatcher.then(
            ({ default: dispatcher }) => dispatcher.deactivateSearchBar(dispatch)
        )
    };
};

export default {
    'Component/SearchField/Container/mapDispatchToProps': {
        function: mapDispatchToProps
    }
};
