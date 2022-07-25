/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { connect } from 'react-redux';

import DemoNotice from './DemoNotice.component';

/** @namespace Component/DemoNotice/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isDemoNoticeEnabled: state.ConfigReducer.demo_notice,
    device: state.ConfigReducer.device
});

/** @namespace Component/DemoNotice/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DemoNotice);
