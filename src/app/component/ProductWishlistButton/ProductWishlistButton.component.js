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
import './ProductWishlistButton.style';

export default class ProductWishlistButton extends PureComponent {
    static propTypes = {
        product: ProductType,
        isDisabled: PropTypes.bool,
        quantity: PropTypes.number,
        isInWishlist: PropTypes.bool,
        addToWishlist: PropTypes.func,
        removeFromWishlist: PropTypes.func
    };

    static defaultProps = {
        product: {},
        quantity: 1,
        isDisabled: false,
        addToWishlist: () => {},
        removeFromWishlist: () => {},
        isInWishlist: false
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

    renderPlusHeart() {
        const { isDisabled } = this.props;

        return (
            <svg xmlns="http://www.w3.org/2000/svg" block="ProductWishlistButton" elem="PlusHeart" mods={ { isDisabled } } width="28" height="28" viewBox="0 0 24 24">
                <path d="M15.653 19.415c-1.162 1.141-2.389 2.331-3.653 3.585-6.43-6.381-12-11.147-12-15.808 0-4.005 3.098-6.192 6.281-6.192 2.197 0 4.434 1.042 5.719 3.248 1.279-2.195 3.521-3.238 5.726-3.238 3.177 0 6.274 2.171 6.274 6.182 0 1.269-.424 2.546-1.154 3.861l-1.483-1.484c.403-.836.637-1.631.637-2.377 0-2.873-2.216-4.182-4.274-4.182-3.257 0-4.976 3.475-5.726 5.021-.747-1.54-2.484-5.03-5.72-5.031-2.315-.001-4.28 1.516-4.28 4.192 0 3.442 4.742 7.85 10 13l2.239-2.191 1.414 1.414zm7.347-5.415h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2z" />
            </svg>
        );
    }

    renderMinusHeart() {
        const { isDisabled } = this.props;

        return (
            <svg xmlns="http://www.w3.org/2000/svg" block="ProductWishlistButton" elem="MinusHeart" mods={ { isDisabled } } width="28" height="28" viewBox="0 0 24 24">
                <path d="M15.582 19.485c-1.141 1.119-2.345 2.287-3.582 3.515-6.43-6.381-12-11.147-12-15.808 0-4.005 3.098-6.192 6.281-6.192 2.197 0 4.434 1.042 5.719 3.248 1.279-2.195 3.521-3.238 5.726-3.238 3.177 0 6.274 2.171 6.274 6.182 0 1.577-.649 3.168-1.742 4.828l-1.447-1.447c.75-1.211 1.189-2.341 1.189-3.381 0-2.873-2.216-4.182-4.274-4.182-3.257 0-4.976 3.475-5.726 5.021-.747-1.54-2.484-5.03-5.72-5.031-2.315-.001-4.28 1.516-4.28 4.192 0 3.442 4.742 7.85 10 13l2.168-2.121 1.414 1.414zm7.418-5.485h-8v2h8v-2z" />
            </svg>
        );
    }

    renderPlaceholder() {
        return <TextPlaceholder length="short" />;
    }

    renderButton() {
        const { isInWishlist, isDisabled } = this.props;

        return (
            <button
              onClick={ this.onClick }
              title={ !isInWishlist ? __('Add to Wishlist') : __('Remove from Wishlist') }
              disabled={ isDisabled }
            >
               { !isInWishlist ? this.renderPlusHeart() : this.renderMinusHeart() }
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
