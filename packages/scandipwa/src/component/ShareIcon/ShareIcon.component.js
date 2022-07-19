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

import './ShareIcon.style';

/** @namespace Component/ShareIcon/Component */
export class ShareIcon extends PureComponent {
    static propTypes = {
        isPrimary: PropTypes.bool
    };

    static defaultProps = {
        isPrimary: false
    };

    render() {
        const { isPrimary } = this.props;

        return (
            <svg
              block="ShareIcon"
              mods={ { isPrimary } }
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M5.5 15C6.41 15 7.233 14.642 7.857 14.07L14.117 17.647C14.048 17.922 14 18.204 14 18.5C14 20.43 15.57 22 17.5 22C19.43 22 21 20.43 21 18.5C21 16.57 19.43 15 17.5 15C16.59 15 15.767 15.358 15.143 15.93L8.883 12.353C8.946 12.106 8.986 11.851 8.991 11.585L15.142 8.07C15.767 8.642 16.59 9 17.5 9C19.43 9 21 7.43 21 5.5C21 3.57 19.43 2 17.5 2C15.57 2 14 3.57 14 5.5C14 5.796 14.048 6.078 14.117 6.353L8.433 9.602C7.808 8.64 6.729 8 5.5 8C3.57 8 2 9.57 2 11.5C2 13.43 3.57 15 5.5 15ZM17.5 17C18.327 17 19 17.673 19 18.5C19 19.327 18.327 20 17.5 20C16.673 20 16 19.327 16 18.5C16 17.673 16.673 17 17.5 17ZM17.5 4C18.327 4 19 4.673 19 5.5C19 6.327 18.327 7 17.5 7C16.673 7 16 6.327 16 5.5C16 4.673 16.673 4 17.5 4ZM5.5 10C6.327 10 7 10.673 7 11.5C7 12.327 6.327 13 5.5 13C4.673 13 4 12.327 4 11.5C4 10.673 4.673 10 5.5 10Z" />
            </svg>
        );
    }
}

export default ShareIcon;
