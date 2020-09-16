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

/** @namespace Component/InstallPromptIOS/Component */
export class InstallPromptIOS extends PureComponent {
    static propTypes = {
        handleBannerClose: PropTypes.func.isRequired
    };

    renderCloseButton() {
        const { handleBannerClose } = this.props;

        return (
            <button
              block="InstallPromptIOS"
              elem="Close"
              onClick={ handleBannerClose }
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
            <div block="InstallPromptIOS">
                { this.renderHeading() }
                { this.renderContent() }
                { this.renderCloseButton() }
            </div>
        );
    }
}

export default InstallPromptIOS;
