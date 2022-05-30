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

import { PureComponent } from 'react';
import { connect } from 'react-redux';

import DatePicker from 'Component/DatePicker';
import DateSelect from 'Component/DateSelect';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import {
    FieldDateComponentProps,
    FieldDateContainerMapDispatchProps,
    FieldDateContainerMapStateProps,
    FieldDateContainerProps
} from './FieldDate.type';

/** @namespace Component/FieldDate/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): FieldDateContainerMapStateProps => ({
    useCalendar: !!+state.ConfigReducer.use_calendar
});

/** @namespace Component/FieldDate/Container/mapDispatchToProps */
export const mapDispatchToProps = (): FieldDateContainerMapDispatchProps => ({});

/** @namespace Component/FieldDate/Container */
export class FieldDateContainer extends PureComponent<FieldDateContainerProps> {
    static defaultProps: Partial<FieldDateContainerProps> = {
        isRequired: false
    };

    containerProps(): FieldDateComponentProps {
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

    render(): ReactElement {
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
