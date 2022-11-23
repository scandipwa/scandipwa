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

import Button from '@scandipwa/ui-library/src/component/Button';
import { PureComponent } from 'react';

import CartIcon from 'Component/CartIcon';
import { ReactElement } from 'Type/Common.type';

import { AddToCartComponentProps } from './AddToCart.type';

import './AddToCart.style';

/**
 * Button for adding product to Cart
 * @class AddToCart
 * @namespace Component/AddToCart/Component
 */
export class AddToCartComponent extends PureComponent<AddToCartComponentProps> {
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
            <Button
              onClick={ handleButtonClick }
              mix={ { block: 'Button AddToCart', mods: { layout }, mix } }
              disabled={ isDisabled || isAdding }
            >
                { this.renderCartIcon() }
                <span>{ isAdding ? __('Adding...') : __('Add to cart') }</span>
            </Button>
        );
    }
}

export default AddToCartComponent;
