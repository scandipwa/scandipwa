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

import RadioButton from 'Component/RadioButtonIcon';

import './KeyValueTable.style';

/** @namespace Component/KeyValueTable/Component */
export class KeyValueTable extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        isSelected: PropTypes.bool
    };

    static defaultProps = {
        title: '',
        isSelected: false
    };

    get dataPairArray() {
        return [
            /**
             * {
             *     key: 'id',
             *     label': 'Identifier',
             *     source: customer
             * }
             */
        ];
    }

    getValueFromSource({ key, source }) {
        const { [key]: value } = source;

        return Array.isArray(value) ? value.join(', ') : value;
    }

    renderTableRow(data) {
        const { key, label } = data;
        const value = this.getValueFromSource(data);

        if (!value) {
            return null;
        }

        return (
            <tr key={ key }>
                <th>{ label }</th>
                <td>{ value }</td>
            </tr>
        );
    }

    renderHeading() {
        const { title, isSelected } = this.props;

        if (!title) {
            return null;
        }

        return (
            <tr>
                <th
                  block="KeyValueTable"
                  elem="Heading"
                  colSpan={ 2 }
                >
                    { title }
                    <RadioButton isActive={ isSelected } />
                </th>
            </tr>
        );
    }

    renderTable() {
        return (
            <div block="KeyValueTable" elem="Wrapper">
                <table block="KeyValueTable">
                    <thead>
                        { this.renderHeading() }
                    </thead>
                    <tbody>
                        { this.dataPairArray.map(this.renderTableRow.bind(this)) }
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        return this.renderTable();
    }
}

export default KeyValueTable;
