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

import { activateSearchBar, deactivateSearchBar } from './MobileSearchBar.action';

/** @namespace Scandiweb/NavigationExtension/Store/MobileSearchBar/Dispatcher/MobileSearchBarDispatcher */
export class MobileSearchBarDispatcher {
    activateSearchBar(dispatch) {
        return dispatch(activateSearchBar());
    }

    deactivateSearchBar(dispatch) {
        dispatch(deactivateSearchBar());
    }
}

export default new MobileSearchBarDispatcher();
