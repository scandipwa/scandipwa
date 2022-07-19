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
import PropTypes from 'prop-types';

import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader';
import SourceWishlist from 'Component/MyAccountMyWishlist/MyAccountMyWishlist.component';
import SharedWishlistItem from 'Component/SharedWishlistItem';

import './WishlistSharedPage.style';

/** @namespace Route/WishlistSharedPage/Component */
export class WishlistSharedPage extends SourceWishlist {
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

    renderProduct([id, product]) {
        return (
            <SharedWishlistItem
              key={ id }
              product={ product }
            />
        );
    }

    renderCreatorsInfo() {
        const { creatorsName } = this.props;

        return (
            <h1 block="WishlistSharedPage" elem="CreatorsInfo">
                { __('Wishlist shared by ') }
                <strong>{ creatorsName }</strong>
            </h1>
        );
    }

    renderContent() {
        const {
            isWishlistLoading,
            isWishlistEmpty,
            isLoading
        } = this.props;

        if (isWishlistEmpty && !isWishlistLoading) {
            return this.renderNoProductsFound();
        }

        return (
            <div block="WishlistSharedPage" elem="Products">
                <Loader isLoading={ isLoading } />
                { this.renderProducts() }
            </div>
        );
    }

    render() {
        return (
            <main block="WishlistSharedPage">
                <ContentWrapper>
                    { this.renderActionLine() }
                    { this.renderCreatorsInfo() }
                    { this.renderContent() }
                </ContentWrapper>
            </main>
        );
    }
}

export default WishlistSharedPage;
