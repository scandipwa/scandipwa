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

import './InstallPromptIOS.style';
import BrowserDatabase from 'Util/BrowserDatabase/BrowserDatabase';

/** @namespace Component/InstallPromptIOS/Component */
export class InstallPromptIOS extends PureComponent {
    static propTypes = {
        handleBannerClose: PropTypes.func.isRequired
    };

    state = {
        isDismissed: false
    };

    dismissInstallPrompt = () => {
        this.setState({
            isDismissed: true
        });
        const THREE_DAYS_IN_SECONDS = '259200';
        BrowserDatabase.setItem(true, 'postpone_installation', THREE_DAYS_IN_SECONDS);
    };

    renderCloseButton() {
        return (
            <button
                block="InstallPromptIOS"
                elem="Close"
                onClick={ this.dismissInstallPrompt }
            >
                { __('Maybe later') }
            </button>
        );
    }

    renderContent() {
        return (
            <p block="InstallPromptIOS" elem="Content">
                <span>{ __('Tap:') }</span>
                <span block="InstallPromptIOS" elem="Share" />
                <span>{ __(', then') }</span>
                <span block="InstallPromptIOS" elem="Plus" />
                <span>{ __('Add to Home Screen') }</span>
            </p>
        );
    }

    renderHeading() {
        return (
            <p block="InstallPromptIOS" elem="Heading">
                { __('Browse website in full-screen:') }
            </p>
        );
    }

    render() {
        return (
            <>
                { !this.state.isDismissed &&
                    <div block="InstallPromptIOS">
                        { this.renderHeading() }
                        { this.renderContent() }
                        { this.renderCloseButton() }
                    </div>
                }
            </>
        );
    }
}

export default InstallPromptIOS;
