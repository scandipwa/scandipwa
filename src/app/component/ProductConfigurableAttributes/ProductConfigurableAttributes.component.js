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
import ExpandableContent from 'Component/ExpandableContent';
import ProductAttributeValue from 'Component/ProductAttributeValue';
import './ProductConfigurableAttributes.style';
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

    getSubHeading({ attribute_values, attribute_code, attribute_options }) {
        return attribute_values.reduce((acc, attribute_value) => (
            this.isSelected({ attribute_code, attribute_value })
                ? [...acc, attribute_options[attribute_value].label]
                : acc
        ), []).join(', ');
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

    renderPlaceholders() {
        return Array.from({ length: 2 }, (_, i) => (
            <ExpandableContent
              key={ i }
              mix={ { block: 'ProductConfigurableAttributes' } }
            >
                <div key={ i } block="ProductConfigurableAttributes" elem="AttributesList">
                    { Array.from({ length: 6 }, i => (
                        <div
                          key={ i }
                          block="ProductConfigurableAttributes"
                          elem="Placeholder"
                        />
                    )) }
                </div>
            </ExpandableContent>
        ));
    }

    renderConfigurableAttributes() {
        const { configurable_options } = this.props;

        return Object.values(configurable_options).map((option) => {
            const { attribute_values, attribute_label } = option;

            return (
                <ExpandableContent
                  key={ attribute_label }
                  heading={ attribute_label }
                  subHeading={ this.getSubHeading(option) }
                  mix={ { block: 'ProductConfigurableAttributes' } }
                >
                    <div block="ProductConfigurableAttributes" elem="AttributesList">
                        { attribute_values.map(attribute_value => (
                            this.renderConfigurableAttributeValue({ ...option, attribute_value })
                        )) }
                    </div>
                </ExpandableContent>
            );
        });
    }

    render() {
        const { isReady, mix } = this.props;

        return (
            <div block="ProductConfigurableAttributes" mix={ mix }>
                { isReady ? this.renderConfigurableAttributes() : this.renderPlaceholders() }
            </div>
        );
    }
}

ProductConfigurableAttributes.propTypes = {
    configurable_options: PropTypes.objectOf(AttributeType).isRequired,
    getLink: PropTypes.func.isRequired,
    parameters: PropTypes.shape({}).isRequired,
    updateConfigurableVariant: PropTypes.func.isRequired,
    isReady: PropTypes.bool,
    mix: PropTypes.shape({
        block: PropTypes.string,
        elem: PropTypes.string
    })
};

ProductConfigurableAttributes.defaultProps = {
    isReady: true,
    mix: {}
};

export default ProductConfigurableAttributes;
