import { MY_ACCOUNT } from 'Component/Header/Header.config';
import { ACCOUNT_LOGIN_URL } from 'Route/MyAccount/MyAccount.config';
import { isSignedIn } from 'Util/Auth';
import browserHistory from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

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

export class HeaderContainerPlugin {
    containerProps = (args, callback, instance) => {
        const { openSideMenu, closeSideMenu } = instance.props;

        return { ...callback.apply(instance, args), openSideMenu, closeSideMenu };
    };

    containerFunctions = (originalMember, instance) => ({
        ...originalMember,
        onMyAccountButtonClick: this.onMyAccountButtonClick.bind(instance)
    });

    onMyAccountButtonClick() {
        const { pathname } = location;
        const url = appendWithStoreCode(isSignedIn() ? `/${ MY_ACCOUNT }` : ACCOUNT_LOGIN_URL);

        if (pathname !== url) {
            browserHistory.push(url);
        }
    }
}

const { containerProps, containerFunctions } = new HeaderContainerPlugin();

export default {
    'Component/Header/Container': {
        'member-function': {
            containerProps
        },
        'member-property': {
            containerFunctions
        }
    }
};
