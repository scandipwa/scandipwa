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

import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { DeviceType } from 'Type/Device.type';
import BrowserDatabase from 'Util/BrowserDatabase';

import InstallPrompt from './InstallPrompt.component';

/** @namespace Component/InstallPrompt/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace Component/InstallPrompt/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/InstallPrompt/Container */
export class InstallPromptContainer extends PureComponent {
    static propTypes = {
        device: DeviceType.isRequired
    };

    state = {
        isBannerClosed: !!BrowserDatabase.getItem('postpone_installation'),
        hasInstallPromptEvent: false
    };

    containerFunctions = {
        handleAppInstall: this.handleAppInstall.bind(this),
        handleBannerClose: this.handleBannerClose.bind(this)
    };

    componentDidMount() {
        this.listenForInstallPrompt();
    }

    containerProps() {
        const { device } = this.props;
        const { isBannerClosed, hasInstallPromptEvent } = this.state;

        return {
            device,
            isBannerClosed,
            hasInstallPromptEvent
        };
    }

    handleAppInstall() {
        if (!window.prompt_event) {
            return;
        }

        // Show the modal add to home screen dialog
        window.prompt_event.prompt();

        // Wait for the user to respond to the prompt
        window.prompt_event.userChoice.then(
            /** @namespace Component/InstallPrompt/Container/InstallPromptContainer/handleAppInstall/then */
            (choice) => {
                if (choice.outcome === 'accepted') {
                    this.setState({ isBannerClosed: true });
                }

                // Clear the saved prompt since it can't be used again
                window.prompt_event = null;
                this.setState({ hasInstallPromptEvent: false });
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
            window.prompt_event = Object.assign(event);
            this.setState({ hasInstallPromptEvent: true });
        });
    }

    render() {
        return (
            <InstallPrompt
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstallPromptContainer);
