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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentWrapper from 'Component/ContentWrapper';
import CartItem from 'Component/CartItem';
import DiscountCoupons from 'Component/DiscountCoupons';
import CartSummary from 'Component/CartSummary';
import { ProductType } from 'Type/ProductList';
import { TotalsType } from 'Type/MiniCart';
import './CartPage.style';

class CartPage extends Component {
    componentDidMount() {
        this.updateBreadcrumbs();
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: '/cart',
                name: __('Shopping cart')
            },
            {
                url: '/',
                name: __('Home')
            }
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    /**
     * Render Cart Item
     * @return {JSX}
     */
    renderItemsList() {
        const { totals: { items, base_currency_code } } = this.props;
        return Object.keys(items)
            .map(key => <CartItem key={ key } item={ items[key] } currency={ base_currency_code } />);
    }

    /**
     * Render Empty message if there is no products in cart
     * @param {Number} i List key
     * @return {JSX}
     */
    renderEmptyMessage(i) {
        return (
            <li block="MiniCart" elem="Empty" key={ i }>
                { __('You have no items in your shopping cart.') }
            </li>
        );
    }

    render() {
        const { totals, totals: { items_qty } } = this.props;

        return (
            <>
                <main block="CartPage" aria-label="Cart Page">
                    <ContentWrapper
                      mix={ { block: 'CartPage' } }
                      wrapperMix={ { block: 'CartPage', elem: 'Wrapper' } }
                      label={ __('Cart page details') }
                    >
                        <h1>Shopping cart</h1>
                        <div block="CartPage" elem="ItemsList" aria-label={ __('Cart Items List') }>
                            <div block="CartPage" elem="TableTitles">
                                <span>{ __('Item') }</span>
                                <span>{ __('Qty') }</span>
                                <span>{ __('Subtotal') }</span>
                            </div>
                            <ul>
                                { items_qty
                                    ? (
                                        <>
                                            { this.renderItemsList() }
                                            <DiscountCoupons />
                                        </>
                                    )
                                    : this.renderEmptyMessage(1)
                                }
                            </ul>
                        </div>
                        <CartSummary totals={ totals } />
                    </ContentWrapper>
                </main>
            </>
        );
    }
}

CartPage.propTypes = {
    totals: TotalsType.isRequired,
    updateBreadcrumbs: PropTypes.func.isRequired
};

export default CartPage;
