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
import TextPlaceholder from 'Component/TextPlaceholder';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import './MyAccountOrders.style';

// TODO remove when BE functionality to get store currency symbol is created

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
                url: '/my-account-orders',
                name: 'My Account Orders'
            },
            {
                url: '/',
                name: 'Home'
            }
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    renderOrderRows() {
        const { orders, currency } = this.props;
        const { finishedLoading } = this.state;

        if (finishedLoading && currency) {
            return orders.map(order => (
                <tr key={ order.id }>
                    <td>{ order.id }</td>
                    <td>{ order.created_at }</td>
                    <td>
                        { order.grand_total }
                        { currency }
                    </td>
                    <td>{ order.status }</td>
                    <td>View Order</td>
                </tr>
            ));
        }

        return (
            <tr>
                <td>{ <TextPlaceholder length="medium" /> }</td>
                <td>{ <TextPlaceholder length="medium" /> }</td>
                <td>{ <TextPlaceholder length="medium" /> }</td>
                <td>{ <TextPlaceholder length="medium" /> }</td>
                <td><TextPlaceholder length="medium" /></td>
            </tr>
        );
    }

    renderOrderInformation() {
        const { orders } = this.props;
        const { finishedLoading } = this.state;
        const showHeader = !finishedLoading || (finishedLoading && !!orders.length);

        return (
            <>
                <h1 block="MyAccountOrders" elem="Heading">My Orders</h1>
                <table block="MyAccountOrders" elem="Table" mods={ { isVisible: showHeader } }>
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
                { finishedLoading && !orders.length
                    && <div block="MyAccountOrders" elem="Empty">You currently have no orders!</div>
                }
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
                    <div block="MyAccountOrders" elem="Sidebar">
                        <div block="MyAccountOrders" elem="SideLink">
                            <Link to="/my-account">My Account</Link>
                        </div>
                        <div block="MyAccountOrders" elem="SideLink">
                            <Link to="/my-account-orders">My Orders</Link>
                        </div>
                    </div>
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
    orders: PropTypes.oneOfType([
        PropTypes.shape({
            id: PropTypes.number,
            created_at: PropTypes.instanceOf(Date),
            grand_total: PropTypes.number,
            status: PropTypes.string
        }),
        PropTypes.array
    ]).isRequired,
    requestCustomerOrders: PropTypes.func.isRequired
};

export default MyAccountOrders;
