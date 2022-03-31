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
import { withRouter } from 'react-router';

import MyAccountOrderPrint from 'Component/MyAccountOrderPrint';
import { OrderPrintMapType } from 'Type/Order.type';
import { MatchType } from 'Type/Router.type';

import './OrderPrintPage.style';

/** @namespace Route/OrderPrintPage/Component */
export class OrderPrintPage extends PureComponent {
    static propTypes = {
        match: MatchType.isRequired,
        orderPrintRequest: PropTypes.string.isRequired,
        orderPrintMap: PropTypes.shape(OrderPrintMapType).isRequired
    };

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

export default withRouter(OrderPrintPage);
