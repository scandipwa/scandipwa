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
import { MixType } from 'Type/Common';
import { formatCurrency, roundPrice } from 'Util/Price';

import './Price.style';

/**
 * Product price
 * @class Price
 */
export default class Price extends PureComponent {
    static propTypes = {
        mix: MixType,
        schemaFields: PropTypes.shape({}),
        oldPrice: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        finalPrice: PropTypes.number.isRequired
    };

    static defaultProps = {
        mix: {},
        schemaFields: {}
    };

    renderRegular() {
        const { finalPrice, currency } = this.props;
        const formattedCurrency = formatCurrency(currency);

        return (
            <span block="Price" elem="FinalPrice">
                <data value={ formattedCurrency }>
                    <span itemProp="price">{ roundPrice(finalPrice) }</span>
                    <span>{ formattedCurrency }</span>
                </data>
            </span>
        );
    }

    renderDiscounted() {
        const { finalPrice, oldPrice, currency } = this.props;
        const formattedCurrency = formatCurrency(currency);

        return (
            <>
                <ins block="Price" elem="FinalPrice">
                    <data value={ formattedCurrency }>
                        <span itemProp="lowPrice">{ roundPrice(finalPrice) }</span>
                        <span>{ formattedCurrency }</span>
                    </data>
                </ins>
                <del
                  block="Price"
                  elem="OldPrice"
                  aria-label={ __('Old Price') }
                  itemProp="highPrice"
                >
                    { roundPrice(oldPrice) }
                </del>
            </>
        );
    }

    render() {
        const {
            mix,
            oldPrice,
            currency,
            finalPrice,
            schemaFields
        } = this.props;

        const hasDiscount = finalPrice < oldPrice;
        const formattedCurrency = formatCurrency(currency);
        const formattedFinalPrice = roundPrice(finalPrice);

        return (
            <p
              block="Price"
              aria-label={ __('Product price: %s%s', formattedFinalPrice, formattedCurrency) }
              mix={ mix }
              { ...schemaFields }
            >
                { hasDiscount ? this.renderDiscounted() : this.renderRegular() }
                <meta itemProp="priceCurrency" content={ currency } />
            </p>
        );
    }
}
