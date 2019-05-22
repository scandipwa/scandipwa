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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import TextPlaceholder from 'Component/TextPlaceholder';
import MyAccountSidebar from 'Component/MyAccountSidebar';
import OrdersType from 'Type/MyAccountOrders';
import './MyAccountOrders.style';

class MyAccountOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            finishedLoading: false
        };
    }

    componentDidMount() {
        this.requestCustomerOrders();
        this.updateBreadcrumbs();
    }

    requestCustomerOrders() {
        const { requestCustomerOrders } = this.props;

        return requestCustomerOrders().then(() => this.setState({ finishedLoading: true }));
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: '/my-account/orders',
                name: 'My Account Orders'
            },
            {
                url: '/',
                name: 'Home'
            }
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    showEmptyOrderMessage() {
        const { orders } = this.props;
        const { finishedLoading } = this.state;
        const showMessage = finishedLoading && !orders.length;

        return (showMessage && (
            <div
              block="MyAccountOrders"
              elem="Empty"
            >
                You currently have no orders!
            </div>
        ));
    }

    renderOrderRows() {
        const { orders, currency } = this.props;
        const { finishedLoading } = this.state;
        const showRow = (finishedLoading && currency) ? true : undefined;

        return orders.map((order) => {
            const {
                id,
                created_at,
                grand_total,
                status
            } = order;

            return (
                <tr key={ id || 0 }>
                    <td>{ <TextPlaceholder length="medium" content={ showRow && id } /> }</td>
                    <td>{ <TextPlaceholder length="medium" content={ showRow && created_at } /> }</td>
                    <td>
                        { <TextPlaceholder length="medium" content={ showRow && grand_total } /> }
                        { <TextPlaceholder length="short" content={ showRow && currency } /> }
                    </td>
                    <td>{ <TextPlaceholder length="medium" content={ showRow && status } /> }</td>
                    <td>{ <TextPlaceholder length="medium" content={ showRow && 'View Order' } /> }</td>
                </tr>
            );
        });
    }

    renderOrderInformation() {
        const { orders } = this.props;
        const { finishedLoading } = this.state;
        const hideHeader = finishedLoading && !orders.length;

        return (
            <>
                <h1 block="MyAccountOrders" elem="Heading">My Orders</h1>
                <table block="MyAccountOrders" elem="Table" mods={ { isHidden: hideHeader } }>
                    <thead>
                        <tr>
                            <th>Order #</th>
                            <th>Date</th>
                            <th>Order Total</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderOrderRows() }
                    </tbody>
                </table>
                { this.showEmptyOrderMessage() }
            </>
        );
    }

    render() {
        const { isSignedIn } = this.props;

        if (!isSignedIn) {
            return <Redirect to="/" />;
        }

        return (
            <main block="MyAccountOrders" aria-label="My Account Orders">
                <div block="MyAccountOrders" elem="Wrapper">
                    <MyAccountSidebar />
                    <div block="MyAccountOrders" elem="Content">
                        { this.renderOrderInformation() }
                    </div>
                </div>
            </main>
        );
    }
}

MyAccountOrders.propTypes = {
    history: PropTypes.shape({
        location: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    updateBreadcrumbs: PropTypes.func.isRequired,
    isSignedIn: PropTypes.bool.isRequired,
    currency: PropTypes.string.isRequired,
    orders: OrdersType.isRequired,
    requestCustomerOrders: PropTypes.func.isRequired
};

export default MyAccountOrders;
