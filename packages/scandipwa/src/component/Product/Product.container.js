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

import { FIELD_TYPE } from 'Component/Field/Field.config';
import PRODUCT_TYPE from 'Component/Product/Product.config';
import { showNotification } from 'Store/Notification/Notification.action';
import { RefType } from 'Type/Common.type';
import { DeviceType } from 'Type/Device.type';
import { ProductType } from 'Type/ProductList.type';
import fromCache from 'Util/Cache/Cache';
import getFieldsData from 'Util/Form/Extract';
import { ADD_TO_CART, getNewParameters, getVariantIndex } from 'Util/Product';
import {
    getAdjustedPrice,
    getMaxQuantity,
    getMinQuantity,
    getName,
    getPrice,
    getProductInStock
} from 'Util/Product/Extract';
import { magentoProductTransform, transformParameters } from 'Util/Product/Transform';
import { validateGroup } from 'Util/Validator';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Component/Product/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    addProductToCart: (options) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addProductToCart(dispatch, options)
    ),
    showError: (message) => dispatch(showNotification('error', message))
});

/** @namespace Component/Product/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    cartId: state.CartReducer.id,
    device: state.ConfigReducer.device,
    isWishlistEnabled: state.ConfigReducer.wishlist_general_active
});

/**
 * Abstract Product class used to hold shared functionality
 * between ProductDetails & ProductCard
 * @class ProductContainer
 * @namespace Component/Product/Container
*/
export class ProductContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        addProductToCart: PropTypes.func.isRequired,
        showError: PropTypes.func.isRequired,
        configFormRef: RefType,

        parameters: PropTypes.objectOf(PropTypes.string),
        cartId: PropTypes.string,

        device: DeviceType,
        isWishlistEnabled: PropTypes.bool.isRequired,

        defaultEnteredOptions: PropTypes.arrayOf(PropTypes.shape({
            uid: PropTypes.string,
            value: PropTypes.string
        })),
        defaultSelectedOptions: PropTypes.arrayOf(PropTypes.string)
    };

    static defaultProps = {
        configFormRef: createRef(),
        parameters: {},
        device: {},
        defaultSelectedOptions: [],
        defaultEnteredOptions: [],
        cartId: ''
    };

    containerFunctions = {
        addToCart: this.addToCart.bind(this),

        // Used to update entered and selected state values
        updateSelectedValues: this.updateSelectedValues.bind(this),
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
        enteredOptions: this.setDefaultProductOptions('defaultEnteredOptions', 'enteredOptions'),
        selectedOptions: this.setDefaultProductOptions('defaultSelectedOptions', 'selectedOptions'),

        // Used for downloadable
        downloadableLinks: [],

        quantity: 1,

        // Used to add to the base price a selected option prices
        adjustedPrice: {},

        // Used for configurable product - it can be ether parent or variant
        selectedProduct: null,
        // eslint-disable-next-line react/destructuring-assignment
        parameters: this.props.parameters
    };

    validator = createRef();

    // eslint-disable-next-line react/sort-comp
    setValidator(elem) {
        if (elem && elem !== this.validator) {
            this.validator = elem;
        }
    }

    setDefaultProductOptions(keyProp, keyState) {
        const { [keyProp]: value } = this.props;

        if (Array.isArray(value) && value.length > 0) {
            this.setState({ [keyState]: value || [] }, () => {
                this.updateAdjustedPrice();
            });
        }

        return value || [];
    }

    static getDerivedStateFromProps(props, state) {
        const { quantity: quantityState } = state;
        const quantity = ProductContainer.getDefaultQuantity(props, state);

        if (quantity && typeof quantityState !== 'object') {
            return { quantity };
        }

        return null;
    }

    // eslint-disable-next-line react/sort-comp
    static getDefaultQuantity(props, state) {
        const { quantity, selectedProduct } = state;
        const { product, product: { type_id: typeId } = {} } = props;

        if (!product) {
            return null;
        }

        if (typeId === PRODUCT_TYPE.grouped) {
            const { items = [] } = product;

            return items.reduce((o, { qty = 1, product: { id } }) => ({ ...o, [id]: qty }), {});
        }

        const minQty = getMinQuantity(selectedProduct || product);

        if (quantity < minQty) {
            return minQty;
        }

        const maxQty = getMaxQuantity(selectedProduct || product);

        if (quantity > maxQty) {
            return maxQty;
        }

        return null;
    }

    componentDidMount() {
        this.updateSelectedValues();
        this.updateAdjustedPrice();
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

        const { product } = this.props;
        const { product: prevProduct } = prevProps;

        if (product !== prevProduct) {
            const quantity = ProductContainer.getDefaultQuantity(this.props, this.state);

            if (quantity) {
                this.setQuantity(quantity);
            }

            this.updateSelectedValues();
        }
    }

    containerProps() {
        const { quantity, parameters, adjustedPrice } = this.state;
        const {
            product,
            product: { options = [] } = {},
            configFormRef,
            device,
            isWishlistEnabled
        } = this.props;

        const activeProduct = this.getActiveProduct();
        const magentoProduct = this.getMagentoProduct();
        const {
            price_range: priceRange = {},
            dynamic_price: dynamicPrice = false,
            type_id: type
        } = activeProduct || {};

        const output = {
            inStock: fromCache(getProductInStock, [activeProduct, product]),
            maxQuantity: getMaxQuantity(activeProduct),
            minQuantity: getMinQuantity(activeProduct),
            productName: getName(product),
            productPrice: fromCache(getPrice, [priceRange, dynamicPrice, adjustedPrice, type, options])
        };

        return {
            isWishlistEnabled,
            quantity,
            product,
            configFormRef,
            parameters,
            device,
            magentoProduct,
            ...output
        };
    }

    /**
     * Fetches form data for customizable and bundle options.
     * (Should be called when value is changed)
     */
    updateSelectedValues(data = {}) {
        const { configFormRef: { current } = {} } = this.props;

        if (!current) {
            return;
        }

        const enteredOptions = [];
        const selectedOptions = [];

        const { uid, value } = data;

        if (uid && value) {
            enteredOptions.push({
                uid,
                value
            });
        }

        const values = getFieldsData(current, true, [FIELD_TYPE.number]);

        values.forEach(({ name, value, type }) => {
            if (type === FIELD_TYPE.select) {
                selectedOptions.push(value);
            } else if (type === FIELD_TYPE.checkbox || type === FIELD_TYPE.radio) {
                selectedOptions.push(value);
            } else if (type !== FIELD_TYPE.number) {
                enteredOptions.push({
                    uid: name,
                    value
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

        if (isValid !== true && !this.filterAddToCartFileErrors(isValid.values)) {
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
     * filters error messages by non empty file value
     * @param errors
     * @returns {boolean}
    */
    filterAddToCartFileErrors(errors) {
        return errors.filter((e) => (e.type === 'file' && e.value !== '')).length !== 0;
    }

    /**
     * Updates configurable products selected variant
     * @param key
     * @param value
     */
    updateConfigurableVariant(key, value, checkEmptyValue = false) {
        const { parameters: prevParameters } = this.state;

        const newParameters = getNewParameters(prevParameters, key, value);

        const { [key]: oldValue, ...currentParameters } = newParameters;
        const parameters = oldValue === '' && checkEmptyValue ? currentParameters : newParameters;

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
                parameters
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
            const { quantity: oldQuantity = {} } = this.state;
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
        const {
            quantity,
            enteredOptions,
            selectedOptions,
            downloadableLinks,
            parameters
        } = this.state;

        const { product, product: { attributes } } = this.props;

        const configurableOptions = transformParameters(parameters, attributes);

        return magentoProductTransform(
            ADD_TO_CART,
            product,
            quantity,
            enteredOptions,
            [...selectedOptions, ...downloadableLinks, ...configurableOptions],
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
