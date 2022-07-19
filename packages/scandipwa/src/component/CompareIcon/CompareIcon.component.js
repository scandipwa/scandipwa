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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import './CompareIcon.style';

/** @namespace Component/CompareIcon/Component */
export class CompareIcon extends PureComponent {
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
              block="CompareIcon"
              mods={ { isActive } }
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M6.00999 2C4.07999 2 2.50999 3.57 2.50999 5.5C2.50999 7.08 3.56999 8.403 5.00999 8.837V15.997C5.00899 16.176 5.03699 17.778 6.18399 18.928C6.89199 19.64 7.83999 20 8.99999 20V22L13 19L8.99999 16V18C7.17699 18 7.01599 16.466 7.00999 16V8.837C8.44999 8.403 9.50999 7.08 9.50999 5.5C9.50999 3.57 7.93899 2 6.00999 2ZM6.00999 7C5.18299 7 4.50999 6.327 4.50999 5.5C4.50999 4.673 5.18299 4 6.00999 4C6.83699 4 7.50999 4.673 7.50999 5.5C7.50999 6.327 6.83699 7 6.00999 7ZM19.01 15.163V7.997C19.005 6.391 17.933 4 15 4V2L11 5L15 8V6C16.829 6 17.001 7.539 17.01 8V15.163C15.57 15.597 14.51 16.92 14.51 18.5C14.51 20.43 16.08 22 18.01 22C19.94 22 21.51 20.43 21.51 18.5C21.51 16.92 20.45 15.597 19.01 15.163ZM18.01 20C17.183 20 16.51 19.327 16.51 18.5C16.51 17.673 17.183 17 18.01 17C18.837 17 19.51 17.673 19.51 18.5C19.51 19.327 18.837 20 18.01 20Z" />
            </svg>
        );
    }
}

export default CompareIcon;
