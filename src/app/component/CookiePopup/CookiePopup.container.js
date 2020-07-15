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

import CookiePopup from './CookiePopup.component';

export const mapStateToProps = (state) => ({
    cookieText: state.ConfigReducer.cookie_text,
    cookieLink: state.ConfigReducer.cookie_link
});

export default connect(mapStateToProps)(CookiePopup);
