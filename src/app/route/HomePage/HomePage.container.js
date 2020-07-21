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

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect } from 'react';

import CmsPage from 'Route/CmsPage';
import Footer from 'Component/Footer';
import InstallPrompt from 'Component/InstallPrompt';
import { changeNavigationState } from 'Store/Navigation';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { DEFAULT_STATE_NAME } from 'Component/NavigationAbstract/NavigationAbstract.component';

import './HomePage.style';

export const mapStateToProps = state => ({
    pageIdentifiers: state.ConfigReducer.cms_home_page
});

export const mapDispatchToProps = (dispatch) => ({
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state))
});

export const HomePageContainer = (props) => {
    const { changeHeaderState } = props;
    useEffect(() => {
        changeHeaderState({
            name: DEFAULT_STATE_NAME,
            isHiddenOnMobile: true
        });
    }, []);

    return (
        <div block="HomePage">
            <InstallPrompt />
            <CmsPage { ...props } isBreadcrumbsActive={ false } />
            <Footer isVisibleOnMobile />
        </div>
    );
};

HomePageContainer.propTypes = {
    changeHeaderState: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
