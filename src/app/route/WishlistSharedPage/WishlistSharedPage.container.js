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

import { MyAccountMyWishlistContainer } from 'Component/MyAccountMyWishlist/MyAccountMyWishlist.container';
import WishlistQuery from 'Query/Wishlist.query';
import { updateNoMatch } from 'Store/NoMatch/NoMatch.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { MatchType } from 'Type/Common';
import { getIndexedProduct } from 'Util/Product';
import { prepareQuery } from 'Util/Query';
import { executeGet } from 'Util/Request';
import { FIVE_MINUTES_IN_SECONDS } from 'Util/Request/QueryDispatcher';

import WishlistShared from './WishlistSharedPage.component';

const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);
const WishlistDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Wishlist/Wishlist.dispatcher'
);

export const mapDispatchToProps = (dispatch) => ({
    clearWishlist: () => WishlistDispatcher.then(({ default: dispatcher }) => dispatcher.clearWishlist(dispatch)),
    moveWishlistToCart: (sharingCode) => WishlistDispatcher.then(
        ({ default: dispatcher }) => dispatcher.moveWishlistToCart(dispatch, sharingCode)
    ),
    showNotification: (message) => dispatch(showNotification('success', message)),
    showError: (message) => dispatch(showNotification('error', message)),
    showNoMatch: () => dispatch(updateNoMatch(true)),
    updateBreadcrumbs: (breadcrumbs) => BreadcrumbsDispatcher.then(
        ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)
    )
});

export class WishlistSharedPageContainer extends MyAccountMyWishlistContainer {
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
        const { showError, moveWishlistToCart } = this.props;
        const sharingCode = this.getCode();

        this.setState({ isLoading: true });

        return moveWishlistToCart(sharingCode).then(
            () => this.showNotificationAndRemoveLoading('Wishlist moved to cart'),
            ([{ message }]) => showError(message)
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

                const wishlistItems = wishlist.items.reduce((prev, wishlistItem) => {
                    const {
                        id,
                        sku,
                        product,
                        description,
                        qty: quantity
                    } = wishlistItem;

                    const indexedProduct = getIndexedProduct(product);

                    return {
                        ...prev,
                        [id]: {
                            quantity,
                            wishlist: {
                                id,
                                sku,
                                quantity,
                                description
                            },
                            ...indexedProduct
                        }
                    };
                }, {});

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

export default connect(null, mapDispatchToProps)(WishlistSharedPageContainer);
