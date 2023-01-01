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

import CloseIcon from 'Component/CloseIcon';
import { ReactElement } from 'Type/Common.type';

import { InstallPromptAndroidComponentProps } from './InstallPromptAndroid.type';

import './InstallPromptAndroid.style';

/** @namespace Component/InstallPromptAndroid/Component */
export class InstallPromptAndroidComponent<
P extends Readonly<InstallPromptAndroidComponentProps> = Readonly<InstallPromptAndroidComponentProps>,
S extends InstallPromptAndroidComponentState = InstallPromptAndroidComponentState,
> extends PureComponent<P, S> {
    renderCloseButton(): ReactElement {
        const { handleBannerClose } = this.props;

        return (
            <button
              block="InstallPromptAndroid"
              elem="Close"
              onClick={ handleBannerClose }
              aria-label={ __('Close') }
            >
                <CloseIcon />
            </button>
        );
    }

    renderContent(): ReactElement {
        return (
            <p block="InstallPromptAndroid" elem="Content">
                { __('Add website to your home screen for the full-screen browsing experience!') }
            </p>
        );
    }

    renderInstallButton(): ReactElement {
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

    render(): ReactElement {
        return (
            <div block="InstallPromptAndroid">
                { this.renderCloseButton() }
                { this.renderContent() }
                { this.renderInstallButton() }
            </div>
        );
    }
}

export default InstallPromptAndroidComponent;
