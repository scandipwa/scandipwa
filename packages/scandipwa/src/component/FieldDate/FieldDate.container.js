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
import { FIELD_DATE_TYPE } from 'Component/FieldDate/FieldDate.config';

/** @namespace Component/FieldDate/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace Component/FieldDate/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/FieldDate/Container */
export class FieldDateContainer extends PureComponent {
    static propTypes = {
        type: PropTypes.oneOf(Object.values(FIELD_DATE_TYPE)).isRequired
    };

    state = {
        selectedDate: new Date()
    };

    containerFunctions = {
        onSetDate: this.onSetDate.bind(this)
    };

    containerProps = () => {
        const { selectedDate } = this.state;
        const { type } = this.props;

        const showTimeSelect = type === FIELD_DATE_TYPE.dateTime || type === FIELD_DATE_TYPE.time;
        const showTimeSelectOnly = type === FIELD_DATE_TYPE.time;

        return {
            selectedDate,
            showTimeSelect,
            showTimeSelectOnly
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
