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

import CartIcon from 'Component/CartIcon';
import { ReactElement } from 'Type/Common.type';

import { AddToCartComponentProps, AddToCartComponentState } from './AddToCart.type';

import './AddToCart.style';

/**
 * Button for adding product to Cart
 * @class AddToCart
 * @namespace Component/AddToCart/Component
 */
export class AddToCartComponent<
P extends Readonly<AddToCartComponentProps> = Readonly<AddToCartComponentProps>,
S extends AddToCartComponentState = AddToCartComponentState,
> extends PureComponent<P, S> {
    renderCartIcon(): ReactElement {
        const { isIconEnabled } = this.props;

        if (!isIconEnabled) {
            return null;
        }

        return <CartIcon />;
    }

    render(): ReactElement {
        const {
            mix,
            layout,
            isDisabled,
            isAdding,
            handleButtonClick,
        } = this.props;

        return (
            <button
              onClick={ handleButtonClick }
              block="Button AddToCart"
              mix={ mix }
              mods={ { layout } }
              disabled={ isDisabled || isAdding }
            >
                { this.renderCartIcon() }
                <span>{ isAdding ? __('Adding...') : __('Add to cart') }</span>
            </button>
        );
    }
}

export default AddToCartComponent;
