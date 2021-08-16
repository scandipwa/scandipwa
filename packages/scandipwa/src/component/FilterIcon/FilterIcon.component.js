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

import './FilterIcon.style';

/** @namespace Component/FilterIcon/Component */
export class FilterIcon extends PureComponent {
    render() {
        return (
            <svg
              block="FilterIcon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M10 3H22V5H10V3Z" />
                <path d="M10 19H22V21H10V19Z" />
                <path d="M2 3H6V5H2V3Z" />
                <path d="M2 19H6V21H2V19Z" />
                <path d="M8 0H10V8H8V0Z" />
                <path d="M8 16H10V24H8V16Z" />
                <path d="M14 8H16V16H14V8Z" />
                <path d="M14 11H2V13H14V11Z" />
                <path d="M22 11H18V13H22V11Z" />
            </svg>
        );
    }
}

export default FilterIcon;
