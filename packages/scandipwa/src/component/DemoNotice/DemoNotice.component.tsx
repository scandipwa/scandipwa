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
export class DemoNoticeComponent extends PureComponent<DemoNoticeComponentProps> {
    renderText(): ReactElement {
        const { device } = this.props;

        if (device.isMobile) {
            return __('This is a demo store');
        }

        return __('This is a demo store. No orders will be fulfilled.');
    }

    render(): ReactElement {
        const {
            demo_notice,
        } = this.props;

        if (!demo_notice) {
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
