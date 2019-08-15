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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ProductType } from 'Type/ProductList';
import './AddToCart.style';

/**
 * Button for adding product to Cart
 * @class AddToCart
 */
class AddToCart extends PureComponent {
    render() {
        const {
            mix,
            product: {
                type_id,
                stock_status,
                variants = []
            },
            isLoading,
            buttonClick,
            configurableVariantIndex
        } = this.props;

        if (!type_id) {
            return (
                <div
                  block="AddToCart"
                  mods={ { isLoading, isPlaceholder: true } }
                  mix={ mix }
                />
            );
        }

        const isNotAvailable = stock_status !== 'IN_STOCK';
        const isNotVariantAvailable = type_id === 'configurable' && !variants[configurableVariantIndex];

        return (
            <button
              onClick={ buttonClick }
              block="Button AddToCart"
              mix={ mix }
              mods={ { isLoading } }
              disabled={ isLoading || isNotAvailable || isNotVariantAvailable }
            >
                <span>{ __('Add to cart') }</span>
                <span>{ __('Adding...') }</span>
            </button>
        );
    }
}

AddToCart.propTypes = {
    isLoading: PropTypes.bool,
    product: ProductType,
    configurableVariantIndex: PropTypes.number,
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
    mix: {},
    isLoading: false,
    configurableVariantIndex: 0
};

export default AddToCart;
