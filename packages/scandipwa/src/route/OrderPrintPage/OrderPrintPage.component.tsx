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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import MyAccountOrderPrint from 'Component/MyAccountOrderPrint';
import { OrderPrintMapType } from 'Type/Order.type';
import { MatchType } from 'Type/Router.type';

import { ORDER_PRINT_PAGE_BODY_CLS } from './OrderPrintPage.config';

import './OrderPrintPage.style';

/** @namespace Route/OrderPrintPage/Component */
export class OrderPrintPage extends PureComponent {
    static propTypes = {
        match: MatchType.isRequired,
        orderPrintRequest: PropTypes.string.isRequired,
        orderPrintMap: PropTypes.shape(OrderPrintMapType).isRequired
    };

    componentDidMount() {
        document.body.classList.add(ORDER_PRINT_PAGE_BODY_CLS);
    }

    componentWillUnmount() {
        document.body.classList.remove(ORDER_PRINT_PAGE_BODY_CLS);
    }

    render() {
        const { match, orderPrintRequest, orderPrintMap } = this.props;

        return (
            <div
              block="OrderPrintPage"
            >
                <MyAccountOrderPrint
                  match={ match }
                  orderPrintRequest={ orderPrintRequest }
                  orderPrintMap={ orderPrintMap }
                />
            </div>
        );
    }
}

export default OrderPrintPage;
