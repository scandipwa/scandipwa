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

export const mapStateToProps = state => ({
    urlKey: state.ConfigReducer.cms_home_page
});

export const HomePageContainer = props => <CmsPage { ...props } isBreadcrumbsActive={ false } />;

export default connect(mapStateToProps)(HomePageContainer);
