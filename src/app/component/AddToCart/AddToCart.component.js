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
import { ProductType } from 'Type/ProductList';
import './AddToCart.style';

/**
 * Button for adding product to Cart
 * @class AddToCart
 */
class AddToCart extends Component {
    render() {
        const {
            mix,
            product: { id },
            isLoading
        } = this.props;

        if (!id) {
            return (
                <div
                  block="AddToCart"
                  mods={ { isLoading, isPlaceholder: true } }
                  mix={ mix }
                />
            );
        }

        const { product: { stock_status } } = this.props;
        const isNotAvailable = stock_status !== 'IN_STOCK';

        return (
            <button
              onClick={ () => this.buttonClick() }
              block="Button AddToCart"
              mods={ { isLoading } }
              mix={ mix }
              disabled={ isLoading || isNotAvailable }
            >
                <span>{ __('Add to cart') }</span>
                <span>{ __('Adding...') }</span>
            </button>
        );
    }
}

AddToCart.propTypes = {
    product: ProductType,
    mix: PropTypes.shape({
        block: PropTypes.string,
        elem: PropTypes.string,
        mods: PropTypes.objectOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]))
    })
};

AddToCart.defaultProps = {
    product: {},
    mix: {}
};

export default AddToCart;
