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
import { AMPM_FORMAT, DEFAULT_MONTH_DAYS, MONTHS_COUNT, TIME_FORMAT } from 'Component/DateSelect/DateSelect.config';
import { isMagentoDateFormatValid } from 'Util/Form/Extract';

/** @namespace Component/DateSelect/Component */
export class DateSelectComponent extends PureComponent {
    static propTypes = {
        type: PropTypes.shape(PropTypes.oneOf(Object.values(FIELD_DATE_TYPE))).isRequired,
        onSetDate: PropTypes.func.isRequired,
        uid: PropTypes.string.isRequired,
        isRequired: PropTypes.bool.isRequired
    };

    dateMap = {
        d: this.renderDay.bind(this),
        m: this.renderMonth.bind(this),
        y: this.renderYear.bind(this)
    };

    getYearOptions() {
        const { minYear, maxYear } = this.props;

        const yearRange = range(Number(minYear), Number(maxYear));
        return yearRange.map((year) => ({ id: year, value: year, label: year }));
    }

    getMonthOptions(){
        const monthRange = range(1, Number(MONTHS_COUNT));
        return monthRange.map((month) => ({ id: month, value: month, label: month }));
    }

    getDayOptions(){
        const { maxDay } = this.props;
        const dayRange = range(1, Number(maxDay || DEFAULT_MONTH_DAYS));
        return dayRange.map((day) => ({ id: day, value: day, label: day }));
    }

    getHoursOptions(){
        const { timeFormat } = this.props;

        const maxHours = timeFormat.slice(0, -1);
        const hoursRange = range(0, Number(maxHours || 24));
        return hoursRange.map((hours) => ({ id: hours, value: hours, label: hours }));
    }

    getMinutesOptions(){
        const hoursRange = range(0, 60);
        return hoursRange.map((hours) => ({ id: hours, value: hours, label: hours }));
    }

    getAMPMOptions(){
        const ampmRange = Object.values(AMPM_FORMAT);
        return ampmRange.map((option) => ({ id: option, value: option, label: option }));
    }

    renderYear() {
        const {
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
                  id: `${type}-year-${ uid }`,
                  name: `${type}-year-${ uid }`,
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
                    id: `${type}-month-${ uid }`,
                    name: `${type}-month-${ uid }`,
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
                    id: `${type}-day-${ uid }`,
                    name: `${type}-day-${ uid }`,
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

    renderHours() {
        const {
            onSetHours,
            uid,
            isRequired,
            type,
            selectedHours
        } = this.props;

        return (
            <Field
                type={ FIELD_TYPE.select }
                label={__('Hours')}
                attr={ {
                    id: `${type}-hours-${ uid }`,
                    name: `${type}-hours-${ uid }`,
                    selectPlaceholder: __('Hours'),
                    value: selectedHours
                } }
                options={ this.getHoursOptions() }
                events={ {
                    onChange: onSetHours
                } }
                validationRule={ {
                    isRequired
                } }
                validateOn={ ['onChange'] }
            />
        );
    }

    renderMinutes() {
        const {
            onSetMinutes,
            uid,
            isRequired,
            type,
            selectedMinutes
        } = this.props;

        return (
            <Field
                type={ FIELD_TYPE.select }
                label={__('Minutes')}
                attr={ {
                    id: `${type}-minutes-${ uid }`,
                    name: `${type}-minutes-${ uid }`,
                    selectPlaceholder: __('Hours'),
                    value: selectedMinutes
                } }
                options={ this.getMinutesOptions() }
                events={ {
                    onChange: onSetMinutes
                } }
                validationRule={ {
                    isRequired
                } }
                validateOn={ ['onChange'] }
            />
        );
    }

    renderAMPM() {
        const {
            onSetAMPM,
            uid,
            isRequired,
            type,
            selectedAMPM,
            timeFormat
        } = this.props;

        if (timeFormat !== TIME_FORMAT.H12){
            return null;
        }

        return (
            <Field
                type={ FIELD_TYPE.select }
                label={__('AM/PM')}
                attr={ {
                    id: `${type}-ampm-${ uid }`,
                    name: `${type}-ampm-${ uid }`,
                    value: selectedAMPM,
                    noPlaceholder: true
                } }
                options={ this.getAMPMOptions() }
                events={ {
                    onChange: onSetAMPM
                } }
                validationRule={ {
                    isRequired
                } }
                validateOn={ ['onChange'] }
            />
        );
    }

    renderDate(){
        const { dateFieldsOrder, showDateSelect } = this.props;

        if (!showDateSelect){
            return null;
        }

        if(!isMagentoDateFormatValid(dateFieldsOrder)){
            return Object.values(this.dateMap).map(renderMethod => renderMethod());
        }

        return <div block="DateSelect" elem="InnerWrapper">
            {dateFieldsOrder.split(',').map(field => this.dateMap[field]())}
        </div>
    }

    renderTime(){
        const { showTimeSelect } = this.props;

        if (!showTimeSelect){
            return null;
        }

        return <div block="DateSelect" elem="InnerWrapper">
            {this.renderHours()}
            {this.renderMinutes()}
            {this.renderAMPM()}
        </div>;
    }

    render() {
        return (
            <div block="DateSelect" elem="Wrapper">
                {this.renderDate()}
                {this.renderTime()}
            </div>
        );
    }
}

export default DateSelectComponent;
