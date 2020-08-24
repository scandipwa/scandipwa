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

import './DemoNotice.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import isMobile from 'Util/Mobile';

export class DemoNotice extends PureComponent {
    static propTypes = {
        isDemoNoticeEnabled: PropTypes.bool
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
        }
    }

    renderText() {
        if (isMobile.any()) {
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
