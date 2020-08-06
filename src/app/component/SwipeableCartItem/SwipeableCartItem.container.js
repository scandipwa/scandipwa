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
        item: CartItemType.isRequired,
        removeProduct: PropTypes.func.isRequired,
        quote_currency_code: PropTypes.string.isRequired
    };

    handlers = [];

    state = {
        isLoading: false
    };

    containerProps = () => {
        const {
            item,
            quote_currency_code
        } = this.props;

        return {
            item,
            quote_currency_code
        };
    };

    handleRemoveCartItem = () => {
        this.setState({ isLoading: true }, () => {
            const { removeProduct, item: { item_id } } = this.props;
            this.hideLoaderAfterPromise(removeProduct(item_id));
        });
    };

    hideLoaderAfterPromise(promise) {
        this.registerCancelablePromise(promise)
            .promise.then(this.setStateNotLoading, this.setStateNotLoading);
    }

    registerCancelablePromise(promise) {
        const cancelablePromise = makeCancelable(promise);
        this.handlers.push(cancelablePromise);
        return cancelablePromise;
    }

    setStateNotLoading = () => {
        this.setState({ isLoading: false });
    };

    render() {
        const {
            isLoading
        } = this.state;

        return (
            <SwipeableCartItem
              { ...this.containerProps() }
              isLoading={ isLoading }
              onRemoveItem={ this.handleRemoveCartItem }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(SwipeableCartItemContainer);
