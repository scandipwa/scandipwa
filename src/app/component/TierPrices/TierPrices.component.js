import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { formatCurrency, roundPrice } from 'Util/Price';
import './TierPrices.style';

const MAX_PERCENT_AMOUNT = 100;

class TierPrices extends PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired,
        regularPrice: PropTypes.number.isRequired
    };

    calculateDiscountRatio(discountedPriceAmount, regularPriceAmount) {
        return Math.round(((regularPriceAmount - discountedPriceAmount) / regularPriceAmount) * MAX_PERCENT_AMOUNT);
    }

    render() {
        const {
            item: { quantity, value },
            regularPrice: { amount: { currency, value: regularPriceAmount } }
        } = this.props;

        // TODO: make price and currency render order region-dependent

        return (
            <div block="TierPrices">
                <p block="TierPrices" elem="Item">
                  { __('Buy %s for %s%s and save %s%',
                      quantity,
                      formatCurrency(currency),
                      roundPrice(value),
                      this.calculateDiscountRatio(value, regularPriceAmount)) }
                </p>
            </div>
        );
    }
}

export default TierPrices;
