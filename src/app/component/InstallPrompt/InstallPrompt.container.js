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
import isMobile from 'Util/Mobile';
import InstallPromptAndroid from 'Component/InstallPromptAndroid';
import InstallPromptIOS from 'Component/InstallPromptIOS';

export class InstallPrompt extends PureComponent {
    installPromptEvent = null;

    state = { isBannerClosed: false };

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
        this.installPromptEvent.userChoice.then((choice) => {
            if (choice.outcome === 'accepted') {
                this.setState({ isBannerClosed: true });
            }

            // Clear the saved prompt since it can't be used again
            this.installPromptEvent = null;
        });
    }

    handleBannerClose() {
        this.setState({ isBannerClosed: true });
    }

    listenForInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();

            this.installPromptEvent = event;
        });
    }

    render() {
        const { isBannerClosed } = this.state;

        if (isMobile.standaloneMode() || isBannerClosed) {
            return null;
        }

        if (isMobile.iOS()) {
            return <InstallPromptIOS { ...this.containerFunctions } />;
        }

        if (isMobile.android()) {
            return <InstallPromptAndroid { ...this.containerFunctions } />;
        }

        return null;
    }
}

export default InstallPrompt;
