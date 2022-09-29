/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { ComponentType, createRef, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { FIELD_RADIO_NONE, FieldType } from 'Component/Field/Field.config';
import { ProductType } from 'Component/Product/Product.config';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement } from 'Type/Common.type';
import fromCache from 'Util/Cache/Cache';
import getFieldsData from 'Util/Form/Extract';
import { FieldData } from 'Util/Form/Form.type';
import { ADD_TO_CART, getNewParameters, getVariantIndex } from 'Util/Product';
import {
    getAdjustedPrice,
    getGroupedProductsInStockQuantity,
    getMaxQuantity,
    getMinQuantity,
    getName,
    getPrice,
    getProductInStock
} from 'Util/Product/Extract';
import { IndexedProduct, ProductTransformData } from 'Util/Product/Product.type';
import { magentoProductTransform, transformParameters } from 'Util/Product/Transform';
import { RootState } from 'Util/Store/Store.type';
import { validateGroup } from 'Util/Validator';

import {
    AdjustedPriceMap,
    ProductComponentContainerFunctions,
    ProductComponentContainerPropKeys,
    ProductComponentProps,
    ProductContainerMapDispatchProps,
    ProductContainerMapStateProps,
    ProductContainerProps,
    ProductContainerState,
    ProductOption,
    ProductQuantity
} from './Product.type';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Component/Product/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): ProductContainerMapDispatchProps => ({
    addProductToCart: (options) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addProductToCart(dispatch, options)
    ),
    showError: (message) => dispatch(showNotification(NotificationType.ERROR, message))
});

