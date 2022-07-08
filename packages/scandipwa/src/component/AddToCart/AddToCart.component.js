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

import CartIcon from 'Component/CartIcon';
import { MixType } from 'Type/Common.type';
import { LayoutType } from 'Type/Layout.type';

import './AddToCart.style';

/**
 * Button for adding product to Cart
 * @class AddToCart
 * @namespace Component/AddToCart/Component
 */
export class AddToCart extends PureComponent {
    static propTypes = {
        isDisabled: PropTypes.bool.isRequired,
        isAdding: PropTypes.bool.isRequired,
        handleButtonClick: PropTypes.func.isRequired,

        // Customization
        isIconEnabled: PropTypes.bool.isRequired,
        mix: MixType.isRequired,
        layout: LayoutType.isRequired
    };

    renderCartIcon() {
        const { isIconEnabled } = this.props;

        if (!isIconEnabled) {
            return null;
        }

        return <CartIcon />;
    }

    render() {
        const {
            mix,
            layout,
            isDisabled,
            isAdding,
            handleButtonClick
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

export default AddToCart;
