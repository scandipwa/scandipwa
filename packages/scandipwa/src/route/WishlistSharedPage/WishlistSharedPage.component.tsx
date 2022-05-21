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

import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader';
import SourceWishlist from 'Component/MyAccountMyWishlist/MyAccountMyWishlist.component';
import SharedWishlistItem from 'Component/SharedWishlistItem';
import { WishlistProduct } from 'Store/Wishlist/Wishlist.type';
import { ObjectEntries, ReactElement } from 'Type/Common.type';

import './WishlistSharedPage.style';

/** @namespace Route/WishlistSharedPage/Component */
export class WishlistSharedPage extends SourceWishlist {
    static propTypes = {
        creatorsName: PropTypes.string.isRequired
    };

    renderActionLine(): ReactElement {
        return (
            <div block="WishlistSharedPage" elem="ActionBar">
                { this.renderAddAllToCart() }
            </div>
        );
    }

    renderProduct([id, product]: ObjectEntries<Record<string, WishlistProduct>>): ReactElement {
        return (
            <SharedWishlistItem
              key={ id }
              product={ product }
            />
        );
    }

    renderCreatorsInfo(): ReactElement {
        const { creatorsName } = this.props;

        return (
            <h1 block="WishlistSharedPage" elem="CreatorsInfo">
                { __('Wishlist shared by ') }
                <strong>{ creatorsName }</strong>
            </h1>
        );
    }

    renderContent(): ReactElement {
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

    render(): ReactElement {
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
