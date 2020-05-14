import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { formatCurrency, roundPrice } from 'Util/Price';
import { ProductType } from 'Type/ProductList';
import './TierPrices.style';

class TierPrices extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        isLowestPrice: PropTypes.bool
    };

    static defaultProps = {
        isLowestPrice: false
    };

    renderDetailedTierPrice = ({ qty, value, percentage_value }) => {
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

    renderLowestTierPrice() {
        const {
            product: {
                tier_prices,
                price: {
                    regularPrice: {
                        amount: { currency }
                    }
                }
            }
        } = this.props;

        const lowestValue = tier_prices.reduce((acc, { value }) => (acc < value ? acc : value), tier_prices[0].value);

        return (
            <span block="TierPrices" elem="Item" mods={ { isLowest: true } }>
                { __('As low as ') }
                <span block="TierPrices" elem="ItemPrice">
                    { `${ formatCurrency(currency) }${ roundPrice(lowestValue) }` }
                </span>
            </span>
        );
    }

    renderDetailedTierPriceList() {
        const { product: { tier_prices } } = this.props;
        return tier_prices.map(this.renderDetailedTierPrice);
    }

    renderTierPrice() {
        const { isLowestPrice } = this.props;

        if (isLowestPrice) {
            return this.renderLowestTierPrice();
        }

        return this.renderDetailedTierPriceList();
    }

    render() {
        const { product: { tier_prices } } = this.props;

        if (!tier_prices) {
            return null;
        }

        return (
            <ul block="TierPrices">
                { this.renderTierPrice() }
            </ul>
        );
    }
}

export default TierPrices;
