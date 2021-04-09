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

    /*
        Calculate how much each option adds to total product price:
        itemPrice - price of 1 option variant of selected option before discount
        finalItemPrice - price of 1 option variant of selected option after discount
        finalItemPriceExclTax - price of 1 option variant of selected option after discount excluding tax
        To get resulting prices single item price is multiplied by selected quantity
    */
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

    /*
        Calculate how much each option variant of type 'percent' adds to total product price.
        Single option item price is calculated as percentage of default bundle price.
        E.g. if, defaultFinalPrice is 90, and option variant price with type percent has value of 30,
        price of 1 option variant is 90 * (1 - 30 / 100) = 63.
        3 prices are calculated to get prices before discount (optionInitialPrice),
        after discount (optionPrice) and after tax (optionPriceExclTax).
        To get resulting prices single item price is multiplied by selected quantity.
    */
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
        const optionPrice = defaultFinalPrice * optionPriceMultiplier * quantity;
        const optionPriceExclTax = defaultFinalPriceExclTax * optionPriceMultiplier * quantity;
        return { optionPrice, optionPriceExclTax, optionInitialPrice };
    }

    /*
        Calculate how much each option variant of type 'fixed' adds to total product price.
        To get resulting prices single variant price is multiplied by selected quantity.
    */
    getFixedOptionPrice(product, quantity, optionPriceFixed) {
        const optionInitialPrice = optionPriceFixed * quantity;
        const optionPrice = optionPriceFixed * quantity;
        const optionPriceExclTax = optionPriceFixed * quantity;
        return { optionPrice, optionPriceExclTax, optionInitialPrice };
    }

    // Calculating selected option variant prices and summing them up.
    getOptionPrice(item, selectedValues, isDynamicPrice) {
        const { option_id, options } = item;

        return selectedValues
            .filter(({ id }) => id === option_id)
            .reduce((acc, { quantity, value }) => {
                const { price, priceExclTax, initialPrice } = acc;

                const selectedOption = options.find(
                    (option) => JSON.stringify(value) === JSON.stringify([option.id.toString()])
                        && option.product !== null
                );

                if (!selectedOption) {
                    return acc;
                }

                const { price_type, product, price: selectedPrice } = selectedOption;
                const priceTypeOption = isDynamicPrice ? PRICE_TYPE_DYNAMIC : price_type;
                const calculationMethod = this.optionPriceMap[priceTypeOption];
                const selectedOptionPrices = calculationMethod(product, quantity, selectedPrice);
                const {
                    optionPrice = 0,
                    optionPriceExclTax = 0,
                    optionInitialPrice = 0
                } = selectedOptionPrices;

                return {
                    price: price + optionPrice,
                    priceExclTax: priceExclTax + optionPriceExclTax,
                    initialPrice: initialPrice + optionInitialPrice
                };
            }, { price: 0, priceExclTax: 0, initialPrice: 0 });
    }

    getItemsPrice = (item) => {
        const {
            selectedDropdownOptions = [],
            selectedCheckboxValues = []
        } = this.state;

        const { isDynamicPrice } = this.props;

        const values = [...selectedCheckboxValues, ...selectedDropdownOptions];

        if (!values.length) {
            return { price: 0, priceExclTax: 0, initialPrice: 0 };
        }

        return this.getOptionPrice(item, values, isDynamicPrice);
    };

    getTotalPrice() {
        const { items } = this.props;

        return items
            .map(this.getItemsPrice)
            .reduce(
                ({ price, finalPrice, priceExclTax }, item) => ({
                    price: price + item.initialPrice,
                    finalPrice: finalPrice + item.price,
                    priceExclTax: priceExclTax + item.priceExclTax
                }),
                { price: 0, finalPrice: 0, priceExclTax: 0 }
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
