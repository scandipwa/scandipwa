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
import { connect } from 'react-redux';

import { ProductType } from 'Component/Product/Product.config';
import { ReactElement } from 'Type/Common.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import { formatPrice } from 'Util/Price';
import { RootState } from 'Util/Store/Store.type';

import ProductPrice from './ProductPrice.component';
import { DisplayProductPricesInCatalog } from './ProductPrice.config';
import {
    FormattedTierPrice,
    ProductPriceComponentProps,
    ProductPriceContainerMapDispatchProps,
    ProductPriceContainerMapStateProps,
    ProductPriceContainerProps,
    ProductPriceContainerState,
} from './ProductPrice.type';

/** @namespace Component/ProductPrice/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductPriceContainerMapStateProps => ({
    displayTaxInPrice: state.ConfigReducer.priceTaxDisplay?.product_price_display_type,
});

/** @namespace Component/ProductPrice/Container/mapDispatchToProps */
export const mapDispatchToProps = (): ProductPriceContainerMapDispatchProps => ({});

/**
 * Product price
 * @class ProductPrice
 * @namespace Component/ProductPrice/Container
 */
export class ProductPriceContainer<
P extends Readonly<ProductPriceContainerProps> = Readonly<ProductPriceContainerProps>,
S extends ProductPriceContainerState = ProductPriceContainerState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<ProductPriceContainerProps> = {
        isPreview: false,
        isSchemaRequired: false,
        displayTaxInPrice: DisplayProductPricesInCatalog.INCL_TAX,
        mix: {},
        price: {},
        priceType: ProductType.SIMPLE,
        tierPrices: [],
        label: '',
        variantsCount: 0,
    };

    containerProps(): Partial<ProductPriceComponentProps> {
        const {
            price: {
                price,
                originalPrice,
                configuration,
                price: {
                    finalPrice: {
                        currency: priceCurrency = GQLCurrencyEnum.USD,
                    } = {},
                    discount: {
                        percentOff: discountPercentage = 0,
                    } = {},
                } = {},
            },
            isPreview,
            isSchemaRequired,
            label,
            mix,
            variantsCount,
            priceType,
            displayTaxInPrice,
        } = this.props;

        if (!price || !originalPrice) {
            return {};
        }

        return {
            price,
            originalPrice,
            configuration,
            tierPrice: this.getMinTierPrice(priceCurrency),
            priceCurrency,
            discountPercentage,
            isPreview,
            isSchemaRequired,
            label,
            mix,
            variantsCount,
            priceType,
            displayTaxInPrice,
        };
    }

    getMinTierPrice(currency: GQLCurrencyEnum): FormattedTierPrice {
        const { tierPrices } = this.props;

        if (tierPrices && tierPrices.length > 0) {
            const prices = tierPrices.map(({ final_price: { value = 0 } = {} }) => value);
            const minPrice = Math.min(...prices);

            return {
                currency,
                value: minPrice,
                valueFormatted: formatPrice(minPrice, currency),
            };
        }

        return {
            currency,
            value: '',
            valueFormatted: '',
        };
    }

    render(): ReactElement {
        return (
            <ProductPrice
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPriceContainer);
