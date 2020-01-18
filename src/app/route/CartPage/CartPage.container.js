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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BreadcrumbsDispatcher } from 'Store/Breadcrumbs';
import {
    PDP,
    CATEGORY,
    CUSTOMER_ACCOUNT,
    HOME_PAGE,
    MENU,
    MENU_SUBCATEGORY,
    SEARCH,
    CART,
    CMS_PAGE,
    FILTER,
    CART_EDITING,
    CHECKOUT,
    CUSTOMER_ACCOUNT_PAGE,
    POPUP
} from 'Component/Header/Header.component';
import { changeHeaderState } from 'Store/Header';
import { TotalsType } from 'Type/MiniCart';
import { history } from 'Route';

import CartPage from './CartPage.component';

export const mapStateToProps = state => ({
    totals: state.CartReducer.cartTotals,
    headerState: state.HeaderReducer.headerState
});

export const mapDispatchToProps = dispatch => ({
    changeHeaderState: state => dispatch(changeHeaderState(state)),
    updateBreadcrumbs: breadcrumbs => BreadcrumbsDispatcher.update(breadcrumbs, dispatch)
});

export class CartPageContainer extends PureComponent {
    static propTypes = {
        updateBreadcrumbs: PropTypes.func.isRequired,
        changeHeaderState: PropTypes.func.isRequired,
        totals: TotalsType.isRequired,
        headerState: PropTypes.shape({
            name: PropTypes.oneOf([
                PDP,
                CATEGORY,
                CUSTOMER_ACCOUNT,
                CUSTOMER_ACCOUNT_PAGE,
                HOME_PAGE,
                MENU,
                MENU_SUBCATEGORY,
                SEARCH,
                FILTER,
                CART,
                CART_EDITING,
                CHECKOUT,
                CMS_PAGE,
                POPUP
            ]),
            title: PropTypes.string,
            onBackClick: PropTypes.func,
            onCloseClick: PropTypes.func,
            onEditClick: PropTypes.func,
            onOkClick: PropTypes.func,
            onCancelClick: PropTypes.func
        }).isRequired
    };

    state = { isEditing: false };

    componentDidMount() {
        this._updateBreadcrumbs();
        this._changeHeaderState();
    }

    componentDidUpdate(prevProps) {
        const {
            changeHeaderState,
            totals: { items_qty },
            headerState,
            headerState: { name }
        } = this.props;

        const {
            totals: { items_qty: prevItemsQty },
            headerState: { name: prevName }
        } = prevProps;

        if (name !== prevName) {
            if (name === CART) {
                this._changeHeaderState();
            }
        }

        if (items_qty !== prevItemsQty) {
            const title = `${ items_qty || '0' } Items`;
            changeHeaderState({
                ...headerState,
                title
            });
        }
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
        const { changeHeaderState, totals: { items_qty } } = this.props;
        const title = `${ items_qty || '0' } Items`;

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
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPageContainer);
