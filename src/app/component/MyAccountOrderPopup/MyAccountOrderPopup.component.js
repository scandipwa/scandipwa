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

import Popup from 'Component/Popup';
import Loader from 'Component/Loader';
import { orderType } from 'Type/Account';
import KeyValueTable from 'Component/KeyValueTable';

export const ORDER_POPUP_ID = 'MyAccountOrderPopup';
export const VIEW_ORDER = 'VIEW_ORDER';

class MyAccountOrderPopup extends KeyValueTable {
    constructor(props) {
        super(props);

        this.headingFields = ['Name', 'Price', 'Qty', 'Subtotal'];
        this.fieldsToDisplay = ['name', 'original_price', 'qty', 'row_total'];
    }

    static propTypes = {
        title: PropTypes.string,
        order: orderType.isRequired
    };

    static defaultProps = {
        title: 'Order products'
    };

    get dataPairArray() {
        const { order = {} } = this.props;
        const { order_products = [] } = order;

        const fields = order_products.reduce((acc, item, i) => (
            [
                ...acc,
                {
                    keys: this.fieldsToDisplay,
                    label: `product_${i + 1}`,
                    source: item
                }
            ]
        ), []);

        return fields;
    }

    renderTableRow = (data) => {
        const {
            keys, label, source
        } = data;

        const allValues = keys.map((key, i) => {
            const value = this.getValueFromSource({ key, source });
            return i === 0
                ? <th>{ value }</th>
                : <td key={ value }>{ value }</td>;
        });

        if (!allValues) return null;

        return (
            <tr key={ label }>
                { allValues }
            </tr>
        );
    };

    renderHeading() {
        const { title } = this.props;
        if (!title) return null;

        return (
            <tr>
                { Array.from(this.headingFields, item => (
                    <th
                      block="KeyValueTable"
                      elem="Heading"
                      key={ item }
                    >
                        { item }
                    </th>
                )) }
            </tr>
        );
    }

    render() {
        const { order } = this.props;
        return (
            <Popup
              id={ ORDER_POPUP_ID }
              clickOutside={ false }
              mix={ { block: 'MyAccountOrderPopup' } }
            >
                <Loader isLoading={ !Object.keys(order).length } />
                { this.renderTable() }
            </Popup>
        );
    }
}

export default MyAccountOrderPopup;
