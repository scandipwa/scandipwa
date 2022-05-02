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

import {
    ProductConfigurableAttribute
} from 'Component/ProductConfigurableAttributes/ProductConfigurableAttributes.type';
import { AggregationOption } from 'Query/ProductList.type';
import { Mix } from 'Type/Common.type';

export interface ProductAttributeValueComponentProps {
    getLink: (o: ProductConfigurableAttribute) => string;
    onClick: (o: ProductConfigurableAttribute) => void;
    attribute: ProductConfigurableAttribute;
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
