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
        const { device, containerFunctions } = this.props;

        if (device.ios) {
            return <InstallPromptIOS { ...containerFunctions } />;
        }

        if (device.android) {
            return <InstallPromptAndroid { ...containerFunctions } />;
        }

        return null;
    }

    render() {
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
