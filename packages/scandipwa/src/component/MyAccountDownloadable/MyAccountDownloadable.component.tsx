/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { Component } from 'react';

import Loader from 'Component/Loader';
import MyAccountDownloadableTableRow from 'Component/MyAccountDownloadableTableRow';
import { ReactElement } from 'Type/Common.type';

import { NUMBER_OF_COLUMNS_IN_DOWNLOADABLE_TABLE } from './MyAccountDownloadable.config';
import { CustomerDownloadableProductExtended, MyAccountDownloadableComponentProps } from './MyAccountDownloadable.type';

import './MyAccountDownloadable.style';

/** @namespace Component/MyAccountDownloadable/Component */
export class MyAccountDownloadableComponent extends Component<MyAccountDownloadableComponentProps> {
    shouldComponentUpdate(nextProps: MyAccountDownloadableComponentProps): boolean {
        const { items } = this.props;
        const { items: nextItems } = nextProps;

        return items !== nextItems;
    }

    renderNoOrders(): ReactElement {
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

    renderOrderHeadingRow(): ReactElement {
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

    renderTable(): ReactElement {
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

    renderOrderRow(order: Partial<CustomerDownloadableProductExtended>): ReactElement {
        const { id } = order;

        return (
            <MyAccountDownloadableTableRow
              key={ id }
              order={ order }
            />
        );
    }

    renderOrderRows(): ReactElement {
        const { items, isLoading } = this.props;

        if (!isLoading && !items.length) {
            return this.renderNoOrders();
        }

        const orders = items.length
            ? items
            : Array.from({ length: 10 }, (_, id) => ({ id }));

        return orders.reduceRight(
            (acc, e) => [...acc, this.renderOrderRow(e)],
            [] as ReactElement[]
        );
    }

    render(): ReactElement {
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
