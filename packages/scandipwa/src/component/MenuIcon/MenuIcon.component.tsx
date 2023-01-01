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

import { MenuIconComponentProps } from './MenuIcon.type';

import './MenuIcon.style';

/** @namespace Component/MenuIcon/Component */
export class MenuIconComponent<
P extends Readonly<MenuIconComponentProps> = Readonly<MenuIconComponentProps>,
S extends MenuIconComponentState = MenuIconComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<MenuIconComponentProps> = {
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
                <path d="M0 17H18V19H0V17Z" />
                <path d="M7 11H0V13H7V11Z" />
                <path d="M9 5H0V7H9V5Z" />
                <path fillRule="evenodd" clipRule="evenodd" d="M21.8688 7.55912C21.8688 8.82098 21.4602 9.98676 20.775   10.939L23.8536 14.0174L22.5174 15.3535L19.4388 12.2751C18.4871 12.9597 17.3213 13.3682 16.0594   13.3682C12.856 13.3682 10.25 10.7624 10.25 7.55912C10.25 4.35588 12.856 1.75 16.0594 1.75C19.2628   1.75 21.8688 4.35588 21.8688 7.55912ZM16.0594 3.63978C18.2209 3.63978 19.979 5.39781 19.979   7.55912C19.979 9.72043 18.2209 11.4785 16.0594 11.4785C13.898 11.4785 12.1399 9.72043 12.1399   7.55912C12.1399 5.39781 13.898 3.63978 16.0594 3.63978Z" />
            </svg>
        );
    }
}

export default MenuIconComponent;
