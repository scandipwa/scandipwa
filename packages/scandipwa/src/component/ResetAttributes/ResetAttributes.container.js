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

import { SelectedFiltersType } from 'Type/Category.type';
import { AttributesType } from 'Type/ProductList.type';
import { getPriceFilterLabel } from 'Util/Category';
import { getBooleanLabel } from 'Util/Product';

import ResetAttributes from './ResetAttributes.component';

/** @namespace Component/ResetAttributes/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    currency_code: state.ConfigReducer.currencyData.current_currency_code
});

/** @namespace Component/ResetAttributes/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/ResetAttributes/Container */
export class ResetAttributesContainer extends PureComponent {
    static propTypes = {
        availableFilters: AttributesType.isRequired,
        customFiltersValues: SelectedFiltersType.isRequired,
        currency_code: PropTypes.string.isRequired,
        toggleCustomFilter: PropTypes.func.isRequired
    };

    containerProps() {
        const { toggleCustomFilter } = this.props;

        return {
            toggleCustomFilter,
            filtersData: this.filterResetItems()
        };
    }

    getFilterOptionsForPrice(values, options) {
        // no multiselect for price, always 1 selected value
        const [fromValue, toValue] = values[0].split('_');

        return options
            .filter(({ value_string }) => value_string.startsWith(fromValue))
            .map((option) => {
                const { currency_code } = this.props;
                const { label: initialLabel, value_string } = option;

                const [from, to] = initialLabel.split('~');
                const rangeEnd = toValue === '*' ? toValue : to;

                const label = getPriceFilterLabel(from, rangeEnd, currency_code);

                return { value_string, label };
            });
    }

    getFilterOptionsDefault(values, options) {
        return options.filter((option) => values.includes(option.value_string));
    }

    getResetData(attrCode, attrValues) {
        const { availableFilters } = this.props;
        const filterData = availableFilters[attrCode];

        if (!filterData) {
            return {};
        }

        const {
            is_boolean,
            attribute_label,
            attribute_options,
            attribute_code
        } = filterData;

        const func = attribute_code === 'price'
            ? this.getFilterOptionsForPrice.bind(this)
            : this.getFilterOptionsDefault.bind(this);

        return {
            [attribute_label]: func(attrValues, Object.values(attribute_options))
                .map(
                    (option) => ({
                        ...option,
                        attribute_code,
                        attribute_label,
                        label: getBooleanLabel(option.label, is_boolean)
                    })
                )
        };
    }

    filterResetItems() {
        const { customFiltersValues } = this.props;

        return Object.entries(customFiltersValues).reduce(
            (prev, [attrCode, attrValues]) => (
                {
                    ...prev,
                    ...this.getResetData(attrCode, attrValues)
                }
            ), {}
        );
    }

    render() {
        return (
            <ResetAttributes
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetAttributesContainer);
