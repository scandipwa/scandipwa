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

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    MyAccountMyWishlistContainer,
} from 'Component/MyAccountMyWishlist/MyAccountMyWishlist.container';
import WishlistQuery from 'Query/Wishlist.query';
import { Wishlist } from 'Query/Wishlist.type';
import BreadcrumbsDispatcher from 'Store/Breadcrumbs/Breadcrumbs.dispatcher';
import { updateNoMatch } from 'Store/NoMatch/NoMatch.action';
import { ReactElement } from 'Type/Common.type';
import { getIndexedProduct } from 'Util/Product';
import { prepareQuery } from 'Util/Query';
import { FIVE_MINUTES_IN_SECONDS } from 'Util/Request/Config';
import { getErrorMessage } from 'Util/Request/Error';
import { executeGet } from 'Util/Request/Request';
import { RootState } from 'Util/Store/Store.type';

import WishlistShared from './WishlistSharedPage.component';
import {
    WishlistSharedPageContainerMapDispatchProps,
    WishlistSharedPageContainerMapStateProps,
    WishlistSharedPageContainerProps,
    WishlistSharedPageContainerState,
} from './WishlistSharedPage.type';

/** @namespace Route/WishlistSharedPage/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): WishlistSharedPageContainerMapStateProps => ({
    ...sourceMapStateToProps(state),
});

/** @namespace Route/WishlistSharedPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): WishlistSharedPageContainerMapDispatchProps => ({
    ...sourceMapDispatchToProps(dispatch),
    showNoMatch: () => dispatch(updateNoMatch(true)),
    updateBreadcrumbs: (breadcrumbs) => BreadcrumbsDispatcher.update(breadcrumbs, dispatch),
});

/** @namespace Route/WishlistSharedPage/Container */
export class WishlistSharedPageContainer extends MyAccountMyWishlistContainer<
WishlistSharedPageContainerProps,
WishlistSharedPageContainerState
> {
    static defaultProps: Partial<WishlistSharedPageContainerProps> = MyAccountMyWishlistContainer.defaultProps;

    state: WishlistSharedPageContainerState = {
        creatorsName: '',
        wishlistItems: {},
        isWishlistLoading: true,
        isLoading: false,
        loadingItemsMap: {},
        isQtyUpdateInProgress: false,
    };

    componentDidMount(): void {
        this.requestWishlist();
    }

    componentDidUpdate(prevProps: WishlistSharedPageContainerProps): void {
        const { match: { params = {} } } = prevProps;
        const { code } = params as Record<string, string>;

        if (this.getCode() !== code) {
            this.requestWishlist();
        }
    }

    setLoading(isLoading = true): void {
        this.setState({ isWishlistLoading: isLoading, isLoading });
    }

    addAllToCart(): Promise<void> {
        const { showError, moveWishlistToCart } = this.props;
        const sharingCode = this.getCode();

        this.setState({ isLoading: true });

        return moveWishlistToCart(sharingCode).then(
            /** @namespace Route/WishlistSharedPage/Container/WishlistSharedPageContainer/addAllToCart/moveWishlistToCart/then */
            () => this.showNotificationAndRemoveLoading('Wishlist moved to cart'),
            /** @namespace Route/WishlistSharedPage/Container/WishlistSharedPageContainer/addAllToCart/moveWishlistToCart/then/showError/catch */
            (error) => showError(getErrorMessage(error)),
        );
    }

    requestWishlist(): void {
        const { showError, showNoMatch, updateBreadcrumbs } = this.props;

        const code = this.getCode();
        const query = prepareQuery([WishlistQuery.getWishlistQuery(code)]);

        updateBreadcrumbs([]);
        this.setLoading();

        executeGet<{ wishlist: Wishlist }>(query, 'SharedWishlist', FIVE_MINUTES_IN_SECONDS).then(
            /** @namespace Route/WishlistSharedPage/Container/WishlistSharedPageContainer/requestWishlist/executeGet/then */
            ({ wishlist, wishlist: { items_count, creators_name: creatorsName } = {} }) => {
                if (!items_count || !creatorsName) {
                    this.setLoading(false);

                    return;
                }

                const wishlistItems = wishlist.items.reduce((prev, wishlistItem) => {
                    const {
                        id,
                        sku,
                        product,
                        description,
                        qty: quantity,
                    } = wishlistItem;

                    const indexedProduct = getIndexedProduct(product);

                    return {
                        ...prev,
                        [ id ]: {
                            quantity,
                            wishlist: {
                                id,
                                sku,
                                quantity,
                                description,
                            },
                            ...indexedProduct,
                        },
                    };
                }, {});

                updateBreadcrumbs([
                    { name: creatorsName, url: `/wishlist/shared/${code}` },
                    { name: __('Shared Wishlist'), url: '/' },
                ]);

                this.setState({
                    creatorsName,
                    wishlistItems,
                    isLoading: false,
                    isWishlistLoading: false,
                });
            },
            /** @namespace Route/WishlistSharedPage/Container/WishlistSharedPageContainer/requestWishlist/executeGet/then/catch */
            (error) => {
                showError(getErrorMessage(error));
                showNoMatch();
            },
        );
    }

    _getIsWishlistEmpty(): boolean {
        const { wishlistItems } = this.state;

        return Object.entries(wishlistItems).length <= 0;
    }

    getCode(): string {
        const { match: { params = {} } } = this.props;
        const { code } = params as Record<string, string>;

        return code;
    }

    render(): ReactElement {
        return (
            <WishlistShared
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishlistSharedPageContainer);
