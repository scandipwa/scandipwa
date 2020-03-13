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
import PropTypes from 'prop-types';
import isMobile from 'Util/Mobile';
import './DemoNotice.style';

/**
 * DemoNotice
 * @class DemoNotice
 */
export default class DemoNotice extends PureComponent {
    static propTypes = {
        demoNotice: PropTypes.bool
    };

    static defaultProps = {
        demoNotice: false
    };

    render() {
        const { demoNotice } = this.props;

        if (demoNotice) {
            return (
                <div block="DemoNotice">
                    { isMobile.any()
                        ? __('This is a demo store')
                        : __('This is a demo store. No orders will be fulfilled.') }
                </div>
            );
        }

        return null;
    }
}
