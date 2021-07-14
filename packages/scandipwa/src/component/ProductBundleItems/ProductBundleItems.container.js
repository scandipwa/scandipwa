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

import ProductCustomizableOptionsContainer
    from 'Component/ProductCustomizableOptions/ProductCustomizableOptions.container';
import { ProductItemsType } from 'Type/ProductList';

import ProductBundleItems from './ProductBundleItems.component';

/** @namespace Component/ProductBundleItems/Container */
export class ProductBundleItemsContainer extends ProductCustomizableOptionsContainer {
    static propTypes = {
        ...ProductCustomizableOptionsContainer.propTypes,
        items: ProductItemsType,
        setBundlePrice: PropTypes.func.isRequired
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

    getOptionPrice(item, selectedValues) {
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

                const {
                    finalOptionPrice,
                    finalOptionPriceExclTax,
                    regularOptionPrice
                } = selectedOption;

                return {
                    price: price + finalOptionPrice * quantity,
                    priceExclTax: priceExclTax + finalOptionPriceExclTax * quantity,
                    initialPrice: initialPrice + regularOptionPrice * quantity
                };
            }, { price: 0, priceExclTax: 0, initialPrice: 0 });
    }

    getItemsPrice = (item) => {
        const {
            selectedDropdownOptions = [],
            selectedCheckboxValues = []
        } = this.state;

        const values = [...selectedCheckboxValues, ...selectedDropdownOptions];

        if (values.length) {
            return this.getOptionPrice(item, values);
        }

        return { price: 0, priceExclTax: 0, initialPrice: 0 };
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
