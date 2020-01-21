import { PureComponent } from 'react';
import { formatCurrency, roundPrice } from 'Util/Price';
import { ProductType } from 'Type/ProductList';
import './TierPrices.style';

class TierPrices extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired
    };

    calculateDiscountRatio(discountedPriceAmount) {
        const {
            product: {
                price: {
                    regularPrice: {
                        amount: { value: regularPriceAmount }
                    }
                }
            }
        } = this.props;

        // eslint-disable-next-line no-magic-numbers
        return Math.round(((regularPriceAmount - discountedPriceAmount) / regularPriceAmount) * 100);
    }

    renderTierPrice = (tierPrice) => {
        const { quantity, value } = tierPrice;
        const {
            product: {
                price: {
                    regularPrice: {
                        amount: { currency }
                    }
                }
            }
        } = this.props;

        return (
            <li block="TierPrices" elem="Item">
                { __(
                    'Buy %s for %s%s and ',
                    quantity,
                    formatCurrency(currency),
                    roundPrice(value)
                ) }
                <strong>
                    { __(
                        'save %s%',
                        this.calculateDiscountRatio(value)
                    ) }
                </strong>
            </li>
        );
    };

    renderTierPriceList() {
        const { product: { tier_prices } } = this.props;
        return tier_prices.map(this.renderTierPrice);
    }

    render() {
        const { product: { tier_prices } } = this.props;

        if (!tier_prices) {
            return null;
        }

        // TODO: make price and currency render order region-dependent

        return (
            <ul block="TierPrices">
                { this.renderTierPriceList() }
            </ul>
        );
    }
}

export default TierPrices;
