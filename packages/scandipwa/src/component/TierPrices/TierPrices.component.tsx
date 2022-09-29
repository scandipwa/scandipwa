/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';

import { ProductType } from 'Component/Product/Product.config';
import { TierPrice } from 'Query/ProductList.type';
import { ReactElement } from 'Type/Common.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import { formatPrice, getLowestPriceTiersPrice } from 'Util/Price';

import { calculateTierDiscountOverSpecialPrice } from '../../util/Price/Price';
import { TierPricesComponentProps } from './TierPrices.type';

import './TierPrices.style';

/** @namespace Component/TierPrices/Component */
export class TierPrices extends PureComponent<TierPricesComponentProps> {
    static defaultProps: Partial<TierPricesComponentProps> = {
        isLowestPrice: false,
    };

    renderDetailedTierPrice({
        discount: {
            percent_off: tierDiscount,
        },
        final_price: {
            value,
            currency,
        },
        quantity,
    }: TierPrice): ReactElement {
        const {
            product: {
                price_range: {
                    minimum_price: {
                        final_price: {
                            value: minPriceForOneUnit = 0,
                        } = {},
                        discount: {
                            percent_off: discountForOneUnit = 0,
                        } = {},
                    } = {},
                } = {},
                type_id,
            },
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
                { type_id === ProductType.BUNDLE
                    ? this.renderBundleTierPrice(quantity, tierDiscount)
                    : this.renderProductTierPrice(quantity, formattedPrice, percentOff) }
            </li>
        );
    }

    renderProductTierPrice(quantity: number, formattedPrice: string, percentOff: number): ReactElement {
        return (
            <>
                { __(
                    'Buy %s for %s each and ',
                    quantity,
                    formattedPrice,
                ) }
                <strong>
                    { __(
                        'save %s%',
                        Math.round(percentOff),
                    ) }
                </strong>
            </>
        );
    }

    renderBundleTierPrice(quantity: number, percentOff: number): ReactElement {
        return (
            <>
                { __(
                    'Buy %s with ',
                    quantity,
                ) }
                <strong>
                    { Math.round(percentOff) }
                    %
                </strong>
                { __(' discount each') }
            </>
        );
    }

    renderLowestTierPrice(): ReactElement {
        const {
            product: {
                price_tiers = [],
                price_range: {
                    minimum_price: {
                        final_price: {
                            currency = GQLCurrencyEnum.USD,
                        } = {},
                    } = {},
                } = {},
            } = {},
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

    renderDetailedTierPriceList(): ReactElement {
        const { product: { price_tiers = [] } } = this.props;

        return price_tiers.map(this.renderDetailedTierPrice.bind(this));
    }

    renderTierPrice(): ReactElement {
        const { isLowestPrice } = this.props;

        if (isLowestPrice) {
            return this.renderLowestTierPrice();
        }

        return this.renderDetailedTierPriceList();
    }

    render(): ReactElement {
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
