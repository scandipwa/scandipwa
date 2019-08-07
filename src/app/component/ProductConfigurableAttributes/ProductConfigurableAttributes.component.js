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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductAttributeValue from 'Component/ProductAttributeValue';
import { ProductType } from 'Type/ProductList';

class ProductConfigurableAttributes extends Component {
    handleOptionClick({ attribute_code, attribute_value }) {
        const { updateConfigurableVariant } = this.props;
        updateConfigurableVariant(attribute_code, attribute_value);
    }

    renderConfigurableAttributes() {
        const { product: { configurable_options } } = this.props;

        return Object.values(configurable_options).map((option) => {
            const { attribute_values, attribute_label } = option;
            return (
                <section aria-label={ attribute_label }>
                    <h4>{ attribute_label }</h4>
                    { attribute_values.map(attribute_value => (
                        this.renderConfigurableAttribute({ ...option, attribute_value })
                    )) }
                </section>
            );
        });
    }

    renderConfigurableAttribute(attribute) {
        const { attribute_value } = attribute;

        return (
            <ProductAttributeValue
              key={ attribute_value }
              attribute={ attribute }
              onClick={ () => this.handleOptionClick(attribute) }
            />
        );
    }

    render() {
        const { product: { type_id } } = this.props;
        if (type_id !== 'configurable') return null;
        return this.renderConfigurableAttributes();
    }
}

ProductConfigurableAttributes.propTypes = {
    product: ProductType.isRequired,
    updateConfigurableVariant: PropTypes.func.isRequired
};

export default ProductConfigurableAttributes;
