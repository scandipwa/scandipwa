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
import { CartDispatcher } from 'Component/WishlistItem/WishlistItem.container';
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

export const mapDispatchToProps = (dispatch) => ({
    addProductToCart: (options) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addProductToCart(dispatch, options)
    ),
    showError: (message) => dispatch(showNotification('error', message)),
});

export const mapStateToProps = () => ({});

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

        parameters: PropTypes.objectOf(PropTypes.string)
    };

    static defaultProps = {
        configFormRef: createRef(),
        parameters: {}
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
            product: {
                price_range: priceRange = {},
                dynamic_price: dynamicPrice = false,
                typeId: type
            },
            configFormRef
        } = this.props;

        const activeProduct = this.getActiveProduct();

        return {
            quantity,
            product,
            configFormRef,
            parameters,
            inStock: getProductInStock(activeProduct),
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

        // Checks each input & textarea field for values
        for (let i = 0; i < current.elements.length; i++) {
            const element = current.elements[i];
            const value = element.value;

            const tagName = element.tagName.toLowerCase();
            if (value && value.length) {
                if (
                    tagName === FIELD_TYPE.textarea
                    || element.type === FIELD_TYPE.text
                    || element.type === FIELD_TYPE.password
                    || element.type === FIELD_TYPE.date
                    || element.type === FIELD_TYPE.dateTime
                    || element.type === FIELD_TYPE.time
                ) {
                    const name = element.name;
                    enteredOptions.push({
                        uid: name,
                        value: value
                    });
                } else if (element.type === FIELD_TYPE.checkbox || element.type === FIELD_TYPE.radio) {
                    if (element.checked) {
                        selectedOptions.push(value);
                    }
                } else if (element.type !== FIELD_TYPE.number) {
                    selectedOptions.push(value);
                }
            }
        }

        this.setState({
            enteredOptions,
            selectedOptions
        });
    }

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

    addToCart() {
        this.updateSelectedValues();

        const isValid = validateGroup(this.validator);
        if (isValid !== true) {
            const { showError } = this.props;
            this.validator.scrollIntoView();
            showError(__('Incorrect or missing options!'));
            return;
        }

        const { addProductToCart } = this.props;
        const products = this.getMagentoProduct();

        return addProductToCart(products);
    }

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

    setQuantity(quantity) {
        if (typeof quantity === 'object') {
            const { quantity : oldQuantity = {} } = this.state
            this.setState({ quantity: { ...oldQuantity, ...quantity } });
        } else {
            this.setState({ quantity: +quantity });
        }
    }

    setStateOptions(type, options) {
        this.setState({ [type]: options });
    }

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
