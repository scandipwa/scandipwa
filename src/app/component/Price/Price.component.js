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
import {
    formatCurrency,
    roundPrice
} from 'Util/Price';

import './Price.style';

/**
 * Product price
 * @class ProductPrice
 */
export default class Price extends PureComponent {
    static propTypes = {
        finalPrice: PropTypes.number.isRequired,
        oldPrice: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired
    };

    render() {
        const {
            finalPrice,
            oldPrice,
            currency
        } = this.props;

        const roundedOldPrice = roundPrice(oldPrice);
        const roundedFinalPrice = roundPrice(finalPrice);
        const formattedCurrency = formatCurrency(currency);

        const hasDiscount = roundedOldPrice > roundedFinalPrice;

        // Use <ins></ins> <del></del> to represent new price and the old (deleted) one
        const PriceSemanticElementName = hasDiscount ? 'ins' : 'span';

        return (
            <>
                <PriceSemanticElementName block="Price" elem="FinalPrice">
                    <data
                      value={ formattedCurrency }
                    >
                        <span itemProp="lowPrice">{ roundedFinalPrice }</span>
                        <span>{ formattedCurrency }</span>
                    </data>
                </PriceSemanticElementName>

                <del
                  block="Price"
                  elem="OldPrice"
                  mods={ { isVisible: hasDiscount } }
                  aria-label={ __('Old price') }
                  itemProp="highPrice"
                >
                    { roundedOldPrice }
                </del>

                <meta itemProp="priceCurrency" content={ currency } />
            </>
        );
    }
}
