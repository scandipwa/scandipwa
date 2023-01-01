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

import { DemoNoticeComponentProps } from './DemoNotice.type';

import './DemoNotice.style';

/** @namespace Component/DemoNotice/Component */
export class DemoNoticeComponent<
P extends Readonly<DemoNoticeComponentProps> = Readonly<DemoNoticeComponentProps>,
S extends DemoNoticeComponentState = DemoNoticeComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<DemoNoticeComponentProps> = {
        isDemoNoticeEnabled: false,
    };

    componentDidMount(): void {
        this.checkForDemoNotice();
    }

    componentDidUpdate(): void {
        this.checkForDemoNotice();
    }

    checkForDemoNotice(): void {
        const { isDemoNoticeEnabled } = this.props;

        if (isDemoNoticeEnabled) {
            document.documentElement.classList.add('isDemoVisible');
        } else {
            document.documentElement.classList.remove('isDemoVisible');
        }
    }

    renderText(): ReactElement {
        const { device } = this.props;

        if (device.isMobile) {
            return __('This is a demo store');
        }

        return __('This is a demo store. No orders will be fulfilled.');
    }

    render(): ReactElement {
        const { isDemoNoticeEnabled } = this.props;

        if (!isDemoNoticeEnabled) {
            return null;
        }

        return (
            <div block="DemoNotice">
                { this.renderText() }
            </div>
        );
    }
}

export default DemoNoticeComponent;
