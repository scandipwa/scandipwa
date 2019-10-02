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
import { isSignedIn } from 'Util/Auth';

export default class ProductWishlistButton extends PureComponent {
    static propTypes = {
        isReady: PropTypes.bool,
        quantity: PropTypes.number,
        isDisabled: PropTypes.bool,
        isInWishlist: PropTypes.bool,
        product: ProductType.isRequired,
        addToWishlist: PropTypes.func.isRequired,
        removeFromWishlist: PropTypes.func.isRequired,
        mix: PropTypes.shape({ block: PropTypes.string, elem: PropTypes.string, mod: PropTypes.string })
    };

    static defaultProps = {
        mix: {
            block: '',
            elem: '',
            mod: ''
        },
        quantity: 1,
        isReady: true,
        isDisabled: false,
        isInWishlist: false
    };

    getTitle = () => {
        const { isInWishlist, isReady } = this.props;

        if (!isSignedIn()) return __('Please sign in first!');

        if (!isReady) return __('Please select variant first!');

        if (isInWishlist) return __('Remove from Wishlist');

        return __('Add to Wishlist');
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
              mix={ mix }
              disabled={ isDisabled }
              title={ this.getTitle() }
              onClick={ this.onClick }
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
