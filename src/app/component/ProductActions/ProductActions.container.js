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
    static propTypes = {
        product: ProductType.isRequired,
        configurableVariantIndex: PropTypes.number.isRequired,
        areDetailsLoaded: PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            quantity: 1
        };

        this.containerFunctions = {
            showOnlyIfLoaded: this.showOnlyIfLoaded.bind(this),
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

export default connect(mapStateToProps)(ProductActionsContainer);
