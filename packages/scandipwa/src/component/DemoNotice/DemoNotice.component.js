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

import { DeviceType } from 'Type/Device';

import './DemoNotice.style';

/** @namespace Component/DemoNotice/Component */
export class DemoNotice extends PureComponent {
    static propTypes = {
        isDemoNoticeEnabled: PropTypes.bool,
        device: DeviceType.isRequired
    };

    static defaultProps = {
        isDemoNoticeEnabled: false
    };

    componentDidMount() {
        this.checkForDemoNotice();
    }

    componentDidUpdate() {
        this.checkForDemoNotice();
    }

    checkForDemoNotice() {
        const { isDemoNoticeEnabled } = this.props;

        if (isDemoNoticeEnabled) {
            document.documentElement.classList.add('isDemoVisible');
        } else {
            document.documentElement.classList.remove('isDemoVisible');
        }
    }

    renderText() {
        const { device } = this.props;
        if (device.isMobile) {
            return __('This is a demo store');
        }

        return __('This is a demo store. No orders will be fulfilled.');
    }

    render() {
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

export default DemoNotice;
