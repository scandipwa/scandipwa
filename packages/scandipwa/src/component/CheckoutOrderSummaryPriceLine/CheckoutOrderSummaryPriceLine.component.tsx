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

import { ReactElement } from 'Type/Common.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import { formatPrice } from 'Util/Price';

import { CheckoutOrderSummaryPriceLineProps } from './CheckoutOrderSummaryPriceLine.type';

/** @namespace Component/CheckoutOrderSummaryPriceLine/Component */
export class CheckoutOrderSummaryPriceLine extends PureComponent<CheckoutOrderSummaryPriceLineProps> {
    static defaultProps: Partial<CheckoutOrderSummaryPriceLineProps> = {
        itemsQty: 0,
        mods: {},
        subPrice: null,
        children: [],
        coupon_code: '',
        currency: GQLCurrencyEnum.USD,
        price: undefined,
    };

    renderPrice(): ReactElement {
        const { price, currency } = this.props;

        return (
            <strong>
                { formatPrice(Number(price), currency as GQLCurrencyEnum) }
            </strong>
        );
    }

    renderSubPrice(): ReactElement {
        const { subPrice, currency } = this.props;

        if (!subPrice) {
            return null;
        }

        return (
            <span>
                { __('Excl. tax: %s', formatPrice(Number(subPrice), currency as GQLCurrencyEnum)) }
            </span>
        );
    }

    renderTitle(): ReactElement {
        const { title } = this.props;

        return (
            <p block="CheckoutOrderSummary" elem="Text">
                { title }
                { this.renderCoupon() }
            </p>
        );
    }

    renderCoupon(): ReactElement {
        const { coupon_code } = this.props;

        if (!coupon_code) {
            return null;
        }

        return (
            <b>
                { ` ${ coupon_code.toUpperCase() }:` }
            </b>
        );
    }

    render(): ReactElement {
        const {
            price,
            mods,
            children,
            itemsQty,
        } = this.props;

        if (!itemsQty && !price) {
            return null;
        }

        if (price === 0 && !itemsQty) {
            return null;
        }

        return (
            <li block="CheckoutOrderSummary" elem="SummaryItem" mods={ mods }>
                { this.renderTitle() }
                <div block="CheckoutOrderSummary" elem="Price">
                    <strong>
                        { this.renderPrice() }
                    </strong>
                    { this.renderSubPrice() }
                </div>
                { children }
            </li>
        );
    }
}

export default CheckoutOrderSummaryPriceLine;
