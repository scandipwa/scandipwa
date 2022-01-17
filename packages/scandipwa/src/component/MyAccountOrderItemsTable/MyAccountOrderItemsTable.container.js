/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { OrderProductsType, OrderTabType, OrderTotalType } from 'Type/Order.type';

import MyAccountOrderItemsTable from './MyAccountOrderItemsTable.component';

/** @namespace Component/MyAccountOrderItemsTable/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isMobile: state.ConfigReducer.device.isMobile
});

/** @namespace Component/MyAccountOrderItemsTable/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/MyAccountOrderItemsTable/Container */
export class MyAccountOrderItemsTableContainer extends PureComponent {
    static propTypes = {
        isMobile: PropTypes.bool.isRequired,
        activeTab: PropTypes.string.isRequired,
        items: OrderTabType.isRequired,
        total: OrderTotalType.isRequired,
        allOrderItems: OrderProductsType.isRequired
    };

    containerProps() {
        const {
            isMobile,
            items,
            activeTab,
            total,
            allOrderItems
        } = this.props;

        return {
            isMobile,
            items,
            activeTab,
            total,
            allOrderItems
        };
    }

    render() {
        return (
            <MyAccountOrderItemsTable
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOrderItemsTableContainer);
