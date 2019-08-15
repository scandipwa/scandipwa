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
import { ProductType } from 'Type/ProductList';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ProductActions from './ProductActions.component';

export const mapStateToProps = state => ({
    groupedProductQuantity: state.ProductReducer.groupedProductQuantity
});

export class ProductActionsContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.optionsInCurrentVariant = {};

        this.state = {
            quantity: 1
        };

        this.containerFunctions = {
            setQuantityToDefault: this.setQuantityToDefault.bind(this),
            showOnlyIfLoaded: this.showOnlyIfLoaded.bind(this),
            changeConfigurableVariant: this.changeConfigurableVariant.bind(this),
            getIsOptionInCurrentVariant: this.getIsOptionInCurrentVariant.bind(this),
            setQuantity: this.setQuantity.bind(this)
        };
    }

    setQuantity(value) {
        this.setState({ quantity: value });
    }

    // TODO: make key=>value based
    getIsOptionInCurrentVariant(attribute, value) {
        const { configurableVariantIndex, product: { variants } } = this.props;
        if (!variants) return false;
        return variants[configurableVariantIndex].product[attribute] === value;
    }

    setQuantityToDefault() {
        this.setState({ quantity: 1 });
    }

    changeConfigurableVariant(attributeCode, value) {
        const {
            product: {
                variants,
                configurable_options
            },
            updateConfigurableVariantIndex,
            configurableVariantIndex
        } = this.props;

        const {
            product: currentConfigurableVariant
        } = variants[configurableVariantIndex];

        const currentVariant = {
            ...currentConfigurableVariant,
            [attributeCode]: value
        };

        for (let i = 0; i < variants.length; i++) {
            const { product } = variants[i];
            const isCorrectVariant = configurable_options.every(
                ({ attribute_code: code }) => parseInt(product[code], 10) === parseInt(currentVariant[code], 10)
            );

            if (isCorrectVariant) return updateConfigurableVariantIndex(i);
        }

        return null;
    }

    showOnlyIfLoaded(expression, content, placeholder = content) {
        const { areDetailsLoaded } = this.props;

        if (!areDetailsLoaded) return placeholder;
        if (areDetailsLoaded && !expression) return null;
        return content;
    }

    render() {
        return (
            <ProductActions
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

ProductActionsContainer.propTypes = {
    product: ProductType.isRequired,
    configurableVariantIndex: PropTypes.number.isRequired,
    updateConfigurableVariantIndex: PropTypes.func.isRequired,
    areDetailsLoaded: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(ProductActionsContainer);
