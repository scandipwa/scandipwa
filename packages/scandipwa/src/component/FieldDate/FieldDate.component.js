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

import { PureComponent } from 'react';
import DatePicker from "react-datepicker";

/** @namespace Component/FieldDate/Component */
export class FieldDateComponent extends PureComponent {
    render() {
        const { selectedDate, onSetDate } = this.props;

        return (
            <DatePicker selected={ selectedDate } onChange={ (date) => onSetDate(date) } />
        );
    }
}

export default FieldDateComponent;