/** @namespace Component/Product/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductContainerMapStateProps => ({
    cartId: state.CartReducer.cartTotals.id || '',
    device: state.ConfigReducer.device,
    isWishlistEnabled: state.ConfigReducer.wishlist_general_active
});

/**
 * Abstract Product class used to hold shared functionality
 * between ProductDetails & ProductCard
 * @class ProductContainer
 * @namespace Component/Product/Container
*/
export class ProductContainer<
P extends ProductContainerProps = ProductContainerProps,
S extends ProductContainerState = ProductContainerState
> extends PureComponent <P, S> {
    static defaultProps: Partial<ProductContainerProps> = {
        configFormRef: createRef<HTMLFormElement>(),
        parameters: {},
        defaultSelectedOptions: [],
        defaultEnteredOptions: [],
        cartId: ''
    };

    containerFunctions: ProductComponentContainerFunctions = {
        addToCart: this.addToCart.bind(this),

        // Used to update entered and selected state values
        updateSelectedValues: this.updateSelectedValues.bind(this),
        setDownloadableLinks: this.setStateOptions.bind(this, 'downloadableLinks'),
        setQuantity: this.setQuantity.bind(this),
        setAdjustedPrice: this.setAdjustedPrice.bind(this),

        getActiveProduct: this.getActiveProduct.bind(this),
        setActiveProduct: this.updateConfigurableVariant.bind(this),
        getMagentoProduct: this.getMagentoProduct.bind(this),
        setValidator: this.setValidator.bind(this),
        scrollOptionsIntoView: this.scrollOptionsIntoView.bind(this),
        updateAddToCartTriggeredWithError: this.updateAddToCartTriggeredWithError.bind(this)
    };

    validator: HTMLElement | null = null;

    __construct(props: ProductContainerProps): void {
        const { parameters } = props;

        super.__construct?.(props);

        // TODO: There is a strange error when type isn't compatible with the same type.
        // Probably this is related to the fact that the class is generic.
        // Need to investigate this later.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.state = {
            // Used for customizable & bundle options
            enteredOptions: this.setDefaultProductOptions('defaultEnteredOptions', 'enteredOptions'),
            selectedOptions: this.setDefaultProductOptions('defaultSelectedOptions', 'selectedOptions'),
            addToCartTriggeredWithError: false,
            // Used for downloadable
            downloadableLinks: [],

            quantity: 1,

            // Used to add to the base price a selected option prices
            adjustedPrice: {},

            // Used for configurable product - it can be ether parent or variant
            selectedProduct: null,
            parameters,
            unselectedOptions: [],
            currentProductSKU: '',
            activeProduct: null
        };
    }

    static getDerivedStateFromProps(
        props: ProductContainerProps,
        state: ProductContainerState
    ): { quantity: ProductQuantity } | null {
        const { quantity: quantityState } = state;
        const quantity = ProductContainer.getDefaultQuantity(props, state);

        if (quantity && typeof quantityState !== 'object') {
            return { quantity };
        }

        return null;
    }

    // eslint-disable-next-line react/sort-comp
    static getDefaultQuantity(
        props: ProductContainerProps,
        state: ProductContainerState
    ): ProductQuantity | null {
        const { quantity, selectedProduct } = state;
        const { product, product: { type_id: typeId } = {} } = props;

        if (!product) {
            return null;
        }

        if (typeId === ProductType.GROUPED) {
            return getGroupedProductsInStockQuantity(product);
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

    componentDidMount(): void {
        this.updateSelectedValues();
        this.updateAdjustedPrice();
    }

    componentDidUpdate(
        prevProps: ProductContainerProps,
        prevState: ProductContainerState
    ): void {
        const {
            enteredOptions,
            selectedOptions,
            downloadableLinks
        } = this.state;
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

    containerProps(): Pick<ProductComponentProps, ProductComponentContainerPropKeys> {
        const {
            quantity,
            parameters,
            adjustedPrice,
            unselectedOptions,
            addToCartTriggeredWithError
        } = this.state;
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
            unselectedOptions,
            quantity,
            product,
            configFormRef,
            parameters,
            device,
            magentoProduct,
            addToCartTriggeredWithError,
            ...output
        };
    }

    setValidator(elem: HTMLElement): void {
        if (elem && elem !== this.validator) {
            this.validator = elem;
        }
    }

    setDefaultProductOptions<T>(
        keyProp: 'defaultEnteredOptions' | 'defaultSelectedOptions',
        keyState: 'enteredOptions' | 'selectedOptions'
    ): T {
        const { [keyProp]: value } = this.props;

        if (Array.isArray(value) && value.length > 0) {
            this.setState(
                { [keyState]: value || [] } as unknown as ProductContainerState,
                () => {
                    this.updateAdjustedPrice();
                }
            );
        }

        return (value || []) as unknown as T;
    }

    /**
     * Fetches form data for customizable and bundle options.
     * (Should be called when value is changed)
     */
    updateSelectedValues(data: Partial<ProductOption> = {}): void {
        const { configFormRef: { current } = {} } = this.props;

        if (!current) {
            return;
        }

        const enteredOptions: ProductOption[] = [];
        const selectedOptions: string[] = [];

        const { uid, value } = data;

        if (uid && value) {
            enteredOptions.push({
                uid,
                value
            });
        }

        const values = getFieldsData(current, true, [FieldType.NUMBER_WITH_CONTROLS]);

        (values as FieldData[])?.forEach(({
            field, name, value, type
        }) => {
            if (type === FieldType.SELECT) {
                selectedOptions.push(String(value));
            } else if (type === FieldType.CHECKBOX || type === FieldType.RADIO) {
                if (value !== FIELD_RADIO_NONE) {
                    selectedOptions.push(String(value));
                }
            } else if (type !== FieldType.NUMBER_WITH_CONTROLS && type !== FieldType.FILE) {
                enteredOptions.push({
                    uid: name,
                    value: String(value)
                });
            } else if (type === FieldType.FILE && field?.value) {
                enteredOptions.push({
                    uid: name,
                    value: String(value)
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
    updateAdjustedPrice(): void {
        const { product } = this.props;
        const { downloadableLinks, enteredOptions, selectedOptions } = this.state;

        const adjustedPrice = getAdjustedPrice(
            product,
            downloadableLinks,
            enteredOptions,
            selectedOptions
        );

        this.setState({ adjustedPrice });
    }

    setAdjustedPrice(type: keyof AdjustedPriceMap, amount: number): void {
        const { adjustedPrice } = this.state;

        this.setState({
            adjustedPrice: {
                ...adjustedPrice,
                [ type ]: amount
            }
        });
    }

    /**
     * checks for unselected options on add to cart event
     * @returns {boolean}
    */
    validateConfigurableProduct(): boolean {
        const {
            parameters
        } = this.state;

        const { product: { configurable_options = {} } } = this.props;
        const unselectedOptions = Object.keys(configurable_options).reduce((accumulator: string[], value) => {
            if (!parameters[ value ]) {
                accumulator.push(value);
            }

            return accumulator;
        }, []);

        this.setState({ unselectedOptions });

        return unselectedOptions.length > 0;
    }

    updateAddToCartTriggeredWithError(): void {
        this.setState({ addToCartTriggeredWithError: false });
    }

    /**
     * Scrolls Product Options into view on error.
    */
    scrollOptionsIntoView(): void {
        // PLP Products do not have validator so we omit scrolling
        if (this.validator?.classList) {
            const attributes = this.validator.querySelector('[class$=-AttributesWrapper]');

            // For product configurable attributes
            if (attributes) {
                attributes.scrollIntoView({ block: 'center', behavior: 'smooth' });

                return;
            }

            this.validator.scrollIntoView();
        }
    }

    /**
     * Event that validates and invokes product adding into cart
     * @returns {*}
     */
    async addToCart(): Promise<void> {
        this.updateSelectedValues();
        const { showError } = this.props;

        if (this.hasError()) {
            return;
        }

        const { addProductToCart, cartId } = this.props;
        const products = this.getMagentoProduct();

        await addProductToCart({ products, cartId })
            .catch(
                /** @namespace Component/Product/Container/ProductContainer/addToCart/addProductToCart/catch */
                (error: string) => {
                    if (error) {
                        showError(error);
                    }
                }
            );
    }

    /**
     * checks if product has errors before adding to cart
     * @returns {boolean}
    */
    hasError(): boolean {
        if (!this.validator) {
            return false;
        }

        const validationOutput = validateGroup(this.validator);

        const {
            errorMessages = [],
            errorFields = [],
            values = []
        } = validationOutput !== true ? validationOutput : {};
        const { showError } = this.props;

        if (
            errorFields.length
            || errorMessages.length
            || this.validateConfigurableProduct()
            || this.filterAddToCartFileErrors(values)
        ) {
            this.scrollOptionsIntoView();
            this.setState({ addToCartTriggeredWithError: true });
            showError(__('Incorrect or missing options!'));

            return true;
        }

        return false;
    }

    /**
     * filters error messages by non empty file value
     * @param errors
     * @returns {boolean}
    */
    filterAddToCartFileErrors(errors: Array<{ type: string; value: string }>): boolean {
        return errors ? errors.filter((e) => (e.type === 'file' && e.value !== '')).length !== 0 : false;
    }

    /**
     * Updates configurable products selected variant
     * @param key
     * @param value
     */
    updateConfigurableVariant(key: string, value: string | number | boolean, checkEmptyValue = false): void {
        const { parameters: prevParameters } = this.state;

        const newParameters = getNewParameters(prevParameters, key, value);

        const { [ key ]: oldValue, ...currentParameters } = newParameters;
        const parameters = oldValue === '' && checkEmptyValue ? currentParameters : newParameters;

        this.setState({ parameters });

        const { product: { variants = [], configurable_options = {} } } = this.props;
        const { selectedProduct } = this.state;

        const newIndex = Object.keys(parameters).length === Object.keys(configurable_options).length
            ? getVariantIndex(variants, parameters)
            // Not all parameters are selected yet, therefore variantIndex must be invalid
            : -1;

        const newProduct = newIndex === -1 ? null : variants[ newIndex ];

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
    setQuantity(quantity: ProductQuantity): void {
        if (typeof quantity === 'object') {
            const { quantity: oldQuantity = {} } = this.state;

            this.setState({ quantity: { ...(oldQuantity as Record<number, number>), ...quantity } });
        } else {
            this.setState({ quantity: +quantity });
        }
    }

    /**
     * Global state setting function
     * @param type State name
     * @param options State value
     */
    setStateOptions(
        type: keyof ProductContainerState,
        options: ProductContainerState[keyof ProductContainerState]
    ): void {
        this.setState({ [ type ]: options } as unknown as ProductContainerState);
    }

    /**
     * Returns magento graphql compatible product data
     * @returns {*[]}
     */
    getMagentoProduct(): ProductTransformData[] {
        const {
            quantity,
            enteredOptions,
            selectedOptions,
            downloadableLinks,
            parameters
        } = this.state;

        const { product, product: { attributes = {} } } = this.props;

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
    getActiveProduct(): IndexedProduct {
        const { selectedProduct } = this.state;
        const { product } = this.props;

        return selectedProduct ?? product;
    }

    render(): ReactElement {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    ProductContainer as unknown as ComponentType<ProductContainerProps>
);
