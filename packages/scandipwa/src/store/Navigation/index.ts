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

import { useDispatch } from 'react-redux';

import { changeNavigationState } from './Navigation.action';
import { BOTTOM_NAVIGATION_TYPE, TOP_NAVIGATION_TYPE } from './Navigation.config';

export const useNavigationStore = () => {
    const dispatch = useDispatch();

    return {
        changeTopNavigationState: (state: {
            name: string,
            title?: string,
            onBackClick?: () => void
            isHiddenOnMobile?: boolean
        }): void => {
            dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state));
        },
        changeBottomNavigationState: (state: any): void => {
            dispatch(changeNavigationState(BOTTOM_NAVIGATION_TYPE, state));
        }
    };
};
