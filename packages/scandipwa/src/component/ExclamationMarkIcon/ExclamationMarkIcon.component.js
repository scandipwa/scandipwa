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

import './ExclamationMarkIcon.style';

/** @namespace Component/ExclamationMarkIcon/Component */
export class ExclamationMarkIcon extends PureComponent {
    render() {
        return (
            <svg
              block="ExclamationMarkIcon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M11.953 2C6.465 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.493 2 11.953 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.567 4 11.953 4C16.391 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" />
                <path d="M11 7H13V14H11V7ZM11 15H13V17H11V15Z" />
            </svg>

        );
    }
}

export default ExclamationMarkIcon;
