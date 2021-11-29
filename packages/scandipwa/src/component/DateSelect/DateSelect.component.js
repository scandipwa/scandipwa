/* eslint-disable */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import '../../../../../node_modules/react-datepicker/dist/react-datepicker.css';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { FIELD_DATE_TYPE } from 'Component/DatePicker/DatePicker.config';
import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import {range} from 'Util/Manipulations';

import './DateSelect.style.scss';
import { DEFAULT_MONTH_DAYS, MONTHS_COUNT } from 'Component/DateSelect/DateSelect.config';

/** @namespace Component/DateSelect/Component */
export class DateSelectComponent extends PureComponent {
    static propTypes = {
        type: PropTypes.shape(PropTypes.oneOf(Object.values(FIELD_DATE_TYPE))).isRequired,
        onSetDate: PropTypes.func.isRequired,
        uid: PropTypes.string.isRequired,
        isRequired: PropTypes.bool.isRequired
    };

    getYearOptions() {
        const { minYear, maxYear } = this.props;

        const yearRange = range(Number(minYear), Number(maxYear));
        return yearRange.map((year) => ({ id: year, value: year, label: year }));
    }

    getMonthOptions(){
        const monthRange = range(Number(1), Number(MONTHS_COUNT));
        return monthRange.map((month) => ({ id: month, value: month, label: month }));
    }

    getDayOptions(){
        const { maxDay } = this.props;
        const dayRange = range(Number(1), Number(maxDay || DEFAULT_MONTH_DAYS));
        return dayRange.map((day) => ({ id: day, value: day, label: day }));
    }

    renderYear() {
        const {
            onSetDate,
            // minDate,
            // maxDate,
            // dateFormat,
            // timeFormat,
            uid,
            isRequired,
            type,
            selectedYear,
            onSetYear
        } = this.props;

        return (
            <Field
              type={ FIELD_TYPE.select }
              label={__('Year')}
              attr={ {
                  id: `${type}-${ uid }`,
                  name: `${type}-${ uid }`,
                  selectPlaceholder: __('Year'),
                  value: selectedYear
              } }
              options={ this.getYearOptions() }
              events={ {
                  onChange: onSetYear
              } }
              validationRule={ {
                  isRequired
              } }
              validateOn={ ['onChange'] }
            />
        );
    }

    renderMonth() {
        const {
            onSetDate,
            // minDate,
            // maxDate,
            // dateFormat,
            // timeFormat,
            uid,
            isRequired,
            type,
            selectedMonth,
            onSetMonth
        } = this.props;

        return (
            <Field
                type={ FIELD_TYPE.select }
                label={__('Month')}
                attr={ {
                    id: `${type}-${ uid }`,
                    name: `${type}-${ uid }`,
                    selectPlaceholder: __('Month'),
                    value: selectedMonth
                } }
                options={ this.getMonthOptions() }
                events={ {
                    onChange: onSetMonth
                } }
                validationRule={ {
                    isRequired
                } }
                validateOn={ ['onChange'] }
            />
        );
    }

    renderDay() {
        const {
            onSetDay,
            uid,
            isRequired,
            type,
            selectedDay
        } = this.props;

        return (
            <Field
                type={ FIELD_TYPE.select }
                label={__('Day')}
                attr={ {
                    id: `${type}-${ uid }`,
                    name: `${type}-${ uid }`,
                    selectPlaceholder: __('Day'),
                    value: selectedDay
                } }
                options={ this.getDayOptions() }
                events={ {
                    onChange: onSetDay
                } }
                validationRule={ {
                    isRequired
                } }
                validateOn={ ['onChange'] }
            />
        );
    }

    render() {
        const {
            onSetDate,
            // minDate,
            // maxDate,
            // dateFormat,
            // timeFormat,
            uid,
            isRequired,
            type
        } = this.props;

        return (
            <div block="DateSelect" elem="Wrapper">
                {this.renderYear()}
                {this.renderMonth()}
                {this.renderDay()}
            </div>
        );
    }
}

export default DateSelectComponent;
