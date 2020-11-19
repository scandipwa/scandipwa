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

import './InstallPromptAndroid.style';

/** @namespace Component/InstallPromptAndroid/Component */
export class InstallPromptAndroid extends PureComponent {
    static propTypes = {
        handleBannerClose: PropTypes.func.isRequired,
        handleAppInstall: PropTypes.func.isRequired
    };

    renderCloseButton() {
        const { handleBannerClose } = this.props;

        return (
            <button
              block="InstallPromptAndroid"
              elem="Close"
              onClick={ handleBannerClose }
              aria-label={ __('Close') }
            />
        );
    }

    renderContent() {
        return (
            <p block="InstallPromptAndroid" elem="Content">
                { __('Add website to your home screen for the full-screen browsing experience!') }
            </p>
        );
    }

    renderInstallButton() {
        const { handleAppInstall } = this.props;

        return (
            <button
              block="InstallPromptAndroid"
              elem="Button"
              mix={ { block: 'Button' } }
              onClick={ handleAppInstall }
            >
                { __('Add to home screen') }
            </button>
        );
    }

    render() {
        return (
            <div block="InstallPromptAndroid">
                { this.renderCloseButton() }
                { this.renderContent() }
                { this.renderInstallButton() }
            </div>
        );
    }
}

export default InstallPromptAndroid;
