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

import { PureComponent } from 'react';
import { connect } from 'react-redux';

import DateSelect from 'Component/DateSelect/DateSelect.component';
import { AMPM_FORMAT, DEFAULT_MONTH_DAYS, HourFormat } from 'Component/DateSelect/DateSelect.config';
import { FieldDateType } from 'Component/FieldDate/FieldDate.config';
import { ReactElement } from 'Type/Common.type';
import { adjustHours, getYearRangeAttributes, zeroBasedValue } from 'Util/Form/Extract';
import { RootState } from 'Util/Store/Store.type';

import {
    DateSelectComponentContainerPropKeys,
    DateSelectComponentProps,
    DateSelectContainerMapDispatchProps,
    DateSelectContainerMapStateProps,
    DateSelectContainerProps,
    DateSelectContainerState
} from './DateSelect.type';

/** @namespace Component/DateSelect/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): DateSelectContainerMapStateProps => ({
    yearRange: state.ConfigReducer.year_range,
    dateFieldsOrder: state.ConfigReducer.date_fields_order,
    timeFormat: state.ConfigReducer.time_format
});

/** @namespace Component/DateSelect/Container/mapDispatchToProps */
export const mapDispatchToProps = (): DateSelectContainerMapDispatchProps => ({});

/** @namespace Component/DateSelect/Container */
export class DateSelectContainer extends PureComponent<
DateSelectContainerProps,
DateSelectContainerState
> {
    static defaultProps: Partial<DateSelectContainerProps> = {
        isRequired: false
    };

    containerFunctions = {
        onSetYear: this.onSetYear.bind(this),
        onSetMonth: this.onSetMonth.bind(this),
        onSetDay: this.onSetDay.bind(this),
        onSetHours: this.onSetHours.bind(this),
        onSetMinutes: this.onSetMinutes.bind(this),
        onSetAMPM: this.onSetAMPM.bind(this)
    };

    __construct(props: DateSelectContainerProps): void {
        super.__construct?.(props);

        const { yearRange, timeFormat } = props;

        const { minDate, maxDate } = getYearRangeAttributes(yearRange, false);
        const currentDate = new Date();
        const validMinDate = minDate > currentDate ? minDate : currentDate;
        const selectedDate = maxDate < validMinDate ? maxDate : validMinDate;

        const selectedYear = selectedDate.getFullYear();
        const selectedMonth = selectedDate.getMonth() + 1;
        const selectedDay = selectedDate.getDate();
        const selectedHours = zeroBasedValue(adjustHours(selectedDate.getHours(), timeFormat));
        const selectedMinutes = zeroBasedValue(selectedDate.getMinutes());
        const selectedAMPM = selectedDate.getHours() >= HourFormat.H12 ? AMPM_FORMAT.PM : AMPM_FORMAT.AM;

        this.state = {
            selectedYear,
            selectedMonth,
            selectedDay,
            selectedHours,
            selectedMinutes,
            selectedAMPM,
            maxDay: DEFAULT_MONTH_DAYS
        };
    }

    containerProps(): Pick<DateSelectComponentProps, DateSelectComponentContainerPropKeys> {
        const {
            selectedYear,
            selectedMonth,
            selectedDay,
            selectedHours,
            selectedMinutes,
            selectedAMPM,
            maxDay
        } = this.state;

        const {
            type,
            yearRange,
            timeFormat,
            dateFieldsOrder,
            uid,
            isRequired
        } = this.props;

        const showTimeSelect = type === FieldDateType.DATETIME || type === FieldDateType.TIME;
        const showDateSelect = type === FieldDateType.DATETIME || type === FieldDateType.DATE;

        return {
            selectedYear,
            selectedMonth,
            selectedDay,
            selectedHours,
            selectedMinutes,
            selectedAMPM,
            maxDay,
            showTimeSelect,
            showDateSelect,
            ...getYearRangeAttributes(yearRange, true),
            dateFieldsOrder,
            timeFormat,
            uid,
            isRequired,
            type
        };
    }

    getMaxDay(): void {
        const { selectedYear, selectedMonth, selectedDay } = this.state;
        const { updateSelectedValues } = this.props;

        const maxDay = new Date(selectedYear, selectedMonth, 0).getDate();
        this.setState({ maxDay });

        if (selectedDay && selectedDay > maxDay) {
            this.setState({ selectedDay: undefined }, updateSelectedValues);
        }
    }

    updateValue(): void {
        const { updateSelectedValues } = this.props;

        updateSelectedValues();
        this.getMaxDay();
    }

    onSetYear(year: number): void {
        this.setState({ selectedYear: year }, this.updateValue.bind(this));
    }

    onSetMonth(month: number): void {
        this.setState({ selectedMonth: month }, this.updateValue.bind(this));
    }

    onSetDay(day: number): void {
        const { updateSelectedValues } = this.props;

        this.setState({ selectedDay: day }, updateSelectedValues);
    }

    onSetHours(hours: string): void {
        const { updateSelectedValues } = this.props;

        this.setState({ selectedHours: hours }, updateSelectedValues);
    }

    onSetMinutes(minutes: string): void {
        const { updateSelectedValues } = this.props;

        this.setState({ selectedMinutes: minutes }, updateSelectedValues);
    }

    onSetAMPM(ampm: string): void {
        const { updateSelectedValues } = this.props;

        this.setState({ selectedAMPM: ampm }, updateSelectedValues);
    }

    render(): ReactElement {
        return (
            <DateSelect
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateSelectContainer);
