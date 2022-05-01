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

import { ReactElement } from 'Type/Common.type';

import { InstallPromptIOSComponentProps } from './InstallPromptIOS.type';

import './InstallPromptIOS.style';

/** @namespace Component/InstallPromptIOS/Component */
export class InstallPromptIOS extends PureComponent<InstallPromptIOSComponentProps> {
    renderCloseButton(): ReactElement {
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

    renderContent(): ReactElement {
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

    renderHeading(): ReactElement {
        return (
            <p block="InstallPromptIOS" elem="Heading">
                { __('Browse website in full-screen:') }
            </p>
        );
    }

    render(): ReactElement {
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
