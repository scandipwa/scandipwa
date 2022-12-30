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

import { ComponentType, PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Dispatch } from 'redux';

import { SHARE_WISHLIST_POPUP_ID } from 'Component/ShareWishlistPopup/ShareWishlistPopup.config';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { showPopup } from 'Store/Popup/Popup.action';
import { NetworkError, ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth';
import { scrollToTop } from 'Util/Browser';
import { getErrorMessage } from 'Util/Request';
import { RootState } from 'Util/Store/Store.type';
import { getPageFromUrl } from 'Util/Url';

import MyAccountMyWishlist from './MyAccountMyWishlist.component';
import {
    MyAccountMyWishlistComponentProps,
    MyAccountMyWishlistContainerFunctions,
    MyAccountMyWishlistContainerMapDispatchProps,
    MyAccountMyWishlistContainerMapStateProps,
    MyAccountMyWishlistContainerProps,
    MyAccountMyWishlistContainerPropsKeys,
    MyAccountMyWishlistContainerState,
} from './MyAccountMyWishlist.type';

export const WishlistDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Wishlist/Wishlist.dispatcher'
);

/** @namespace Component/MyAccountMyWishlist/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountMyWishlistContainerMapStateProps => ({
    wishlistItems: state.WishlistReducer.productsInWishlist,
    isWishlistLoading: state.WishlistReducer.isLoading,
    wishlistPageInfo: state.WishlistReducer.pageInfo,
    isMobile: state.ConfigReducer.device.isMobile,
});

/** @namespace Component/MyAccountMyWishlist/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): MyAccountMyWishlistContainerMapDispatchProps => ({
    clearWishlist: () => WishlistDispatcher.then(
        ({ default: dispatcher }) => dispatcher.clearWishlist(dispatch),
    ),
    moveWishlistToCart: (productsPerPage) => WishlistDispatcher.then(
        ({ default: dispatcher }) => dispatcher.moveWishlistToCart(dispatch, productsPerPage),
    ),
    showPopup: (payload) => dispatch(showPopup(SHARE_WISHLIST_POPUP_ID, payload)),
    showNotification: (message) => dispatch(showNotification(NotificationType.SUCCESS, message)),
    showError: (message) => dispatch(showNotification(NotificationType.ERROR, message)),
    removeSelectedFromWishlist: (options) => WishlistDispatcher.then(
        ({ default: dispatcher }) => dispatcher.removeItemsFromWishlist(dispatch, options),
    ),
    updateWishlistProducts: (page, productsPerPage) => WishlistDispatcher.then(
        ({ default: dispatcher }) => dispatcher.updateWishlistProducts(dispatch, page, productsPerPage),
    ),
});

/** @namespace Component/MyAccountMyWishlist/Container */
export class MyAccountMyWishlistContainer<
P extends MyAccountMyWishlistContainerProps = MyAccountMyWishlistContainerProps,
S extends MyAccountMyWishlistContainerState = MyAccountMyWishlistContainerState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<MyAccountMyWishlistContainerProps> = {
        creatorsName: '',
    };

    containerFunctions: MyAccountMyWishlistContainerFunctions = {
        removeAll: this.removeAll.bind(this),
        addAllToCart: this.addAllToCart.bind(this),
        shareWishlist: this.shareWishlist.bind(this),
        removeSelectedFromWishlist: this.removeSelectedFromWishlist.bind(this),
        setIsQtyUpdateInProgress: this.setIsQtyUpdateInProgress.bind(this),
        setProductsPerPage: this.setProductsPerPage.bind(this),
    };

    __construct(props: MyAccountMyWishlistContainerProps): void {
        super.__construct?.(props);

        this.state = {
            isLoading: false,
            loadingItemsMap: {} as Record<string, boolean>,
            isQtyUpdateInProgress: false,
            productsPerPage: 10,
        } as S;
    }

    componentDidMount(): void {
        const { updateWishlistProducts, location } = this.props;
        const { productsPerPage } = this.state;
        const page = getPageFromUrl(location);

        updateWishlistProducts(page, productsPerPage);
    }

    componentDidUpdate(prevProps: P, prevState: S): void {
        const { location, wishlistItems } = this.props;
        const { location: prevLocation } = prevProps;
        const { productsPerPage: prevProductsPerPage } = prevState;
        const { productsPerPage } = this.state;

        const prevPage = getPageFromUrl(prevLocation);
        const currentPage = getPageFromUrl(location);

        if (currentPage !== prevPage || productsPerPage !== prevProductsPerPage) {
            this.loadWishlistPage(currentPage);
        }

        if (!Object.values(wishlistItems).length && currentPage !== 1) {
            this.loadWishlistPage(currentPage - 1);
        }
    }

    containerProps(): Pick<MyAccountMyWishlistComponentProps, MyAccountMyWishlistContainerPropsKeys> {
        const {
            isLoading,
            loadingItemsMap,
            isQtyUpdateInProgress,
        } = this.state;

        const {
            isWishlistLoading,
            creatorsName,
            wishlistItems,
            isEditingActive,
            isMobile,
            wishlistPageInfo,
        } = this.props;

        const isWishlistEmpty = this._getIsWishlistEmpty();

        return {
            isWishlistLoading,
            isWishlistEmpty,
            isLoading,
            isActionsDisabled: isWishlistLoading || isWishlistEmpty,
            loadingItemsMap,
            creatorsName,
            wishlistItems,
            isEditingActive,
            isMobile,
            isQtyUpdateInProgress,
            wishlistPageInfo,
        };
    }

    loadWishlistPage(page = 1) {
        const { updateWishlistProducts } = this.props;
        const { productsPerPage } = this.state;

        updateWishlistProducts(page, productsPerPage);
        scrollToTop();
    }

    setProductsPerPage(productsPerPage: number) {
        this.setState({ productsPerPage });
    }

    setIsQtyUpdateInProgress(status: boolean): void {
        this.setState({ isQtyUpdateInProgress: status });
    }

    getIsComplete(): boolean {
        const { isQtyUpdateInProgress } = this.state;

        return !isQtyUpdateInProgress;
    }

    async addAllToCart(): Promise<void> {
        if (!isSignedIn()) {
            return;
        }

        this.setState({ isLoading: true });

        await this.addAllToCartAsync();
    }

    async addAllToCartAsync(): Promise<void> {
        const { moveWishlistToCart } = this.props;
        const { productsPerPage } = this.state;

        if (!isSignedIn) {
            return;
        }

        try {
            await moveWishlistToCart(productsPerPage);
        } catch (error) {
            this.showErrorAndRemoveLoading(getErrorMessage(error as NetworkError));
        }
    }

    async removeAll(): Promise<void> {
        const { clearWishlist } = this.props;

        if (!isSignedIn()) {
            return;
        }

        this.setState({ isLoading: true });

        try {
            await clearWishlist();
            this.showNotificationAndRemoveLoading('Wishlist cleared');
        } finally {
            this.setState({ isLoading: false });
        }
    }

    removeSelectedFromWishlist(selectedIdMap: string[]): void | null {
        const { removeSelectedFromWishlist } = this.props;
        const { loadingItemsMap: prevLoadingItemsMap } = this.state;

        if (!isSignedIn()) {
            return null;
        }

        const loadingItemsMap = { ...prevLoadingItemsMap };

        selectedIdMap.forEach((id: string) => {
            (loadingItemsMap as Record<string, boolean>)[ id ] = true;
        });

        this.setState({ loadingItemsMap });

        return removeSelectedFromWishlist(selectedIdMap);
    }

    shareWishlist(): void {
        const { showPopup } = this.props;

        showPopup({ title: __('Share Wishlist') });
    }

    _getIsWishlistEmpty(): boolean {
        const {
            wishlistPageInfo: { totalProducts },
        } = this.props;

        return totalProducts === 0;
    }

    showNotificationAndRemoveLoading(message: string): void {
        const { showNotification } = this.props;

        this.setState({ isLoading: false });
        showNotification(message);
    }

    showErrorAndRemoveLoading(message: string): void {
        const { showError } = this.props;

        try {
            const errorMessages = JSON.parse(message);

            errorMessages.forEach((err: string) => {
                showError(err);
            });
        } catch {
            showError(message);
        }

        this.setState({ isLoading: false });
    }

    render(): ReactElement {
        return (
            <MyAccountMyWishlist
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
    // eslint-disable-next-line max-len
    MyAccountMyWishlistContainer as unknown as ComponentType<RouteComponentProps & MyAccountMyWishlistContainerProps>,
));
