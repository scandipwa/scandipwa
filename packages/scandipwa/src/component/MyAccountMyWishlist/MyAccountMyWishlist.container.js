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
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { SHARE_WISHLIST_POPUP_ID } from 'Component/ShareWishlistPopup/ShareWishlistPopup.config';
import { showNotification } from 'Store/Notification/Notification.action';
import { showPopup } from 'Store/Popup/Popup.action';
import { ProductType } from 'Type/ProductList.type';
import { isSignedIn } from 'Util/Auth';
import { getErrorMessage } from 'Util/Request';

import MyAccountMyWishlist from './MyAccountMyWishlist.component';

export const WishlistDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Wishlist/Wishlist.dispatcher'
);

/** @namespace Component/MyAccountMyWishlist/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    wishlistItems: state.WishlistReducer.productsInWishlist,
    isWishlistLoading: state.WishlistReducer.isLoading,
    isMobile: state.ConfigReducer.device.isMobile
});

/** @namespace Component/MyAccountMyWishlist/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    clearWishlist: () => WishlistDispatcher.then(
        ({ default: dispatcher }) => dispatcher.clearWishlist(dispatch)
    ),
    moveWishlistToCart: () => WishlistDispatcher.then(
        ({ default: dispatcher }) => dispatcher.moveWishlistToCart(dispatch)
    ),
    showPopup: (payload) => dispatch(showPopup(SHARE_WISHLIST_POPUP_ID, payload)),
    showNotification: (message) => dispatch(showNotification('success', message)),
    showError: (message) => dispatch(showNotification('error', message)),
    removeSelectedFromWishlist: (options) => WishlistDispatcher.then(
        ({ default: dispatcher }) => dispatcher.removeItemsFromWishlist(dispatch, options)
    )
});

/** @namespace Component/MyAccountMyWishlist/Container */
export class MyAccountMyWishlistContainer extends PureComponent {
    static propTypes = {
        showPopup: PropTypes.func.isRequired,
        showError: PropTypes.func.isRequired,
        clearWishlist: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        moveWishlistToCart: PropTypes.func.isRequired,
        wishlistItems: PropTypes.objectOf(ProductType).isRequired,
        isWishlistLoading: PropTypes.bool.isRequired,
        removeSelectedFromWishlist: PropTypes.func.isRequired,
        creatorsName: PropTypes.string,
        isEditingActive: PropTypes.bool.isRequired,
        isMobile: PropTypes.bool.isRequired
    };

    static defaultProps = {
        creatorsName: ''
    };

    state = {
        isLoading: false,
        loadingItemsMap: {},
        isQtyUpdateInProgress: false
    };

    containerFunctions = {
        removeAll: this.removeAll.bind(this),
        addAllToCart: this.addAllToCart.bind(this),
        shareWishlist: this.shareWishlist.bind(this),
        removeSelectedFromWishlist: this.removeSelectedFromWishlist.bind(this),
        setIsQtyUpdateInProgress: this.setIsQtyUpdateInProgress.bind(this)
    };

    containerProps() {
        const {
            isLoading,
            loadingItemsMap,
            isQtyUpdateInProgress
        } = this.state;

        const {
            isWishlistLoading,
            creatorsName,
            wishlistItems,
            isEditingActive,
            isMobile
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
            isQtyUpdateInProgress
        };
    }

    setIsQtyUpdateInProgress(status) {
        this.setState({ isQtyUpdateInProgress: status });
    }

    getIsComplete() {
        const { isQtyUpdateInProgress } = this.state;

        return !isQtyUpdateInProgress;
    }

    async addAllToCart() {
        if (!isSignedIn()) {
            return;
        }

        this.setState({ isLoading: true });

        await this.addAllToCartAsync();
    }

    async addAllToCartAsync() {
        const { moveWishlistToCart } = this.props;

        if (!isSignedIn) {
            return;
        }

        try {
            await moveWishlistToCart();
        } catch (error) {
            this.showErrorAndRemoveLoading(getErrorMessage(error));
        }
    }

    async removeAll() {
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

    removeSelectedFromWishlist(selectedIdMap) {
        const { removeSelectedFromWishlist } = this.props;
        const { loadingItemsMap: prevLoadingItemsMap } = this.state;

        if (!isSignedIn()) {
            return null;
        }

        const loadingItemsMap = { ...prevLoadingItemsMap };

        selectedIdMap.forEach((id) => {
            loadingItemsMap[id] = true;
        });

        this.setState({ loadingItemsMap });

        return removeSelectedFromWishlist(selectedIdMap);
    }

    shareWishlist() {
        const { showPopup } = this.props;
        showPopup({ title: __('Share Wishlist') });
    }

    _getIsWishlistEmpty() {
        const { wishlistItems } = this.props;

        return Object.entries(wishlistItems).length <= 0;
    }

    showNotificationAndRemoveLoading(message) {
        const { showNotification } = this.props;
        this.setState({ isLoading: false });
        showNotification(message);
    }

    showErrorAndRemoveLoading(message) {
        const { showError } = this.props;

        try {
            const errorMessages = JSON.parse(message);
            errorMessages.forEach((err) => {
                showError(err);
            });
        } catch {
            showError(message);
        }

        this.setState({ isLoading: false });
    }

    render() {
        return (
            <MyAccountMyWishlist
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountMyWishlistContainer);
