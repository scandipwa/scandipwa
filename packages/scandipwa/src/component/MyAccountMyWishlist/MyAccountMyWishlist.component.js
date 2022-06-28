/* eslint-disable consistent-return */
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
import { createRef, PureComponent } from 'react';

import CartIcon from 'Component/CartIcon';
import Loader from 'Component/Loader';
import ProductCard from 'Component/ProductCard';
import ShareIcon from 'Component/ShareIcon';
import ShareWishlistPopup from 'Component/ShareWishlistPopup';
import WishlistItem from 'Component/WishlistItem';
import { ProductType } from 'Type/ProductList.type';
import CSS from 'Util/CSS';

import { BUNDLE_PRODUCT_TYPE_ID } from './MyAccountMyWishlist.config';

import './MyAccountMyWishlist.style';

/** @namespace Component/MyAccountMyWishlist/Component */
export class MyAccountMyWishlist extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        isWishlistLoading: PropTypes.bool.isRequired,
        removeAll: PropTypes.func.isRequired,
        addAllToCart: PropTypes.func.isRequired,
        shareWishlist: PropTypes.func.isRequired,
        isWishlistEmpty: PropTypes.bool.isRequired,
        wishlistItems: PropTypes.objectOf(ProductType).isRequired,
        isActionsDisabled: PropTypes.bool.isRequired,
        isEditingActive: PropTypes.bool.isRequired,
        isMobile: PropTypes.bool.isRequired,
        removeSelectedFromWishlist: PropTypes.func.isRequired,
        loadingItemsMap: PropTypes.objectOf(Object).isRequired,
        setIsQtyUpdateInProgress: PropTypes.func.isRequired,
        isQtyUpdateInProgress: PropTypes.bool.isRequired
    };

    state = {
        selectedIdMap: []
    };

    actionLineMobileRef = createRef();

    productsRef = createRef();

    handleSelectIdChange = this.handleSelectIdChange.bind(this);

    componentDidMount() {
        this.setActionLineHeight();
    }

    componentDidUpdate(prevProps) {
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

    setActionLineHeight() {
        const { isMobile } = this.props;
        const { current } = this.actionLineMobileRef;

        if (!current) {
            return;
        }

        CSS.setVariable(
            this.productsRef,
            'myaccount-wihslist-products-margin-bottom',
            isMobile ? `${ current.clientHeight }px` : 0
        );
    }

    handleSelectIdChange(id, isRemoveOnly = false) {
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

    handleRemoveButtonClick() {
        // Removes selected items from wishlist

        const { removeSelectedFromWishlist } = this.props;
        const { selectedIdMap } = this.state;

        removeSelectedFromWishlist(selectedIdMap);

        this.setState({ selectedIdMap: [] });
    }

    renderNoProductsFound() {
        return (
            <div block="MyAccountMyWishlist" elem="NoProducts">
                <p>{ __('Wishlist is empty!') }</p>
            </div>
        );
    }

    renderProduct([id, product]) {
        const { isEditingActive, loadingItemsMap, setIsQtyUpdateInProgress } = this.props;
        const {
            wishlist = {},
            price_range,
            bundle_options
        } = product;

        // assign wishlist.options to a new list
        // remove the first part of the value string that indicated quantity
        // append with a value from buy_request instead
        // get the value using index
        if (wishlist.options.length >= 1 && product.type_id === BUNDLE_PRODUCT_TYPE_ID) {
            // the order of items in wishlist.options always corresponds with the order of items
            // in buy_request.
            // we're using regex instead of JSON parse bc we need to preserve the order of the data
            // objects are inherently unordered
            const { buy_request } = wishlist;
            const selections = buy_request.match(/bundle_option(.*)bundle/g)[0].match(/\d+/g) || [];
            const parsedSelections = [];
            selections.map((e, i) => {
                if ((i + 1) % 2 === 0) {
                    parsedSelections.push([
                        selections[i - 1], e
                    ]);
                }

                return '';
            });
            const quantities = buy_request.match(/bundle_option_qty(.*)/g)[0].match(/\d+/g) || [];
            const parsedQuantities = [];
            quantities.map((e, i) => {
                if ((i + 1) % 2 === 0) {
                    parsedQuantities.push([
                        selections[i - 1], e
                    ]);
                }

                return '';
            });

            wishlist.options = wishlist.options.reduce(
                (p, { label, value }, i) => [...p,
                    { label, value: `${parsedQuantities[i][1]} ${value.substring(value.indexOf('x'))}` }],
                []
            );

            const [final_price, final_price_excl_tax] = parsedSelections.reduce((p, c, i) => ([
                p[0] + (bundle_options.filter(({ option_id }) => option_id === parseInt(c[0], 10))[0]
                    .selection_details.filter(
                        ({ selection_id }) => selection_id
                === parseInt(c[1], 10)
                    )[0]?.final_option_price * parsedQuantities[i][1]),
                p[1] + (bundle_options.filter(({ option_id }) => option_id === parseInt(c[0], 10))[0]
                    .selection_details.filter(
                        ({ selection_id }) => selection_id
                === parseInt(parsedSelections[i][1], 10)
                    )[0]?.final_option_price_excl_tax * parsedQuantities[i][1])
            ]),
            [0, 0]);

            const finalPrices = {
                maximum_price: {
                    final_price: { value: final_price, currency: '' },
                    final_price_excl_tax: { value: final_price_excl_tax, currency: '' }
                },
                minimum_price: {
                    final_price: { value: final_price, currency: '' },
                    final_price_excl_tax: { value: final_price_excl_tax, currency: '' }
                }
            };

            price_range.maximum_price = finalPrices.maximum_price;
            price_range.minimum_price = finalPrices.minimum_price;
        }

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

    renderProducts() {
        const {
            isWishlistLoading,
            isWishlistEmpty,
            wishlistItems
        } = this.props;

        if (isWishlistLoading && isWishlistEmpty) {
            return this.renderPlaceholders();
        }

        return Object.entries(wishlistItems).map(this.renderProduct.bind(this));
    }

    renderClearWishlist() {
        const {
            removeAll,
            isActionsDisabled,
            isLoading
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

    renderAddAllToCart() {
        const {
            addAllToCart,
            isActionsDisabled,
            isEditingActive,
            isMobile,
            isLoading,
            isQtyUpdateInProgress
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

    renderShareWishlistButton() {
        const {
            isWishlistLoading,
            shareWishlist,
            isWishlistEmpty
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

    renderRemoveItemsButton() {
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

    renderActionBarAction() {
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

    renderActionBarMobile() {
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

    renderActionBar() {
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

    renderPlaceholders() {
        return Array.from({ length: 2 }, (_, i) => <ProductCard key={ i } product={ {} } />);
    }

    renderShareWishlist() {
        return <ShareWishlistPopup />;
    }

    renderContent() {
        const {
            isWishlistLoading,
            isWishlistEmpty,
            isLoading
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

    render() {
        return (
            <div block="MyAccountMyWishlist">
                { this.renderShareWishlist() }
                { this.renderContent() }
                { this.renderActionBar() }
            </div>
        );
    }
}

export default MyAccountMyWishlist;
