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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { showPopup } from 'Store/Popup/Popup.action';
import { DeviceType } from 'Type/Device';

import NewVersionPopup from './NewVersionPopup.component';
import { NEW_VERSION_POPUP_ID } from './NewVersionPopup.config';

/** @namespace Component/NewVersionPopup/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace Component/NewVersionPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showPopup: (payload) => dispatch(showPopup(NEW_VERSION_POPUP_ID, payload)),
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay())
});

/** @namespace Component/NewVersionPopup/Container */
export class NewVersionPopupContainer extends PureComponent {
    static propTypes = {
        showPopup: PropTypes.func.isRequired,
        goToPreviousHeaderState: PropTypes.func.isRequired,
        device: DeviceType.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired
    };

    containerFunctions = {
        toggleNewVersion: this.toggleNewVersion.bind(this),
        handleDismiss: this.handleDismiss.bind(this)
    };

    componentDidMount() {
        const { showPopup, goToPreviousHeaderState, device } = this.props;

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                showPopup({
                    title: __('New version available!')
                });

                if (device.isMobile) {
                    goToPreviousHeaderState();
                }
            });
        }
    }

    toggleNewVersion() {
        window.location.reload();
    }

    handleDismiss() {
        const { hideActiveOverlay } = this.props;

        hideActiveOverlay();
    }

    render() {
        return (
            <NewVersionPopup
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewVersionPopupContainer);
