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

import { connect } from 'react-redux';

import CmsPage from 'Route/CmsPage';
import Footer from 'Component/Footer';
import InstallPrompt from 'Component/InstallPrompt';

import './HomePage.style';

/** @middleware Route/HomePage/Container/mapStateToProps */
export const mapStateToProps = state => ({
    pageIdentifiers: state.ConfigReducer.cms_home_page
});

/** @middleware Route/HomePage/Container */
export const HomePageContainer = props => (
    <div block="HomePage">
        <InstallPrompt />
        <CmsPage { ...props } isBreadcrumbsActive={ false } />
        <Footer isVisibleOnMobile />
    </div>
);

/** @middleware Route/HomePage/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
