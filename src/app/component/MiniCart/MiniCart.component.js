/* eslint-disable max-len */
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
import { Link } from 'react-router-dom';
import { formatCurrency } from 'Util/Price';
import TextPlaceholder from 'Component/TextPlaceholder';
import CartItem from 'Component/CartItem';
import { ProductType } from 'Type/ProductList';
import { TotalsType } from 'Type/MiniCart';
import './MiniCart.style';

/**
 * Mini Cart
 * @class MiniCart
 */
class MiniCart extends Component {
    constructor() {
        super();

        this.state = {
            /* eslint react/no-unused-state: 0 */
            // known issue will be fixed on next eslint release
            prevCartProducts: {},
            isActive: true
        };

        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleItemFocus = this.handleItemFocus.bind(this);
    }

    handleItemClick() {
        document.activeElement.blur();
        this.setState({ isActive: false });
    }

    handleItemFocus() {
        const { isActive } = this.state;
        if (!isActive) this.setState({ isActive: true });
    }

    renderEmptyMessage(emptyMessage, i) {
        return (
            <li block="MiniCart" elem="Empty" key={ i }>
                <TextPlaceholder content={ emptyMessage } />
            </li>
        );
    }

    renderCartData(products) {
        const { totals: { base_currency_code, subtotal } } = this.props;

        return (
            <>
                <div block="MiniCart" elem="Promo" aria-label="Minicart Promo">
                    { __('Add <strong> $45 </strong> to your cart and <strong> get free shipping!</strong>') }
                </div>
                { this.renderItemsList(products) }
                <li block="MiniCart" elem="Subtotal" aria-label={ __('MiniCart Subtotal') }>
                    <span>{ __('Save $14.00 vs Retail') }</span>
                    <div>
                        { __('Subtotal:') }
                        &nbsp;
                        <strong>
                            { formatCurrency(subtotal, base_currency_code) }
                        </strong>
                    </div>
                </li>
                <li block="MiniCart" elem="Actions" aria-label={ __('MiniCart Actions') }>
                    <Link
                      onClick={ this.handleItemClick }
                      to="/cart"
                    >
                        <button block="MiniCart" elem="Button">{ __('View Cart') }</button>
                    </Link>
                    <Link to="/checkout/shipping">
                        <button block="MiniCart" elem="Button">{ __('Proceed to checkout') }</button>
                    </Link>
                </li>
            </>
        );
    }

    renderCartDropdown(products) {
        return (
            <ul block="MiniCart" elem="Dropdown" aria-label={ __('MiniCart Dropdown') }>
                { Object.entries(products).length !== 0
                    ? this.renderCartData(products)
                    : this.renderEmptyMessage(__('You have no items in your shopping cart.', 1))
                }
            </ul>
        );
    }

    renderItemsList(items) {
        return Object.keys(items).map(key => (
            <CartItem
              key={ key }
              product={ items[key] }
              onItemClick={ this.handleItemClick }
            />
        ));
    }

    render() {
        const { products, totals: { subtotal, items_qty } } = this.props;
        const { isActive } = this.state;
        const empty = !Object.keys(products).length;

        return (
            <div block="MiniCart" mods={ { empty } }>
                <Link
                  onClick={ this.handleItemClick }
                  onMouseEnter={ () => this.setState({ isActive: true }) }
                  onFocus={ this.handleItemFocus }
                  to="/cart"
                  tabIndex={ 0 }
                >
                    <div block="MiniCart" elem="Icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 19 17"
                        >
                            <desc>{ __('MiniCart Icon') }</desc>
                            <path d="M18.687 2.374c-.16-.22-.38-.22-.46-.22H4.658L4.417.84A.586.586 0 0 0 3.837.4H1.38C1.04.4.8.638.8.93c0 .293.26.53.58.53h1.978l1.28 7.037c0 .055.02.11.04.147l.419 2.413c.06.255.3.42.58.42h10.512c.34 0 .58-.238.58-.53 0-.293-.26-.53-.58-.53H6.156l-.26-1.426H16.53c.12.018.24-.018.34-.073a.51.51 0 0 0 .24-.33l1.658-5.757a.437.437 0 0 0-.08-.457zM7.03 12.862c-1.134 0-2.076.92-2.076 2.076 0 1.157.92 2.077 2.077 2.077 1.156 0 2.077-.92 2.077-2.077 0-1.156-.921-2.076-2.077-2.076zm0 1.241c.45 0 .793.364.793.814 0 .45-.385.814-.814.814a.795.795 0 0 1-.792-.814c0-.428.364-.814.814-.814zM13.954 12.862c-1.135 0-2.077.92-2.077 2.076 0 1.157.92 2.077 2.077 2.077 1.156 0 2.077-.92 2.077-2.077 0-1.156-.92-2.076-2.077-2.076zm-.022 1.241a.8.8 0 0 1 .814.814.813.813 0 1 1-1.627 0c0-.428.364-.814.813-.814z" />
                        </svg>
                        <div block="MiniCart" elem="Badge" aria-label="Minicart Badge">
                            { items_qty || '0' }
                        </div>
                    </div>
                </Link>
                { isActive && this.renderCartDropdown(products, subtotal) }
            </div>
        );
    }
}

MiniCart.propTypes = {
    products: PropTypes.objectOf(ProductType),
    totals: TotalsType.isRequired
};

MiniCart.defaultProps = {
    products: {}
};

export default MiniCart;
