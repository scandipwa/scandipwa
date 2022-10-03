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

import { createRef, PureComponent } from 'react';

import CartIcon from 'Component/CartIcon';
import Loader from 'Component/Loader';
import ProductCard from 'Component/ProductCard';
import ShareIcon from 'Component/ShareIcon';
import ShareWishlistPopup from 'Component/ShareWishlistPopup';
import WishlistItem from 'Component/WishlistItem';
import { ObjectEntries, ReactElement } from 'Type/Common.type';
import CSS from 'Util/CSS';
import { IndexedWishlistProduct } from 'Util/Product/Product.type';

import {
    MyAccountMyWishlistComponentProps,
    MyAccountMyWishlistComponentState,
} from './MyAccountMyWishlist.type';

import './MyAccountMyWishlist.style';

/** @namespace Component/MyAccountMyWishlist/Component */
export class MyAccountMyWishlistComponent<
P extends MyAccountMyWishlistComponentProps = MyAccountMyWishlistComponentProps,
S extends MyAccountMyWishlistComponentState = MyAccountMyWishlistComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<MyAccountMyWishlistComponentProps> = {
        creatorsName: '',
    };

    actionLineMobileRef = createRef<HTMLDivElement>();

    productsRef = createRef<HTMLDivElement>();

    __construct(props: P): void {
        super.__construct?.(props);

        this.state = {
            selectedIdMap: [] as string[],
            actionLineHeight: 0,
        } as S;

        this.handleSelectIdChange = this.handleSelectIdChange.bind(this);
    }

    componentDidMount(): void {
        this.setActionLineHeight();
    }

    componentDidUpdate(prevProps: P): void {
        const { isEditingActive: prevIsEditingActive, isMobile: prevIsMobile } = prevProps;
        const { isEditingActive, isMobile } = this.props;
        const { actionLineHeight: prevActionLineHeight } = this.state;
        const { actionLineHeight } = this.state;

        if ((prevIsEditingActive !== isEditingActive && prevActionLineHeight === actionLineHeight)
            || isMobile !== prevIsMobile
        ) {
            this.setActionLineHeight();
        }
    }

    setActionLineHeight(): void {
        const { isMobile } = this.props;
        const { current } = this.actionLineMobileRef;

        if (!current) {
            return;
        }

        CSS.setVariable(
            this.productsRef,
            'myaccount-wishlist-products-margin-bottom',
            isMobile ? `${ current.clientHeight }px` : 0,
        );
    }

    handleSelectIdChange(id: string, isRemoveOnly = false): void {
        const { selectedIdMap: prevSelectedIdMap } = this.state;
        const selectIdIndex = prevSelectedIdMap.findIndex((selectId) => selectId === id);
        const selectedIdMap = Array.from(prevSelectedIdMap);

        if (isRemoveOnly) {
            if (selectIdIndex !== -1) {
                selectedIdMap.splice(selectIdIndex, 1);

                this.setState({ selectedIdMap });
            }

            return;
        }

        if (selectIdIndex === -1) {
            selectedIdMap.push(id);
        } else {
            selectedIdMap.splice(selectIdIndex, 1);
        }

        this.setState({ selectedIdMap });
    }

    handleRemoveButtonClick(): void {
        // Removes selected items from wishlist

        const { removeSelectedFromWishlist } = this.props;
        const { selectedIdMap } = this.state;

        removeSelectedFromWishlist(selectedIdMap);

        this.setState({ selectedIdMap: [] });
    }

    renderNoProductsFound(): ReactElement {
        return (
            <div block="MyAccountMyWishlist" elem="NoProducts">
                <p>{ __('Wishlist is empty!') }</p>
            </div>
        );
    }

    renderProduct([id, product]: ObjectEntries<Record<string, IndexedWishlistProduct>>): ReactElement {
        const { isEditingActive, loadingItemsMap, setIsQtyUpdateInProgress } = this.props;

        return (
            <WishlistItem
              key={ id }
              product={ product }
              isRemoving={ loadingItemsMap[id] }
              isEditingActive={ isEditingActive }
              handleSelectIdChange={ this.handleSelectIdChange }
              setIsQtyUpdateInProgress={ setIsQtyUpdateInProgress }
            />
        );
    }

    renderProducts(): ReactElement {
        const {
            isWishlistLoading,
            isWishlistEmpty,
            wishlistItems,
        } = this.props;

        if (isWishlistLoading && isWishlistEmpty) {
            return this.renderPlaceholders();
        }

        return Object.entries(wishlistItems).map(this.renderProduct.bind(this));
    }

    renderClearWishlist(): ReactElement {
        const {
            removeAll,
            isActionsDisabled,
            isLoading,
        } = this.props;

        return (
            <button
              block="Button"
              mods={ { isHollow: true, isWithoutBorder: true } }
              mix={ { block: 'MyAccountMyWishlist', elem: 'ClearWishlistButton' } }
              onClick={ removeAll }
              disabled={ isActionsDisabled || isLoading }
            >
                { __('Clear All') }
            </button>
        );
    }

    renderAddAllToCart(): ReactElement {
        const {
            addAllToCart,
            isActionsDisabled,
            isEditingActive,
            isMobile,
            isLoading,
            isQtyUpdateInProgress,
        } = this.props;

        const isDisabled = (isMobile && isEditingActive) || isActionsDisabled || isLoading || isQtyUpdateInProgress;

        return (
            <button
              block="Button"
              mix={ { block: 'MyAccountMyWishlist', elem: 'Button' } }
              onClick={ addAllToCart }
              disabled={ isDisabled }
            >
                <CartIcon />
                { __('Add All to Cart') }
            </button>
        );
    }

    renderShareWishlistButton(): ReactElement {
        const {
            isWishlistLoading,
            shareWishlist,
            isWishlistEmpty,
        } = this.props;

        const disabled = isWishlistLoading || isWishlistEmpty;

        return (
            <button
              block="Button"
              mods={ { isHollow: true } }
              mix={ { block: 'MyAccountMyWishlist', elem: 'ShareWishlistButton' } }
              onClick={ shareWishlist }
              disabled={ disabled }
            >
                <ShareIcon isPrimary />
                { __('Share') }
            </button>
        );
    }

    renderRemoveItemsButton(): ReactElement {
        const { isActionsDisabled, isMobile, isQtyUpdateInProgress } = this.props;
        const { selectedIdMap } = this.state;

        const isDisabled = isActionsDisabled || (isMobile && !selectedIdMap.length) || isQtyUpdateInProgress;

        return (
            <button
              block="Button"
              mods={ { likeLink: true } }
              mix={ { block: 'MyAccountMyWishlist', elem: 'ClearRemoveItemsButton' } }
              onClick={ this.handleRemoveButtonClick }
              disabled={ isDisabled }
            >
                { selectedIdMap.length === 1
                    ? __('Remove item (%s)', 1)
                    : __('Remove items (%s)', selectedIdMap.length) }
            </button>
        );
    }

    renderActionBarAction(): ReactElement {
        const { isEditingActive } = this.props;

        if (!isEditingActive) {
            return null;
        }

        return (
            <div block="MyAccountMyWishlist" elem="ActionBarActionWrapper">
                { this.renderRemoveItemsButton() }
                { this.renderClearWishlist() }
            </div>
        );
    }

    renderActionBarMobile(): ReactElement {
        return (
            <div
              ref={ this.actionLineMobileRef }
              block="MyAccountMyWishlist"
              elem="ActionBar"
            >
                { this.renderActionBarAction() }
                { this.renderAddAllToCart() }
            </div>
        );
    }

    renderActionBar(): ReactElement {
        const { isMobile } = this.props;

        if (isMobile) {
            return this.renderActionBarMobile();
        }

        return (
            <div block="MyAccountMyWishlist" elem="ActionBar">
                { this.renderShareWishlistButton() }
                { this.renderAddAllToCart() }
                { this.renderClearWishlist() }
            </div>
        );
    }

    renderPlaceholders(): ReactElement {
        return Array.from({ length: 2 }, (_, i) => <ProductCard key={ i } product={ {} } />);
    }

    renderShareWishlist(): ReactElement {
        return <ShareWishlistPopup />;
    }

    renderContent(): ReactElement {
        const {
            isWishlistLoading,
            isWishlistEmpty,
            isLoading,
        } = this.props;

        if (isWishlistEmpty && !isWishlistLoading) {
            return this.renderNoProductsFound();
        }

        return (
            <div block="MyAccountMyWishlist" elem="Products" ref={ this.productsRef }>
                <Loader isLoading={ isLoading } />
                { this.renderProducts() }
            </div>
        );
    }

    render(): ReactElement {
        return (
            <div block="MyAccountMyWishlist">
                { this.renderShareWishlist() }
                { this.renderContent() }
                { this.renderActionBar() }
            </div>
        );
    }
}

export default MyAccountMyWishlistComponent;
