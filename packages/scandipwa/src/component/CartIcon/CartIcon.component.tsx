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

import { CartIconComponentProps, CartIconComponentState } from './CartIcon.type';

import './CartIcon.style';

/** @namespace Component/CartIcon/Component */
export class CartIconComponent<
P extends Readonly<CartIconComponentProps> = Readonly<CartIconComponentProps>,
S extends CartIconComponentState = CartIconComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<CartIconComponentProps> = {
        isActive: false,
    };

    render(): ReactElement {
        const { isActive } = this.props;

        return (
            <svg
              block="CartIcon"
              mods={ { isActive } }
              width="21"
              height="19"
              viewBox="0 0 21 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M20.703 4.61752C20.516 4.34752 20.209 4.18652 19.881 4.18652H6.21404L5.06004 1.41652C4.74804 0.668523 4.02404 0.186523 3.21404 0.186523H0.881042V2.18652H3.21404L7.95804 13.5715C8.11304 13.9435 8.47704 14.1865 8.88104 14.1865H16.881C17.298 14.1865 17.671 13.9275 17.818 13.5385L20.818 5.53852C20.933 5.23052 20.89 4.88652 20.703 4.61752ZM16.188 12.1865H9.54804L7.04804 6.18652H18.438L16.188 12.1865Z" />
                <path d="M9.38104 18.1865C10.2095 18.1865 10.881 17.5149 10.881 16.6865C10.881 15.8581 10.2095 15.1865 9.38104 15.1865C8.55262 15.1865 7.88104 15.8581 7.88104 16.6865C7.88104 17.5149 8.55262 18.1865 9.38104 18.1865Z" />
                <path d="M16.381 18.1865C17.2095 18.1865 17.881 17.5149 17.881 16.6865C17.881 15.8581 17.2095 15.1865 16.381 15.1865C15.5526 15.1865 14.881 15.8581 14.881 16.6865C14.881 17.5149 15.5526 18.1865 16.381 18.1865Z" />
            </svg>
        );
    }
}

export default CartIconComponent;
