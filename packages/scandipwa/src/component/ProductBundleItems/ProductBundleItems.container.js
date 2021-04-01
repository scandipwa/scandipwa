/* eslint-disable fp/no-let */
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

import {
    PRICE_TYPE_DYNAMIC,
    PRICE_TYPE_FIXED,
    PRICE_TYPE_PERCENT
} from 'Component/ProductBundleItems/ProductBundleItems.config';
import ProductCustomizableOptionsContainer
    from 'Component/ProductCustomizableOptions/ProductCustomizableOptions.container';
import { ProductItemsType } from 'Type/ProductList';

import { ONE_HUNDRED_PERCENT } from '../ProductActions/ProductActions.config';
import ProductBundleItems from './ProductBundleItems.component';

/** @namespace Component/ProductBundleItems/Container */
export class ProductBundleItemsContainer extends ProductCustomizableOptionsContainer {
    static propTypes = {
        ...ProductCustomizableOptionsContainer.propTypes,
        items: ProductItemsType,
        setBundlePrice: PropTypes.func.isRequired,
        isDynamicPrice: PropTypes.bool.isRequired
    };

    static defaultProps = {
        items: []
    };

    containerFunctions = {
        ...this.containerFunctions,
        updateQuantity: this.updateQuantity.bind(this)
    };

    componentDidMount() {
        const { items } = this.props;

        if (items) {
            this.stopLoading();
        }
    }

    componentDidUpdate(_, prevState) {
        const { items } = this.props;
        const {
            selectedCheckboxValues,
            selectedDropdownOptions,
            isLoading
        } = this.state;

        const {
            selectedCheckboxValues: prevSelectedCheckboxValues,
            selectedDropdownOptions: prevSelectedDropdownOptions
        } = prevState;

        if (items && isLoading) {
            this.stopLoading();
        }

        if (
            selectedDropdownOptions !== prevSelectedDropdownOptions
            || selectedCheckboxValues !== prevSelectedCheckboxValues
        ) {
            this.updateSelectedOptions();
        }
    }

    stopLoading() {
        this.setState({ isLoading: false });
    }

    optionPriceMap = {
        [PRICE_TYPE_DYNAMIC]: this.getDynamicOptionPrice.bind(this),
        [PRICE_TYPE_FIXED]: this.getFixedOptionPrice.bind(this),
        [PRICE_TYPE_PERCENT]: this.getPercentOptionPrice.bind(this)
    };

    getDynamicOptionPrice(product, quantity) {
        const {
            price_range: {
                minimum_price: {
                    regular_price: {
                        value: itemPrice = 0
                    } = {},
                    final_price: {
                        value: finalItemPrice = 0
                    } = {},
                    final_price_excl_tax: {
                        value: finalItemPriceExclTax = 0
                    } = {}
                } = {}
            } = {}
        } = product;

        const optionInitialPrice = itemPrice * quantity;
        const optionPrice = finalItemPrice * quantity;
        const optionPriceExclTax = finalItemPriceExclTax * quantity;
        return { optionPrice, optionPriceExclTax, optionInitialPrice };
    }

    getPercentOptionPrice(product, quantity, optionPricePercent) {
        const {
            price_range: {
                minimum_price: {
                    default_price: { value: defaultPrice } = {},
                    default_final_price: { value: defaultFinalPrice } = {},
                    default_final_price_excl_tax: { value: defaultFinalPriceExclTax } = {}
                }
            }
        } = this.props;

        const optionPriceMultiplier = optionPricePercent / ONE_HUNDRED_PERCENT;

        const optionInitialPrice = defaultPrice * optionPriceMultiplier * quantity;
        const optionPrice = (defaultFinalPrice * optionPriceMultiplier * quantity);
        const optionPriceExclTax = (defaultFinalPriceExclTax * optionPriceMultiplier * quantity);
        return { optionPrice, optionPriceExclTax, optionInitialPrice };
    }

    getFixedOptionPrice(product, quantity, optionPriceFixed) {
        const optionInitialPrice = optionPriceFixed * quantity;
        const optionPrice = optionPriceFixed * quantity;
        const optionPriceExclTax = optionPriceFixed * quantity;
        return { optionPrice, optionPriceExclTax, optionInitialPrice };
    }

