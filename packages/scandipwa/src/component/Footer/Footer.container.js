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

import Footer from './Footer.component';

/** @namespace Component/Footer/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    copyright: state.ConfigReducer.copyright,
    device: state.ConfigReducer.device,
    newsletterActive: state.ConfigReducer.newsletter_general_active
});

/** @namespace Component/Footer/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
