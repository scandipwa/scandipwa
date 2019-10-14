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
import isMobile from 'Util/Mobile';
import { Fragment } from 'react';
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
        title: 'Order details'
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

    renderMobileRows = (data) => {
        const {
            keys, label, source
        } = data;
        const MOBILE_COLUMN_COUNT = 2;

        const allValues = keys.map((key, i) => {
            const value = this.getValueFromSource({ key, source });
            return (
                <tr
                  key={ `${label}_${key}` }
                  block="KeyValueTable"
                  elem={ `Item${i === 0 ? '-Name' : ''}` }
                >
                    { i === 0
                        ? <th colSpan={ MOBILE_COLUMN_COUNT } key={ key }>{ value }</th>
                        : (
                            <>
                                <td key={ `${key}_key` }>{ this.headingFields[i] }</td>
                                <td key={ `${key}_value` }>{ value }</td>
                            </>
                        ) }
                </tr>
            );
        });

        if (!allValues) return null;

        return (
            <Fragment key={ label }>
                { allValues }
            </Fragment>
        );
    };

    renderTableRow = (data) => {
        const {
            keys, label, source
        } = data;

        if (isMobile.any()) return this.renderMobileRows(data);

        const allValues = keys.map((key, i) => {
            const value = this.getValueFromSource({ key, source });
            return i === 0
                ? <th key={ key }>{ value }</th>
                : <td key={ key }>{ value }</td>;
        });

        if (!allValues) return null;

        return (
            <tr key={ label } block="KeyValueTable" elem="Item">
                { allValues }
            </tr>
        );
    };

    renderHeading() {
        if (isMobile.any()) return super.renderHeading();

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

    renderTotalField(key, value, delimiter = false) {
        return (
            <tr
              key={ `total_${key}` }
              block="KeyValueTable"
              elem={ `Totals${delimiter ? '-Separated' : ''}` }
            >
                <th colSpan={ isMobile.any() ? 1 : this.headingFields.length - 1 }>{ key }</th>
                <td>{ value }</td>
            </tr>
        );
    }

    renderTotals() {
        const { order } = this.props;
        const { base_order_info = {}, shipping_info = {} } = order;
        const { grand_total = 0, sub_total = 0 } = base_order_info;
        const { shipping_amount = 0 } = shipping_info;

        return (
            <>
                { this.renderTotalField('Order subtotal', sub_total, true) }
                { this.renderTotalField('Shipping', shipping_amount) }
                { this.renderTotalField('Total', grand_total) }
            </>
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
                        { this.renderTotals() }
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        const { order } = this.props;
        const { order_products = [] } = order;

        return (
            <Popup
              id={ ORDER_POPUP_ID }
              clickOutside={ false }
              mix={ { block: 'MyAccountOrderPopup' } }
            >
                <Loader isLoading={ !order_products.length } />
                { this.renderTable() }
            </Popup>
        );
    }
}

export default MyAccountOrderPopup;
