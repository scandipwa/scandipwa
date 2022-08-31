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

import {
    AMPM_FORMAT,
    DateFieldAttr,
    DEFAULT_MONTH_DAYS,
    HourFormat,
    MINUTES_COUNT,
    MONTHS_COUNT
} from 'Component/DateSelect/DateSelect.config';
import Field from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';
import { TimeFormat } from 'Component/FieldDate/FieldDate.config';
import { ReactElement } from 'Type/Common.type';
import { isMagentoDateFormatValid, zeroBasedValue } from 'Util/Form/Extract';
import { range } from 'Util/Manipulations';

import { DateSelectComponentDateMap, DateSelectComponentProps, OptionShape } from './DateSelect.type';

import './DateSelect.style.scss';

/** @namespace Component/DateSelect/Component */
export class DateSelectComponent extends PureComponent<DateSelectComponentProps> {
    dateMap: DateSelectComponentDateMap = {
        d: this.renderDay.bind(this),
        m: this.renderMonth.bind(this),
        y: this.renderYear.bind(this)
    };

    getYearOptions(): OptionShape[] {
        const { minYear, maxYear } = this.props;

        const yearRange = range(+minYear, +maxYear);

        return yearRange.map((year) => ({ id: year.toString(), value: year.toString(), label: year.toString() }));
    }

    getMonthOptions(): OptionShape[] {
        const monthRange = range(1, +MONTHS_COUNT);

        return monthRange.map((month) => ({ id: month.toString(), value: month.toString(), label: month.toString() }));
    }

    getDayOptions(): OptionShape[] {
        const { maxDay } = this.props;

        const dayRange = range(1, +maxDay || DEFAULT_MONTH_DAYS);

        return dayRange.map((day) => ({ id: day.toString(), value: day.toString(), label: day.toString() }));
    }

    getHoursOptions(): OptionShape[] {
        const { timeFormat } = this.props;

        const maxHours = timeFormat === TimeFormat.H12 ? HourFormat.H12 : HourFormat.H24 - 1;
        const hoursRange = range(timeFormat === TimeFormat.H12 ? 1 : 0, maxHours);

        return hoursRange.map((hours) => ({
            id: String(hours),
            value: zeroBasedValue(hours),
            label: zeroBasedValue(hours)
        }));
    }

    getMinutesOptions(): OptionShape[] {
        const minutesRange = range(0, MINUTES_COUNT - 1);

        return minutesRange.map((minutes) => ({
            id: String(minutes),
            value: zeroBasedValue(minutes),
            label: zeroBasedValue(minutes)
        }));
    }

    getAMPMOptions(): OptionShape[] {
        const ampmRange = Object.values(AMPM_FORMAT);

        return ampmRange.map((option) => ({
            id: option.toString(),
            value: option.toString(),
            label: option.toString()
        }));
    }

