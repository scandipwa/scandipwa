/* eslint-disable max-len */
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
import PropTypes from 'prop-types';
import TextPlaceholder from 'Component/TextPlaceholder';
import { ProductType } from 'Type/ProductList';

export default class ProductWishlistButton extends PureComponent {
    static propTypes = {
        product: ProductType,
        quantity: PropTypes.number,
        isDisabled: PropTypes.bool,
        isInWishlist: PropTypes.bool,
        addToWishlist: PropTypes.func,
        removeFromWishlist: PropTypes.func,
        mix: PropTypes.shape({ block: PropTypes.string, elem: PropTypes.string, mod: PropTypes.string })
    };

    static defaultProps = {
        mix: {
            block: '',
            elem: '',
            mod: ''
        },
        product: {},
        quantity: 1,
        isDisabled: false,
        isInWishlist: false,
        addToWishlist: () => {},
        removeFromWishlist: () => {}
    };

    onClick = () => {
        const {
            product,
            quantity,
            isInWishlist,
            addToWishlist,
            removeFromWishlist
        } = this.props;

        if (!isInWishlist) return addToWishlist(product, quantity);

        return removeFromWishlist(product, quantity);
    };

    renderPlaceholder() {
        return <TextPlaceholder length="short" />;
    }

    renderButton() {
        const { isInWishlist, isDisabled, mix } = this.props;

        return (
            <button
              block="Button"
              disabled={ isDisabled }
              onClick={ this.onClick }
              mix={ mix }
              title={ !isInWishlist ? __('Add to Wishlist') : __('Remove from Wishlist') }
            >
               { !isInWishlist ? __('Add to Wishlist') : __('Remove from Wishlist') }
            </button>
        );
    }

    render() {
        const { product: { id } = {} } = this.props;

        return (
            id !== -1
                ? this.renderButton()
                : this.renderPlaceholder()
        );
    }
}
