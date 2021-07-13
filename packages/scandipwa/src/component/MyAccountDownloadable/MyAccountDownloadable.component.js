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

import Loader from 'Component/Loader';
import MyAccountDownloadableTableRow from 'Component/MyAccountDownloadableTableRow';
import MyAccountOrderPopup from 'Component/MyAccountOrderPopup';
import { downloadableType } from 'Type/Account';

/** @namespace Component/MyAccountDownloadable/Component */
export class MyAccountDownloadableComponent extends PureComponent {
    static propTypes = {
        items: PropTypes.arrayOf(downloadableType).isRequired,
        isLoading: PropTypes.bool.isRequired
    };

    renderPopup() {
        return <MyAccountOrderPopup />;
    }

    renderNoOrders() {
        return (
            <tr block="MyAccountMyOrders" elem="NoOrders">
                <td>{ __('You have no orders.') }</td>
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

    renderOrderRow = (order) => {
        const { id } = order;

        return (
            <MyAccountDownloadableTableRow
              key={ id }
              order={ order }
            />
        );
    };

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
                { this.renderPopup() }
            </div>
        );
    }
}

export default MyAccountDownloadableComponent;
