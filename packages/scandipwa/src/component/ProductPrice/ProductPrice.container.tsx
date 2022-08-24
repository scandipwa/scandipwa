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
    ProductPriceComponentProps,
    ProductPriceContainerMapDispatchProps,
    ProductPriceContainerMapStateProps,
    ProductPriceContainerProps
} from './ProductPrice.type';

/** @namespace Component/ProductPrice/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductPriceContainerMapStateProps => ({
    displayTaxInPrice: state.ConfigReducer.priceTaxDisplay?.product_price_display_type
});

/** @namespace Component/ProductPrice/Container/mapDispatchToProps */
export const mapDispatchToProps = (): ProductPriceContainerMapDispatchProps => ({});

/**
 * Product price
 * @class ProductPrice
 * @namespace Component/ProductPrice/Container
 */
<<<<<<< HEAD:packages/scandipwa/src/component/ProductPrice/ProductPrice.container.tsx
export class ProductPriceContainer extends PureComponent<ProductPriceContainerProps> {
    static defaultProps: Partial<ProductPriceContainerProps> = {
=======
export class ProductPriceContainer extends PureComponent {
    static propTypes = {
        // Price should be gotten from Util/Product/Extract/getPrice()
        price: ProductPriceType,
        isPreview: PropTypes.bool,
        priceType: PropTypes.oneOf(Object.values(PRODUCT_TYPE)),
        isSchemaRequired: PropTypes.bool,
        mix: MixType,
        displayTaxInPrice: PropTypes.string,
        tierPrices: TierPricesType,
        label: LabelType,
        variantsCount: PropTypes.number
    };

    static defaultProps = {
>>>>>>> scandipwa/master:packages/scandipwa/src/component/ProductPrice/ProductPrice.container.js
        isPreview: false,
        isSchemaRequired: false,
        displayTaxInPrice: DisplayProductPricesInCatalog.INCL_TAX,
        mix: {},
        price: {},
        priceType: ProductType.SIMPLE,
        tierPrices: [],
        label: '',
        variantsCount: 0
    };

    containerProps(): Partial<ProductPriceComponentProps> {
        const {
            price: {
                price,
                originalPrice,
                configuration,
                price: {
                    finalPrice: {
                        currency: priceCurrency = GQLCurrencyEnum.USD
                    } = {},
                    discount: {
                        percentOff: discountPercentage = 0
                    } = {}
                } = {}
            },
            isPreview,
            isSchemaRequired,
            label,
            mix,
            variantsCount,
            priceType,
            displayTaxInPrice
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
            displayTaxInPrice
        };
    }

    getMinTierPrice(currency: GQLCurrencyEnum): string {
        const { tierPrices } = this.props;

        if (tierPrices && tierPrices.length > 0) {
            const prices = tierPrices.map(({ final_price: { value = 0 } = {} }) => value);
            const minPrice = Math.min(...prices);

            return {
                currency,
                value: minPrice,
                valueFormatted: formatPrice(minPrice, currency)
            };
        }

        return {
            currency,
            value: '',
            valueFormatted: ''
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
