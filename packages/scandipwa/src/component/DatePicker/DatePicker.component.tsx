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

import {
    ForwardedRef,
    forwardRef,
    MouseEvent,
    PureComponent,
} from 'react';
import DatePicker from 'react-datepicker';

import { FieldType } from 'Component/Field/Field.config';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';

import { DatePickerComponentPlaceholderMap, DatePickerComponentProps } from './DatePicker.type';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.style.scss';

/** @namespace Component/DatePicker/Component */
export class DatePickerComponent<
P extends Readonly<DatePickerComponentProps> = Readonly<DatePickerComponentProps>,
S extends DatePickerComponentState = DatePickerComponentState,
> extends PureComponent<P, S> {
    placeholderMap: DatePickerComponentPlaceholderMap = {
        [FieldType.DATE]: __('Select date'),
        [FieldType.DATETIME]: __('Select date & time'),
        [FieldType.TIME]: __('Select time'),
    };

    getPlaceholder(): string {
        const { type } = this.props;

        return this.placeholderMap[type as unknown as keyof DatePickerComponentPlaceholderMap] || '';
    }

    renderCustomInput({ value, onClick }: {
        value: string;
        onClick: (e: MouseEvent) => void;
    }, ref: ForwardedRef<HTMLInputElement>): JSX.Element {
        const { selectedDate, uid } = this.props;

        return (
            <input
              id={ uid }
              name={ uid }
              type={ FieldType.TEXT }
              value={ value }
              onClick={ onClick }
              ref={ ref }
              data-date={ selectedDate }
              placeholder={ this.getPlaceholder() }
              inputMode="none"
              readOnly
            />
        );
    }

    render(): ReactElement {
        const {
            selectedDate,
            onSetDate,
            showTimeSelect,
            showTimeSelectOnly,
            minDate,
            maxDate,
            dateFormat,
            timeFormat,
            isClearable,
        } = this.props;

        const DateInput = forwardRef(this.renderCustomInput.bind(this));

        return (
            <DatePicker
              selected={ selectedDate }
              onChange={ onSetDate }
              showTimeSelect={ showTimeSelect }
              showTimeSelectOnly={ showTimeSelectOnly }
              timeFormat={ timeFormat }
              timeIntervals={ 15 }
              dateFormat={ dateFormat }
              minDate={ minDate }
              maxDate={ maxDate }
              isClearable={ isClearable }
              customInput={ <DateInput value="" onClick={ noopFn } /> }
            />
        );
    }
}

export default DatePickerComponent;
