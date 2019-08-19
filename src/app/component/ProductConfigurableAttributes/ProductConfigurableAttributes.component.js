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
import TextPlaceholder from 'Component/TextPlaceholder';
import { AttributeType } from 'Type/ProductList';

class ProductConfigurableAttributes extends Component {
    /**
     * Get URL link for attribute
     *
     * @param {{ attribute_code: String, attribute_value: String }} { attribute_code, attribute_value }
     * @returns {String}
     * @memberof ProductConfigurableAttributes
     */
    getLink({ attribute_code, attribute_value }) {
        const { getLink } = this.props;
        return getLink(attribute_code, attribute_value);
    }

    /**
     * Updates URL on click
     *
     * @param {{ attribute_code: String, attribute_value: String }} { attribute_code, attribute_value }
     * @memberof ProductConfigurableAttributes
     */
    handleOptionClick({ attribute_code, attribute_value }) {
        const { updateConfigurableVariant } = this.props;
        updateConfigurableVariant(attribute_code, attribute_value);
    }

    /**
     * Checks whether provided attribute were selected
     *
     * @param {{ attribute_code: String, attribute_value: String }} { attribute_code, attribute_value }
     * @returns {bool}
     * @memberof ProductConfigurableAttributes
     */
    isSelected({ attribute_code, attribute_value }) {
        const { parameters = {} } = this.props;
        const parameter = parameters[attribute_code];

        if (parameter === undefined) return false;
        if (parameter.length !== undefined) return parameter.includes(attribute_value);
        return parameter === attribute_value;
    }

    renderConfigurableAttributeValue(attribute) {
        const { attribute_value } = attribute;

        return (
            <ProductAttributeValue
              key={ attribute_value }
              attribute={ attribute }
              isSelected={ this.isSelected(attribute) }
              onClick={ () => this.handleOptionClick(attribute) }
              getLink={ () => this.getLink(attribute) }
            />
        );
    }

    renderPlaceholder() {
        return (
            <>
                <h4 block="ProductConfigurableAttribute" elem="SectionHeading">
                    <TextPlaceholder length="medium" />
                </h4>
                <div block="ProductConfigurableAttribute" elem="AttributesList">
                    { Array.from(Array(4).keys(), i => (
                        <div
                          key={ i }
                          block="ProductConfigurableAttribute"
                          elem="Placeholder"
                        />
                    )) }
                </div>
            </>
        );
    }

    renderConfigurableAttributes() {
        const { configurable_options } = this.props;

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
                            this.renderConfigurableAttributeValue({ ...option, attribute_value })
                        )) }
                    </div>
                </section>
            );
        });
    }

    render() {
        const { isReady } = this.props;

        return (
            <div block="ProductConfigurableAttributes">
                { isReady ? this.renderConfigurableAttributes() : this.renderPlaceholder() }
            </div>
        );
    }
}

ProductConfigurableAttributes.propTypes = {
    configurable_options: PropTypes.objectOf(AttributeType).isRequired,
    getLink: PropTypes.func.isRequired,
    parameters: PropTypes.shape({}).isRequired,
    updateConfigurableVariant: PropTypes.func.isRequired,
    isReady: PropTypes.bool
};

ProductConfigurableAttributes.defaultProps = {
    isReady: true
};

export default ProductConfigurableAttributes;
