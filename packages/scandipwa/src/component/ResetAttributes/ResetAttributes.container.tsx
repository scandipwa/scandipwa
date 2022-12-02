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

import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { AggregationOption } from 'Query/ProductList.type';
import { ReactElement } from 'Type/Common.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import { getPriceFilterLabel } from 'Util/Category';
import { getBooleanLabel } from 'Util/Product';
import { RootState } from 'Util/Store/Store.type';

import ResetAttributes from './ResetAttributes.component';
import {
    FilterOption,
    ResetAttributesComponentProps,
    ResetAttributesContainerMapDispatchProps,
    ResetAttributesContainerMapStateProps,
    ResetAttributesContainerProps,
    ResetItem,
} from './ResetAttributes.type';

/** @namespace Component/ResetAttributes/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ResetAttributesContainerMapStateProps => ({
    currency_code: state.ConfigReducer.currencyData.current_currency_code,
    customFiltersValues: state.CategoryReducer.selectedFilters,
    availableFilters: state.ProductListReducer.filters,
});

/** @namespace Component/ResetAttributes/Container/mapDispatchToProps */
export const mapDispatchToProps = (): ResetAttributesContainerMapDispatchProps => ({});

/** @namespace Component/ResetAttributes/Container */
export class ResetAttributesContainer extends PureComponent<ResetAttributesContainerProps> {
    containerProps(): ResetAttributesComponentProps {
        const { toggleCustomFilter } = this.props;

        return {
            toggleCustomFilter,
            filtersData: this.filterResetItems(),
        };
    }

    getFilterOptionsForPrice(values: string[]): FilterOption[] {
        const { currency_code } = this.props;
        const [value_string] = values;
        // no multiselect for price, always 1 selected value
        const [fromValue, toValue] = value_string.split('_');
        const label = getPriceFilterLabel(fromValue, toValue, currency_code as GQLCurrencyEnum);

        return [{ value_string, label }];
    }

    getFilterOptionsDefault(values: string[], options: AggregationOption[]): FilterOption[] {
        return options.filter((option) => values.includes(option.value_string));
    }

    getResetData(attrCode: string, attrValues: string[]): Record<string, ResetItem[]> {
        const { availableFilters } = this.props;
        const filterData = availableFilters[ attrCode ];

        if (!filterData) {
            return {};
        }

        const {
            is_boolean,
            attribute_label,
            attribute_options,
            attribute_code,
        } = filterData;

        const func = attribute_code === 'price'
            ? this.getFilterOptionsForPrice.bind(this)
            : this.getFilterOptionsDefault.bind(this);

        return {
            [ attribute_label ]: func(attrValues, Object.values(attribute_options))
                .map(
                    (option: FilterOption) => ({
                        ...option,
                        attribute_code,
                        attribute_label,
                        label: getBooleanLabel(option.label, is_boolean),
                    }),
                ),
        };
    }

    filterResetItems(): Record<string, ResetItem[]> {
        const { customFiltersValues } = this.props;

        return Object.entries(customFiltersValues).reduce((prev: Record<string, ResetItem[]>, [attrCode, attrValues]) => (
            {
                ...prev,
                ...this.getResetData(attrCode, attrValues),
            }
        ), {});
    }

    render(): ReactElement {
        return (
            <ResetAttributes
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetAttributesContainer);
