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
import SourceWishlist from 'Component/MyAccountMyWishlist/MyAccountMyWishlist.component';
import Loader from 'Component/Loader';

import './WishlistSharedPage.style';
import SharedWishlistItem from 'Component/SharedWishlistItem';

export default class WishlistSharedPage extends SourceWishlist {
    static propTypes = {
        creatorsName: PropTypes.string.isRequired
    };

    renderActionLine() {
        return (
            <div block="WishlistSharedPage" elem="ActionBar">
                { this.renderAddAllToCart() }
            </div>
        );
    }

    renderProduct = ([id, product]) => <SharedWishlistItem key={ id } product={ product } />;

    renderCreatorsInfo() {
        const { creatorsName } = this.props;

        return (
            <div block="WishlistSharedPage" elem="CreatorsInfo">
                <h2>
                    { __('Wishlist shared by %s', creatorsName) }
                </h2>
            </div>
        );
    }

    renderContent() {
        const {
            isWishlistLoading,
            isWishlistEmpty,
            isLoading
        } = this.props;

        if (isWishlistEmpty && !isWishlistLoading) return this.renderNoProductsFound();

        return (
            <div block="WishlistSharedPage" elem="Products">
                <Loader isLoading={ isLoading } />
                { ((isWishlistLoading && isWishlistEmpty)
                    ? this.renderPlaceholders()
                    : this.renderProducts()
                ) }
            </div>
        );
    }

    render() {
        return (
            <div block="WishlistSharedPage">
                { this.renderActionLine() }
                { this.renderCreatorsInfo() }
                { this.renderContent() }
            </div>
        );
    }
}
