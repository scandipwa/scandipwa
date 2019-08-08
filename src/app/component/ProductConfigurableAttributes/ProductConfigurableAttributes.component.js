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
import './ProductConfigurableAttributes.style';

class ProductConfigurableAttributes extends Component {
    getLink({ attribute_code, attribute_value }) {
        const { getLink } = this.props;
        return getLink(attribute_code, attribute_value);
    }

    handleOptionClick({ attribute_code, attribute_value }) {
        const { updateConfigurableVariant } = this.props;
        updateConfigurableVariant(attribute_code, attribute_value);
    }

    renderConfigurableAttributes() {
        const { product: { configurable_options }, parameters = {} } = this.props;

        return Object.values(configurable_options).map((option) => {
            const { attribute_values, attribute_label, attribute_code } = option;

            return (
                <section
                  key={ attribute_code }
                  block="ProductConfigurableAttribute"
                  aria-label={ attribute_label }
                >
                    <h4 block="ProductConfigurableAttribute" elem="SectionHeading">{ attribute_label }</h4>
                    { attribute_values.map(attribute_value => (
                        this.renderConfigurableAttribute(
                            { ...option, attribute_value },
                            parameters[attribute_code] === attribute_value
                        )
                    )) }
                </section>
            );
        });
    }

    renderConfigurableAttribute(attribute, isSelected) {
        const { attribute_value } = attribute;

        return (
            <ProductAttributeValue
              key={ attribute_value }
              attribute={ attribute }
              isSelected={ isSelected }
              onClick={ () => this.handleOptionClick(attribute) }
              getLink={ () => this.getLink(attribute) }
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
    getLink: PropTypes.func.isRequired,
    parameters: PropTypes.shape({}).isRequired,
    updateConfigurableVariant: PropTypes.func.isRequired
};

export default ProductConfigurableAttributes;
