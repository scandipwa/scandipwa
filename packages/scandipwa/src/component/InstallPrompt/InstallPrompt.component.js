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

import InstallPromptAndroid from 'Component/InstallPromptAndroid';
import InstallPromptIOS from 'Component/InstallPromptIOS';
import { DeviceType } from 'Type/Device';
import { hasHomeScreenSupport, hasManifest } from 'Util/Mobile/hasHomeScreenSupport';

import './InstallPrompt.style';

/** @namespace Component/InstallPrompt/Component */
export class InstallPrompt extends PureComponent {
    static propTypes = {
        device: DeviceType.isRequired,
        isBannerClosed: PropTypes.bool.isRequired,
        hasInstallPromptEvent: PropTypes.bool.isRequired,
        containerFunctions: PropTypes.object.isRequired
    };

    /**
     * Currently BeforeInstallPromptEvent is supported only on
     * - Android webview
     * - Chrome for Android
     * - Samsung Internet
     * But iOS has own "Add to Home Screen button" on Safari share menu
     */
    hasSupport() {
        const { device, hasInstallPromptEvent, isBannerClosed } = this.props;
        const {
            android,
            ios,
            safari,
            standaloneMode
        } = device;
        const isAndroid = android && hasInstallPromptEvent;
        const isIos = ios && safari;

        return (isAndroid || isIos)
            && !standaloneMode
            && !isBannerClosed;
    }

    renderPrompt() {
        const {
            device,
            containerFunctions: {
                handleAppInstall,
                handleBannerClose
            }
        } = this.props;

        if (device.ios) {
            return (
                <InstallPromptIOS
                  handleAppInstall={ handleAppInstall }
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

    render() {
        const { device, isBannerClosed, hasInstallPromptEvent } = this.props;
        const {
            android,
            standaloneMode
        } = device;

        const displayComponent = this.hasSupport();
        const debugMsg = JSON.stringify({
            hasSupport: displayComponent,
            standaloneMode,
            android,
            isBannerClosed,
            hasInstallPromptEvent,
            hasHomeScreenSupport: hasHomeScreenSupport(),
            hasManifest: hasManifest()
        });

        if (!displayComponent) {
            return debugMsg;
        }

        return (
            <div block="InstallPrompt">
                { this.renderPrompt() }
                { debugMsg }
            </div>
        );
    }
}

export default InstallPrompt;
