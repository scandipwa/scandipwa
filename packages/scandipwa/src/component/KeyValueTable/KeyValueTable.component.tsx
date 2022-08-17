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

import RadioButton from 'Component/RadioButtonIcon';
import { ReactElement } from 'Type/Common.type';

import { DataPair, KeyValueTableComponentProps } from './KeyValueTable.type';

import './KeyValueTable.style';

/** @namespace Component/KeyValueTable/Component */
export class KeyValueTable<
T extends KeyValueTableComponentProps = KeyValueTableComponentProps
> extends PureComponent<T> {
    static defaultProps: Partial<KeyValueTableComponentProps> = {
        title: '',
        isSelected: false
    };

    dataPairArray(): DataPair[] {
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

    getValueFromSource({ key, source }: DataPair): string | number {
        const { [key]: value } = source;

        if (!value) {
            return '';
        }

        return Array.isArray(value) ? value.join(', ') : value;
    }

    renderTableRow(data: DataPair): ReactElement {
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

    renderHeading(): ReactElement {
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

    renderTable(): ReactElement {
        return (
            <div block="KeyValueTable" elem="Wrapper">
                <table block="KeyValueTable">
                    <thead>
                        { this.renderHeading() }
                    </thead>
                    <tbody>
                        { this.dataPairArray().map(this.renderTableRow.bind(this)) }
                    </tbody>
                </table>
            </div>
        );
    }

    render(): ReactElement {
        return this.renderTable();
    }
}

export default KeyValueTable;
