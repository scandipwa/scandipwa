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
        isLoading: PropTypes.bool.isRequired,
        onRemoveItem: PropTypes.func.isRequired
    };

    render() {
        const {
            item,
            quote_currency_code,
            isLoading,
            onRemoveItem
        } = this.props;

        return (
            <div>
                <Loader isLoading={ isLoading } />
                <Swipeable
                  rightSwipeText="Delete"
                  onRightSwipe={ onRemoveItem }
                >
                    <CartItem
                      item={ item }
                      currency_code={ quote_currency_code }
                      isEditing
                      isLikeTable
                    />
                </Swipeable>
            </div>
        );
    }
}

export default SwipeableCartItem;
