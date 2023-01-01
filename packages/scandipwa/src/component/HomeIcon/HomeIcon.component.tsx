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

import { HomeIconComponentProps } from './HomeIcon.type';

import './HomeIcon.style';

/** @namespace Component/HomeIcon/Component */
export class HomeIconComponent<
P extends Readonly<HomeIconComponentProps> = Readonly<HomeIconComponentProps>,
S extends HomeIconComponentState = HomeIconComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<HomeIconComponentProps> = {
        isActive: false,
    };

    render(): ReactElement {
        const { isActive } = this.props;

        return (
            <svg
              block="MenuIcon"
              mods={ { isActive } }
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M5.00299 22H9.00299H15.003H19.003C20.106 22 21.003 21.103 21.003 20V11C21.003 10.735 20.898 10.48 20.71 10.293L12.71 2.29301C12.319 1.90201 11.687 1.90201 11.296 2.29301L3.29599 10.293C3.10799 10.48 3.00299 10.735 3.00299 11V20C3.00299 21.103 3.89999 22 5.00299 22ZM10.003 20V15H14.003V20H10.003ZM5.00299 11.414L12.003 4.41401L19.003 11.414L19.004 20H16.003V15C16.003 13.897 15.106 13 14.003 13H10.003C8.89999 13 8.00299 13.897 8.00299 15V20H5.00299V11.414Z" />
            </svg>
        );
    }
}

export default HomeIconComponent;
