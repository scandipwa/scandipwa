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
import { useSelector } from 'react-redux';
import { match as Match } from 'react-router';

import { DEFAULT_STATE_NAME } from 'Component/NavigationAbstract/NavigationAbstract.config';
import { useNavigationStore } from 'Store/Navigation';
import { renderHOC } from 'Util/RenderHOC';
import { RootState } from 'Util/Store/type';

import { HomePageComponent, HomePageProps } from './HomePage.component';

import './HomePage.style';

/** @namespace Component/HomePage/Container/mapStateToProps */
export const homePageSelector = (state: RootState) => ({
    pageIdentifiers: state.ConfigReducer.cms_home_page as string
});

export const homePageLogic = ({ match }: { match: Match }): HomePageProps => {
    const { changeTopNavigationState } = useNavigationStore();
    const { pageIdentifiers } = useSelector(homePageSelector);

    useEffect(() => {
        changeTopNavigationState({
            name: DEFAULT_STATE_NAME,
            isHiddenOnMobile: false
        });
    }, []);

    return {
        pageIdentifiers,
        match
    };
};

export default renderHOC(HomePageComponent, homePageLogic, 'HomePage');
