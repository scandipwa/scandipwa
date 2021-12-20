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
import { Component } from 'react';

import Loader from 'Component/Loader';
import MyAccountDownloadableTableRow from 'Component/MyAccountDownloadableTableRow';
import { DownloadableType } from 'Type/Order.type';

import { NUMBER_OF_COLUMNS_IN_DOWNLOADABLE_TABLE } from './MyAccountDownloadable.config';

import './MyAccountDownloadable.style';

/** @namespace Component/MyAccountDownloadable/Component */
export class MyAccountDownloadableComponent extends Component {
    static propTypes = {
        items: PropTypes.arrayOf(DownloadableType).isRequired,
        isLoading: PropTypes.bool.isRequired
    };

    shouldComponentUpdate(nextProps) {
        const { items } = this.props;
        const { items: nextItems } = nextProps;

        return items !== nextItems;
    }

    renderNoOrders() {
        return (
            <tr
              block="MyAccountMyOrders"
              elem="NoOrders"
              mix={ { block: 'MyDownloadableOrders', elem: 'NoOrders' } }
            >
                <td colSpan={ NUMBER_OF_COLUMNS_IN_DOWNLOADABLE_TABLE }>
                    <p>{ __('You have not purchased any downloadable products yet.') }</p>
                </td>
            </tr>
        );
    }

    renderOrderHeadingRow() {
        return (
            <tr>
                <th>{ __('Order') }</th>
                <th>{ __('Date') }</th>
                <th>{ __('Title') }</th>
                <th>{ __('Status') }</th>
                <th>{ __('Remaining Downloads') }</th>
            </tr>
        );
    }

    renderTable() {
        return (
            <table
              block="MyAccountMyOrders"
              elem="Table"
              mix={ {
                  block: 'MyDownloadable'
              } }
            >
                <thead>
                    { this.renderOrderHeadingRow() }
                </thead>
                <tbody>
                    { this.renderOrderRows() }
                </tbody>
            </table>
        );
    }

    renderOrderRow(order) {
        const { id } = order;

        return (
            <MyAccountDownloadableTableRow
              key={ id }
              order={ order }
            />
        );
    }

    renderOrderRows() {
        const { items, isLoading } = this.props;

        if (!isLoading && !items.length) {
            return this.renderNoOrders();
        }

        const orders = items.length
            ? items
            : Array.from({ length: 10 }, (_, id) => ({ id }));

        return orders.reduceRight(
            (acc, e) => [...acc, this.renderOrderRow(e)],
            []
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <div
              block="MyAccountMyOrders"
              mix={ {
                  block: 'MyDownloadableOrders'
              } }
            >
                <Loader isLoading={ isLoading } />
                { this.renderTable() }
            </div>
        );
    }
}

export default MyAccountDownloadableComponent;
