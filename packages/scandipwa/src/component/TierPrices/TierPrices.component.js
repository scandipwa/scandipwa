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
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import PRODUCT_TYPE from 'Component/Product/Product.config';
import { ProductType } from 'Type/ProductList.type';
import { formatPrice, getLowestPriceTiersPrice } from 'Util/Price';

import { calculateTierDiscountOverSpecialPrice } from '../../util/Price/Price';

import './TierPrices.style';

/** @namespace Component/TierPrices/Component */
export class TierPrices extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        isLowestPrice: PropTypes.bool
    };

    static defaultProps = {
        isLowestPrice: false
    };

    renderDetailedTierPrice({
        discount: {
            percent_off: tierDiscount
        },
        final_price: {
            value,
            currency
        },
        quantity
    }) {
        const {
            product: {
                price_range: {
                    minimum_price: {
                        final_price: {
                            value: minPriceForOneUnit
                        },
                        discount: {
                            percent_off: discountForOneUnit
                        }
                    }
                },
                type_id
            }
        } = this.props;

        // Don't show offers that make no sense
        if (value >= minPriceForOneUnit) {
            return null;
        }

        // If the product already has Special price, calculate % off over special price and not old price
        // Bundle product always shows discount over old price
        const percentOff = discountForOneUnit > 0
            ? calculateTierDiscountOverSpecialPrice(minPriceForOneUnit, value)
            : tierDiscount;

        const formattedPrice = formatPrice(value, currency);

        return (
            <li block="TierPrices" elem="Item" key={ quantity }>
                { type_id === PRODUCT_TYPE.bundle
                    ? this.renderBundleTierPrice(quantity, tierDiscount)
                    : this.renderProductTierPrice(quantity, formattedPrice, percentOff) }
            </li>
        );
    }

    renderProductTierPrice(quantity, formattedPrice, percentOff) {
        return (
            <>
                { __(
                    'Buy %s for %s each and ',
                    quantity,
                    formattedPrice
                ) }
                <strong>
                    { __(
                        'save %s%',
                        Math.round(percentOff)
                    ) }
                </strong>
            </>
        );
    }

    renderBundleTierPrice(quantity, percentOff) {
        return (
            <>
                { __(
                    'Buy %s with ',
                    quantity
                ) }
                <strong>
                    { __(
                        '%s% ',
                        Math.round(percentOff)
                    ) }
                </strong>
                { __(
                    'discount each'
                ) }
            </>
        );
    }

    renderLowestTierPrice() {
        const {
            product: {
                price_tiers,
                price_range: {
                    minimum_price: {
                        final_price: {
                            currency
                        }
                    }
                }
            }
        } = this.props;

        const formattedPrice = getLowestPriceTiersPrice(price_tiers, currency);

        return (
            <span block="TierPrices" elem="Item" mods={ { isLowest: true } }>
                { __('As low as ') }
                <span block="TierPrices" elem="ItemPrice">
                    { `${ formattedPrice }` }
                </span>
            </span>
        );
    }

    renderDetailedTierPriceList() {
        const { product: { price_tiers } } = this.props;

        return price_tiers.map(this.renderDetailedTierPrice.bind(this));
    }

    renderTierPrice() {
        const { isLowestPrice } = this.props;

        if (isLowestPrice) {
            return this.renderLowestTierPrice();
        }

        return this.renderDetailedTierPriceList();
    }

    render() {
        const { product, product: { price_tiers = [] } } = this.props;

        if (!price_tiers || Object.keys(product).length <= 0 || !price_tiers.length) {
            return null;
        }

        return (
            <div block="TierPrices">
                { this.renderTierPrice() }
            </div>
        );
    }
}

export default TierPrices;
