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
import { ProductType } from 'Type/ProductList';
import ProductList from 'Component/ProductList/ProductList.component';
import './MyAccountMyWishlist.style';

export default class MyAccountMyWishlist extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool,
        wishlistItems: PropTypes.objectOf(ProductType).isRequired
    };

    static defaultProps = {
        isLoading: false
    };

    renderWishlistItems() {
        const { isLoading, wishlistItems } = this.props;

        const items = Object.values(wishlistItems);
        const pages = { 1: items };

        return <ProductList pages={ pages } totalPages={ +(items.length > 0) } isLoading={ isLoading } />;
    }

    render() {
        return (
            <div block="MyAccountMyWishlist">
                { this.renderWishlistItems() }
            </div>
        );
    }
}
