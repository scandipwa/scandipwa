/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { ProductType } from 'Component/Product/Product.config';
import { TierPrice } from 'Query/ProductList.type';
import { Mix, ReactElement } from 'Type/Common.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import {
    ProductExtractBasePrice,
    ProductExtractOriginalPrice,
    ProductExtractPrice,
    ProductExtractPriceConfiguration,
} from 'Util/Product/Product.type';

export interface ProductPriceContainerMapStateProps {
    displayTaxInPrice: string;
}


export interface ProductPriceContainerMapDispatchProps {}

export interface ProductPriceContainerBaseProps {
    price: Partial<ProductExtractPrice>;
    isPreview: boolean;
    priceType: ProductType;
    isSchemaRequired: boolean;
    mix: Mix;
    tierPrices?: TierPrice[];
    label: string | ReactElement;
    variantsCount: number;
}

export type ProductPriceContainerProps = ProductPriceContainerMapStateProps
& ProductPriceContainerMapDispatchProps
& ProductPriceContainerBaseProps;

export interface ProductPriceComponentProps {
    price: Partial<ProductExtractBasePrice>;
    originalPrice: Partial<ProductExtractOriginalPrice>;
    configuration: Partial<ProductExtractPriceConfiguration>;
    tierPrice: FormattedTierPrice;
    priceCurrency: GQLCurrencyEnum;
    discountPercentage: number;
    isPreview: boolean;
    isSchemaRequired: boolean;
    label: string | ReactElement;
    mix: Mix;
    variantsCount: number;
    priceType: ProductType;
    displayTaxInPrice: string;
}

export interface CurrencySchema {
    itemProp: string;
    content: GQLCurrencyEnum;
}

export interface PriceSchema {
    itemProp: string;
    content: number;
}

export interface FormattedTierPrice {
    currency: GQLCurrencyEnum;
    value: string | number;
    valueFormatted: string;
}

export interface ProductPriceComponentState {}

export interface ProductPriceContainerState {}
