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
import { createRef, PureComponent } from 'react';
import { connect } from 'react-redux';
import { ProductType } from 'Type/ProductList';
import { FIELD_TYPE } from "Config/Field.config";
import {
    getAdjustedPrice,
    getMaxQuantity,
    getMinQuantity,
    getName,
    getPrice,
    getProductInStock
} from 'Util/Product/Extract';
import { getNewParameters, getVariantIndex } from 'Util/Product';
import { validateGroup } from 'Util/Validator';
import { showNotification } from 'Store/Notification/Notification.action';
import PRODUCT_TYPE from 'Config/Product.config';
import { magentoProductTransform } from 'Util/Product/Transform';
import getFieldsData from 'Util/Form/Extract';
import { DeviceType } from 'Type/Device';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

export const mapDispatchToProps = (dispatch) => ({
    addProductToCart: (options) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addProductToCart(dispatch, options)
    ),
    showError: (message) => dispatch(showNotification('error', message)),
});

export const mapStateToProps = (state) => ({
    cartId: state.CartReducer.id,
    device: state.ConfigReducer.device,
    isWishlistEnabled: state.ConfigReducer.wishlist_general_active,
});

/**
 * Abstract Product class used to hold shared functionality
 * between ProductDetails & ProductCard
 */
export class ProductContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        addProductToCart: PropTypes.func.isRequired,
        showError: PropTypes.func.isRequired,
        configFormRef: PropTypes.object,

        parameters: PropTypes.objectOf(PropTypes.string),
        cartId: PropTypes.string.isRequired,

        device: DeviceType.isRequired,
        isWishlistEnabled: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        configFormRef: createRef(),
        parameters: {},
        device: {}
    }

    containerFunctions = {
        addToCart: this.addToCart.bind(this),

        // Used to update entered and selected state values
        updateSelectedValues: this.updateSelectedValues.bind(this),

        setCustomOptions: this.setStateOptions.bind(this, 'customOptions'),
        setDownloadableLinks: this.setStateOptions.bind(this, 'downloadableLinks'),
        setQuantity: this.setQuantity.bind(this),
        setAdjustedPrice: this.setAdjustedPrice.bind(this),

        getActiveProduct: this.getActiveProduct.bind(this),
        setActiveProduct: this.updateConfigurableVariant.bind(this),
        getMagentoProduct: this.getMagentoProduct.bind(this),
        setValidator: this.setValidator.bind(this)
    };

    state = {
        // Used for customizable & bundle options
        enteredOptions: [],
        selectedOptions: [],

        // Used for downloadable
        downloadableLinks: [],

        quantity: 1,

        // Used to add to the base price a selected option prices
        adjustedPrice: {},

        // Used for configurable product - it can be ether parent or variant
        selectedProduct: null,
        parameters: this.props.parameters
    }

    validator = createRef();

    setValidator(elem) {
        if (elem && elem !== this.validator) {
            this.validator = elem;
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { quantity, selectedProduct } = state;
        const { product, product: { type_id: typeId } } = props

        if (typeId === PRODUCT_TYPE.grouped && typeof quantity !== 'object') {
            return { quantity: {} };
        }

        const maxQty = getMaxQuantity(selectedProduct || product);
        const minQty = getMinQuantity(selectedProduct || product);

        if (quantity < minQty) {
            return { quantity: minQty };
        }
        if (quantity > maxQty) {
            return { quantity: maxQty };
        }

        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        const { enteredOptions, selectedOptions, downloadableLinks } = this.state;
        const {
            enteredOptions: prevEnteredOptions,
            selectedOptions: prevSelectedOptions,
            downloadableLinks: prevDownloadableLinks
        } = prevState;

        if (
            enteredOptions !== prevEnteredOptions
            || selectedOptions !== prevSelectedOptions
            || downloadableLinks !== prevDownloadableLinks
        ) {
            this.updateAdjustedPrice();
        }
    }

    containerProps() {
        const { quantity, parameters, adjustedPrice } = this.state;
        const {
            product,
            configFormRef,
            device,
            isWishlistEnabled
        } = this.props;

        const activeProduct = this.getActiveProduct();
        const {
            price_range: priceRange = {},
            dynamic_price: dynamicPrice = false,
            type_id: type
        } = activeProduct;

        return {
            quantity,
            product,
            configFormRef,
            parameters,
            device,
            isWishlistEnabled,
            inStock: getProductInStock(activeProduct, product),
            maxQuantity: getMaxQuantity(activeProduct),
            minQuantity: getMinQuantity(activeProduct),
            productName: getName(product),
            productPrice: getPrice(priceRange, dynamicPrice, adjustedPrice, type)
        };
    }

    /**
     * Fetches form data for customizable and bundle options.
     * (Should be called when value is changed)
     */
    updateSelectedValues() {
        const { configFormRef: { current } = {} } = this.props;
        if (!current) {
            return;
        }

        const enteredOptions = [];
        const selectedOptions = [];

        const values = getFieldsData(current, true, [FIELD_TYPE.number]);

        values.forEach(({ name, value, type }) => {
           if (type === FIELD_TYPE.select) {
               selectedOptions.push(value);
           } else if (type === FIELD_TYPE.checkbox || type === FIELD_TYPE.radio) {
               selectedOptions.push(value);
           } else if (type !== FIELD_TYPE.number) {
               enteredOptions.push({
                   uid: name,
                   value: value
               });
           }
        });

        this.setState({
            enteredOptions,
            selectedOptions
        });
    }

    /**
     * Generates adjusted price from entered, selected, link options
     */
    updateAdjustedPrice() {
        const { product } = this.props;
        const { downloadableLinks, enteredOptions, selectedOptions } = this.state;

        const adjustedPrice = getAdjustedPrice(
          product, downloadableLinks, enteredOptions, selectedOptions
        );

        this.setState({ adjustedPrice });
    }


    setAdjustedPrice(type, amount) {
        const { adjustedPrice } = this.state;
        this.setState({
            adjustedPrice: {
                ...adjustedPrice,
                [type]: amount
            }
        });
    }

    /**
     * Event that validates and invokes product adding into cart
     * @returns {*}
     */
    async addToCart() {
        this.updateSelectedValues();

        const isValid = validateGroup(this.validator);
        if (isValid !== true) {
            const { showError } = this.props;
            this.validator.scrollIntoView();
            showError(__('Incorrect or missing options!'));
            return;
        }

        const { addProductToCart, cartId } = this.props;
        const products = this.getMagentoProduct();

        await addProductToCart({ products, cartId });
    }

    /**
     * Updates configurable products selected variant
     * @param key
     * @param value
     */
    updateConfigurableVariant(key, value) {
        const { parameters: prevParameters } = this.state;

        const parameters = getNewParameters(prevParameters, key, value);
        this.setState({ parameters });

        const { product: { variants, configurable_options } } = this.props;
        const { selectedProduct } = this.state;

        const newIndex = Object.keys(parameters).length === Object.keys(configurable_options).length
            ? getVariantIndex(variants, parameters)
            // Not all parameters are selected yet, therefore variantIndex must be invalid
            : -1;

        const newProduct = newIndex === -1 ? null : variants[newIndex];

        if (newProduct !== selectedProduct) {
            this.setState({
                selectedProduct: newProduct,
                parameters: parameters
            });
        }
    }

    /**
     * Sets quantity, if grouped adds object over old,
     * if any other product updates value
     * @param quantity
     */
    setQuantity(quantity) {
        if (typeof quantity === 'object') {
            const { quantity : oldQuantity = {} } = this.state
            this.setState({ quantity: { ...oldQuantity, ...quantity } });
        } else {
            this.setState({ quantity: +quantity });
        }
    }

    /**
     * Global state setting function
     * @param type State name
     * @param options State value
     */
    setStateOptions(type, options) {
        this.setState({ [type]: options });
    }

    /**
     * Returns magento graphql compatible product data
     * @returns {*[]}
     */
    getMagentoProduct() {
        const { product } = this.props;
        const {
            quantity,
            enteredOptions,
            selectedOptions,
            downloadableLinks,
        } = this.state;

        const activeProduct = this.getActiveProduct();
        const parentProduct = activeProduct === product ? null : product;
        return magentoProductTransform(
            activeProduct,
            quantity,
            parentProduct,
            enteredOptions,
            [ ...selectedOptions, ...downloadableLinks ],
        );
    }

    /**
     * Returns currently selected product, differs from prop product, for
     * configurable products, as active product can be one of variants.
     * @returns {*}
     */
    getActiveProduct() {
        const { selectedProduct } = this.state;
        const { product } = this.props;

        return selectedProduct ?? product;
    }

    render() {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
