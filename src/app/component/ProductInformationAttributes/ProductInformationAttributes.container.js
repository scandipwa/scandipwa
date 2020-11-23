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

import { ProductType } from 'Type/ProductList';

import ProductInformationAttributes from './ProductInformationAttributes.component';

/** @namespace Component/ProductInformationAttributes/Container */
export class ProductInformationAttributesContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired
    };

    containerProps = () => ({
        attributesWithValues: this._getAttributesWithValues()
    });

    _getAttributesWithValues() {
        const { product: { attributes = {}, parameters = {} } } = this.props;

        const allAttribsWithValues = Object.entries(attributes).reduce((acc, [key, val]) => {
            const { attribute_label, attribute_value } = val;
            if (attribute_value) {
                return { ...acc, [attribute_label]: val };
            }

            const valueIndexFromParameter = parameters[key];
            if (valueIndexFromParameter) {
                return { ...acc, [attribute_label]: { ...val, attribute_value: valueIndexFromParameter } };
            }

            return acc;
        }, {});

        return allAttribsWithValues;
    }

    render() {
        return (
            <ProductInformationAttributes
              { ...this.props }
              { ...this.containerProps() }
            />
        );
    }
}

export default ProductInformationAttributesContainer;
