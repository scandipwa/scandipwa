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

    getOptionPrice(item, selectedValues, bundleDefaultPrices, isDynamicPrice) {
        const { option_id } = item;
        let price = 0;
        let priceExclTax = 0;
        let initialPrice = 0;

        selectedValues.forEach(({ id, quantity, value }) => {
            if (option_id === id) {
                const { options } = item;

                options.forEach(({
                    id: optionId, product, price: optionPrice, price_type: priceType
                }) => {
                    if (JSON.stringify(value) === JSON.stringify([optionId.toString()])) {
                        if (product === null) {
                            return;
                        }

                        if (isDynamicPrice) {
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

                            initialPrice += itemPrice * quantity;
                            price += finalItemPrice * quantity;
                            priceExclTax += finalItemPriceExclTax * quantity;
                        } else if (priceType === PRICE_TYPE_FIXED) {
                            initialPrice += optionPrice * quantity;
                            price += optionPrice * quantity;
                            priceExclTax += optionPrice * quantity;
                        } else if (priceType === PRICE_TYPE_PERCENT) {
                            const {
                                base_price: { value: defaultPrice } = 0,
                                base_final_price: { value: defaultFinalPrice } = 0,
                                base_final_price_excl_tax: { value: defaultFinalPriceExclTax } = 0
                            } = bundleDefaultPrices;

                            initialPrice += (defaultPrice * optionPrice * quantity) / ONE_HUNDRED_PERCENT;
                            price += (defaultFinalPrice * optionPrice * quantity) / ONE_HUNDRED_PERCENT;
                            priceExclTax += (defaultFinalPriceExclTax * optionPrice * quantity) / ONE_HUNDRED_PERCENT;
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

        const {
            price_range: {
                minimum_price: bundleDefaultPrices
            },
            isDynamicPrice
        } = this.props;

        const values = [...selectedCheckboxValues, ...selectedDropdownOptions];

        if (values.length) {
            return this.getOptionPrice(item, values, bundleDefaultPrices, isDynamicPrice);
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
                        base_price: { value: defaultPrice } = 0,
                        base_final_price: { value: defaultFinalPrice } = 0,
                        base_final_price_excl_tax: { value: defaultFinalPriceExclTax } = 0
                    }

                }
            } = this.props;

            price = defaultPrice;
            finalPrice = defaultFinalPrice;
            priceExclTax = defaultFinalPriceExclTax;
        }

        const totalPrice = items
            .map(this.getItemsPrice.bind(this))
            .reduce(
                ({ price, finalPrice, priceExclTax }, item) => ({
                    price: price + item.initialPrice,
                    finalPrice: finalPrice + item.price,
                    priceExclTax: priceExclTax + item.priceExclTax
                }),
                { price, finalPrice, priceExclTax }
            );

        return totalPrice;
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
