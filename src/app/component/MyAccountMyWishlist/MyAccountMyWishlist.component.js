import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ProductCard from 'Component/ProductCard';
import { ProductType } from 'Type/ProductList';
import './MyAccountMyWishlist.style';

export default class MyAccountMyWishlist extends PureComponent {
    static propTypes = {
        wishlistItems: PropTypes.objectOf(ProductType).isRequired
    };

    renderWishlistItems() {
        const { wishlistItems } = this.props;

        const entries = Object.entries(wishlistItems);

        return (
            <>
                { entries.length > 0 ? entries.map(([id, product]) => <ProductCard key={ id } product={ product } />) : __('No products were found in your wishlist') }
            </>
        );
    }

    render() {
        return (
            <div block="MyAccountMyWishlist">
                { this.renderWishlistItems() }
            </div>
        );
    }
}
