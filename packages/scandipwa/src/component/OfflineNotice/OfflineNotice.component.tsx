/* eslint-disable max-len */

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

import { ReactElement } from 'Type/Common.type';

import { OfflineNoticeComponentProps } from './OfflineNotice.type';

import './OfflineNotice.style';

/** @namespace Component/OfflineNotice/Component */
export class OfflineNoticeComponent extends PureComponent<OfflineNoticeComponentProps> {
    renderLogo(): ReactElement {
        const { isBig } = this.props;

        return (
            <div block="OfflineNotice" elem="Logo" mods={ { isBig } }>
                <div block="OfflineNotice" elem="Logo-Cloud" />
                <div block="OfflineNotice" elem="Logo-Stick" />
            </div>
        );
    }

    renderText(): ReactElement {
        const { isBig } = this.props;

        if (isBig) {
            return (
                <div block="OfflineNotice" elem="Text" mods={ { isBig } }>
                    <p block="OfflineNotice" elem="Text-Title">
                        { __('You are currently offline.') }
                    </p>
                    <p block="OfflineNotice" elem="Text-Description">
                        { __('We could not load the content. Check your internet connection and try again.') }
                    </p>
                </div>
            );
        }

        return (
            <div block="OfflineNotice" elem="Text">
                { __('Offline mode') }
            </div>
        );
    }

    render(): ReactElement {
        const { isPage, isBig } = this.props;

        if (!isBig && isPage) {
            return null;
        }

        return (
            <div block="OfflineNotice" mods={ { isBig } }>
                { this.renderLogo() }
                { this.renderText() }
            </div>
        );
    }
}

export default OfflineNoticeComponent;
