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

import './ListIcon.style';

/** @namespace Component/ListIcon/Component */
export class ListIcon extends PureComponent {
    static propTypes = {
        isActive: PropTypes.bool
    };

    static defaultProps = {
        isActive: false
    };

    render() {
        const { isActive } = this.props;

        return (
            <svg
              block="ListIcon"
              mods={ { isActive } }
              width="27"
              height="27"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M3 5H5.25V7.33333H3V5ZM3 10.8333H5.25V13.1667H3V10.8333ZM3 16.6667H5.25V19H3V16.6667ZM21 7.33333V5H19.65H8.85H7.52587V7.33333H8.85H19.65H21ZM7.5 10.8333H21V13.1667H7.5V10.8333ZM7.5 16.6667H21V19H7.5V16.6667Z" />
            </svg>
        );
    }
}

export default ListIcon;
