/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { FieldType } from 'Component/Field/Field.config';
import { ProductOption } from 'Component/Product/Product.type';
import { ReactElement } from 'Type/Common.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import { IndexedCustomOptionValue } from 'Util/Product/Product.type';

import { ConfigFieldType } from './ProductCustomizableOption.config';

export interface ProductCustomizableOptionContainerMapStateProps {
    currencyCode: GQLCurrencyEnum;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProductCustomizableOptionContainerMapDispatchProps {}

export interface ProductCustomizableOptionContainerBaseProps {
    uid: string;
    title: string;
    isRequired: boolean;
    type: ConfigFieldType;
    options: CustomFieldValue[];
    updateSelectedValues: (data?: Partial<ProductOption>) => void;
}

export type ProductCustomizableOptionContainerProps = ProductCustomizableOptionContainerMapStateProps
& ProductCustomizableOptionContainerMapDispatchProps
& ProductCustomizableOptionContainerBaseProps;

export interface ProductCustomizableOptionComponentProps {
    uid: string;
    title: string;
    isRequired: boolean;
    type: ConfigFieldType;
    options: Partial<IndexedCustomOptionValue> | Partial<IndexedCustomOptionValue>[];
    updateSelectedValues: () => void;
    currencyCode: GQLCurrencyEnum;
    fieldType: FieldType;
    getDropdownOptions: () => IndexedCustomOptionValue[] | null;
}

export type ProductCustomizableOptionComponentContainerPropKeys =
    | 'uid'
    | 'title'
    | 'isRequired'
    | 'type'
    | 'options'
    | 'currencyCode'
    | 'fieldType';

export interface ProductCustomizableOptionComponentState {
    value: string;
}

export interface ProductCustomizableOptionComponentRenderMap {
    [ConfigFieldType.TEXT]: (option: Partial<IndexedCustomOptionValue>) => ReactElement;
    [ConfigFieldType.TEXTAREA]: (option: Partial<IndexedCustomOptionValue>) => ReactElement;
    [ConfigFieldType.DATE]: (option: Partial<IndexedCustomOptionValue>) => ReactElement;
    [ConfigFieldType.DATETIME]: (option: Partial<IndexedCustomOptionValue>) => ReactElement;
    [ConfigFieldType.TIME]: (option: Partial<IndexedCustomOptionValue>) => ReactElement;

    [ConfigFieldType.FILE]: (option: Partial<IndexedCustomOptionValue>) => ReactElement;
    [ConfigFieldType.SELECT]: () => ReactElement;
    [ConfigFieldType.RADIO]: (options: Partial<IndexedCustomOptionValue>[]) => ReactElement;
    [ConfigFieldType.CHECKBOX]: (options: Partial<IndexedCustomOptionValue>[]) => ReactElement;
    [ConfigFieldType.MULTI]: (options: Partial<IndexedCustomOptionValue>[]) => ReactElement;
}

export type CustomFieldValue = IndexedCustomOptionValue;
