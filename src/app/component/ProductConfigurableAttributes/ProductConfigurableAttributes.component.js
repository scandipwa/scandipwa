import React, { Component } from 'react';
import ProductAttributeValue from 'Component/ProductAttributeValue';

class ProductConfigurableAttributes extends Component {
    handleOptionClick({ attribute_code, attribute_value }) {
        const { updateConfigurableVariant } = this.props;
        updateConfigurableVariant(attribute_code, attribute_value);
    }

    renderConfigurableAttributes() {
        const { product: { configurable_options } } = this.props;

        return Object.values(configurable_options).map((option) => {
            const { attribute_values } = option;
            return attribute_values.map(attribute_value => (
                this.renderConfigurableAttribute({ ...option, attribute_value })
            ));
        });
    }

    renderConfigurableAttribute(attribute) {
        const { attribute_value } = attribute;

        return (
            <li
              onClick={ () => this.handleOptionClick(attribute) }
              key={ attribute_value }
            >
                <ProductAttributeValue attribute={ attribute } mix={ { block: '123' } } />
            </li>
        );
    }

    render() {
        const { product: { type_id } } = this.props;
        if (type_id !== 'configurable') return null;
        return this.renderConfigurableAttributes();
    }
}

export default ProductConfigurableAttributes;
