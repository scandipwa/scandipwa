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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import HeartIcon from 'Component/HeartIcon';
import Loader from 'Component/Loader';
import { MixType } from 'Type/Common';
import { MagentoProductType } from 'Type/ProductList';

import './ProductWishlistButton.style';

/** @namespace Component/ProductWishlistButton/Component */
export class ProductWishlistButton extends PureComponent {
    static propTypes = {
        magentoProduct: PropTypes.arrayOf(MagentoProductType).isRequired,

        isPlaceholder: PropTypes.bool,
        isLoading: PropTypes.bool,
        isDisabled: PropTypes.bool,
        isInWishlist: PropTypes.bool,
        isSignedIn: PropTypes.bool.isRequired,

        addToWishlist: PropTypes.func.isRequired,
        removeFromWishlist: PropTypes.func.isRequired,

        mix: MixType
    };

    static defaultProps = {
        mix: {},
        isPlaceholder: false,
        isLoading: false,
        isDisabled: false,
        isInWishlist: false
    };

    getTitle = () => {
        const { isInWishlist, isSignedIn } = this.props;

        if (!isSignedIn) {
            return __('Please sign in first!');
        }

        if (isInWishlist) {
            return __('Remove from Wishlist');
        }

        return __('Add to Wishlist');
    };

    onClick = (e) => {
        const {
            magentoProduct,
            isInWishlist,
            addToWishlist,
            removeFromWishlist
        } = this.props;

        e.preventDefault();

        if (!isInWishlist) {
            return addToWishlist(magentoProduct);
        }

        return removeFromWishlist(magentoProduct);
    };

    renderButton() {
        const {
            isInWishlist,
            isDisabled,
            isPlaceholder,
            mix
        } = this.props;

        return (
            <button
              block="ProductWishlistButton"
              elem="Button"
              mods={ { isInWishlist, isDisabled } }
              mix={ { block: 'Button', mix } }
              title={ this.getTitle() }
              onClick={ this.onClick }
              disabled={ isPlaceholder }
            >
                { !isPlaceholder && <HeartIcon isActive={ isInWishlist } /> }
            </button>
        );
    }

    renderLoader() {
        const { isLoading } = this.props;

        return (
            <Loader isLoading={ isLoading } />
        );
    }

    renderContent() {
        const { isPlaceholder } = this.props;

        return (
            <div block="ProductWishlistButton" mods={ { isPlaceholder } }>
                { this.renderButton() }
                { this.renderLoader() }
            </div>
        );
    }

    render() {
        const { magentoProduct } = this.props;

        if (Array.isArray(magentoProduct) && magentoProduct.length > 0) {
            return this.renderContent();
        }

        return null;
    }
}

export default ProductWishlistButton;
