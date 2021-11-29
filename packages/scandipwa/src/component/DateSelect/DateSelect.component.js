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
import { forwardRef, PureComponent } from 'react';
import DatePicker from 'react-datepicker';

import FIELD_TYPE from 'Component/Field/Field.config';

import './DateSelect.style.scss';

/** @namespace Component/DateSelect/Component */
export class DateSelectComponent extends PureComponent {
    static propTypes = {
        selectedDate: PropTypes.instanceOf(Date).isRequired,
        // type: PropTypes.shape(PropTypes.oneOf(Object.values(FIELD_DATE_TYPE))).isRequired,
        onSetDate: PropTypes.func.isRequired,
        showTimeSelect: PropTypes.bool.isRequired,
        showTimeSelectOnly: PropTypes.bool.isRequired,
        minDate: PropTypes.instanceOf(Date).isRequired,
        maxDate: PropTypes.instanceOf(Date).isRequired,
        dateFormat: PropTypes.string.isRequired,
        timeFormat: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
        isClearable: PropTypes.bool.isRequired,
        value: PropTypes.string,
        onClick: PropTypes.func
    };

    static defaultProps = {
        value: '',
        onClick: () => {}
    };

    render() {
        const {
            selectedDate,
            onSetDate,
            showTimeSelect,
            showTimeSelectOnly,
            minDate,
            maxDate,
            dateFormat,
            timeFormat,
            uid,
            isClearable
        } = this.props;

        const CustomInput = forwardRef(({ value, onClick }, ref) => (
            <input
              id={ uid }
              name={ uid }
              type={ FIELD_TYPE.text }
              value={ value }
              onClick={ onClick }
              ref={ ref }
              data-date={ selectedDate }
            />
        ));

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
              customInput={ <CustomInput /> }
            />
        );
    }
}

export default DateSelectComponent;
