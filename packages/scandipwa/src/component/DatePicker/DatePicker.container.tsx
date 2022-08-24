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

import DatePicker from 'Component/DatePicker/DatePicker.component';
import { FieldDateType } from 'Component/FieldDate/FieldDate.config';
import { ReactElement } from 'Type/Common.type';
import {
    getDateTimeFormat,
    getTimeFormat,
    getYearRangeAttributes
} from 'Util/Form/Extract';
import { RootState } from 'Util/Store/Store.type';

import {
    DatePickerComponentContainerPropKeys,
    DatePickerComponentProps,
    DatePickerContainerFunctions,
    DatePickerContainerMapDispatchProps,
    DatePickerContainerMapStateProps,
    DatePickerContainerProps,
    DatePickerContainerState
} from './DatePicker.type';

/** @namespace Component/DatePicker/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): DatePickerContainerMapStateProps => ({
    yearRange: state.ConfigReducer.year_range,
    dateFieldsOrder: state.ConfigReducer.date_fields_order,
    timeFormat: state.ConfigReducer.time_format
});

/** @namespace Component/DatePicker/Container/mapDispatchToProps */
export const mapDispatchToProps = (): DatePickerContainerMapDispatchProps => ({});

/** @namespace Component/DatePicker/Container */
export class DatePickerContainer extends PureComponent<DatePickerContainerProps, DatePickerContainerState> {
    static defaultProps: Partial<DatePickerContainerProps> = {
        isRequired: false
    };

    containerFunctions: DatePickerContainerFunctions = {
        onSetDate: this.onSetDate.bind(this)
    };

    __construct(props: DatePickerContainerProps): void {
        super.__construct?.(props);

        const { yearRange } = props;
        const { minDate, maxDate } = getYearRangeAttributes(yearRange, false);
        const currentDate = new Date();
        const validMinDate = minDate > currentDate ? minDate : currentDate;
        const selectedDate = maxDate < validMinDate ? maxDate : validMinDate;

        this.state = { selectedDate };
    }

    containerProps(): Pick<DatePickerComponentProps, DatePickerComponentContainerPropKeys> {
        const { selectedDate } = this.state;
        const {
            type,
            yearRange,
            timeFormat: magentoTimeFormat,
            dateFieldsOrder,
            uid,
            isRequired
        } = this.props;

        const showTimeSelect = type === FieldDateType.DATETIME || type === FieldDateType.TIME;
        const showTimeSelectOnly = type === FieldDateType.TIME;
        const dateFormat = getDateTimeFormat(type, dateFieldsOrder, magentoTimeFormat);
        const timeFormat = getTimeFormat(magentoTimeFormat);

        return {
            selectedDate,
            showTimeSelect,
            showTimeSelectOnly,
            ...getYearRangeAttributes(yearRange, false),
            dateFormat,
            timeFormat,
            uid,
            isClearable: !isRequired,
            type
        };
    }

    onSetDate(date: Date): void {
        const { updateSelectedValues } = this.props;

        this.setState({ selectedDate: date }, updateSelectedValues);
    }

    render(): ReactElement {
        return (
            <DatePicker
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatePickerContainer);
