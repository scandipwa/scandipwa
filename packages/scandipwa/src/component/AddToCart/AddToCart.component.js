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
import { MixType } from 'Type/Common';
import { LayoutType } from 'Type/Layout';

import './AddToCart.style';

/**
 * Button for adding product to Cart
 * @class AddToCart
 * @namespace Component/AddToCart/Component
 */
export class AddToCart extends PureComponent {
    static propTypes = {
        addProductToCart: PropTypes.func.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        isAdding: PropTypes.bool.isRequired,
        isPlaceholder: PropTypes.bool.isRequired,

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

    renderContent() {
        const {
            isAdding,
            isPlaceholder
        } = this.props;

        if (isPlaceholder) {
            return null;
        }

        return (
            <>
                { this.renderCartIcon() }
                <span>{ isAdding ? __('Adding...') : __('Add to cart') }</span>
            </>
        );
    }

    render() {
        const {
            mix,
            addProductToCart,
            layout,
            isDisabled,
            isAdding,
            isPlaceholder
        } = this.props;

        return (
            <button
              onClick={ addProductToCart }
              block="Button AddToCart"
              mix={ mix }
              mods={ { layout, isPlaceholder } }
              disabled={ isPlaceholder || isDisabled || isAdding }
            >
                { this.renderContent() }
            </button>
        );
    }
}

export default AddToCart;
