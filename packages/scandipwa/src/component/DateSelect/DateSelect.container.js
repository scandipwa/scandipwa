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

import DateSelect from 'Component/DateSelect/DateSelect.component';
import { AMPM_FORMAT, DEFAULT_MONTH_DAYS, HOURS_12H_COUNT } from 'Component/DateSelect/DateSelect.config';
import { FIELD_DATE_TYPE, TIME_FORMAT } from 'Component/FieldDate/FieldDate.config';
import { adjustHours, getYearRangeAttributes, zeroBasedValue } from 'Util/Form/Extract';

/** @namespace Component/DateSelect/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    yearRange: state.ConfigReducer.year_range,
    dateFieldsOrder: state.ConfigReducer.date_fields_order,
    timeFormat: state.ConfigReducer.time_format
});

/** @namespace Component/DateSelect/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/DateSelect/Container */
export class DateSelectContainer extends PureComponent {
    static propTypes = {
        type: PropTypes.oneOf(Object.values(FIELD_DATE_TYPE)).isRequired,
        timeFormat: PropTypes.oneOf(Object.values(TIME_FORMAT)).isRequired,
        dateFieldsOrder: PropTypes.string.isRequired,
        yearRange: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
        isRequired: PropTypes.bool,
        updateSelectedValues: PropTypes.bool.isRequired
    };

    static defaultProps = {
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

    __construct(props) {
        super.__construct(props);
        const { yearRange, timeFormat } = props;

        const { minDate, maxDate } = getYearRangeAttributes(yearRange);
        const currentDate = new Date();
        const validMinDate = minDate > currentDate ? minDate : currentDate;
        const selectedDate = maxDate < validMinDate ? maxDate : validMinDate;

        const selectedYear = selectedDate.getFullYear();
        const selectedMonth = selectedDate.getMonth() + 1;
        const selectedDay = selectedDate.getDate();
        const selectedHours = zeroBasedValue(adjustHours(selectedDate.getHours(), timeFormat));
        const selectedMinutes = zeroBasedValue(selectedDate.getMinutes());
        const selectedAMPM = selectedDate.getHours() >= HOURS_12H_COUNT ? AMPM_FORMAT.PM : AMPM_FORMAT.AM;

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

    containerProps() {
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

        const showTimeSelect = type === FIELD_DATE_TYPE.dateTime || type === FIELD_DATE_TYPE.time;
        const showDateSelect = type === FIELD_DATE_TYPE.dateTime || type === FIELD_DATE_TYPE.date;

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

    getMaxDay() {
        const { selectedYear, selectedMonth, selectedDay } = this.state;
        const { updateSelectedValues } = this.props;

        const maxDay = new Date(selectedYear, selectedMonth, 0).getDate();
        this.setState({ maxDay });

        if (selectedDay && selectedDay > maxDay) {
            this.setState({ selectedDay: '' }, updateSelectedValues);
        }
    }

    updateValue() {
        const { updateSelectedValues } = this.props;

        updateSelectedValues();
        this.getMaxDay();
    }

    onSetYear(year) {
        this.setState({ selectedYear: year }, this.updateValue.bind(this));
    }

    onSetMonth(month) {
        this.setState({ selectedMonth: month }, this.updateValue.bind(this));
    }

    onSetDay(day) {
        const { updateSelectedValues } = this.props;

        this.setState({ selectedDay: day }, updateSelectedValues);
    }

    onSetHours(hours) {
        const { updateSelectedValues } = this.props;

        this.setState({ selectedHours: hours }, updateSelectedValues);
    }

    onSetMinutes(minutes) {
        const { updateSelectedValues } = this.props;

        this.setState({ selectedMinutes: minutes }, updateSelectedValues);
    }

    onSetAMPM(ampm) {
        const { updateSelectedValues } = this.props;

        this.setState({ selectedAMPM: ampm }, updateSelectedValues);
    }

    render() {
        return (
            <DateSelect
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateSelectContainer);