    getOptionPrice(item, selectedValues, isDynamicPrice) {
        const { option_id } = item;
        let price = 0;
        let priceExclTax = 0;
        let initialPrice = 0;

        selectedValues.forEach(({ id, quantity, value }) => {
            if (option_id === id) {
                const { options } = item;

                options.forEach(({
                    id: optionId, product, price: initialOptionPrice, price_type: priceType
                }) => {
                    if (JSON.stringify(value) === JSON.stringify([optionId.toString()])) {
                        if (product === null) {
                            return;
                        }

                        const priceTypeOption = isDynamicPrice ? PRICE_TYPE_DYNAMIC : priceType;
                        const calculationMethod = this.optionPriceMap[priceTypeOption];

                        if (calculationMethod) {
                            const {
                                optionPrice,
                                optionPriceExclTax,
                                optionInitialPrice
                            } = calculationMethod(product, quantity, initialOptionPrice);

                            price += optionPrice;
                            priceExclTax += optionPriceExclTax;
                            initialPrice += optionInitialPrice;
                        }
                    }
                });
            }
        });

        return { price, priceExclTax, initialPrice };
    }

    getItemsPrice = (item) => {
        const {
            selectedDropdownOptions = [],
            selectedCheckboxValues = []
        } = this.state;

        const { isDynamicPrice } = this.props;

        const values = [...selectedCheckboxValues, ...selectedDropdownOptions];

        if (values.length) {
            return this.getOptionPrice(item, values, isDynamicPrice);
        }

        return { price: 0, priceExclTax: 0, initialPrice: 0 };
    };

    getTotalPrice() {
        const { items, isDynamicPrice } = this.props;
        let price = 0;
        let finalPrice = 0;
        let priceExclTax = 0;

        if (!isDynamicPrice) {
            const {
                price_range: {
                    minimum_price: {
                        default_price: { value: defaultPrice } = {},
                        default_final_price: { value: defaultFinalPrice } = {},
                        default_final_price_excl_tax: { value: defaultFinalPriceExclTax } = {}
                    }

                }
            } = this.props;

            price = defaultPrice;
            finalPrice = defaultFinalPrice;
            priceExclTax = defaultFinalPriceExclTax;
        }

        return items
            .map(this.getItemsPrice.bind(this))
            .reduce(
                ({ price, finalPrice, priceExclTax }, item) => ({
                    price: price + item.initialPrice,
                    finalPrice: finalPrice + item.price,
                    priceExclTax: priceExclTax + item.priceExclTax
                }),
                { price, finalPrice, priceExclTax }
            );
    }

    updateSelectedOptions() {
        const { getSelectedCustomizableOptions, setBundlePrice } = this.props;
        const { selectedDropdownOptions, selectedCheckboxValues } = this.state;
        const bundleOptions = [];
        const bundlePrices = this.getTotalPrice();

        bundleOptions.push(
            ...bundleOptions,
            ...selectedCheckboxValues,
            ...selectedDropdownOptions
        );

        getSelectedCustomizableOptions(bundleOptions);
        setBundlePrice(bundlePrices);
    }

    setSelectedDropdownValue(id, option) {
        const { selectedDropdownOptions } = this.state;
        const { value, quantity, option_id } = option;

        if (!id) {
            const filteredOptions = selectedDropdownOptions.filter((item) => item.id !== option_id);
            this.setState({ selectedDropdownOptions: filteredOptions });

            return;
        }

        const optionData = { id, quantity, value: [value] };

        if (selectedDropdownOptions.some(({ id: val }) => val === id)) {
            const filteredItems = selectedDropdownOptions.filter((item) => item.id !== id);
            this.setState({ selectedDropdownOptions: filteredItems.concat(optionData) });

            return;
        }

        const newItemData = selectedDropdownOptions;
        newItemData.push(optionData);

        this.setState({
            selectedDropdownOptions: Array.from(newItemData)
        });
    }

    updateQuantity(value, quantity) {
        const { selectedCheckboxValues } = this.state;

        this.setState({
            selectedCheckboxValues: selectedCheckboxValues.map((el) => (
                JSON.stringify(el.value) === JSON.stringify(value) ? { ...el, quantity } : el
            ))
        });
    }

    setSelectedCheckboxValues(id, optionData) {
        const { selectedCheckboxValues } = this.state;
        const { value, quantity } = optionData;
        const selectedValue = { id, quantity, value: [value] };

        if (selectedCheckboxValues.some(({ value: val }) => JSON.stringify([value]) === JSON.stringify(val))) {
            this.setState({
                selectedCheckboxValues: selectedCheckboxValues.filter(
                    (item) => JSON.stringify(item.value) !== JSON.stringify([value])
                ) || []
            });

            return;
        }

        const newItemData = selectedCheckboxValues;
        newItemData.push(selectedValue);

        this.setState({
            selectedCheckboxValues: Array.from(newItemData)
        });
    }

    render() {
        return (
            <ProductBundleItems
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default ProductBundleItemsContainer;
