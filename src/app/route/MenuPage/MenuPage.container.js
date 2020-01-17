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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { MENU_OVERLAY_KEY } from 'Component/MenuOverlay/MenuOverlay.component';
import { toggleOverlayByKey } from 'Store/Overlay';

import MenuOverlay from 'Component/MenuOverlay';

export const mapDispatchToProps = dispatch => ({
    showOverlay: overlayKey => dispatch(toggleOverlayByKey(overlayKey))
});

export class MenuPageContainer extends PureComponent {
    static propTypes = {
        showOverlay: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { showOverlay } = this.props;
        showOverlay(MENU_OVERLAY_KEY);
    }

    render() {
        return (
            <main>
                <MenuOverlay />
            </main>
        );
    }
}

export default connect(null, mapDispatchToProps)(MenuPageContainer);
