import { PureComponent } from 'react';
import { formatCurrency, roundPrice } from 'Util/Price';
import { ProductType } from 'Type/ProductList';
import './TierPrices.style';

class TierPrices extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired
    };

    renderTierPrice = ({ qty, value, percentage_value }) => {
        const {
            product: {
                price: {
                    regularPrice: {
                        amount: { currency, value: startingValue }
                    }
                }
            }
        } = this.props;

        // TODO: fix Magento not retrieving percentage value on BE
        if (!percentage_value) {
            // eslint-disable-next-line no-param-reassign
            percentage_value = 1 - (value / startingValue);
        }

        return (
            <li block="TierPrices" elem="Item" key={ qty }>
                { __(
                    'Buy %s for %s%s each and ',
                    qty,
                    formatCurrency(currency),
                    roundPrice(value)
                ) }
                <strong>
                    { __(
                        'save %s%',
                        // eslint-disable-next-line no-magic-numbers
                        Math.round(percentage_value * 100)
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
