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
import { changeHeaderState, goToPreviousHeaderState } from 'Store/Header';
import { CART, CART_EDITING } from 'Component/Header';
import { hideActiveOverlay } from 'Store/Overlay';
import { CartDispatcher } from 'Store/Cart';
import { TotalsType } from 'Type/MiniCart';

import CartOverlay from './CartOverlay.component';

export const mapStateToProps = state => ({
    products: state.CartReducer.productsInCart,
    totals: state.CartReducer.cartTotals
});

export const mapDispatchToProps = dispatch => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    goToPreviousHeaderState: () => dispatch(goToPreviousHeaderState()),
    changeHeaderState: state => dispatch(changeHeaderState(state)),
    updateTotals: options => CartDispatcher.updateTotals(dispatch, options)
});

export class CartOverlayContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = { isEditing: false };
        this.containerFunctions = {
            changeHeaderState: this.changeHeaderState.bind(this)
        };
    }

    changeHeaderState() {
        const { changeHeaderState, totals: { count = 0 } } = this.props;
        const title = __('%s Items', count || 0);

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
            onCloseClick: () => this.setState({ isEditing: false })
        });
    }

    render() {
        return (
            <CartOverlay
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

CartOverlayContainer.propTypes = {
    totals: TotalsType.isRequired,
    changeHeaderState: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlayContainer);
