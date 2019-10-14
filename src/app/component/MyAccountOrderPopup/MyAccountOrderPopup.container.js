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
import MyAccountOrderPopup from './MyAccountOrderPopup.component';

export const mapStateToProps = state => ({
    order: state.OrderReducer.order
});

export default connect(mapStateToProps)(MyAccountOrderPopup);
