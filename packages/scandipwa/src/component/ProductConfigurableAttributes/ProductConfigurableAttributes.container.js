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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { getBooleanLabel } from 'Util/Product';

import ProductConfigurableAttributes from './ProductConfigurableAttributes.component';

/** @namespace Component/ProductConfigurableAttributes/Container */
export class ProductConfigurableAttributesContainer extends PureComponent {
    static propTypes = {
        getLink: PropTypes.func.isRequired,
        parameters: PropTypes.shape({}).isRequired,
        updateConfigurableVariant: PropTypes.func.isRequired
    };

    containerFunctions = {
        handleOptionClick: this.handleOptionClick.bind(this),
        getSubHeading: this.getSubHeading.bind(this),
        isSelected: this.isSelected.bind(this),
        getLink: this.getLink.bind(this)
    };

    getLink({ attribute_code, attribute_value }) {
        const { getLink } = this.props;
        return getLink(attribute_code, attribute_value);
    }

    getSubHeading({
        attribute_values, attribute_code, attribute_options, is_boolean = false
    }) {
        return attribute_values.reduce((acc, attribute_value) => (this.isSelected({
            attribute_code,
            attribute_value
        })
            ? [...acc, getBooleanLabel(attribute_options[attribute_value].label, is_boolean)]
            : acc), []).join(', ');
    }

    handleOptionClick({ attribute_code, attribute_value }) {
        const { updateConfigurableVariant } = this.props;
        updateConfigurableVariant(attribute_code, attribute_value);
    }

    isSelected({ attribute_code, attribute_value }) {
        const { parameters = {} } = this.props;
        const parameter = parameters[attribute_code];

        if (parameter === undefined) {
            return false;
        }
        if (parameter.length !== undefined) {
            return parameter.includes(attribute_value);
        }

        return parameter === attribute_value;
    }

    render() {
        return (
            <ProductConfigurableAttributes
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default ProductConfigurableAttributesContainer;
