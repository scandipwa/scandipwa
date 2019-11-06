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
import { connect } from 'react-redux';
import { MatchType } from 'Type/Common';

import { MyAccountMyWishlistContainer } from 'Component/MyAccountMyWishlist/MyAccountMyWishlist.container';
import { WishlistDispatcher } from 'Store/Wishlist';
import { showNotification } from 'Store/Notification';
import { executeGet } from 'Util/Request';
import { prepareQuery } from 'Util/Query';
import { WishlistQuery } from 'Query';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import { FIVE_MINUTES_IN_SECONDS } from 'Util/Request/QueryDispatcher';
import { getIndexedParameteredProducts } from 'Util/Product';
import { updateNoMatch } from 'Store/NoMatch';

import WishlistShared from './WishlistSharedPage.component';

export const mapDispatchToProps = dispatch => ({
    clearWishlist: () => WishlistDispatcher.clearWishlist(dispatch),
    moveWishlistToCart: () => WishlistDispatcher.moveWishlistToCart(dispatch),
    showNotification: message => dispatch(showNotification('success', message)),
    showError: message => dispatch(showNotification('error', message)),
    showNoMatch: () => dispatch(updateNoMatch(true)),
    updateBreadcrumbs: breadcrumbs => BreadcrumbsDispatcher.update(breadcrumbs, dispatch)
});

export class WishlistSharedContainer extends MyAccountMyWishlistContainer {
    static propTypes = {
        match: MatchType.isRequired,
        showError: PropTypes.func.isRequired,
        showNoMatch: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired
    };

    state = {
        creatorsName: '',
        wishlistItems: {},
        isWishlistLoading: true,
        isLoading: false
    };

    componentDidMount() {
        this.requestWishlist();
    }

    componentDidUpdate(prevProps) {
        const { match: { params: { code } } } = prevProps;

        if (this.getCode() !== code) {
            this.requestWishlist();
        }
    }

    setLoading(isLoading = true) {
        this.setState({ isWishlistLoading: isLoading, isLoading });
    }

    addAllToCart = () => {
        const { moveWishlistToCart } = this.props;

        this.setState({ isLoading: true });

        // TODO! Add wishlist sharing code and support for guest cart after BE
        return moveWishlistToCart().then(
            () => this.showNotificationAndRemoveLoading('Wishlist moved to cart')
        );
    };

    requestWishlist() {
        const { showError, showNoMatch, updateBreadcrumbs } = this.props;

        const code = this.getCode();
        const query = prepareQuery([WishlistQuery.getWishlistQuery(code)]);

        updateBreadcrumbs([]);
        this.setLoading();

        executeGet(query, 'SharedWishlist', FIVE_MINUTES_IN_SECONDS).then(
            ({ wishlist, wishlist: { items_count, creators_name: creatorsName } = {} }) => {
                if (!items_count) {
                    this.setLoading(false);
                    return;
                }

                const wishlistItems = getIndexedParameteredProducts(
                    wishlist.items.reduce((prev, wishlistItem) => {
                        const {
                            id,
                            sku,
                            product,
                            description,
                            qty: quantity
                        } = wishlistItem;

                        return {
                            ...prev,
                            [id]: {
                                ...product,
                                quantity,
                                wishlist: {
                                    id,
                                    sku,
                                    quantity,
                                    description
                                }
                            }
                        };
                    }, {})
                );

                updateBreadcrumbs([
                    { name: creatorsName, url: `/wishlist/shared/${code}` },
                    { name: __('Shared Wishlist'), url: '/' }
                ]);

                this.setState({
                    creatorsName,
                    wishlistItems,
                    isLoading: false,
                    isWishlistLoading: false
                });
            },
            ([{ message }]) => {
                showError(message);
                showNoMatch();
            }
        );
    }

    _getIsWishlistEmpty = () => {
        const { wishlistItems } = this.state;
        return Object.entries(wishlistItems).length <= 0;
    };

    getCode() {
        const { match: { params: { code } } } = this.props;
        return code;
    }

    render() {
        return (
            <WishlistShared
              { ...this.props }
              { ...this.state }
              { ...this.containerProps() }
              { ...this.containerFunctions() }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(WishlistSharedContainer);
