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

import DatePicker from 'Component/DatePicker';
import DateSelect from 'Component/DateSelect';

import { FIELD_DATE_TYPE } from './FieldDate.config';

/** @namespace Component/FieldDate/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    useCalendar: !!+state.ConfigReducer.use_calendar
});

/** @namespace Component/FieldDate/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/FieldDate/Container */
export class FieldDateContainer extends PureComponent {
    static propTypes = {
        type: PropTypes.oneOf(Object.values(FIELD_DATE_TYPE)).isRequired,
        uid: PropTypes.string.isRequired,
        isRequired: PropTypes.bool,
        updateSelectedValues: PropTypes.bool.isRequired,
        useCalendar: PropTypes.bool.isRequired
    };

    static defaultProps = {
        isRequired: false
    };

    containerProps() {
        const {
            type,
            uid,
            isRequired,
            updateSelectedValues
        } = this.props;

        return {
            type,
            uid,
            isRequired,
            updateSelectedValues
        };
    }

    render() {
        const { useCalendar } = this.props;

        if (useCalendar) {
            return (
                <DatePicker
                  { ...this.containerProps() }
                />
            );
        }

        return (
            <DateSelect
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldDateContainer);
