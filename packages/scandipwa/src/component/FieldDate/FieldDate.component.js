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
        showTimeSelectOnly: PropTypes.bool.isRequired
    };

    render() {
        const {
            selectedDate,
            onSetDate,
            showTimeSelect,
            showTimeSelectOnly
        } = this.props;

        return (
            <DatePicker
              selected={ selectedDate }
              onChange={ onSetDate }
              showTimeSelect={ showTimeSelect }
              showTimeSelectOnly={ showTimeSelectOnly }
              // timeFormat="HH:mm"
              timeFormat="h:mm aa"
              timeIntervals={ 15 }
              dateFormat="dd/MM/yyyy h:mm aa"
            />
        );
    }
}

export default FieldDateComponent;
