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
import { connect } from 'react-redux';

import InstallPromptAndroid from 'Component/InstallPromptAndroid';
import InstallPromptIOS from 'Component/InstallPromptIOS';
import { DeviceType } from 'Type/Device';
import BrowserDatabase from 'Util/BrowserDatabase';

/** @namespace Component/InstallPrompt/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace Component/InstallPrompt/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = (dispatch) => ({});

/** @namespace Component/InstallPrompt/Container */
export class InstallPromptContainer extends PureComponent {
    static propTypes = {
        device: DeviceType.isRequired
    };

    installPromptEvent = null;

    state = {
        isBannerClosed: BrowserDatabase.getItem('postpone_installation')
    };

    containerFunctions = {
        handleAppInstall: this.handleAppInstall.bind(this),
        handleBannerClose: this.handleBannerClose.bind(this)
    };

    componentDidMount() {
        this.listenForInstallPrompt();
    }

    handleAppInstall() {
        if (!this.installPromptEvent) {
            return;
        }

        // Show the modal add to home screen dialog
        this.installPromptEvent.prompt();

        // Wait for the user to respond to the prompt
        this.installPromptEvent.userChoice.then(
            /** @namespace Component/InstallPrompt/Container/then */
            (choice) => {
                if (choice.outcome === 'accepted') {
                    this.setState({ isBannerClosed: true });
                }

                // Clear the saved prompt since it can't be used again
                this.installPromptEvent = null;
            }
        );
    }

    handleBannerClose() {
        this.setState({ isBannerClosed: true });
        const THREE_DAYS_IN_SECONDS = '259200';
        BrowserDatabase.setItem(true, 'postpone_installation', THREE_DAYS_IN_SECONDS);
    }

    listenForInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();

            this.installPromptEvent = event;
        });
    }

    render() {
        const { isBannerClosed } = this.state;
        const { device } = this.props;

        if (device.standaloneMode || isBannerClosed) {
            return null;
        }

        if (device.ios) {
            return <InstallPromptIOS { ...this.containerFunctions } />;
        }

        if (device.android) {
            return <InstallPromptAndroid { ...this.containerFunctions } />;
        }

        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstallPromptContainer);
