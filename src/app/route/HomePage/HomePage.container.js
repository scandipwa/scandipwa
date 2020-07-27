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

import './HomePage.style';

import { connect } from 'react-redux';

import Footer from 'Component/Footer';
import InstallPrompt from 'Component/InstallPrompt';
import CmsPage from 'Route/CmsPage';

export const mapStateToProps = (state) => ({
    pageIdentifiers: state.ConfigReducer.cms_home_page
});

export const HomePageContainer = (props) => (
    <div block="HomePage">
        <InstallPrompt />
        <CmsPage { ...props } isBreadcrumbsActive={ false } />
        <Footer isVisibleOnMobile />
    </div>
);

export default connect(mapStateToProps)(HomePageContainer);
