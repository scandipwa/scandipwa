import { addProductToCart, removeProductFromCart, updateTotals } from 'Store/Cart';
import { getProductPrice } from 'Util/Price';
/**
 * Product Cart Dispatcher
 * @class CartDispatcher
 */
class CartDispatcher {
    addProductToCart(dispatch, options) {
        if (this._isAllowed(options)) {
            return dispatch(addProductToCart(options.product, options.quantity));
        }

        return null;
    }

    removeProductFromCart(dispatch, options) {
        return dispatch(removeProductFromCart(options.product));
    }

    updateTotals(dispatch, options) {
        const totals = this._calculateTotals(options.products);
        return dispatch(updateTotals(totals));
    }

    /**
     * Check if it is allowed to add product to cart
     * @param {Object} options Cart options
     * @return {Boolean} Indicates is allowed or not
     * @memberof CartDispatcher
     */
    _isAllowed(options) {
        if (options.product && options.quantity && (options.product.quantity + options.quantity) < 1) {
            return false;
        }

        if (options.quantity === 0) {
            return false;
        }

        return true;
    }

    /**
     * Calculate totals from product list
     * @param {Object} products Object of products
     * @return {Object} Totals
     * @memberof CartDispatcher
     */
    _calculateTotals(products) {
        // TODO: Override to get product prices from server (in case price have changed)
        let subTotalPrice = 0;
        let taxPrice = 0;
        let count = 0;
        let grandTotalPrice = 0;

        if (products) {
            Object.keys(products).forEach((key) => {
                const prices = getProductPrice(products[key]);
                const { quantity } = products[key];

                count += quantity;
                subTotalPrice += (prices.subTotalPrice * quantity);
                taxPrice += (prices.taxPrice * quantity);
            });
        }
        grandTotalPrice = (subTotalPrice + taxPrice).toFixed(2);
        subTotalPrice = subTotalPrice.toFixed(2);
        taxPrice = taxPrice.toFixed(2);

        return {
            subTotalPrice,
            count,
            grandTotalPrice,
            taxPrice
        };
    }
}

export default new CartDispatcher();
