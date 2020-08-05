import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

import { CartItemType } from 'Type/MiniCart';
import { makeCancelable } from 'Util/Promise';

import SwipeableCartItem from './SwipeableCartItem.component';

const CartDispatcher = import(/* webpackMode: "lazy", webpackChunkName: "dispatchers" */'Store/Cart/Cart.dispatcher');

export const mapDispatchToProps = (dispatch) => ({
    removeProduct: (options) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.removeProductFromCart(dispatch, options)
    )
});

export class SwipeableCartItemContainer extends Component {
    static propTypes = {
        removeProduct: PropTypes.func.isRequired,
        item: CartItemType.isRequired
    };

    constructor(props) {
        super(props);

        this.handleRemoveCartItem = this.handleRemoveCartItem.bind(this);
        this.setStateNotLoading = this.setStateNotLoading.bind(this);

        this.handlers = [];

        this.state = { isLoading: false };
    }

    handleRemoveCartItem() {
        this.setState({ isLoading: true }, () => {
            const { removeProduct, item: { item_id } } = this.props;
            this.hideLoaderAfterPromise(removeProduct(item_id));
        });
    }

    hideLoaderAfterPromise(promise) {
        this.registerCancelablePromise(promise)
            .promise.then(this.setStateNotLoading, this.setStateNotLoading);
    }

    registerCancelablePromise(promise) {
        const cancelablePromise = makeCancelable(promise);
        this.handlers.push(cancelablePromise);
        return cancelablePromise;
    }

    setStateNotLoading() {
        this.setState({ isLoading: false });
    }

    render() {
        return (
            <SwipeableCartItem
              { ...this.props }
              { ...this.state }
              onRemoveItem={ this.handleRemoveCartItem }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(SwipeableCartItemContainer);
