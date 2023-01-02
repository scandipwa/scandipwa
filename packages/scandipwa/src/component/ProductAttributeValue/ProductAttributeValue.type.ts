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

import { AggregationOption } from 'Query/ProductList.type';
import { Mix } from 'Type/Common.type';

export interface ProductAttributeValueComponentProps {
    getLink: (o: Partial<ProductAttributeShape>) => string | void;
    onClick: (o: Partial<ProductAttributeShape>) => void;
    attribute: Partial<ProductAttributeShape>;
    isSelected: boolean;
    isAvailable: boolean;
    mix: Mix;
    isFormattedAsText: boolean;
    isProductCountVisible: boolean;
    showProductAttributeAsLink: boolean;
}

export interface ProductAttributeValueOption extends AggregationOption {
    label: string;
    labelText: string;
    count: number;
}

export interface ProductAttributeShape {
    attribute_options: Record<string, {
        label: string;
        count?: number;
    }>;
    attribute_value: string;
    attribute_code: string;
    attribute_label: string;
    attribute_type: string;
    has_swatch: boolean;
    is_boolean: boolean;
}

export interface ProductAttributeValueComponentState {}
