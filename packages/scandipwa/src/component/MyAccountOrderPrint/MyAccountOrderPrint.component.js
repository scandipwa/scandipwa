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

import Loader from 'Component/Loader';
import MyAccountOrder from 'Component/MyAccountOrder/MyAccountOrder.component';

import './MyAccountOrderPrint.style';

/** @namespace Component/MyAccountOrderPrint/Component */
export class MyAccountOrderPrint extends MyAccountOrder {
    componentDidMount() {
        print();
    }

    renderOrderIncrementIdAndStatus() {
        const { order: { increment_id, status } } = this.props;

        return (
            <h2 block="MyAccountOrder" elem="OrderId">
                { __('Order # %s', increment_id) }
                <span block="MyAccountOrder" elem="OrderStatus">
                    { status }
                </span>
            </h2>
        );
    }

    renderContent() {
        const { order: { items } } = this.props;

        if (!items) {
            return null;
        }

        return (
            <>
                { this.renderBaseInfo() }
                { this.renderActiveTab() }
                { this.renderOrderInformation() }
            </>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <div
              block="MyAccountOrderPrint"
              elem="Wrapper"
            >
                <Loader isLoading={ isLoading } />
                { this.renderContent() }
            </div>
        );
    }
}

export default MyAccountOrderPrint;
