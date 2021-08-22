/* eslint-disable */
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
import { connect } from 'react-redux';
import { showNotification } from 'Store/Notification/Notification.action';
import { ProductType } from 'Type/ProductList';
import { getMaxQuantity, getMinQuantity, getName, getProductInStock } from 'Util/Product/Extract';
import { MixType } from 'Type/Common';
import { LayoutType } from 'Type/Layout';
import { GRID_LAYOUT } from 'Route/CategoryPage/CategoryPage.config';
import AddToCart from './AddToCart.component';
import PRODUCT_TYPE from 'Config/Product.config';

export const mapStateToProps = () => ({
});

export const mapDispatchToProps = (dispatch) => ({
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

export class AddToCartContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        quantity: PropTypes.number,
        showNotification: PropTypes.func.isRequired,
        addToCart: PropTypes.func.isRequired,
        isDisabled: PropTypes.bool,

        isIconEnabled: PropTypes.bool,
        mix: MixType,
        layout: LayoutType
    };

    static defaultProps = {
        quantity: 1,
        mix: {},
        layout: GRID_LAYOUT,
        isIconEnabled: true,
        isDisabled: false
    };

    containerFunctions = {
        addProductToCart: this.addProductToCart.bind(this)
    }

    globalValidationMap = [
        this.validateStock.bind(this),
        this.validateQuantity.bind(this),
        this.validateCustomizable.bind(this),
        this.validateByType.bind(this)
    ];

    typeValidationMap = {
        [PRODUCT_TYPE.bundle]: this.validateBundle.bind(this),
        [PRODUCT_TYPE.downloadable]: this.validateDownloadable.bind(this),
        [PRODUCT_TYPE.configurable]: this.validateConfigurable.bind(this),
        [PRODUCT_TYPE.grouped]: this.validateConfigurable.bind(this)
    };

    addProductToCart() {
        if (!this.validate()) {
            return;
        }

        const { addToCart } = this.props;
        addToCart();
    }

    validate() {
        let isValid = true;
        this.globalValidationMap.forEach((step) => {
           if (!step()){
               isValid = false;
           }
        });

        return isValid;
    }

    validateStock() {
        const { product, showNotification } = this.props;
        const inStock = getProductInStock(product);
        if (!inStock) {
            const name = getName(product);
            showNotification('info', __('Sorry! The product %s is out of stock!', name));
        }

        return inStock;
    }

    validateQuantity() {
        const { product, quantity, showNotification } = this.props;
        const minQty = getMinQuantity(product);
        const maxQty = getMaxQuantity(product);
        const inRange = quantity >= minQty && quantity <= maxQty;
        if (!inRange) {
            if (quantity < minQty) {
                showNotification('info', __('Sorry! Minimum quantity for this product is %s!', minQty));
            } else {
                showNotification('info', __('Sorry! Maximum quantity for this product is %s!', maxQty));
            }
        }

        return inRange;
    }

    validateByType() {
        const { product: { type_id } = {} } = this.props;
        const { [type_id]: typeValidationFn } = this.typeValidationMap;

        if (!typeValidationFn) {
            return true;
        }

        return typeValidationFn();
    }

    validateBundle() {
        return true;
    }

    validateCustomizable() {
        return true;
    }

    validateDownloadable() {
        return true;
    }

    validateGroup() {
        return true;
    }

    validateConfigurable() {
        return true;
    }

    render() {
        return (
            <AddToCart
                { ...this.props }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartContainer);
