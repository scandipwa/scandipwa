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
    WishlistItemContainer,
} from 'Component/WishlistItem/WishlistItem.container';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import SharedWishlistItem from './SharedWishlistItem.component';
import {
    SharedWishlistItemComponentContainerPropKeys,
    SharedWishlistItemComponentProps,
    SharedWishlistItemContainerMapDispatchProps,
    SharedWishlistItemContainerMapStateProps,
    SharedWishlistItemContainerProps,
    SharedWishlistItemContainerState,
} from './SharedWishlistItem.type';

/** @namespace Component/SharedWishlistItem/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): SharedWishlistItemContainerMapStateProps => ({
    ...sourceMapStateToProps(state),
});

/** @namespace Component/SharedWishlistItem/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): SharedWishlistItemContainerMapDispatchProps => ({
    ...sourceMapDispatchToProps(dispatch),
});

/** @namespace Component/SharedWishlistItem/Container */
export class SharedWishlistItemContainer extends WishlistItemContainer<
SharedWishlistItemContainerProps,
SharedWishlistItemContainerState
> {
    state: SharedWishlistItemContainerState = {
        isLoading: false,
        currentQty: 0,
        quantity: 1,
    };

    _getConfigurableVariantIndex(): number {
        const { product: { wishlist: { sku = '' } = {}, variants = [] } } = this.props;

        return +(this.getConfigurableVariantIndex(sku, variants) || 0);
    }

    containerProps(): Pick<SharedWishlistItemComponentProps, SharedWishlistItemComponentContainerPropKeys> {
        const {
            handleSelectIdChange,
            isEditingActive,
            isMobile,
            isRemoving,
            product,
        } = this.props;
        const { isLoading, quantity } = this.state;

        return {
            ...super.containerProps(),
            changeQuantity: this.changeQuantity,
            changeDescription: this.changeDescription,
            configurableVariantIndex: this._getConfigurableVariantIndex(),
            parameters: this.getAttributes(),
            isLoading,
            handleSelectIdChange,
            isEditingActive,
            isMobile,
            isRemoving,
            product,
            quantity,
        };
    }

    changeQuantity = (() => (quantity: number): void => {
        this.setState({ quantity });
    })();

    render(): ReactElement {
        return (
            <SharedWishlistItem
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharedWishlistItemContainer);