    renderYear(): ReactElement {
        const {
            uid,
            isRequired,
            type,
            selectedYear,
            onSetYear
        } = this.props;

        return (
            <Field
              type={ FieldType.SELECT }
              label={ __('Year') }
              attr={ {
                  id: `${type}-year-${ uid }`,
                  name: uid,
                  selectPlaceholder: __('Year'),
                  value: selectedYear,
                  [DateFieldAttr.TYPE]: type,
                  [DateFieldAttr.NAME]: 'year'
              } }
              key={ `${type}-year-${ uid }` }
              options={ this.getYearOptions() }
              mix={ { block: 'DateSelect', elem: 'Year' } }
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

    renderMonth(): ReactElement {
        const {
            uid,
            isRequired,
            type,
            selectedMonth,
            onSetMonth
        } = this.props;

        return (
            <Field
              type={ FieldType.SELECT }
              label={ __('Month') }
              attr={ {
                  id: `${type}-month-${ uid }`,
                  name: uid,
                  selectPlaceholder: __('Month'),
                  value: selectedMonth,
                  [DateFieldAttr.TYPE]: type,
                  [DateFieldAttr.NAME]: 'month'
              } }
              key={ `${type}-month-${ uid }` }
              options={ this.getMonthOptions() }
              mix={ { block: 'DateSelect', elem: 'Month' } }
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

    renderDay(): ReactElement {
        const {
            onSetDay,
            uid,
            isRequired,
            type,
            selectedDay
        } = this.props;

        return (
            <Field
              type={ FieldType.SELECT }
              label={ __('Day') }
              attr={ {
                  id: `${type}-day-${ uid }`,
                  name: uid,
                  selectPlaceholder: __('Day'),
                  value: selectedDay,
                  [DateFieldAttr.TYPE]: type,
                  [DateFieldAttr.NAME]: 'day'
              } }
              key={ `${type}-day-${ uid }` }
              options={ this.getDayOptions() }
              mix={ { block: 'DateSelect', elem: 'Day' } }
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

    renderHours(): ReactElement {
        const {
            onSetHours,
            uid,
            isRequired,
            type,
            selectedHours
        } = this.props;

        return (
            <Field
              type={ FieldType.SELECT }
              label={ __('Hours') }
              attr={ {
                  id: `${type}-hours-${ uid }`,
                  name: uid,
                  selectPlaceholder: __('Hours'),
                  value: selectedHours,
                  [DateFieldAttr.TYPE]: type,
                  [DateFieldAttr.NAME]: 'hours'
              } }
              key={ `${type}-hours-${ uid }` }
              options={ this.getHoursOptions() }
              mix={ { block: 'DateSelect', elem: 'Hours' } }
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

    renderMinutes(): ReactElement {
        const {
            onSetMinutes,
            uid,
            isRequired,
            type,
            selectedMinutes
        } = this.props;

        return (
            <Field
              type={ FieldType.SELECT }
              label={ __('Minutes') }
              attr={ {
                  id: `${type}-minutes-${ uid }`,
                  name: uid,
                  selectPlaceholder: __('Minutes'),
                  value: selectedMinutes,
                  [DateFieldAttr.TYPE]: type,
                  [DateFieldAttr.NAME]: 'minutes'
              } }
              key={ `${type}-minutes-${ uid }` }
              options={ this.getMinutesOptions() }
              mix={ { block: 'DateSelect', elem: 'Minutes' } }
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

    renderAMPM(): ReactElement {
        const {
            onSetAMPM,
            uid,
            isRequired,
            type,
            selectedAMPM,
            timeFormat
        } = this.props;

        if (timeFormat !== TimeFormat.H12) {
            return null;
        }

        return (
            <Field
              type={ FieldType.SELECT }
              label={ __('AM / PM') }
              attr={ {
                  id: `${type}-ampm-${ uid }`,
                  name: uid,
                  value: selectedAMPM,
                  noPlaceholder: true,
                  [DateFieldAttr.TYPE]: type,
                  [DateFieldAttr.NAME]: 'ampm'
              } }
              options={ this.getAMPMOptions() }
              mix={ { block: 'DateSelect', elem: 'AMPM' } }
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

    renderDate(): ReactElement {
        const { dateFieldsOrder, showDateSelect } = this.props;

        if (!showDateSelect) {
            return null;
        }

        if (!isMagentoDateFormatValid(dateFieldsOrder)) {
            return Object.values(this.dateMap).map((renderMethod) => renderMethod());
        }

        return (
            <div block="DateSelect" elem="InnerWrapper">
                { dateFieldsOrder
                    .split(',')
                    .map((field) => this.dateMap[field as keyof DateSelectComponentDateMap]()) }
            </div>
        );
    }

    renderTime(): ReactElement {
        const { showTimeSelect } = this.props;

        if (!showTimeSelect) {
            return null;
        }

        return (
            <div block="DateSelect" elem="InnerWrapper">
                { this.renderHours() }
                { this.renderMinutes() }
                { this.renderAMPM() }
            </div>
        );
    }

    render(): ReactElement {
        return (
            <div block="DateSelect" elem="Wrapper">
                { this.renderDate() }
                { this.renderTime() }
            </div>
        );
    }
}

export default DateSelectComponent;
