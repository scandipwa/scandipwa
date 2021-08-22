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

export class AddToCart extends PureComponent {
    static propTypes = {
        addProductToCart: PropTypes.func.isRequired,
        isDisabled: PropTypes.bool.isRequired,

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
            addProductToCart,
            layout,
            isDisabled
        } = this.props;

        return (
            <button
              onClick={ addProductToCart }
              block="Button AddToCart"
              mix={ mix }
              mods={ { layout } }
              disabled={ isDisabled }
            >
                { this.renderCartIcon() }
                <span>{ __('Add to cart') }</span>
            </button>
        );
    }
}

export default AddToCart;
