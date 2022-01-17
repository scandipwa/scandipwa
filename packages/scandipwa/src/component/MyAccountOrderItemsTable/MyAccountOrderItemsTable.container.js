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

import { MILLISECONDS_PER_MINUTE } from 'Component/MyAccountOrder/MyAccountOrder.config';
import { OrderProductsType, OrderTabType, OrderTotalType } from 'Type/Order.type';
import { getDateValue } from 'Util/Form/Extract';

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

    containerFunctions = {
        getTimeInCurrentTimezone: this.getTimeInCurrentTimezone.bind(this)
    };

    __construct(props) {
        super.__construct(props);

        const currentDate = new Date();
        const timezone = currentDate.getTimezoneOffset() * MILLISECONDS_PER_MINUTE;

        this.state = { timezone };
    }

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

    getTimeInCurrentTimezone(timestamp) {
        const { timezone } = this.state;

        const timeInCurrentTimezone = new Date(timestamp).getTime() - timezone;

        return getDateValue(timeInCurrentTimezone);
    }

    render() {
        return (
            <MyAccountOrderItemsTable
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOrderItemsTableContainer);
