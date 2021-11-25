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
import DatePicker from 'react-datepicker';

import './FieldDate.style.scss';

/** @namespace Component/FieldDate/Component */
export class FieldDateComponent extends PureComponent {
    static propTypes = {
        selectedDate: PropTypes.instanceOf(Date).isRequired,
        // type: PropTypes.shape(PropTypes.oneOf(Object.values(FIELD_DATE_TYPE))).isRequired,
        onSetDate: PropTypes.func.isRequired,
        showTimeSelect: PropTypes.bool.isRequired,
        showTimeSelectOnly: PropTypes.bool.isRequired,
        minDate: PropTypes.instanceOf(Date).isRequired,
        maxDate: PropTypes.instanceOf(Date).isRequired,
        dateFormat: PropTypes.string.isRequired,
        timeFormat: PropTypes.string.isRequired
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
            timeFormat
        } = this.props;

        return (
            <DatePicker
              selected={ selectedDate }
              onChange={ onSetDate }
              showTimeSelect={ showTimeSelect }
              showTimeSelectOnly={ showTimeSelectOnly }
              timeFormat={ timeFormat }
              // timeFormat="HH:mm"
              // timeFormat="h:mm aa"
              timeIntervals={ 15 }
              dateFormat={ dateFormat }
              // dateFormat="dd/MM/yyyy h:mm aa"
              minDate={ minDate }
              maxDate={ maxDate }
            />
        );
    }
}

export default FieldDateComponent;
