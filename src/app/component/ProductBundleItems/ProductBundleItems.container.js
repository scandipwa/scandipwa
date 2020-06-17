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

import ProductCustomizableOptionsContainer
    from 'Component/ProductCustomizableOptions/ProductCustomizableOptions.container';
import { ProductItemsType } from 'Type/ProductList';
import ProductBundleItems from './ProductBundleItems.component';

class ProductBundleItemsContainer extends ProductCustomizableOptionsContainer {
    static propTypes = {
        ...ProductCustomizableOptionsContainer.propTypes,
        items: ProductItemsType
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

        if (selectedCheckboxValues !== prevSelectedCheckboxValues) {
            this.updateSelectedOptionsArray();
        }

        if (selectedDropdownOptions !== prevSelectedDropdownOptions) {
            this.updateSelectedOptions();
        }
    }

    stopLoading() {
        this.setState({ isLoading: false });
    }

    updateSelectedOptionsArray() {
        const { getSelectedCustomizableOptions } = this.props;
        const { selectedCheckboxValues } = this.state;
        const customizableOptions = [];

        customizableOptions.push(...customizableOptions, ...selectedCheckboxValues);
        getSelectedCustomizableOptions(customizableOptions, true);
    }

    updateSelectedOptions() {
        const { getSelectedCustomizableOptions } = this.props;
        const { selectedDropdownOptions } = this.state;
        const customizableOptions = [];

        customizableOptions.push(
            ...customizableOptions,
            ...selectedDropdownOptions
        );

        getSelectedCustomizableOptions(customizableOptions);
    }

    setSelectedDropdownValue(id, option) {
        const { selectedDropdownOptions } = this.state;
        const { value, quantity, option_id } = option;

        if (!id) {
            const filteredOptions = selectedDropdownOptions.filter(item => item.id !== option_id);
            return this.setState({ selectedDropdownOptions: filteredOptions });
        }

        const optionData = { id, quantity, value: [value] };

        if (selectedDropdownOptions.some(({ id: val }) => val === id)) {
            const filteredItems = selectedDropdownOptions.filter(item => item.id !== id);
            return this.setState({ selectedDropdownOptions: filteredItems.concat(optionData) });
        }

        return this.setState({
            selectedDropdownOptions:
                [...selectedDropdownOptions, optionData]
        });
    }

    updateQuantity(value, quantity) {
        const { selectedCheckboxValues } = this.state;

        this.setState({
            selectedCheckboxValues: selectedCheckboxValues.map(el => (
                JSON.stringify(el.value) === JSON.stringify(value) ? {...el, quantity} : el
            ))
        });
    }

    setSelectedCheckboxValues(id, optionData) {
        const { selectedCheckboxValues } = this.state;

        const [{ value, quantity }] = optionData;
        const selectedValue = { id, quantity, value };

        if (selectedCheckboxValues.some(({ value: val }) => JSON.stringify(value) === JSON.stringify(val))) {
            this.setState({
                selectedCheckboxValues: selectedCheckboxValues.filter(
                    item => JSON.stringify(item.value) !== JSON.stringify(value)
                ) || []
            });

            return;
        }

        this.setState({
            selectedCheckboxValues: [...selectedCheckboxValues, selectedValue]
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
