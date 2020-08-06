import './SwipeableCartItem.style';

import PropTypes from 'prop-types';
import { Component } from 'react';

import CartItem from 'Component/CartItem';
import Loader from 'Component/Loader';
import Swipeable from 'Component/Swipeable';
import { CartItemType } from 'Type/MiniCart';

export class SwipeableCartItem extends Component {
    static propTypes = {
        item: CartItemType.isRequired,
        quote_currency_code: PropTypes.string.isRequired,
        isLoading: PropTypes.bool,
        onRemoveItem: PropTypes.func.isRequired
    };

    static defaultProps = {
        isLoading: false
    };

    render() {
        const {
            item,
            quote_currency_code,
            isLoading,
            onRemoveItem
        } = this.props;

        return (
            <li>
                <Loader isLoading={ isLoading } />
                <Swipeable
                  leftSwipeText="Delete"
                  onLeftSwipe={ onRemoveItem }
                >
                    <CartItem
                      item={ item }
                      currency_code={ quote_currency_code }
                      isEditing
                      isLikeTable
                    />
                </Swipeable>
            </li>
        );
    }
}

export default SwipeableCartItem;
