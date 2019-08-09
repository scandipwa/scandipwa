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

    renderConfigurableAttributeValue(attribute, isSelected) {
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

    renderConfigurableAttributes() {
        const { configurable_options, parameters = {} } = this.props;

        return Object.values(configurable_options).map((option) => {
            const { attribute_values, attribute_label, attribute_code } = option;

            return (
                <section
                  key={ attribute_code }
                  className="ProductConfigurableAttributes-Attribute"
                  block="ProductConfigurableAttribute"
                  aria-label={ attribute_label }
                >
                    <h4 block="ProductConfigurableAttribute" elem="SectionHeading">{ attribute_label }</h4>
                    <div block="ProductConfigurableAttribute" elem="AttributesList">
                        { attribute_values.map(attribute_value => (
                            this.renderConfigurableAttributeValue(
                                { ...option, attribute_value },
                                parameters[attribute_code] === attribute_value
                                || (parameters[attribute_code] && parameters[attribute_code].length ? parameters[attribute_code].includes(attribute_value) : false)
                            )
                        )) }
                    </div>
                </section>
            );
        });
    }

    render() {
        return (
            <div block="ProductConfigurableAttributes">
                { this.renderConfigurableAttributes() }
            </div>
        );
    }
}

ProductConfigurableAttributes.propTypes = {
    configurable_options: PropTypes.shape({}).isRequired,
    getLink: PropTypes.func.isRequired,
    parameters: PropTypes.shape({}).isRequired,
    updateConfigurableVariant: PropTypes.func.isRequired
};

export default ProductConfigurableAttributes;
