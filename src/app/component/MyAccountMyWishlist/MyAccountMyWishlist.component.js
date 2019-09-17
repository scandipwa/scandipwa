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
