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

import './InstallPrompt.style';

/** @namespace Component/InstallPrompt/Component */
export class InstallPrompt extends PureComponent {
    static propTypes = {
        device: DeviceType.isRequired,
        isBannerClosed: PropTypes.bool.isRequired,
        hasInstallPromptEvent: PropTypes.bool.isRequired,
        containerFunctions: PropTypes.object.isRequired
    };

    hasSupport() {
        const { device, hasInstallPromptEvent } = this.props;
        // since currently BeforeInstallPromptEvent is supported only on
        // - Android webview
        // - Chrome for Android
        // - Samsung Internet
        // but iOS has own "Add to Home Screen button" on Safari share menu
        return hasInstallPromptEvent || (device.ios && device.safari) || true;
    }

    renderPrompt() {
        const { device } = this.props;

        if (device.ios) {
            return <InstallPromptIOS { ...this.containerFunctions } />;
        }

        if (device.android) {
            return <InstallPromptAndroid { ...this.containerFunctions } />;
        }

        return null;
    }

    render() {
        const { device, isBannerClosed } = this.props;
        const displayComponent = (device.ios || device.android)
            && !device.standaloneMode
            && !isBannerClosed
            && this.hasSupport();

        if (displayComponent) {
            return (
                <div block="InstallPrompt">
                    { this.renderPrompt() }
                </div>
            );
        }

        return null;
    }
}

export default InstallPrompt;
