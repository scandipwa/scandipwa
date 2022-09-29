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

import InstallPromptAndroid from 'Component/InstallPromptAndroid';
import InstallPromptIOS from 'Component/InstallPromptIOS';
import { ReactElement } from 'Type/Common.type';

import { InstallPromptComponentProps } from './InstallPrompt.type';

import './InstallPrompt.style';

/** @namespace Component/InstallPrompt/Component */
export class InstallPrompt extends PureComponent<InstallPromptComponentProps> {
    /**
     * Currently BeforeInstallPromptEvent is supported only on
     * - Android webview
     * - Chrome for Android
     * - Samsung Internet
     * But iOS has own "Add to Home Screen button" on Safari share menu
     */
    hasSupport():boolean {
        const { device, hasInstallPromptEvent, isBannerClosed } = this.props;
        const {
            android,
            ios,
            safari,
            standaloneMode,
        } = device;
        const isAndroid = android && hasInstallPromptEvent;
        const isIos = ios && safari;

        return (isAndroid || isIos)
            && !standaloneMode
            && !isBannerClosed;
    }

    renderPrompt(): ReactElement {
        const {
            device,
            handleAppInstall,
            handleBannerClose,
        } = this.props;

        if (device.ios) {
            return (
                <InstallPromptIOS
                  handleBannerClose={ handleBannerClose }
                />
            );
        }

        if (device.android) {
            return (
                <InstallPromptAndroid
                  handleAppInstall={ handleAppInstall }
                  handleBannerClose={ handleBannerClose }
                />
            );
        }

        return null;
    }

    render(): ReactElement {
        const displayComponent = this.hasSupport();

        if (!displayComponent) {
            return null;
        }

        return (
            <div block="InstallPrompt">
                { this.renderPrompt() }
            </div>
        );
    }
}

export default InstallPrompt;
