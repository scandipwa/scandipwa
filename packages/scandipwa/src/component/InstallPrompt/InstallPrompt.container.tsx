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

import { ReactElement } from 'Type/Common.type';
import BrowserDatabase from 'Util/BrowserDatabase';
import { RootState } from 'Util/Store/Store.type';

import InstallPrompt from './InstallPrompt.component';
import {
    InstallPromptComponentProps,
    InstallPromptContainerFunctions,
    InstallPromptContainerMapDispatchProps,
    InstallPromptContainerMapStateProps,
    InstallPromptContainerProps,
    InstallPromptContainerState,
} from './InstallPrompt.type';

/** @namespace Component/InstallPrompt/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): InstallPromptContainerMapStateProps => ({
    device: state.ConfigReducer.device,
});

/** @namespace Component/InstallPrompt/Container/mapDispatchToProps */
export const mapDispatchToProps = (): InstallPromptContainerMapDispatchProps => ({});

/** @namespace Component/InstallPrompt/Container */
export class InstallPromptContainer extends PureComponent<InstallPromptContainerProps, InstallPromptContainerState> {
    state: InstallPromptContainerState = {
        isBannerClosed: !!BrowserDatabase.getItem('postpone_installation'),
        hasInstallPromptEvent: false,
    };

    containerFunctions: InstallPromptContainerFunctions = {
        handleAppInstall: this.handleAppInstall.bind(this),
        handleBannerClose: this.handleBannerClose.bind(this),
    };

    componentDidMount(): void {
        this.listenForInstallPrompt();
    }

    containerProps(): Pick<
    InstallPromptComponentProps,
    'device'
    | 'isBannerClosed'
    | 'hasInstallPromptEvent'
    > {
        const { device } = this.props;
        const { isBannerClosed, hasInstallPromptEvent } = this.state;

        return {
            device,
            isBannerClosed,
            hasInstallPromptEvent,
        };
    }

    handleAppInstall(): void {
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
                    BrowserDatabase.setItem(true, 'app_installed');
                }

                // Clear the saved prompt since it can't be used again
                window.prompt_event = undefined;
                this.setState({ hasInstallPromptEvent: false });
            },
        );
    }

    handleBannerClose(): void {
        this.setState({ isBannerClosed: true });
        const THREE_DAYS_IN_SECONDS = 259200;

        BrowserDatabase.setItem(true, 'postpone_installation', THREE_DAYS_IN_SECONDS);
    }

    listenForInstallPrompt(): void {
        window.addEventListener('beforeinstallprompt', (event: Event) => {
            event.preventDefault();
            window.prompt_event = Object.assign(event);
            this.setState({ hasInstallPromptEvent: true });
        });
    }

    render(): ReactElement {
        return (
            <InstallPrompt
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstallPromptContainer);
