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
import { goToPreviousHeaderState } from 'Store/Header';
import { hideActiveOverlay } from 'Store/Overlay';
import CategoryFilterOverlay from './CategoryFilterOverlay.component';

const mapDispatchToProps = dispatch => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    goToPreviousHeaderState: () => dispatch(goToPreviousHeaderState())
});

export default connect(null, mapDispatchToProps)(CategoryFilterOverlay);
