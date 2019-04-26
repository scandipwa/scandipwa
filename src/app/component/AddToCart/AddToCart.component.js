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
    constructor(props) {
        super(props);
        this.state = { isLoading: false };
        this.timeOut = null;
    }

    componentWillUnmount() {
        clearTimeout(this.timeOut);
    }

    /**
     * Switch button text to indicated that product has been added
     * @return {Promise}
     */
    setAnimationTimeout() {
        return setTimeout(() => {
            this.timeOut = null;
            this.setState(({ transition }) => ({ transition: !transition }));
        }, 1500);
    }

    /**
     * Button click listener
     * @return {void}
     */
    buttonClick() {
        const {
            product,
            configurableVariantIndex,
            groupedProductQuantity,
            quantity,
            addProduct
        } = this.props;
        const { variants, type_id } = product;

        this.setState({ isLoading: true });

        if (type_id === 'grouped') {
            const { items } = product;
            Promise.all(items.map((item) => {
                // TODO: TEST
                const { product: groupedProductItem } = item;
                const {
                    items: deletedItems,
                    ...parentProduct
                } = product;

                groupedProductItem.parent = parentProduct;

                return addProduct({
                    product: groupedProductItem,
                    quantity: groupedProductQuantity[groupedProductItem.id]
                });
            })).then(() => this.setState({ isLoading: false }));
        }

        const productToAdd = variants
            ? {
                ...product,
                configurableVariantIndex
            }
            : product;

        return addProduct({
            product: productToAdd,
            quantity
        }).then(() => this.setState({ isLoading: false }));
    }

    render() {
        const { isLoading } = this.state;
        const { mix } = this.props;

        return (
            <button
              onClick={ () => this.buttonClick() }
              block="Button AddToCart"
              mix={ mix }
              mods={ { isLoading } }
              disabled={ isLoading }
            >
                <span>Add to cart</span>
                <span>Adding...</span>
            </button>
        );
    }
}

AddToCart.propTypes = {
    product: ProductType.isRequired,
    quantity: PropTypes.number,
    configurableVariantIndex: PropTypes.number,
    groupedProductQuantity: PropTypes.objectOf(PropTypes.number),
    addProduct: PropTypes.func.isRequired,
    mix: PropTypes.shape({
        block: PropTypes.string,
        elem: PropTypes.string,
        mods: PropTypes.objectOf(PropTypes.string)
    })
};

AddToCart.defaultProps = {
    quantity: 1,
    configurableVariantIndex: 0,
    groupedProductQuantity: {},
    mix: {}
};

export default AddToCart;
