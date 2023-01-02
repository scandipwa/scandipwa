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

import { FieldType } from 'Component/Field/Field.config';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import { IndexedBundleOption, TransformedBundleOption } from 'Util/Product/Product.type';

export interface ProductBundleOptionContainerMapStateProps {
    currencyCode: GQLCurrencyEnum;
}

export interface ProductBundleOptionContainerMapDispatchProps {}

export interface ProductBundleOptionContainerFunctions {
    setQuantity: (uid: string, value: number) => void;
    setActiveSelectUid: (uid: string) => void;
    getUidWithQuantity: (uid: string, defaultQuantity: number) => string;
    getDropdownOptions: () => TransformedBundleOption[];
    setDefaultOption: () => void;
}

export interface ProductBundleOptionContainerBaseProps {
    uid: string;
    title: string;
    isRequired: boolean;
    type: BundleOptionRendererType;
    options: IndexedBundleOption[];
    updateSelectedValues: () => void;
}

export type ProductBundleOptionContainerProps = ProductBundleOptionContainerMapStateProps
& ProductBundleOptionContainerMapDispatchProps
& ProductBundleOptionContainerBaseProps;

export interface ProductBundleOptionContainerState {
    activeSelectUid: string | null;
    quantity: Record<string, number>;
}

export interface ProductBundleOptionComponentProps {
    uid: string;
    title: string;
    isRequired: boolean;
    type: BundleOptionRendererType;
    options: Partial<IndexedBundleOption>[];
    updateSelectedValues: () => void;
    currencyCode: GQLCurrencyEnum;
    activeSelectUid: string | null;
    quantity: Record<string, number>;
    setQuantity: (uid: string, value: number) => void;
    setActiveSelectUid: (uid: string) => void;
    getUidWithQuantity: (uid: string, defaultQuantity: number) => string;
    getDropdownOptions: () => TransformedBundleOption[];
    setDefaultOption: () => void;
}

export type ProductBundleOptionComponentContainerPropKeys =
| 'uid'
| 'title'
| 'isRequired'
| 'type'
| 'options'
| 'updateSelectedValues'
| 'currencyCode'
| 'activeSelectUid'
| 'quantity';

export type BundleOptionRendererType = FieldType.CHECKBOX | FieldType.MULTI | FieldType.RADIO | FieldType.SELECT;

export interface ProductBundleOptionComponentState {}
