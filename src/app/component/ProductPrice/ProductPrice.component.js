/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextPlaceholder from 'Component/TextPlaceholder';
import { PriceType } from 'Type/ProductList';
import { MixType } from 'Type/Common';
import Price from 'Component/Price';

/**
 * Product price
 * @class ProductPrice
 */
export default class ProductPrice extends PureComponent {
    static propTypes = {
        mix: MixType,
        price: PriceType,
        isLoading: PropTypes.bool,
        finalPrice: PropTypes.number
    };

    static defaultProps = {
        mix: {},
        price: {},
        finalPrice: 0,
        isLoading: false
    };

    renderPlaceholder() {
        const { mix } = this.props;

        return (
            <p block="ProductPrice" aria-label="Product Price" mix={ mix }>
                <TextPlaceholder mix={ { block: 'ProductPrice', elem: 'Placeholder' } } length="custom" />
            </p>
        );
    }

    render() {
        const {
            mix,
            isLoading,
            finalPrice,
            price: { regularPrice }
        } = this.props;

        if (isLoading) return this.renderPlaceholder();

        const schemaFields = {
            itemScope: true,
            itemProp: 'offers',
            itemType: 'https://schema.org/AggregateOffer'
        };

        const { amount: { value: regularPriceValue, currency: priceCurrency } } = regularPrice;

        return (
            <Price
              mix={ mix }
              finalPrice={ finalPrice }
              currency={ priceCurrency }
              schemaFields={ schemaFields }
              oldPrice={ regularPriceValue }
            />
        );
    }
}
