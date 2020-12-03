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

import DemoNotice from './DemoNotice.component';

/** @namespace Component/DemoNotice/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isDemoNoticeEnabled: state.ConfigReducer.demo_notice,
    device: state.ConfigReducer.device
});

/** @namespace Component/DemoNotice/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DemoNotice);
