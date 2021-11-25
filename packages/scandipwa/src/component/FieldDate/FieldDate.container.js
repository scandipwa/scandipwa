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

import FieldDate from 'Component/FieldDate/FieldDate.component';
import { FIELD_DATE_TYPE, TIME_FORMAT } from 'Component/FieldDate/FieldDate.config';
import {
    getDateTimeFormat,
    getTimeFormat,
    getYearRangeAttributes
} from 'Util/Form/Extract';

/** @namespace Component/FieldDate/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    yearRange: state.ConfigReducer.year_range,
    dateFieldsOrder: state.ConfigReducer.date_fields_order,
    timeFormat: state.ConfigReducer.time_format
});

/** @namespace Component/FieldDate/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/FieldDate/Container */
export class FieldDateContainer extends PureComponent {
    static propTypes = {
        type: PropTypes.oneOf(Object.values(FIELD_DATE_TYPE)).isRequired,
        timeFormat: PropTypes.oneOf(Object.values(TIME_FORMAT)).isRequired,
        dateFieldsOrder: PropTypes.string.isRequired,
        yearRange: PropTypes.string.isRequired
    };

    state = {
        selectedDate: new Date()
    };

    containerFunctions = {
        onSetDate: this.onSetDate.bind(this)
    };

    containerProps = () => {
        const { selectedDate } = this.state;
        const {
            type,
            yearRange,
            timeFormat: magentoTimeFormat,
            dateFieldsOrder
        } = this.props;

        const showTimeSelect = type === FIELD_DATE_TYPE.dateTime || type === FIELD_DATE_TYPE.time;
        const showTimeSelectOnly = type === FIELD_DATE_TYPE.time;
        const dateFormat = getDateTimeFormat(type, dateFieldsOrder, magentoTimeFormat);
        const timeFormat = getTimeFormat(magentoTimeFormat);

        return {
            selectedDate,
            showTimeSelect,
            showTimeSelectOnly,
            ...getYearRangeAttributes(yearRange),
            dateFormat,
            timeFormat
        };
    };

    onSetDate(date) {
        this.setState({ selectedDate: date });
    }

    render() {
        return (
            <FieldDate
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldDateContainer);
