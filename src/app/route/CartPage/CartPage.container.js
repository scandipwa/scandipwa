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
import React, { PureComponent } from 'react';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import { changeHeaderState } from 'Store/Header';
import { CART, CART_EDITING } from 'Component/Header';
import { history } from 'Route';

import CartPage from './CartPage.component';

export const mapStateToProps = state => ({
    products: state.CartReducer.productsInCart,
    totals: state.CartReducer.cartTotals
});

export const mapDispatchToProps = dispatch => ({
    changeHeaderState: state => dispatch(changeHeaderState(state)),
    updateBreadcrumbs: breadcrumbs => BreadcrumbsDispatcher.update(breadcrumbs, dispatch)
});

export class CartPageContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = { isEditing: false };
    }

    componentDidMount() {
        this._updateBreadcrumbs();
        this._changeHeaderState();
    }

    _updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            { url: '/cart', name: __('Shopping cart') },
            { url: '/', name: __('Home') }
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    _changeHeaderState() {
        const { changeHeaderState, totals: { count } } = this.props;
        const title = `${ count || 0 } Items`;

        changeHeaderState({
            name: CART,
            title,
            onEditClick: () => {
                this.setState({ isEditing: true });
                changeHeaderState({
                    name: CART_EDITING,
                    title,
                    onOkClick: () => this.setState({ isEditing: false }),
                    onCancelClick: () => this.setState({ isEditing: false })
                });
            },
            onCloseClick: () => {
                this.setState({ isEditing: false });
                history.goBack();
            }
        });
    }

    render() {
        return (
            <CartPage
              { ...this.props }
              { ...this.state }
            />
        );
    }
}

CartPageContainer.propTypes = {
    updateBreadcrumbs: PropTypes.func.isRequired,
    changeHeaderState: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPageContainer);
