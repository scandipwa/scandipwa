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

import { ChildrenType, ModsType } from 'Type/Common.type';
import { formatPrice } from 'Util/Price';

/** @namespace Component/CheckoutOrderSummaryPriceLine/Component */
export class CheckoutOrderSummaryPriceLine extends PureComponent {
    static propTypes = {
        price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        currency: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        coupon_code: PropTypes.string.isRequired,
        mods: ModsType,
        subPrice: PropTypes.node,
        children: ChildrenType
    };

    static defaultProps = {
        mods: {},
        subPrice: null,
        children: []
    };

    renderPrice() {
        const { price, currency } = this.props;

        return (
            <strong>
                { formatPrice(price, currency) }
            </strong>
        );
    }

    renderSubPrice() {
        const { subPrice, currency } = this.props;

        if (!subPrice) {
            return null;
        }

        return (
            <span>
                { __('Excl. tax: %s', formatPrice(subPrice, currency)) }
            </span>
        );
    }

    renderTitle() {
        const { title } = this.props;

        return (
        <p block="CheckoutOrderSummary" elem="Text">
            { title }
            { this.renderCoupon() }
        </p>
        );
    }

    renderCoupon() {
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

    render() {
        const {
            price,
            mods,
            children
        } = this.props;

        if (!price) {
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
