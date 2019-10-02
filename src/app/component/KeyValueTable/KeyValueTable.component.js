import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './KeyValueTable.style';

class KeyValueTable extends PureComponent {
    static propTypes = {
        title: PropTypes.string
    };

    static defaultProps = {
        title: ''
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

    renderTableRow = (data) => {
        const { key, label } = data;
        const value = this.getValueFromSource(data);

        if (!value) return null;

        return (
            <tr key={ key }>
                <th>{ label }</th>
                <td>{ value }</td>
            </tr>
        );
    };

    renderHeading() {
        const { title } = this.props;
        if (!title) return null;

        return (
            <tr>
                <th
                  block="KeyValueTable"
                  elem="Heading"
                  colSpan={ 2 }
                >
                    { title }
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
                        { this.dataPairArray.map(this.renderTableRow) }
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
