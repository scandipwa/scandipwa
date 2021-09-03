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

import { DEFAULT_STATE_NAME } from 'Component/NavigationAbstract/NavigationAbstract.config';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { renderHOC } from 'Util/RenderHOC';

import { HomePageComponent, HomePageProps } from './HomePage.component';

import './HomePage.style';

/** @namespace Route/HomePage/Container/mapStateToProps */
export const homePageSelector = (state): { pageIdentifiers: string } => ({
    pageIdentifiers: state.ConfigReducer.cms_home_page
});

export const homePageLogic = (): HomePageProps => {
    const dispatch = useDispatch();
    const changeHeaderStateAction = (state) => dispatch(
        changeNavigationState(TOP_NAVIGATION_TYPE, state)
    );
    const { pageIdentifiers } = useSelector(homePageSelector);

    useEffect(() => {
        changeHeaderStateAction({
            name: DEFAULT_STATE_NAME,
            isHiddenOnMobile: false
        });
    }, []);

    return {
        pageIdentifiers
    };
};

export default renderHOC(HomePageComponent, homePageLogic);
