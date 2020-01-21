import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TierPrices from './TierPrices.component';

export class TierPricesContainer extends PureComponent {
    static propTypes = {
        product: PropTypes.object.isRequired
    };

    render() {
        const { product: { tier_prices, price } } = this.props;
        if (!tier_prices) return null;

        const { regularPrice } = price;
        return (tier_prices).map(
            item => <TierPrices key={ item.quantity } item={ item } regularPrice={ regularPrice } />
        );
    }
}

export default TierPricesContainer;
