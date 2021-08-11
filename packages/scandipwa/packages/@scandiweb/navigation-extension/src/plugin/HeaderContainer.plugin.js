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

const containerProps = (args, callback, instance) => {
    const { openSideMenu, closeSideMenu } = instance.props;

    return { ...callback.apply(instance, args), openSideMenu, closeSideMenu };
};

export default {
    'Component/Header/Container': {
        'member-function': {
            containerProps
        }
    }
};
