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
import { downloadableType } from 'Type/Account';
import { DeviceType } from 'Type/Device';

/** @namespace Component/MyAccountDownloadable/Component */
export class MyAccountDownloadableComponent extends PureComponent {
    static propTypes = {
        items: downloadableType.isRequired,
        isLoading: PropTypes.bool.isRequired,
        device: DeviceType.isRequired
    };

    renderNoOrders() {
        const { device } = this.props;
        /* eslint-disable-next-line no-magic-numbers */
        const colSpan = device.isMobile ? 4 : 5;

        return (
            <tr block="MyAccountMyOrders" elem="NoOrders">
                <td colSpan={ colSpan }>{ __('You have no orders.') }</td>
            </tr>
        );
    }

    renderOrderHeadingRow() {
        const { device: { isMobile } = {} } = this.props;
        const remainingDownloads = isMobile
            ? null
            : <th>{ __('Remaining Downloads') }</th>;

        return (
            <tr>
                <th>{ __('Order') }</th>
                <th>{ __('Date') }</th>
                <th>{ __('Title') }</th>
                <th>{ __('Status') }</th>
                { remainingDownloads }
            </tr>
        );
    }

    renderTable() {
        return (
            <table block="MyAccountMyOrders" elem="Table">
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
            : Array.from({ length: 10 }, (_, id) => ({ base_order_info: { id } }));

        return orders.reduceRight(
            (acc, e) => [...acc, this.renderOrderRow(e)],
            []
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <div block="MyAccountMyOrders">
                <Loader isLoading={ isLoading } />
                { this.renderTable() }
            </div>
        );
    }
}

export default MyAccountDownloadableComponent;
