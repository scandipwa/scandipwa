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

import { MatchType } from 'Type/Router.type';

import OrderPrintPage from './OrderPrintPage.component';

/** @namespace Route/OrderPrintPage/Container */
export class OrderPrintPageContainer extends PureComponent {
    static propTypes = {
        match: MatchType.isRequired,
        orderPrintRequest: PropTypes.string.isRequired
    };

    containerProps() {
        const {
            match,
            orderPrintRequest
        } = this.props;

        return {
            match,
            orderPrintRequest
        };
    }

    render() {
        return (
                <OrderPrintPage
                  { ...this.containerProps() }
                />
        );
    }
}

export default withRouter(OrderPrintPageContainer);
